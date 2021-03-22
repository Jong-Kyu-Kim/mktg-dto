import React from 'react';
import moment from 'moment';
import Layout from '../Layout';
import VerticalBarChart from '../charts/VerticalBarChart';
import DataContainer from 'Containers/DataContainer';
import FetchContainer from 'Containers/FetchContainer';
import HorizontalBarchart from '../charts/HorizontalBarchart';
import AreaChart from '../charts/AreaChart';

const fromDate = moment().subtract(1, 'weeks').format('YYYY-MM-DD');
const toDate = moment().prevBusinessDay().format('YYYY-MM-DD');
// const fromDate = '2020-01-01';

const Roi = () => {
  return (
    <Layout>
      <h2>
        <span>Roi</span>
      </h2>

      <DataContainer title="Homepage 순방문자수" category="Homepage" type="effect" target={['date', 'subcategory', 'title']} fromDate={fromDate} toDate={toDate}>
        <HorizontalBarchart roi />
      </DataContainer>

      <DataContainer title="영업 Inbound 현황" category="Inbound" type="effect" target={['date', 'subcategory', 'title']} fromDate={fromDate} toDate={toDate}>
        <HorizontalBarchart stacked roi />
      </DataContainer>

      <DataContainer title="MKTG 영향도 (기간 합산)" type="activity" target={['subcategory', 'title', 'date']} fromDate={fromDate} toDate={toDate} sort="value" roi>
        <VerticalBarChart roi />
      </DataContainer>

      <DataContainer title="MKTG 영향도 (일일 상세)" type="activity" target={['date', 'subcategory', 'title']} fromDate={fromDate} toDate={toDate} roi>
        <HorizontalBarchart stacked roi />
      </DataContainer>

      <FetchContainer title="주가 정보 (일별 종가)" target="endPrice">
        <AreaChart />
      </FetchContainer>

      <FetchContainer title="주가 정보 (일별 거래량)" target="volume">
        <AreaChart />
      </FetchContainer>
    </Layout>
  );
};

export default Roi;
