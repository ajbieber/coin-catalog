import React from 'react';
import { Container, Form, FormGroup, Input, Label } from 'reactstrap'

export default class LoginForm extends React.Component {
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
		event.preventDefault();
		this.props.handleSubmit(this.state);
	}

	render() {
		return (
			<Container>
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
				<div onClick={this.props.switchForms}>Create an account</div>
			</Container>
		);
	}
}