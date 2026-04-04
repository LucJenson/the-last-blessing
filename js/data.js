// ================================================
// THE LAST BLESSING — Game Data
// World: The Seven Blessings
// ================================================

const DATA = {

  // ---- RACES ----
  races: {
    elf: {
      id: 'elf',
      name: 'Elf',
      lore: 'Born from sap and spirit, Elves speak to the planet itself. Rotund, plant-like beings whose roots remember the world before the dome.',
      statBonuses: { int: 3, mp: 30 },
      statDisplay: ['+3 INT', '+30 MP', 'High Magic'],
      startingHp: 80,
      startingMp: 80,
    },
    human: {
      id: 'human',
      name: 'Human',
      lore: 'Forged from stone and sky to endure where Elves could not. Versatile and driven — they built the bridges, they manned the walls.',
      statBonuses: { str: 2, vit: 2 },
      statDisplay: ['+2 STR', '+2 VIT', 'Balanced'],
      startingHp: 100,
      startingMp: 50,
    },
    beast: {
      id: 'beast',
      name: 'Beast',
      lore: 'Lifted to sentience by the Goddess in the age of war. They carry the old wild within them — harder to kill, and harder to ignore.',
      statBonuses: { str: 3, vit: 3 },
      statDisplay: ['+3 STR', '+3 VIT', 'High Endurance'],
      startingHp: 120,
      startingMp: 30,
    },
  },

  // ---- STARTING CLASS ----
  startingClass: {
    id: 'adept-rogue',
    name: 'Adept Rogue',
    description: 'All who register with the Guild begin their record as an Adept Rogue — untested, but full of potential. Specialization comes with time.',
  },

  // ---- BASE STATS (before race bonuses) ----
  baseStats: {
    str: 10, dex: 10, int: 10, vit: 10,
  },

  // ---- LOCATIONS ----
  locations: {

    'city-square': {
      id: 'city-square',
      area: 'The Last City',
      name: 'City Square',
      description: 'The heart of civilization\'s last refuge. Stone towers rise behind protective wards humming with the Goddess\'s fading light. Adventurers move through the square between expeditions, trading stories and supplies beneath the pale dome.',
      exits: [
        { id: 'market-row',   label: 'Market Row',               icon: '⚖', desc: 'Merchants and trade' },
        { id: 'cathedral',    label: 'Cathedral of the Goddess', icon: '✦', desc: 'Lore and prayer' },
        { id: 'guild-hall',   label: "Adventurer's Guild",       icon: '⚔', desc: 'Quests and records' },
        { id: 'goddess-gate', label: 'Goddess Gate',             icon: '◎', desc: 'Portal to beyond the dome' },
      ],
      actions: [],
      onEnter: null,
    },

    'market-row': {
      id: 'market-row',
      area: 'The Last City',
      name: 'Market Row',
      description: 'A crooked lane of repurposed buildings and canvas stalls. The smell of steam-cooked food mingles with oil and rust. Merchants of all three peoples hawk goods salvaged from beyond the dome — some genuine, some certainly not.',
      exits: [
        { id: 'city-square', label: 'City Square', icon: '↩', desc: 'Return to the square' },
      ],
      actions: [
        { id: 'browse-market', label: 'Browse Wares', icon: '⚖', type: 'shop' },
      ],
    },

    'cathedral': {
      id: 'cathedral',
      area: 'The Last City',
      name: 'Cathedral of the Goddess',
      description: 'The oldest building still standing. Its walls are etched with the Seven Blessings in three tongues: Elvish root-script, human iron-letters, and Beast claw-marks. Candles burn along every ledge. No one refills them.',
      exits: [
        { id: 'city-square', label: 'City Square', icon: '↩', desc: 'Return to the square' },
      ],
      actions: [
        { id: 'read-blessings', label: 'Read the Seven Blessings', icon: '✦', type: 'lore' },
        { id: 'pray',           label: 'Offer a Prayer',           icon: '◇', type: 'pray' },
      ],
    },

    'guild-hall': {
      id: 'guild-hall',
      area: 'The Last City',
      name: "Adventurer's Guild",
      description: 'A squat, loud building smelling of sweat and ambition. Expedition boards line every wall — some fresh, most old and curling at the corners. A gruff Beast in a leather apron mans the counter. Your record is kept here.',
      exits: [
        { id: 'city-square', label: 'City Square', icon: '↩', desc: 'Return to the square' },
      ],
      actions: [
        { id: 'view-record', label: 'View Your Record', icon: '📋', type: 'status' },
        { id: 'view-board',  label: 'Expedition Board', icon: '📌', type: 'board' },
      ],
    },

    'goddess-gate': {
      id: 'goddess-gate',
      area: 'The Last City',
      name: 'Goddess Gate',
      description: 'A circular stone archway at the city\'s center, pulsing with slow aetheric light. Three carved recesses surround the frame — each shaped to receive a Keystone. The air here carries a faint smell of distant places: pine resin, saltwater, something burning.',
      exits: [
        { id: 'city-square', label: 'City Square', icon: '↩', desc: 'Return to the square' },
      ],
      actions: [
        { id: 'attune-gate', label: 'Attune the Gate', icon: '◎', type: 'gate' },
      ],
    },

  },

  // ---- THE SEVEN BLESSINGS (Cathedral lore) ----
  blessings: [
    {
      number: 'First Blessing',
      title: 'The Sprouting Song',
      subtitle: 'The Birth of the Elves',
      text: 'From root to leaf, from seed to sun,\nThe Breath of the World did bloom as One.\nGreen minds awoke in dew-soaked groves,\nRotund and kind, they spoke in prose.\n\nThese Elves, born from sap and spirit, held no hunger, wrought no steel.\nThey danced with time and whispered to roots.',
    },
    {
      number: 'Second Blessing',
      title: 'The Shaping Flame',
      subtitle: 'The Creation of Humans',
      text: 'In quiet grove and mossy glade, we sang where sun and shadow played.\nYet hands so soft and hearts so pure could not all burdens long endure.\n\nThe Goddess watched, Her gaze made warm,\nAnd shaped new life with earthen form.\nFrom stone and sky, from ash and flame, She forged the folk who bore no name.\n\nNot made of root nor bloom nor bough, but worthy to call our world their home.',
    },
    {
      number: 'Third Blessing',
      title: 'The Idea to Inspire Invention',
      subtitle: 'The Gift of Steam',
      text: 'From the mountain\'s breath, we drew power.\nSteam: the fire without flame.\n\nWheels turned, towers rose, and skyships sailed.\nThe Goddess, in Her joy, saw us as One Hand.\n\nSteam reshaped the world; its roar silenced the old songs.\nThe Beasts were wild and wise in their own way.\nThey raged at the scarring of the land.\n\nSo came the first war.',
    },
    {
      number: 'Fourth Blessing',
      title: 'The Feelings of Fur and Fang',
      subtitle: 'The Lifting of Beasts',
      text: 'The Goddess raised the Beasts, gave them voice, gave them thought.\nThe Bear-Kings and Serpent-Speakers sued for peace.\nBorders were drawn — not lines of division, but invitations to cohabitation.\n\nFor a time, all three Peoples shared the world.\nBut wounds festered, and the world\'s soul had already begun to rot.\nThe Titans had already marched.',
    },
    {
      number: 'Fifth Blessing',
      title: 'The Chains of the Colossi',
      subtitle: 'The Sealing of the Titans',
      text: 'The Titans — not born of nature or divine breath, but of hatred, cast from Elf, Human, and Beast alike.\nThese twisted giants tore the world. Cities fell like autumn leaves.\n\nAt the edge of extinction, champions arose.\nThe Goddess marked them — tattoos like constellations of power.\n\nTogether, they fought. Together, they sealed the Titans deep below.\nBut not before the rift was opened.\n\nDemons come.',
    },
    {
      number: 'Sixth Blessing',
      title: 'The Prayer of Protection',
      subtitle: 'The Vanishing of the Goddess',
      text: 'For two hundred years, there was only retreat.\nHighways of ash and bone.\n\nCities burned. Kingdoms undone. The Last City stood.\n\nThe Goddess, pale and flickering like a dying candle,\nraised Her final shield — a dome of light, soft as a whisper, strong as old roots.\n\nShe spoke no words. She wept once. Then vanished.\n\nThe people rebuilt. Slowly. Carefully.\nAlways listening to the howls beyond the Goddess\' light.',
    },
    {
      number: 'Seventh Blessing',
      title: 'The Eye of the Goddess',
      subtitle: 'The Return of Hope',
      text: 'Ten years ago, a shimmer appeared in the city\'s heart. A new blessing.\n\nThe Eye of the Goddess — a stone gate, circular and humming, pulsing with aetheric light.\nIt reaches distant lands. Places still wild, still demonic — but not yet lost.\n\nCrafted Keystones form strings. Strings open paths. Travellers walk them, scavenging hope.\n\nShe appeared once more. Thin as fog, brighter than fire.\n"Go forth," she said. Then silence.\n\nNow, we go through the Eye. Not to find paradise — but to make it.',
    },
  ],

  // ---- STARTING ITEMS ----
  startingItems: [
    { id: 'worn-blade',       name: 'Worn Blade',          type: 'weapon',     desc: 'A chipped short sword. Standard issue for new arrivals at the Guild.',  quantity: 1, atkBonus: 3 },
    { id: 'traveler-cloak',   name: "Traveler's Cloak",    type: 'armor',      desc: "Thin but better than nothing. Smells like someone else's journey.",      quantity: 1, defBonus: 1 },
    { id: 'healing-draft',    name: 'Healing Draft',       type: 'consumable', desc: 'A small vial of restorative liquid. Restores 30 HP.',                    quantity: 3, effect: { hp: 30 } },
    { id: 'ks-earth',         name: 'Keystone of Earth',   type: 'keystone',   desc: 'Carved from old stone. Smells of roots and soil.',                       quantity: 2, keystoneElement: 'earth' },
    { id: 'ks-wind',          name: 'Keystone of Wind',    type: 'keystone',   desc: 'Lighter than it looks. Tugs faintly upward.',                            quantity: 2, keystoneElement: 'wind' },
    { id: 'ks-shadow',        name: 'Keystone of Shadow',  type: 'keystone',   desc: 'Absorbs light. Cold to the touch.',                                      quantity: 1, keystoneElement: 'shadow' },
  ],

  // ---- ARRIVAL TEXT (per race) ----
  arrivalText: {
    elf: 'The dome\'s light feels familiar — like sunlight through a canopy you half remember. Your roots haven\'t spoken since the crossing, but you feel them listening.',
    human: 'You\'ve heard the stories all your life. Standing here now, inside the dome, the weight of it finally settles in your chest. This is real.',
    beast: 'The city smells of too many people pressed into too little space. But the dome holds, and the demons stay out. That\'s what matters. You\'ve made it.',
  },

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
  // Dominant element (2+ of same) determines the zone. All-different → crossroads.
  fieldTemplates: {
    'withered-grove': {
      id: 'withered-grove', name: 'The Withered Grove',
      dominantKey: 'earth', type: 'field',
      description: 'A forest that died the moment the demons came through — but its roots still remember something like hunger. The trees move when you are not watching them.',
      roomDescriptions: [
        'Gnarled roots split the soil around you. The undergrowth is still, but you get the sense it is deciding something.',
        'The canopy overhead blocks all light. Something knocks steadily against the trees from inside.',
        'A ring of dead saplings circles a clearing. The ground here is darker than it should be.',
      ],
      bossDescription: 'At the grove\'s heart, something ancient and enormous rises from the soil. It has been here longer than the demons. It was waiting.',
      enemies: ['vine-stalker', 'bark-horror'],
      boss: 'elder-root',
      totalRooms: 3,
    },
    'howling-flats': {
      id: 'howling-flats', name: 'The Howling Flats',
      dominantKey: 'wind', type: 'field',
      description: 'A vast, stripped plain where the wind never stops. No structures remain standing. The sound it makes through the debris sounds almost like words.',
      roomDescriptions: [
        'The wind tears at your cloak. Shapes dart at the edge of visibility.',
        'The ruins of a watchtower, completely flattened. The stones have been worn smooth by something other than weather.',
        'The gusts here are stronger, carrying grit that stings exposed skin. Something is circling.',
      ],
      bossDescription: 'The wind drops completely. An enormous shape condenses from the debris — a column of howling energy, taking form.',
      enemies: ['shard-wraith', 'dust-devil'],
      boss: 'gale-titan',
      totalRooms: 3,
    },
    'smoldering-hollow': {
      id: 'smoldering-hollow', name: 'The Smoldering Hollow',
      dominantKey: 'fire', type: 'field',
      description: 'A system of volcanic caves beneath a collapsed city, kept active by whatever tore the rifts open. The air burns to breathe. Everything here wants to see you melt.',
      roomDescriptions: [
        'Lava cracks line the stone floor. The heat is tremendous.',
        'A venting steam-shaft fills the cavern with scalding fog. Shapes move within it.',
        'The cave opens into a chamber where something was clearly worshipped, once. The altar is still warm.',
      ],
      bossDescription: 'The deepest chamber pulses with heat. Something vast unfolds its wings from the far wall.',
      enemies: ['ash-crawler', 'steam-imp'],
      boss: 'furnace-drake',
      totalRooms: 3,
    },
    'drowned-district': {
      id: 'drowned-district', name: 'The Drowned District',
      dominantKey: 'water', type: 'field',
      description: 'A city quarter lost beneath floodwater. The demons here do not drown. Neither, it seems, do their dead.',
      roomDescriptions: [
        'Floodwater reaches your knees. Something beneath the surface nudges your foot.',
        'A partially submerged building. The upper floors are accessible, and something has been living in them.',
        'The water here is still and black. Your own reflection does not quite match your movements.',
      ],
      bossDescription: 'The flood opens into a vast sunken square. A shape the size of a house rises from the water.',
      enemies: ['bloated-shambler', 'rift-eel'],
      boss: 'drowned-warden',
      totalRooms: 3,
    },
    'sunken-citadel': {
      id: 'sunken-citadel', name: 'The Sunken Citadel',
      dominantKey: 'shadow', type: 'dungeon',
      description: 'A fortress pulled into corrupted earth during the Titan wars. It is darker here than it should be. Lights go out when you enter a room.',
      roomDescriptions: [
        'The corridor ahead is total darkness. Your eyes adjust slowly — and you wish they had not.',
        'A great hall, its banners long rotted. The thrones at its far end are occupied.',
        'A room full of mirrors, all of them covered. One has been uncovered from the inside.',
        'The citadel\'s lowest level. The air is wrong here. Pressure you can feel in your teeth.',
      ],
      bossDescription: 'At the citadel\'s lowest point — a chamber that should not exist. Something breathes in it.',
      enemies: ['hollow-shade', 'bone-sentinel'],
      boss: 'the-nameless',
      totalRooms: 4,
    },
    'steam-vaults': {
      id: 'steam-vaults', name: 'The Steam Vaults',
      dominantKey: 'steam', type: 'field',
      description: 'Industrial tunnels built during the Third Blessing, now overrun. The machinery still runs. No one is operating it.',
      roomDescriptions: [
        'Pipes the width of a man line the walls, hissing and dripping. The gauges still spin.',
        'A vast valve chamber. Something has been using the control panels — recently.',
        'The pipes here are warped and burst. Steam fills the room constantly, obscuring everything.',
      ],
      bossDescription: 'The central control room. A towering construct of fused machinery and demonic flesh sits at the main console.',
      enemies: ['valve-golem', 'exhaust-specter'],
      boss: 'the-overseer',
      totalRooms: 3,
    },
    'crossroads': {
      id: 'crossroads', name: 'The Crossroads',
      dominantKey: null, type: 'field',
      description: 'A point where multiple rifts converged. The terrain here is inconsistent — forest gives way to stone, stone to water, water to ash. The demons here are stranger than most.',
      roomDescriptions: [
        'The ground shifts between terrain types mid-step. Nothing about this place follows rules.',
        'A rift scar cuts across the path, still faintly glowing. Things crawl out of it sporadically.',
        'An open junction where four torn-up roads meet. You are being watched from all four directions.',
      ],
      bossDescription: 'At the convergence point, something assembled from parts that do not match steps into the light.',
      enemies: ['rift-wanderer', 'chaos-shard'],
      boss: 'the-convergent',
      totalRooms: 3,
    },
  },

  // ---- ENEMIES ----
  enemies: {
    // Withered Grove
    'vine-stalker':   { id: 'vine-stalker',   name: 'Vine Stalker',          hp: 32,  maxHp: 32,  atk: 8,  def: 2, exp: 15, gold: 5,  loot: [{ id: 'withered-seed', chance: 0.4 }, { id: 'demon-fragment', chance: 0.2 }] },
    'bark-horror':    { id: 'bark-horror',     name: 'Bark Horror',           hp: 48,  maxHp: 48,  atk: 12, def: 4, exp: 25, gold: 8,  loot: [{ id: 'withered-seed', chance: 0.3 }, { id: 'keystone-shard', chance: 0.15 }] },
    'elder-root':     { id: 'elder-root',      name: 'Elder Root',   isBoss: true, hp: 110, maxHp: 110, atk: 18, def: 6, exp: 80, gold: 30, loot: [{ id: 'demon-fragment', chance: 1.0 }, { id: 'keystone-shard', chance: 0.6 }, { id: 'healing-draft', chance: 0.5 }] },
    // Howling Flats
    'shard-wraith':   { id: 'shard-wraith',    name: 'Shard Wraith',          hp: 28,  maxHp: 28,  atk: 11, def: 1, exp: 18, gold: 6,  loot: [{ id: 'demon-fragment', chance: 0.3 }, { id: 'iron-splinter', chance: 0.35 }] },
    'dust-devil':     { id: 'dust-devil',      name: 'Dust Devil',            hp: 38,  maxHp: 38,  atk: 14, def: 2, exp: 22, gold: 7,  loot: [{ id: 'keystone-shard', chance: 0.2 }, { id: 'demon-fragment', chance: 0.25 }] },
    'gale-titan':     { id: 'gale-titan',      name: 'Gale Titan',   isBoss: true, hp: 95,  maxHp: 95,  atk: 20, def: 4, exp: 75, gold: 28, loot: [{ id: 'demon-fragment', chance: 1.0 }, { id: 'keystone-shard', chance: 0.7 }, { id: 'healing-draft', chance: 0.4 }] },
    // Smoldering Hollow
    'ash-crawler':    { id: 'ash-crawler',     name: 'Ash Crawler',           hp: 38,  maxHp: 38,  atk: 10, def: 3, exp: 20, gold: 7,  loot: [{ id: 'demon-fragment', chance: 0.35 }, { id: 'iron-splinter', chance: 0.3 }] },
    'steam-imp':      { id: 'steam-imp',       name: 'Steam Imp',             hp: 42,  maxHp: 42,  atk: 13, def: 3, exp: 24, gold: 9,  loot: [{ id: 'keystone-shard', chance: 0.25 }, { id: 'demon-fragment', chance: 0.3 }] },
    'furnace-drake':  { id: 'furnace-drake',   name: 'Furnace Drake', isBoss: true, hp: 115, maxHp: 115, atk: 22, def: 8, exp: 90, gold: 35, loot: [{ id: 'demon-fragment', chance: 1.0 }, { id: 'keystone-shard', chance: 0.65 }, { id: 'healing-draft', chance: 0.5 }] },
    // Drowned District
    'bloated-shambler': { id: 'bloated-shambler', name: 'Bloated Shambler',   hp: 42,  maxHp: 42,  atk: 9,  def: 3, exp: 18, gold: 6,  loot: [{ id: 'demon-fragment', chance: 0.3 }, { id: 'iron-splinter', chance: 0.4 }] },
    'rift-eel':       { id: 'rift-eel',        name: 'Rift Eel',              hp: 33,  maxHp: 33,  atk: 15, def: 1, exp: 22, gold: 8,  loot: [{ id: 'keystone-shard', chance: 0.2 }, { id: 'demon-fragment', chance: 0.25 }] },
    'drowned-warden': { id: 'drowned-warden',  name: 'The Drowned Warden', isBoss: true, hp: 100, maxHp: 100, atk: 19, def: 5, exp: 78, gold: 32, loot: [{ id: 'demon-fragment', chance: 1.0 }, { id: 'keystone-shard', chance: 0.6 }, { id: 'healing-draft', chance: 0.45 }] },
    // Sunken Citadel
    'hollow-shade':   { id: 'hollow-shade',    name: 'Hollow Shade',          hp: 42,  maxHp: 42,  atk: 14, def: 3, exp: 28, gold: 10, loot: [{ id: 'demon-fragment', chance: 0.4 }, { id: 'keystone-shard', chance: 0.2 }] },
    'bone-sentinel':  { id: 'bone-sentinel',   name: 'Bone Sentinel',         hp: 58,  maxHp: 58,  atk: 16, def: 6, exp: 35, gold: 12, loot: [{ id: 'iron-splinter', chance: 0.45 }, { id: 'keystone-shard', chance: 0.2 }] },
    'the-nameless':   { id: 'the-nameless',    name: 'The Nameless',  isBoss: true, hp: 135, maxHp: 135, atk: 25, def: 8, exp: 110, gold: 45, loot: [{ id: 'demon-fragment', chance: 1.0 }, { id: 'keystone-shard', chance: 0.8 }, { id: 'healing-draft', chance: 0.55 }] },
    // Steam Vaults
    'valve-golem':    { id: 'valve-golem',     name: 'Valve Golem',           hp: 45,  maxHp: 45,  atk: 11, def: 5, exp: 22, gold: 8,  loot: [{ id: 'iron-splinter', chance: 0.5 }, { id: 'demon-fragment', chance: 0.2 }] },
    'exhaust-specter': { id: 'exhaust-specter', name: 'Exhaust Specter',      hp: 32,  maxHp: 32,  atk: 13, def: 2, exp: 20, gold: 7,  loot: [{ id: 'demon-fragment', chance: 0.3 }, { id: 'keystone-shard', chance: 0.2 }] },
    'the-overseer':   { id: 'the-overseer',    name: 'The Overseer',  isBoss: true, hp: 105, maxHp: 105, atk: 21, def: 7, exp: 85, gold: 38, loot: [{ id: 'demon-fragment', chance: 1.0 }, { id: 'keystone-shard', chance: 0.7 }, { id: 'healing-draft', chance: 0.45 }] },
    // Crossroads
    'rift-wanderer':  { id: 'rift-wanderer',   name: 'Rift Wanderer',         hp: 38,  maxHp: 38,  atk: 12, def: 2, exp: 25, gold: 10, loot: [{ id: 'demon-fragment', chance: 0.4 }, { id: 'keystone-shard', chance: 0.25 }] },
    'chaos-shard':    { id: 'chaos-shard',     name: 'Chaos Shard',           hp: 44,  maxHp: 44,  atk: 15, def: 3, exp: 30, gold: 12, loot: [{ id: 'demon-fragment', chance: 0.35 }, { id: 'keystone-shard', chance: 0.3 }] },
    'the-convergent': { id: 'the-convergent',  name: 'The Convergent', isBoss: true, hp: 120, maxHp: 120, atk: 23, def: 6, exp: 100, gold: 40, loot: [{ id: 'demon-fragment', chance: 1.0 }, { id: 'keystone-shard', chance: 0.75 }, { id: 'healing-draft', chance: 0.5 }] },
  },

  // ---- DROP ITEMS ----
  dropItems: {
    'demon-fragment':  { id: 'demon-fragment',  name: 'Demon Fragment',   type: 'material',    desc: 'A shard of crystallized demonic essence. Merchants pay well for these.',       sellValue: 15, quantity: 1 },
    'keystone-shard':  { id: 'keystone-shard',  name: 'Keystone Shard',   type: 'material',    desc: 'A rough aetheric shard. Used in Keystone crafting.',                          sellValue: 10, quantity: 1 },
    'iron-splinter':   { id: 'iron-splinter',   name: 'Iron Splinter',    type: 'material',    desc: 'Corroded iron from ruins beyond the dome. Worth a few coins.',                sellValue: 8,  quantity: 1 },
    'withered-seed':   { id: 'withered-seed',   name: 'Withered Seed',    type: 'material',    desc: 'A seed that will never grow. Alchemists find uses for it.',                   sellValue: 12, quantity: 1 },
    'healing-draft':   { id: 'healing-draft',   name: 'Healing Draft',    type: 'consumable',  desc: 'Restores 30 HP.', effect: { hp: 30 },                                        sellValue: 5,  quantity: 1 },
  },

  // ---- PRAYER RESPONSES (randomized) ----
  prayers: [
    'The candles flicker once. Whether in answer or indifference, you cannot say.',
    'A warmth passes through you — brief, faint, like breath from a room you\'ve just left.',
    'You hear nothing. But the silence here feels different from the silence outside the dome.',
    'The etched words on the walls seem darker for a moment. Then the candles steady.',
    '"Go forth," she said. You remember.',
  ],

};
