import React from 'react';
import Layout from '../Layout';
import VerticalBarChart from '../charts/VerticalBarChart';
import DataContainer from 'Containers/DataContainer';
import Table from '../table/Table';
import HorizontalBarchart from '../charts/HorizontalBarchart';

const PR = () => {
  const category = 'PR';

  return (
    <Layout>
      <h2>
        <span>PR</span>
      </h2>

      <DataContainer title="PR Effect" category={category} type="effect" target={['date', 'subcategory', 'title']}>
        <HorizontalBarchart stacked />
      </DataContainer>

      <DataContainer title="PR 상세내역" category={category} subcategory={['보도자료']} type="effect" target={['title', 'subcategory', 'value']} sort="value">
        <VerticalBarChart />
      </DataContainer>

      <DataContainer title="PR Effect Logs" category={category} type="effect" target={['date', 'subcategory', 'title']} sort="date">
        <Table cols={[15, 15, 19, 15, 19, 17]} theadItems={['Date', 'Subcategory', 'Detail', 'Value', 'Remark']} tbodyItems={['date', 'subcategory', 'title', 'value', 'remark']} />
      </DataContainer>

      <DataContainer title="활동별 PR 내역" category={category} type="activity" target={['date', 'subcategory', 'title']}>
        <HorizontalBarchart />
      </DataContainer>

      <DataContainer title="제품별 PR 내역" category={category} type="activity" target={['product', 'subcategory', 'title']} sort="value">
        <VerticalBarChart />
      </DataContainer>

      <DataContainer title="PR Activity Logs" category={category} type="activity" target={['date', 'subcategory', 'title']} sort="date">
        <Table cols={[10, 13, 14, 17, 17, 17, 6, 6]} theadItems={['Date', 'Subcategory', 'Product', 'Reference', 'Title', 'Remark', 'ROI']} tbodyItems={['date', 'subcategory', 'product', 'reference', 'url', 'title', 'remark', 'roi']} />
      </DataContainer>
    </Layout>
  );
};

export default PR;
