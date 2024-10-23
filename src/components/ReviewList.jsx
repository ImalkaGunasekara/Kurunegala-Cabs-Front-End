import React, {useEffect, useState} from 'react';
import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_URL;

function ReviewList () {
    const [reviews, setReviews] = useState([]);

    useEffect(()=>{
        const fetchReview = async () =>{
            try{
                const response = await axios.get(`${apiUrl}/api/reviews`);
                setReviews(response.data);
            }catch(error){
                console.error("Error Fetching Reviews:", error);

            }
        };
        fetchReview();
    }, []);


    return (
        <div className="p-6">
            {reviews.map((review) => (
                <div key={review._id} className="bg-white p-4 rounded-lg shadow-lg mb-4">
                    <h3 className="text-xl font-bold">{review.userName}</h3>
                    <p className="text-gray-700">{review.reviewText}</p>
                    <p className="text-yellow-500">Rating: {review.rating}/5</p>
                </div>
            ))}
        </div>
    );

}

export default  ReviewList;