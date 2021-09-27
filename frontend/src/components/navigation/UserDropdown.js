import React, { useState } from 'react'
import styled from 'styled-components'
import Button, { LinkButton } from '../general/Button'

const NavContainer = styled.div`

`;
const DropDownArea = styled.div`
    background-color: ${props => props.theme.main_wash};
    border-radius: 8px;
    position: absolute;
    padding: 8px;
    right: 130px;
    top: 56px;
    list-style-type: none;
    z-index: 1000;
    display: flex;
    flex-direction: column;
`;

/**
 * The nav menu user option. When you click the button, a menu will show allowing you to log out or view profile
 * @param {object} props.user - the logged in user
 * @param {function} props.logout - a function to log out
 * @returns a component
 */
export default function UserDropdown({ user, logout }) {
    const [expanded, setExpanded] = useState(false);

    return user ?
        <NavContainer>
            <Button onClick={() => setExpanded(!expanded)}>{user.username}</Button>
            {
                expanded ?
                <DropDownArea>
                    <LinkButton to={`/user/${user.username}`}>View Profile</LinkButton>
                    <Button onClick={logout} style={{marginTop:"8px"}}>Log Out</Button>
                </DropDownArea> :
                null
            }
        </NavContainer> :
        <LinkButton to="/login">Log In</LinkButton>
}