import React from 'react';

import './FeedHighlight.scss';

const FeedHighlight = (props) => (
    <div className="highLight">
        <h3 className="highLight--title">
            The feed this time was with:
        </h3>
        <h2 className="highLight--heroName">
            {props.matchToHighlight.heroName}
        </h2>
        <h1 className="highLight--deaths">
            Rox had <strong>{props.matchToHighlight.deaths}</strong> deaths
        </h1>
        <p className="highLight--kills">
            Rox also had: <strong> {props.matchToHighlight.kills} </strong> kills.
        </p>
        
    </div>
);

export default FeedHighlight;