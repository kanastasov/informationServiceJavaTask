import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';

class PeopleList extends Component {
    state = {
        people: []
      };
    
      async componentDidMount() {
        const response = await fetch('http://localhost:8085/api/people');
        console.log(response)
        const body = await response.json();
        console.log(body)
        this.setState({people: body});
    
    
      }
    
      render() {
        const {people} = this.state;
        return (
            <div className="App">
              <header className="App-header">
                <div className="App-intro">
                  <h2>People</h2>
                  
                  {people.map(person =>
                      <div key={person.id}>
                        {person.fullName} ({person.pin})
                      </div>
                  )}
                </div>
              </header>
            </div>
        );
      }
    }

export default PeopleList;