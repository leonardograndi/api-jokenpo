import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from './../_actions/user.action';

// import { Card, CardHeader } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
// import RaisedButton from 'material-ui/RaisedButton';

import logo from './../assets/logo_smartcity.png';
// import cityback from './../assets/city_background.png';

import FlatButton from 'material-ui/FlatButton';

import injectTapEventPlugin from 'react-tap-event-plugin';

import { divLogin, imageSmart, underlineFocusStyle, floatingLabelFocusStyle,
floatingLabelStyle, inputStyle, textField, styleBtnSubmit } from './LoginStyle.js';


import { Redirect } from 'react-router-dom';


injectTapEventPlugin();

class Login extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            sizeAux: '7'
        }
    }


    componentDidMount() {
        
        this.ajustarProporcao();

        window.addEventListener('resize', () => {

            this.ajustarProporcao();

        }, false);
    }

    ajustarProporcao = () => {

        if (window.innerHeight < window.innerWidth) {
            this.setState({ sizeAux: '7'});
        } else {
            this.setState({ sizeAux: '12'});
        }
    }

    handleSubmit = () => {
        const { email, password } = this.state;
        
        if(email && password){
            this.props.login(email, password);
        }    

        console.log(this.props, "PROPS");
    }
    
    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({ [name]: value }); 
    }

    render() {

        const { token } = this.props.session;

        if(token) {
            return <Redirect to="/" />;
        }

        return(
            <div style={divLogin}>
                <div style={{ 
                        width: this.state.sizeAux * 5 + 'vw', 
                        position: 'absolute', 
                        left: '50%', top: '50%', 
                        transform: 'translate(-50%, -50%)' 
                    }}>
                    
                    <img src={logo} style={imageSmart} alt=""/>

                    <form>
                        <TextField
                            underlineFocusStyle={underlineFocusStyle} 
                            floatingLabelFocusStyle={floatingLabelFocusStyle}
                            floatingLabelStyle={floatingLabelStyle} 
                            inputStyle={inputStyle}
                            style={textField}
                            floatingLabelText="Email"
                            onChange={this.handleChange}
                            name="email"
                            autoComplete="off"
                        />
                        <br/>
                        <TextField
                            underlineFocusStyle={underlineFocusStyle} 
                            floatingLabelFocusStyle={floatingLabelFocusStyle}
                            floatingLabelStyle={floatingLabelStyle} 
                            inputStyle={inputStyle}
                            style={textField}
                            type="password"
                            floatingLabelText="Senha"
                            onChange={this.handleChange}
                            name="password"
                            autoComplete="off"
                        />
                        <br/>
                        <FlatButton 
                            label="Acessar" 
                            primary={true} 
                            onClick={this.handleSubmit}
                            style={styleBtnSubmit}
                        />
                    </form>
                </div>
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


