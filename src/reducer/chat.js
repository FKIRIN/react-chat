import io from 'socket.io-client';

const initialState = {
  username: '',
  userId: undefined,
  socket: io(),
  messageList: [],
  onlineUsers: {},
  onlineCount: 0,
  showContent: '',
}

export default function chat(state = initialState, action) {
  switch(action.type) {
    case 'login' : 
      return { ...state, ...action.payload };
    case 'UPDATE_SYSTEM_MESSAGE':
      return { ...state, messageList: state.messageList.concat(action.payload.message), ...{ onlineUsers: action.payload.onlineUsers }, ...{ onlineCount: action.payload.onlineCount } };
    case 'UPDATE_USER_MESSAGE':
      return { ...state, ...{ messageList: state.messageList.concat(action.payload.message) } };
    default:
      return state;
  }
}