import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRightCircle } from "react-icons/fi";
import GridLoader from "react-spinners/GridLoader";
import BeatLoader from "react-spinners/BeatLoader";
import { IoMdSend } from "react-icons/io";

const RatingDashboard = () => {
    const [ratings, setRatings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [getReview, setReview] = useState(true);
    const [error, setError] = useState(null);
    const [popupMessage, setPopupMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const api = localStorage.getItem("API");

    const [getReply, setReply] = useState({ FIVE: '', FOUR: '', THREE: '', TWO: '', ONE: '' });

    function getAllReplies(e) {
        const { name, value } = e.target;
        setReply({ ...getReply, [name]: value });
    }

    function ReplyReviews(e, rating) {
        e.preventDefault();
        const result = {};

        if (ratings?.fullReview?.[rating]?.length !== 0) {
            result[rating] = {
                accounts: [],
                Reply: getReply[rating]
            };

            for (let i = 0; i < ratings.fullReview[rating].length; i++) {
                if (ratings.fullReview[rating][i]?.comment != null) {
                    result[rating].accounts.push(ratings.fullReview[rating][i]?.loc);
                }
            }
        }

        if (result[rating]?.accounts?.length === 0) {
            console.warn(`No valid accounts found for rating ${rating}`);
            return;
        }

        async function submitReply(result) {
            setIsSubmitting(true); // Start Loader
            try {
                const response = await fetch(api + "/submitReply", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ result })
                });

                const data = await response.json();

                if (data.success) {
                    const successAccounts = data.details.filter(item => item.status === "Success");
                    const failedAccounts = data.details.filter(item => item.status !== "Success");

                    if (successAccounts.length > 0) {
                        setPopupMessage(
                            `✅ Reply successfully submitted for ${successAccounts.length} accounts.`
                        );
                        setShowPopup(true);
                    }

                    if (failedAccounts.length > 0) {
                        console.warn("❌ Some accounts failed:", failedAccounts);
                        setPopupMessage(
                            `❌ Failed to submit reply for ${failedAccounts.length} accounts.`
                        );
                        setShowPopup(true);
                    }
                } else {
                    setPopupMessage("❌ Reply submission failed. Please try again.");
                    setShowPopup(true);
                }
            } catch (error) {
                setPopupMessage(`❌ Error: ${error.message}`);
                setShowPopup(true);
            } finally {
                setIsSubmitting(false); // Stop Loader
            }
        }
        submitReply(result);
    }



    // Fetch data from the backend
    useEffect(() => {
        const fetchRatings = async () => {
            setReview(true);
            try {
                const response = await fetch(`${api}/getRatingDetails`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch ratings');
                }

                const data = await response.json();
                if (data.success) {
                    if (
                        data.fullReview.FIVE.length === 0 &&
                        data.fullReview.FOUR.length === 0 &&
                        data.fullReview.THREE.length === 0 &&
                        data.fullReview.TWO.length === 0 &&
                        data.fullReview.ONE.length === 0
                    ) {
                        setReview(false);
                    }
                    setRatings(data || []);
                } else {
                    throw new Error('Error fetching data from backend');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRatings();
    }, [api]);

    if (loading) {
        return <div className="d-flex flex-column justify-content-center align-items-center vh-100">
            <GridLoader color={"#9693C3"} />
        </div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return !getReview ? (
        <div>
            <center>No Reviews</center>
        </div>
    ) : (
        <div className="dark:bg-[#020617] p-4 rounded-lg relative">
            <h1 className="text-3xl font-bold p-2 flex justify-center">
                Manage Your Reviews
            </h1>

            {/* Main Grid for Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["FIVE", "FOUR", "THREE", "TWO", "ONE"].map((rating, index) => {
                    const reviews = ratings?.fullReview?.[rating];
                    const hasValidComment = reviews?.some(review => review?.comment !== null);

                    return (
                        hasValidComment && (
                            <div key={rating} className="border border-2 rounded-lg p-4">
                                <div className="flex justify-between items-center mb-2">
                                    <h1 className="text-xl font-semibold">
                                        {rating.charAt(0) + rating.slice(1).toLowerCase()} Stars ({reviews.length})
                                    </h1>
                                    <h1 className="text-xl">{'⭐'.repeat(5 - index)}</h1>
                                </div>

                                <div>
                                    <div className="grid grid-cols-[90%_7%] gap-2">
                                        <textarea
                                            className="border rounded-lg p-2 w-full"
                                            name={rating}
                                            disabled={reviews.length === 0}
                                            placeholder={
                                                reviews.length === 0
                                                    ? "No Reviews Available"
                                                    : "Enter Reply"
                                            }
                                            onChange={getAllReplies}
                                            value={getReply[rating]}
                                        ></textarea>
                                        <button
                                            className={`flex justify-center items-center ${isSubmitting ? "bg-gray-400" : "bg-[#AAA7CD] hover:bg-blue-700"
                                                } text-white text-2xl font-bold p-2 rounded`}
                                            onClick={(e) => ReplyReviews(e, rating)}
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <BeatLoader color={"#fff"} size={5} />
                                            ) : (
                                                <IoMdSend />
                                            )}
                                        </button>

                                    </div>
                                </div>
                            </div>
                        )
                    );
                })}
                {/* <div className="flex justify-center items-center cursor-pointer hover:text-blue-500 transition-transform transition-colors duration-300 ease-in-out hover:scale-105 hover:bg-[#E0FBEE]  border border-2 rounded-lg p-4">
                    <div className="flex-col justify-center items-center">
                        <div  className="flex justify-center items-center">
                    <LucideCircleFadingPlus  className="text-2xl"/>
                    </div>
                    <Link to="/Reviewok"  className="flex justify-center items-center">
                    <p>Manage Review</p>
                    </Link>
                    </div>
                </div> */}
            </div>

            {/* <div className="mt-4">
                <Link to="/Reviewok" className="flex justify-center p-1 pe-4">
                    Manage Reviews
                </Link>
            </div> */}

            {/* Popup Modal */}
            {showPopup && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-6 text-center">
                        <p className="text-xl mb-4">{popupMessage}</p>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                            onClick={() => setShowPopup(false)}
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default RatingDashboard;
