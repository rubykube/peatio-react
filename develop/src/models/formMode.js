
export default {

  namespace: 'formMode',

  state: {
    mode: 'login',
    animation: { repeat: 0, duration: 1000, left: 'unset', right: 0, rotate:360 }
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
