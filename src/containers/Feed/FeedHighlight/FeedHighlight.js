import React from 'react';

import './FeedHighlight.scss';

const FeedHighlight = (props) => (
    <div className="highLight">
        <h3 className="highLight__title">
            The feed this time was with: 
        </h3>
        <h2 className="highLight__heroName">
            {props.matchToHighlight.heroName}
            {}
        </h2>
        <div className="highLight__imgContainer">
            <img src={props.matchToHighlight.heroImgUrl} alt={props.matchToHighlight.heroName} />
        </div>
        <h1 className="highLight__deaths">
            Rox had <strong className="highLight__deaths--color">{props.matchToHighlight.deaths}</strong> deaths
        </h1>
        <p className="highLight__kills">
            Rox also had: <strong> {props.matchToHighlight.kills} </strong> kills.
        </p>
        
    </div>
);

export default FeedHighlight;