import React from 'react';

import Header from './components/header';
import About from './components/about';
import Recommend from './components/recommend';
import Footer from './components/footer';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: null,
      recommending: false,
    };
  }

  handleUser = (event) => {
    this.setState({ userName: event.target.value });
  }

  submit = (event) => {
    if (this.state.userName != null && this.state.userName != '') {
      this.setState({ recommending: true });
    }
  }

  return = () => {
    this.setState({ userName: "", recommending: false });
  }

  render() {
    return (
      <Container fluid className="App">
        <Header />
        {this.state.recommending ? (<>
          <div className="mb-3 mt-3">
            <Button onClick={this.return} variant="outline-info">Return To HomePAGE</Button>
          </div>
          <Recommend userName={this.state.userName} />
        </>) : (<>
          <Row className="Row">
            <div className="banner">
              <h4>Enter Your MyAnimeList username to get your personalized Recommendations.</h4>
            </div>
            <Col md={8} className="mb-3 mt-3">
              <InputGroup>
                <FormControl
                  aria-label="Large"
                  aria-describedby="inputGroup-sizing-sm"
                  onChange={this.handleUser}
                  value={this.state.userName}
                  placeholder="Enter Your MAL ID."
                />
              </InputGroup>
            </Col>
            <Col md={4} className="mb-3 mt-3">
              <Button onClick={this.submit} variant="outline-info">Submit</Button>
            </Col>
          </Row>
          <hr />
          <About />
        </>
          )
        }
        <Footer />
      </Container>
    );
  }
}

export default App;
