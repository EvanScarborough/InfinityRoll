import React from "react";
import styled from "styled-components";

const FooterArea = styled.div`
    width: 100%;
    min-height: 240px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.main_wash};
`;
const FooterComment = styled.p`
    color: ${props => props.theme.main};
`;

/**
 * The footer to display on every page
 * @returns a component
 */
export default function Footer() {
    return (
        <FooterArea>
            <FooterComment>© 2021 Evan Scarborough</FooterComment>
        </FooterArea>
    );
}