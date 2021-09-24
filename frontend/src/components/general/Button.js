import styled from 'styled-components';
import { Link } from "react-router-dom";

/**
 * A stylized button that pops up when you hover it
 */
const Button = styled.button`
    border: none;
    font-size: 1.2em;
    color: ${props => props.theme.main_overlay};
    padding: ${props => props.large ? "16px 48px" : "8px"};
    background-color: ${props => props.theme.main};
    border-radius: 4px;
    cursor: pointer;
    border-bottom: solid 3px rgba(0,0,0,0.2);
    transform: translateY(0);
    box-shadow: 0 0 0 rgba(0,0,0,0.3);
    transition: background-color .2s, transform .2s, box-shadow .2s;
    &:hover {
        background-color: ${props => props.theme.highlight};
        transform: translateY(-4px);
        box-shadow: 0 4px 4px rgba(0,0,0,0.3);
    }
    &:active {
        background-color: ${props => props.theme.highlight_dark};
        transform: translateY(1px);
        box-shadow: 0 0 2px rgba(0,0,0,0.3);
        transition: background-color .05s, transform .05s, box-shadow .05s;
    }
`;

/**
 * A link that looks like a button. Useful for internal navigation
 */
const LinkButton = styled(Link)`
    display: inline-block;
    border: none;
    font-size: 1.2em;
    color: ${props => props.theme.main_overlay};
    padding: ${props => props.large ? "16px 48px" : "8px"};
    text-align: center;
    text-decoration: none;
    background-color: ${props => props.theme.main};
    border-radius: 4px;
    cursor: pointer;
    border-bottom: solid 3px rgba(0,0,0,0.2);
    transform: translateY(0);
    box-shadow: 0 0 0 rgba(0,0,0,0.3);
    transition: background-color .2s, transform .2s, box-shadow .2s;
    &:hover {
        background-color: ${props => props.theme.highlight};
        transform: translateY(-4px);
        box-shadow: 0 4px 4px rgba(0,0,0,0.3);
    }
    &:active {
        background-color: ${props => props.theme.highlight_dark};
        transform: translateY(1px);
        box-shadow: 0 0 2px rgba(0,0,0,0.3);
        transition: background-color .05s, transform .05s, box-shadow .05s;
    }
`;

export default Button;
export { LinkButton };