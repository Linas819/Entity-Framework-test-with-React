import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from './Login';
import AppSelection from './AppSelection';
import { LoginToken } from './MainAction';
import ChuckNorrisModal from './ChuckNorrisApi/ChuckNorrisModal';
import StarWarsModal from './StarWarsApi/StarWarsModal';

class Layout extends Component {

	componentDidMount = () => {
		this.props.LoginToken();
	}

  	render () {
		const { isAuthenticated } = this.props.main;
		return (
		<div>
			{!isAuthenticated && <Login/>}
			{isAuthenticated && <AppSelection/>}
			<ChuckNorrisModal/>
			<StarWarsModal/>
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
        mapStateToProps, { LoginToken }
)(Layout));