import React from 'react';
import ReviewForm from '../components/ReviewForm.jsx';
import ReviewList from '../components/ReviewList.jsx';


function ReviewsPage () {

    return (
        <div>
            
            <h1 className= "text-3xl font-bold text-center my-6" >User Reviews</h1>
            <div className = "container mx-auto px-4">
                <ReviewForm/>
                <ReviewList/>
            </div>
        </div>
    );
}

export default ReviewsPage