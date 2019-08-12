import React, {Component} from 'react';
import axios from '../../AxiosOpenApi';
// import FeedHighlight from './FeedList/FeedHighlight'
// import FeedList from './FeedList/FeedList'

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
        return axios.get('/heroes');
    }

    componentDidMount() {

        Promise.all([
            this.getMatches(),
            this.getHeroes()
            
        ])
        .then((results) => {
            let worstValue = null;
            const fetchedFeedList = results[0].data.reduce((result, curEl, curIndex) => {
                if(curEl['deaths'] - curEl['kills'] > 5)
                {
                    if(curEl['deaths'] - curEl['kills'] >= worstValue || worstValue === null)
                        worstValue = curEl;
                    let nameOfHero = results[1].data.filter(
                        function(hero){
                            return hero['id'] === curEl['hero_id']
                        }
                    );
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
        return (
            <React.Fragment>
                {/* <FeedList />
                <FeedHighlight /> */}
            </React.Fragment>
        );
    }
}

export default Feed;