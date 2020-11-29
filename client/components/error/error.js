import React from 'react';
import { Alert } from 'reactstrap';

class Error extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Alert color="danger">{this.props.error}</Alert>
		)
	}
}

export default Error