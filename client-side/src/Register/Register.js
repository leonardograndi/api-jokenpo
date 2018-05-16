import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from './../_actions/user.action';

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
        this.props.register(user);

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
                        <RaisedButton 
                            label="Cancelar" 
                            primary={true} 
                            onClick={this.handleSubmit}
                        />
                    </form>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { registering } = state.registration;
    return { registering }
};
  
const mapDispatchToProps = dispatch => 
    bindActionCreators(userActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Register);