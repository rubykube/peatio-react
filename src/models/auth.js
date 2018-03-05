import { channel } from 'redux-saga'
import JWT from 'jsonwebtoken';
import config from '../../configuration.json';
import base64 from 'base-64';

const JWTVerifyChannel = channel()

export default {

  namespace: 'auth',

  state: {
    decodedToken: {

    },
    tokenError: null,
    validUntil: null,
    userVerified: false,
    jwtToken: ''
  },

  subscriptions: {
    setup({ dispatch, history }) {
      dispatch({type: 'verifiedToken'})
    },
  },

  effects: {
    *verifyToken({ payload }, {put, call}) {
      const token = payload;
      
      JWT.verify(token, base64.decode(config.barongPublicKey), {algotithms: ['RS256']}, 
        (err, decoded)=>JWTVerifyChannel.put({
          type: "VERIFIED",
          payload: {err, decoded}
        }) 
      );
      yield put({
        type: 'save', payload: {
          jwtToken: token
        }
      })
    },
    *verifiedToken({ }, {put, take}) {
      while (true) {
        const { payload } = yield take(JWTVerifyChannel);
        const verified = !payload.err ? true : false;
        const validUntil = verified && payload.decoded && payload.decoded.exp ? new Date(payload.decoded.exp * 1000) : null;

        const res = { type: 'save' , payload: {
          userVerified: verified,
          tokenError: payload.err,
          validUntil: validUntil,
          decodedToken: payload.decoded
        }}
      
        yield put(res)
      }
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
