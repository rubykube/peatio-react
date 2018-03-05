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
    peatio: state.peatio
  };
}


class APITimestamp extends React.Component {

  render() {
  
    const peatio = this.props.peatio;

  
    return(
      <div>
        <h1>TimestampApi</h1>
        <Row>
          <Col sm={24} md={12}>
            <Card title="timestamp">
              Get server current time, in seconds since Unix epoch.
            <p>
              <Button 
                type="primary"
                onClick={()=>{
                this.props.dispatch({type: "peatio/timestamp"})
                }}>Submit</Button>
            </p>
            <Alert message="Check store on API call end" type="info" showIcon />
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

export default connect(mapStateToProps)(APITimestamp);
