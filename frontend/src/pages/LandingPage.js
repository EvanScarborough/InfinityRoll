import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import ReactCardFlip from 'react-card-flip';

const MainArea = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const TitleArea = styled.div`
    width: 60%;
    height: 400px;
    margin: auto;
    margin-top: 32px;
    @media(max-width:800px){
        width: calc(100% - 16px);
        height: 500px;
    }
`;
const TitleCard = styled.div`
    background-color: ${props => props.theme.main_dark};
    color: ${props => props.theme.main_dark_overlay};
    border-radius: 16px;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Title = styled.h1`
    font-size: 3em;
    padding: 32px;
    text-align: center;
`;

const titleCardOuterStyle = {
    width: "100%",
    height: "100%"
}

const MainContentArea = styled.div`
    margin: auto;
    margin-top: 32px;
    margin-bottom: 64px;
    width: calc(100% - 48px);
    max-width: 800px;
`;
const SectionHeader = styled.h1`
    color: ${props => props.theme.main};
    font-size: 3em;
    margin: 48px 0 16px 0;
`;
const Paragraph = styled.p`
    font-size: 1.3em;
    margin: 8px 0;
`;




function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export default function LandingPage() {
    const [messageState, setMessageState] = useState({flipped:false,message:[
        "Hello, welcome to InfinityRoll, the crowd-sourced random generator!",
        "Goodbye"
    ]});

    const options = [
        [
            "Hello",
            "Greetings",
            "Good morning",
            "Good afternoon",
            "Good evening",
            "Good day",
            "Hi there",
            "Howdy",
            "Hey",
            "Hi",
            "Yo",
            "Hola",
            "Aloha",
            "Salutations",
            "It's nice to meet you",
            "What's up",
            "'Sup"
        ],
        [
            " and welcome to InfinityRoll",
            ", welcome to InfinityRoll",
            ", this is InfinityRoll",
            ", you've reached InfinityRoll",
            " my name is InfinityRoll",
            ""
        ],
        [
            ". It's a website.",
            ", the crowd-sourced random generator.",
            ". How was the trip?",
            ", the most random place on Earth.",
            ". I'm glad you're here!",
            ". How are you?",
            ". Make yourself at home!",
            ". Would you like some tea?",
            ". This is a website talking.",
            "!!!",
            "?",
            ". For all your random generation needs.",
            ". It's good to be random.",
            ". I hope you enjoy your visit.",
            "! You made it!",
            "! I've heard so much about you!",
            "! Wow, you've grown so much!",
            ". It's been so long!",
            ". It's a pleasure to meet you!",
            ". What brings you in today?",
            ". How are things?"
        ]
    ];

    const generateGreeting = () => {
        return options.map(o => o[getRandomInt(o.length)]).join('');
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setMessageState(s => {
                if (s.flipped) return {flipped:false,message:[generateGreeting(),s.message[1]]};
                return {flipped:true, message:[s.message[0],generateGreeting()]}
            });
        }, 4200);
        return () => clearInterval(interval);
      }, []);

    return (
        <MainArea>
            <TitleArea>
                <ReactCardFlip isFlipped={messageState.flipped} infinite={true} flipDirection="vertical" cardZIndex="-1000" containerStyle={titleCardOuterStyle}>
                    <TitleCard><Title>{messageState.message[0]}</Title></TitleCard>
                    <TitleCard><Title>{messageState.message[1]}</Title></TitleCard>
                </ReactCardFlip>
            </TitleArea>
            <MainContentArea>
                <SectionHeader>Random Generators</SectionHeader>
                <Paragraph>
                    InfinityRoll is a crowd-sourced random generator.
                    Sometimes you just need a little randomness to inspire creativity.
                    Random generators are useful for role-playing games, creative writing prompts,
                    deciding what to have for lunch, or for just getting the creative juices flowing.
                </Paragraph>
                <SectionHeader>Crowd-Sourced</SectionHeader>
                <Paragraph>
                    People from all over the world can create random generators or contribute to
                    existing generators. The more people adding to generators, the more random
                    everything becomes!
                </Paragraph>
                <SectionHeader>How Do I Get Started?</SectionHeader>
                <Paragraph>
                    You don't need an account to use the generators! <Link to="/generator">Click here</Link> to see a list of
                    generators that other users have created, and click the "Generate" button on
                    one that sounds good!
                </Paragraph>
                <Paragraph>
                    When you're ready to start creating generators, you'll need <Link to="/login">an account</Link>.
                    Don't worry, we don't even ask for an email!
                </Paragraph>
            </MainContentArea>
        </MainArea>
    );
}