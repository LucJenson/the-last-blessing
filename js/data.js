// ================================================
// THE LAST BLESSING — Game Data
// World: The Seven Blessings
// ================================================

const DATA = {

  // ---- SPECIES (6 sub-races across 3 Beings) ----
  species: {
    fole: {
      id: 'fole', being: 'Elf', name: 'Fole', faction: 'Briar Collective',
      lore: 'Root-walkers of the deep groves. Sturdier than their cousins, the Fole maintain the old bark-rites and speak to soil rather than sky.',
      mods: { HP: 5, SP: 0, TP: 0, MP: 0 },
      modDisplay: ['HP+5'],
      bannedClass: 'Guard Knight',
    },
    nume: {
      id: 'nume', being: 'Elf', name: 'Nume', faction: 'Sylvan Collective',
      lore: 'Canopy-singers with an affinity for wave magic. More fragile than other Elves, but their connection to the aether runs deep.',
      mods: { HP: -5, SP: 0, TP: 0, MP: 5 },
      modDisplay: ['HP−5', 'MP+5'],
      bannedClass: 'Branded Barbarian',
    },
    kkyn: {
      id: 'kkyn', being: 'Human', name: 'Kkyn', faction: 'Steel Clan',
      lore: 'Forge-born and battle-hardened. The Kkyn built the walls and manned them. They trade in iron and oaths.',
      mods: { HP: 10, SP: 0, TP: 5, MP: 0 },
      modDisplay: ['HP+10', 'TP+5'],
      bannedClass: null,
    },
    oeld: {
      id: 'oeld', being: 'Human', name: 'Oeld', faction: 'Oak Clan',
      lore: 'Scholars and wayfarers. The Oeld preserved knowledge through the dark years — what the dome destroyed, they remembered.',
      mods: { HP: 0, SP: 0, TP: 0, MP: 10 },
      modDisplay: ['MP+10'],
      bannedClass: null,
    },
    tamo: {
      id: 'tamo', being: 'Beast', name: 'Tamo', faction: 'Paw Tribe',
      lore: 'Broad-shouldered and fearless. The Tamo were the first Beast-kind to cross into the Last City, and they have not stopped fighting since.',
      mods: { HP: 15, SP: 0, TP: 0, MP: 0 },
      modDisplay: ['HP+15'],
      bannedClass: 'Tome Summoner',
    },
    wyld: {
      id: 'wyld', being: 'Beast', name: 'Wyld', faction: 'Fang Tribe',
      lore: 'Fast, instinct-driven, and difficult to predict. The Wyld do not follow paths — they make them.',
      mods: { HP: 5, SP: 5, TP: 0, MP: 0 },
      modDisplay: ['HP+5', 'SP+5'],
      bannedClass: 'Aura Priest',
    },
  },

  // ---- BASE CLASSES (4 starting classes) ----
  baseClasses: {
    'blade-brandier': {
      id: 0, key: 'blade-brandier',
      name: 'Blade Brandier',
      classType: 'Melee Physical', weight: 'Heavy',
      weaponType: 'Blade', dmgTypes: ['Slashing', 'Piercing'],
      desc: 'A heavy-armored swordfighter. Prioritizes raw physical power and durability over speed.',
      noviceBox: {
        id: 0, name: 'Novice Blade Brandier', lpCost: 5, cpEarned: 25,
        certificate: 'Blade_License',
        statBonuses: { SP: 14, TP: 7, PATK: 4, PDEF: 1, PHIT: 3, PEVA: 1 },
      },
      starterWeapon: {
        id: 'rusty-blade', name: 'Rusty Blade', type: 'weapon', weaponType: 'Blade',
        desc: 'A chipped short sword. Standard issue for new arrivals at the Guild.',
        quantity: 1,
        statBonuses: { SP: 14, TP: 7, PATK: 4, PDEF: 1, PHIT: 3, PEVA: 1 },
      },
    },
    'twin-blade': {
      id: 1, key: 'twin-blade',
      name: 'Twin Blade',
      classType: 'Melee Physical', weight: 'Medium',
      weaponType: 'Twin Blades', dmgTypes: ['Slashing', 'Cursing'],
      desc: 'A dual-wielding specialist. Trades defense for speed, with minor access to cursing techniques.',
      noviceBox: {
        id: 18, name: 'Novice Twin Blade', lpCost: 5, cpEarned: 25,
        certificate: 'Twin_Blades_License',
        statBonuses: { HP: 12, SP: 9, TP: 9, MP: 2, PATK: 3, PDEF: 1, PHIT: 3, PEVA: 2, MATK: 1, MDEF: 1, MHIT: 1, MEVA: 1 },
      },
      starterWeapon: {
        id: 'rusty-twin-blades', name: 'Rusty Twin Blades', type: 'weapon', weaponType: 'Twin Blades',
        desc: 'A mismatched pair of short blades. Functional, if not elegant.',
        quantity: 1,
        statBonuses: { SP: 6, TP: 4, PATK: 4, PDEF: 2, PHIT: 2, PEVA: 2, MDEF: 1, MHIT: 1 },
      },
    },
    'wave-user': {
      id: 2, key: 'wave-user',
      name: 'Wave User',
      classType: 'Melee Magical', weight: 'Light',
      weaponType: 'Focus', dmgTypes: ['Arcane', 'Support'],
      desc: 'A magic practitioner who channels elemental forces through a Focus. Low physical presence, high magical output.',
      noviceBox: {
        id: 36, name: 'Novice Wave User', lpCost: 5, cpEarned: 25,
        certificate: 'Focus_License',
        statBonuses: { HP: 14, SP: 6, TP: 4, MP: 16, PATK: 1, PDEF: 1, PHIT: 3, PEVA: 3, MATK: 6, MDEF: 5, MHIT: 5, MEVA: 4, FIR: 1, WTR: 3, AIR: 3, LGT: 3 },
      },
      starterWeapon: {
        id: 'rusty-focus', name: 'Rusty Focus', type: 'weapon', weaponType: 'Focus',
        desc: 'A cracked aetheric focus. It still resonates, barely.',
        quantity: 1,
        statBonuses: { HP: 12, SP: 9, TP: 9, MP: 2, PATK: 3, PDEF: 1, PHIT: 3, PEVA: 2, MATK: 1, MDEF: 1, MHIT: 1, MEVA: 1, WTR: 1, AIR: 1, DRK: 1 },
      },
    },
    'harvest-cleric': {
      id: 3, key: 'harvest-cleric',
      name: 'Harvest Cleric',
      classType: 'Ranged Magical', weight: 'Light',
      weaponType: 'Wand', dmgTypes: ['Arcane', 'Relic'],
      desc: 'A wand-wielding support class with strong healing and relic magic. Balanced between magic and technique.',
      noviceBox: {
        id: 54, name: 'Novice Harvest Cleric', lpCost: 5, cpEarned: 25,
        certificate: 'Wand_License',
        statBonuses: { HP: 18, SP: 5, TP: 4, MP: 11, PATK: 2, PDEF: 2, PHIT: 3, PEVA: 2, MATK: 4, MDEF: 4, MHIT: 3, MEVA: 3, WTR: 3, AIR: 1, LGT: 3, DRK: 1 },
      },
      starterWeapon: {
        id: 'rusty-wand', name: 'Rusty Wand', type: 'weapon', weaponType: 'Wand',
        desc: 'A tarnished wand. The crystal at its tip is still intact.',
        quantity: 1,
        statBonuses: { HP: 18, SP: 6, TP: 4, PATK: 4, PDEF: 1, PHIT: 2, PEVA: 3, MDEF: 1, MHIT: 1, MEVA: 1, AIR: 1, DRK: 1 },
      },
    },
  },

  // ---- STAT DEFINITIONS ----
  stats: {
    resources:  ['HP', 'SP', 'TP', 'MP'],
    combat:     ['PATK', 'PDEF', 'PHIT', 'PEVA', 'MATK', 'MDEF', 'MHIT', 'MEVA'],
    elemental:  ['FIR', 'WTR', 'AIR', 'ERT', 'LGT', 'DRK'],
    allKeys: ['HP', 'SP', 'TP', 'MP', 'PATK', 'PDEF', 'PHIT', 'PEVA', 'MATK', 'MDEF', 'MHIT', 'MEVA', 'FIR', 'WTR', 'AIR', 'ERT', 'LGT', 'DRK'],
    labels: {
      HP: 'Health', SP: 'Skill Pts', TP: 'Technique', MP: 'Magic',
      PATK: 'P.ATK', PDEF: 'P.DEF', PHIT: 'P.HIT', PEVA: 'P.EVA',
      MATK: 'M.ATK', MDEF: 'M.DEF', MHIT: 'M.HIT', MEVA: 'M.EVA',
      FIR: 'Fire', WTR: 'Water', AIR: 'Air', ERT: 'Earth', LGT: 'Light', DRK: 'Dark',
    },
  },

  // ---- COMBAT LEVEL FORMULA ----
  // combat_level = floor(totalCP / 25) + 1, capped at 150
  combatLevelFormula: { cpPerLevel: 25, base: 1, cap: 150 },

  // ---- LOCATIONS ----
  locations: {
    'city-square': {
      id: 'city-square', area: 'The Last City', name: 'City Square',
      description: 'The heart of civilization\'s last refuge. Stone towers rise behind protective wards humming with the Goddess\'s fading light. Adventurers move through the square between expeditions, trading stories and supplies beneath the pale dome.',
      exits: [
        { id: 'market-row',   label: 'Market Row',               icon: '⚖', desc: 'Merchants and trade' },
        { id: 'cathedral',    label: 'Cathedral of the Goddess', icon: '✦', desc: 'Lore and prayer' },
        { id: 'guild-hall',   label: "Adventurer's Guild",       icon: '⚔', desc: 'Quests and records' },
        { id: 'goddess-gate', label: 'Goddess Gate',             icon: '◎', desc: 'Portal to beyond the dome' },
      ],
      actions: [],
    },
    'market-row': {
      id: 'market-row', area: 'The Last City', name: 'Market Row',
      description: 'A crooked lane of repurposed buildings and canvas stalls. The smell of steam-cooked food mingles with oil and rust. Merchants of all three peoples hawk goods salvaged from beyond the dome — some genuine, some certainly not.',
      exits: [{ id: 'city-square', label: 'City Square', icon: '↩', desc: 'Return to the square' }],
      actions: [{ id: 'browse-market', label: 'Browse Wares', icon: '⚖', type: 'shop' }],
    },
    'cathedral': {
      id: 'cathedral', area: 'The Last City', name: 'Cathedral of the Goddess',
      description: 'The oldest building still standing. Its walls are etched with the Seven Blessings in three tongues: Elvish root-script, human iron-letters, and Beast claw-marks. Candles burn along every ledge. No one refills them.',
      exits: [{ id: 'city-square', label: 'City Square', icon: '↩', desc: 'Return to the square' }],
      actions: [
        { id: 'read-blessings', label: 'Read the Seven Blessings', icon: '✦', type: 'lore' },
        { id: 'pray',           label: 'Offer a Prayer',           icon: '◇', type: 'pray' },
      ],
    },
    'guild-hall': {
      id: 'guild-hall', area: 'The Last City', name: "Adventurer's Guild",
      description: 'A squat, loud building smelling of sweat and ambition. Expedition boards line every wall — some fresh, most old and curling at the corners. A gruff Beast in a leather apron mans the counter. Your record is kept here.',
      exits: [{ id: 'city-square', label: 'City Square', icon: '↩', desc: 'Return to the square' }],
      actions: [
        { id: 'view-record', label: 'View Your Record', icon: '📋', type: 'status' },
        { id: 'view-board',  label: 'Expedition Board', icon: '📌', type: 'board' },
      ],
    },
    'goddess-gate': {
      id: 'goddess-gate', area: 'The Last City', name: 'Goddess Gate',
      description: 'A circular stone archway at the city\'s center, pulsing with slow aetheric light. Three carved recesses surround the frame — each shaped to receive a Keystone. The air here carries a faint smell of distant places: pine resin, saltwater, something burning.',
      exits: [{ id: 'city-square', label: 'City Square', icon: '↩', desc: 'Return to the square' }],
      actions: [{ id: 'attune-gate', label: 'Attune the Gate', icon: '◎', type: 'gate' }],
    },
  },

  // ---- THE SEVEN BLESSINGS ----
  blessings: [
    {
      number: 'First Blessing', title: 'The Sprouting Song', subtitle: 'The Birth of the Elves',
      text: 'From root to leaf, from seed to sun,\nThe Breath of the World did bloom as One.\nGreen minds awoke in dew-soaked groves,\nRotund and kind, they spoke in prose.\n\nThese Elves, born from sap and spirit, held no hunger, wrought no steel.\nThey danced with time and whispered to roots.',
    },
    {
      number: 'Second Blessing', title: 'The Shaping Flame', subtitle: 'The Creation of Humans',
      text: 'In quiet grove and mossy glade, we sang where sun and shadow played.\nYet hands so soft and hearts so pure could not all burdens long endure.\n\nThe Goddess watched, Her gaze made warm,\nAnd shaped new life with earthen form.\nFrom stone and sky, from ash and flame, She forged the folk who bore no name.\n\nNot made of root nor bloom nor bough, but worthy to call our world their home.',
    },
    {
      number: 'Third Blessing', title: 'The Idea to Inspire Invention', subtitle: 'The Gift of Steam',
      text: 'From the mountain\'s breath, we drew power.\nSteam: the fire without flame.\n\nWheels turned, towers rose, and skyships sailed.\nThe Goddess, in Her joy, saw us as One Hand.\n\nSteam reshaped the world; its roar silenced the old songs.\nThe Beasts were wild and wise in their own way.\nThey raged at the scarring of the land.\n\nSo came the first war.',
    },
    {
      number: 'Fourth Blessing', title: 'The Feelings of Fur and Fang', subtitle: 'The Lifting of Beasts',
      text: 'The Goddess raised the Beasts, gave them voice, gave them thought.\nThe Bear-Kings and Serpent-Speakers sued for peace.\nBorders were drawn — not lines of division, but invitations to cohabitation.\n\nFor a time, all three Peoples shared the world.\nBut wounds festered, and the world\'s soul had already begun to rot.\nThe Titans had already marched.',
    },
    {
      number: 'Fifth Blessing', title: 'The Chains of the Colossi', subtitle: 'The Sealing of the Titans',
      text: 'The Titans — not born of nature or divine breath, but of hatred.\nThese twisted giants tore the world. Cities fell like autumn leaves.\n\nAt the edge of extinction, champions arose.\nThe Goddess marked them — tattoos like constellations of power.\n\nTogether, they fought. Together, they sealed the Titans deep below.\nBut not before the rift was opened.\n\nDemons come.',
    },
    {
      number: 'Sixth Blessing', title: 'The Prayer of Protection', subtitle: 'The Vanishing of the Goddess',
      text: 'For two hundred years, there was only retreat.\nHighways of ash and bone.\n\nCities burned. Kingdoms undone. The Last City stood.\n\nThe Goddess, pale and flickering like a dying candle,\nraised Her final shield — a dome of light, soft as a whisper, strong as old roots.\n\nShe spoke no words. She wept once. Then vanished.\n\nThe people rebuilt. Slowly. Carefully.\nAlways listening to the howls beyond the Goddess\' light.',
    },
    {
      number: 'Seventh Blessing', title: 'The Eye of the Goddess', subtitle: 'The Return of Hope',
      text: 'Ten years ago, a shimmer appeared in the city\'s heart. A new blessing.\n\nThe Eye of the Goddess — a stone gate, circular and humming, pulsing with aetheric light.\nIt reaches distant lands. Places still wild, still demonic — but not yet lost.\n\nCrafted Keystones form strings. Strings open paths. Travellers walk them, scavenging hope.\n\nShe appeared once more. Thin as fog, brighter than fire.\n"Go forth," she said. Then silence.\n\nNow, we go through the Eye. Not to find paradise — but to make it.',
    },
  ],

  // ---- KEYSTONES ----
  keystones: {
    earth:  { id: 'earth',  name: 'Keystone of Earth',  element: 'earth',  color: '#4ade80', desc: 'Carved from old stone. Smells of roots and soil.' },
    fire:   { id: 'fire',   name: 'Keystone of Fire',   element: 'fire',   color: '#fb923c', desc: 'Warm to the touch. Never cools completely.' },
    water:  { id: 'water',  name: 'Keystone of Water',  element: 'water',  color: '#60a5fa', desc: 'Faintly damp. Hums softly in your palm.' },
    wind:   { id: 'wind',   name: 'Keystone of Wind',   element: 'wind',   color: '#a3e635', desc: 'Lighter than it looks. Tugs faintly upward.' },
    shadow: { id: 'shadow', name: 'Keystone of Shadow', element: 'shadow', color: '#a78bfa', desc: 'Absorbs light. Cold to the touch.' },
    steam:  { id: 'steam',  name: 'Keystone of Steam',  element: 'steam',  color: '#fdba74', desc: 'Vibrates faintly. Smells of copper and heat.' },
  },

  // ---- FIELD TEMPLATES ----
  fieldTemplates: {
    'withered-grove': {
      id: 'withered-grove', name: 'The Withered Grove', dominantKey: 'earth', type: 'field',
      description: 'A forest that died the moment the demons came through — but its roots still remember something like hunger. The trees move when you are not watching them.',
      roomDescriptions: [
        'Gnarled roots split the soil around you. The undergrowth is still, but you get the sense it is deciding something.',
        'The canopy overhead blocks all light. Something knocks steadily against the trees from inside.',
        'A ring of dead saplings circles a clearing. The ground here is darker than it should be.',
      ],
      bossDescription: 'At the grove\'s heart, something ancient and enormous rises from the soil. It has been here longer than the demons. It was waiting.',
      enemies: ['vine-stalker', 'bark-horror'], boss: 'elder-root', totalRooms: 3,
    },
    'howling-flats': {
      id: 'howling-flats', name: 'The Howling Flats', dominantKey: 'wind', type: 'field',
      description: 'A vast, stripped plain where the wind never stops. No structures remain standing. The sound it makes through the debris sounds almost like words.',
      roomDescriptions: [
        'The wind tears at your cloak. Shapes dart at the edge of visibility.',
        'The ruins of a watchtower, completely flattened. The stones have been worn smooth by something other than weather.',
        'The gusts here are stronger, carrying grit that stings exposed skin. Something is circling.',
      ],
      bossDescription: 'The wind drops completely. An enormous shape condenses from the debris — a column of howling energy, taking form.',
      enemies: ['shard-wraith', 'dust-devil'], boss: 'gale-titan', totalRooms: 3,
    },
    'smoldering-hollow': {
      id: 'smoldering-hollow', name: 'The Smoldering Hollow', dominantKey: 'fire', type: 'field',
      description: 'A system of volcanic caves beneath a collapsed city, kept active by whatever tore the rifts open. The air burns to breathe. Everything here wants to see you melt.',
      roomDescriptions: [
        'Lava cracks line the stone floor. The heat is tremendous.',
        'A venting steam-shaft fills the cavern with scalding fog. Shapes move within it.',
        'The cave opens into a chamber where something was clearly worshipped, once. The altar is still warm.',
      ],
      bossDescription: 'The deepest chamber pulses with heat. Something vast unfolds its wings from the far wall.',
      enemies: ['ash-crawler', 'steam-imp'], boss: 'furnace-drake', totalRooms: 3,
    },
    'drowned-district': {
      id: 'drowned-district', name: 'The Drowned District', dominantKey: 'water', type: 'field',
      description: 'A city quarter lost beneath floodwater. The demons here do not drown. Neither, it seems, do their dead.',
      roomDescriptions: [
        'Floodwater reaches your knees. Something beneath the surface nudges your foot.',
        'A partially submerged building. The upper floors are accessible, and something has been living in them.',
        'The water here is still and black. Your own reflection does not quite match your movements.',
      ],
      bossDescription: 'The flood opens into a vast sunken square. A shape the size of a house rises from the water.',
      enemies: ['bloated-shambler', 'rift-eel'], boss: 'drowned-warden', totalRooms: 3,
    },
    'sunken-citadel': {
      id: 'sunken-citadel', name: 'The Sunken Citadel', dominantKey: 'shadow', type: 'dungeon',
      description: 'A fortress pulled into corrupted earth during the Titan wars. It is darker here than it should be. Lights go out when you enter a room.',
      roomDescriptions: [
        'The corridor ahead is total darkness. Your eyes adjust slowly — and you wish they had not.',
        'A great hall, its banners long rotted. The thrones at its far end are occupied.',
        'A room full of mirrors, all of them covered. One has been uncovered from the inside.',
        'The citadel\'s lowest level. The air is wrong here. Pressure you can feel in your teeth.',
      ],
      bossDescription: 'At the citadel\'s lowest point — a chamber that should not exist. Something breathes in it.',
      enemies: ['hollow-shade', 'bone-sentinel'], boss: 'the-nameless', totalRooms: 4,
    },
    'steam-vaults': {
      id: 'steam-vaults', name: 'The Steam Vaults', dominantKey: 'steam', type: 'field',
      description: 'Industrial tunnels built during the Third Blessing, now overrun. The machinery still runs. No one is operating it.',
      roomDescriptions: [
        'Pipes the width of a man line the walls, hissing and dripping. The gauges still spin.',
        'A vast valve chamber. Something has been using the control panels — recently.',
        'The pipes here are warped and burst. Steam fills the room constantly, obscuring everything.',
      ],
      bossDescription: 'The central control room. A towering construct of fused machinery and demonic flesh sits at the main console.',
      enemies: ['valve-golem', 'exhaust-specter'], boss: 'the-overseer', totalRooms: 3,
    },
    'crossroads': {
      id: 'crossroads', name: 'The Crossroads', dominantKey: null, type: 'field',
      description: 'A point where multiple rifts converged. The terrain here is inconsistent — forest gives way to stone, stone to water, water to ash. The demons here are stranger than most.',
      roomDescriptions: [
        'The ground shifts between terrain types mid-step. Nothing about this place follows rules.',
        'A rift scar cuts across the path, still faintly glowing. Things crawl out of it sporadically.',
        'An open junction where four torn-up roads meet. You are being watched from all four directions.',
      ],
      bossDescription: 'At the convergence point, something assembled from parts that do not match steps into the light.',
      enemies: ['rift-wanderer', 'chaos-shard'], boss: 'the-convergent', totalRooms: 3,
    },
  },

  // ---- ENEMIES ----
  enemies: {
    'vine-stalker':    { id: 'vine-stalker',    name: 'Vine Stalker',         hp: 32,  maxHp: 32,  atk: 8,  def: 2, exp: 15, gold: 5,  loot: [{ id: 'withered-seed', chance: 0.4 }, { id: 'demon-fragment', chance: 0.2 }] },
    'bark-horror':     { id: 'bark-horror',     name: 'Bark Horror',          hp: 48,  maxHp: 48,  atk: 12, def: 4, exp: 25, gold: 8,  loot: [{ id: 'withered-seed', chance: 0.3 }, { id: 'keystone-shard', chance: 0.15 }] },
    'elder-root':      { id: 'elder-root',      name: 'Elder Root',  isBoss: true, hp: 110, maxHp: 110, atk: 18, def: 6, exp: 80, gold: 30, loot: [{ id: 'demon-fragment', chance: 1.0 }, { id: 'keystone-shard', chance: 0.6 }, { id: 'healing-draft', chance: 0.5 }] },
    'shard-wraith':    { id: 'shard-wraith',    name: 'Shard Wraith',         hp: 28,  maxHp: 28,  atk: 11, def: 1, exp: 18, gold: 6,  loot: [{ id: 'demon-fragment', chance: 0.3 }, { id: 'iron-splinter', chance: 0.35 }] },
    'dust-devil':      { id: 'dust-devil',      name: 'Dust Devil',           hp: 38,  maxHp: 38,  atk: 14, def: 2, exp: 22, gold: 7,  loot: [{ id: 'keystone-shard', chance: 0.2 }, { id: 'demon-fragment', chance: 0.25 }] },
    'gale-titan':      { id: 'gale-titan',      name: 'Gale Titan',  isBoss: true, hp: 95,  maxHp: 95,  atk: 20, def: 4, exp: 75, gold: 28, loot: [{ id: 'demon-fragment', chance: 1.0 }, { id: 'keystone-shard', chance: 0.7 }, { id: 'healing-draft', chance: 0.4 }] },
    'ash-crawler':     { id: 'ash-crawler',     name: 'Ash Crawler',          hp: 38,  maxHp: 38,  atk: 10, def: 3, exp: 20, gold: 7,  loot: [{ id: 'demon-fragment', chance: 0.35 }, { id: 'iron-splinter', chance: 0.3 }] },
    'steam-imp':       { id: 'steam-imp',       name: 'Steam Imp',            hp: 42,  maxHp: 42,  atk: 13, def: 3, exp: 24, gold: 9,  loot: [{ id: 'keystone-shard', chance: 0.25 }, { id: 'demon-fragment', chance: 0.3 }] },
    'furnace-drake':   { id: 'furnace-drake',   name: 'Furnace Drake', isBoss: true, hp: 115, maxHp: 115, atk: 22, def: 8, exp: 90, gold: 35, loot: [{ id: 'demon-fragment', chance: 1.0 }, { id: 'keystone-shard', chance: 0.65 }, { id: 'healing-draft', chance: 0.5 }] },
    'bloated-shambler':{ id: 'bloated-shambler',name: 'Bloated Shambler',     hp: 42,  maxHp: 42,  atk: 9,  def: 3, exp: 18, gold: 6,  loot: [{ id: 'demon-fragment', chance: 0.3 }, { id: 'iron-splinter', chance: 0.4 }] },
    'rift-eel':        { id: 'rift-eel',        name: 'Rift Eel',             hp: 33,  maxHp: 33,  atk: 15, def: 1, exp: 22, gold: 8,  loot: [{ id: 'keystone-shard', chance: 0.2 }, { id: 'demon-fragment', chance: 0.25 }] },
    'drowned-warden':  { id: 'drowned-warden',  name: 'The Drowned Warden', isBoss: true, hp: 100, maxHp: 100, atk: 19, def: 5, exp: 78, gold: 32, loot: [{ id: 'demon-fragment', chance: 1.0 }, { id: 'keystone-shard', chance: 0.6 }, { id: 'healing-draft', chance: 0.45 }] },
    'hollow-shade':    { id: 'hollow-shade',    name: 'Hollow Shade',         hp: 42,  maxHp: 42,  atk: 14, def: 3, exp: 28, gold: 10, loot: [{ id: 'demon-fragment', chance: 0.4 }, { id: 'keystone-shard', chance: 0.2 }] },
    'bone-sentinel':   { id: 'bone-sentinel',   name: 'Bone Sentinel',        hp: 58,  maxHp: 58,  atk: 16, def: 6, exp: 35, gold: 12, loot: [{ id: 'iron-splinter', chance: 0.45 }, { id: 'keystone-shard', chance: 0.2 }] },
    'the-nameless':    { id: 'the-nameless',    name: 'The Nameless', isBoss: true, hp: 135, maxHp: 135, atk: 25, def: 8, exp: 110, gold: 45, loot: [{ id: 'demon-fragment', chance: 1.0 }, { id: 'keystone-shard', chance: 0.8 }, { id: 'healing-draft', chance: 0.55 }] },
    'valve-golem':     { id: 'valve-golem',     name: 'Valve Golem',          hp: 45,  maxHp: 45,  atk: 11, def: 5, exp: 22, gold: 8,  loot: [{ id: 'iron-splinter', chance: 0.5 }, { id: 'demon-fragment', chance: 0.2 }] },
    'exhaust-specter': { id: 'exhaust-specter', name: 'Exhaust Specter',      hp: 32,  maxHp: 32,  atk: 13, def: 2, exp: 20, gold: 7,  loot: [{ id: 'demon-fragment', chance: 0.3 }, { id: 'keystone-shard', chance: 0.2 }] },
    'the-overseer':    { id: 'the-overseer',    name: 'The Overseer',  isBoss: true, hp: 105, maxHp: 105, atk: 21, def: 7, exp: 85, gold: 38, loot: [{ id: 'demon-fragment', chance: 1.0 }, { id: 'keystone-shard', chance: 0.7 }, { id: 'healing-draft', chance: 0.45 }] },
    'rift-wanderer':   { id: 'rift-wanderer',   name: 'Rift Wanderer',        hp: 38,  maxHp: 38,  atk: 12, def: 2, exp: 25, gold: 10, loot: [{ id: 'demon-fragment', chance: 0.4 }, { id: 'keystone-shard', chance: 0.25 }] },
    'chaos-shard':     { id: 'chaos-shard',     name: 'Chaos Shard',          hp: 44,  maxHp: 44,  atk: 15, def: 3, exp: 30, gold: 12, loot: [{ id: 'demon-fragment', chance: 0.35 }, { id: 'keystone-shard', chance: 0.3 }] },
    'the-convergent':  { id: 'the-convergent',  name: 'The Convergent', isBoss: true, hp: 120, maxHp: 120, atk: 23, def: 6, exp: 100, gold: 40, loot: [{ id: 'demon-fragment', chance: 1.0 }, { id: 'keystone-shard', chance: 0.75 }, { id: 'healing-draft', chance: 0.5 }] },
  },

  // ---- DROP ITEMS ----
  dropItems: {
    'demon-fragment': { id: 'demon-fragment', name: 'Demon Fragment',  type: 'material',   desc: 'A shard of crystallized demonic essence. Merchants pay well for these.',  sellValue: 15, quantity: 1 },
    'keystone-shard': { id: 'keystone-shard', name: 'Keystone Shard',  type: 'material',   desc: 'A rough aetheric shard. Used in Keystone crafting.',                     sellValue: 10, quantity: 1 },
    'iron-splinter':  { id: 'iron-splinter',  name: 'Iron Splinter',   type: 'material',   desc: 'Corroded iron from ruins beyond the dome. Worth a few coins.',            sellValue: 8,  quantity: 1 },
    'withered-seed':  { id: 'withered-seed',  name: 'Withered Seed',   type: 'material',   desc: 'A seed that will never grow. Alchemists find uses for it.',               sellValue: 12, quantity: 1 },
    'healing-draft':  { id: 'healing-draft',  name: 'Healing Draft',   type: 'consumable', desc: 'Restores 30 HP.', effect: { HP: 30 },                                    sellValue: 5,  quantity: 1 },
  },

  // ---- STARTING CONSUMABLES (added to all new characters) ----
  startingConsumables: [
    { id: 'healing-draft', name: 'Healing Draft', type: 'consumable', desc: 'Restores 30 HP.', quantity: 3, effect: { HP: 30 } },
    { id: 'ks-earth',      name: 'Keystone of Earth',  type: 'keystone', desc: 'Carved from old stone. Smells of roots and soil.',    quantity: 2, keystoneElement: 'earth' },
    { id: 'ks-wind',       name: 'Keystone of Wind',   type: 'keystone', desc: 'Lighter than it looks. Tugs faintly upward.',         quantity: 2, keystoneElement: 'wind' },
    { id: 'ks-shadow',     name: 'Keystone of Shadow', type: 'keystone', desc: 'Absorbs light. Cold to the touch.',                   quantity: 1, keystoneElement: 'shadow' },
  ],

  // ---- SKILL BOXES (base classes, IDs 0–71) ----
  // structure: { id, classId, className, name, branchPos, tier, type, group, lpCost, cpEarned, certificate, statBonuses }
  // type: 'novice' | 'skill' | 'master'
  // branchPos: 0=novice, 1-4=branches, 5=master
  skillBoxes: [
    // ── Blade Brandier ─────────────────────────────────────────────────────
    {id:0,  classId:0, name:'Novice Blade Brandier', branchPos:0, tier:0, type:'novice', group:null, lpCost:5,  cpEarned:25, certificate:'Blade_License',       statBonuses:{SP:14,TP:7,PATK:4,PDEF:1,PHIT:3,PEVA:1}},
    {id:1,  classId:0, name:'Sword Handling I',      branchPos:1, tier:1, type:'skill',  group:'Sword Handling', lpCost:2, cpEarned:10, certificate:null, statBonuses:{SP:4,TP:4,PATK:1,PDEF:1,PHIT:3,PEVA:1,MHIT:1}},
    {id:2,  classId:0, name:'Sword Handling II',     branchPos:1, tier:2, type:'skill',  group:null, lpCost:3,  cpEarned:10, certificate:null, statBonuses:{SP:4,TP:6,PATK:3,PDEF:1,PHIT:3,PEVA:1,MHIT:1,MEVA:1,AIR:1}},
    {id:3,  classId:0, name:'Sword Handling III',    branchPos:1, tier:3, type:'skill',  group:null, lpCost:4,  cpEarned:10, certificate:null, statBonuses:{HP:7,SP:6,TP:7,PATK:3,PDEF:3,PHIT:4,PEVA:3,MDEF:1,MHIT:1,MEVA:1,AIR:1,LGT:1}},
    {id:4,  classId:0, name:'Sword Handling IV',     branchPos:1, tier:4, type:'skill',  group:null, lpCost:5,  cpEarned:10, certificate:null, statBonuses:{HP:7,SP:7,TP:9,PATK:4,PDEF:3,PHIT:6,PEVA:3,MDEF:1,MHIT:3,MEVA:3,AIR:1,LGT:1}},
    {id:5,  classId:0, name:'Sword Techniques I',    branchPos:2, tier:1, type:'skill',  group:'Sword Techniques', lpCost:2, cpEarned:10, certificate:null, statBonuses:{SP:6,TP:6,PATK:3,PDEF:1,PHIT:1,PEVA:1,MDEF:1}},
    {id:6,  classId:0, name:'Sword Techniques II',   branchPos:2, tier:2, type:'skill',  group:null, lpCost:3,  cpEarned:10, certificate:null, statBonuses:{SP:7,TP:7,PATK:4,PDEF:1,PHIT:1,PEVA:1,MDEF:1,MEVA:1}},
    {id:7,  classId:0, name:'Sword Techniques III',  branchPos:2, tier:3, type:'skill',  group:null, lpCost:4,  cpEarned:10, certificate:null, statBonuses:{HP:7,SP:9,TP:9,PATK:4,PDEF:3,PHIT:2,PEVA:2,MDEF:1,MEVA:1}},
    {id:8,  classId:0, name:'Sword Techniques IV',   branchPos:2, tier:4, type:'skill',  group:null, lpCost:5,  cpEarned:10, certificate:null, statBonuses:{HP:7,SP:10,TP:10,PATK:6,PDEF:3,PHIT:2,PEVA:2,MDEF:1,MEVA:1}},
    {id:9,  classId:0, name:'Sword Arts I',          branchPos:3, tier:1, type:'skill',  group:'Sword Arts', lpCost:2, cpEarned:10, certificate:null, statBonuses:{SP:6,TP:4,PATK:4,PDEF:2,PHIT:2,PEVA:2,MDEF:1,MHIT:1}},
    {id:10, classId:0, name:'Sword Arts II',         branchPos:3, tier:2, type:'skill',  group:null, lpCost:3,  cpEarned:10, certificate:null, statBonuses:{SP:7,TP:5,PATK:4,PDEF:2,PHIT:2,PEVA:2,MDEF:1,MHIT:1}},
    {id:11, classId:0, name:'Sword Arts III',        branchPos:3, tier:3, type:'skill',  group:null, lpCost:4,  cpEarned:10, certificate:null, statBonuses:{HP:7,SP:9,TP:6,PATK:6,PDEF:2,PHIT:3,PEVA:2,MDEF:1,MHIT:1}},
    {id:12, classId:0, name:'Sword Arts IV',         branchPos:3, tier:4, type:'skill',  group:null, lpCost:5,  cpEarned:10, certificate:null, statBonuses:{HP:7,SP:10,TP:7,PATK:6,PDEF:2,PHIT:3,PEVA:2,MDEF:1,MHIT:1}},
    {id:13, classId:0, name:'Slashing Blade I',      branchPos:4, tier:1, type:'skill',  group:'Slashing Blade', lpCost:2, cpEarned:10, certificate:null, statBonuses:{HP:7,SP:6,TP:5,PATK:4,PDEF:2,PHIT:3,PEVA:3,AIR:1}},
    {id:14, classId:0, name:'Slashing Blade II',     branchPos:4, tier:2, type:'skill',  group:null, lpCost:3,  cpEarned:10, certificate:null, statBonuses:{HP:7,SP:6,TP:6,PATK:4,PDEF:2,PHIT:3,PEVA:3,AIR:1}},
    {id:15, classId:0, name:'Slashing Blade III',    branchPos:4, tier:3, type:'skill',  group:null, lpCost:4,  cpEarned:10, certificate:null, statBonuses:{HP:11,SP:7,TP:7,PATK:6,PDEF:2,PHIT:4,PEVA:3,MHIT:1,AIR:1,LGT:1}},
    {id:16, classId:0, name:'Slashing Blade IV',     branchPos:4, tier:4, type:'skill',  group:null, lpCost:5,  cpEarned:10, certificate:null, statBonuses:{HP:11,SP:7,TP:8,PATK:6,PDEF:2,PHIT:4,PEVA:3,MHIT:1,AIR:1,LGT:1}},
    {id:17, classId:0, name:'Master Blade Brandier', branchPos:5, tier:5, type:'master', group:null, lpCost:1,  cpEarned:65, certificate:null, statBonuses:{HP:22,SP:11,TP:10,PATK:6,PDEF:4,PHIT:5,PEVA:4,MDEF:1,MHIT:1,MEVA:1,AIR:1,LGT:2}},
    // ── Twin Blade ──────────────────────────────────────────────────────────
    {id:18, classId:1, name:'Novice Twin Blade',    branchPos:0, tier:0, type:'novice', group:null, lpCost:5,  cpEarned:25, certificate:'Twin_Blades_License', statBonuses:{HP:12,SP:9,TP:9,MP:2,PATK:3,PDEF:1,PHIT:3,PEVA:2,MATK:1,MDEF:1,MHIT:1,MEVA:1,WTR:1,AIR:1,DRK:1}},
    {id:19, classId:1, name:'Aim I',                branchPos:1, tier:1, type:'skill',  group:'Aim', lpCost:2, cpEarned:10, certificate:null, statBonuses:{HP:6,SP:3,TP:5,PATK:2,PHIT:3,PEVA:1,MHIT:1,MEVA:1,WTR:1,AIR:1}},
    {id:20, classId:1, name:'Aim II',               branchPos:1, tier:2, type:'skill',  group:null, lpCost:3,  cpEarned:10, certificate:null, statBonuses:{HP:6,SP:3,TP:5,PATK:2,PHIT:3,PEVA:1,MHIT:1,MEVA:1,WTR:1,AIR:1}},
    {id:21, classId:1, name:'Aim III',              branchPos:1, tier:3, type:'skill',  group:null, lpCost:4,  cpEarned:10, certificate:null, statBonuses:{HP:12,SP:5,TP:6,PATK:3,PHIT:3,PEVA:1,MHIT:2,MEVA:1,WTR:1,AIR:1,DRK:1}},
    {id:22, classId:1, name:'Aim IV',               branchPos:1, tier:4, type:'skill',  group:null, lpCost:5,  cpEarned:10, certificate:null, statBonuses:{HP:12,SP:5,TP:6,PATK:3,PHIT:5,PEVA:1,MHIT:2,MEVA:1,WTR:1,AIR:1,DRK:1}},
    {id:23, classId:1, name:'Close Combat I',       branchPos:2, tier:1, type:'skill',  group:'Close Combat', lpCost:2, cpEarned:10, certificate:null, statBonuses:{HP:12,SP:5,TP:3,PATK:3,PDEF:1,PHIT:2,PEVA:2,MDEF:1,MHIT:1,MEVA:1,AIR:1,DRK:1}},
    {id:24, classId:1, name:'Close Combat II',      branchPos:2, tier:2, type:'skill',  group:null, lpCost:3,  cpEarned:10, certificate:null, statBonuses:{HP:12,SP:5,TP:3,PATK:3,PDEF:1,PHIT:2,PEVA:2,MDEF:1,MHIT:1,MEVA:1,AIR:1,DRK:1}},
    {id:25, classId:1, name:'Close Combat III',     branchPos:2, tier:3, type:'skill',  group:null, lpCost:4,  cpEarned:10, certificate:null, statBonuses:{HP:18,SP:6,TP:4,PATK:4,PDEF:1,PHIT:2,PEVA:3,MDEF:1,MHIT:1,MEVA:1,AIR:1,DRK:1}},
    {id:26, classId:1, name:'Close Combat IV',      branchPos:2, tier:4, type:'skill',  group:null, lpCost:5,  cpEarned:10, certificate:null, statBonuses:{HP:18,SP:6,TP:4,PATK:4,PDEF:1,PHIT:4,PEVA:3,MDEF:1,MHIT:1,MEVA:1,AIR:1,DRK:1}},
    {id:27, classId:1, name:'Stealth I',            branchPos:3, tier:1, type:'skill',  group:'Stealth', lpCost:2, cpEarned:10, certificate:null, statBonuses:{HP:6,SP:4,TP:4,PATK:2,PHIT:2,PEVA:3,MDEF:1,MHIT:1,MEVA:1,WTR:1,AIR:1,DRK:1}},
    {id:28, classId:1, name:'Stealth II',           branchPos:3, tier:2, type:'skill',  group:null, lpCost:3,  cpEarned:10, certificate:null, statBonuses:{HP:6,SP:4,TP:4,PATK:2,PHIT:2,PEVA:3,MDEF:1,MHIT:1,MEVA:1,WTR:1,AIR:1,DRK:1}},
    {id:29, classId:1, name:'Stealth III',          branchPos:3, tier:3, type:'skill',  group:null, lpCost:4,  cpEarned:10, certificate:null, statBonuses:{HP:12,SP:5,TP:5,PATK:3,PHIT:2,PEVA:4,MDEF:1,MHIT:1,MEVA:1,WTR:1,AIR:1,DRK:1}},
    {id:30, classId:1, name:'Stealth IV',           branchPos:3, tier:4, type:'skill',  group:null, lpCost:5,  cpEarned:10, certificate:null, statBonuses:{HP:12,SP:5,TP:5,PATK:3,PHIT:4,PEVA:4,MDEF:1,MHIT:1,MEVA:1,WTR:1,AIR:1,DRK:1}},
    {id:31, classId:1, name:'Tracking I',           branchPos:4, tier:1, type:'skill',  group:'Tracking', lpCost:2, cpEarned:10, certificate:null, statBonuses:{HP:6,SP:3,TP:4,MP:1,PATK:2,PDEF:1,PHIT:2,PEVA:2,MDEF:1,MHIT:1,MEVA:1,WTR:1,AIR:1,DRK:1}},
    {id:32, classId:1, name:'Tracking II',          branchPos:4, tier:2, type:'skill',  group:null, lpCost:3,  cpEarned:10, certificate:null, statBonuses:{HP:6,SP:3,TP:4,MP:1,PATK:2,PDEF:1,PHIT:2,PEVA:2,MDEF:1,MHIT:1,MEVA:1,WTR:1,AIR:1,DRK:1}},
    {id:33, classId:1, name:'Tracking III',         branchPos:4, tier:3, type:'skill',  group:null, lpCost:4,  cpEarned:10, certificate:null, statBonuses:{HP:12,SP:5,TP:5,MP:1,PATK:3,PDEF:1,PHIT:2,PEVA:2,MDEF:1,MHIT:2,MEVA:1,WTR:1,AIR:1,DRK:1}},
    {id:34, classId:1, name:'Tracking IV',          branchPos:4, tier:4, type:'skill',  group:null, lpCost:5,  cpEarned:10, certificate:null, statBonuses:{HP:12,SP:5,TP:5,MP:1,PATK:3,PDEF:1,PHIT:2,PEVA:2,MDEF:1,MHIT:2,MEVA:1,WTR:1,AIR:1,DRK:1}},
    {id:35, classId:1, name:'Master Twin Blade',    branchPos:5, tier:5, type:'master', group:null, lpCost:1,  cpEarned:65, certificate:null, statBonuses:{HP:24,SP:8,TP:8,MP:3,PATK:4,PDEF:2,PHIT:4,PEVA:4,MATK:1,MDEF:2,MHIT:2,MEVA:2,WTR:2,AIR:2,LGT:1,DRK:2}},
    // ── Wave User ───────────────────────────────────────────────────────────
    {id:36, classId:2, name:'Novice Wave User',       branchPos:0, tier:0, type:'novice', group:null, lpCost:5,  cpEarned:25, certificate:'Focus_License',  statBonuses:{HP:14,SP:6,TP:4,MP:16,PATK:1,PDEF:1,PHIT:3,PEVA:3,MATK:6,MDEF:5,MHIT:5,MEVA:4,FIR:1,WTR:3,AIR:3,LGT:3}},
    {id:37, classId:2, name:'Wave Magic I',           branchPos:1, tier:1, type:'skill',  group:'Wave Magic', lpCost:2, cpEarned:10, certificate:null, statBonuses:{HP:5,SP:2,MP:9,PHIT:1,MATK:4,MDEF:1,MHIT:3,MEVA:1,FIR:1,WTR:2,AIR:1,LGT:1}},
    {id:38, classId:2, name:'Wave Magic II',          branchPos:1, tier:2, type:'skill',  group:null, lpCost:3,  cpEarned:10, certificate:null, statBonuses:{HP:5,SP:2,MP:9,PHIT:1,MATK:5,MDEF:1,MHIT:3,MEVA:1,FIR:1,WTR:2,AIR:1,LGT:1}},
    {id:39, classId:2, name:'Wave Magic III',         branchPos:1, tier:3, type:'skill',  group:null, lpCost:4,  cpEarned:10, certificate:null, statBonuses:{HP:9,SP:3,MP:8,PHIT:1,MATK:6,MDEF:1,MHIT:3,MEVA:1,FIR:2,WTR:2,AIR:1,LGT:1,DRK:1}},
    {id:40, classId:2, name:'Wave Magic IV',          branchPos:1, tier:4, type:'skill',  group:null, lpCost:5,  cpEarned:10, certificate:null, statBonuses:{HP:9,SP:3,MP:9,PHIT:1,MATK:7,MDEF:1,MHIT:3,MEVA:1,FIR:2,WTR:2,AIR:1,LGT:1,DRK:1}},
    {id:41, classId:2, name:'Focus I',                branchPos:2, tier:1, type:'skill',  group:'Focus', lpCost:2, cpEarned:10, certificate:null, statBonuses:{HP:5,SP:1,TP:1,MP:6,PDEF:1,PHIT:1,PEVA:1,MATK:3,MDEF:3,MHIT:3,MEVA:3,WTR:1,AIR:2,LGT:2}},
    {id:42, classId:2, name:'Focus II',               branchPos:2, tier:2, type:'skill',  group:null, lpCost:3,  cpEarned:10, certificate:null, statBonuses:{HP:5,SP:1,TP:1,MP:6,PDEF:1,PHIT:1,PEVA:1,MATK:3,MDEF:3,MHIT:3,MEVA:3,WTR:1,AIR:2,LGT:2}},
    {id:43, classId:2, name:'Focus III',              branchPos:2, tier:3, type:'skill',  group:null, lpCost:4,  cpEarned:10, certificate:null, statBonuses:{HP:8,SP:2,TP:1,MP:7,PDEF:1,PHIT:1,PEVA:1,MATK:4,MDEF:3,MHIT:3,MEVA:3,WTR:1,AIR:2,LGT:3}},
    {id:44, classId:2, name:'Focus IV',               branchPos:2, tier:4, type:'skill',  group:null, lpCost:5,  cpEarned:10, certificate:null, statBonuses:{HP:8,SP:2,TP:1,MP:8,PDEF:1,PHIT:1,PEVA:1,MATK:4,MDEF:3,MHIT:3,MEVA:3,WTR:1,AIR:2,LGT:3}},
    {id:45, classId:2, name:'Summoning I',            branchPos:3, tier:1, type:'skill',  group:'Summoning', lpCost:2, cpEarned:10, certificate:null, statBonuses:{HP:7,SP:2,MP:7,PHIT:1,PEVA:1,MATK:3,MDEF:1,MHIT:3,MEVA:1,FIR:1,WTR:3,AIR:2,LGT:1,DRK:1}},
    {id:46, classId:2, name:'Summoning II',           branchPos:3, tier:2, type:'skill',  group:null, lpCost:3,  cpEarned:10, certificate:null, statBonuses:{HP:7,SP:2,MP:8,PHIT:1,PEVA:1,MATK:3,MDEF:1,MHIT:3,MEVA:1,FIR:1,WTR:3,AIR:2,LGT:1,DRK:1}},
    {id:47, classId:2, name:'Summoning III',          branchPos:3, tier:3, type:'skill',  group:null, lpCost:4,  cpEarned:10, certificate:null, statBonuses:{HP:11,SP:3,MP:9,PHIT:1,PEVA:1,MATK:4,MDEF:1,MHIT:3,MEVA:1,FIR:1,WTR:3,AIR:2,LGT:2,DRK:1}},
    {id:48, classId:2, name:'Summoning IV',           branchPos:3, tier:4, type:'skill',  group:null, lpCost:5,  cpEarned:10, certificate:null, statBonuses:{HP:11,SP:3,MP:10,PHIT:1,PEVA:1,MATK:4,MDEF:1,MHIT:3,MEVA:1,FIR:1,WTR:3,AIR:2,LGT:2,DRK:1}},
    {id:49, classId:2, name:'Elemental Studies I',    branchPos:4, tier:1, type:'skill',  group:'Elemental Studies', lpCost:2, cpEarned:10, certificate:null, statBonuses:{HP:5,SP:2,MP:7,PHIT:1,PEVA:1,MATK:2,MDEF:2,MHIT:3,MEVA:1,FIR:1,WTR:2,AIR:2,ERT:1,LGT:1,DRK:1}},
    {id:50, classId:2, name:'Elemental Studies II',   branchPos:4, tier:2, type:'skill',  group:null, lpCost:3,  cpEarned:10, certificate:null, statBonuses:{HP:5,SP:2,MP:8,PHIT:1,PEVA:1,MATK:2,MDEF:2,MHIT:3,MEVA:1,FIR:1,WTR:2,AIR:2,ERT:1,LGT:1,DRK:1}},
    {id:51, classId:2, name:'Elemental Studies III',  branchPos:4, tier:3, type:'skill',  group:null, lpCost:4,  cpEarned:10, certificate:null, statBonuses:{HP:9,SP:3,MP:9,PHIT:1,PEVA:1,MATK:3,MDEF:2,MHIT:3,MEVA:1,FIR:1,WTR:2,AIR:2,ERT:1,LGT:2,DRK:1}},
    {id:52, classId:2, name:'Elemental Studies IV',   branchPos:4, tier:4, type:'skill',  group:null, lpCost:5,  cpEarned:10, certificate:null, statBonuses:{HP:9,SP:3,MP:10,PHIT:1,PEVA:1,MATK:3,MDEF:2,MHIT:3,MEVA:1,FIR:1,WTR:2,AIR:2,ERT:1,LGT:2,DRK:1}},
    {id:53, classId:2, name:'Master Wave User',       branchPos:5, tier:5, type:'master', group:null, lpCost:1,  cpEarned:65, certificate:null, statBonuses:{HP:22,SP:8,TP:5,MP:20,PATK:1,PDEF:2,PHIT:4,PEVA:4,MATK:8,MDEF:7,MHIT:6,MEVA:5,FIR:2,WTR:4,AIR:4,ERT:1,LGT:4,DRK:1}},
    // ── Harvest Cleric ──────────────────────────────────────────────────────
    {id:54, classId:3, name:'Novice Harvest Cleric',  branchPos:0, tier:0, type:'novice', group:null, lpCost:5,  cpEarned:25, certificate:'Wand_License',   statBonuses:{HP:18,SP:5,TP:4,MP:11,PATK:2,PDEF:2,PHIT:3,PEVA:2,MATK:4,MDEF:4,MHIT:3,MEVA:3,WTR:3,AIR:1,LGT:3,DRK:1}},
    {id:55, classId:3, name:'Healing Magic I',        branchPos:1, tier:1, type:'skill',  group:'Healing Magic', lpCost:2, cpEarned:10, certificate:null, statBonuses:{HP:5,SP:2,MP:5,PDEF:1,PHIT:1,MATK:3,MDEF:2,MHIT:2,MEVA:1,WTR:3,AIR:1,LGT:3}},
    {id:56, classId:3, name:'Healing Magic II',       branchPos:1, tier:2, type:'skill',  group:null, lpCost:3,  cpEarned:10, certificate:null, statBonuses:{HP:5,SP:2,MP:6,PDEF:1,PHIT:1,MATK:3,MDEF:2,MHIT:2,MEVA:1,WTR:3,AIR:1,LGT:3}},
    {id:57, classId:3, name:'Healing Magic III',      branchPos:1, tier:3, type:'skill',  group:null, lpCost:4,  cpEarned:10, certificate:null, statBonuses:{HP:9,SP:3,MP:7,PDEF:1,PHIT:1,MATK:4,MDEF:3,MHIT:3,MEVA:1,WTR:3,AIR:1,LGT:4}},
    {id:58, classId:3, name:'Healing Magic IV',       branchPos:1, tier:4, type:'skill',  group:null, lpCost:5,  cpEarned:10, certificate:null, statBonuses:{HP:9,SP:3,MP:8,PDEF:1,PHIT:1,MATK:4,MDEF:3,MHIT:3,MEVA:1,WTR:3,AIR:1,LGT:4}},
    {id:59, classId:3, name:'Light Magic I',          branchPos:2, tier:1, type:'skill',  group:'Light Magic', lpCost:2, cpEarned:10, certificate:null, statBonuses:{HP:5,SP:2,MP:4,PATK:1,PDEF:1,PHIT:2,MATK:2,MDEF:2,MHIT:2,MEVA:1,WTR:2,AIR:1,LGT:3}},
    {id:60, classId:3, name:'Light Magic II',         branchPos:2, tier:2, type:'skill',  group:null, lpCost:3,  cpEarned:10, certificate:null, statBonuses:{HP:5,SP:2,MP:5,PATK:1,PDEF:1,PHIT:2,MATK:3,MDEF:2,MHIT:2,MEVA:1,WTR:2,AIR:1,LGT:3}},
    {id:61, classId:3, name:'Light Magic III',        branchPos:2, tier:3, type:'skill',  group:null, lpCost:4,  cpEarned:10, certificate:null, statBonuses:{HP:9,SP:3,MP:6,PATK:1,PDEF:1,PHIT:2,MATK:4,MDEF:2,MHIT:3,MEVA:1,WTR:2,AIR:1,LGT:4}},
    {id:62, classId:3, name:'Light Magic IV',         branchPos:2, tier:4, type:'skill',  group:null, lpCost:5,  cpEarned:10, certificate:null, statBonuses:{HP:9,SP:3,MP:7,PATK:1,PDEF:1,PHIT:2,MATK:4,MDEF:2,MHIT:3,MEVA:1,WTR:2,AIR:1,LGT:4}},
    {id:63, classId:3, name:'Dark Magic I',           branchPos:3, tier:1, type:'skill',  group:'Dark Magic', lpCost:2, cpEarned:10, certificate:null, statBonuses:{HP:5,SP:2,MP:3,PATK:1,PHIT:2,PEVA:1,MATK:2,MDEF:1,MHIT:2,MEVA:1,WTR:1,AIR:1,DRK:2}},
    {id:64, classId:3, name:'Dark Magic II',          branchPos:3, tier:2, type:'skill',  group:null, lpCost:3,  cpEarned:10, certificate:null, statBonuses:{HP:5,SP:2,MP:4,PATK:1,PHIT:2,PEVA:1,MATK:2,MDEF:1,MHIT:2,MEVA:1,WTR:1,AIR:1,DRK:2}},
    {id:65, classId:3, name:'Dark Magic III',         branchPos:3, tier:3, type:'skill',  group:null, lpCost:4,  cpEarned:10, certificate:null, statBonuses:{HP:9,SP:3,MP:5,PATK:1,PHIT:2,PEVA:1,MATK:3,MDEF:1,MHIT:3,MEVA:1,WTR:1,AIR:1,DRK:3}},
    {id:66, classId:3, name:'Dark Magic IV',          branchPos:3, tier:4, type:'skill',  group:null, lpCost:5,  cpEarned:10, certificate:null, statBonuses:{HP:9,SP:3,MP:6,PATK:1,PHIT:2,PEVA:1,MATK:3,MDEF:1,MHIT:3,MEVA:1,WTR:1,AIR:1,DRK:3}},
    {id:67, classId:3, name:'Breathing I',            branchPos:4, tier:1, type:'skill',  group:'Breathing', lpCost:2, cpEarned:10, certificate:null, statBonuses:{HP:7,SP:3,TP:2,MP:3,PATK:2,PDEF:1,PHIT:2,PEVA:3,MATK:1,MDEF:2,MHIT:2,MEVA:2,WTR:2,AIR:2,LGT:1,DRK:1}},
    {id:68, classId:3, name:'Breathing II',           branchPos:4, tier:2, type:'skill',  group:null, lpCost:3,  cpEarned:10, certificate:null, statBonuses:{HP:7,SP:3,TP:2,MP:4,PATK:2,PDEF:1,PHIT:2,PEVA:3,MATK:1,MDEF:2,MHIT:2,MEVA:2,WTR:2,AIR:2,LGT:1,DRK:1}},
    {id:69, classId:3, name:'Breathing III',          branchPos:4, tier:3, type:'skill',  group:null, lpCost:4,  cpEarned:10, certificate:null, statBonuses:{HP:11,SP:4,TP:3,MP:5,PATK:2,PDEF:1,PHIT:3,PEVA:3,MATK:2,MDEF:2,MHIT:2,MEVA:2,WTR:2,AIR:2,LGT:2,DRK:1}},
    {id:70, classId:3, name:'Breathing IV',           branchPos:4, tier:4, type:'skill',  group:null, lpCost:5,  cpEarned:10, certificate:null, statBonuses:{HP:11,SP:4,TP:3,MP:6,PATK:2,PDEF:1,PHIT:3,PEVA:3,MATK:2,MDEF:2,MHIT:2,MEVA:2,WTR:2,AIR:2,LGT:2,DRK:1}},
    {id:71, classId:3, name:'Master Harvest Cleric',  branchPos:5, tier:5, type:'master', group:null, lpCost:1,  cpEarned:65, certificate:null, statBonuses:{HP:28,SP:8,TP:5,MP:17,PATK:3,PDEF:3,PHIT:4,PEVA:4,MATK:7,MDEF:5,MHIT:4,MEVA:4,WTR:4,AIR:2,LGT:6,DRK:2}},
  ],

  // ---- CLASS PROMOTION RULES (base → advanced) ----
  classPromotionRules: [
    { id:0,  prereqClassId:0, prereqClassName:'Blade Brandier',   unlockClassId:4,  unlockClassName:'Guard Knight',      cpRequired:750,  requiredBoxIds:[0,1,2,3,4] },
    { id:1,  prereqClassId:0, prereqClassName:'Blade Brandier',   unlockClassId:5,  unlockClassName:'Branded Barbarian', cpRequired:750,  requiredBoxIds:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17] },
    { id:2,  prereqClassId:0, prereqClassName:'Blade Brandier',   unlockClassId:6,  unlockClassName:'Curse Knight',      cpRequired:750,  requiredBoxIds:[0,9,10,11,12] },
    { id:3,  prereqClassId:1, prereqClassName:'Twin Blade',       unlockClassId:7,  unlockClassName:'Acro Archer',       cpRequired:750,  requiredBoxIds:[18,19,20,21,22] },
    { id:4,  prereqClassId:1, prereqClassName:'Twin Blade',       unlockClassId:8,  unlockClassName:'Pistol Ranger',     cpRequired:750,  requiredBoxIds:[18,23,24,25,26] },
    { id:5,  prereqClassId:1, prereqClassName:'Twin Blade',       unlockClassId:9,  unlockClassName:'Umbral Assassin',   cpRequired:750,  requiredBoxIds:[18,27,28,29,30] },
    { id:6,  prereqClassId:2, prereqClassName:'Wave User',        unlockClassId:10, unlockClassName:'Arcane Wavemaster', cpRequired:750,  requiredBoxIds:[36,37,38,39,40,49,50,51,52] },
    { id:7,  prereqClassId:2, prereqClassName:'Wave User',        unlockClassId:11, unlockClassName:'Tome Summoner',     cpRequired:750,  requiredBoxIds:[36,41,42,43,44,45,46,47,48] },
    { id:8,  prereqClassId:3, prereqClassName:'Harvest Cleric',   unlockClassId:12, unlockClassName:'Aura Priest',       cpRequired:750,  requiredBoxIds:[54,55,56,57,58,59,60,61,62] },
    { id:9,  prereqClassId:3, prereqClassName:'Harvest Cleric',   unlockClassId:13, unlockClassName:'Martial Monk',      cpRequired:750,  requiredBoxIds:[54,63,64,65,66,67,68,69,70] },
  ],

  // ---- ARRIVAL TEXT (per species) ----
  arrivalText: {
    fole: 'The dome\'s light feels like sunlight through bark. Your roots went quiet when you crossed inside. You hope that is not permanent.',
    nume: 'The aether here is different — confined, shaped by something old and deliberate. You can hear it, faintly. The Goddess left her voice in the walls.',
    kkyn: 'You\'ve built things in harder places than this. The dome holds, the walls are solid, and there\'s work to be done. That\'s enough.',
    oeld: 'You\'ve read accounts of this city. Standing in it now, you notice what the accounts missed. Mostly the smell.',
    tamo: 'The city smells of too many people in too small a space. But the dome holds and the demons stay out. You\'ve survived worse.',
    wyld: 'You don\'t like walls. You never have. But the thing beyond the dome likes you even less, so here you are.',
  },

  // ---- PRAYER RESPONSES ----
  prayers: [
    'The candles flicker once. Whether in answer or indifference, you cannot say.',
    'A warmth passes through you — brief, faint, like breath from a room you\'ve just left.',
    'You hear nothing. But the silence here feels different from the silence outside the dome.',
    'The etched words on the walls seem darker for a moment. Then the candles steady.',
    '"Go forth," she said. You remember.',
  ],

};
