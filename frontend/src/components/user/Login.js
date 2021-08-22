import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../general/Button';

const LoginArea = styled.div`
    width: calc(100% - 46px);
    max-width: 500px;
    margin: 40px auto 0 auto;
    border: solid 5px ${props => props.theme.main};
    border-radius: 16px;
    box-shadow: 0 8px 8px rgba(0,0,0,0.1);
    min-height: 200px;
    overflow: hidden;
`;

const LoginLabel = styled.h1`
    background-color: ${props => props.theme.main};
    color: ${props => props.theme.mainoverlay};
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



export default function Login() {
    const [register, setRegister] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [warning, setWarning] = useState("");

    if (register) {
        const createAccount = (e, data) => {
            e.preventDefault();
            if (data.password === data.passwordConfirm) {
                console.log(data);
            }
            else {
                setWarning("Password confirmation did not match!");
            }
        }

        return(
            <LoginArea>
                <LoginLabel>Sign Up</LoginLabel>
                {warning != "" ? <WarningLabel>{warning}</WarningLabel> : null}
                <LoginForm>
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <FormInput type="username" id="username" value={username} onChange={event => setUsername(event.target.value)} />
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <FormInput type="password" id="password" value={password} onChange={event => setPassword(event.target.value)} />
                    <FormLabel htmlFor="password_confirm">Confirm Password</FormLabel>
                    <FormInput type="password" id="password_confirm" value={passwordConfirm} onChange={event => setPasswordConfirm(event.target.value)} />
                    <Button type="submit" onClick={e => createAccount(e, {username,password,passwordConfirm})}>Create Account</Button>
                </LoginForm>
                <TypeSwitch>
                    <TypeSwitchComment>Already have an account?</TypeSwitchComment>
                    <Button onClick={()=>setRegister(!register)}>Log In Here!</Button>
                </TypeSwitch>
            </LoginArea>
        );
    }
    else {
        const logIn = (e, data) => {
            e.preventDefault();
            console.log(data);
        }

        return(
            <LoginArea>
                <LoginLabel>Log In</LoginLabel>
                {warning != "" ? <WarningLabel>{warning}</WarningLabel> : null}
                <LoginForm>
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <FormInput type="username" id="username" value={username} onChange={event => setUsername(event.target.value)} />
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <FormInput type="password" id="password" value={password} onChange={event => setPassword(event.target.value)} />
                    <Button type="submit" onClick={e => logIn(e, {username,password})}>Log In</Button>
                </LoginForm>
                <TypeSwitch>
                    <TypeSwitchComment>Need an account?</TypeSwitchComment>
                    <Button onClick={()=>setRegister(!register)}>Sign Up Here!</Button>
                </TypeSwitch>
            </LoginArea>
        );
    }
}