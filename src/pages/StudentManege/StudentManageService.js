import request from '@/utils/request';
import { func } from 'prop-types';

export async function queryStudentList(data) {
  return request('/api/studentManage/list', {
    method: 'POST',
    data,
  });
}

export async function addStudent(data) {
  return request('/api/studentManage/insert', {
    method: 'POST',
    data,
  });
}


export async function editStudent(data) {
    return request('/api/studentManage/update', {
      method: 'PUT',
      data,
    });
  }

export async function deleteStudent(data) {
    let param = data.data
    return request('/api/studentManage/delete', {
        method: 'DELETE',
        data:param
    });
}
