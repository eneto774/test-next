import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "react-query";
import ContentInfiniteScroll from "../../components/ContentInfiniteScroll";

function InfiniteScrollPageSSR({ propertyList }) {
  return (
    <div>
      <h1>
        Rick and Morty and Infinite Scroll - SSR
      </h1>
      <ContentInfiniteScroll data={propertyList?.data} paginationInfo={propertyList?.pagination} apiData={propertyList?.apiData} />
    </div>
  );
}

export default InfiniteScrollPageSSR;


export const getStaticProps = async () => {
  const propertyList = await axios.get(`${process.env.REACT_APP_API_URL}/property/?offset=8&page=1`,
    {
      headers: {
      'X-API-KEY': process.env.REACT_APP_API_KEY,
    },
  });

  return {
    props: {
      propertyList: {...propertyList.data, apiData: { url: process.env.REACT_APP_API_URL, apiKey: process.env.REACT_APP_API_KEY }}
    },
    revalidate: 60,
  }
}
