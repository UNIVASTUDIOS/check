import { atom } from "recoil";

export const currentPlayersListState = atom({
  key: "currentPlayersListState",
  default: [],
});

export const currentPlayerState = atom({
  key: "currentPlayerState",
  default: "",
});

export const currentDiceState = atom({
  key: "currentDiceState",
  default: { num: 0, isLocked: false, lastRolledBy: null },
});

export const wonState = atom({
  key: "wonState",
  default: {
    player: "",
    win: false
  }
})

export const setupState = atom({
  key: "setupState",
  default: {
    value: false,
    playersList: [],
    currentPlayer: "",
    roomID: ""
  }
})

export const started = atom({
    key: "started",
    default: false
})

export const playerName = atom({
    key: "name",
    default: ""
})

// export const already_created_state = atom({
//     key: "already_created_state",
//     default: {
//         value: false,   
//     }
// })

/**
 * Posible values:
 * "home" - initial state
 * "won" - coin entered won state
 */
export const allCoinState = atom({
  key: "allCoinState",
  default: {
    palegreen: {
      p0: { position: "home", isTurnAvailable: true },
      p1: { position: "home", isTurnAvailable: true },
      p2: { position: "home", isTurnAvailable: true },
      p3: { position: "home", isTurnAvailable: true },
    },
    yellow: {
      y0: { position: "home", isTurnAvailable: true },
      y1: { position: "home", isTurnAvailable: true },
      y2: { position: "home", isTurnAvailable: true },
      y3: { position: "home", isTurnAvailable: true },
    },
    royalblue: {
      r0: { position: "home", isTurnAvailable: true },
      r1: { position: "home", isTurnAvailable: true },
      r2: { position: "home", isTurnAvailable: true },
      r3: { position: "home", isTurnAvailable: true },
    },
    tomato: {
      t0: { position: "home", isTurnAvailable: true },
      t1: { position: "home", isTurnAvailable: true },
      t2: { position: "home", isTurnAvailable: true },
      t3: { position: "home", isTurnAvailable: true },
    },
  },
});

export const allBlockState = atom({
  key: "allBlockState",
  default: {
    // t30: ["t0", "p1"],
    // "r-won": ["r0", "r1"],
    // r51: ["r2"],
  },
});
