import React from 'react';
import { Alert } from 'reactstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Internal
import Login from './login/login';
import Header from './header/header';
import Home from './home/home';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			authenticated: false
		}

		this.handleLogin = this.handleLogin.bind(this);
	}

	handleLogin() {
		this.setState({ authenticated: !this.state.authenticated })
	}

	render() {
		return (
			<Router>
				<Header
					authenticated={this.state.authenticated}
					handleLogout={this.handleLogin}
				/>

				<Switch>
					<Route path="/login">
						{this.state.authenticated
							? <Home />
							: <Login handleLogin={this.handleLogin} />
						}
					</Route>
					<Route path="/" >
						{this.state.authenticated
							? <Home />
							: <Login handleLogin={this.handleLogin} />
						}
					</Route>
				</Switch>
			</Router>
		)
	}
}

export default App;