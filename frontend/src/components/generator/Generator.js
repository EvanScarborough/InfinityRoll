import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../general/Button';
import { useParams } from "react-router-dom";


const MainArea = styled.div`
    width: calc(100% - 64px);
    max-width: 800px;
    margin: auto;
    margin-top: 32px;
    border: solid 5px ${props => props.theme.main};
    border-radius: 16px;
    display: flex;
    flex-direction: column;
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
`;
const FadedListNumber = styled.p`
    grid-area: number;
    font-size: 1.5em;
    align-self: center;
    justify-self: end;
    margin-right: 16px;
    font-weight: bold;
    color: ${props => props.theme.main};
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

function ListItem({ num, item, user }) {
    return (
        <ListItemArea>
            <ListNumber>{num}</ListNumber>
            <ListText>{item}</ListText>
            <ListUser>By {user.username}</ListUser>
        </ListItemArea>
    );
}

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

function AddListItem({ num, submit }) {
    const [item, setItem] = useState("");

    return (
        <ListItemArea>
            <FadedListNumber>{num}</FadedListNumber>
            <AddItemForm>
                <AddItemInput type="text" id="item" value={item} onChange={event => setItem(event.target.value)}></AddItemInput>
                <Button onClick={e => {e.preventDefault(); setItem(""); submit(item);}}>Submit</Button>
            </AddItemForm>
            <ListUser>Add A New Item</ListUser>
        </ListItemArea>
    );
}




function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function shuffle(array) {
    var currentIndex = array.length,  randomIndex;
    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
}


export default function Generator({ user }) {
    let { genName } = useParams();

    const [viewList, setViewList] = useState(false);
    const [gen, setGen] = useState(null);
    const [emojis, setEmojis] = useState([]);

    useEffect(() => {
        if (gen) return;
        fetch(`/api/gen/${genName}`, { method: 'GET', headers: { Accept: "application/json" } })
            .then(res => res.json()).then(res => {
                setGen({ info:res.list, items:res.items });
            });
    });

    if (!gen || !gen.items || !gen.info) return <Loading>Loading...</Loading>
    
    if (emojis.length === 0) {
        var codes = gen.info.tags.map(t => t.split('-').map(p => parseInt(p, 16)));
        while (codes.length > 5) {
            const indexToRemove = getRandomInt(codes.length);
            codes = codes.filter((_, i) => i !== indexToRemove);
        }
        setEmojis(shuffle(codes));
    }


    const addItem = item => {
        console.log(item);
        fetch(`/api/gen/${genName}/item`,{
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: "application/json", token: user.token },
                body:JSON.stringify({item})
            })
            .then(res => res.json()).then(res => {
                console.log(res);
                res.item.createdBy = user;
                setGen({ info:gen.info, items:[...gen.items,res.item]});
            });
    };

    return (
        <MainArea>
            <GenName>{gen.info.name}</GenName>
            <GenTags>{emojis.map(e => String.fromCodePoint(...e))}</GenTags>
            <GenUser>By {gen.info.createdBy.username}</GenUser>
            <Description>{gen.info.description}</Description>
            <Button style={{alignSelf:"center",padding:"16px 48px"}}>Generate</Button>
            <GenArea>
                <GenResult>Billy</GenResult>
                <GenResult>Billy</GenResult>
                <GenResult>Billy</GenResult>
                <GenResult>Billy</GenResult>
            </GenArea>
            <Button style={{alignSelf:"center",padding:"8px 32px"}} onClick={()=>setViewList(!viewList)}>View List Items</Button>
            { viewList ?
                <ItemList>
                    {gen.items.map((item, i) => <ListItem key={i} num={i+1} item={item.text} user={item.createdBy} />)}
                    <AddListItem num={gen.items.length + 1} submit={addItem}/>
                </ItemList> :
                <Description>{gen.items.length} Items</Description>
            }
        </MainArea>
    );
}