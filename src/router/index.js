import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import loadable from '@loadable/component'

const Login = loadable(() => import('Components/pages/Login'));
const Dashboard = loadable(() => import('Components/pages/Dashboard'));
const Roi = loadable(() => import('Components/pages/Roi'));
const Homepage = loadable(() => import('Components/pages/Homepage'));
const Pr = loadable(() => import('Components/pages/Pr'));
const Sns = loadable(() => import('Components/pages/Sns'));
const Ad = loadable(() => import('Components/pages/Ad'));
const Promotion = loadable(() => import('Components/pages/Promotion'));
const Event = loadable(() => import('Components/pages/Event'));
const EventG = loadable(() => import('Components/pages/EventG'));
const Newsletter = loadable(() => import('Components/pages/Newsletter'));
const Clevel = loadable(() => import('Components/pages/Clevel'));
const Materials = loadable(() => import('Components/pages/Materials'));
const Inbound = loadable(() => import('Components/pages/Inbound'));
const InboundG = loadable(() => import('Components/pages/InboundG'));
const Webtoon = loadable(() => import('Components/pages/webtoon'));
const Video = loadable(() => import('Components/pages/Video'));
const Award = loadable(() => import('Components/pages/Award'));

export default () => {
  return (
    <Router basename="/dto">
      <Route exact path="/" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/roi" component={Roi} />
      <Route path="/homepage" component={Homepage} />
      <Route path="/pr" component={Pr} />
      <Route path="/sns" component={Sns} />
      <Route path="/ad" component={Ad} />
      <Route path="/promotion" component={Promotion} />
      <Route path="/event" component={Event} />
      <Route path="/eventg" component={EventG} />
      <Route path="/newsletter" component={Newsletter} />
      <Route path="/clevel" component={Clevel} />
      <Route path="/materials" component={Materials} />
      <Route path="/inbound" component={Inbound} />
      <Route path="/inboundg" component={InboundG} />
      <Route path="/Webtoon" component={Webtoon} />
      <Route path="/Video" component={Video} />
      <Route path="/Award" component={Award} />
      {/* <Route exact path="/" component={Signin} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/roi" component={Roi} />
      <Route path="/input" component={Input}/> */}
    </Router>
  )
}
