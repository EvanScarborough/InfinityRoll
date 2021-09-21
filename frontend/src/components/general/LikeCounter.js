import React from 'react';
import styled from 'styled-components';
import formatNumber from '../../utils/formatNumber';
import Button from './Button';

const LikeCounterContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: baseline;
    background-color: ${props => props.theme.main_wash};
    padding: 4px;
    border-radius: 4px;
    margin: 0 8px;
`;
const LikeCounterText = styled.p`
    color: ${props => props.theme.background_text};
    margin: 0 16px;
`;

export default function LikeCounter({ simplified, likeCount, youLiked, allowLike, toggleLike }) {
    if (simplified) {
        return (
            <LikeCounterContainer style={{display:"inline-block"}}>
                <LikeCounterText>
                    👍{formatNumber(likeCount)}
                </LikeCounterText>
            </LikeCounterContainer>
        );
    }

    let message = "";
    if (youLiked) {
        if (likeCount === 1) message = "You like this"
        else message = `You and ${formatNumber(likeCount - 1)} others like this`
    }
    else {
        if (likeCount === 0) message = "No likes yet!"
        else message = `${formatNumber(likeCount)} like this`
    }
    return (
        <LikeCounterContainer>
            <LikeCounterText>
                {message}
            </LikeCounterText>
            {allowLike ?
                <Button onClick={toggleLike}>
                    {youLiked ? "👎 Unlike" : "👍 Like"}
                </Button> :
                null
            }
        </LikeCounterContainer>
    );
}