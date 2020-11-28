import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: "",
			password: ""
		};

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
		axios.get(`http://localhost:1414/api/users/${this.state.username}`, {
			auth: {
				username: this.state.username,
				password: this.state.password
			}
		})
		.catch(err => {
			console.log(err.message);
		});
		event.preventDefault();
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<label>
					Username:
					<input
						name="username"
						type="text"
						value={this.state.username}
						onChange={this.handleChange}
					/>
				</label>
				<label>
					Password:
					<input
						name="password"
						type="password"
						value={this.state.password}
						onChange={this.handleChange}
					/>
				</label>
				<input type="submit" value="Submit" />
			</form>
		);
	}
}

export default Login