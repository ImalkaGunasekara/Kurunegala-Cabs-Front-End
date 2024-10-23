import React, { useState } from 'react';
import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_URL;

function ReviewForm() {
    const [userName, setUserName] = useState("");
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(`${apiUrl}/api/reviews`, {
                userName,
                reviewText,
                rating
            });
            alert("Review Submitted!");
        } catch (error) {
            console.error("Error Submitting Review", error);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl mx-auto mt-15">
            <div className="mb-4 flex items-center">
                <label className="block text-2xl font-medium text-gray-900 mr-4" htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="bg-gray-300 border border-gray-400 text-gray-900
                                text-xl rounded-lg focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                />
            </div>

            <div className="mb-4 flex items-center">
                <label className="block text-2xl font-medium text-gray-900 mr-4 -mt-" htmlFor="reviewText">Review:</label>
                <textarea
                    id="reviewText"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="bg-gray-300 border border-gray-400 text-gray-900
                                text-xl rounded-lg focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-24 flex-1"
                    required
                />
            </div>

            <div className="mb-4 flex items-center">
                <label className="block text-2xl font-medium text-gray-900 mr-4" htmlFor="rating">Rating:</label>
                <input
                    type="number"
                    id="rating"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    min="1"
                    max="5"
                    className="bg-gray-300 border border-gray-400 text-gray-900
                                text-xl rounded-lg focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                />
            </div>

            <button type="submit" className="bg-black-500 hover:bg-green-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
        </form>
    );
}

export default ReviewForm;