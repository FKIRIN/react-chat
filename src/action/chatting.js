export function updateSysMsg(payload) {
  return {
    type: 'UPDATE_SYSTEM_MESSAGE',
    payload,
  }
}

export function updateMsg(payload) {
  return {
    type: 'UPDATE_USER_MESSAGE',
    payload,
  }
}

export function login(payload) {
  return {
    type: 'login',
    payload,
  }
}