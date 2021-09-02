const express = require("express");
const {ApolloServer} = require("apollo-server-express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

const db = require("./db");
const models = require("./models");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

const app = express();
app.use(cors());

db.connect(DB_HOST);

const getUser = (token) => {
	if (token) {
		try {
			return jwt.verify(token, process.env.JWT_SECRET);
		} catch (err) {
			throw new Error("Session invalid");
		}
	}
};

let server = null;
async function startServer() {
	server = new ApolloServer({
		typeDefs,
		resolvers,
		context: ({req}) => {
			const token = req.headers.authorization;
			const user = getUser(token);
			return {models, user};
		},
	});
	await server.start();
	server.applyMiddleware({app, path: "/api"});
}

startServer();

app.listen({port}, () => {
	console.log(
		`GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
	);
});
