import { authentication } from '../actions'; 

const initialState = {
  user: {},
  loginFailure: false,
  signupFailure: false,
  isLoading: false,
};

export const reducer = (state = initialState, action) => {
  
  switch (action.type) {
    case authentication.LOGIN_START:
    case authentication.SIGNUP_START:
      return {
        ...state,
        isLoading: true
      }

    case authentication.SET_USER:

      return {
        ...state,
        isLoading: false,
        user: action.payload
      }
    
    case authentication.LOGIN_FAILURE:

      return {
        ...state,
        isLoading: false,
        loginFailure: true
      }
    
    case authentication.SET_LOGIN_FAILURE_FALSE:

      return {
        ...state,
        loginFailure: false
      }
    
    case authentication.SIGNUP_FAILURE:

      return {
        ...state,
        isLoading: false,
        signupFailure: true
      }
    
    case authentication.SET_SIGNUP_FAILURE_FALSE:

      return {
        ...state,
        signupFailure: false
      }
    
    default:
      return state;
  }
};