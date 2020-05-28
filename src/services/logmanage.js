import request from '@/utils/request';
import { func } from 'prop-types';

export async function queryLoginLog(data){
    return request('/api/loginLog/list',{
        method:'POST',
        data
    })
}

export async function queryOperateLog (data) {
    return request('/api/handleLog/list',{
        method:'POST',
        data
    })
}

export async function queryDebugLog (data) {
    return request('/api/debugLog/list',{
        method:'POST',
        data
    })
}