const ROUTES = {
  MY_BOARDS: '/my-boards',
  MY_GEAR: '/my-gear',
  MY_GEAR_PEDALS: '/my-gear/pedals',
  MY_GEAR_BOARDS: '/my-gear/boards',
  MY_GEAR_BY_TYPE: '/my-gear/:type',
  MY_GEAR_BY_TYPE_BY_ID: '/my-gear/:type/:userGearId/:gearId/:name',
  MY_GEAR_PEDALS_BY_ID: '/my-gear/pedals/:userPedalId/:pedalId/:name',
  MY_GEAR_BOARDS_BY_ID: '/my-gear/boards/:userBoardId/:boardId/:name',
  ADD_GEAR: '/my-gear/add-gear',
  HOME: '/',
  CREATE: '/create',
  CREATE_BY_BOARD_ID: '/create/:boardId',
  ABOUT: '/about',

  LOGIN: '/login',
  LOGOUT: '/logout',
  REGISTER: '/register'
}

export { ROUTES }
