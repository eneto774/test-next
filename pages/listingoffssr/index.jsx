import React, { useCallback } from 'react';
import axios from 'axios';
import styles from './Listing.module.css';
import { useEffect } from 'react';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import Image from 'next/image';

function ListingOFFSSR() {
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationData, setPaginationData] = useState({});
  const [charactersList, setCharactersList] = useState([]);

  const handlePageClick = (e) => setCurrentPage(e.selected + 1)

  const getCharacters = useCallback(async () => {
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character/?page=${currentPage}`);
      setCharactersList(response.data.results);
      setPaginationData(response.data.info);
    } catch (error) {
      console.log(error);
    }
  }, [currentPage]);

  useEffect(() => {
    getCharacters();
  }, [getCharacters, currentPage])
  return (
    <div className={styles.container}>
      <h1>Listing Off SSR</h1>
      <div className={styles.card_container}>
        {charactersList.map(character => (
          <div className={styles.card} key={character.id}>
            <Image src={character.image} alt={character.name} />
          </div>
        ))}
      </div>
      <ReactPaginate breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={paginationData.pages}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"  
      />
    </div>
  );
}

export default ListingOFFSSR;