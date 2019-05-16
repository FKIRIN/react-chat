// const initialState = {
//   username: '',
//   userId: undefined,
//   socket: undefined,
//   messages: [],
//   onlineUsers: {},
//   onLineCount: 0,
//   showContent: '',
// }

export default function reducer(state, action) {
  switch(action.type) {
    case 'login' : 
      return { ...state, ...action.payload };
    case 'UPDATE_SYSTEM_MESSAGE':
      return { ...state, messages: state.messages.concat(action.payload.message), ...{ onlineUsers: action.payload.onlineUsers }, ...{ onlineCount: action.payload.onlineCount } };
    case 'UPDATE_USER_MESSAGE':
      return { ...state, ...{ messages: state.messages.concat(action.payload.message) } };
    default:
      return state;
  }

}