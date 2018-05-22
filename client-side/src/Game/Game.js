import React, {Component} from 'react';

import {Redirect} from 'react-router-dom';

import { connect } from 'react-redux';

class Game extends Component {

    
    render() {
        const { error, token } = this.props.session;

        if (!token) {
            return <Redirect to="/login" />;
        }

        return(
            <div>
                <h2>KJAHJAS</h2>
            </div>
        );
    }


}

const mapStateToProps = state => ({
    session: state.auth
});

export default connect(mapStateToProps)(Game);