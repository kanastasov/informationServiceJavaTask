import React, { Component } from 'react';
import { Link, withRouter,useNavigate,Navigate,useParams  } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class PeopleEdit  extends Component {

    emptyItem = {
        fullName: '',
        pin: '',
        email: '',
        emailType: '',
        address:'',
        addressType:'',
        errors:{}
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
        const personId = window.location.href.split('/')[6]

        // console.log(personId)
        // this.props.match.params.id
        // if peerson is not new set state 
        if (personId !== undefined) {
            // const people = await (await fetch(`http://localhost:8085/api/people/${58}`)).json();
            const people = await (await fetch(`http://localhost:8085/api/people/${personId}`)).json();

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

    
    formValidation = () => {
        const {fullName, pin} = this.state;
        let isValid = true;
        const errors = {};

        if(fullName.trim().length < 6){
            errors.fullNameLength = "fullName must be if length 6 or higher";
            isValid = false;
        }

        if(pin.trim().length != 10){
            errors.pinLength = "pin must be if length 10";
            isValid = false;
        }

        if(pin.trim().email < 5){
            errors.pinLength = "email must be if length 5";
            isValid = false;
        }

        this.setState({errors});
        return isValid;

    }
    
    async handleSubmit(event) {
        
        event.preventDefault();

        // const isValid = this.formValidation();


        const {item} = this.state;
        // if(isValid) {

        
        await fetch('http://localhost:8085/api/people' + (item.id ? '/' + item.id : ''), {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
    // }
        // <Navigate to ="/" />
        // this.props.navigation.navigate('http://localhost:8085/api/people');
        //    <Link to='http://localhost:8085/api/people'>People</Link>
        //    this.props.history.push('http://localhost:8085/api/people');
    }



    render() {
        const {item,errors} = this.state;
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
                        <Label for="email">Email</Label>
                        <Input type="text" name="email" id="email" value={item.email || ''}
                               onChange={this.handleChange} autoComplete="email"/>
                    </FormGroup>

                    <FormGroup>
                        <Label for="emailType">Email Type</Label>
                        <Input type="text" name="emailType" id="emailType" value={item.emailType || ''}
                               onChange={this.handleChange} autoComplete="emailType"/>
                    </FormGroup>

                    <FormGroup>
                        <Label for="address">Address</Label>
                        <Input type="text" name="address" id="address" value={item.address || ''}
                               onChange={this.handleChange} autoComplete="address"/>
                    </FormGroup>

                    <FormGroup>
                        <Label for="addressType">Address Type</Label>
                        <Input type="text" name="addressType" id="addressType" value={item.addressType || ''}
                               onChange={this.handleChange} autoComplete="addressType"/>
                    </FormGroup>

                
                    <FormGroup>
                        <Button color="primary" type="submit" >Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/api/people">Cancel</Button>
                    </FormGroup>
                    {/* {Object.keys(errors).map((key) =>{
                        return <div style={{color:"red"}} key={key}>{errors[key]}</div>
                    })} */}

                </Form>
            </Container>
        </div>
    }
}
export default (PeopleEdit);