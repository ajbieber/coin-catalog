import React from 'react';
import { Container, Form, FormGroup, Input, Label } from 'reactstrap'
import { Link } from 'react-router-dom';
import axios from 'axios';

// Node modules
import { Buffer } from 'buffer';

// Local Imports
import LoginForm from './components/login-form';
import CreateForm from './components/create-form';

export default class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loginForm: true
		}

		this.handleLogin = this.handleLogin.bind(this);
		this.handleNewUser = this.handleNewUser.bind(this);
		this.switchForms = this.switchForms.bind(this);
	}

	 handleLogin(data) {
		// Format the username/password
		const token = Buffer.from(`${data.username}:${data.password}`, 'utf8').toString('base64');

		axios.post(`http://localhost:1414/api/login`, {}, {
			headers: {
				'Authorization': `Basic ${token}`
			}
		})
		.then(() => {
			this.props.handleLogin();
		})
		.catch(err => {
			// this.props.toggleError(err.message);
		})
		.then(() => {

		});
	}

	handleNewUser(data) {
		// Format the body
		const body = {
			_id: data.username,
			password: data.password,
			email: data.email
		}

		axios.post(`http://localhost:1414/api/users/${body._id}`, body)
		.then(() => {
			this.props.handleLogin();
		})
		.catch(err => {
			// this.props.toggleError(err.message);
		})
		.then(() => {

		});
	}

	switchForms() {
		this.setState({ loginForm: !this.state.loginForm})
	}

	render() {
		return (
			<>
			{ this.state.loginForm
				? <LoginForm handleSubmit={this.handleLogin} switchForms={this.switchForms}/>
				: <CreateForm handleSubmit={this.handleNewUser} switchForms={this.switchForms}/>
			}
			</>
		);
	}
}