import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button, {LinkButton} from '../general/Button';

import GeneratorCard from './GeneratorCard';

const MainArea = styled.div`
    width: 100%;
    margin: auto;
    margin-top: 16px;
    margin-bottom: 64px;
    min-height: 100vh;
    max-width: 1000px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const GroupArea = styled.div`
    margin: 32px 0;
    width: 100%;
`;
const GroupTitle = styled.h1`
    margin: 16px 8px;
    font-size: 3em;
    color: ${props => props.theme.main};
`;
const GroupList = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const SearchForm = styled.form`
    display: flex;
    width: 50%;
    @media(max-width:600px){
        width: calc(100% - 16px);
    }
    margin: 16px;
`;
const SearchBox = styled.input`
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


function GeneratorGroup({ title, items }) {
    return (
        <GroupArea>
            <GroupTitle>{title}</GroupTitle>
            <GroupList>
                {items.map((gen,i)=>
                    <GeneratorCard
                        key={gen.unique_name}
                        id={gen.unique_name}
                        name={gen.name}
                        description={gen.description}
                        creator={gen.createdBy}
                        date={gen.createdAt}
                        tags={gen.tags}
                    />
                )}
            </GroupList>
        </GroupArea>
    );
}



export default function GeneratorList({ user }) {
    const [generators, setGenerators] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if (generators.length !== 0) return;
        fetch("api/gen",{ method: 'GET', headers: { Accept: "application/json" }})
            .then(res => res.json()).then(res => {
                console.log(res);
                setGenerators(res.groups);
            });
    });

    const search = (event, term) => {
        event.preventDefault();
        fetch(`api/gen?search=${term}`,{ method: 'GET', headers: { Accept: "application/json" }})
            .then(res => res.json()).then(res => {
                console.log(res);
                setGenerators(res.groups);
            });
    }

    return(
        <MainArea>
            <SearchForm>
                <SearchBox type="search" value={searchTerm} onChange={event => setSearchTerm(event.target.value)} placeholder="🔎" />
                <Button type="submit" onClick={e => search(e, searchTerm)} style={{borderRadius:"80px", padding:"0 16px"}}>Search</Button>
            </SearchForm>
            <LinkButton to="newgenerator">Create New Generator</LinkButton>
            {generators.map((g,i)=><GeneratorGroup key={g.title} title={g.title} items={g.lists}/>)}
        </MainArea>
    );
}