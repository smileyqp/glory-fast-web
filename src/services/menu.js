import request from '@/utils/request';
import { func } from 'prop-types';

export async function queryUsermenulist(){
    return request('/api/menu/getUserMenuList',{
        method:'GET'
    })
}
