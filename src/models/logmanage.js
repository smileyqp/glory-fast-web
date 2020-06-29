import { queryLoginLog ,queryOperateLog ,queryDebugLog} from '@/services/logmanage';
import { getUserInfo } from '@/utils/authority';
export default {
  namespace: 'logmanage',

  state: {
    loginlog: {},
    operatelog:{},
    debuglog:{},
  },

  effects: {
    *fetchLoginloglist(_, { call, put }){
      const {payload} = _;
      const {callback} = payload;
      const response = yield call(queryLoginLog,payload)
      if (callback) callback(response)
      yield put({
        type: 'saveLoginLog',
        payload: response.result,
      });
    },
    *fetchOperateloglist(_, { call, put }){
        const {payload} = _;
        const {callback} = payload;
        const response = yield call(queryOperateLog,payload)
        if (callback) callback(response)
        yield put({
          type: 'saveOperateLog',
          payload: response.result,
        });
    },
    *fetchDebugloglist(_, { call, put }){
        const {payload} = _;
        const {callback} = payload;
        const response = yield call(queryDebugLog,payload)
        if (callback) callback(response)
        yield put({
          type: 'saveDebugLog',
          payload: response.result,
        });
      }
  },

  reducers: {
    saveLoginLog(state, action) {
      return {
        ...state,
        loginlog: {
          ...state.loginlog,
          loginloglist: action.payload,
        },
      };
    },
    saveOperateLog(state, action) {
        return {
          ...state,
          operatelog: {
            ...state.operatelog,
            operateloglist: action.payload,
          },
        };
    },
    saveDebugLog(state, action) {
        return {
          ...state,
          debuglog: {
            ...state.debuglog,
            debugloglist: action.payload,
          },
        };
      },
  },
};
