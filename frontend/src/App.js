import React, { useState } from 'react';
import styled, {ThemeProvider} from 'styled-components';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Navbar from './components/navigation/Navbar';
import Login from './components/user/Login';
import Button from './components/general/Button';


var theme = {
  main: "#16b897",
  highlight: "#b813d1",
  highlight_dark: "#7d078f",
  mainoverlay: "white"
};


export default function App() {
	const [user, setUser] = useState(null);

	const login = (token) => {
		fetch("api/user/me", {
			method: 'GET',
			headers: { Accept: "application/json", token: token }
		}).then(res => res.json()).then(
			(result) => {
				console.log(result);
				if (result.hasOwnProperty("username")) {
					localStorage.setItem('token', token);
					setUser(result);
				}
			},
			(error) => {
				console.log(error);
			}
		);
	}

	const logout = () => {
		localStorage.removeItem('token');
		setUser(null);
	}

	const token = localStorage.getItem('token');

	if (!user && token) {
		login(token);
	}

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
						<Button onClick={()=>logout()}>Log Out</Button>
					</Route>
					<Route path="/login">
						<Login login={login}/>
					</Route>
					<Route path="/">
						<h1>Home</h1>
					</Route>
				</Switch>
			</Router>
		</ThemeProvider>
	);
}