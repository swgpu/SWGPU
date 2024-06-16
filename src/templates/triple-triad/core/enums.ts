enum PriorityInBattleEffect {
  PLUS = 'PLUS',
  IDENTIQUE = 'IDENTIQUE',
  NORMAL = 'NORMAL'
};

enum Direction {
  W = 0,
  N = 1,
  E = 2,
  S = 3
};

enum ElementalType {
  NONE = 'NONE',
  FIRE = 'FIRE',
  ICE = 'ICE',
  EARTH = 'EARTH',
  THUNDER = 'THUNDER',
  YIN = 'YIN',
  YANG = 'YANG'
};

enum TypeEffect {
  PRE_BATTLE = 'PRE_BATTLE',
  IN_BATTLE = 'IN_BATTLE',
  POST_BATTLE = 'POST_BATTLE'
};

enum PriorityEffect {
  PLUS = 'PLUS',
  IDENTIQUE = 'IDENTIQUE',
  NORMAL = 'NORMAL'
};

export { PriorityInBattleEffect };
export { Direction };
export { ElementalType };
export { TypeEffect };
export { PriorityEffect };