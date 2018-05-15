import React, { Component } from 'react';


import { Card, CardHeader } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nickname: '',
            email: '',
            password: ''
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        const { user } = this.state;
        
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });

    }

    handleSubmit = () => {
        const { user } = this.state;
    }

    render() {
        return(
            <div>
                <Card>
                    <form>
                        <CardHeader
                            title="Registrar-se"
                            actAsExpander={true}
                            showExpandableButton={true}
                        />
                        <TextField
                            hintText="Apelido"
                            floatingLabelText="Insira seu Apelido"
                            onChange={this.handleChange}
                            name="nickname"
                        />
                        <br/>
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

export default Register;