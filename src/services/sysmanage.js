import request from '@/utils/request';
import { func } from 'prop-types';

export async function queryUserList(data) {
  console.log(data);
  return request('/api/user/list', {
    method: 'POST',
    data,
  });
}

export async function addUser(data) {
  console.log(data);
  return request('/api/user/insert', {
    method: 'POST',
    data,
  });
}

export async function queryPermissionList() {
    return request('/api/menu/list', {
        method: 'GET'
      });
}

export async function queryRoleList() {
    return request('/api/role/list',{ method: 'POST'})
}

export async function queryDictList(data){
    return request('/api/dict/list',{
        method:'POST',
        data
    })
}