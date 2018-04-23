import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTodo } from '../actions';

class AddTodo extends React.Component {
  state = {
    value: '',
  };
  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    if (!this.state.value.trim()) {
      return;
    }
    this.props.dispatch(addTodo(this.state.value));
    this.setState({ value: '' });
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input value={this.state.value} onChange={this.handleChange} />
          <button type="submit">
            Add Todo
          </button>
        </form>
      </div>
    );
  }
}

AddTodo.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(AddTodo);
