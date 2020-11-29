import React from 'react';
import { Container, Form, FormGroup, Input, Label } from 'reactstrap'

export default class CreateForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			username: "",
			password: "",
			passwordConfirm: "",
			email: ""
		}

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
						<Label for="emailInput">Email</Label>
						<Input
							name="email"
							id="emailInput"
							type="email"
							value={this.state.email}
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
					<FormGroup>
						<Label for="passwordConfirmInput">Confirm Password</Label>
						<Input
							name="passwordConfirm"
							id="passwordConfirmInput"
							type="password"
							value={this.state.passwordConfirm}
							onChange={this.handleChange}
						/>
					</FormGroup>
					<input type="submit" value="Submit" />
				</Form>
				<div onClick={this.props.switchForms}>Already have an account? Log in</div>
			</Container>
		);
	}
}