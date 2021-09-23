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

/**
 * Render a small box with the number of likes.
 * The like count will be displayed in a simplified format like "1.2k"
 * If allowLike==true, there will be a button to like it
 * @param {boolean} props.simplified - Simplifies the display to just be like "👍45"
 * @param {number} props.likeCount - The number of likes
 * @param {boolean} props.youLiked - Whether or not the logged in user liked it
 * @param {boolean} props.allowLike - Include the button to like it
 * @param {function} props.toggleLike - Function called when you click the like button
 * @returns a component
 */
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