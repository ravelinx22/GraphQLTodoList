import React, { Component  } from "react";
import { Meteor } from "meteor/meteor";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import Form from "./Form.jsx";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	componentDidMount() {
	}

	renderTodo() {
		return this.props.data.getTodo.map((todo, i) => {
			return <div key={todo._id}>{i+1}. {todo.name} - type: {todo.type}</div>
		});
	}

	render() {
		if(this.props.data.loading) return null;
		return (
			<div>
				<h1>Todo List</h1>
				<Form refetch={this.props.data.refetch}/>
				<br/>
				{this.renderTodo()}
			</div>
		 );
	}
}

const TodoQuery = gql`
	{
		getTodo {
			_id
			name
			type
		}
	}
`;

export default graphql(TodoQuery)(App);
