module.exports = {
  name: 'todos',
  browser: {
    page: {
      createRoutes: './createRoutes',
      path: '/todos*',
      injectors: [
        '../../appInjectors',
        './injectors',
      ],
    },
  },
};
