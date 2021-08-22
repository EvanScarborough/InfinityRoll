import React, { useState } from 'react';
import styled, {ThemeProvider} from 'styled-components';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Navbar from './components/navigation/Navbar';
import Login from './components/user/Login';


var theme = {
  main: "#16b897",
  highlight: "#b813d1",
  highlight_dark: "#7d078f",
  mainoverlay: "white"
};


export default function App() {
	const [user, setUser] = useState(null);


	return (
		<ThemeProvider theme={theme}>
			<Router>
				<Navbar user={user}/>

				<Switch>
					<Route path="/generator">
						<h1>Generators</h1>
					</Route>
					<Route path="/dice">
						<h1>Dice</h1>
					</Route>
					<Route path="/user">
						<h1>User</h1>
					</Route>
					<Route path="/login">
						<Login />
					</Route>
					<Route path="/">
						<h1>Home</h1>
					</Route>
				</Switch>
			</Router>
		</ThemeProvider>
	);
}