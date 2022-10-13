import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "react-query";
import ContentInfiniteScroll from "../../components/ContentInfiniteScroll";

function InfiniteScrollPageSSR({ propertyList }) {
  return (
    <>
    <Head>
      <title>Resale NextJS - Test</title>
      <meta name="description" content="Listing with Infinite Scroll Based in Resale Api." />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div>
      <h1>
        Resale and Infinite Scroll - SSR
      </h1>
      <ContentInfiniteScroll data={propertyList?.data} paginationInfo={propertyList?.pagination} apiData={propertyList?.apiData} />
    </div>
    </>
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
