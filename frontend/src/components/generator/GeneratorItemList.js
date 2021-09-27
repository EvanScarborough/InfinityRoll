import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../general/Button';
import styled from 'styled-components';

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
    color: ${props => props.theme.background_text};
    grid-area: text;
    font-size: 1.2em;
    padding: 8px 0 0 0;
`;
const ListItemOptionsArea = styled.div`
    display: flex;
    flex-direction: row;
    align-items: baseline;
    margin-bottom: 8px;
`;
const ListUser = styled.p`
    grid-area: user;
    color: ${props => props.theme.main};
    padding: 4px 0 6px 0;
    margin-right: 8px;
`;
const AddItemForm = styled.form`
    display: flex;
    margin: 8px 8px 0 0;
`;
const AddItemInput = styled.input`
    font-size: 1.2em;
    flex-grow: 1;
    border: solid 3px ${props => props.theme.main};
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.background_text};
    border-radius: 4px;
    padding: 8px;
    margin-right: 8px;
    &:focus {
        border: solid 3px ${props => props.theme.highlight};
        outline: none;
    }
`;

const ItemList = styled.div`
    margin: 16px 0;
`;

const Description = styled.p`
    color: ${props => props.theme.background_text};
    font-size: 1.2em;
    padding: 32px 8px;
    text-align: center;
`;
const StyledLink = styled(Link)`
    color: ${props => props.theme.highlight};
`;

function GeneratorListItem({ num, item, createdBy, user, removeItem }) {
    return (
        <ListItemArea>
            <ListNumber>{num}</ListNumber>
            <ListText>{item}</ListText>
            <ListItemOptionsArea>
                <ListUser>By <StyledLink to={`/user/${createdBy.username}`}>
                    {createdBy.username}
                </StyledLink></ListUser>
                {
                    user && user.id === createdBy._id ?
                    <Button style={{fontSize:"1em"}} onClick={removeItem}>Delete</Button> :
                    null
                }
            </ListItemOptionsArea>
        </ListItemArea>
    );
}

function AddGeneratorListItem({ num, submit }) {
    const [item, setItem] = useState("");
    return (
        <ListItemArea>
            <ListNumber faded>{num}</ListNumber>
            <AddItemForm>
                <AddItemInput type="text" id="item" value={item} onChange={event => setItem(event.target.value)}></AddItemInput>
                <Button onClick={e => {e.preventDefault(); submit(item); setItem("");}}>Submit</Button>
            </AddItemForm>
            <ListUser>Add a new item</ListUser>
        </ListItemArea>
    );
}

/**
 * Displays the list of items able to be selected by a generator
 * @param {array} props.items - the list of all the items
 * @param {object} props.user - the user to check if the add item form should be included
 * @param {function} props.addItem - a function to call when the add item form is submitted with the item as the argument
 * @returns a component
 */
export default function GeneratorItemList({ items, user, addItem, removeItem }) {
    return (
        <ItemList>
            {items.map((item, i) =>
                <GeneratorListItem key={i} num={i+1} item={item.text} createdBy={item.createdBy} user={user} removeItem={() => removeItem(item)} />
            )}
            {user && user.token ?
                <AddGeneratorListItem num={items.length + 1} submit={addItem}/> :
                <Description>Want to expand this list? <StyledLink to="/login">You'll need an account!</StyledLink></Description>}
        </ItemList>
    );
}