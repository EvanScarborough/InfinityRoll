import React from 'react';
import styled from 'styled-components';

const GenArea = styled.div`
    background-color: ${props => props.theme.main_dark};
    border-radius: 8px;
    overflow: auto;
    height: 400px;
    margin: 20px 16px 16px 16px;
`;
const GenResult = styled.p`
    color: ${props => props.theme.main_light};
    padding: 16px;
    font-size: 1.2em;
    &:not(:last-child){
        border-bottom: solid 1px ${props => props.theme.main};
    }
    &:first-child{
        color: ${props => props.theme.main_dark_overlay};
    }
`;

/**
 * Renders the area to show a list of generated results
 * @param {array} props.results - a list of all the results to display 
 * @returns a component
 */
export default function GeneratorResultArea({ results }) {
    return (
        <GenArea>
            {results.map((r,i) => <GenResult key={i}>{r}</GenResult>)}
        </GenArea>
    );
}