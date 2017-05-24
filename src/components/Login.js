
import React, { Component } from 'react';
import http from '../utils/http';


class Login extends Component {
  
	constructor(props) {
		super(props);
		this.change = this.change.bind(this);
		this.signIn = this.signIn.bind(this);

		this.state = {
			nickName: '', 
			password: ''
		}
	}

	change(event) {

		this.setState({
			[event.target.name]: event.target.value
		});
	}

	signIn() {

		const {nickName, password} = this.state;

		http.request('user/auth', 'post', `nickName=${nickName}&password=${password}`)
		.then(response => {

			const {data, message} = response;

			if (!data) {
				alert(message);
				return;
			}

			window.localStorage.setItem('USER', JSON.stringify(data));
			window.location.reload();

		});

	}


	render() {
  
		const {nickName, password} = this.state;

	    return (
	    	<div>
			    <label>
			    	Nickname:
			    	<input name="nickName" type="text" onChange={this.change} value={nickName} />
		    	</label>
	    		<br />
		    	<label>
		    		Password:
		    		<input name="password" type="password" onChange={this.change} value={password} />
		    	</label>
		    	<button type="buttn" onClick={this.signIn}>sign in</button>
	    	</div>
	    );

	}

}

export default Login;
