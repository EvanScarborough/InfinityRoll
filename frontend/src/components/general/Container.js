import React from 'react';
import styled from 'styled-components';

const ContainerArea = styled.div`
    width: calc(100% - 46px);
    max-width: ${props => props.width}px;
    margin: 40px auto 0 auto;
    margin-bottom: 64px;
    border: solid 5px ${props => props.theme.main};
    border-radius: 16px;
    box-shadow: 0 8px 8px rgba(0,0,0,0.1);
    min-height: 200px;
    overflow: hidden;
`;

const ContainerTitle = styled.h1`
    background-color: ${props => props.theme.main};
    color: ${props => props.theme.main_overlay};
    text-align: center;
    padding: 8px;
`;

export default function Container({ title, small, children }) {
    return (
        <ContainerArea width={small ? 500 : 800}>
            <ContainerTitle>{title}</ContainerTitle>
            {children}
        </ContainerArea>
    );
}