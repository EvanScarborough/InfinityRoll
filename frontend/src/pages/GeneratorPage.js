import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Container from '../components/general/Container';
import Button from '../components/general/Button';
import { useParams } from "react-router-dom";
import useGenerator from '../hooks/Generator';
import useEmojis from '../hooks/Emoji';
import LikeCounter from '../components/general/LikeCounter';
import GeneratorItemList from '../components/generator/GeneratorItemList';
import GeneratorResultArea from '../components/generator/GeneratorResultArea';


const Loading = styled.h2``;

const DetailsArea = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const CreatedBy = styled.h2`
    text-align: center;
    padding: 8px;
`;
const GenTags = styled.h2`
    text-align: center;
    font-size: 2em;
`;
const Description = styled.p`
    font-size: 1.2em;
    padding: 32px 8px;
    text-align: center;
`;


export default function GeneratorPage({ user }) {
    let { genName } = useParams();

    const [gen, results, generate, addItem, toggleLike] = useGenerator(genName, user);
    const emojis = useEmojis(gen?.info, 3);

    useEffect(() => {
        if (gen && results && results.length === 0){
            generate();
        }
    });

    if (!gen || !gen.items || !gen.info) return <Loading>Loading...</Loading>
    return (
        <Container title={gen.info.name}>
            <DetailsArea>
                <GenTags>{emojis}</GenTags>
                <CreatedBy>By {gen.info.createdBy.username}</CreatedBy>
                <LikeCounter
                    likeCount={gen.info.upvotes.length}
                    youLiked={gen.info.upvotes.includes(user?.id)}
                    allowLike={user !== null}
                    toggleLike={toggleLike}/>
                <Description>{gen.info.description}</Description>
                <Button large onClick={() => generate()}>Generate</Button>
            </DetailsArea>
            <GeneratorResultArea results={results} />
            <GeneratorItemList items={gen.items} user={user} addItem={addItem} />
        </Container>
    );
}