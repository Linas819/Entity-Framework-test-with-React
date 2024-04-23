import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header, Button } from 'semantic-ui-react';
import { GetJoke } from './ChuckNorrisApi/ChuckNorrisAction';
import { GetStarWarsData } from './StarWarsApi/StarWarsAction';
class AppSelection extends Component {
    ChuckNorrisHandler = () => {
        this.props.GetJoke();
    }
    StarWarsHandler = () => {
        this.props.GetStarWarsData();
    }
    render () {
        const { isButtonLoading } = this.props.main;
        return (
            <div className='center'>
                <Header as='h1'>ReactTest</Header>
                <Button color='yellow' disabled={isButtonLoading} loading={isButtonLoading} onClick={this.StarWarsHandler.bind(this)}>Star Wars</Button><br/><br/>
                <Button color='blue' disabled={isButtonLoading} loading={isButtonLoading} onClick={this.ChuckNorrisHandler.bind(this)}>Chuck Norris</Button>
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
        mapStateToProps, { GetJoke, GetStarWarsData }
)(AppSelection));