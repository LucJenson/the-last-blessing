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
    {
      id: 'worn-blade',
      name: 'Worn Blade',
      type: 'weapon',
      desc: 'A chipped short sword. Standard issue for new arrivals at the Guild.',
      quantity: 1,
    },
    {
      id: 'traveler-cloak',
      name: "Traveler's Cloak",
      type: 'armor',
      desc: 'Thin but better than nothing. Smells like someone else\'s journey.',
      quantity: 1,
    },
    {
      id: 'healing-draft',
      name: 'Healing Draft',
      type: 'consumable',
      desc: 'A small vial of restorative liquid. Restores 30 HP.',
      quantity: 3,
      effect: { hp: 30 },
    },
  ],

  // ---- ARRIVAL TEXT (per race) ----
  arrivalText: {
    elf: 'The dome\'s light feels familiar — like sunlight through a canopy you half remember. Your roots haven\'t spoken since the crossing, but you feel them listening.',
    human: 'You\'ve heard the stories all your life. Standing here now, inside the dome, the weight of it finally settles in your chest. This is real.',
    beast: 'The city smells of too many people pressed into too little space. But the dome holds, and the demons stay out. That\'s what matters. You\'ve made it.',
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
