
import React, { Component } from 'react';
import http from '../utils/http';
import socketIO from 'socket.io-client';

import ChatMessage from './ChatMessage';


const ListUser = ({ users, initChat }) => {

	const list = users.map(user => {
		return <RowUser key={user._id} user={user} initChat={initChat} />
	})

	return (
		<div>
			<table className="table table-hover">
				<thead>
					<tr>
						<th>Users</th>
					</tr>
				</thead>
				<tbody>
					{list}
				</tbody>
			</table>
		</div>
	);

}


const RowUser = ({user, initChat}) => {

	const fnInitChat = () => {

		initChat(user);

	}


	return (
		<tr onClick={fnInitChat}>
			<td>
				{user.name} {user.middleName} - {user.email}
			</td>
		</tr>
	);

};



class Chat extends Component {

	constructor(props) {
		super(props);

		this.initChat = this.initChat.bind(this);
		this.back = this.back.bind(this);

		this.state = {
			users: [],
			mode: 'list',
			userChat: null,
			messages: []
		};

		this.initSocket();

	}

	initSocket() {

		// context component
		const self = this;

		// se establece la definicion del socket
		const socket = this.socket = socketIO('http://34.208.11.60:6003/chat');

		socket.on('connect', function() {

			const user = JSON.parse(window.localStorage.getItem("USER"));

			// socket.io.engine.id = "12345"
			// socket.emit('change-client-id', {
			// 	clientID: socket.io.engine.id,
			// 	userId: user._id
			// });

			socket.emit('change-client-id', user._id);

			socket.on('any-error', data => {

				// @TODO controller error
				console.log('data:any-error', data);

			});


			socket.on('receive-message', data => {
			

				console.log("data", data)

				// // messages
				// const {messages} = self.state;
				
				// messages.push(data);
				// self.setState({ messages });

			});


		})

	}


	componentDidMount() {

		http.request('user', 'get', '')
		.then(response => {

			const {data} = response;

			this.setState({
				users : data
			});
	
		})

	}

	initChat(user) {

		this.setState({
			mode : 'chat',
			userChat: user
		});

	}

	back() {

		this.setState({
			mode : 'list'
		});

	}


	render() {

		const {users, mode, userChat, messages} = this.state;

		let componentShow = <ChatMessage socket={this.socket} userChat={userChat} messages={messages}/>;
		if (mode === 'list') {
			componentShow = <ListUser users={users} initChat={this.initChat} />
		}

		return (
			<div>
				<h1>
					{
						mode === 'list' ? 'List Users' : <button type="button" onClick={this.back}>Back</button>
					}
				</h1>
				{componentShow}
			</div>
		);

	}
}

export default Chat;
