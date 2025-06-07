import useFetch from "../useFetch";
import { useState } from "react";

const Hotels = () => {
    const {data, loading, error} = useFetch("https://hotel-backend-one.vercel.app/hotels")
    const [successMessage, setSuccessMessege] = useState("");
    if(loading) return <p>Loading...</p>
    if(error) return <p>Error occured: {error.message}</p>
    if(!data) return <p>No hotels found.</p>

    const handleDelete = async(hotelId) => {
    try {
        const response = await fetch(`https://be-4-assignement1.vercel.app/hotels/${hotelId}`,
            {
                method : "DELETE",
            }
            
        )

        if(!response.ok){
            throw new Error("Failed to delete hotel.")
        }

        const data  = await response.json()

        if(data){
            setSuccessMessege("Hotel Deleted Successfully.")
            setTimeout(() => {
            window.location.reload();
            }, 1000);
        }

    } catch (error) {
        console.log(error)
    }
 }

    return(
        <div>
            <h2>All Hotels</h2>
            <ul>
                {data.map(hotel => (
                    <li key={hotel._id}>{hotel.name} <button onClick={() => handleDelete(book._id)}>Delete</button></li>
                ))}
            </ul>
            <p>{successMessage}</p>
        </div>
    )
};
export default Hotels;