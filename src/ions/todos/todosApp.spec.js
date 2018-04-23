/**
 * Integration tests in here include setup of routes and store similar to what
 * thunderball-client pageBuilder does
 */
/* eslint-disable global-require, import/no-dynamic-require, import/no-extraneous-dependencies */
import React from 'react';
import { browserHistory, match } from 'react-router';
import { mount } from 'enzyme';
import Shell from 'thunderball-client/lib/render/Shell';
import getStoreAndRoutes from 'thunderball-client/lib/render/getStoreAndRoutes';
import manifest from './manifest';

jest.mock('react-helmet');

// parse manifest
const injectors = manifest.browser.page.injectors.map(path => require(path));
const createRoutes = require(manifest.browser.page.createRoutes);
const pageProps = manifest.browser.page.props || {};

const defaultLocale = 'en';

const initialState = {
  todos: [
    {
      text: 'Test AddTodo',
      completed: false,
      id: 0,
    },
    {
      text: 'Test AddTodo 2',
      completed: true,
      id: 1,
    },
  ],
  visibilityFilter: 'SHOW_ALL',
};

const setup = () => {
  const { store, routes, history } = getStoreAndRoutes(
    initialState,
    createRoutes,
    browserHistory,
    { adjustUrlOnReplay: false },
    injectors,
    pageProps);
  history.push('/todos');
  const props = { injectors, store, history, pageProps, routes, defaultLocale };
  const wrapper = mount(<Shell {...props} />);

  return {
    props,
    store,
    wrapper,
  };
};

describe('todos app integration', () => {
  describe('server side rendering', () => {
    it('renders /todos', (done) => {
      expect.assertions(2);
      const { store, routes, history } = getStoreAndRoutes(
        initialState,
        createRoutes,
        browserHistory,
        { adjustUrlOnReplay: false },
        injectors,
        pageProps);
      expect(store.getState()).toMatchSnapshot();
      const shellProps = { injectors, store, history, pageProps, routes, defaultLocale };
      match({ history, routes, location: '/todos' }, (error, redirectLocation, renderProps) => {
        const wrapper = mount(<Shell {...shellProps} renderProps={renderProps} />);
        expect(wrapper.render()).toMatchSnapshot();
        done();
      });
    });
  });
  describe('client side', () => {
    beforeEach(() => {
      process.env.IS_BROWSER = 'true';
    });
    afterEach(() => {
      delete process.env.IS_BROWSER;
    });
    it('renders /todos', () => {
      const { wrapper } = setup();
      expect(wrapper.render()).toMatchSnapshot();
    });
    it('adds todo', () => {
      const { wrapper } = setup();
      expect(wrapper.find('Todo')).toHaveLength(2);
      const form = wrapper.find('form');
      const input = form.find('input');
      const button = form.find('button');
      const value = 'test - go to the store';
      input.simulate('change', { target: { value } });
      expect(input.prop('value')).toEqual(value);
      button.simulate('submit');
      expect(wrapper.find('Todo')).toHaveLength(3);
    });
    it('filters active todos', () => {
      const { wrapper } = setup();
      expect(wrapper.find('Todo')).toHaveLength(2);
      const button = wrapper.find('button').findWhere(x => x.text() === 'Active');
      expect(button).toHaveLength(1);
      button.simulate('click');
      expect(wrapper.find('Todo')).toHaveLength(1);
    });
  });
});
