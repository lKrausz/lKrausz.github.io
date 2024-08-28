// reducers.js
import { CHANGE_LANGUAGE } from "./actions";

const initialState = {
  language: "en" // начальное состояние
};

export const languageReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      return {
        ...state,
        language: action.payload
      };
    default:
      return state;
  }
};
