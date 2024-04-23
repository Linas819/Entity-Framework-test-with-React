export const SET_JOKE = "SET_JOKE";
export const SET_INITIAL_JOKE_STATE = "SET_INITIAL_JOKE_STATE";
export const SET_MODAL_OPEN = "SET_MODAL_OPEN";

const initialState = {
    joke: "",
    modalOpen: false
}

export const ChuckNorrisReducer = (state, action) => {

    state = state || initialState;

    switch(action.type) {
        case SET_JOKE:
            state = {
                ...state,
                joke: action.joke
            };
            break;
        case SET_MODAL_OPEN:
            state = {
                ...state,
                modalOpen: action.modalOpen
            };
            break;
        case SET_INITIAL_JOKE_STATE:
            state = initialState;
            break;
        default:
            break;
    };
    return state;
};