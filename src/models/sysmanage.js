import { queryUserList, addUser,disableUser,queryPermissionList,queryRoleList,roleAdd,roleDelete,queryDictList,dictAdd,dictUpdate,dictDelete,childDictAdd,childDictUpdate,childDictDelete } from '@/services/sysmanage';
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
      const {payload} = _;
      const response = yield call(queryRoleList, payload);
      yield put({
        type: 'saveRoleList',
        payload: response.result,
      });
    },
    *addRole(_, { call, put }){
      const { payload } = _;
      debugger
      const {callback} = payload;
      console.log(payload)
      const response = yield call(roleAdd, payload);
      if (response.ok === true) {
        if (callback) callback(response);
      }
    },
    *deleteRole(_, { call, put }){
      const {payload} = _;
      const response = yield call(roleDelete, payload);
    },
    *fetchDictList(_, { call, put }){
      const {payload} = _;
      const response = yield call(queryDictList, payload);
      yield put({
        type: 'saveDictList',
        payload: response.result,
      });
    },
    *addDict(_, { call, put }){
      const { payload } = _;
      const {callback} = payload;
      console.log(payload)
      const response = yield call(dictAdd, payload);
      if (response.ok === true) {
        console.log(response)
        if (callback) callback(response);
      }
    },
    *updateDict(_, { call, put }){
      const {payload} = _;
      const response = yield call(dictUpdate, payload);
    },
    *deleteDict(_, { call, put }){
      const {payload} = _;
      console.log(payload)
      const {data} = payload
      console.log(data)
      console.log(payload)
      const response = yield call(dictDelete, payload);
    },
    *addChildDict(_, { call, put }){
      const {payload} = _;
      const response = yield call(childDictAdd, payload);
    },
    *updateChildDict(_, { call, put }){
      const {payload} = _;
      const response = yield call(childDictUpdate, payload);
    },
    *deleteChildDict(_, { call, put }){
      const {payload} = _;
      const response = yield call(childDictDelete, payload);
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
