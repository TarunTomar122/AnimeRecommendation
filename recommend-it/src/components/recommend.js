import React from 'react';
import '../App.css';

import Spinner from 'react-bootstrap/Spinner';

import split from '../helpers/split';

class Recommend extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: this.props.userName,
            firstColumn: [],
            secondColumn: [],
            thirdColumn: [],
            fourthColumn: [],
            gettingUserDetails: true,
            loading: true,
            badResponse: false,
        };
    }

    componentDidMount() {
        fetch('https://api.jikan.moe/v3/user/' + this.state.userName + '/animelist/all')
            .then(response => response.json())
            .then((responseJson) => {
                if (responseJson.status) {
                    this.setState({ gettingUserDetails: false, loading: false, badResponse: true })
                } else {
                    var animes = [];

                    responseJson['anime'].forEach(anime => {
                        animes.push([anime['score'], anime['title']]);
                    });

                    animes.sort();
                    animes.reverse();

                    var watched = [];

                    animes.forEach(anime => {
                        watched.push(anime[1]);
                    });

                    this.setState({ gettingUserDetails: false });

                    fetch('https://recommend-it-anime.herokuapp.com/suggest', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ "animes": watched })
                    })
                        .then(response => response.json())
                        .then((responseJson) => {
                            if (responseJson.error != null) {
                                this.setState({ badResponse: true });
                            } else {
                                const { firstColumn, secondColumn, thirdColumn, fourthColumn } = split(responseJson.suggestions);
                                this.setState({ firstColumn, secondColumn, thirdColumn, fourthColumn, loading: false });
                            }
                        })
                        .catch(error => console.log(error))
                }
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <div className="about">
                {this.state.gettingUserDetails ? (<>
                    <h2>Getting User Details</h2>
                </>
                ) : this.state.loading ? (<>
                    <h2>Getting Recommendations</h2>
                </>
                ) : this.state.badResponse ? (<>
                    <h2>400 Bad Response for {this.state.userName} 😞</h2>
                </>
                ) :
                            (<>
                                <h2>Recommendations for {this.state.userName}</h2>
                            </>
                            )
                }
                <div className="contentArea">
                    {this.state.loading ? <Spinner animation="grow" /> :
                        <div className="row">
                            <div className="column">
                                {this.state.firstColumn.map((anime, index) => {
                                    return (
                                        <div className="card">
                                            <img src={anime.image} />
                                            <div className="container">
                                                <h5><b>{anime.name}</b></h5>
                                                <div className="cardBottom">
                                                    {anime.video !== "" ?<a href={anime.video} target="_blank">Watch Trailer</a>: null}
                                                    <a href={anime.link} target="_blank">Know More</a>
                                                </div>
                                            </div>
                                        </div>
                                    )

                                })}
                            </div>
                            <div className="column">
                                {this.state.secondColumn.map((anime, index) => {
                                    return (
                                        <div className="card">
                                            <img src={anime.image} />
                                            <div className="container">
                                                <h5><b>{anime.name}</b></h5>
                                                <div className="cardBottom">
                                                    {anime.video !== "" ?<a href={anime.video} target="_blank">Watch Trailer</a>: null}
                                                    <a href={anime.link} target="_blank">Know More</a>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="column">
                                {this.state.thirdColumn.map((anime, index) => {
                                    return (
                                        <div className="card">
                                            <img src={anime.image} />
                                            <div className="container">
                                                <h5><b>{anime.name}</b></h5>
                                                <div className="cardBottom">
                                                    {anime.video !== "" ?<a href={anime.video} target="_blank">Watch Trailer</a>: null}
                                                    <a href={anime.link} target="_blank">Know More</a>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="column">
                                {this.state.fourthColumn.map((anime, index) => {
                                    return (
                                        <div className="card">
                                            <img src={anime.image} />
                                            <div className="container">
                                                <h5><b>{anime.name}</b></h5>
                                                <div className="cardBottom">
                                                    {anime.video !== "" ?<a href={anime.video} target="_blank">Watch Trailer</a>: null}
                                                    <a href={anime.link} target="_blank">Know More</a>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default Recommend;