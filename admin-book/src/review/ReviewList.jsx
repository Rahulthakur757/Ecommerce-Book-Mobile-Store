import { useState, useEffect } from "react";
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;
function ReviewList() {
    let [reviews, setReviews] = useState([]);

    useEffect(() => {
            axios({
                url: apiUrl + '/admin/review',
                method: 'get'
            }).then((result) => {
                setReviews(result.data.data)
            }).catch((err) => {
                console.log(err);
            })
        },[])

      
    return(
        <>
        <table className='table'>
            <thead>
                <tr>
                    <th>Book</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>comment</th>
                    <th>Rating</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {
                    reviews.map((review,index)=>
                        <tr key={index}>
                            <td>{review.bookId.bookTitle}</td>
                            <td>{review.userName}</td>
                            <td>{review.userEmail}</td>
                            <td>{review.comment}</td>
                            <td>{review.rating}</td>
                            <td>{review.status}</td>
                        </tr>
                    )
                }
            </tbody>
           </table>
        </> 
    )
}
 export default ReviewList;