// ================================================
// THE LAST BLESSING — Game Engine v0.2.0
// ================================================

const Game = (() => {

  // ================================================
  // STATE
  // ================================================
  let state = null;

  function defaultState() {
    return {
      player: {
        name: '', species: '', speciesName: '',
        classKey: '', className: '',
        combatLevel: 1, combatSP: 0,
        lp: 20,
        learnedBoxes: [], certificates: [],
        hp: { current: 100, max: 100 },
        sp: { current: 0,   max: 0   },
        tp: { current: 0,   max: 0   },
        mp: { current: 50,  max: 50  },
        PATK: 0, PDEF: 0, PHIT: 0, PEVA: 0,
        MATK: 0, MDEF: 0, MHIT: 0, MEVA: 0,
        FIR:  0, WTR:  0, AIR:  0, ERT:  0, LGT: 0, DRK: 0,
        inventory: [],
        equipment: { weapon: null },
        gold: 150,
      },
      world: { location: 'city-square', visitedLocations: [] },
      field: null,   // active field state (see _enterField)
      combat: null,  // active combat state (see _startCombat)
      mode: 'town',  // 'town' | 'field' | 'combat'
      version: '0.2.0',
    };
  }

  let creation = { name: '', species: '', classKey: '' };

  // ================================================
  // INIT
  // ================================================
  function init() {
    _bindTitleButtons();
    _bindCreationButtons();
    _bindHudButtons();
    _bindModalClose();
    document.getElementById('btn-clear-log').addEventListener('click', clearLog);
    showScreen('title');
  }

  // ================================================
  // SCREENS
  // ================================================
  function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const el = document.getElementById(`screen-${id}`);
    if (el) el.classList.add('active');
  }

  // ================================================
  // TITLE
  // ================================================
  function _bindTitleButtons() {
    document.getElementById('btn-new-game').addEventListener('click', startNewGame);
    document.getElementById('btn-load-game').addEventListener('click', loadGame);
  }

  function startNewGame() {
    state = defaultState();
    _resetCreation();
    showScreen('creation');
    _showCreationStep('name');
  }

  // ================================================
  // SAVE / LOAD
  // ================================================
  const SAVE_KEY = 'tlb_save_v1';

  function saveGame() {
    if (!state) return;
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); }
    catch (e) { log('Warning: could not save game.', 'system'); }
  }

  function loadGame() {
    const saved = localStorage.getItem(SAVE_KEY);
    if (!saved) {
      showModal('No Save Found',
        'No journey record was found on this device.',
        [
          { label: 'New Journey', primary: true, action: () => { closeModal(); startNewGame(); } },
          { label: 'Cancel', action: closeModal },
        ]);
      return;
    }
    try {
      state = JSON.parse(saved);
      _startGameLoop();
      log(`Welcome back, ${state.player.name}.`, 'info');
      log('Journey record loaded.', 'system');
    } catch (e) {
      showModal('Save Corrupted',
        'Your journey record could not be read.',
        [
          { label: 'New Journey', primary: true, action: () => { closeModal(); startNewGame(); } },
          { label: 'Cancel', action: closeModal },
        ]);
    }
  }

  // ================================================
  // CHARACTER CREATION
  // ================================================
  function _resetCreation() {
    creation = { name: '', species: '', classKey: '' };
    document.getElementById('input-name').value = '';
    document.querySelectorAll('.species-card').forEach(c => c.classList.remove('selected'));
    document.querySelectorAll('.class-card').forEach(c => c.classList.remove('selected'));
    document.getElementById('btn-species-next').disabled = true;
    document.getElementById('btn-class-next').disabled = true;
    _updateProgressDots('name');
    _buildSpeciesCards();
  }

  function _showCreationStep(stepId) {
    document.querySelectorAll('.creation-step').forEach(s => s.classList.remove('active'));
    document.getElementById(`step-${stepId}`).classList.add('active');
    _updateProgressDots(stepId);
  }

  function _updateProgressDots(stepId) {
    const order = ['name', 'species', 'class', 'confirm'];
    const idx = order.indexOf(stepId);
    document.querySelectorAll('.step-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i <= idx);
    });
  }

  function _buildSpeciesCards() {
    const container = document.getElementById('species-cards');
    container.innerHTML = '';
    // Group by Being
    const beings = {};
    Object.values(DATA.species).forEach(sp => {
      if (!beings[sp.being]) beings[sp.being] = [];
      beings[sp.being].push(sp);
    });
    Object.entries(beings).forEach(([being, list]) => {
      const header = document.createElement('div');
      header.className = 'being-header';
      header.textContent = being;
      container.appendChild(header);
      const row = document.createElement('div');
      row.className = 'species-row';
      list.forEach(sp => {
        const card = document.createElement('div');
        card.className = 'species-card';
        card.dataset.speciesId = sp.id;
        card.innerHTML = `
          <span class="card-check">✓</span>
          <div class="species-name">${sp.name}</div>
          <div class="species-faction">${sp.faction}</div>
          <div class="species-lore">${sp.lore}</div>
          <div class="species-mods">
            ${sp.modDisplay.map(m => `<span class="stat-badge">${m}</span>`).join('')}
          </div>`;
        card.addEventListener('click', () => {
          creation.species = sp.id;
          document.querySelectorAll('.species-card').forEach(c => c.classList.remove('selected'));
          card.classList.add('selected');
          document.getElementById('btn-species-next').disabled = false;
        });
        row.appendChild(card);
      });
      container.appendChild(row);
    });
  }

  function _buildClassCards() {
    const container = document.getElementById('class-cards');
    container.innerHTML = '';
    const bannedClass = creation.species ? DATA.species[creation.species].bannedClass : null;
    Object.values(DATA.baseClasses).forEach(cls => {
      const isBanned = bannedClass === cls.name;
      const card = document.createElement('div');
      card.className = `class-card${isBanned ? ' banned' : ''}`;
      card.dataset.classKey = cls.key;
      card.innerHTML = `
        <span class="card-check">✓</span>
        <div class="class-name">${cls.name}</div>
        <div class="class-type">${cls.classType} · ${cls.weight}</div>
        <div class="class-desc">${cls.desc}</div>
        <div class="class-weapon">Weapon: ${cls.weaponType}</div>
        ${isBanned ? '<div class="class-banned">Unavailable to your species</div>' : ''}`;
      if (!isBanned) {
        card.addEventListener('click', () => {
          creation.classKey = cls.key;
          document.querySelectorAll('.class-card').forEach(c => c.classList.remove('selected'));
          card.classList.add('selected');
          document.getElementById('btn-class-next').disabled = false;
        });
      }
      container.appendChild(card);
    });
  }

  function _buildConfirmCard() {
    const sp  = DATA.species[creation.species];
    const cls = DATA.baseClasses[creation.classKey];
    const nb  = cls.noviceBox;
    const totalHP = 100 + (sp.mods.HP || 0) + (nb.statBonuses.HP || 0);
    const totalSP = (sp.mods.SP || 0) + (nb.statBonuses.SP || 0);
    const totalTP = (sp.mods.TP || 0) + (nb.statBonuses.TP || 0);
    const totalMP = 50  + (sp.mods.MP || 0) + (nb.statBonuses.MP || 0);
    document.getElementById('confirm-details').innerHTML = `
      <div class="confirm-row"><span class="confirm-label">Name</span><span class="confirm-value">${creation.name}</span></div>
      <div class="confirm-row"><span class="confirm-label">Species</span><span class="confirm-value">${sp.name} (${sp.being})</span></div>
      <div class="confirm-row"><span class="confirm-label">Class</span><span class="confirm-value">${cls.name}</span></div>
      <div class="confirm-row"><span class="confirm-label">HP</span><span class="confirm-value">${totalHP}</span></div>
      <div class="confirm-row"><span class="confirm-label">SP / TP / MP</span><span class="confirm-value">${totalSP} / ${totalTP} / ${totalMP}</span></div>
      <div class="confirm-row"><span class="confirm-label">PATK / PDEF</span><span class="confirm-value">${nb.statBonuses.PATK || 0} / ${nb.statBonuses.PDEF || 0}</span></div>
      <div class="confirm-row"><span class="confirm-label">Starting Weapon</span><span class="confirm-value">${cls.starterWeapon.name}</span></div>
      <div class="confirm-row"><span class="confirm-label">Learning Points</span><span class="confirm-value">15 (20 − 5 for Novice Box)</span></div>`;
  }

  function _bindCreationButtons() {
    const nameInput = document.getElementById('input-name');
    const btnNameNext = document.getElementById('btn-name-next');

    btnNameNext.addEventListener('click', () => {
      const name = nameInput.value.trim();
      if (name.length < 2) { nameInput.focus(); return; }
      creation.name = name;
      _buildSpeciesCards();
      _showCreationStep('species');
    });
    nameInput.addEventListener('keydown', e => { if (e.key === 'Enter') btnNameNext.click(); });

    document.getElementById('btn-species-back').addEventListener('click', () => _showCreationStep('name'));
    document.getElementById('btn-species-next').addEventListener('click', () => {
      if (!creation.species) return;
      _buildClassCards();
      _showCreationStep('class');
    });

    document.getElementById('btn-class-back').addEventListener('click', () => {
      creation.classKey = '';
      document.querySelectorAll('.class-card').forEach(c => c.classList.remove('selected'));
      document.getElementById('btn-class-next').disabled = true;
      _showCreationStep('species');
    });
    document.getElementById('btn-class-next').addEventListener('click', () => {
      if (!creation.classKey) return;
      _buildConfirmCard();
      _showCreationStep('confirm');
    });

    document.getElementById('btn-confirm-back').addEventListener('click', () => _showCreationStep('class'));
    document.getElementById('btn-confirm-start').addEventListener('click', _confirmCreation);
  }

  function _confirmCreation() {
    const sp  = DATA.species[creation.species];
    const cls = DATA.baseClasses[creation.classKey];
    const nb  = cls.noviceBox;
    const p   = state.player;

    p.name        = creation.name;
    p.species     = creation.species;
    p.speciesName = sp.name;
    p.classKey    = creation.classKey;
    p.className   = cls.name;

    // Apply species mods to resource pool maximums
    p.hp.max = 100 + (sp.mods.HP || 0);
    p.sp.max = 0   + (sp.mods.SP || 0);
    p.tp.max = 0   + (sp.mods.TP || 0);
    p.mp.max = 50  + (sp.mods.MP || 0);

    // Learn novice box: spend LP, earn combat SP, apply stat bonuses
    p.lp -= nb.lpCost;
    p.combatSP   += nb.spEarned;
    p.combatLevel = _calcCombatLevel(p.combatSP);
    p.learnedBoxes.push(nb.id);
    p.certificates.push(nb.certificate);

    const b = nb.statBonuses;
    if (b.HP)   p.hp.max += b.HP;
    if (b.SP)   p.sp.max += b.SP;
    if (b.TP)   p.tp.max += b.TP;
    if (b.MP)   p.mp.max += b.MP;
    if (b.PATK) p.PATK   += b.PATK;
    if (b.PDEF) p.PDEF   += b.PDEF;
    if (b.PHIT) p.PHIT   += b.PHIT;
    if (b.PEVA) p.PEVA   += b.PEVA;
    if (b.MATK) p.MATK   += b.MATK;
    if (b.MDEF) p.MDEF   += b.MDEF;
    if (b.MHIT) p.MHIT   += b.MHIT;
    if (b.MEVA) p.MEVA   += b.MEVA;

    // Set all pools to max
    p.hp.current = p.hp.max;
    p.sp.current = p.sp.max;
    p.tp.current = p.tp.max;
    p.mp.current = p.mp.max;

    // Give starter weapon and equip it
    p.inventory.push({ ...cls.starterWeapon });
    p.equipment.weapon = cls.starterWeapon.id;

    // Give starting consumables
    p.inventory.push(...DATA.startingConsumables.map(i => ({ ...i })));

    saveGame();
    _startGameLoop();
    log(DATA.arrivalText[creation.species] || 'You have arrived at the Last City.', 'lore');
    log(`Your journey begins, ${p.name}.`, 'info');
  }

  // ================================================
  // GAME LOOP START
  // ================================================
  function _startGameLoop() {
    showScreen('game');
    updateHud();
    navigate(state.world.location, false);
  }

  // ================================================
  // HUD
  // ================================================
  function updateHud() {
    const p = state.player;
    document.getElementById('hud-name').textContent  = p.name;
    document.getElementById('hud-class').textContent = p.className;
    document.getElementById('hud-level').textContent = `Lv.${p.combatLevel}`;
    document.getElementById('hud-gold').textContent  = p.gold;

    const hpPct = p.hp.max > 0 ? Math.max(0, Math.round((p.hp.current / p.hp.max) * 100)) : 0;
    const mpPct = p.mp.max > 0 ? Math.max(0, Math.round((p.mp.current / p.mp.max) * 100)) : 0;
    document.getElementById('hp-fill').style.width  = `${hpPct}%`;
    document.getElementById('mp-fill').style.width  = `${mpPct}%`;
    document.getElementById('hp-value').textContent = `${p.hp.current}/${p.hp.max}`;
    document.getElementById('mp-value').textContent = `${p.mp.current}/${p.mp.max}`;

    const spEl = document.getElementById('hud-sp');
    const tpEl = document.getElementById('hud-tp');
    if (spEl) spEl.textContent = `SP ${p.sp.current}/${p.sp.max}`;
    if (tpEl) tpEl.textContent = `TP ${p.tp.current}/${p.tp.max}`;
  }

  function _bindHudButtons() {
    document.getElementById('btn-inventory').addEventListener('click', showInventory);
    document.getElementById('btn-status').addEventListener('click', showStatus);
  }

  // ================================================
  // TOWN NAVIGATION
  // ================================================
  function navigate(locationId, doLog = true) {
    if (state.mode !== 'town') return;
    const loc = DATA.locations[locationId];
    if (!loc) return;

    state.world.location = locationId;
    if (!state.world.visitedLocations.includes(locationId)) {
      state.world.visitedLocations.push(locationId);
    }

    document.getElementById('location-area').textContent = loc.area;
    document.getElementById('location-name').textContent = loc.name;
    document.getElementById('location-desc').textContent = loc.description;
    document.getElementById('scene-text').innerHTML = '';

    _buildActionButtons(loc);

    if (doLog) { log(`→ ${loc.name}`, 'system'); saveGame(); }
  }

  function _buildActionButtons(loc) {
    const container = document.getElementById('action-buttons');
    container.innerHTML = '';

    if (loc.exits && loc.exits.length > 0) {
      _addSectionLabel(container, 'Travel');
      loc.exits.forEach(exit => {
        container.appendChild(_makeActionBtn(exit.icon, exit.label, exit.desc, () => navigate(exit.id)));
      });
    }
    if (loc.actions && loc.actions.length > 0) {
      _addSectionLabel(container, 'Actions');
      loc.actions.forEach(action => {
        container.appendChild(_makeActionBtn(action.icon, action.label, '', () => _dispatch(action)));
      });
    }
  }

  function _addSectionLabel(container, text) {
    const div = document.createElement('div');
    div.className = 'action-section-label';
    div.textContent = text;
    container.appendChild(div);
  }

  function _makeActionBtn(icon, label, sub, onClick, disabled = false) {
    const btn = document.createElement('button');
    btn.className = 'action-btn';
    btn.disabled = disabled;
    btn.innerHTML = `
      <span class="btn-icon">${icon}</span>
      <span>${label}${sub ? `<br><small style="color:var(--text-muted);font-size:0.68em">${sub}</small>` : ''}</span>`;
    btn.addEventListener('click', onClick);
    return btn;
  }

  // ================================================
  // TOWN ACTION DISPATCH
  // ================================================
  function _dispatch(action) {
    switch (action.type) {
      case 'lore':   if (action.id === 'read-blessings') _showBlessings(); break;
      case 'pray':   _showPrayer(); break;
      case 'status': showStatus(); break;
      case 'board':  _showBoard(); break;
      case 'shop':   _showShop(); break;
      case 'gate':   _showGoddessGate(); break;
    }
  }

  function _showBlessings() {
    const html = DATA.blessings.map(b => `
      <div style="margin-bottom:1.4rem;padding-bottom:1.4rem;border-bottom:1px solid var(--border-dim);">
        <div style="font-size:0.65rem;color:var(--cyan);letter-spacing:0.2em;text-transform:uppercase;margin-bottom:0.25rem;">${b.number}</div>
        <div style="font-family:var(--font-fantasy);color:var(--text-primary);font-size:0.95rem;margin-bottom:0.2rem;">${b.title}</div>
        <div style="font-size:0.73rem;color:var(--purple);margin-bottom:0.55rem;">${b.subtitle}</div>
        <div style="font-size:0.79rem;color:var(--text-muted);white-space:pre-line;line-height:1.7;">${b.text}</div>
      </div>`).join('');
    showModal('The Seven Blessings', html, [{ label: 'Close', action: closeModal }]);
    log('You read the Seven Blessings etched into the cathedral walls.', 'lore');
  }

  function _showPrayer() {
    const responses = DATA.prayers;
    const r = responses[Math.floor(Math.random() * responses.length)];
    showModal('Offer a Prayer',
      `<p style="color:var(--text-muted);font-style:italic;">${r}</p>`,
      [{ label: 'Rise', action: closeModal }]);
    log('You kneel before the altar.', 'lore');
  }

  function showStatus() {
    const p = state.player;
    showModal('Character Record', `
      <div>
        <div class="confirm-row"><span class="confirm-label">Name</span><span class="confirm-value">${p.name}</span></div>
        <div class="confirm-row"><span class="confirm-label">Species</span><span class="confirm-value">${p.speciesName}</span></div>
        <div class="confirm-row"><span class="confirm-label">Class</span><span class="confirm-value">${p.className}</span></div>
        <div class="confirm-row"><span class="confirm-label">Combat Level</span><span class="confirm-value">${p.combatLevel}</span></div>
        <div class="confirm-row"><span class="confirm-label">SP Earned</span><span class="confirm-value">${p.combatSP}</span></div>
        <div class="confirm-row"><span class="confirm-label">LP</span><span class="confirm-value">${p.lp}</span></div>
        <div class="confirm-row"><span class="confirm-label">HP</span><span class="confirm-value">${p.hp.current} / ${p.hp.max}</span></div>
        <div class="confirm-row"><span class="confirm-label">SP Pool</span><span class="confirm-value">${p.sp.current} / ${p.sp.max}</span></div>
        <div class="confirm-row"><span class="confirm-label">TP Pool</span><span class="confirm-value">${p.tp.current} / ${p.tp.max}</span></div>
        <div class="confirm-row"><span class="confirm-label">MP</span><span class="confirm-value">${p.mp.current} / ${p.mp.max}</span></div>
        <div class="confirm-row"><span class="confirm-label">PATK / PDEF</span><span class="confirm-value">${p.PATK} / ${p.PDEF}</span></div>
        <div class="confirm-row"><span class="confirm-label">PHIT / PEVA</span><span class="confirm-value">${p.PHIT} / ${p.PEVA}</span></div>
        <div class="confirm-row"><span class="confirm-label">MATK / MDEF</span><span class="confirm-value">${p.MATK} / ${p.MDEF}</span></div>
        <div class="confirm-row"><span class="confirm-label">MHIT / MEVA</span><span class="confirm-value">${p.MHIT} / ${p.MEVA}</span></div>
        <div class="confirm-row"><span class="confirm-label">Gold</span><span class="confirm-value">◈ ${p.gold}</span></div>
      </div>`,
      [{ label: 'Close', action: closeModal }]);
  }

  function showInventory() {
    const inv = state.player.inventory;
    let html;
    if (inv.length === 0) {
      html = '<div style="color:var(--text-muted);padding:0.5rem 0;">Your pack is empty.</div>';
    } else {
      html = inv.map(item => `
        <div class="confirm-row">
          <span class="confirm-label">${item.name}${item.quantity > 1 ? ` ×${item.quantity}` : ''}</span>
          <span style="font-size:0.75rem;color:var(--text-muted);text-align:right;">${item.desc}</span>
        </div>`).join('');
    }
    showModal('Pack', html, [{ label: 'Close', action: closeModal }]);
  }

  function _showBoard() {
    showModal('Expedition Board',
      '<div style="color:var(--text-muted);">The board is quiet. No active postings.<br><br><span style="color:var(--text-dim);font-size:0.78rem;">Guild quests will be available here in a future build.</span></div>',
      [{ label: 'Close', action: closeModal }]);
    log('You scan the expedition board.', 'system');
  }

  function _showShop() {
    showModal('Market Row',
      '<div style="color:var(--text-muted);">The merchants eye you with varying degrees of suspicion.<br><br><span style="color:var(--text-dim);font-size:0.78rem;">The shop system is coming. For now, the merchants wait.</span></div>',
      [{ label: 'Leave', action: closeModal }]);
    log('You browse the market stalls.', 'system');
  }

  // ================================================
  // GODDESS GATE — KEYSTONE SELECTION
  // ================================================
  function _showGoddessGate() {
    const gSlots = [null, null, null]; // element strings per slot

    const content = document.createElement('div');

    function getAvailableCount(element) {
      const item = state.player.inventory.find(i => i.type === 'keystone' && i.keystoneElement === element);
      const usedCount = gSlots.filter(s => s === element).length;
      return (item ? item.quantity : 0) - usedCount;
    }

    function render() {
      const allFilled = gSlots.every(s => s !== null);
      const keystoneItems = state.player.inventory.filter(i => i.type === 'keystone' && i.quantity > 0);

      content.innerHTML = `
        <p style="font-size:0.8rem;color:var(--text-muted);margin-bottom:1rem;">
          Three recesses surround the frame, each shaped to receive a Keystone. The combination determines what lies beyond.
        </p>
        <div class="gate-slots">
          ${gSlots.map((s, i) => {
            const def = s ? DATA.keystones[s] : null;
            return `<div class="gate-slot ${s ? 'filled' : ''}" data-slot="${i}" style="${def ? `--kcolor:${def.color}` : ''}">
              <div class="gslot-num">${['I','II','III'][i]}</div>
              <div class="gslot-key">${s ? s.charAt(0).toUpperCase() + s.slice(1) : '—'}</div>
              ${s ? '<div class="gslot-remove">✕</div>' : ''}
            </div>`;
          }).join('')}
        </div>
        ${allFilled
          ? `<div class="gate-status ready">Gate attuned. Ready to open.</div>`
          : `<div class="gate-status">Select three Keystones — click a filled slot to remove it.</div>`
        }
        <div class="gate-inv-label">Your Keystones</div>
        <div class="gate-chips">
          ${keystoneItems.length === 0
            ? '<div style="color:var(--text-dim);font-size:0.78rem;">No Keystones in your pack.</div>'
            : keystoneItems.map(item => {
                const def = DATA.keystones[item.keystoneElement];
                const avail = getAvailableCount(item.keystoneElement);
                return `<div class="gate-chip ${avail <= 0 ? 'depleted' : ''}" data-element="${item.keystoneElement}" style="--kcolor:${def.color}">
                  ${def.name.replace('Keystone of ', '')} <span class="chip-qty">×${avail}</span>
                </div>`;
              }).join('')
          }
        </div>`;

      // Bind slot clicks (remove)
      content.querySelectorAll('.gate-slot.filled').forEach(slotEl => {
        slotEl.addEventListener('click', () => {
          gSlots[parseInt(slotEl.dataset.slot)] = null;
          render();
          _syncGateBtn(gSlots);
        });
      });

      // Bind chip clicks (add to slot)
      content.querySelectorAll('.gate-chip:not(.depleted)').forEach(chipEl => {
        chipEl.addEventListener('click', () => {
          const emptyIdx = gSlots.findIndex(s => s === null);
          if (emptyIdx === -1) return;
          gSlots[emptyIdx] = chipEl.dataset.element;
          render();
          _syncGateBtn(gSlots);
        });
      });
    }

    render();
    showModal('Goddess Gate — Attunement', content, [
      { id: 'gate-open-btn', label: 'Open the Gate', primary: true, disabled: true, action: () => { closeModal(); _openGate([...gSlots]); } },
      { label: 'Step Back', action: closeModal },
    ]);
    log('You approach the Goddess Gate. The aetheric light hums at your presence.', 'lore');
  }

  function _syncGateBtn(slots) {
    const btn = document.getElementById('gate-open-btn');
    if (btn) btn.disabled = !slots.every(s => s !== null);
  }

  function _openGate(slots) {
    const template = _determineTemplate(slots);

    // Consume keystones
    slots.forEach(element => {
      const item = state.player.inventory.find(i => i.keystoneElement === element);
      if (item) {
        item.quantity -= 1;
        if (item.quantity <= 0) {
          state.player.inventory = state.player.inventory.filter(i => i !== item);
        }
      }
    });

    log(`Gate attuned: [${slots.map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' · ')}] → ${template.name}`, 'lore');
    _enterField(template, slots);
  }

  function _determineTemplate(slots) {
    const counts = {};
    slots.forEach(s => { counts[s] = (counts[s] || 0) + 1; });
    const dominant = Object.entries(counts).find(([, v]) => v >= 2)?.[0] || null;

    if (!dominant) return DATA.fieldTemplates['crossroads'];
    const match = Object.values(DATA.fieldTemplates).find(t => t.dominantKey === dominant);
    return match || DATA.fieldTemplates['crossroads'];
  }

  // ================================================
  // FIELD SYSTEM
  // ================================================
  function _enterField(template, keystonesUsed) {
    state.mode = 'field';
    state.field = {
      templateId: template.id,
      room: 0,
      totalRooms: template.totalRooms,
      pendingLoot: [],
      pendingGold: 0,
      pendingExp: 0,
      keystonesUsed,
      searched: false,
    };
    saveGame();
    _renderField();
    log(`You step through the Gate into ${template.name}.`, 'lore');
  }

  function _renderField() {
    const f = state.field;
    const template = DATA.fieldTemplates[f.templateId];
    const isBossRoom = f.room >= f.totalRooms - 1;

    const roomNum  = f.room + 1;
    const areaText = `${template.name} — ${template.type === 'dungeon' ? 'Floor' : 'Area'} ${roomNum} of ${f.totalRooms}`;
    const roomDesc = isBossRoom ? template.bossDescription : template.roomDescriptions[f.room] || template.roomDescriptions[0];

    document.getElementById('location-area').textContent = areaText.toUpperCase();
    document.getElementById('location-name').textContent = isBossRoom ? '— Boss Encounter —' : `${template.name}`;
    document.getElementById('location-desc').textContent = isBossRoom ? template.bossDescription : template.roomDescriptions[f.room] || '';
    document.getElementById('scene-text').innerHTML = '';

    // Action panel
    const container = document.getElementById('action-buttons');
    container.innerHTML = '';

    _addSectionLabel(container, 'Field');
    if (!isBossRoom) {
      container.appendChild(_makeActionBtn('⚔', 'Advance', 'Engage the next encounter', _advanceRoom));
      if (!f.searched) {
        container.appendChild(_makeActionBtn('◎', 'Search Area', 'Look for items', _searchRoom));
      }
    } else {
      container.appendChild(_makeActionBtn('⚔', 'Face the Keeper', 'Boss encounter', _advanceRoom));
    }
    container.appendChild(_makeActionBtn('↩', 'Return to Town', 'Bank loot and leave', _returnToTown));

    // Pending loot preview
    if (f.pendingLoot.length > 0 || f.pendingGold > 0 || f.pendingExp > 0) {
      _addSectionLabel(container, 'Acquired');
      const summary = [];
      if (f.pendingGold > 0) summary.push(`◈ ${f.pendingGold} gold`);
      if (f.pendingExp  > 0) summary.push(`${f.pendingExp} EXP`);
      f.pendingLoot.forEach(l => summary.push(l.name + (l.quantity > 1 ? ` ×${l.quantity}` : '')));
      const div = document.createElement('div');
      div.style.cssText = 'font-size:0.72rem;color:var(--gold);padding:0.25rem 0.15rem;line-height:1.7;';
      div.textContent = summary.join(' · ');
      container.appendChild(div);
    }
  }

  function _advanceRoom() {
    const f = state.field;
    const template = DATA.fieldTemplates[f.templateId];
    const isBossRoom = f.room >= f.totalRooms - 1;
    const enemyPool = isBossRoom ? [template.boss] : template.enemies;
    const enemyId = enemyPool[Math.floor(Math.random() * enemyPool.length)];
    _startCombat(enemyId);
  }

  function _searchRoom() {
    const f = state.field;
    f.searched = true;
    const roll = Math.random();
    if (roll < 0.55) {
      // Found something
      const drops = [
        { id: 'healing-draft', weight: 50 },
        { id: 'demon-fragment', weight: 30 },
        { id: 'iron-splinter', weight: 20 },
      ];
      const drop = _weightedPick(drops);
      const dropDef = DATA.dropItems[drop.id];
      if (dropDef) {
        f.pendingLoot.push({ ...dropDef });
        log(`You search the area and find a ${dropDef.name}.`, 'reward');
      }
    } else {
      log('You search the area. Nothing of use here.', 'system');
    }
    _renderField();
  }

  function _returnToTown() {
    const f = state.field;

    // Bank everything
    if (f.pendingGold > 0) {
      state.player.gold += f.pendingGold;
      log(`Banked ◈ ${f.pendingGold} gold.`, 'reward');
    }
    if (f.pendingExp > 0) {
      _gainCombatSP(f.pendingExp);
    }
    f.pendingLoot.forEach(loot => {
      _addItemToInventory(loot);
      log(`Added to pack: ${loot.name}.`, 'reward');
    });

    state.field  = null;
    state.combat = null;
    state.mode   = 'town';

    saveGame();
    updateHud();
    navigate('city-square');
    log('You step back through the Gate into the Last City.', 'lore');
  }

  // ================================================
  // COMBAT SYSTEM
  // ================================================
  function _startCombat(enemyId) {
    const def = DATA.enemies[enemyId];
    if (!def) return;

    state.mode = 'combat';
    state.combat = {
      enemy: { ...def, hp: def.maxHp }, // fresh copy with full HP
      log: [],
    };

    _renderCombat();
    log(`Combat begins — ${def.name} appears!`, 'combat');
  }

  function _renderCombat() {
    const c = state.combat;
    const e = c.enemy;
    const hpPct = Math.max(0, Math.round((e.hp / e.maxHp) * 100));

    document.getElementById('location-area').textContent = e.isBoss ? 'BOSS ENCOUNTER' : 'COMBAT';
    document.getElementById('location-name').textContent = e.name;
    document.getElementById('location-desc').textContent = e.desc || '';

    const sceneText = document.getElementById('scene-text');
    sceneText.innerHTML = `
      <div class="enemy-hud">
        <div class="ehud-label">${e.name}</div>
        <div class="ehud-bar-wrap">
          <div class="ehud-bar ${hpPct < 30 ? 'low' : ''}" style="width:${hpPct}%"></div>
        </div>
        <div class="ehud-hp">${e.hp} / ${e.maxHp} HP</div>
      </div>
      <div class="combat-log">
        ${c.log.slice(-5).map(l => `<div class="clog-line ${l.type}">${l.msg}</div>`).join('')}
      </div>`;

    // Action panel
    const container = document.getElementById('action-buttons');
    container.innerHTML = '';
    _addSectionLabel(container, 'Combat');
    container.appendChild(_makeActionBtn('⚔', 'Attack', '', _playerAttack));

    const healItems = state.player.inventory.filter(i => i.type === 'consumable' && i.effect && i.effect.HP);
    if (healItems.length > 0) {
      healItems.forEach(item => {
        const disabled = state.player.hp.current >= state.player.hp.max;
        container.appendChild(_makeActionBtn('◇', `Use ${item.name}`, `×${item.quantity} · +${item.effect.HP} HP`, () => _useItem(item), disabled));
      });
    }
    container.appendChild(_makeActionBtn('↩', 'Flee', 'Return to town (lose loot)', _fleeCombat));
  }

  function _playerAttack() {
    const c = state.combat;
    const e = c.enemy;
    const playerAtk = _calcPlayerAtk();
    const enemyDef  = e.def;
    const dmg = Math.max(1, playerAtk - enemyDef + _variance(4));

    e.hp -= dmg;
    c.log.push({ msg: `You strike ${e.name} for ${dmg} damage.`, type: 'player-hit' });

    if (e.hp <= 0) {
      e.hp = 0;
      c.log.push({ msg: `${e.name} has been defeated!`, type: 'victory' });
      _renderCombat();
      setTimeout(_resolveCombatVictory, 800);
      return;
    }

    // Enemy retaliates
    _enemyAttack();
  }

  function _enemyAttack() {
    const c = state.combat;
    const e = c.enemy;
    const p = state.player;
    const playerDef = _calcPlayerDef();
    const dmg = Math.max(1, e.atk - playerDef + _variance(4));

    p.hp.current = Math.max(0, p.hp.current - dmg);
    c.log.push({ msg: `${e.name} strikes you for ${dmg} damage.`, type: 'enemy-hit' });
    updateHud();

    if (p.hp.current <= 0) {
      c.log.push({ msg: 'You have fallen.', type: 'defeat' });
      _renderCombat();
      setTimeout(_resolveCombatDefeat, 1000);
      return;
    }

    _renderCombat();
  }

  function _useItem(item) {
    const p = state.player;
    if (item.effect.HP) {
      const healed = Math.min(item.effect.HP, p.hp.max - p.hp.current);
      p.hp.current += healed;
      state.combat.log.push({ msg: `You drink a ${item.name}. Recovered ${healed} HP.`, type: 'heal' });
      item.quantity -= 1;
      if (item.quantity <= 0) {
        p.inventory = p.inventory.filter(i => i !== item);
      }
      updateHud();
    }
    // Enemy still gets an attack
    _enemyAttack();
  }

  function _fleeCombat() {
    const c = state.combat;
    const fleeName = c.enemy.name;
    state.combat = null;
    state.mode = 'field';
    _returnToTown();
    log(`You flee from ${fleeName}. All acquired loot is lost.`, 'system');
    // Wipe pending loot on flee
    if (state.field) { state.field.pendingLoot = []; state.field.pendingGold = 0; state.field.pendingExp = 0; }
  }

  function _resolveCombatVictory() {
    const f  = state.field;
    const c  = state.combat;
    const e  = c.enemy;

    // Accumulate rewards in field state
    f.pendingGold += e.gold;
    f.pendingExp  += e.exp;

    // Roll loot
    const dropped = [];
    e.loot.forEach(entry => {
      if (Math.random() < entry.chance) {
        const dropDef = DATA.dropItems[entry.id];
        if (dropDef) dropped.push(dropDef.name);
        _addPendingLoot(f, entry.id);
      }
    });

    log(`Victory! +${e.exp} EXP · ◈ ${e.gold} gold${dropped.length > 0 ? ` · ${dropped.join(', ')}` : ''}`, 'reward');

    state.combat = null;

    // Advance to next room
    f.room += 1;
    f.searched = false;

    if (f.room >= f.totalRooms) {
      // All rooms cleared — field complete
      state.mode = 'field';
      _renderFieldComplete();
    } else {
      state.mode = 'field';
      _renderField();
    }
  }

  function _resolveCombatDefeat() {
    log('You were defeated. Your loot is lost.', 'combat');
    state.combat = null;
    state.field.pendingLoot = [];
    state.field.pendingGold = 0;
    state.field.pendingExp  = 0;
    // Restore to 1 HP and return to town
    state.player.hp.current = Math.max(1, Math.floor(state.player.hp.max * 0.1));
    state.mode = 'field';
    _returnToTown();
    updateHud();
  }

  function _renderFieldComplete() {
    const template = DATA.fieldTemplates[state.field.templateId];
    document.getElementById('location-area').textContent = `${template.name} — CLEARED`;
    document.getElementById('location-name').textContent = 'Field Cleared';
    document.getElementById('location-desc').textContent = `The path beyond grows quieter. You have cleared ${template.name}.`;
    document.getElementById('scene-text').innerHTML = '';

    const container = document.getElementById('action-buttons');
    container.innerHTML = '';
    _addSectionLabel(container, 'Complete');
    container.appendChild(_makeActionBtn('↩', 'Return to Town', 'Bank all loot', _returnToTown));
    log(`${template.name} cleared!`, 'success');
  }

  // ================================================
  // COMBAT LEVEL / SP SYSTEM
  // ================================================
  function _calcCombatLevel(totalSP) {
    return Math.min(150, Math.max(1, Math.floor(totalSP / 25)));
  }

  function _gainCombatSP(amount) {
    const p = state.player;
    const prevLevel = p.combatLevel;
    p.combatSP   += amount;
    p.combatLevel = _calcCombatLevel(p.combatSP);
    log(`+${amount} SP earned (${p.combatSP} total · Level ${p.combatLevel})`, 'reward');
    if (p.combatLevel > prevLevel) {
      log(`Combat Level up! You are now Level ${p.combatLevel}.`, 'success');
    }
    updateHud();
  }

  // ================================================
  // INVENTORY HELPERS
  // ================================================
  function _addItemToInventory(itemDef) {
    const existing = state.player.inventory.find(i => i.id === itemDef.id);
    if (existing) {
      existing.quantity += itemDef.quantity || 1;
    } else {
      state.player.inventory.push({ ...itemDef, quantity: itemDef.quantity || 1 });
    }
  }

  function _addPendingLoot(fieldState, itemId) {
    const def = DATA.dropItems[itemId];
    if (!def) return;
    const existing = fieldState.pendingLoot.find(i => i.id === itemId);
    if (existing) {
      existing.quantity += 1;
    } else {
      fieldState.pendingLoot.push({ ...def, quantity: 1 });
    }
  }

  // ================================================
  // COMBAT HELPERS
  // ================================================
  function _calcPlayerAtk() {
    const p = state.player;
    let atk = p.PATK;
    const weaponId = p.equipment.weapon;
    if (weaponId) {
      const w = p.inventory.find(i => i.id === weaponId);
      if (w && w.statBonuses && w.statBonuses.PATK) atk += w.statBonuses.PATK;
    }
    return atk;
  }

  function _calcPlayerDef() {
    return state.player.PDEF;
  }

  function _variance(range) {
    return Math.floor(Math.random() * range * 2) - range;
  }

  function _weightedPick(entries) {
    const total = entries.reduce((sum, e) => sum + e.weight, 0);
    let roll = Math.random() * total;
    for (const e of entries) {
      roll -= e.weight;
      if (roll <= 0) return e;
    }
    return entries[entries.length - 1];
  }

  // ================================================
  // MODAL
  // ================================================
  function showModal(title, content, actions) {
    document.getElementById('modal-title').textContent = title;

    const contentEl = document.getElementById('modal-content');
    if (typeof content === 'string') {
      contentEl.innerHTML = content;
    } else {
      contentEl.innerHTML = '';
      contentEl.appendChild(content);
    }

    const actEl = document.getElementById('modal-actions');
    actEl.innerHTML = '';
    actions.forEach(a => {
      const btn = document.createElement('button');
      btn.className = a.primary ? 'btn-primary' : 'btn-ghost';
      btn.textContent = a.label;
      if (a.disabled) btn.disabled = true;
      if (a.id) btn.id = a.id;
      btn.addEventListener('click', a.action);
      actEl.appendChild(btn);
    });

    document.getElementById('modal-overlay').classList.remove('hidden');
  }

  function closeModal() {
    document.getElementById('modal-overlay').classList.add('hidden');
  }

  function _bindModalClose() {
    document.getElementById('modal-overlay').addEventListener('click', e => {
      if (e.target === document.getElementById('modal-overlay')) closeModal();
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
  }

  // ================================================
  // MESSAGE LOG
  // ================================================
  function log(message, type = 'info') {
    const container = document.getElementById('log-entries');
    const entry = document.createElement('div');
    entry.className = `log-entry log-${type}`;
    const prefix = { system: '>', info: '·', lore: '✦', combat: '⚔', reward: '◈', success: '✓' }[type] || '·';
    entry.innerHTML = `<span class="log-prefix">${prefix}</span>${message}`;
    container.prepend(entry);
    while (container.children.length > 80) container.removeChild(container.lastChild);
  }

  function clearLog() {
    document.getElementById('log-entries').innerHTML = '';
  }

  // ================================================
  // PUBLIC API
  // ================================================
  return {
    init, log, navigate, showModal, closeModal,
    showStatus, showInventory, updateHud, saveGame, loadGame,
    get state() { return state; },
  };

})();

document.addEventListener('DOMContentLoaded', () => Game.init());
