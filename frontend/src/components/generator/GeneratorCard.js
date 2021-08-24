import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { LinkButton } from '../general/Button';
import { Link } from "react-router-dom";

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
    padding: 4px 8px;
`;

const Description = styled.p`
    padding: 4px 8px;
`;

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function shuffle(array) {
    var currentIndex = array.length,  randomIndex;
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
}

export default function GeneratorCard({ id, name, creator, description, date, tags }) {
    var codes = tags.map(t => t.split('-').map(p => parseInt(p, 16)));
    var indexToRemove = 0;
    while (codes.length > 3) {
        indexToRemove = getRandomInt(codes.length);
        codes = codes.filter((_, i) => i !== indexToRemove);
    }

    const [emojis, setEmojis] = useState(shuffle(codes));

    return (
        <CardArea>
            <CardTitle>{name}</CardTitle>
            <Tags>{emojis.map(e => String.fromCodePoint(...e))}</Tags>
            <AuthorCridit>by {creator.username}</AuthorCridit>
            <Description>{description}</Description>
            <LinkButton to={"/generator/"+id} style={{display:"block", marginBottom:"8px"}}>Generate</LinkButton>
        </CardArea>
    );
}