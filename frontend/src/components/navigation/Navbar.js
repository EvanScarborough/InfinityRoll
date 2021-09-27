import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import SvgLogo from '../general/SvgLogo';
import Button, { LinkButton } from '../general/Button';
import UserDropdown from './UserDropdown';

const NavArea = styled.nav`
    width: 100%;
    height: 56px;
    display: flex;
    justify-content: space-between;
`;

const LinkList = styled.ul`
    margin: 4px 8px;
    list-style-type: none;
    @media(max-width: 800px) {
        display: none;
    }
`;

const NavItem = styled.li`
    margin: 4px;
    float: left;
`;

const HamburgerButton = styled.button`
    background: none;
    outline: none;
    border: none;
    height: 46px;
    width: 46px;
    background-color: ${props => props.theme.main};
    margin: 8px;
    border-radius: 4px;
    cursor: pointer;
    border-bottom: solid 3px rgba(0,0,0,0.2);
    transform: translateY(0);
    box-shadow: 0 0 0 rgba(0,0,0,0.3);
    transition: background-color .2s, transform .2s, box-shadow .2s;
    @media(min-width: 801px) {
        display: none;
    }
    &:hover {
        background-color: ${props => props.theme.highlight};
        transform: translateY(-4px);
        box-shadow: 0 4px 4px rgba(0,0,0,0.3);
    }
    &:active {
        background-color: ${props => props.theme.highlight_dark};
        transform: translateY(1px);
        box-shadow: 0 0 2px rgba(0,0,0,0.3);
    }
`;

const LogoBox = styled(Link)`
    display: flex;
    align-items: center;
    margin-left: 8px;
    text-decoration: none;
    color: ${props => props.theme.main};
    &:visited{text-decoration: none;}
    &:active{text-decoration: none;}
    &:hover{text-decoration: underline;}
`;
const LogoText = styled.h1`
    margin-left: 8px;
`;

const Hbar = styled.div`
    background-color: ${props => props.theme.main_overlay};
    margin: 6px 8px;
    width: 30px;
    height: 3px;
`;

const HamburgerNavList = styled.ul`
    background-color: ${props => props.theme.main_wash};
    border-radius: 8px;
    position: absolute;
    padding: 8px;
    right: 8px;
    top: 48px;
    list-style-type: none;
    z-index: 1000;
    @media(min-width: 801px) {
        display: none;
    }
`;

const HamburgerNavItem = styled.li`
    margin: 4px;
`;

/**
 * Renders the navbar at the top of every page. Includes the logo and navigation links
 * @param {object} props.user - the logged in user to display their name
 * @returns a component
 */
export default function Navbar({ user, logout, shuffleTheme }) {
    const [ expanded, setExpanded ] = useState(false);

    return(
        <NavArea>
            <LogoBox to="/">
                <SvgLogo style={{width:"2.4em"}}/>
                <LogoText>InfinityRoll</LogoText>
            </LogoBox>
            <LinkList>
                <NavItem><LinkButton to="/generator">Generators</LinkButton></NavItem>
                <NavItem><UserDropdown user={user} logout={logout} /></NavItem>
                <NavItem><Button onClick={shuffleTheme}>Shuffle Theme</Button></NavItem>
            </LinkList>
            <HamburgerButton onClick={() => setExpanded(!expanded)}><Hbar/><Hbar/><Hbar/></HamburgerButton>
            { 
                expanded ?
                <HamburgerNavList>
                    <HamburgerNavItem><LinkButton to="/generator">Generators</LinkButton></HamburgerNavItem>
                    {
                        user ?
                        <HamburgerNavItem><LinkButton to={`/user/${user.username}`}>{user.username}</LinkButton></HamburgerNavItem> : 
                        <HamburgerNavItem><LinkButton to="/login">Log In</LinkButton></HamburgerNavItem>
                    }
                    {user ? <HamburgerNavItem><Button onClick={logout}>Log Out</Button></HamburgerNavItem> : null}
                    <HamburgerNavItem><Button onClick={shuffleTheme}>Shuffle Theme</Button></HamburgerNavItem>
                </HamburgerNavList> :
                null
            }
        </NavArea>
    );
}