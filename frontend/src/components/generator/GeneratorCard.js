import React from 'react';
import styled from 'styled-components';
import { LinkButton } from '../general/Button';
import useEmojis from '../../hooks/useEmojis';
import LikeCounter from '../general/LikeCounter';

const CardArea = styled.div`
    display: inline-block;
    margin: 8px;
    width: calc(33% - 20px);
    border-radius: 8px;
    border: solid 3px ${props => props.theme.main};
    box-shadow: 0 4px 4px rgba(0,0,0,0.2);
    background-color: ${props => props.theme.background};
    @media(max-width:800px) {
        width: calc(50% - 22px);
    }
    @media(max-width:600px) {
        width: 100%;
    }
`;

const CardTitle = styled.h2`
    background-color: ${props => props.theme.main};
    color: ${props => props.theme.main_overlay};
    text-align: center;
    padding: 4px 0;
`;

const Tags = styled.p`
    font-size: 2em;
    text-align: center;
`;

const AuthorCridit = styled.h3`
    color: ${props => props.theme.background_text};
    padding: 4px 8px;
`;

const Description = styled.p`
    color: ${props => props.theme.background_text};
    padding: 4px 8px;
`;

/**
 * Displays a little card with information about a generator
 * @param {*} props.gen - the generator 
 * @returns a component
 */
export default function GeneratorCard({ gen }) {
    const emojis = useEmojis(gen, 3);
    return (
        <CardArea>
            <CardTitle>{gen.name}</CardTitle>
            <Tags>{emojis}</Tags>
            <AuthorCridit>by {gen.createdBy.username}</AuthorCridit>
            <LikeCounter simplified likeCount={gen.upvotes.length}/>
            <Description>{gen.description}</Description>
            <LinkButton to={`/generator/${gen.unique_name}`} style={{display:"block", margin:"8px"}}>Generate</LinkButton>
        </CardArea>
    );
}