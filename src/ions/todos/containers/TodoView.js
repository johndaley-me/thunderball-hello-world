import React from 'react';
import { hot } from 'react-hot-loader';
import Helmet from 'react-helmet';
import App from '../components/App';

const TodoView = () => (
  <div>
    <Helmet title="TODO" />
    <App />
  </div>
);

export default hot(module)(TodoView);
