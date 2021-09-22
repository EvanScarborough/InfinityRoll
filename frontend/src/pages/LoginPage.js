import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../components/general/Button';
import { useHistory } from "react-router-dom";

const LoginArea = styled.div`
    width: calc(100% - 46px);
    max-width: 500px;
    margin: 40px auto 0 auto;
    margin-bottom: 64px;
    border: solid 5px ${props => props.theme.main};
    border-radius: 16px;
    box-shadow: 0 8px 8px rgba(0,0,0,0.1);
    min-height: 200px;
    overflow: hidden;
`;

const LoginLabel = styled.h1`
    background-color: ${props => props.theme.main};
    color: ${props => props.theme.main_overlay};
    text-align: center;
    padding: 8px;
`;

const LoginForm = styled.form`
    padding: 20px;
    display: flex;
    flex-direction: column;
`;

const FormLabel = styled.label`
    font-size: 1.2em;
`;

const FormInput = styled.input`
    font-size: 1.2em;
    border: solid 3px ${props => props.theme.main};
    border-radius: 4px;
    margin-bottom: 24px;
    padding: 8px;
    &:focus {
        border: solid 3px ${props => props.theme.highlight};
        outline: none;
    }
`;

const TypeSwitch = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 16px;
`;

const TypeSwitchComment = styled.p`
    margin-bottom: 8px;
`;

const WarningLabel = styled.p`
    background-color: #faa;
    color: #a00;
    font-weight: bold;
    border-radius: 4px;
    margin: 8px;
    padding: 8px;
`;



export default function LoginPage({ login }) {
    const [register, setRegister] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [warning, setWarning] = useState("");

    const history = useHistory();

    if (register) {
        const createAccount = (e) => {
            e.preventDefault();
            if (password === passwordConfirm) {
                console.log({username, password});
                fetch("api/user/signup", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', Accept: "application/json" },
                    body: JSON.stringify({username, password})
                }).then(res => res.json()).then(
                    (result) => {
                        console.log(result);
                        if (result.hasOwnProperty("message")) setWarning(result.message);
                        if (result.hasOwnProperty("token")) {
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
            <LoginArea>
                <LoginLabel>Sign Up</LoginLabel>
                {warning !== "" ? <WarningLabel>{warning}</WarningLabel> : null}
                <LoginForm>
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <FormInput type="username" id="username" value={username} onChange={event => setUsername(event.target.value)} />
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <FormInput type="password" id="password" value={password} onChange={event => setPassword(event.target.value)} />
                    <FormLabel htmlFor="password_confirm">Confirm Password</FormLabel>
                    <FormInput type="password" id="password_confirm" value={passwordConfirm} onChange={event => setPasswordConfirm(event.target.value)} />
                    <Button type="submit" onClick={e => createAccount(e)}>Create Account</Button>
                </LoginForm>
                <TypeSwitch>
                    <TypeSwitchComment>Already have an account?</TypeSwitchComment>
                    <Button onClick={()=>setRegister(!register)}>Log In Here!</Button>
                </TypeSwitch>
            </LoginArea>
        );
    }
    else {
        const logIn = (e) => {
            e.preventDefault();
            fetch("api/user/login", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: "application/json" },
                body: JSON.stringify({username, password})
            }).then(res => res.json()).then(
                (result) => {
                    console.log(result);
                    if (result.hasOwnProperty("message")) setWarning(result.message);
                    if (result.hasOwnProperty("token")) {
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
            <LoginArea>
                <LoginLabel>Log In</LoginLabel>
                {warning !== "" ? <WarningLabel>{warning}</WarningLabel> : null}
                <LoginForm>
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <FormInput type="username" id="username" value={username} onChange={event => setUsername(event.target.value)} />
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <FormInput type="password" id="password" value={password} onChange={event => setPassword(event.target.value)} />
                    <Button type="submit" onClick={e => logIn(e)}>Log In</Button>
                </LoginForm>
                <TypeSwitch>
                    <TypeSwitchComment>Need an account?</TypeSwitchComment>
                    <Button onClick={()=>setRegister(!register)}>Sign Up Here!</Button>
                </TypeSwitch>
            </LoginArea>
        );
    }
}