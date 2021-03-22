import React from 'react';
import Layout from '../Layout';
import VerticalBarChart from '../charts/VerticalBarChart';
import DataContainer from 'Containers/DataContainer';
import Table from '../table/Table';
import HorizontalBarchart from '../charts/HorizontalBarchart';
import PieChart from '../charts/PieChart';

const category = 'Inbound(G)';
const fromDate = '2019-01-01';

const InboundG = () => {
  return (
    <Layout>
      <h2>
        <span>{category}</span>
      </h2>

      <DataContainer title={`${category} Effect`} category={category} type="effect" target={['date', 'subcategory', 'title']}>
        <HorizontalBarchart stacked />
      </DataContainer>

      <DataContainer title={`지역별 ${category} 내역`} category={category} type="effect" target={['region', 'subcategory', 'title']} sort="value">
        <PieChart />
      </DataContainer>

      <DataContainer title={`${category} Effect Logs`} category={category} type="effect" sort="date">
        <Table cols={[8, 12, 10, 8, 12, 8, 8, 8, 17, 5]} theadItems={['Date', 'Product', 'Region', 'Country', 'Company', 'Result', 'Object', 'Rep', 'Remark']} tbodyItems={['date', 'product', 'region', 'country', 'title', 'subcategory', 'remark', 'rep', 'remark2']} />
      </DataContainer>

      <DataContainer title={`제품별 ${category} 내역`} category={category} type="effect" target={['product', 'subcategory', 'title']} sort="value">
        <VerticalBarChart />
      </DataContainer>

      <DataContainer title={`목적별 ${category} 내역`} category={category} type="effect" target={['remark', 'subcategory', 'title']} sort="value">
        <PieChart />
      </DataContainer>
    </Layout>
  );
};

export default InboundG;
