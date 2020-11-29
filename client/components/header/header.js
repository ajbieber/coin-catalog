import React from 'react';
import { Navbar, NavbarBrand, NavbarText } from 'reactstrap';
import { BrowserRouter as Router, Link } from "react-router-dom";

import "./header.scss"

export default class Header extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Navbar color="light">
				<NavbarBrand href="/">Coin Catalog</NavbarBrand>
				<Link to="/login">
					<NavbarText>
						{(this.props.authenticated) ? "Log Out" : "Log In"}
					</NavbarText>
				</Link>
			</Navbar>
		);
	}
}

