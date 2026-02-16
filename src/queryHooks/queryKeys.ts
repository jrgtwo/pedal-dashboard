const QueryKeys = {
  //*********************************
  //          SESSION
  // ********************************
  // Session includes all queries related 
  // to the current user session, including
  // login status and user information.
  // ********************************
  session: {
    all: ['session']
  },

  //********************************
  //          MY GEAR
  // ******************************** 
  // My Gear includes everything related to
  // the current users gear selections.
  //******************************** */
  myBoard: {
    all: ['myBoard'],
    byId: (id: number) => [`myBoard`, id],
  },
  myBoards: {
    all: ['myBoards']
  },
  myPedal: {
    all: ['myPedal'],
    byId: (id: number) => [`myPedal`, id],
  },
  myPedals: {
    all: ['myPedals']
  },
  myPedalBoards: {
    all: ['myPedalBoards'],
    byId: (id: number) => ['myPedalBoards', id]
  },
  myGear: {
    all: ['myGear']
  },

  //*****************************************************
  //         All GEAR
  // ****************************************************
  // All the gear in the app, including all pedals and boards. 
  // This is used for the add gear page and 
  // for searching for gear to add to the users board.
  // ****************************************************/
  boards: {
    all: ['boards'],
    byId: (id: number) => ['board', id]
  },
  pedals: {
    all: ['pedals'],
    byId: (id: number) => ['pedal', id]
  }
}

export { QueryKeys }
