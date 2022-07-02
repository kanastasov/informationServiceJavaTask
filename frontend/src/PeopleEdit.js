import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class PeopleEdit extends Component {

    emptyItem = {
        fullName: '',
        pin: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const people = await (await fetch(`http://localhost:8085/api/people/${this.props.match.params.id}`)).json();
            this.setState({item: people});
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;
    
        await fetch('http://localhost:8085/api/people' + (item.id ? '/' + item.id : ''), {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('http://localhost:8085/api/people');
    }

    render() {
        const {item} = this.state;
        const title = <h2>{item.id ? 'Edit People' : 'Add People'}</h2>;

        return <div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="fullName">Full Name</Label>
                        <Input type="text" name="fullName" id="fullName" value={item.fullName || ''}
                               onChange={this.handleChange} autoComplete="fullName"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="pin">Pin</Label>
                        <Input type="text" name="pin" id="pin" value={item.pin || ''}
                               onChange={this.handleChange} autoComplete="pin"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="http://localhost:8085/api/people">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}
export default (PeopleEdit);