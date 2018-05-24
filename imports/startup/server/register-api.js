import { createApolloServer } from "meteor/apollo";
import { makeExecutableSchema } from "graphql-tools";
import { Todo } from "../../api/Todo.js";

const TodoItem = `
	type TodoItem {
		_id: String!
		name: String!
		type: String!
	}
`;

const TodoSchema = `
	type Query {
		getTodo: [TodoItem]
	}
`;

const CreateTodo = `
	type Mutation {
		createTodo(name: String, type: String):TodoItem
	}
`;

const typeDefs = [
	TodoItem,
	TodoSchema,
	CreateTodo
];

const resolvers = {
	Query: {
		getTodo() {
			return Todo.find({}, {sort: {createdAt: -1}}).fetch({})
		}
	},
	Mutation: {
		createTodo(obj, args, context) {
			// Crear todo
			const todoId = Todo.insert({
				createdAt: new Date(),
				name: args.name,
				type: args.type
			});
			return Todo.findOne(todoId);
		}
	}
}

const schema = makeExecutableSchema({
	typeDefs,
	resolvers
});

createApolloServer({schema});
