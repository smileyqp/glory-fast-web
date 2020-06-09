import request from '@/utils/request';
import { func } from 'prop-types';

export async function queryCodelist(data) {
  console.log(data);
  return request('/api/genCodeTable/getTablePageList', {
    method: 'POST',
    data,
  });
}