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

export async function queryCodeRecordlist(data) {
  console.log(data);
  return request('/api/genCodeRecord/list', {
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
