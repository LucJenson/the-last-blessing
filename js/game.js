// ================================================
// THE LAST BLESSING — Game Engine v0.1.0
// ================================================

const Game = (() => {

  // ---- STATE ----
  let state = null;

  function defaultState() {
    return {
      player: {
        name: '',
        race: '',
        raceName: '',
        classId: 'adept-rogue',
        className: 'Adept Rogue',
        level: 1,
        exp: 0,
        expToNext: 100,
        hp: { current: 100, max: 100 },
        mp: { current: 50, max: 50 },
        stats: { ...DATA.baseStats },
        inventory: [],
        equipment: { weapon: null, armor: null, accessory: null },
        gold: 150,
      },
      world: {
        location: 'city-square',
        flags: {},
        visitedLocations: [],
      },
      version: '0.1.0',
    };
  }

  // ---- CREATION STATE ----
  let creation = { name: '', race: '' };

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
  // SCREEN MANAGEMENT
  // ================================================
  function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const el = document.getElementById(`screen-${id}`);
    if (el) el.classList.add('active');
  }

  // ================================================
  // TITLE SCREEN
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
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(state));
    } catch (e) {
      log('Warning: could not save game.', 'system');
    }
  }

  function loadGame() {
    const saved = localStorage.getItem(SAVE_KEY);
    if (!saved) {
      showModal(
        'No Save Found',
        'No journey record was found on this device. Begin a new journey instead.',
        [
          { label: 'New Journey', primary: true, action: () => { closeModal(); startNewGame(); } },
          { label: 'Cancel', action: closeModal },
        ]
      );
      return;
    }
    try {
      state = JSON.parse(saved);
      _startGameLoop();
      log(`Welcome back, ${state.player.name}.`, 'info');
      log('Journey record loaded.', 'system');
    } catch (e) {
      showModal(
        'Save Corrupted',
        'Your journey record could not be read. You may need to begin again.',
        [
          { label: 'New Journey', primary: true, action: () => { closeModal(); startNewGame(); } },
          { label: 'Cancel', action: closeModal },
        ]
      );
    }
  }

  // ================================================
  // CHARACTER CREATION
  // ================================================
  function _resetCreation() {
    creation = { name: '', race: '' };
    document.getElementById('input-name').value = '';
    document.querySelectorAll('.race-card').forEach(c => c.classList.remove('selected'));
    document.getElementById('btn-race-next').disabled = true;
    _updateProgressDots('name');
    _buildRaceCards();
  }

  function _showCreationStep(stepId) {
    document.querySelectorAll('.creation-step').forEach(s => s.classList.remove('active'));
    document.getElementById(`step-${stepId}`).classList.add('active');
    _updateProgressDots(stepId);
  }

  function _updateProgressDots(stepId) {
    const order = ['name', 'race', 'confirm'];
    const idx = order.indexOf(stepId);
    document.querySelectorAll('.step-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i <= idx);
    });
  }

  function _buildRaceCards() {
    const container = document.getElementById('race-cards');
    container.innerHTML = '';
    Object.values(DATA.races).forEach(race => {
      const card = document.createElement('div');
      card.className = 'race-card';
      card.dataset.raceId = race.id;
      card.innerHTML = `
        <span class="race-check">✓</span>
        <div class="race-name">${race.name}</div>
        <div class="race-lore">${race.lore}</div>
        <div class="race-stats">
          ${race.statDisplay.map(s => `<span class="stat-badge">${s}</span>`).join('')}
        </div>
      `;
      card.addEventListener('click', () => {
        creation.race = race.id;
        document.querySelectorAll('.race-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        document.getElementById('btn-race-next').disabled = false;
      });
      container.appendChild(card);
    });
  }

  function _buildConfirmCard() {
    const race = DATA.races[creation.race];
    document.getElementById('confirm-details').innerHTML = `
      <div class="confirm-row">
        <span class="confirm-label">Name</span>
        <span class="confirm-value">${creation.name}</span>
      </div>
      <div class="confirm-row">
        <span class="confirm-label">Race</span>
        <span class="confirm-value">${race.name}</span>
      </div>
      <div class="confirm-row">
        <span class="confirm-label">Class</span>
        <span class="confirm-value">${DATA.startingClass.name}</span>
      </div>
      <div class="confirm-row">
        <span class="confirm-label">Starting HP</span>
        <span class="confirm-value">${race.startingHp}</span>
      </div>
      <div class="confirm-row">
        <span class="confirm-label">Starting MP</span>
        <span class="confirm-value">${race.startingMp + (race.statBonuses.mp || 0)}</span>
      </div>
    `;
  }

  function _bindCreationButtons() {
    const nameInput = document.getElementById('input-name');
    const btnNameNext = document.getElementById('btn-name-next');

    btnNameNext.addEventListener('click', () => {
      const name = nameInput.value.trim();
      if (name.length < 2) { nameInput.focus(); return; }
      creation.name = name;
      _showCreationStep('race');
    });

    nameInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') btnNameNext.click();
    });

    document.getElementById('btn-race-back').addEventListener('click', () => {
      _showCreationStep('name');
    });

    document.getElementById('btn-race-next').addEventListener('click', () => {
      if (!creation.race) return;
      _buildConfirmCard();
      _showCreationStep('confirm');
    });

    document.getElementById('btn-confirm-back').addEventListener('click', () => {
      _showCreationStep('race');
    });

    document.getElementById('btn-confirm-start').addEventListener('click', _confirmCreation);
  }

  function _confirmCreation() {
    const race = DATA.races[creation.race];

    state.player.name = creation.name;
    state.player.race = creation.race;
    state.player.raceName = race.name;

    // Apply race stat bonuses
    const bonuses = race.statBonuses;
    if (bonuses.str) state.player.stats.str += bonuses.str;
    if (bonuses.dex) state.player.stats.dex += bonuses.dex;
    if (bonuses.int) state.player.stats.int += bonuses.int;
    if (bonuses.vit) state.player.stats.vit += bonuses.vit;

    // Set HP / MP
    state.player.hp.max     = race.startingHp;
    state.player.hp.current = race.startingHp;
    state.player.mp.max     = race.startingMp + (bonuses.mp || 0);
    state.player.mp.current = state.player.mp.max;

    // Give starting items
    state.player.inventory = DATA.startingItems.map(item => ({ ...item }));

    saveGame();
    _startGameLoop();

    // Arrival log
    const arrival = DATA.arrivalText[creation.race] || 'You have arrived at the Last City.';
    log(arrival, 'lore');
    log(`Your journey begins, ${state.player.name}.`, 'info');
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
    document.getElementById('hud-level').textContent = `Lv.${p.level}`;
    document.getElementById('hud-gold').textContent  = p.gold;

    const hpPct = Math.max(0, Math.round((p.hp.current / p.hp.max) * 100));
    const mpPct = Math.max(0, Math.round((p.mp.current / p.mp.max) * 100));

    document.getElementById('hp-fill').style.width  = `${hpPct}%`;
    document.getElementById('mp-fill').style.width  = `${mpPct}%`;
    document.getElementById('hp-value').textContent = `${p.hp.current}/${p.hp.max}`;
    document.getElementById('mp-value').textContent = `${p.mp.current}/${p.mp.max}`;
  }

  function _bindHudButtons() {
    document.getElementById('btn-inventory').addEventListener('click', showInventory);
    document.getElementById('btn-status').addEventListener('click', showStatus);
  }

  // ================================================
  // NAVIGATION
  // ================================================
  function navigate(locationId, doLog = true) {
    const loc = DATA.locations[locationId];
    if (!loc) return;

    state.world.location = locationId;

    // Track visited
    if (!state.world.visitedLocations.includes(locationId)) {
      state.world.visitedLocations.push(locationId);
    }

    // Update scene
    document.getElementById('location-area').textContent = loc.area;
    document.getElementById('location-name').textContent = loc.name;
    document.getElementById('location-desc').textContent = loc.description;
    document.getElementById('scene-text').innerHTML = '';

    _buildActionButtons(loc);

    if (doLog) {
      log(`→ ${loc.name}`, 'system');
      saveGame();
    }
  }

  function _buildActionButtons(loc) {
    const container = document.getElementById('action-buttons');
    container.innerHTML = '';

    // Travel exits
    if (loc.exits && loc.exits.length > 0) {
      _addSectionLabel(container, 'Travel');
      loc.exits.forEach(exit => {
        container.appendChild(
          _makeActionBtn(exit.icon, exit.label, exit.desc, () => navigate(exit.id))
        );
      });
    }

    // Location actions
    if (loc.actions && loc.actions.length > 0) {
      _addSectionLabel(container, 'Actions');
      loc.actions.forEach(action => {
        container.appendChild(
          _makeActionBtn(action.icon, action.label, '', () => _dispatch(action))
        );
      });
    }
  }

  function _addSectionLabel(container, text) {
    const div = document.createElement('div');
    div.className = 'action-section-label';
    div.textContent = text;
    container.appendChild(div);
  }

  function _makeActionBtn(icon, label, sub, onClick) {
    const btn = document.createElement('button');
    btn.className = 'action-btn';
    btn.innerHTML = `
      <span class="btn-icon">${icon}</span>
      <span>${label}${sub ? `<br><small style="color:var(--text-muted);font-size:0.68em">${sub}</small>` : ''}</span>
    `;
    btn.addEventListener('click', onClick);
    return btn;
  }

  // ================================================
  // ACTION DISPATCH
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

  // ================================================
  // SEVEN BLESSINGS
  // ================================================
  function _showBlessings() {
    const html = DATA.blessings.map(b => `
      <div style="margin-bottom:1.4rem; padding-bottom:1.4rem; border-bottom:1px solid var(--border-dim);">
        <div style="font-size:0.65rem; color:var(--cyan); letter-spacing:0.2em; text-transform:uppercase; margin-bottom:0.25rem;">${b.number}</div>
        <div style="font-family:var(--font-fantasy); color:var(--text-primary); font-size:0.95rem; margin-bottom:0.2rem;">${b.title}</div>
        <div style="font-size:0.73rem; color:var(--purple); margin-bottom:0.55rem;">${b.subtitle}</div>
        <div style="font-size:0.79rem; color:var(--text-muted); white-space:pre-line; line-height:1.7;">${b.text}</div>
      </div>
    `).join('');

    showModal('The Seven Blessings', html, [
      { label: 'Close', action: closeModal },
    ]);
    log('You read the Seven Blessings etched into the cathedral walls.', 'lore');
  }

  // ================================================
  // PRAYER
  // ================================================
  function _showPrayer() {
    const responses = DATA.prayers;
    const response = responses[Math.floor(Math.random() * responses.length)];
    showModal(
      'Offer a Prayer',
      `<p style="color:var(--text-muted); font-style:italic;">${response}</p>`,
      [{ label: 'Rise', action: closeModal }]
    );
    log('You kneel before the altar.', 'lore');
  }

  // ================================================
  // STATUS
  // ================================================
  function showStatus() {
    const p = state.player;
    const expBar = Math.round((p.exp / p.expToNext) * 100);
    showModal('Character Record', `
      <div style="display:flex; flex-direction:column; gap:0;">
        <div class="confirm-row"><span class="confirm-label">Name</span><span class="confirm-value">${p.name}</span></div>
        <div class="confirm-row"><span class="confirm-label">Race</span><span class="confirm-value">${p.raceName}</span></div>
        <div class="confirm-row"><span class="confirm-label">Class</span><span class="confirm-value">${p.className}</span></div>
        <div class="confirm-row"><span class="confirm-label">Level</span><span class="confirm-value">${p.level}</span></div>
        <div class="confirm-row"><span class="confirm-label">EXP</span><span class="confirm-value">${p.exp} / ${p.expToNext} (${expBar}%)</span></div>
        <div class="confirm-row"><span class="confirm-label">HP</span><span class="confirm-value">${p.hp.current} / ${p.hp.max}</span></div>
        <div class="confirm-row"><span class="confirm-label">MP</span><span class="confirm-value">${p.mp.current} / ${p.mp.max}</span></div>
        <div class="confirm-row"><span class="confirm-label">STR</span><span class="confirm-value">${p.stats.str}</span></div>
        <div class="confirm-row"><span class="confirm-label">DEX</span><span class="confirm-value">${p.stats.dex}</span></div>
        <div class="confirm-row"><span class="confirm-label">INT</span><span class="confirm-value">${p.stats.int}</span></div>
        <div class="confirm-row"><span class="confirm-label">VIT</span><span class="confirm-value">${p.stats.vit}</span></div>
        <div class="confirm-row"><span class="confirm-label">Gold</span><span class="confirm-value">◈ ${p.gold}</span></div>
      </div>
    `, [{ label: 'Close', action: closeModal }]);
  }

  // ================================================
  // INVENTORY
  // ================================================
  function showInventory() {
    const inv = state.player.inventory;
    let html;

    if (inv.length === 0) {
      html = '<div style="color:var(--text-muted); padding:0.5rem 0;">Your pack is empty.</div>';
    } else {
      html = inv.map(item => `
        <div class="confirm-row">
          <span class="confirm-label">${item.name}${item.quantity > 1 ? ` ×${item.quantity}` : ''}</span>
          <span style="font-size:0.75rem; color:var(--text-muted); text-align:right;">${item.desc}</span>
        </div>
      `).join('');
    }

    showModal('Pack', html, [{ label: 'Close', action: closeModal }]);
  }

  // ================================================
  // EXPEDITION BOARD
  // ================================================
  function _showBoard() {
    showModal(
      'Expedition Board',
      '<div style="color:var(--text-muted);">The board is quiet for now. No active expedition postings.<br><br><span style="color:var(--text-dim); font-size:0.78rem;">Guild quests will be available here once the Board system is built.</span></div>',
      [{ label: 'Close', action: closeModal }]
    );
    log('You scan the expedition board.', 'system');
  }

  // ================================================
  // SHOP (Market Row — placeholder)
  // ================================================
  function _showShop() {
    showModal(
      'Market Row',
      '<div style="color:var(--text-muted);">The merchants eye you with varying degrees of suspicion.<br><br><span style="color:var(--text-dim); font-size:0.78rem;">The shop system is coming. For now, the merchants wait.</span></div>',
      [{ label: 'Leave', action: closeModal }]
    );
    log('You browse the market stalls.', 'system');
  }

  // ================================================
  // GODDESS GATE
  // ================================================
  function _showGoddessGate() {
    showModal(
      'Goddess Gate',
      `
        <p style="margin-bottom:1rem;">Three stone recesses surround the gate, each shaped to receive a Keystone. The frame pulses once, twice — then holds steady, waiting.</p>
        <p style="color:var(--text-dim); font-size:0.78rem; border-top:1px solid var(--border-dim); padding-top:0.85rem; margin-top:0.25rem;">
          The Keystone system is coming next. You will select three Keystones from your pack to attune a path through the Gate — field or dungeon, shaped by the combination you choose.
        </p>
      `,
      [{ label: 'Step Back', action: closeModal }]
    );
    log('You approach the Goddess Gate. The aetheric light hums at your presence.', 'lore');
  }

  // ================================================
  // MODAL
  // ================================================
  function showModal(title, content, actions) {
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-content').innerHTML = content;

    const actEl = document.getElementById('modal-actions');
    actEl.innerHTML = '';
    actions.forEach(a => {
      const btn = document.createElement('button');
      btn.className = a.primary ? 'btn-primary' : 'btn-ghost';
      btn.textContent = a.label;
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
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeModal();
    });
  }

  // ================================================
  // MESSAGE LOG
  // ================================================
  function log(message, type = 'info') {
    const container = document.getElementById('log-entries');
    const entry = document.createElement('div');
    entry.className = `log-entry log-${type}`;
    const prefixMap = {
      system:  '>',
      info:    '·',
      lore:    '✦',
      combat:  '⚔',
      reward:  '◈',
      success: '✓',
    };
    const prefix = prefixMap[type] || '·';
    entry.innerHTML = `<span class="log-prefix">${prefix}</span>${message}`;
    container.prepend(entry);

    // Cap log at 60 entries
    while (container.children.length > 60) {
      container.removeChild(container.lastChild);
    }
  }

  function clearLog() {
    document.getElementById('log-entries').innerHTML = '';
  }

  // ================================================
  // PUBLIC API
  // ================================================
  return {
    init,
    log,
    navigate,
    showModal,
    closeModal,
    showStatus,
    showInventory,
    updateHud,
    saveGame,
    loadGame,
    get state() { return state; },
  };

})();

// Boot
document.addEventListener('DOMContentLoaded', () => Game.init());
