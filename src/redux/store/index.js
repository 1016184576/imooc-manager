import { createStore } from 'redux';
import imoocReducer from '../reducer';

export default () => createStore(imoocReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
