import React from 'react';
import './FeedElement.scss';
const FeedElement = (props) => {
    return (
    <h2 className="feedList--child">
        <strong>{props.deaths}</strong> deaths.
    </h2>
    
    )
};

export default FeedElement;