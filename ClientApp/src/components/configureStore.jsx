import { legacy_createStore as createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { MainReducer } from './MainReducer';
import { ChuckNorrisReducer } from './ChuckNorrisApi/ChuckNorrisReducer';
import { StarWarsReducer } from './StarWarsApi/StarWarsReducer';

const enhancers = [];
const isDevelopment = process.env.NODE_ENV === 'development';
if(isDevelopment && typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__)
    enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__())

const configureStore = createStore(
    
    combineReducers({
        Main: MainReducer,
        Joke: ChuckNorrisReducer,
        StarWars: StarWarsReducer
    }),

    compose(
        applyMiddleware(thunk),
        ...enhancers
    )

);

export default configureStore;