import React, { useState } from 'react';
import styled from 'styled-components';
import Button from './Button';

const SearchForm = styled.form`
    display: flex;
    width: 50%;
    @media(max-width:600px){
        width: calc(100% - 16px);
    }
    margin: 16px;
`;
const SearchInput = styled.input`
    flex-grow: 1;
    border: solid 3px ${props => props.theme.main};
    border-radius: 80px;
    font-size: 1.2em;
    padding: 8px;
    margin-right: 8px;
    outline: none;
    &:focus{
        border-color: ${props => props.theme.highlight};
    }
`;

/**
 * A simple text input and button for searching content
 * @param {object} props
 * @param {function(event,searchTerm)} props.search - function to be called when user submits the form
 * @returns a component
 */
export default function SearchBox({ search }) {
    const [searchTerm, setSearchTerm] = useState("");
    return (
        <SearchForm>
            <SearchInput type="search" value={searchTerm} onChange={event => setSearchTerm(event.target.value)} placeholder="🔎" />
            <Button type="submit" onClick={e => search(e, searchTerm)} style={{borderRadius:"80px", padding:"0 16px"}}>Search</Button>
        </SearchForm>
    );
}