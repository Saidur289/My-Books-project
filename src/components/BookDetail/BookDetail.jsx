import { useLoaderData, useParams } from "react-router-dom";
import { addToStoreReadList, addToStoreWishList } from "../Utiliy/addToDb";


const BookDetail = () => {
    
    // const param = useParams()
    // console.log(param);
    const {bookId} = useParams()
    const id = parseInt(bookId)
    const data = useLoaderData();
    const book = data.find(book => book.bookId === id)
    // console.log(book);
    const {bookId: currentBookId, image} = book;
    const handleMarkAsRead = (id) => {
        addToStoreReadList(id)
        console.log('cliked');

    }
    const handleWishAsRead = (id) => {
        addToStoreWishList(id)
    }

    // console.log(bookId);
    return (
        <div className="my-12">
            <h3>Book Detail: {currentBookId}</h3>
            <img src={image} className="w-36" alt="" />
            <br />
            <button onClick={() => handleMarkAsRead(currentBookId)} className="btn btn-outline mr-4 btn-accent">Mark As Read</button>
            <button onClick={() => handleWishAsRead(currentBookId)} className="btn  btn-accent">Add To WishList</button>
        </div>
    );
};

export default BookDetail;