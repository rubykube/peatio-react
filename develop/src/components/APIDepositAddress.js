import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import JSONTree from 'react-json-tree';
import { Button, Card, Form, List, Row, Col, Alert } from 'antd';
import SimpleSchema from 'simpl-schema';
import queryString  from 'query-string';
import AutoForm from 'uniforms-antd/AutoForm';
import LongTextField from 'uniforms-antd/LongTextField';

const ASchema = new SimpleSchema({

  currency: {
      type: String,
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
        <h1>DepositAddressApi</h1>
        <Row>
          <Col sm={24} md={12}>
            <Card>
            <h2>getV2DepositAddress(currency)</h2>

Where to deposit. The address field could be empty when a new address is generating (e.g. for bitcoin), you should try again later in that case.


                <AutoForm schema={ASchema} onSubmit={(doc)=>{
                  console.log(doc);
                  this.props.dispatch({type: "peatio/getV2DepositAddress", payload: doc})
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
