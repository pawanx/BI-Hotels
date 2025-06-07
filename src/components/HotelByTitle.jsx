import useFetch from "../useFetch";
const HotelByTitle = ({title}) => {
    const {data, loading, error} = useFetch(`https://hotel-backend-one.vercel.app/hotels/${title}`);
    if(loading) return <p>Loading...</p>;
    if(error) return <p>An error occured {error.message}</p>;
    if(!data) return <p>No Hotel found</p>

    return(
        <div>
            <h2>{data.name}</h2>
            <p><strong>Location :</strong> {data.location}</p>
            <p><strong>Rating:</strong> {data.rating}</p>
            <p><strong>Price Range:</strong> {data.priceRange}</p>
        </div>
    )
}

export default HotelByTitle;