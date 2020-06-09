import { queryCodelist } from '@/services/codemanage';
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
  },

  reducers: {
    saveCodelist(state, action) {
        console.log(action.payload)
      return {
        ...state,
        codelist: action.payload
      };
    },
  
  },
};
