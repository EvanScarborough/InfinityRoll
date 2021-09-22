import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Container from '../components/general/Container';
import Button from '../components/general/Button';
import Form, { FormLabel, FormInput, FormTextArea, FormMessage } from '../components/general/Form';
import Picker from 'emoji-picker-react';
import { useHistory } from "react-router-dom";

const SymbolArea = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: auto;
    @media(max-width:600px){
        grid-template-columns: auto;
        grid-template-rows: auto auto;
    }
`;
const SymbolList = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    min-height: 4em;
`;
const SymbolButton = styled.button`
    font-size: 2em;
    height: 1.5em;
    width: 1.5em;
    padding: 4px;
    border: none;
    background-color: ${props => props.theme.background};
    border-radius: 4px;
    cursor: pointer;
    &:hover{
        background-color: ${props => props.theme.main_wash};
    }
`;

export default function CreateGeneratorPage({user}) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState([]);
    const [warning, setWarning] = useState(null);

    const history = useHistory();

    const onEmojiClick = (event, emoji) => {
        event.preventDefault();
        const index = tags.findIndex(t => t.unified === emoji.unified);
        if (index >= 0) { // remove from tags
            setTags(tags.filter((_, i) => i !== index));
        }
        else { // add to tags
            setTags([...tags, emoji]);
        }
    };

    const createGenerator = (e) => {
        e.preventDefault();
        fetch("api/gen/create",{
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: "application/json", token: user.token },
            body: JSON.stringify({name, description, tags: tags.map(t => t.unified)})
        }).then(res => res.json()).then(
            result => {
                console.log(result);
                if (result.hasOwnProperty("id")) {
                    history.push(`generator/${result.id}`);
                }
                else if (result.hasOwnProperty("message")) {
                    setWarning(result.message);
                }
            },
            error => {
                console.log(error);
                if (error.hasOwnProperty("message")) setWarning(error.message);
            });
    };

    if (!user || !user.token) {
        return(
            <Container title="Create Generator">
                <FormMessage>
                    You'll need an account before you can create a generator! <Link to="/login">Get one here!</Link><br/>
                    It's free and we don't even ask for an email!
                </FormMessage>
            </Container>
        );
    }

    return(
        <Container title="Create Generator">
            {warning && <FormMessage warning>{warning}</FormMessage>}
            <Form>
                <FormLabel htmlFor="name">Name</FormLabel>
                <FormInput id="name" value={name} onChange={event => setName(event.target.value)}></FormInput>
                <FormLabel htmlFor="description">Description</FormLabel>
                <FormTextArea id="description" value={description} onChange={event => setDescription(event.target.value)} rows="4"></FormTextArea>
                <FormLabel htmlFor="tags">Symbols</FormLabel>
                <SymbolArea>
                    <SymbolList>
                        {tags.map((e,i) => <SymbolButton onClick={event=>onEmojiClick(event,e)}>{e.emoji}</SymbolButton>)}
                    </SymbolList>
                    <Picker native onEmojiClick={onEmojiClick} pickerStyle={{minHeight:"300px", width:"100%", alignSelf:"center", marginBottom:"16px"}}/>
                </SymbolArea>
                <Button onClick={e => createGenerator(e)}>Create</Button>
            </Form>
        </Container>
    );
}