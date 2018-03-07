import React from 'react';
import { connect } from 'dva';
import config from '../../configuration.json';
import { Button, Card, Form, Divider } from 'antd';
import logo from '../assets/icons/icon.svg';


function mapStateToProps(state) {
  return { formMode: state.formMode };
}


class UniversalForm extends React.Component {
  render() {
  
    return(
      <div className="cardHolder">
        <img src={logo}  style={{width: 256, padding: 16}}/>
        <h1>Welcome to RKCP Api Demo</h1>
        Current configuration is:
        <p>Peatio: <a href={config.peatioBaseURL}>{config.peatioBaseURL}</a></p>
        <p>Barong: <a href={config.barongBaseURL}>{config.barongBaseURL}</a></p>
        Please, check that Peatio and Barong are up and running. This demo is configured to accept Barong development public key by default. 
        Configuraion is in <code>configuration.json</code>
        <h2>Classic Peatio - Barong login flow</h2>
        <Button href={config.peatioBaseURL} >Login with Peatio</Button>
        <h2>Using frontend login flow</h2>
        <Button href="/connect/barong" >Login with Barong</Button>
      </div>
    )
 }
}

export default connect(mapStateToProps)(UniversalForm);
