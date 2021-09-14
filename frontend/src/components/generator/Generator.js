import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '../general/Button';
import { useParams } from "react-router-dom";
import useGenerator from '../../hooks/Generator';
import useEmojis from '../../hooks/Emoji';

const MainArea = styled.div`
    width: calc(100% - 64px);
    max-width: 800px;
    margin: auto;
    margin-top: 32px;
    margin-bottom: 64px;
    border: solid 5px ${props => props.theme.main};
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 8px 8px rgba(0,0,0,0.1);
`;

const Loading = styled.h2``;

const GenName = styled.h1`
    background-color: ${props => props.theme.main};
    color: ${props => props.theme.main_overlay};
    text-align: center;
    padding: 8px;
`;
const GenUser = styled.h2`
    text-align: center;
    padding: 8px;
`;
const GenTags = styled.h2`
    text-align: center;
    font-size: 2em;
`;
const Description = styled.p`
    font-size: 1.2em;
    padding: 8px;
    text-align: center;
`;

const GenArea = styled.div`
    background-color: ${props => props.theme.main_dark};
    border-radius: 8px;
    overflow: auto;
    height: 400px;
    margin: 20px 16px 16px 16px;
`;
const GenResult = styled.p`
    color: ${props => props.theme.main};
    padding: 16px;
    font-size: 1.2em;
    &:not(:last-child){
        border-bottom: solid 1px ${props => props.theme.main};
    }
    &:first-child{
        color: ${props => props.theme.main_dark_overlay};
    }
`;


const ItemList = styled.div`
    margin: 16px 0;
`;
const ListItemArea = styled.div`
    display: grid;
    grid-template-columns: 60px auto;
    grid-template-rows: auto auto;
    grid-template-areas: "number text" "number user";
    &:nth-child(odd){
        background-color: ${props => props.theme.main_wash};
    }
`;
const ListNumber = styled.p`
    grid-area: number;
    font-size: 1.5em;
    align-self: center;
    justify-self: end;
    margin-right: 16px;
    font-weight: bold;
    color: ${props => props.faded ? props.theme.main : props.theme.background_text};
`;
const ListText = styled.p`
    grid-area: text;
    font-size: 1.2em;
    padding: 8px 0 0 0;
`;
const ListUser = styled.p`
    grid-area: user;
    color: ${props => props.theme.main};
    padding: 4px 0 6px 0;
`;

const AddItemForm = styled.form`
    display: flex;
    margin: 8px 8px 0 0;
`;
const AddItemInput = styled.input`
    font-size: 1.2em;
    flex-grow: 1;
    border: solid 3px ${props => props.theme.main};
    border-radius: 4px;
    padding: 8px;
    margin-right: 8px;
    &:focus {
        border: solid 3px ${props => props.theme.highlight};
        outline: none;
    }
`;


function ListItem({ num, item, user }) {
    return (
        <ListItemArea>
            <ListNumber>{num}</ListNumber>
            <ListText>{item}</ListText>
            <ListUser>By {user.username}</ListUser>
        </ListItemArea>
    );
}

function AddListItem({ num, submit }) {
    const [item, setItem] = useState("");

    return (
        <ListItemArea>
            <ListNumber faded>{num}</ListNumber>
            <AddItemForm>
                <AddItemInput type="text" id="item" value={item} onChange={event => setItem(event.target.value)}></AddItemInput>
                <Button onClick={e => {e.preventDefault(); submit(item); setItem("");}}>Submit</Button>
            </AddItemForm>
            <ListUser>Add A New Item</ListUser>
        </ListItemArea>
    );
}

export default function Generator({ user }) {
    let { genName } = useParams();

    const [viewList, setViewList] = useState(false);
    const [gen, results, generate, addItem] = useGenerator(genName, user);
    const emojis = useEmojis(gen?.info, 3);
    
    if (!gen || !gen.items || !gen.info) return <Loading>Loading...</Loading>

    return (
        <MainArea>
            <GenName>{gen.info.name}</GenName>
            <GenTags>{emojis}</GenTags>
            <GenUser>By {gen.info.createdBy.username}</GenUser>
            <Description>{gen.info.description}</Description>
            <Button style={{alignSelf:"center",padding:"16px 48px"}} onClick={() => generate()}>Generate</Button>
            <GenArea>
                {results.map((r,i) => <GenResult key={i}>{r}</GenResult>)}
            </GenArea>
            <Button style={{alignSelf:"center",padding:"8px 32px"}} onClick={()=>setViewList(!viewList)}>View List Items</Button>
            { viewList ?
                <ItemList>
                    {gen.items.map((item, i) => <ListItem key={i} num={i+1} item={item.text} user={item.createdBy} />)}
                    {user && user.token ?
                        <AddListItem num={gen.items.length + 1} submit={addItem}/> :
                        <Description>Want to expand this list? <Link to="/login">You'll need an account!</Link></Description>}
                </ItemList> :
                <Description>{gen.items.length} Items</Description>
            }
        </MainArea>
    );
}