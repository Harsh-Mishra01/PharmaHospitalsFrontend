import React, { useContext, useEffect, useState } from "react";
import ReviewDetailsTable from "./ReviewDetailstable";
import { FiArrowRightCircle } from "react-icons/fi";
import { SharedContext } from "../context/SharedContext";



export default function ReviewManagement() {
    const { getDrName } = useContext(SharedContext);
    const [docData, setDocData] = useState([]);
    const [getReview, setReview] = useState(true);
    const [getReply, setReply] = useState({ FIVE: '', FOUR: '', THREE: '', TWO: '', ONE: '' });
    const api = localStorage.getItem("API");

    function getAllReplies(e) {
        const { name, value } = e.target;
        setReply({ ...getReply, [name]: value });
    }

    function ReplyReviews(e, rating) {
        e.preventDefault();
    
        const result = {};
    
        if (docData?.fullReview?.[rating]?.length !== 0) {
            result[rating] = {
                accounts: [],
                Reply: getReply[rating] // Ensure correct key usage
            };
    
            // Collect valid accounts
            for (let i = 0; i < docData.fullReview[rating].length; i++) {
                if (docData.fullReview[rating][i]?.comment != null) {
                    result[rating].accounts.push(docData.fullReview[rating][i]?.loc);
                }
            }
        }
    
        console.log("Result Prepared for Submission:", result);
    
        // Check if there are accounts to send
        if (result[rating]?.accounts?.length === 0) {
            console.warn(`No valid accounts found for rating ${rating}`);
            return;
        }
    
        // Submit the result
        async function submitReply(result) {
            try {
                const response = await fetch(api + "/submitReply", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ result })
                });
    
                const data = await response.json();
    
                console.log("✅ Reply Successfully Submitted : ",  data);
                // if (data.message === "okfine") {
                // } else {
                //     console.error("❌ Failed to submit reply:", data);
                // }
            } catch (error) {
                console.error("❌ Error in submitReply:", error.message);
            }
        }
        submitReply(result); // Pass 'result' argument here
    }
    

    useEffect(() => {
        if (getDrName) {
            async function getDocData() {
                setReview(true);
                const response = await fetch(api + "/docData", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ businessName: getDrName }),
                });
                const data = await response.json();
                if (
                    data.fullReview.FIVE.length === 0 &&
                    data.fullReview.FOUR.length === 0 &&
                    data.fullReview.THREE.length === 0 &&
                    data.fullReview.TWO.length === 0 &&
                    data.fullReview.ONE.length === 0
                ) {
                    setReview(false);
                }
                setDocData(data);
            }
            getDocData();
        }
    }, [getDrName]);

 

    return !getReview ? (
        <div>
            <center>No Reviews</center>
        </div>
    ) : (
        getDrName && (
            <div className="grid grid-col-1 bg-[#E3EEFA] dark:bg-[#020617]">
                <h1 className="text-2xl font-bold p-2 flex justify-center">
                    Manage Your Reviews
                </h1>
                {["FIVE", "FOUR", "THREE", "TWO", "ONE"].map((rating, index) => {
                    const reviews = docData?.fullReview?.[rating];
                    const hasValidComment = reviews?.some(review => review?.comment !== null);

                    return (
                        hasValidComment && (
                            <div key={rating} className="grid grid-cols-2 gap-4 m-2 rounded-lg">
                                <div className="bg-[#bae6fd] rounded-lg">
                                    <div className="flex justify-between items-center">
                                        <h1 className="text-2xl font-bold p-4">
                                            {rating.charAt(0) + rating.slice(1).toLowerCase()} Stars ({reviews.length})
                                        </h1>
                                        <h1 className="p-4 text-xl">{'⭐'.repeat(5 - index)}</h1>
                                    </div>
                                    <ReviewDetailsTable okrating={rating} />
                                </div>
                                <div className="bg-[#bae6fd] rounded-lg">
                                    <div className="flex justify-between items-center">
                                        <h1 className="text-2xl font-bold p-4">Enter Reply</h1>
                                    </div>
                                    <div className="m-2 rounded-lg">
                                        <div className="grid grid-cols-[90%_7%] gap-2">
                                            <textarea
                                                className="rounded-lg p-2"
                                                name={rating} // Set the name to the rating
                                                disabled={reviews.length === 0}
                                                placeholder={
                                                    reviews.length === 0
                                                        ? "No Reviews Available"
                                                        : "Enter Reply"
                                                }
                                                onChange={getAllReplies}
                                                value={getReply[rating]} // Use the correct key here
                                            ></textarea>
                                            <button className="flex justify-between items-center bg-[#AAA7CD] hover:bg-blue-700 text-white text-2xl font-bold p-2 rounded" onClick={(e) => ReplyReviews(e, rating)}>
                                               <FiArrowRightCircle />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    );
                })}
              
            </div>
            
        )
    );
}