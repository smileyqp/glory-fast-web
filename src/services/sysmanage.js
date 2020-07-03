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

export async function disableUser(data) {
  console.log(data);
  return request('/api/user/disable', {
    method: 'PUT',
    data,
  });
}
export async function exportUser(data) {
  console.log(data);
  return request('/api/user/export', {
    method: 'GET',
    data,
  });
}
export async function uploadInfo(data) {
  console.log(data);
  return request('/api/user/import', {
    header:{'content-type':'multipart/form-data'},
    method: 'POST',
    data:data.data
  });
}
export async function deleteUser(data) {
  let param = data.data
  return request('/api/user/delete', {
    method: 'DELETE',
    data:param,
  });
}
export async function updateUser(data) {
  return request('/api/user/update', {
    method: 'PUT',
    data,
  });
}

export async function queryPermissionList() {
    return request('/api/menu/list', {
        method: 'GET'
      });
}

export async function permissionListAdd(data) {
  return request('/api/menu/insert',{
    method:'POST',
    data
  })
}

export async function permissionListEdit(data) {
  return request('/api/menu/update',{
    method:'PUT',
    data
  })
}

export async function permissionListDelete(data) {
  let param = data.data
  return request('/api/menu/delete', {
    method: 'DELETE',
    data:param,
  });
}

export async function queryRoleList(data) {
    return request('/api/role/list',{ 
      method: 'POST',
      data
    })
}

export async function roleAdd(data){
  console.log(data)
  return request('/api/role/insert',{
      method:'POST',
      data
  })
}

export async function roleEdit(data){
  console.log(data)
  return request('/api/role/update',{
      method:'PUT',
      data
  })
}

export async function roleDelete(data){
  let param = data.data
  return request('/api/role/delete',{
      method:'DELETE',
      data:param
  })
}


export async function queryDictList(data){
    return request('/api/dict/list',{
        method:'POST',
        data
    })
}

export async function queryChildDictList(data){
  return request('/api/dict/listItem',{
      method:'POST',
      data
  })
}


export async function dictAdd(data){
  return request('/api/dict/insert',{
      method:'POST',
      data
  })
}
export async function dictUpdate(data){
  return request('/api/dict/update',{
      method:'PUT',
      data
  })
}

export async function dictDelete(data){
  console.log(typeof data)
  console.log(data)

  let param = data.data
  
  return request('/api/dict/delete',{
      method:'DELETE',
      data:param
  })
}



export async function childDictAdd(data){
  return request('/api/dict/insertItem',{
      method:'POST',
      data
  })
}

export async function childDictUpdate(data){
  return request('/api/dict/updateItem',{
      method:'PUT',
      data
  })
}


export async function childDictDelete(data){
  console.log(data)
  let param = data.data
  return request('/api/dict/deleteItem',{
      method:'DELETE',
      data:param
  })
}


export async function validateCode(data) {
  return request('/api/role/checkRoleCode',{ 
    method: 'POST',
    data
  })
}

export async function roleAuthorize(data) {
  return request('/api/role/grant',{ 
    method: 'POST',
    ...data
  })
}

export async function fetchroleAuthorize(data) {
  let param = data.data
  return request('/api/menu/getMenuListByRole/?roleId='+data.roleId,{ 
    method: 'GET'
  })
}