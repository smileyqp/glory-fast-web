import { queryCodelist,addCode,editCode,queryCodeRecordlist,addCodeRecord,createCodeFile,deleteCode } from '@/services/codemanage';
import { getUserInfo } from '@/utils/authority';
export default {
  namespace: 'codemanage',

  state: {
  },

  effects: {
    /* 获取数据库表列表 */
    *fetchCodelist(_, { call, put }){
      const {payload} = _;
      const response = yield call(queryCodelist,payload)
      console.log(response)
      yield put({
        type: 'saveCodelist',
        payload: response.result,
      });
    },
    /* 新增数据库表 */
    *addCode(_, { call, put }) {
      const { payload } = _;
      const {callback} = payload;
      const response = yield call(addCode, payload);
      if (response.ok === true) {
        if (callback) callback(response);
      }
    },
    /* 编辑数据库表 */
    *editCode(_, { call, put }) {
        const { payload } = _;
        const {callback} = payload;
        const response = yield call(editCode, payload);
        if (response.ok === true) {
          if (callback) callback(response);
        }
      },
    *deleteCode(_, { call, put }) {
        const { payload } = _;
        const {callback} = payload;
        const response = yield call(deleteCode, payload);
        if (response.ok === true) {
          if (callback) callback(response);
        }
      },
    /* 生成代码记录列表 */
    *fetchCodeRecordlist(_, { call, put }){
      const {payload} = _;
      const response = yield call(queryCodeRecordlist,payload)
      console.log(response)
      yield put({
        type: 'saveCodeRecordlist',
        payload: response.result,
      });
    },
    /* 新增代码记录 */
    *addCodeRecord(_, { call, put }) {
      const { payload } = _;
      const {callback} = payload;
      const response = yield call(addCodeRecord, payload);
      if (response.ok === true) {
        if (callback) callback(response);
      }
    },
    
    /* 生成代码 */
    *fetchCreateCodeFile(_, { call, put }){
      const { payload } = _;
      const { callback } = payload;
      const response = yield call(createCodeFile, payload);
      if (response.ok === true) {
        console.log(response)
        if (callback) callback(response);
      }
    },

  },

  reducers: {
    saveCodelist(state, action) {
        console.log(action.payload)
      return {
        ...state,
        codelist: action.payload
      };
    },
    saveCodeRecordlist(state, action){
      return {
        ...state,
        codeRecordlist: action.payload
      };
    },
  
  },
};
