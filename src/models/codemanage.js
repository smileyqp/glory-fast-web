import { queryCodelist,queryCodeRecordlist,createCodeFile } from '@/services/codemanage';
import { getUserInfo } from '@/utils/authority';
export default {
  namespace: 'codemanage',

  state: {
  },

  effects: {
    *fetchCodelist(_, { call, put }){
      const {payload} = _;
      const response = yield call(queryCodelist,payload)
      console.log(response)
      yield put({
        type: 'saveCodelist',
        payload: response.result,
      });
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
