import React from 'react';
import { IndexRoute, Route } from 'react-router';

import App from '../../app/containers/App';
import TodoView from './containers/TodoView';

export default function createRoutes(/* getState */) {
  return (
    <Route component={App} path="/todos">
      <IndexRoute component={TodoView} />
    </Route>
  );
}
