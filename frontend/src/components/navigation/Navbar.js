import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";

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

const NavLink = styled(Link)`
    padding: 8px 16px;
    display: block;
    text-decoration: none;
    text-align: right;
    font-size: 1.2em;
    color: ${props => props.theme.mainoverlay};
    background-color: ${props => props.theme.main};
    border-radius: 4px;
    border-bottom: solid 3px rgba(0,0,0,0.2);
    transform: translateY(0);
    box-shadow: 0 0 0 rgba(0,0,0,0.3);
    transition: background-color .2s, transform .2s, box-shadow .2s;
    &:hover {
        background-color: ${props => props.theme.highlight};
        transform: translateY(-4px);
        box-shadow: 0 4px 4px rgba(0,0,0,0.3);
    }
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

const Hbar = styled.div`
    background-color: ${props => props.theme.mainoverlay};
    margin: 6px 8px;
    width: 30px;
    height: 3px;
`;

const HamburgerNavList = styled.ul`
    position: absolute;
    right: 4px;
    top: 40px;
    list-style-type: none;
    @media(min-width: 801px) {
        display: none;
    }
`;

const HamburgerNavItem = styled.li`
    margin: 4px;
`;

export default function Navbar({user}) {
    const [ expanded, setExpanded ] = useState(false);

    var items = [
        <NavLink to="/">Home</NavLink>,
        <NavLink to="/generator">Generators</NavLink>,
        <NavLink to="/dice">Dice</NavLink>
    ];

    if (!user) {
        items.push(<NavLink to="/login">Log In</NavLink>);
    }
    else {
        items.push(<NavLink to="/user">{user.username}</NavLink>);
    }

    return(
        <NavArea>
            <h1>Title</h1>
            <LinkList>
                {items.map((item, i) => <NavItem key={i}>{item}</NavItem>)}
            </LinkList>
            <HamburgerButton onClick={() => setExpanded(!expanded)}><Hbar/><Hbar/><Hbar/></HamburgerButton>
            { expanded ?
                <HamburgerNavList>
                    {items.map((item, i) => <HamburgerNavItem key={i}>{item}</HamburgerNavItem>)}
                </HamburgerNavList> : null}
        </NavArea>
    );
}