import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from './../_actions/user.action';

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
        const { email, password } = this.state;
        // console.log(this.props, "FJSKDK");
        this.props.login(email, password);
    }
    
    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({ [name]: value }); 
        // console.log(this.state);
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

const mapStateToProps = state => ({
    session: state.auth,
});
  
const mapDispatchToProps = dispatch => 
    bindActionCreators(userActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
