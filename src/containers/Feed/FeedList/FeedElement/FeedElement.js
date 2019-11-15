import React from 'react';
import './FeedElement.scss';

const FeedElement = (props) => {
    const {
        hero, deaths, imgUrl, kills, ratio,
    } = props;
    return (
        <div className="feedList__child">
            <h1 className="feedList_name">
                {hero}
            </h1>
            <h2 className="feedList__deaths">
                <strong>
                    {deaths}
                </strong>
                 deaths.
            </h2>
            <div className="feedList__imgContainer">
                <img src={imgUrl} alt={hero} />
            </div>
            <p className="feedList__kills">
                Also had
                {kills}
                kills.
            </p>
            <p className="feedList__net">
                Net Value:
                <strong className="">
                    -
                    {ratio}
                </strong>
            </p>

        </div>
    );
};

export default FeedElement;
