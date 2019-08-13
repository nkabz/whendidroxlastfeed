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

    componentDidMount() {
        Promise.all([
            this.getMatches(),
            this.getHeroes()
            
        ])
        .then((results) => {
            console.log(results[1]);
            let worstValue = null;
            const fetchedFeedList = results[0].data.reduce((result, curEl, curIndex) => {
                if(curEl['deaths'] - curEl['kills'] > 5)
                {
                    let nameOfHero = results[1].heroes.filter(
                        function(hero){
                            return hero['id'] === curEl['hero_id']
                        }
                    );
                    if(curEl['deaths'] - curEl['kills'] >= worstValue || worstValue === null)
                    {
                        worstValue = curEl;
                        worstValue.heroName = nameOfHero[0]['localized_name'];
                    }
                    result.push({
                        kills: curEl['kills'],
                        deaths: curEl['deaths'],
                        heroName: nameOfHero[0]['localized_name']
                    })
                }
                return result;
            }, []);
                this.setState({feedList: fetchedFeedList, highlight: worstValue})
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
            console.log(this.state.highlight)
            feedHighlight=<FeedHighlight matchToHighlight={this.state.highlight}/>
            feedList = <FeedList
                
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