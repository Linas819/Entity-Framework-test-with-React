import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Modal } from 'semantic-ui-react';
import { SetModalOpen } from './ChuckNorrisAction';

class ChuckNorrisModal extends Component {
    closeModal = () => {
        this.props.SetModalOpen(false);
    }
    render () {
        const { joke, modalOpen } = this.props.joke;
        return (
            <Modal open={modalOpen} onClose={this.closeModal.bind(this)} size='mini'>
                <Modal.Content className='center'>
                    {joke}
                </Modal.Content>
            </Modal>
        );
    }
}

function mapStateToProps(state) {
    return {
      	joke: state.Joke
    };
}

export default withRouter(
    connect(
        mapStateToProps, { SetModalOpen }
)(ChuckNorrisModal));