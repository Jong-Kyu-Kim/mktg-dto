import React from 'react';
import Layout from '../Layout';
import NetworkChart from '../charts/NetworkChart';
import LineChart from '../charts/LineChart';
import VerticalBarChart from '../charts/VerticalBarChart';
import DataContainer from 'Containers/DataContainer';

const Dashboard = () => {
  return (
    <Layout>
      <DataContainer title="MKTG Effect" type="effect" target={['category', 'subcategory', 'title']} sort="value">
        <NetworkChart />
      </DataContainer>

      <DataContainer title="MKTG Effect (트렌드)" type="effect" target={['category', 'date', 'subcategory']}>
        <LineChart />
      </DataContainer>

      <DataContainer title="활동별 MKTG 내역" type="activity" target={['category', 'subcategory', 'title']} sort="value">
        <VerticalBarChart />
      </DataContainer>

      <DataContainer title="활동별 MKTG 내역 (트렌드)" type="activity" target={['category', 'date', 'subcategory']}>
        <LineChart />
      </DataContainer>

      <DataContainer title="제품별 MKTG 내역" type="activity" target={['product', 'category', 'subcategory']} sort="value">
        <VerticalBarChart />
      </DataContainer>

      <DataContainer title="제품별 MKTG 내역 (트렌드)" type="activity" target={['product', 'date', 'category']}>
        <LineChart />
      </DataContainer>
    </Layout>
  );
};

export default Dashboard;
