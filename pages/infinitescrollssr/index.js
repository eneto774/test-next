import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "react-query";
import ContentInfiniteScroll from "../components/ContentInfiniteScroll";

function InfiniteScrollPageSSR({ data }) {
  return (
    <div>
      <h1>
        Rick and Morty and Infinite Scroll - SSR
      </h1>
      <ContentInfiniteScroll data={data.results} paginationInfo={data.info} />
    </div>
  );
}

export default InfiniteScrollPageSSR;


export const getStaticProps = async () => {
  const response = await axios.get("https://rickandmortyapi.com/api/character/?page=1");

  return {
    props: {
      data: response.data,
    },
    revalidate: 60,
  }
}
