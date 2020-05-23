import request from '@/utils/request';

export async function queryUserList(data) {
  console.log(data);
  return request('/api/user/list', {
    method: 'POST',
    data,
  });
}

export async function addUser(data) {
  return request('/api/user/list', {
    method: 'POST',
    data,
  });
}
