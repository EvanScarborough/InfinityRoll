import styled from 'styled-components';

/**
 * A styled form
 */
const Form = styled.form`
    padding: 20px;
    display: flex;
    flex-direction: column;
`;

const FormLabel = styled.label`
    color: ${props => props.theme.background_text};
    font-size: 1.2em;
`;

const FormInput = styled.input`
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.background_text};
    font-size: 1.2em;
    border: solid 3px ${props => props.theme.main};
    border-radius: 4px;
    margin-bottom: 24px;
    padding: 8px;
    &:focus {
        border: solid 3px ${props => props.theme.highlight};
        outline: none;
    }
`;

const FormTextArea = styled.textarea`
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.background_text};
    font-size: 1.2em;
    border: solid 3px ${props => props.theme.main};
    border-radius: 4px;
    margin-bottom: 24px;
    padding: 8px;
    resize: none;
    font-family: inherit;
    &:focus {
        border: solid 3px ${props => props.theme.highlight};
        outline: none;
    }
`;

const FormMessage = styled.p`
    background-color: ${props => props.warning ? "#faa" : props.theme.background};
    color: ${props => props.warning ? "#a00" : props.theme.background_text};
    font-weight: bold;
    text-align: center;
    border-radius: 4px;
    margin: 8px;
    padding: 8px;
`;

export default Form;
export { FormLabel, FormInput, FormTextArea, FormMessage };