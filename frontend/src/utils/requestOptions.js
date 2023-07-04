/* eslint-disable no-undef */

export const methodHeadersBody = (method, userInfo, tempEventInfoForEdit) => {
  return {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: userInfo.accessToken
    },
    body: JSON.stringify({
      tempEventInfoForEdit
    })
  }
};