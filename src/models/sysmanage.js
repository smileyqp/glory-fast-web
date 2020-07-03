import { validateCode,queryUserList, addUser,disableUser,deleteUser,updateUser,exportUser,uploadInfo,queryPermissionList,permissionListAdd,permissionListEdit,permissionListDelete,queryRoleList,roleAdd,roleEdit,roleDelete,queryDictList,dictAdd,dictUpdate,dictDelete,childDictAdd,childDictUpdate,childDictDelete, queryChildDictList,roleAuthorize,fetchroleAuthorize } from '@/services/sysmanage';
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
    *exportUser(_, { call, put }) {
      const { payload } = _;
      const { callback } = payload;
      const response = yield call(exportUser, payload);
      console.log(response)
      yield put({
        type: 'downloadUserlist',
        payload: response,
      });
      if (response.ok === true) {
        console.log(response)
        if (callback) callback(response);
      }
    },
    *uploadInfo(_, { call, put }) {
      const { payload } = _;
      console.log(payload)
      const { callback } = payload;
      const response = yield call(uploadInfo, payload);
      console.log(response)
      
      if (response.ok === true) {
        console.log(response)
        if (callback) callback(response);
      }
    },
    
    *deleteUser(_, { call, put }) {
      const { payload } = _;
      const { callback } = payload;
      console.log(payload)
      const response = yield call(deleteUser, payload);
      if (response.status === 200) {
        console.log(response)
        if (callback) callback(response);
      }
    },
    *updateUser(_, { call, put }){
      const { payload } = _;
      const {callback} = payload;
      console.log(payload)
      const response = yield call(updateUser, payload);
      console.log(response)
      if (response.status === 200) {
        if (callback) callback(response);
      }
    },
    *fetchPermissionList(_, { call, put }) {
      const response = yield call(queryPermissionList);
      yield put({
        type: 'savePermissionList',
        payload: response.result,
      });
    },
    *addPermissionList(_, { call, put }) {
      const { payload } = _;
      const {callback} = payload;
      const response = yield call(permissionListAdd,payload);
      if (response.ok === true) {
        if (callback) callback(response);
      }
    },
    *editPermissionList(_, { call, put }) {
      const { payload } = _;
      const {callback} = payload;
      const response = yield call(permissionListEdit,payload);
      if (response.ok === true) {
        if (callback) callback(response);
      }
    },
    *deletePermissionList(_, { call, put }) {
      const { payload } = _;
      const { callback } = payload;
      console.log(payload)
      const response = yield call(permissionListDelete, payload);
      if (response.status === 200) {
        console.log(response)
        if (callback) callback(response);
      }
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
      const {callback} = payload;
      const response = yield call(roleAdd, payload);
      if (response.ok === true) {
        if (callback) callback(response);
      }
    },
    *editRole(_, { call, put }){
      const { payload } = _;
      const {callback} = payload;
      console.log(payload)
      const response = yield call(roleEdit, payload);
      if (response.ok === true) {
        if (callback) callback(response);
      }
    },
    *deleteRole(_, { call, put }){
      const {payload} = _;
      const {callback} = payload;
      const response = yield call(roleDelete, payload);
      if (response.ok === true) {
        if (callback) callback(response);
      }
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
      const response = yield call(dictAdd, payload);
      if (response.ok === true) {
        if (callback) callback(response);
      }
    },
    *updateDict(_, { call, put }){
      const {payload} = _;
      const {callback} = payload;
      const response = yield call(dictUpdate, payload);
      if (response.ok === true) {
        if (callback) callback(response);
      }
    },
    *deleteDict(_, { call, put }){
      const {payload} = _;
      const {callback} = payload
      const response = yield call(dictDelete, payload);
      if (response.ok === true) {
        if (callback) callback(response);
      }
    },
    *fetchChildDictList(_, { call, put }){
      const {payload} = _;
      const response = yield call(queryChildDictList, payload);
      yield put({
        type: 'saveChildDictList',
        payload: response.result,
      });
    },

    *addChildDict(_, { call, put }){
      const {payload} = _;
      const { callback } = payload;
      const response = yield call(childDictAdd, payload);
      if (response.ok === true) {
        if (callback) callback(response);
      }
    },
    *updateChildDict(_, { call, put }){
      const {payload} = _;
      const { callback } = payload;
      const response = yield call(childDictUpdate, payload);
      if (response.status === 200) {
        if (callback) callback(response);
      }
    },
    *deleteChildDict(_, { call, put }){
      const {payload} = _;
      const {callback } = payload; 
      const response = yield call(childDictDelete, payload);
      if (response.ok === true) {
        if (callback) callback(response);
      }
    },


    // *detchLoginloglist(_, { call, put }){
    //   const {payload} = _;
    //   const response = yield call(queryLoginLog,payload)
    // },
    *validatecode(_, { call, put }){
      const {payload} = _;
      const {callback } = payload; 
      const response = yield call(validateCode, payload);
      if (callback) callback(response);
    },
    *roleauthorize(_, { call, put }){
      const {payload} = _;
      const {callback } = payload; 
      const response = yield call(roleAuthorize, payload);
      if (callback) callback(response);
    },
    *fetchroleAuthorize(_, { call, put }){
      const {payload} = _;
      const {callback } = payload; 
      const response = yield call(fetchroleAuthorize, payload);
      if (callback) callback(response);
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
    },
    saveChildDictList(state,action){
      return {
        ...state,
        dictmanage:{
          ...state.dictmanage,
          dictlistchild:action.payload
        }
      }
    },
    downloadUserlist(state,action){
      if (window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(blob, 'smile.xls');
      } else {
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(new Blob([action.payload],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}));
        link.download = 'smile.xls';
        //此写法兼容可火狐浏览器
        document.body.appendChild(link);
        var evt = document.createEvent("MouseEvents");
        evt.initEvent("click", false, false);
        link.dispatchEvent(evt);
        document.body.removeChild(link);
      }
      return {...state}
    }
  },
};
