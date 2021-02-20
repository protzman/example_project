import { applyMiddleware, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { GlobalState, rootReducer } from './reducers';

export default function configureStore(): Store<GlobalState, any> {
  return createStore(
    rootReducer,
    undefined,
    composeWithDevTools(applyMiddleware(thunk))
  );
}
