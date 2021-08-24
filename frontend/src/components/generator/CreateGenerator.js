import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../general/Button';
import Picker from 'emoji-picker-react';

const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ModalArea = styled.div`
    width: calc(100% - 46px);
    background-color: ${props => props.theme.background};
    max-width: 500px;
    margin: 40px auto 16px auto;
    border: solid 5px ${props => props.theme.main};
    border-radius: 16px;
    box-shadow: 0 8px 8px rgba(0,0,0,0.1);
    max-height: calc(100vh - 140px);
    min-height: 200px;
    display: flex;
    flex-direction: column;
`;

const ModalLabel = styled.h1`
    background-color: ${props => props.theme.main};
    color: ${props => props.theme.main_overlay};
    text-align: center;
    padding: 8px;
`;

const CreateGenForm = styled.form`
    padding: 20px;
    display: flex;
    flex-direction: column;
    overflow: scroll;
`;

const FormLabel = styled.label`
    font-size: 1.2em;
`;

const FormInput = styled.input`
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

const WarningLabel = styled.p`
    background-color: #faa;
    color: #a00;
    font-weight: bold;
    border-radius: 4px;
    margin: 8px;
    padding: 8px;
`;

export default function CreateGenerator({user, cancel}) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState([]);
    const [warning, setWarning] = useState(null);

    const onEmojiClick = (event, emoji) => {
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

    return(
        <ModalBackground>
            <ModalArea>
                <ModalLabel>Create Generator</ModalLabel>
                {warning && <WarningLabel>{warning}</WarningLabel>}
                <CreateGenForm>
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <FormInput id="name" value={name} onChange={event => setName(event.target.value)}></FormInput>
                    <FormLabel htmlFor="description">Description</FormLabel>
                    <FormInput id="description" value={description} onChange={event => setDescription(event.target.value)}></FormInput>
                    <FormLabel htmlFor="tags">Symbols</FormLabel>
                    <FormInput id="tags" value={tags.map((e,i) => e.emoji)} disabled></FormInput>
                    <Picker native onEmojiClick={onEmojiClick} pickerStyle={{minHeight:"300px", width:"100%", alignSelf:"center", marginBottom:"16px"}}/>
                    <Button onClick={e => createGenerator(e)}>Create</Button>
                </CreateGenForm>
            </ModalArea>
            <Button onClick={()=>cancel()}>Cancel</Button>
        </ModalBackground>
    );
}