import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { getStoredReadList, getStoredWishList } from "../Utiliy/addToDb";
import Book from "../Book/Book";

const ListedBooks = () => {
  const [readList, setReadList] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [sort, setSort] = useState('')

  const allBooks = useLoaderData();
  useEffect(() => {
    const storedReadList = getStoredReadList();
    const storedReadListInt = storedReadList.map((id) => parseInt(id));
    const readBookList = allBooks.filter((book) =>
      storedReadListInt.includes(book.bookId)
    );
    setReadList(readBookList);
    // console.log(storedReadList);
    // console.log(allBooks);
  }, []);
  useEffect(() => {
    const storedWishlist = getStoredWishList();
    const storedWishlistInt = storedWishlist.map((id) => parseInt(id));
    const readWishList = allBooks.filter((book) =>
      storedWishlistInt.includes(book.bookId)
    );
    setWishList(readWishList);
  }, []);
  const handleSort = sortType => {
    setSort(sortType)
    if(sortType === 'No Of Pages'){
        const sortList = [...readList].sort((a,b) => a.totalPages - b.totalPages)
        const sortForWishList = [...wishList].sort((a,b) => a.totalPages - b.totalPages)
        setWishList(sortForWishList)
        setReadList(sortList) 
    }
    if(sortType === 'Ratings'){
        const sortList = [...readList].sort((a, b) => a.rating - b.rating)
      
        
        setReadList(sortList)
    }
  }
  return (
    <div>
      <h3 className="text-3xl my-8">Listed Books</h3>
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn m-1">
        {
            sort? `Sort By: ${sort}` : 'Sort By'
          }
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
        >
          <li>
            <a onClick={() => handleSort('Ratings')}>Ratings</a>
          </li>
          <li onClick={() => handleSort('No Of Pages')}>
            <a>No Of Pages</a>
          </li>
        </ul>
      </div>
      <Tabs>
        <TabList>
          <Tab>Read List</Tab>
          <Tab>Wish List</Tab>
        </TabList>

        <TabPanel>
          <h2 className="text-2xl">Books I read : {readList.length}</h2>
          {readList.map((book) => (
            <Book key={book.bookId} book={book}></Book>
          ))}
        </TabPanel>
        <TabPanel>
          <h2 className="text-2xl">My Wish List: {wishList.length}</h2>
          {wishList.map((book) => (
            <Book key={book.bookId} book={book}></Book>
          ))}
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default ListedBooks;
