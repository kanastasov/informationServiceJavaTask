import React, { Component,useState } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import AppNavbar from './AppNavbar';
import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


// toast.configure()

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
            console.log(people.mails)
            

          return <tr key={people.id}>
              <td style={{whiteSpace: 'nowrap'}}>{people.fullName}</td>
              <td>{people.pin}</td>


              <td>{people.mails[0].email}</td>
              <td>{people.addresses[0].addrInfo}</td>
              <td>
                  <ButtonGroup>
                      <Button size="sm" color="primary" tag={Link} to={"/api/people/new/" + people.id}>Edit</Button>
                      <Button size="sm" color="danger" onClick={() => this.remove(people.id)}>Delete</Button>
                  </ButtonGroup>
              </td>
          </tr>
      });

      const notify = () => {
        toast("Wow so easy!")

      }
      return (
        <div>
            <AppNavbar/>
            <Container fluid>
                <div className="float-right">
                    <Button color="success" tag={Link} to="/api/people/new">Add People</Button>
                    <button onClick={notify}>Notify!</button>
        <ToastContainer />
                </div>
                <h3>List of People</h3>
                <Table className="mt-4">
                    <thead>
                    <tr>
                        <th width="20%">Full Name</th>
                        <th width="20%">PIN</th>
                        <th width="30%">Email</th>
                        <th width="30%">Address</th>
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