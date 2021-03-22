import React from 'react';
import Layout from '../Layout';
import LineChart from '../charts/LineChart';
import VerticalBarChart from '../charts/VerticalBarChart';
import DataContainer from 'Containers/DataContainer';
import Table from '../table/Table';
import HorizontalBarchart from '../charts/HorizontalBarchart';

const category = 'SNS';

const Sns = () => {
  return (
    <Layout>
      <h2>
        <span>{category}</span>
      </h2>

      <DataContainer title={`${category} Effect`} category={category} type="effect" target={['subcategory', 'date', 'title']}>
        <LineChart />
      </DataContainer>

      <DataContainer title={`${category} Effect Logs`} category={category} type="effect" target={['date', 'category', 'title']} sort="date">
        <Table cols={[15, 15, 19, 15, 19, 17]} theadItems={['Date', 'Subcategory', 'Detail', 'Value', 'Remark']} tbodyItems={['date', 'subcategory', 'title', 'value', 'remark']} />
      </DataContainer>

      <DataContainer title={`활동별 ${category} 내역`} category={category} type="activity" target={['date', 'subcategory', 'title']}>
        <HorizontalBarchart stacked />
      </DataContainer>

      <DataContainer title={`제품별 ${category} 내역`} category={category} type="activity" target={['product', 'subcategory', 'title']} sort="value">
        <VerticalBarChart />
      </DataContainer>

      <DataContainer title={`${category} Activity Logs`} category={category} type="activity" target={['date', 'subcategory', 'title']} sort="date">
        <Table cols={[10, 13, 14, 17, 17, 17, 6, 6]} theadItems={['Date', 'Subcategory', 'Product', 'Reference', 'Title', 'Remark', 'ROI']} tbodyItems={['date', 'subcategory', 'product', 'reference', 'url', 'title', 'remark', 'roi']} />
      </DataContainer>
    </Layout>
  );
};

export default Sns;
