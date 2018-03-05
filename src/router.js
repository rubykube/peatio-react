import React from 'react';
import { connect } from 'dva';
import { Router, Route, Switch, Link } from 'dva/router';
import { Layout, Menu, Icon, Badge } from 'antd';
import Countdown from 'react-countdown-now';

import AuthJWT from './components/Auth.js';
import IndexPage from './routes/IndexPage';
import PeatioCallback from './routes/PeatioCallback';
import logo from './assets/icons/logo.svg';
import APIMembers from './components/APIMembers.js';
import APIMembers1 from './components/APIMembers1.js';
import APIDeposit from './components/APIDeposit.js';
import APIDeposits from './components/APIDeposits.js';
import APIDepositAddress from './components/APIDepositAddress.js';
import APIOrder from './components/APIOrder.js';
import APIOrders from './components/APIOrders.js';
import APITimestamp from './components/APITimestamp.js';

const { Header, Content, Footer, Sider } = Layout;



class JWTTimer extends React.Component {
  render() {
    let status = "default";  
    let text = "JWT not verified";
    const auth = this.props.auth;
    console.log(this.props)
    if (auth) {
      if (auth.validUntil) {
        text = <span>JWT: <Countdown date={this.props.auth.validUntil} onComplete={()=>{console.log("<>")}}/></span>;

      }
      if (auth.userVerified){
        status = "success"
      } 
      if (auth.tokenError){
        status = "error";
        text = auth.tokenError.message;
      } 
    }

    return(
      <Badge style={{paddingLeft:12, minWidth: 200}} status={status} text={text} />
    )
 }
}

const JWTTimerConnected = connect(state=>{return { auth: state.auth }})(JWTTimer);

class APICall extends React.Component {
  render() {
    return(
      <Badge style={{paddingLeft:12}} status={this.props.visuals.currentApiCalls===0 ? "default":"processing"} text="API call" /> 
    )
 }
}

const APICallCannected = connect(state=>{return { visuals: state.visuals }})(APICall);

function RouterConfig({ history }) {
  return (
    <Router history={history}>
<Layout>
    <Sider
      style={{ background: '#fff', borderRight: '1px solid #e8e8e8' }}
      breakpoint="lg"
      collapsedWidth="0"
      onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
    >
      <div style={{textAlign: "center"}}>
      <img src={logo} style={{width:64}} />
      </div>

      <Menu mode="inline" defaultSelectedKeys={['4']} style={{borderRightWidth:0}}>
        <Menu.Item key="intro">
          <Link to="/">
            <span className="nav-text">Introduction</span>
          </Link>
        </Menu.Item>
        <Menu.ItemGroup title="Peatio SDK">
        <Menu.Item key="auth">
          <Link to="/auth"><Icon type="user" />
            <span className="nav-text">JWT Auth</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="Deposit">
        <Link to="/deposit">
          <Icon type="api" />
          <span className="nav-text">Deposit</span>
        </Link>
        </Menu.Item>
        <Menu.Item key="DepositAdress">
        <Link to="/depositAddress">
          <Icon type="api" />
          <span className="nav-text">Deposit Address</span>
        </Link>
        </Menu.Item>
        <Menu.Item key="Deposits">
        <Link to="/deposits">
          <Icon type="api" />
          <span className="nav-text">Deposits</span>
        </Link>
        </Menu.Item>
        <Menu.Item key="Members">
        <Link to="/members">
          <Icon type="api" />
          <span className="nav-text">Members</span>
        </Link>
        </Menu.Item>
        <Menu.Item key="Order">
        <Link to="/order">
          <Icon type="api" />
          <span className="nav-text">Order</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="Orders">
        <Link to="/orders">
          <Icon type="api" />
          <span className="nav-text">Orders</span>
        </Link>
        </Menu.Item>
        <Menu.Item key="Ticker">
        <Link to="/ticker">
          <Icon type="api" />
          <span className="nav-text">Ticker</span>
        </Link>
        </Menu.Item>
        <Menu.Item key="Timestamp">
        <Link to="/timestamp">
          <Icon type="api" />
          <span className="nav-text">Timestamp</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="Trades">
          <Icon type="api" />
          <span className="nav-text">Trades</span>
        </Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup title="Peatio API">
          <Menu.Item key="MembersApi">
          <Link to="/members1">
            <Icon type="api" />
            <span className="nav-text">Members</span>
          </Link>
          </Menu.Item>
        </Menu.ItemGroup>
      </Menu>
    </Sider>
    <Layout>
      <Header style={{ background: '#fff', padding: 0 }} >
        <JWTTimerConnected /><APICallCannected />
      </Header>
      <Content style={{ margin: '24px 16px 0' }}>
        <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
        
          <Switch>
            <Route path="/" exact component={IndexPage} />
            <Route path="/auth" exact component={AuthJWT} />
            <Route path="/callback" exact component={PeatioCallback} />
            <Route path="/members" exact component={APIMembers} />
            <Route path="/members1" exact component={APIMembers1} />
            <Route path="/deposits" exact component={APIDeposits} />
            <Route path="/deposit" exact component={APIDeposit} />
            <Route path="/depositAddress" exact component={APIDepositAddress} />
            <Route path="/order" exact component={APIOrder} />
            <Route path="/orders" exact component={APIOrders} />
            <Route path="/timestamp" exact component={APITimestamp} />
            
          </Switch>
        
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
       ©2018
      </Footer>
    </Layout>
  </Layout>
  </Router>

  );
}

export default RouterConfig;
