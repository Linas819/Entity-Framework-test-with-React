import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header, Input, Button } from 'semantic-ui-react';
import { Login } from './MainAction';

class LogIn extends Component {
    onClickHandler = () => {
        this.props.Login("admin", "admin");
    }
    render () {
        const { isButtonLoading } = this.props.main;
        return (
            <div className='center'>
                <Header as='h1'>ReactTest</Header>
                <Header as='h2'>Login</Header>
                <Input as='h2' placeholder='Username...'/><br/>
                <Input as='h2' placeholder='Password...'/><br/>
                <Button as='h2' color='green' disabled={isButtonLoading} loading={isButtonLoading} onClick={this.onClickHandler}>Login</Button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        main: state.Main
    };
}

export default withRouter(
    connect(
        mapStateToProps, { Login }
)(LogIn));