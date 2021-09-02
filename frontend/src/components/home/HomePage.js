import React from 'react';
import styled from 'styled-components';

const MainArea = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const Title = styled.h1`
    font-size: 3em;
    margin: 128px;
    text-align: center;
`;

export default function HomePage() {
    return (
        <MainArea>
            <Title>Hello, Welcome</Title>
        </MainArea>
    );
}