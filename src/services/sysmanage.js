import request from '@/utils/request';

export async function queryUserList() {
    return request('/api/user/list', {
        method: 'POST',
        data: {
            pageSize:10,
            pageNo:1
          },
      });
}


