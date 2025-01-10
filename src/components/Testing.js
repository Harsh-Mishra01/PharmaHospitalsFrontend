import React, { useContext, useEffect, useState } from "react";
import { SharedContext } from "../context/SharedContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ReviewDetailsTable() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);
    const { getDrName } = useContext(SharedContext);
    const [docData, setDocData] = useState([]);
    const [getReview, setReview] = useState(true);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedRating, setSelectedRating] = useState("ALL");
    const [currentPage, setCurrentPage] = useState(1);
    const api = localStorage.getItem("API");
    const commentsPerPage = 5;


    useEffect(() => {
        if (getDrName) {
            async function getDocData() {
                const response = await fetch(api + "/docData", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ businessName: getDrName }),
                });
                const data = await response.json();
                setDocData(data.fullReview);
                filterComments("ALL", data.fullReview);
            }
            getDocData();
        }
    }, [getDrName, api]);


    const filterComments = (rating, data = docData) => {
        setSelectedRating(rating);
        setCurrentPage(1);

        let allComments = [];
        if (rating === "ALL") {
            allComments = Object.values(data).flat();
        } else {
            allComments = data[rating] || [];
        }
        setFilteredData(allComments);
    };
    const handleError = (e) => {
        e.target.src = require("../assets/hospital.jpg");
    };

    const paginate = (data) => {
        const startIndex = (currentPage - 1) * commentsPerPage;
        return data.slice(startIndex, startIndex + commentsPerPage);
    };

    const renderComments = () => {
        if (!Array.isArray(filteredData)) return null;

        const paginatedData = paginate(filteredData);

        return paginatedData.map((comment, index) => {
            let ratingParsed;
            if (comment.rating === "FIVE") {
                ratingParsed = 5;
            } else if (comment.rating === "FOUR") {
                ratingParsed = 4;
            } else if (comment.rating === "THREE") {
                ratingParsed = 3;
            } else if (comment.rating === "TWO") {
                ratingParsed = 2;
            } else if (comment.rating === "ONE") {
                ratingParsed = 1;
            }

            return (
                <div className="overflow-y-auto h-40 custom-scrollbar">
                    <div key={index}
                        onClick={() => handleReviewClick(comment)}
                        className="grid grid-cols-[15%_85%] bg-slate-50 shadow-md m-2 p-2 rounded-lg shadow-lg flex justify-center cursor-pointer"
                    >
                       <div className="flex rounded-full p-2 m-2">
                            <img alt="reviewerimage" className="flex content-center justify-center w-12 h-12 rounded-full" src={comment.rprofilePhotoUrl} />
                        </div>
                        <div className="flex-col p-1">
                            <h1 className="text-base font-semibold">{comment.rname}</h1>
                            <p className="text-sm font-light">{comment.comment}</p>
                        </div>
                    </div>
                </div>
            );
        });
    };


    const handleReviewClick = (review) => {
        setSelectedReview(review);
        setIsPopupOpen(true);
    };

    if (!getReview) {
        return (
            <div>
                <center>No Reviews</center>
            </div>
        );
    }

    return (
        // <div>
        //     <div className="overflow-y-auto h-40 custom-scrollbar">
        //         {docData.map((comment, index) => {
        //             let ratingParsed = 0;
        //             if (comment?.rating === "FIVE") ratingParsed = 5;
        //             else if (comment?.rating === "FOUR") ratingParsed = 4;
        //             else if (comment?.rating === "THREE") ratingParsed = 3;
        //             else if (comment?.rating === "TWO") ratingParsed = 2;
        //             else if (comment?.rating === "ONE") ratingParsed = 1;

        //             return (
        //                 <div
        //                     key={index}
        //                     onClick={() => handleReviewClick(comment)}
        //                     className="grid grid-cols-[15%_85%] bg-slate-50 shadow-md m-2 p-2 rounded-lg cursor-pointer"
        //                 >
        //                     <div className="flex rounded-full p-2 m-2">
        //                         <img
        //                             alt="reviewerimage"
        //                             className="w-12 h-12 rounded-full"
        //                             src={comment.image}
        //                         />
        //                     </div>
        //                     <div className="flex-col p-1">
        //                         <h1 className="text-base font-semibold">{comment.name}</h1>
        //                         <p className="text-sm font-light">{comment.message}</p>
        //                     </div>
        //                 </div>
        //             );
        //         })}
        //     </div>

        //     {isPopupOpen && (
        //         <Popup review={selectedReview} onClose={() => setIsPopupOpen(false)} />
        //     )}
        // </div>
        <div>{renderComments()}</div>
    );
}

// Popup Component
function Popup({ review, onClose }) {
    const [reply, setReply] = useState("");

    const handleReplyChange = (event) => {
        setReply(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Reply submitted:", reply);
        setReply(""); // Clear the reply input after submission
        onClose(); // Close the popup
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg shadow-lg relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-white p-1 m-2 rounded-full"
                >
                    ❌
                </button>
                <div className="flex">
                    <img
                        alt="reviewerimage"
                        className="w-16 h-16 rounded-full"
                        src={review?.image}
                    />
                    <div className="ml-4">
                        <h1 className="text-lg font-semibold">{review?.name}</h1>
                        <p className="text-sm">{review?.message}</p>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="mt-4">
                    <textarea
                        value={reply}
                        onChange={handleReplyChange}
                        placeholder="Enter your reply..."
                        className="w-full p-2 border rounded"
                        rows="4"
                    />
                    <button
                        type="submit"
                        className="mt-2 bg-blue-500 text-white p-2 rounded"
                    >
                        Submit Reply
                    </button>
                </form>
            </div>
        </div>
    );
}







import React, { useState } from "react";

export default function ReviewDetailsTable() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);

    const reviews = [
        {
            name: "Harsh Mishra",
            message: "Note that the development build is not optimized. To create a production build, use npm run build.",
            image: "https://lh3.googleusercontent.com/a/AItbvmmQV3r5tKeM4K5tpkV1QtJD4maOl9mc_HZJM6R6=s120-c-c0x00000000-cc-rp-mo-br100"
        },
        {
            name: "Ravi Pratap",
            message: "Note that the development build is not optimized. To create a production build, use npm run build.",
            image: "https://lh3.googleusercontent.com/a-/AFdZucqxU34szXibN4UYVX3ZjmxmlstcYXZIPsva7n_4=s120-c-c0x00000000-cc-rp-mo-br100"
        },
        {
            name: "Rakesh Kumar",
            message: "Note that the development build is not optimized. To create a production build, use npm run build.",
            image: "https://lh3.googleusercontent.com/a/AItbvmmQV3r5tKeM4K5tpkV1QtJD4maOl9mc_HZJM6R6=s120-c-c0x00000000-cc-rp-mo-br100"
        },
        {
            name: "Harsh Mishra",
            message: "Note that the development build is not optimized. To create a production build, use npm run build.",
            image: "https://lh3.googleusercontent.com/a/AItbvmmQV3r5tKeM4K5tpkV1QtJD4maOl9mc_HZJM6R6=s120-c-c0x00000000-cc-rp-mo-br100"
        },
        {
            name: "Harsh Mishra",
            message: "Note that the development build is not optimized. To create a production build, use npm run build.",
            image: "https://lh3.googleusercontent.com/a/AItbvmmQV3r5tKeM4K5tpkV1QtJD4maOl9mc_HZJM6R6=s120-c-c0x00000000-cc-rp-mo-br100"
        }
    ];

    const handleReviewClick = (review) => {
        setSelectedReview(review);
        setIsPopupOpen(true);
    };

    return (
        <>
            <div className="overflow-y-auto h-40 custom-scrollbar"> {/* Set a fixed height and enable scrolling */}
                {reviews.map((review, index) => (
                    <div
                        key={index}
                        onClick={() => handleReviewClick(review)}
                        className="grid grid-cols-[15%_85%] bg-slate-50 shadow-md m-2 p-2 rounded-lg shadow-lg flex justify-center cursor-pointer"
                    >
                        <div className="flex rounded-full p-2 m-2">
                            <img alt="reviewerimage" className="flex content-center justify-center w-12 h-12 rounded-full" src={review.rprofilePhotoUrl} />
                        </div>
                        <div className="flex-col p-1">
                            <h1 className="text-base font-semibold">{review.rname}</h1>
                            <p className="text-sm font-light">{review.comment}</p>
                        </div>
                    </div>
                ))}
            </div>

            {isPopupOpen && (
                <Popup review={selectedReview} onClose={() => setIsPopupOpen(false)} />
            )}
        </>
    );
}

function Popup({ review, onClose }) {
    const [reply, setReply] = useState("");

    const handleReplyChange = (event) => {
        setReply(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Reply submitted:", reply);
        setReply(""); // Clear the reply input after submission
        onClose(); // Close the popup
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg shadow-lg relative">
                <button onClick={onClose} className="absolute top-2 right-2  text-white p-1 m-2 rounded-full">❌</button>
                <div className="flex">
                    <img alt="reviewerimage" className="w-16 h-16 rounded-full" src={review.image} />
                    <div className="ml-4">
                        <h1 className="text-lg font-semibold">{review.name}</h1>
                        <p className="text-sm">{review.message}</p>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="mt-4">
                    <textarea
                        value={reply}
                        onChange={handleReplyChange}
                        placeholder="Enter your reply..."
                        className="w-full p-2 border rounded"
                        rows="4"
                    />
                    <button type="submit" className="mt-2 bg-blue-500 text-white p-2 rounded">Submit Reply</button>
                </form>
            </div>
        </div>
    );
}
