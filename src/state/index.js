
import { createStore, 
         applyMiddleware, 
         combineReducers
} from "redux";
import { createLogger } from 'redux-logger';

//// import logger from "redux-logger";
import { createEpicMiddleware, 
         combineEpics
} from "redux-observable";

//// Import your state types, reducers and epics here.
import { searchWxEpic, searchHourlyWxEpic } from '../state/searchWx/epics';
//
//// DO NOT TOUCH REDUCERS COMMENT
import { searchwx } from '../state/searchWx/reducers';
//// DO NOT TOUCH EPICS COMMENT


// root level to apply our reducers to for adaptibility across our state in app
const rootReducer = combineReducers({
   searchwx

});

// root level to apply our epics for RxJs. Comparable to Saga for React-Saga.
const rootEpic = combineEpics(
   searchWxEpic,
   searchHourlyWxEpic

);

// setup and instaniation of our middleware which is RxJs Observables
// creation of our global state
const epicMiddleware = createEpicMiddleware();

function configureStore(initialState) {
  // configure middlewares
  const middlewares = [epicMiddleware];
  // compose enhancers
  const logger = createLogger();
  const enhancer = applyMiddleware(logger, ...middlewares);

  // create store
  const store = createStore(rootReducer, initialState, enhancer);

  epicMiddleware.run(rootEpic);

  return store;
}




const appStore = configureStore();
window.appStore = appStore;
export default appStore;


