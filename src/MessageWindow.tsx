import './MessageWindow.css'

import React from 'react'

const Message = ({ text, username, self }: {text: any, username: string, self: boolean}) => {
  return (
  <div className={'message' + (self ? ' message-self' : '')}>
    <div className='message-username'>{username}</div>
    <div className='message-text' style={{ whiteSpace: 'pre-wrap' }} >{text}</div>
  </div>
);}

export default class MessageWindow extends React.Component {
  messageWindow: any;
  props: any;
  constructor (props: any) {
    super(props)
    this.props = props;
    this.messageWindow = React.createRef()
  }
  componentDidUpdate () {
    const messageWindow = this.messageWindow.current
    messageWindow.scrollTop = messageWindow.scrollHeight - messageWindow.clientHeight
  }
  render () {
    const username: string = this.props.username;
    const messages: any = this.props.messages || [];
    console.log({username, messages});
    return (
      <div className='message-window' ref={this.messageWindow}>
        {messages.length > 0 &&
        messages.map((msg: any, i: number) => {
          return <Message key={i} text={msg.text} username={msg.username} self={username === msg.username} />
        })}
        <div>&nbsp;</div>
      </div>
    )
  }
}
