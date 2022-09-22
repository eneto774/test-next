import axios from 'axios';
import styles from './Listing.module.css';
import { useEffect } from 'react';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useRouter } from 'next/router'
import Image from 'next/image'

function Listing({ charactersData }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationData, setPaginationData] = useState({});
  const [charactersList, setCharactersList] = useState([]);

  const router = useRouter()

  const handlePageClick = (e) => router.push({
    pathname: `/listing`,
    query: { page: e.selected + 1},
  })

  // const getCharacters = useCallback(async () => {
  //   try {
  //     const response = await axios.get(`https://rickandmortyapi.com/api/character/?page=${currentPage}`);
  //     setCharactersList(response.data.results);
  //     setPaginationData(response.data.info);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [currentPage]);

  // useEffect(() => {
  //   getCharacters();
  // }, [getCharacters])

  const myLoader = ({ src }) => {
    return `https://rickandmortyapi.com/api/character/avatar/${src}.jpeg`
  }
  return (
    <div className={styles.container}>
      <h1>Listing Next</h1>
      <div className={styles.card_container}>
        {charactersData?.results.map(character => (
          <div className={styles.card} key={character?.id}>
            <Image
              src={character?.image}
              alt={character?.name}
              layout="responsive"
              width={'100%'}
              height={'100%'}
            />
            {/* <img
              src={charactersData?.results[0]?.image}
              layout="responsive"
              width={'100%'}
              height={'100%'}
            /> */}
          </div>
        ))}
      </div>
      <ReactPaginate breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={charactersData.info.pages}
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

export default Listing;

export const getServerSideProps = async (context) => {
  if (!context.query.page) context.query.page = 1;
  const response = await axios.get(`https://rickandmortyapi.com/api/character/?page=${context.query.page}`);

  return {
    props: {
      charactersData: response.data,
    }
  }
}

// export const getStaticProps = async (context) => {
//   console.log(context);
//   const response = await axios.get(`https://rickandmortyapi.com/api/character/?page=1`);

//   return {
//     props: {
//       charactersData: response.data,
//     },
//     revalidate: 60,
//   }
// }