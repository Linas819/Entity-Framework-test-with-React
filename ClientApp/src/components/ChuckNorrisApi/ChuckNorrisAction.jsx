import axios from 'axios';
import { SET_JOKE, SET_MODAL_OPEN } from './ChuckNorrisReducer';
import { SetButtonLoading } from '../MainAction';

export const GetJoke = () => {
    return async (dispatch) => {
        dispatch(SetButtonLoading(true));
        try {
            let result = await axios.get(`https://api.chucknorris.io/jokes/random`);
            dispatch({ type: SET_JOKE, joke: result.data.value });
            dispatch(SetModalOpen(true));
        } catch (err) {
            console.log(err);
        }
        dispatch(SetButtonLoading(false));
    }
}

export const SetModalOpen = (modalOpen) => {
    return (dispatch) => {
        dispatch({ type: SET_MODAL_OPEN, modalOpen });
    }
}