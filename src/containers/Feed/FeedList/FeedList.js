import React from 'react';
import FeedElement from './FeedElement/FeedElement';

import './FeedList.scss';

const FeedList = (props) => (
    <div className="feedList--wrapper">
        {props.listOfMatches.map((match) =>{
            const killDeathRatio = match.deaths - match.kills;
            return <FeedElement 
                hero={match.heroName}
                kills={match.kills}
                deaths={match.deaths}
                ratio={killDeathRatio}
            />    
        })}
    </div>
);

export default FeedList;