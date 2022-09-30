import axios from 'axios';
import Image from 'next/image';
import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

// import { Container } from './styles';

function ContentInfiniteScroll({ data, paginationInfo }) {
  const [paginate, setPaginate] = useState(paginationInfo);
  const [cards, setCards] = useState(data);

  const fetchNextPage = async () => {
    if (paginate?.next) {
      const response = await axios.get(paginate?.next);
      setPaginate(response?.data?.info);
      setCards([...cards, ...response?.data?.results]);
    }
  }

  return (
      <InfiniteScroll
        dataLength={cards?.length}
        next={fetchNextPage}
        hasMore={paginate?.next}
        loader={<h4>Loading...</h4>}
        endMessage={<h4>Nothing more to show</h4>}
      >
        <div className='grid-container'>
              {cards.map((character) => (
                <article  key={character.id}>
                  <Image
                    src={character.image}
                    alt={character.name}
                    height={250}
                    loading='lazy'
                    width={'100%'}
                  />
                  <div className='text'>
                    <p>Name: {character.name}</p>
                    <p>Lives in: {character.location.name}</p>
                    <p>Species: {character.species}</p>
                    <i>Id: {character.id} </i>
                  </div>
                </article>
              ))}
              </div>
      </InfiniteScroll>
  );
}

export default ContentInfiniteScroll;