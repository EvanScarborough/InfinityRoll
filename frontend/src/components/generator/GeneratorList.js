import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../general/Button';
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams } from "react-router-dom";

import CreateGenerator from './CreateGenerator';
import GeneratorCard from './GeneratorCard';

const MainArea = styled.div`
    width: 100%;
    margin: auto;
    margin-top: 64px;
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
                {items.map((gen,i)=>
                    <GeneratorCard
                        key={i}
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
    const [create, setCreate] = useState(false);
    const [generators, setGenerators] = useState([]);

    useEffect(() => {
        if (generators.length !== 0) return;
        fetch("api/gen",{ method: 'GET', headers: { Accept: "application/json" }})
            .then(res => res.json()).then(res => {
                console.log(res);
                setGenerators(res.lists);
            });
    });

    return(
        <MainArea>
            <Button onClick={()=>setCreate(true)}>Create New Generator</Button>
            <GeneratorGroup title="All" items={generators}/>

            {create && <CreateGenerator user={user} cancel={()=>setCreate(false)} />}
        </MainArea>
    );
}