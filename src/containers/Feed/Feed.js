import React, {Component} from 'react';
import axios from '../../AxiosOpenApi';
import FeedHighlight from './FeedHighlight/FeedHighlight';
import FeedList from './FeedList/FeedList';
import Spinner from '../../components/Layout/UI/Spinner/Spinner';
import heroes from '../../data/heroes.json'

class Feed extends Component {
    
    state = {
        feedList: null,
        accountId: "108770471",
        //accountId: "2686050"
        highlight: null,
    }
    
    getMatches(){
        
        return axios.get('/players/' + this.state.accountId + '/matches?limit=50');
        
    }
    getHeroes(){
        return heroes;
    }

    getFetchedHighlight(currentElement, heroName, netRatio){
        return {
            ...currentElement,
            heroName: heroName['localized_name'],
            heroImgUrl: heroName['url_vertical_portrait'],
            netRatio: netRatio
        };
    }
    
    updateNewHighlight(curFetchedHighlight, heroName, netRatio, curEl){
        if(curFetchedHighlight.netRatio <= netRatio)
            return this.getFetchedHighlight(curEl, heroName, netRatio)
        return curFetchedHighlight;
    }

    componentDidMount() {
        Promise.all([
            this.getMatches(),
            this.getHeroes()
            
        ])
        .then((results) => {
            let fetchedHighlight = null;
            const fetchedFeedList = results[0].data.reduce((result, curEl, curIndex) => 
            {  
                let ratioKillDeath = curEl['deaths'] - curEl['kills']

                if(ratioKillDeath > 5)
                {
                    let nameOfHero = results[1].heroes.filter(
                        function(hero){
                            return hero['id'] === curEl['hero_id']
                        }
                    );
                    fetchedHighlight = (fetchedHighlight === null) ? 
                        this.getFetchedHighlight({...curEl},nameOfHero[0],ratioKillDeath) :
                        this.updateNewHighlight({...fetchedHighlight}, nameOfHero[0],ratioKillDeath,{...curEl})    
 
                    result.push({
                        kills: curEl['kills'],
                        deaths: curEl['deaths'],
                        heroName: nameOfHero[0]['localized_name'],
                        matchid: curEl['match_id'],
                        heroImgUrl: nameOfHero[0]['url_vertical_portrait']
                    })
                }
                return result;
            }, []);
                this.setState({feedList: fetchedFeedList, highlight: fetchedHighlight})
        })
        .catch((err) => {
            console.log(err);
        });

    }
    
    render() {
        let feedList = <Spinner />
        let feedHighlight = null;
        if(this.state.feedList !== null)
        {
            feedHighlight = 
            <FeedHighlight
                matchToHighlight={this.state.highlight}
            />

            feedList = 
            <FeedList
                listOfMatches={this.state.feedList}
            />
        }
        return (
            <React.Fragment>
                {feedHighlight}
                {feedList}
            </React.Fragment>
        );
    }
}

export default Feed;