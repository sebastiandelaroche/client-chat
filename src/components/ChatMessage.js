
import React, { Component } from 'react';


const Message = ({ message, _from }) => {

	return (
		<div className="flex-column">
			<div className="flex-row">
				<div>from {_from.middleName}</div>
				<div>{message}</div>
			</div>
		</div>
	);

}


class ChatMessage extends Component {
  
	constructor(props) {
		super(props);

		this.send = this.send.bind(this);
		this.change = this.change.bind(this);

		this.state = {
			message: ''
		};
	}


	change(event) {

		this.setState({
			[event.target.name]: event.target.value
		});
	}

	send() {

		const {socket, userChat} = this.props;
		const {message} = this.state;

		const user = JSON.parse(window.localStorage.getItem("USER"));

		socket.emit('send-message', {
			message: message,
			receiver: userChat._id
		});

		this.setState({
			message: ''
		})

	}


	render() {
 
		const {messages} = this.props;
		const {message} = this.state;

		const listMessage = messages.map((msg, index) => {
			// return <Message key={`message-${index}`} message={message.message} _from={message.from} />
			return <div key={`message-${index}`}>{msg}</div>
		});

		return (
			<div>
				<div>{listMessage}</div>
				<div style={{ position: 'absolute', bottom: 0 }}>
					<input type="text" name="message" value={message} onChange={this.change} />
					<button type="button" onClick={this.send}>send</button>
				</div>
			</div>
		);

	}

}

export default ChatMessage;