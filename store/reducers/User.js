const defaultState = {
  user: "",
  kondisiLogin:false,
  token:"",
  user:"",
  listKuliah:[],
  baseUrl : "http://escplorecloth.com/api/auth/",
  history:[],
  loginError:false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case "USER_NAME":
      return { ...state, user: action.payload };
      
   case "USER_TOKEN":
      return { ...state, token: action.payload.access_token, kondisiLogin:true, };
    case "INPUT_USER_DATA":
      return { ...state, user: action.payload};
    case "INPUT_LIST_KULIAH":
      console.log("masuk reducer list kuliah")
      return { ...state, listKuliah: action.payload};
       case "INPUT_HISTORY":
        return { ...state, history: action.payload};
      case "LOGIN_ERROR":
        console.log("masuk login error di UserReducer")
        return { ...state, loginError: true};

    default:
    return state
  }
};
