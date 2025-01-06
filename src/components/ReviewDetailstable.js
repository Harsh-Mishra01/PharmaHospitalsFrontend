import React, { useContext, useEffect, useState } from "react";
import { SharedContext } from "../context/SharedContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Main Review Details Table Component
export default function ReviewDetailsTable({okrating}) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);
    const { getDrName } = useContext(SharedContext);
    const [docData, setDocData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedRating, setSelectedRating] = useState("ALL");
    const [currentPage, setCurrentPage] = useState(1);

    const api = localStorage.getItem("API");
    const commentsPerPage = 10;

    // Fetch Doctor's Reviews
    useEffect(() => {
        if (getDrName) {
            async function fetchDocData() {
                try {
                    const response = await fetch(`${api}/docData`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ businessName: getDrName }),
                    });
                    const data = await response.json();
                    setDocData(data.fullReview || []);
                    filterComments("ALL", data.fullReview || []);
                } catch (error) {
                    console.error("Error fetching doctor data:", error);
                }
            }
            fetchDocData();
        }
    }, [getDrName]);

    // Filter Comments by Rating
    const filterComments = (rating, data = docData) => {
        setSelectedRating(rating);
        setCurrentPage(1);

        let allComments = rating === "ALL" 
            ? Object.values(data).flat()
            : data[rating] || [];

        setFilteredData(allComments);
    };

    // Handle Pagination
    const paginate = (data) => {
        const startIndex = (currentPage - 1) * commentsPerPage;
        return data.slice(startIndex, startIndex + commentsPerPage);
    };

    // Handle Review Click
    const handleReviewClick = (review) => {
        setSelectedReview(review);
        setIsPopupOpen(true);
    };

    // Handle Image Error
    const handleError = (e) => {
        e.target.src = require("../assets/person.png");
    };
     console.log("123 :"+okrating)
    // Render Comments
    const renderComments = () => {
        if (!Array.isArray(filteredData)) return null;

        const paginatedData = filteredData;

        return paginatedData.map((comment, index) => {
            const ratingParsed = {
                "FIVE": 5,
                "FOUR": 4,
                "THREE": 3,
                "TWO": 2,
                "ONE": 1,
            }[comment.rating] || 0;

            return comment.comment !== null && comment.rating == okrating && (
                <div key={index} className="grid grid-cols-[15%_85%] bg-slate-50 shadow-md m-2 p-2 rounded-lg cursor-pointer"
                    // onClick={() => handleReviewClick(comment)}
                    >
                    <div className="flex rounded-full p-2 m-2">
                        <img
                            alt="reviewer"
                            className="w-12 h-12 rounded-full"
                            src={comment.rprofilePhotoUrl }
                            onError={handleError}
                        />
                    </div>
                    <div className="flex-col p-1">
                        <h1 className="text-base font-semibold">{comment.rname}</h1>
                        <p className="text-sm font-light">{comment.comment}</p>
                    </div>
                </div>
            );
        });
    };

    if (!filteredData.length) {
        return (
            <div className="text-center text-gray-500 py-4">
                No Reviews Available
            </div>
        );
    }

    return (
        <div className="overflow-y-auto h-40 custom-scrollbar">
            {renderComments()}
            {isPopupOpen && (
                <Popup
                    review={selectedReview}
                    onClose={() => setIsPopupOpen(false)}
                />
            )}
        </div>
    );
}

// Popup Component
function Popup({ review, onClose }) {
    const [reply, setReply] = useState("");

    const handleReplyChange = (event) => setReply(event.target.value);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Reply submitted:", reply);
        setReply("");
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg shadow-lg relative w-96">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                >
                    ❌
                </button>
                <div className="flex items-center mb-4">
                    <img
                        alt="reviewer"
                        className="w-16 h-16 rounded-full"
                        src={review?.rprofilePhotoUrl}
                        onError={(e) => (e.target.src = require("../assets/hospital.jpg"))}
                    />
                    <div className="ml-4">
                        <h1 className="text-lg font-semibold">{review?.rname}</h1>
                        <p className="text-sm">{review?.comment}</p>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <textarea
                        value={reply}
                        onChange={handleReplyChange}
                        placeholder="Enter your reply..."
                        className="w-full p-2 border rounded mb-2"
                        rows="4"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded"
                    >
                        Submit Reply
                    </button>
                </form>
            </div>
        </div>
    );
}
