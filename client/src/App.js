import React from "react";
import GlobalStyle from "./components/GlobalStyle";
import Pages from "./pages";
import {ApolloClient, ApolloProvider, createHttpLink} from "@apollo/client";
import {InMemoryCache} from "apollo-cache-inmemory";
import {setContext} from "apollo-link-context";

const uri = process.env.REACT_APP_API_URI;
const httpLink = createHttpLink({uri});
const cache = new InMemoryCache();

const authLink = setContext((_, {headers}) => {
	return {
		headers: {
			...headers,
			authorization: localStorage.getItem("token") || "",
		},
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache,
	resolvers: {},
	connectToDevTools: true,
});

const data = {
	isLoggedIn: !!localStorage.getItem("token"),
};

cache.writeData({data});
client.onResetStore(() => cache.writeData({data}));

function App() {
	return (
		<ApolloProvider client={client}>
			<GlobalStyle />
			<Pages />
		</ApolloProvider>
	);
}

export default App;
