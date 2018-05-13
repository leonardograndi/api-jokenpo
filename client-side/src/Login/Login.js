import React, { Component } from 'react';

import { Card, CardHeader } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = () => {
        console.log("FJSKDK");
    }
    
    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({ [name]: value }); 
        console.log(this.state);
    }


    render() {
        return(
            <div>
                <Card>
                    <form>
                        <CardHeader
                            title="Smart Cities"
                            actAsExpander={true}
                            showExpandableButton={true}
                        />
                        <TextField
                            hintText="Insira seu Email"
                            floatingLabelText="Email"
                            onChange={this.handleChange}
                            name="email"
                        />
                        <br/>
                        <TextField
                            type="password"
                            hintText="Insira sua senha"
                            floatingLabelText="Senha"
                            onChange={this.handleChange}
                            name="password"
                        />
                        <br/>
                        <RaisedButton 
                            label="Acessar" 
                            primary={true} 
                            onClick={this.handleSubmit}
                        />
                    </form>
                </Card>
            </div> 
        );
    }

}

export default Login;
