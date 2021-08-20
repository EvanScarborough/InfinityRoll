import React, { useState } from 'react';
import styled from 'styled-components';


const items = [
    { name: "Home", link: "/" },
    { name: "Generators", link: "/generator" },
    { name: "Dice", link: "/dice" },
    { name: "User", link: "/user" },
];


const NavArea = styled.div`
    width: 100%;
    height: 56px;
    display: flex;
    justify-content: space-between;
`;

const LinkList = styled.div`
    display: flex;
    margin: 4px 8px;
    @media(max-width: 800px) {
        display: none;
    }
`;

const LinkItem = styled.a`
    padding: 8px 16px;
    margin: 4px;
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
    @media(min-width: 800px) {
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

const HamburgerLinkList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    position: absolute;
    right: 8px;
    top: 60px;
    @media(min-width: 800px) {
        display: none;
    }
`;

export default function Navbar() {
    const [ expanded, setExpanded ] = useState(false);

    return(
        <NavArea>
            <h1>Title</h1>
            <LinkList>
                {items.map((item, i) => <LinkItem key={i} href={item.link}>{item.name}</LinkItem>)}
            </LinkList>
            <HamburgerButton onClick={() => setExpanded(!expanded)}><Hbar/><Hbar/><Hbar/></HamburgerButton>
            { expanded ?
                <HamburgerLinkList>
                    {items.map((item, i) => <LinkItem key={i} href={item.link}>{item.name}</LinkItem>)}
                </HamburgerLinkList> : null}
        </NavArea>
    );
}