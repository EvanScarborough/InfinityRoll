import React, { useState, useEffect } from 'react';
import {ThemeProvider} from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from './components/navigation/Navbar';
import Button from './components/general/Button';
import Footer from './components/navigation/Footer';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import GeneratorListingPage from './pages/GeneratorListingPage';
import CreateGeneratorPage from './pages/CreateGeneratorPage';


var theme = {
  main: "#16b897",
  main_dark: "#03362b",
  main_wash: "#bdf2e7",
  highlight: "#b813d1",
  highlight_dark: "#7d078f",
  main_overlay: "white",
  main_dark_overlay: "white",
  background: "white",
  background_text: "black"
};


export default function App() {
	const [user, setUser] = useState(null);

	const login = (token) => {
		fetch("/api/user/me", {
			method: 'GET',
			headers: { Accept: "application/json", token: token }
		}).then(res => res.json()).then(
			(result) => {
				result.token = token;
				console.log('logged in as:');
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

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (!user && token) {
			login(token);
		}
	});

	return (
		<ThemeProvider theme={theme}>
			<Router>
				<Navbar user={user}/>
				<Switch>
					<Route path="/newgenerator">
						<CreateGeneratorPage user={user}/>
					</Route>
					<Route path="/generator">
						<GeneratorListingPage user={user}/>
					</Route>
					<Route path="/user">
						<h1>User</h1>
						<Button onClick={()=>logout()}>Log Out</Button>
					</Route>
					<Route path="/login">
						<LoginPage login={login}/>
					</Route>
					<Route path="/">
						<LandingPage />
					</Route>
				</Switch>

				<Footer />
			</Router>
		</ThemeProvider>
	);
}