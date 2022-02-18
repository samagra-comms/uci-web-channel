import React, { Component } from 'react'

export default class TextBar extends Component {
  props: any;
  input: any;
  constructor (props: any) {
    super(props)
    this.props = props;
    this.input = React.createRef()
  }
  sendMessage () {
    this.props.onSend && this.props.onSend(this.input.current.value)
    this.input.current.value = ''
  }
  sendMessageIfEnter (e: any) {
    if (e.keyCode === 13) {
      this.sendMessage()
    }
  }
  render () {
    const sendMessage = this.sendMessage.bind(this)
    const sendMessageIfEnter = this.sendMessageIfEnter.bind(this)

    return (
      <div>
        <input type='text' ref={this.input} onKeyDown={sendMessageIfEnter} />
        <button onClick={sendMessage}>
          Send
        </button>
      </div>
    )
  }
}
