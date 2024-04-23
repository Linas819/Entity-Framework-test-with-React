export const SET_AUTHNETICATION = "SET_AUTHNETICATION";
export const SET_BUTTON_LOADING = "SET_BUTTON_LOADING";
export const SET_USER = "SET_USER";
export const SET_INITIAL_MAIN_STATE = "SET_INITIAL_MAIN_STATE";

const initialState = {
    isAuthenticated: false,
    isButtonLoading: false,
    user: ""
}

export const MainReducer = (state, action) => {

    state = state || initialState;

    switch(action.type) {
        case SET_AUTHNETICATION:
            state = {
                ...state,
                isAuthenticated: action.authentication
            };
            break;
        case SET_BUTTON_LOADING:
            state = {
                ...state,
                isButtonLoading: action.loading
            };
            break;
        case SET_USER:
            state = {
                ...state,
                user: action.user
            };
            break;
        case SET_INITIAL_MAIN_STATE:
            state = initialState;
            break;
        default:
            break;
    };
    return state;
};