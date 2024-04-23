import axios from 'axios';
import { SetButtonLoading } from '../MainAction';
import { SET_STAR_WARS_DATA, SET_STAR_WARS_MODAL} from './StarWarsReducer';

export const GetStarWarsData = () => {
    return async (dispatch) => {
        dispatch(SetButtonLoading(true));
        try {
            let result = await axios.get(`api/starwars`);
            if(result.data.success)
            {
                dispatch({ type: SET_STAR_WARS_DATA, starWarsData: result.data.data });
                dispatch(SetModalOpen(true));
            }
        } catch (err) {
            console.log(err);
        }
        dispatch(SetButtonLoading(false));
    }
}

export const GetStarWarsGenderData = (gender) => {
    return async (dispatch) => {
        dispatch(SetButtonLoading(true));
        try {
            let result = await axios.get(`api/starwars/gender`, {params: {
                gender: gender
            }});
            if(result.data.success)
            {
                dispatch({ type: SET_STAR_WARS_DATA, starWarsData: result.data.data });
                dispatch(SetModalOpen(true));
            }
        } catch (err) {
            console.log(err);
        }
        dispatch(SetButtonLoading(false));
    }
}

export const SetStarWarsCharacterData = (data) => {
    return async (dispatch, getState) => {
        dispatch(SetButtonLoading(true));
        let starWarsData = [];
        Object.keys(data).length === 0 ? starWarsData = getState().StarWars.starWarsData : starWarsData.push(data);
        let result = await axios.post(`api/starwars`, starWarsData);
        if(!result.data.success)
            console.log(result.data.message);
        dispatch(SetButtonLoading(false));
    }
}

export const SetModalOpen = (modalOpen) => {
    return (dispatch) => {
        dispatch({ type: SET_STAR_WARS_MODAL, modalOpen });
    }
}