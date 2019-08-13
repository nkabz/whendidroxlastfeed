import React from 'react';
import FeedElement from './FeedElement/FeedElement';

import './FeedList.scss';

const FeedList = (props) => (
    <div className="feedList--wrapper">
        {props.listOfMatches.map((match) =>(
            <FeedElement 
                hero={match.heroName}
                kills={match.kills}
                deaths={match.deaths}
            />    
        ))}
    </div>
);

export default FeedList;