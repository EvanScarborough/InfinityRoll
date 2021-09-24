import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import useTheme from './hooks/useTheme';

import Navbar from './components/navigation/Navbar';
import Button from './components/general/Button';
import Footer from './components/navigation/Footer';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import GeneratorListingPage from './pages/GeneratorListingPage';
import CreateGeneratorPage from './pages/CreateGeneratorPage';


const MainArea = styled.div`
	width: 100%;
	height: 100%;
	background-color: ${props => props.theme.background};
`;

/**
 * The base-level component that handles all routing
 * @returns a component
 */
export default function App() {
	const [user, setUser] = useState(null);
	const [theme, shuffleTheme] = useTheme();

	// use the jwt to authenticate and get info about the user
	const login = (token) => {
		fetch("/api/user/me", {
			method: 'GET',
			headers: { Accept: "application/json", token: token }
		}).then(res => res.json()).then(
			(result) => {
				result.token = token;
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

	// log out and clear the localstorage
	const logout = () => {
		localStorage.removeItem('token');
		setUser(null);
	}

	// upon starting up, check if there is a token in localstorage and use it to log in
	useEffect(() => {
		const token = localStorage.getItem('token');
		if (!user && token) {
			login(token);
		}
	});

	return (
		<ThemeProvider theme={theme}>
			<Router>
				<MainArea>
					<Navbar user={user} shuffleTheme={shuffleTheme}/>
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
				</MainArea>
			</Router>
		</ThemeProvider>
	);
}