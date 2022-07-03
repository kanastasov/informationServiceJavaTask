import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import AppNavbar from './AppNavbar';

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

      async remove(id) {
        await fetch(`http://localhost:8085/api/people/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedPeople = [...this.state.people].filter(i => i.id !== id);
            this.setState({people: updatedPeople});
        });
    }
    
      render() {
        const {people} = this.state;

        const peopleList = people.map(people => {
          return <tr key={people.id}>
              <td style={{whiteSpace: 'nowrap'}}>{people.fullName}</td>
              <td>{people.pin}</td>
              <td>
                  <ButtonGroup>
                      <Button size="sm" color="primary" tag={Link} to={"/people" + people.id}>Edit</Button>
                      <Button size="sm" color="danger" onClick={() => this.remove(people.id)}>Delete</Button>
                  </ButtonGroup>
              </td>
          </tr>
      });

      return (
        <div>
            <AppNavbar/>
            <Container fluid>
                <div className="float-right">
                    <Button color="success" tag={Link} to="/api/people/new">Add People</Button>
                </div>
                <h3>people</h3>
                <Table className="mt-4">
                    <thead>
                    <tr>
                        <th width="30%">Full Name</th>
                        <th width="30%">PIN</th>
                        <th width="50%">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {peopleList}
                    </tbody>
                </Table>
            </Container>
        </div>
    );

 
      }
    }

export default PeopleList;