import React, { Component  } from "react";
import { Meteor } from "meteor/meteor";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

class Form extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	componentDidMount() {
	}

	submit() {
		let name = this.refs.name.value;
		let type = this.refs.type.value;
		this.props.createTodo({
			variables: {
				name: name,
				type: type
			}
		}).then((data) => {
			// Actualizar pagina
			this.props.refetch()
		});
	}

	render() {
		return (
			<div>
				<input type="text" placeholder="Name" ref="name"/>
				<input type="text" placeholder="Type" ref="type"/>
				<button onClick={this.submit.bind(this)}>Submit</button>
			</div>
		 );
	}
}

const CreateQuery = gql`
	mutation createTodo($name: String!, $type: String!) {
		createTodo(name: $name, type: $type) {
			_id
		}
	}
`;

export default graphql(CreateQuery, {
	name: "createTodo"
})(Form);
