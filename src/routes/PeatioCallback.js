import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Card } from 'antd';
import queryString  from 'query-string';


function mapStateToProps(state) {
  return { 
    auth: state.auth
  };
}


class PeatioCallback extends React.Component {
  componentWillMount(){
    const parsedLs = queryString.parse(this.props.location.search);
    const jwt = parsedLs.token;
    if (jwt) {
      this.props.dispatch({type: "auth/verifyToken", payload: jwt})
    }
  }
  render() {
    if (this.props.auth) {
      this.props.dispatch(routerRedux.push('/auth'))
    }

    const auth = this.props.auth;
    const content = auth.decodedToken ?
    <div><h2>{auth.decodedToken.email}</h2>

    </div> : <div>nothing to display</div>
    
    return(
      <div>
       <Card>
        {content}
      </Card>
    </div>
    )
 }
}

export default connect(mapStateToProps)(PeatioCallback);
