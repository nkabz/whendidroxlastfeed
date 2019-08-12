import React from 'react';
import FeedElement from './FeedElement/FeedElement';

const FeedList = (props) => (
    <ul>
        {props.map((match) =>(
            <FeedElement 
                
            />    
        ))}
    </ul>
);

export default FeedList;