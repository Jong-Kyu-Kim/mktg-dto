import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
// import { useQuery } from '@apollo/react-hooks';
// import { gql } from 'apollo-boost';
import moment from 'moment-business-days';
// import loadable from '@loadable/component'
import useQuery from '../hooks/useQuery';

import MenuItem from './MenuItem';

import AssignmentOutlined from '@material-ui/icons/AssignmentOutlined';
import LanguageOutlined from '@material-ui/icons/LanguageOutlined';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import BlurOnOutlined from '@material-ui/icons/BlurOnOutlined';
import WebAssetOutlined from '@material-ui/icons/WebAssetOutlined';
import InsertChartOutlined from '@material-ui/icons/InsertChartOutlined';
import FlagOutlined from '@material-ui/icons/FlagOutlined';
import PlaceOutlined from '@material-ui/icons/PlaceOutlined';
import BallotOutlined from '@material-ui/icons/BallotOutlined';
import HighlightOutlined from '@material-ui/icons/HighlightOutlined';
import LocalOfferOutlined from '@material-ui/icons/LocalOfferOutlined';
import PlayArrowOutlined from '@material-ui/icons/PlayArrowOutlined';
import PlayCircleFilledWhiteOutlined from '@material-ui/icons/PlayCircleFilledWhiteOutlined';
import PublicOutlined from '@material-ui/icons/PublicOutlined';
import PaletteOutlined from '@material-ui/icons/PaletteOutlined';
import StarBorder from '@material-ui/icons/StarBorder';
import PermIdentity from '@material-ui/icons/PermIdentity';

const MENU = styled.div`
  min-width: 240px;
  min-height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  z-index: 1;
  background-color: #fff;
  border-right: 1px solid #edeff3;
`;

const H1 = styled.h1`
  padding: 33px 25px;
  a {
    font-size: 24px;
    /* font-weight: 900; */
    span {
      line-height: 1.25;
      font-size: 24px;
      color: #3b94e2;
    }
  }
`;

const SPAN = styled.span`
  margin: 15px 0 10px 25px;
  color: #9ea0a5;
`;

const filter = {
  category: [],
  // fromDate: moment(new Date()).subtract(1, 'days').format('YYYY-MM-DD'),
  // toDate: moment(new Date()).format('YYYY-MM-DD')
  fromDate: moment(new Date()).prevBusinessDay().format('YYYY-MM-DD'),
  toDate: moment(new Date()).subtract(1, 'days').format('YYYY-MM-DD'),
};

export default () => {
  //const [loading, data] = useQuery(filter);

  //if (loading) return <MENU />;

  //const { effectTrend, inboundEffectLogs } = data;
  const effect = (category) =>
    //effectTrend ? effectTrend.map(({ _id }) => _id).indexOf(category) < 0 : false
    false;

  return (
    <MENU>
      <H1>
        <Link to={location.pathname === '/dto/dashboard' ? '/' : '/dashboard'}>
          <span>MKTG</span> DTO
        </Link>
      </H1>
      <nav>
        <ul role="menu" aria-orientation="vertical">
          <MenuItem to="/dashboard" icon={InsertChartOutlined} title="Dashboard" />
          <MenuItem to="/roi" icon={PermIdentity} title="ROI" />
          <li role="none presentation">
            <SPAN id="labelInput">Category</SPAN>
            <ul role="none presentation" aria-labelledby="labelInput">
              <MenuItem to="/homepage" icon={WebAssetOutlined} title="Homepage" err={effect('Homepage')} />
              <MenuItem to="/pr" icon={AssignmentOutlined} title="PR" />
              <MenuItem to="/sns" icon={ThumbUpAltOutlined} title="SNS" err={effect('SNS')} />
              <MenuItem to="/ad" icon={FlagOutlined} title="AD" err={effect('AD')} />
              <MenuItem to="/promotion" icon={BlurOnOutlined} title="Promotion" />
              <MenuItem to="/event" icon={PlaceOutlined} title="Event" />
              <MenuItem to="/eventg" icon={LanguageOutlined} title="Event(G)" />
              <MenuItem to="/newsletter" icon={BallotOutlined} title="Newsletter" />
              <MenuItem to="/clevel" icon={HighlightOutlined} title="C-Level" />
              <MenuItem to="/materials" icon={LocalOfferOutlined} title="Materials" />
              <MenuItem to="/inbound" icon={PlayArrowOutlined} title="Inbound" />
              <MenuItem to="/inboundg" icon={PublicOutlined} title="Inbound(G)" />
              <MenuItem to="/video" icon={PlayCircleFilledWhiteOutlined} title="Video" />
              <MenuItem to="/webtoon" icon={PaletteOutlined} title="Webtoon" />
              <MenuItem to="/award" icon={StarBorder} title="Award" />
            </ul>
          </li>
        </ul>
      </nav>
    </MENU>
  );
};
