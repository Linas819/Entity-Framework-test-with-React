export const SET_STAR_WARS_DATA = "SET_STAR_WARS_DATA";
export const SET_INITIAL_STAR_WARS_STATE = "SET_INITIAL_STAR_WARS_STATE";
export const SET_STAR_WARS_MODAL = "SET_STAR_WARS_MODAL";

const initialState = {
    starWarsData: [],
    modalOpen: false
}

export const StarWarsReducer = (state, action) => {

    state = state || initialState;

    switch(action.type) {
        case SET_STAR_WARS_DATA:
            state = {
                ...state,
                starWarsData: action.starWarsData
            };
            break;
        case SET_STAR_WARS_MODAL:
            state = {
                ...state,
                modalOpen: action.modalOpen
            };
            break;
        case SET_INITIAL_STAR_WARS_STATE:
            state = initialState;
            break;
        default:
            break;
    };
    return state;
};