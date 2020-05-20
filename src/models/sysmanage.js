import {  queryUserList } from '@/services/sysmanage';
import {getUserInfo} from '@/utils/authority'
export default {
  namespace: 'sysmanage',

  state: {
    usermanage: {},
  },

  effects: {
    *fetchUserList(_, { call, put }) {
       const response = yield call(queryUserList);
       console.log(response)
      yield put({
        type: 'saveUserList',
        payload: response.result,
      });
    },
  },

  reducers: {
    saveUserList(state, action) {
        console.log(action)
      return {
        ...state,
        usermanage: {
          ...state.usermanage,
          userlist: action.payload,
        },
      };
    },
  },
};
