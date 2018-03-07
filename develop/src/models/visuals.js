import { notification } from 'antd';

export default {

  namespace: 'visuals',

  state: {
    currentApiCalls: 0
  },

  subscriptions: {
    setup({ dispatch, history }) {  
    },
  },

  effects: {
    *notifyError({ payload }, { call, put }) {  
      // yield put({ type: 'save' });
      yield notification.error({
        message: payload.message,
        description: payload.description
      });
    },
  },

  reducers: {
    callStarted(state, action) {
      return { ...state, currentApiCalls: state.currentApiCalls + 1 };
    },
    callEnded(state, action) {
      return { ...state, currentApiCalls: state.currentApiCalls - 1 };
    },
  },

};
