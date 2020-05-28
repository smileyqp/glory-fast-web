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
      const response = yield call(queryLoginLog,payload)
      yield put({
        type: 'saveLoginLog',
        payload: response.result,
      });
    },
    *fetchOperateloglist(_, { call, put }){
        const {payload} = _;
        const response = yield call(queryOperateLog,payload)
        yield put({
          type: 'saveOperateLog',
          payload: response.result,
        });
    },
    *fetchDebugloglist(_, { call, put }){
        const {payload} = _;
        const response = yield call(queryDebugLog,payload)
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
            ...state.loginlog,
            operateloglist: action.payload,
          },
        };
    },
    saveDebugLog(state, action) {
        return {
          ...state,
          debuglog: {
            ...state.loginlog,
            debugloglist: action.payload,
          },
        };
      },
  },
};
