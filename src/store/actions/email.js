export const SEND_EMAIL_REQUEST = 'SEND_EMAIL_REQUEST';
export const SEND_EMAIL_SUCCESS = 'SEND_EMAIL_SUCCESS';
export const SEND_EMAIL_FAIL = 'SEND_EMAIL_FAIL';

export function sendEmailRequest(email) {

  return {
    type: SEND_EMAIL_REQUEST,
    payload: { email },
  };
}
