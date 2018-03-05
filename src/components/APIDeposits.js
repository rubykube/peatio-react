import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import JSONTree from 'react-json-tree';
import { Button, Card, Form, List, Row, Col, Alert } from 'antd';
import SimpleSchema from 'simpl-schema';
import queryString  from 'query-string';
import AutoForm from 'uniforms-antd/AutoForm';
import NumField from './NumField';
import LongTextField from 'uniforms-antd/LongTextField';


const ASchema = new SimpleSchema({

  currency: {
    type: String,
    optional: true
  },
  limit: {
    type: SimpleSchema.Integer,
    optional: true,
    uniforms: {
      component: NumField
    }
  },
  state: {
    type: String,
    optional: true
  }
});




function mapStateToProps(state) {
  return { 
    peatio: state.peatio
  };
}


class APIMembers extends React.Component {

  render() {

    const peatio = this.props.peatio;

    return(
      <div>
        <h1>DepositsApi</h1>
        <Row>
          <Col sm={24} md={12}>
            <Card>
            <h2>getV2Deposits(opts)</h2>

Get details of specific deposit.


                <AutoForm schema={ASchema} onSubmit={(doc)=>{
                  console.log(doc);
                  this.props.dispatch({type: "peatio/getV2Deposits", payload: doc})
                  } } />

            <Alert style={{marginTop: 16}} message="Check store on API call end" type="info" showIcon />
            </Card>
          </Col>
          <Col sm={24} md={12}>
            <h3>Redux store: \peatio</h3>
            <JSONTree data={{peatio}} />
          </Col>
        </Row>
    </div>
    )
 }
}

export default connect(mapStateToProps)(APIMembers);
