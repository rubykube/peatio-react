import { channel } from 'redux-saga'
import PeatioSdk from 'peatio-sdk'
import config from '../../configuration.json';
import { notification } from 'antd';

const ApiChannel = channel()
var defaultClient = PeatioSdk.ApiClient.instance;
defaultClient.basePath = 'http://peatio:8000/api/v2'.replace(/\/+$/, '');


export default {
  namespace: 'peatio',

  state: {
    me: {}
  },

  subscriptions: {
    setup({ dispatch, history }) {
      dispatch({type: 'callbacks'})
    },
  },

  effects: {
    *timestamp({ payload }, {put, call, select}) {
      yield put({type: "visuals/callStarted"});

      var apiInstance = new PeatioSdk.TimestampApi();
      apiInstance.timestamp((error, data)=>ApiChannel.put({
        type: "timestampCallback",
        payload: {error, data}
      }));  
    },
    *APIgetV2MembersMe({ payload }, {put, call, select}) {
      yield put({type: "visuals/callStarted"});

      const data = yield select();
      const jwt = data.auth ? data.auth.jwtToken : "";
      try {
        const res = yield fetch(`${config.peatioBaseURL}/api/v2/members/me`, 
          {
            method: 'GET', 
            headers: {
              'Authorization': `Bearer ${jwt}`
            },
          })
        console.log("Status", res.status);
        console.log("StatusText", res.statusText);
        const resJson = yield res.json();
        yield put({ type: 'save', payload: {me: resJson}});
        
      } catch(error) {
        console.log(error);
        yield put({ type: 'save', payload: {me: {error: error}}});
        yield put({ type: 'visuals/notifyError', payload: { message: "Error: MembersMe",  description: error.message}});
      }
      yield put({type: "visuals/callEnded"});
    },
    *getV2MembersMe({ payload }, {put, call, select}) {
      yield put({type: "visuals/callStarted"});

      const data = yield select();

      console.log("DATA", data)
      var jwt = defaultClient.authentications['jwt'];
      
      jwt.accessToken = data.auth.jwtToken;
      var apiInstance = new PeatioSdk.MembersApi();
      apiInstance.getV2MembersMe((error, data, response)=>ApiChannel.put({
        type: "getV2MembersMeCallback",
        payload: {error, data, response}
      }));  
    },
    *getV2Deposit({ payload }, {put, call, select}) {
      yield put({type: "visuals/callStarted"});

      const data = yield select();

      var jwt = defaultClient.authentications['jwt'];
      
      jwt.accessToken = data.auth.jwtToken;
      var apiInstance = new PeatioSdk.DepositApi();
      console.log("getV2Deposit PAYLOAD:", payload);

      apiInstance.getV2Deposit(payload.txid, (error, data, response)=>ApiChannel.put({
        type: "getV2DepositCallback",
        payload: {error, data, response}
      }));  
    },
    *getV2DepositAddress({ payload }, {put, call, select}) {
      yield put({type: "visuals/callStarted"});

      const data = yield select();

      var jwt = defaultClient.authentications['jwt'];
      
      jwt.accessToken = data.auth.jwtToken;
      var apiInstance = new PeatioSdk.DepositAddressApi();
      console.log("getV2DepositAddress PAYLOAD:", payload);

      apiInstance.getV2DepositAddress(payload.currency, (error, data, response)=>ApiChannel.put({
        type: "getV2DepositCallback",
        payload: {error, data, response}
      }));  
    },
    *getV2Deposits({ payload }, {put, call, select}) {
      yield put({type: "visuals/callStarted"});

      const data = yield select();

      var jwt = defaultClient.authentications['jwt'];
      
      jwt.accessToken = data.auth.jwtToken;
      var apiInstance = new PeatioSdk.DepositsApi();
      console.log("getV2Deposits PAYLOAD:", payload);

      apiInstance.getV2Deposits(payload, (error, data)=>ApiChannel.put({
        type: "getV2DepositsCallback",
        payload: {error, data}
      }));  
    },
    *callbacks({ }, {put, take}) {
      while (true) {
        const { type, payload } = yield take(ApiChannel);
        console.log("API CALLBACK:", type, payload)
        switch(type) {
          
          case 'timestampCallback':
            if (payload.error) {
              yield put({ type: 'save', payload: {timestamp: {error: payload.error}}});
              yield put({ type: 'visuals/notifyError', payload: { message: "Error: timestamp",  description: payload.error.message}});

            } else {
              yield put({ type: 'save', payload: {timestamp: payload.data}});
            }
            
            break;
          case 'getV2MembersMeCallback':
            if (payload.error) {
              yield put({ type: 'save', payload: {me: {error: payload.error}}});
              yield put({ type: 'visuals/notifyError', payload: { message: "Error: MembersMe",  description: payload.error.message}});

            } else {
              yield put({ type: 'save', payload: {me: payload.data}});
            }
            
            break;
          case 'getV2DepositsCallback':
            if (payload.error) {
              yield put({ type: 'save', payload: {deposits: {error: payload.error}}});
              yield put({ type: 'visuals/notifyError', payload: { message: "Error: Deposits",  description: payload.error.message}});
            } else {
              yield put({ type: 'save', payload: {deposits: payload.data}});
            }
          break;
          case 'getV2DepositAddressCallback':
            if (payload.error) {
              yield put({ type: 'save', payload: {depositAddress: {error: payload.error}}});
              yield put({ type: 'visuals/notifyError', payload: { message: "Error: DepositAddress",  description: payload.error.message}});
            } else {
              yield put({ type: 'save', payload: {depositAddress: payload.data}});
            }
          break;
          case 'getV2DepositCallback':
            if (payload.error) {
              yield put({ type: 'save', payload: {deposit: {error: payload.error}}});
              yield put({ type: 'visuals/notifyError', payload: { message: "Error: Deposit",  description: payload.error.message}});
            } else {
              yield put({ type: 'save', payload: {deposit: payload.data}});
            }
          break;
        }
        yield put({type: "visuals/callEnded"});

      }
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
