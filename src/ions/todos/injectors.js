import reducers from './reducers';

module.exports = {
  beforeConfigureStore: options => ({
    reducers: {
      ...(options || {}).reducers,
      ...reducers,
    },
  }),
};
