import React from 'react';
import Layout from '../Layout';
import LineChart from '../charts/LineChart';
import VerticalBarChart from '../charts/VerticalBarChart';
import DataContainer from 'Containers/DataContainer';
import Table from '../table/Table';
import HorizontalBarchart from '../charts/HorizontalBarchart';

const category = 'AD';

const AD = () => {
  return (
    <Layout>
      <h2>
        <span>AD</span>
      </h2>

      <DataContainer title="AD Effect" category={category} type="effect" target={['subcategory', 'date', 'title']}>
        <LineChart />
      </DataContainer>

      <DataContainer title="AD 상세내역" category={category} type="effect" target={['title', 'subcategory', 'value']} sort="value">
        <VerticalBarChart />
      </DataContainer>

      <DataContainer title="AD Effect Logs" category={category} type="effect" target={['date', 'subcategory', 'title']} sort="date">
        <Table cols={[15, 15, 19, 15, 19, 17]} theadItems={['Date', 'Subcategory', 'Detail', 'Value', 'Remark']} tbodyItems={['date', 'subcategory', 'title', 'value', 'remark']} />
      </DataContainer>

      <DataContainer title="활동별 AD 내역" category={category} type="activity" target={['date', 'subcategory', 'title']}>
        <HorizontalBarchart />
      </DataContainer>

      <DataContainer title="제품별 AD 내역" category={category} type="activity" target={['product', 'subcategory', 'title']} sort="value">
        <VerticalBarChart />
      </DataContainer>

      <DataContainer title="AD Activity Logs" category={category} type="activity" target={['date', 'subcategory', 'title']} fromDate="2020-01-01" sort="date">
        <Table cols={[10, 13, 14, 17, 17, 17, 6, 6]} theadItems={['Date', 'Subcategory', 'Product', 'Reference', 'Title', 'Remark', 'ROI']} tbodyItems={['date', 'subcategory', 'product', 'reference', 'url', 'title', 'remark', 'roi']} />
      </DataContainer>
    </Layout>
  );
};

export default AD;
