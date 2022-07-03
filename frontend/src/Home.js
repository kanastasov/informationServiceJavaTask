import React, { Component } from 'react';
import AppNavbar from './AppNavbar';
import './App.css';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

class Home extends Component {
    render() {
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                   <h1>People </h1>

                    <Button color="link"><Link to="/api/people">People</Link></Button>
                </Container>
            </div>
        );
    }
}
export default Home;