import request from '@/utils/request';
import { func } from 'prop-types';

export async function queryCodelist(data) {
  console.log(data);
  return request('/api/genCodeTable/list', {
    method: 'POST',
    data,
  });
}

export async function addCode(data) {
  console.log(data);
  return request('/api/genCodeTable/insert', {
    method: 'POST',
    data,
  });
}


export async function editCode(data) {
    console.log(data);
    return request('/api/genCodeTable/update', {
      method: 'PUT',
      data,
    });
  }

export async function deleteCode(data) {
    console.log(data);
    let param = data.data
    return request('/api/genCodeTable/delete', {
        method: 'DELETE',
        data:param
    });
}

export async function queryCodeRecordlist(data) {
  console.log(data);
  return request('/api/genCodeRecord/list', {
    method: 'POST',
    data,
  });
}
export async function addCodeRecord(data) {
  console.log(data);
  return request('/api/genCodeRecord/insert', {
    method: 'POST',
    data,
  });
}

export async function createCodeFile(data) {
  console.log(data);
  return request('/api/genCodeRecord/createCodeFile', {
    method: 'POST',
    data,
  });
}
