import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TodoTextInput from './TodoTextInput'

export default class Header extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    addTodo: PropTypes.func.isRequired,
    textChange: PropTypes.func.isRequired
  }

  handleSave = text => {
    if (text.length !== 0) {
      this.props.addTodo(text)
    }
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <TodoTextInput newTodo
                       onSave={this.handleSave}
                       text={this.props.text}
                       onChange={text => this.props.textChange(text)}
                       placeholder="What needs to be done?" />
      </header>
    )
  }
}
