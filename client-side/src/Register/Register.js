import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from './../_actions/user.action';

import { Card, CardHeader } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { FadeLoader } from 'react-spinners';

import { divLogin } from './RegisterStyle';
import logo from './../assets/logo_smartcity.png';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getmuiTheme, { getMuiTheme } from 'material-ui/styles/getMuiTheme';

import { Redirect } from 'react-router-dom';

const muiTheme = getmuiTheme({});

const styles = {
    floatingLabelFocusStyle: {
        color: "#FFFFFF"
    },
    floatingLabelStyle: {
        color: "#B3B3B3"
    },
    inputStyle: {
        color: "#009640"
    },
    divLogin: {
        width: '100vw',
        height: '100vh',
        backgroundColor: '#1A1A1A'
    },
    underlineFocusStyle: {
        borderColor: '#04DE63'
    },
    textField: {
        position: 'relative',
        display: 'block',
        width: '100%',
        left: '50%',
        transform: 'translate(-50%, 0%)',
        display: 'inline-block'
    }
}



class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user:{
                nickname: '',
                email: '',
                password: '',
            },
            
            sizeAux: '7',
            tipo: 0
        }
    }

    componentDidMount() {
        this.ajustarProporcao();

        window.addEventListener('resize', () => {

            this.ajustarProporcao();

        }, false);
    }

    ajustarProporcao = () => {

        //se landscape
        if (window.innerHeight < window.innerWidth) {
            this.setState({
                sizeAux: '7'
            });
        }
        else {
            this.setState({
                sizeAux: '12'
            });
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        const { user } = this.state;
        
        this.setState({
            user: {
                ...user,
                [name]: value
            },
        });
    }

    handleSubmit = () => {
        const { user } = this.state;

        this.props.register(user);
    }

    render() {

        const { result } = this.props;

        if(result) {
            return <Redirect to="/login" />;
        }

        return(
            <MuiThemeProvider muiTheme={muiTheme}>
                <div style={divLogin}>
                    <div style={{ 
                        width: '40%', 
                        position: 'absolute', 
                        left: '50%', 
                        transform: 'translate(-50%, 0%)' 
                    }}>
                        <img src={logo} style={{ 
                            marginTop: '5%', 
                            position: 'relative', 
                            bottom: '0px', 
                            width: this.state.sizeAux * 3 + 'vw', 
                            marginLeft: '50%', 
                            transform: 'translate(-50%, 0%)' 
                        }} alt="" />

                        <div>
                            <form>
                                <TextField 
                                    floatingLabelText="Nome" 
                                    underlineFocusStyle={styles.underlineFocusStyle} 
                                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle} 
                                    floatingLabelStyle={styles.floatingLabelStyle} 
                                    inputStyle={styles.inputStyle} 
                                    onChange={this.handleChange}
                                    id="nome" type="text" style={styles.textField} 
                                    name="nickname"
                                />

                                <TextField 
                                    floatingLabelText="Email" 
                                    underlineFocusStyle={styles.underlineFocusStyle} 
                                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle} 
                                    floatingLabelStyle={styles.floatingLabelStyle} 
                                    inputStyle={styles.inputStyle} 
                                    onChange={this.handleChange}
                                    id="email" type="text" style={styles.textField} 
                                    name="email"
                                />
                                <TextField 
                                    floatingLabelText="Password" 
                                    underlineFocusStyle={styles.underlineFocusStyle} 
                                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle} 
                                    floatingLabelStyle={styles.floatingLabelStyle} 
                                    inputStyle={styles.inputStyle} 
                                    onChange={this.handleChange}
                                    id="password" type="password" style={styles.textField} 
                                    name="password"
                                />

                                {/* <TextField floatingLabelText="Nickname" underlineFocusStyle={styles.underlineFocusStyle} floatingLabelFocusStyle={styles.floatingLabelFocusStyle} floatingLabelStyle={styles.floatingLabelStyle} inputStyle={styles.inputStyle} id="nickname" type="text" style={styles.textField} />
                                <TextField floatingLabelText="Senha" underlineFocusStyle={styles.underlineFocusStyle} floatingLabelFocusStyle={styles.floatingLabelFocusStyle} floatingLabelStyle={styles.floatingLabelStyle} inputStyle={styles.inputStyle} id="nickname" type="password" style={styles.textField} /> */}
                                <div>
                                    <FlatButton label="Cadastrar" onClick={this.handleSubmit} style={{ fontWeight: 'bold', marginTop: '3%', width: '30%', marginLeft: '50%', transform: 'translate(-50%, 0%)', color: '#009640' }} />
                                    <FlatButton label="Cancelar" style={{ fontWeight: 'bold', marginTop: '3%', width: '30%', marginLeft: '50%', transform: 'translate(-50%, 0%)', color: '#009640' }} />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = state => {
    const { result } = state.registration;
    return { result }
};
  
const mapDispatchToProps = dispatch => 
    bindActionCreators(userActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Register);