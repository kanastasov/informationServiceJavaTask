import React, { Component } from 'react';
import { Link, withRouter,useNavigate,Navigate,useParams  } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class PeopleEdit  extends Component {
    item={

    }
    emptyItem = {
        fullName: '',
        pin: '',
        email: '',
        emailType: '',
        address:'',
        addressType:'',
        errors:{},
        mails: [],
        addresses: [],
        item:{},
        // emailError: 'errr'
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
        // console.log(event)

        const target = event.target;
        const value = target.value;
        const name = target.name;

        // console.log(target)
        console.log('value handleChange:',value)
        console.log('name handleChange:',name)
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
        // console.log(item[name])
        // console.log(name)

    }

    handleChangeEmail = (event) => {

        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        
        item[name] = value;

        console.log('item handleChangeEmail:',item)
        console.log(' item[name] handleChangeEmail:', item[name])

        this.setState({item});

        // this.setState({[event.target.name]: event.target.value})
    }

    
    handleChangeEmailType = (event) => {

        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        
        item[name] = value;

        console.log('item handleChangeEmail:',item)
        console.log(' item[name] handleChangeEmail:', item[name])

        this.setState({item});

        // this.setState({[event.target.name]: event.target.value})
    }


    
    handleChangeArrays(event) {   

        const target = event.target;
        const value = target.value;
        const name = target.name;

        // console.log(target)
        // console.log('value handleChange:',value)
        // console.log('name handleChange:',name)
        let item = {...this.state.item};

        
        item[name] = value;

        console.log('item handleChangeEmail:',item)
        console.log(' item[name] handleChangeEmail:', item[name])

        this.setState({item});

    }

    
    formValidation = () => {
        const {fullName, pin,email,emailType,address,addressType} = this.state;
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



        alert("Success post !!");
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
              {/* {
  "id": 93,
  "fullName": "test hereel",
  "pin": "1231231231",
  "mails": [
    {
      "id": 36,
      "emailType": "type",
      "email": "ivan@mail.com"
    }
  ],
  "addresses": [
    {
      "id": 28,
      "addrType": "addr",
      "addrInfo": "drrr"
    }
  ]
} */}
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="text" name="email" id="email" value={item.mails[0] !== undefined ? item.mails[0].email : this.state.email }
                               onChange={this.handleChangeEmail} autoComplete="email"/>
                                {/* {
                                this.state.emailError ? <span style={{ color: 'red', fontSize: '12px'}}>{  this.state.emailError}</span> : ''
                                } */}
                    </FormGroup>

                    <FormGroup>
                        <Label for="emailType">Email Type</Label>
                        <Input type="text" name="emailType" id="emailType" value={item.mails[0] !== undefined ? item.mails[0].emailType : this.state.emailType}
                               onChange={this.handleChangeEmailType} autoComplete="emailType"/>
                    </FormGroup>

                    <FormGroup>
                        <Label for="address">Address</Label>
                        <Input type="text" name="address" id="address" value={item.addresses[0] !== undefined ? item.addresses[0].addrInfo :  this.state.address}
                               onChange={this.handleChangeEmail} autoComplete="address"/>
                    </FormGroup>

                    <FormGroup>
                        <Label for="addressType">Address Type</Label>   
                        <Input type="text" name="addressType" id="addressType" value={item.addresses[0] !== undefined ? item.addresses[0].addrType : this.state.addressType}
                               onChange={this.handleChangeEmail} autoComplete="addressType"/>
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