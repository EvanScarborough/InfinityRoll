import React, { useState } from 'react';
import styled from 'styled-components';
import Container from '../components/general/Container';
import Button from '../components/general/Button';
import Form, { FormLabel, FormInput, FormMessage } from '../components/general/Form';
import { useHistory } from "react-router-dom";

const TypeSwitchArea = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 16px;
`;

const TypeSwitchComment = styled.p`
    margin-bottom: 8px;
`;

/**
 * The login or signup page
 * @param {function} props.login - the function to call when after you've logged in 
 * @returns a component
 */
export default function LoginPage({ login }) {
    const [register, setRegister] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [warning, setWarning] = useState("");

    const history = useHistory();

    if (register) {
        // create an account
        const createAccount = (e) => {
            e.preventDefault();
            // check the password confirm matches
            if (password === passwordConfirm) {
                fetch("api/user/signup", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', Accept: "application/json" },
                    body: JSON.stringify({username, password})
                }).then(res => res.json()).then(
                    (result) => {
                        if (result.hasOwnProperty("message")) setWarning(result.message);
                        if (result.hasOwnProperty("token")) {
                            // if it returns a token, then you know it worked. call the login function and go to the /generator page
                            login(result.token);
                            history.push("/generator");
                        }
                    },
                    (error) => {
                        console.log(error);
                        if (error.hasOwnProperty("message")) setWarning(error.message);
                    }
                );
            }
            else {
                setWarning("Password confirmation did not match!");
            }
        }
        return(
            <Container title="Sign Up" small>
                {warning !== "" ? <FormMessage warning>{warning}</FormMessage> : null}
                <Form>
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <FormInput type="username" id="username" value={username} onChange={event => setUsername(event.target.value)} />
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <FormInput type="password" id="password" value={password} onChange={event => setPassword(event.target.value)} />
                    <FormLabel htmlFor="password_confirm">Confirm Password</FormLabel>
                    <FormInput type="password" id="password_confirm" value={passwordConfirm} onChange={event => setPasswordConfirm(event.target.value)} />
                    <Button type="submit" onClick={e => createAccount(e)}>Create Account</Button>
                </Form>
                <TypeSwitchArea>
                    <TypeSwitchComment>Already have an account?</TypeSwitchComment>
                    <Button onClick={()=>setRegister(!register)}>Log In Here!</Button>
                </TypeSwitchArea>
            </Container>
        );
    }
    else {
        // log in
        const logIn = (e) => {
            e.preventDefault();
            fetch("api/user/login", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: "application/json" },
                body: JSON.stringify({username, password})
            }).then(res => res.json()).then(
                (result) => {
                    if (result.hasOwnProperty("message")) setWarning(result.message);
                    if (result.hasOwnProperty("token")) {
                        // if it returns a token, then you know it worked. call the login function and go to the /generator page
                        login(result.token);
                        history.push("/generator");
                    }
                },
                (error) => {
                    console.log(error);
                    if (error.hasOwnProperty("message")) setWarning(error.message);
                }
            );
        }
        return(
            <Container title="Log In" small>
                {warning !== "" ? <FormMessage warning>{warning}</FormMessage> : null}
                <Form>
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <FormInput type="username" id="username" value={username} onChange={event => setUsername(event.target.value)} />
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <FormInput type="password" id="password" value={password} onChange={event => setPassword(event.target.value)} />
                    <Button type="submit" onClick={e => logIn(e)}>Log In</Button>
                </Form>
                <TypeSwitchArea>
                    <TypeSwitchComment>Need an account?</TypeSwitchComment>
                    <Button onClick={()=>setRegister(!register)}>Sign Up Here!</Button>
                </TypeSwitchArea>
            </Container>
        );
    }
}