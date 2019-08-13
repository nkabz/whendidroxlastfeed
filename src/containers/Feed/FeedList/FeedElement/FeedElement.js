import React from 'react';
import './FeedElement.scss';

const FeedElement = (props) => {
    return (
    <div className="feedList--child">
        <h2>
            <strong>{props.deaths}</strong> deaths.
        </h2>
        <p>
            Also had {props.kills} kills.
        </p>
        <p>
            Net Value: {props.ratio}
        </p>
    </div>
    )
};

export default FeedElement;