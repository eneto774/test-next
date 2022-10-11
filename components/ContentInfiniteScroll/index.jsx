import axios from 'axios';
import Image from 'next/image';
import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

// import { Container } from './styles';

function ContentInfiniteScroll({ data, paginationInfo, apiData }) {
  const [paginate, setPaginate] = useState(paginationInfo);
  const [cards, setCards] = useState(data);
  const [actualPage, setActualPage] = useState(Number(paginate?.page))
  
  const fetchNextPage = async () => {
    if (Number(paginate?.page) < paginate?.max_pages) {
      const response = await axios.get(`${apiData?.url}/property/?offset=8&page=${actualPage + 1}`,
      {
        headers: {
        'X-API-KEY': apiData?.apiKey,
      },
    });
      setPaginate(response?.data?.pagination);
      setActualPage(Number(response?.data?.pagination.page))
      setCards([...cards, ...response?.data?.data]);
    }
  }

  return (
      <InfiniteScroll
        dataLength={cards?.length}
        next={fetchNextPage}
        hasMore={Number(paginate.page) < paginate.max_pages}
        loader={<h4>Loading...</h4>}
        endMessage={<h4>Nothing more to show</h4>}
      >
        <div className='grid-container'>
              {cards?.map((property) => (
                <article  key={property?.id}>
                  <Image
                    src={property?.foto_capa}
                    alt={property?.nome_imovel}
                    height={250}
                    loading='lazy'
                    width={250}
                  />
                  <div className='text'>
                    <p>Nome: {property?.nome_imovel}</p>
                    {/* <p>Description: {property?.descricao}</p> */}
                    <i>Id: {property?.id} </i>
                  </div>
                </article>
              ))}
              </div>
      </InfiniteScroll>
  );
}

export default ContentInfiniteScroll;