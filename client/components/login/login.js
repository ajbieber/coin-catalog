import React, { Component } from 'react';
import { Input, Label, Form, FormGroup } from 'reactstrap'
import axios from 'axios';

import { Buffer } from 'buffer';

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: "",
			password: "",
			error: null
		};

		console.log(this.props);

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		const value = event.target.value;
		this.setState({
			...this.state,
			[event.target.name]: value
		});
	}

	 handleSubmit(event) {
		event.preventDefault();
		// Format the username/password
		const token = Buffer.from(`${this.state.username}:${this.state.password}`, 'utf8').toString('base64');

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

	render() {
		return (
			<>
				<Form onSubmit={this.handleSubmit}>
					<FormGroup>
						<Label for="usernameInput">Username</Label>
						<Input
							name="username"
							id="usernameInput"
							type="text"
							value={this.state.username}
							onChange={this.handleChange}
						/>
					</FormGroup>
					<FormGroup>
						<Label for="passwordInput">Password</Label>
						<Input
							name="password"
							id="passwordInput"
							type="password"
							value={this.state.password}
							onChange={this.handleChange}
						/>
					</FormGroup>
					<input type="submit" value="Submit" />
				</Form>
			</>
		);
	}
}

export default Login