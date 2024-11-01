import { json } from "react-router-dom"
import { toast } from "react-toastify";

const getStoredReadList = () => {
    const storedListStr = localStorage.getItem('read-list')
    if(storedListStr){
        const storedList = JSON.parse(storedListStr)
        return storedList;
    }
    return []

}
const addToStoreReadList = (id) =>{
    const storedList = getStoredReadList()
    //already exist.do not add it
    if(storedList.includes(id)){
        console.log(id, 'already exists');
    }
    else{
        storedList.push(id)
        const storedListStr = JSON.stringify(storedList)
        localStorage.setItem('read-list', storedListStr)
        toast('This book is added your read list')
    }
}
const getStoredWishList = () => {
    const storedWish = localStorage.getItem('wish-list')
    if(storedWish){
        const storedWishStr = JSON.parse(storedWish)
        return storedWishStr;
    }
    return []
}
const addToStoreWishList = (id) => {
    const storedWishList = getStoredWishList()
    if(storedWishList.includes(id)){
        console.log(id, 'already exists here');
    }
    else{
        storedWishList.push(id)
        const storedWishListStr = JSON.stringify(storedWishList);
        localStorage.setItem('wish-list', storedWishListStr)
        toast('This book is added your wish list')
    }
}
export {addToStoreReadList, addToStoreWishList, getStoredReadList, getStoredWishList}
