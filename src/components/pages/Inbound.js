import React from 'react';
import Layout from '../Layout';
import VerticalBarChart from '../charts/VerticalBarChart';
import DataContainer from 'Containers/DataContainer';
import Table from '../table/Table';
import HorizontalBarchart from '../charts/HorizontalBarchart';
import PieChart from '../charts/PieChart';

const category = 'Inbound';
const fromDate = '2019-01-01';

const Inbound = () => {
  return (
    <Layout>
      <h2>
        <span>{category}</span>
      </h2>

      <DataContainer title={`${category} Effect`} category={category} type="effect" target={['date', 'subcategory', 'title']}>
        <HorizontalBarchart stacked />
      </DataContainer>

      <DataContainer title={`${category} Effect (MQL)`} category={category} type="effect" target={['date', 'subcategory', 'title']}>
        <HorizontalBarchart mql />
      </DataContainer>

      <DataContainer title={`${category} Effect Logs`} category={category} type="effect" sort="date">
        <Table cols={[10, 10, 18, 12, 15, 15, 10, 10]} theadItems={['Date', 'Product', 'Company', 'Result', 'Remark', 'From', 'NS1']} tbodyItems={['date', 'product', 'title', 'subcategory', 'remark', 'remark2', 'rep']} />
      </DataContainer>

      <DataContainer title="활동별 MKTG 내역" type="activity" target={['category', 'subcategory', 'title']} sort="value">
        <VerticalBarChart />
      </DataContainer>

      <DataContainer title={`제품별 ${category} 내역`} category={category} type="effect" target={['product', 'subcategory', 'title']} sort="value">
        <VerticalBarChart />
      </DataContainer>

      <DataContainer title={`목적별 ${category} 내역`} category={category} type="effect" target={['remark', 'subcategory', 'title']} sort="value">
        <PieChart />
      </DataContainer>

      <DataContainer title={`유입별 ${category} 내역`} category={category} type="effect" target={['remark2', 'subcategory', 'title']} sort="value">
        <PieChart />
      </DataContainer>
    </Layout>
  );
};

export default Inbound;
