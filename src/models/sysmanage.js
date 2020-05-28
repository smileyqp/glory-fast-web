import { queryUserList, addUser,disableUser,queryPermissionList,queryRoleList,queryDictList } from '@/services/sysmanage';
import { getUserInfo } from '@/utils/authority';
export default {
  namespace: 'sysmanage',

  state: {
    usermanage: {},
    permissionlistmanage:{},
    rolemanage:{},
    dictmanage:{}
  },

  effects: {
    *fetchUserList(_, { call, put }) {
      const { payload } = _;
      const { callback } = payload;
      const response = yield call(queryUserList, payload);
      if (response.ok === true) {
        if (callback) callback(response.result);
      }
      yield put({
        type: 'saveUserList',
        payload: response.result,
      });
    },
    *addUser(_, { call, put }) {
      const { payload } = _;
      const {callback} = payload;
      const response = yield call(addUser, payload);
      if (response.ok === true) {
        if (callback) callback(response);
      }
    },
    *disableUser(_, { call, put }) {
      const { payload } = _;
      const { callback } = payload;
      const response = yield call(disableUser, payload);
      if (response.ok === true) {
        console.log(response)
        if (callback) callback(response);
      }
    },
    *fetchPermissionList(_, { call, put }) {
     
      const response = yield call(queryPermissionList);
      // if (response.ok === true) {
      //   console.log(response.result);
      //   if (callback) callback(response.result);
      // }
      yield put({
        type: 'savePermissionList',
        payload: response.result,
      });
    },
    *fetchRoleList(_, { call, put }) {
     
      const response = yield call(queryRoleList);
      yield put({
        type: 'saveRoleList',
        payload: response.result,
      });
      console.log(response);
      // if (response.ok === true) {
      //   console.log(response.result);
      //   if (callback) callback(response.result);
      // }
     
   
    },
    *fetchDictList(_, { call, put }){
      const {payload} = _;
      const response = yield call(queryDictList, payload);
      yield put({
        type: 'saveDictList',
        payload: response.result,
      });
    },
    *detchLoginloglist(_, { call, put }){
      const {payload} = _;
      const response = yield call(queryLoginLog,payload)
    }
  },

  reducers: {
    saveUserList(state, action) {
      return {
        ...state,
        usermanage: {
          ...state.usermanage,
          userlist: action.payload,
        },
      };
    },
    savePermissionList(state, action){
      return {
        ...state,
        permissionlistmanage: {
          ...state.permissionlistmanage,
          permissionlist: action.payload,
        },
      };
    },
    saveRoleList(state, action){
      return {
        ...state,
        rolemanage: {
          ...state.rolemanage,
          rolelist: action.payload,
        },
      };
    },
    saveDictList(state,action){
      return {
        ...state,
        dictmanage:{
          ...state.dictmanage,
          dictlist:action.payload
        }
      }
    }
  },
};
