import { queryUserList, addUser } from '@/services/sysmanage';
import { getUserInfo } from '@/utils/authority';
export default {
  namespace: 'sysmanage',

  state: {
    usermanage: {},
  },

  effects: {
    *fetchUserList(_, { call, put }) {
      console.log(_);
      const { payload } = _;
      const { callback } = payload;
      const response = yield call(queryUserList, payload);
      console.log(response);
      if (response.ok === true) {
        console.log(response.result);
        if (callback) callback(response.result);
      }
      yield put({
        type: 'saveUserList',
        payload: response.result,
      });
    },
    *addUser(_, { call, put }) {
      const { payload } = _;
      console.log(_);
      console.log(payload);
      const response = yield call(addUser, payload);
      if (response.ok === true) {
        if (callback) callback(response.result);
      }
    },
  },

  reducers: {
    saveUserList(state, action) {
      console.log(action);
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
