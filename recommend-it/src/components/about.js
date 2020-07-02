import React from 'react';
import '../App.css';

import Spinner from 'react-bootstrap/Spinner';

import split from '../helpers/split';

class About extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            firstColumn: [],
            secondColumn: [],
            thirdColumn: [],
            fourthColumn: [],
            loading: true
        };
    }

    componentDidMount() {
        fetch('https://api.jikan.moe/v3/top/anime/1/airing')
            .then(response => response.json())
            .then((responseJson) => {
                const { firstColumn, secondColumn, thirdColumn, fourthColumn } = split(responseJson.top.slice(0, 16));
                this.setState({ firstColumn, secondColumn, thirdColumn, fourthColumn, loading: false });
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <div className="about">
                <h2>Now Trending ;)</h2>
                <div className="contentArea">
                    {this.state.loading ? <Spinner animation="grow" /> :
                        <div className="row">
                            <div className="column">
                                {this.state.firstColumn.map((anime, index) => {
                                    return (
                                        <div className="card">
                                            <img src={anime.image_url} />
                                            <div className="container">
                                                <a href={anime.url} target="_blank" className="aboutA"> <h5><b>{anime.title}</b></h5> </a>
                                                <p>Score -{anime.score}</p>
                                            </div>
                                        </div>
                                    )

                                })}
                            </div>
                            <div className="column">
                                {this.state.secondColumn.map((anime, index) => {
                                    return (
                                        <div className="card">
                                            <img src={anime.image_url} />
                                            <div className="container">
                                                <a href={anime.url} target="_blank" className="aboutA"> <h5><b>{anime.title}</b></h5> </a>
                                                <p>Score -{anime.score}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="column">
                                {this.state.thirdColumn.map((anime, index) => {
                                    return (
                                        <div className="card">
                                            <img src={anime.image_url} />
                                            <div className="container">
                                                <a href={anime.url} target="_blank" className="aboutA"> <h5><b>{anime.title}</b></h5> </a>
                                                <p>Score -{anime.score}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="column">
                                {this.state.fourthColumn.map((anime, index) => {
                                    return (
                                        <div className="card">
                                            <img src={anime.image_url} />
                                            <div className="container">
                                                <a href={anime.url} target="_blank" className="aboutA"> <h5><b>{anime.title}</b></h5> </a>
                                                <p>Score -{anime.score}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    }
                </div>
            </div >
        );
    }
}

export default About;