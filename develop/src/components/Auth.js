import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import JSONTree from 'react-json-tree';
import { Button, Card, Form, List, Row, Col, Alert } from 'antd';
import SimpleSchema from 'simpl-schema';
import queryString  from 'query-string';
import AutoForm from 'uniforms-antd/AutoForm';
import LongTextField from 'uniforms-antd/LongTextField';

const AuthSchema = new SimpleSchema({
  jwt: {
    type: String,
    uniforms: {
      component: LongTextField
    }
  }
});


function mapStateToProps(state) {
  return { 
    auth: state.auth
  };
}


class AuthDemo extends React.Component {

  render() {
  
    const auth = this.props.auth;

    const content = auth.jwtToken ? auth.decodedToken ?
     <div><h2>{auth.decodedToken.email}</h2>

      <List
        size="small"
        header={<div>Audience Claim</div>}
        bordered
        dataSource={auth.decodedToken.aud}
        renderItem={item => (<List.Item>{item}</List.Item>)}
      />
     </div> : <div>nothing to display</div>
     : <Alert type="error" message="No JWT token in store"/>;
    
    return(
      <div>
        <h1>Peatio API JWT</h1>
        <Row>
          <Col sm={24} md={12}>
            <Card>
              {content}
                <h2>Manually set JWT</h2>
                <AutoForm schema={AuthSchema} onSubmit={(doc)=>{
                  console.log(doc);
                  this.props.dispatch({type: "auth/verifyToken", payload: doc.jwt})
                  } } />
            </Card>
          </Col>
          <Col sm={24} md={12}>
            <h2>Redux store: \auth</h2>
            <JSONTree data={{auth}} />
          </Col>
        </Row>
    </div>
    )
 }
}

export default connect(mapStateToProps)(AuthDemo);
