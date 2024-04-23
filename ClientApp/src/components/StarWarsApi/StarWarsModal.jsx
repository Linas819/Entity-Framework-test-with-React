import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Modal } from 'semantic-ui-react';
import { AgGridReact } from 'ag-grid-react';
import { SetModalOpen, GetStarWarsGenderData, SetStarWarsCharacterData } from './StarWarsAction';

const columnDefs = [
    { headerName: 'Name', field: 'name', flex: 1},
    { headerName: 'Height', field: 'height', flex: 1},
    { headerName: 'Birth year', field: 'birth_year', flex: 1},
    { headerName: 'Gender', field: 'gender', flex: 1},
    { headerName: 'Mass', field: 'mass', flex: 1},
];

class StarWarsModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRow: {}
        };
    }
    closeModal = () => {
        this.setState({
            selectedRow: {}
        });
        this.props.SetModalOpen(false);
    }
    onClickMaleHandler = () => {
        this.props.GetStarWarsGenderData("female");
    }
    onClickUploadHandler = () => {
        this.props.SetStarWarsCharacterData(this.state.selectedRow);
    }
    onGridReady = (params) => {
        this.gridApi = params.api;
    }
    onSelectionChanged = () => {
        const selectedRows = this.gridApi.getSelectedRows();
        this.setState({
            selectedRow: selectedRows[0]
        });
    }
    render () {
        const { starWarsData, modalOpen } = this.props.StarWars;
        const { isButtonLoading } = this.props.main;
        return (
            <Modal open={modalOpen} onClose={this.closeModal.bind(this)} size='large'>
                <Modal.Content className="ag-theme-balham" style={{height: 500, width: '100%'}}>
                    <AgGridReact
                        columnDefs={columnDefs}
                        rowData={starWarsData}
                        rowSelection={'single'}
                        onGridReady={this.onGridReady.bind(this)}
                        onSelectionChanged={this.onSelectionChanged.bind(this)}
                    />
                </Modal.Content>
                <Modal.Actions style={{textAlign: 'center'}}>
                    <Button color='blue' disabled={isButtonLoading} loading={isButtonLoading} onClick={this.onClickMaleHandler.bind(this)}>Female</Button>
                    <Button color='green' disabled={isButtonLoading} loading={isButtonLoading} onClick={this.onClickUploadHandler.bind(this)}>Upload</Button>
                </Modal.Actions>
            </Modal>
        );
    }
}
function mapStateToProps(state) {
    return {
        main: state.Main,
      	StarWars: state.StarWars
    };
}

export default withRouter(
    connect(
        mapStateToProps, { SetModalOpen, GetStarWarsGenderData, SetStarWarsCharacterData }
)(StarWarsModal));