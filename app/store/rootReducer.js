import { combineReducers } from "@reduxjs/toolkit";
import weatherReducer from "./slices/search";

const rootReducer = combineReducers({
  weather: weatherReducer
});

export default rootReducer;