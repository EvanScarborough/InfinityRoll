import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Button, {LinkButton} from '../general/Button';
import SearchBox from '../general/SearchBox';
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


function GeneratorGroup({ title, items }) {
    return (
        <GroupArea>
            <GroupTitle>{title}</GroupTitle>
            <GroupList>
                {items.map(gen=>
                    <GeneratorCard
                        key={gen.unique_name}
                        gen={gen}
                    />
                )}
            </GroupList>
        </GroupArea>
    );
}



export default function GeneratorList({ user }) {
    const [generators, setGenerators] = useState([]);

    useEffect(() => {
        if (generators.length !== 0) return;
        fetch("api/gen",{ method: 'GET', headers: { Accept: "application/json", token: user?.token }})
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
            <SearchBox search={search}/>
            <LinkButton to="newgenerator">Create New Generator</LinkButton>
            {generators.map((g,i)=><GeneratorGroup key={g.title} title={g.title} items={g.lists}/>)}
        </MainArea>
    );
}