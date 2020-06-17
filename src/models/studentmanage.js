import { queryStudentList,addStudent,editStudent,deleteStudent } from '@/pages/StudentManege/StudentManageService';
import { getUserInfo } from '@/utils/authority';
export default {
  namespace: 'studentmanage',

  state: {
  },

  effects: {
    /* 生成代码记录列表 */
    *fetchStudentList(_, { call, put }){
      const {payload} = _;
      const { callback } = payload;
      const response = yield call(queryStudentList,payload)
      if (response.status === 200) {
        if (callback) callback(response.result);
      }
      yield put({
        type: 'saveStudentList', 
        payload: response.result,
      });
    },
    /* 新增数据库表 */
    *fetchAddStudent(_, { call, put }) {
      const { payload } = _;
      const {callback} = payload;
      const response = yield call(addStudent, payload);
      if (response.status === 200) {
        if (callback) callback(response);
      }
    },
    /* 编辑数据库表 */
    *fetchEditStudent(_, { call, put }) {
        const { payload } = _;
        const {callback} = payload;
        const response = yield call(editStudent, payload);
        if (response.status === 200) {
          if (callback) callback(response);
        }
      },
    *fetchDeleteStudent(_, { call, put }) {
        const { payload } = _;
        const {callback} = payload;
        const response = yield call(deleteStudent, payload);
        if (response.status === 200) {
          if (callback) callback(response);
        }
      },
  },

  reducers: {
    saveStudentList(state, action) {
        console.log(action.payload)
      return {
        ...state,
        studentlist: action.payload
      };
    },
  },
};
