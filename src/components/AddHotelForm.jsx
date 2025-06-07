import { useState } from "react"
const AddHotelForm = () => {
 const [formData, setformData] = useState({
    name : "",
    category : "",
    location : "",
    rating : "",
    website : "",
    phoneNumber : "",
    checkInTime : "",
    checkOutTime : "",
    amenities : "",
    priceRange : "",
    reservationNeeded : false,
    isParkingAvailable : false,
    isWifiAvailable : false,
    isPoolAvailable : false,
    isSpaAvailable : false,
    isRestaurantAvailable : false,
    photos : "",
 });


 const onChangeHandler = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setformData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else if (["amenities", "photos"].includes(name)) {
      setformData((prev) => ({
        ...prev,
        [name]: value, // Save as string, convert on submit
      }));
    } else if (name === "rating") {
      setformData((prev) => ({
        ...prev,
        [name]: parseFloat(value),
      }));
    } else {
      setformData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const payload = {
    ...formData,
    amenities: formData.amenities
      ? formData.amenities.split(',').map((a) => a.trim()).filter(Boolean)
      : [],
    photos: formData.photos
      ? formData.photos.split(',').map((p) => p.trim()).filter(Boolean)
      : [],
    rating: formData.rating ? parseFloat(formData.rating) : 0, // ensure rating is number
  };
  const submitHandler = async(event) => {
        event.preventDefault();
        try{
            const response = await fetch("https://hotel-backend-one.vercel.app/hotels",
                {
                    method : "POST",
                    headers : {
                        "Content-type" : "application/json"
                    },
                    body : JSON.stringify(payload)
                }
            );

            if(!response.ok){
                throw new Error("Failed to add movie.")
            }

            const data = await response.json();

            console.log("Added movie",data)

        }catch(error){
            console.log(error)
        }
    }

 return (
    <div>
        <h2>Add New Hotel</h2>
        <form onSubmit={submitHandler}>
            <label>Name:</label>
            <br />
            <input type="text" name="name" value={formData.name} onChange={onChangeHandler}/>
            <br /><br />

            <label>Category:</label>
            <select name="category" id="selectCategory" value={formData.category}  onChange={onChangeHandler}>
                <option value="Budget">Budget</option>
                <option value="Mid-Range">Mid-Range</option>
                <option value="Luxury">Luxury</option>
                <option value="Boutique">Boutique</option>
                <option value="Resort">Resort</option>
                <option value="Other">Other</option>
            </select>
            <br /><br />

            <label>Location:</label>
            <br />
            <input type="text" name="location" value={formData.location} onChange={onChangeHandler}/>
            <br /><br />

            <label>Rating:</label>
            <br />
            <input type="number" name="rating" value={formData.rating} onChange={onChangeHandler}/>
            <br /><br />

            <label>Website:</label>
            <br />
            <input type="text" name="website" value={formData.website} onChange={onChangeHandler}/>
            <br /><br />

            <label>Phone Number:</label>
            <br />
            <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={onChangeHandler} />
            <br /><br /> 


            <label>CheckIn Time:</label>
            <br />
            <input type="text" name="checkInTime" value={formData.checkInTime} onChange={onChangeHandler}/>
            <br /><br />

            <label>CheckOut Time:</label>
            <br />
            <input type="text" name="checkOutTime" value={formData.checkOutTime} onChange={onChangeHandler}/>
            <br /><br />

             <label>Amenities:</label>
            <br />
            <input type="text" name="amenities" value={formData.amenities} onChange={onChangeHandler}/>
            <br /><br />

            <label>Price Range:</label>
            <br />
            <select name="priceRange" id="priceRange" value={formData.priceRange} onChange={onChangeHandler}>
                <option value="$$ (11-30)">$$ (11-30)</option>
                 <option value="$$$ (31-60)">$$$ (31-60)</option>
                  <option value="$$$$ (61+)">$$$$ (61+)</option>
                  <option value="Other">Other</option>
            </select>
            <br /><br />

            <label>
            <input type="checkbox" name="reservationNeeded" onChange={onChangeHandler} checked={formData.reservationNeeded}/>
                Reservation Needed
            </label>
            <br /><br />

            <label>
            <input type="checkbox" name="isParkingAvailable" checked={formData.isParkingAvailable}  onChange={onChangeHandler} />
                Is Parking Available:
            </label>
            <br /><br />

            <label>
            <input type="checkbox" name="isWifiAvailable" checked={formData.isWifiAvailable}  onChange={onChangeHandler} />
                Is Wifi Available:
            </label>
            <br /><br />

            <label>
            <input type="checkbox" name="isPoolAvailable" checked={formData.isPoolAvailable} onChange={onChangeHandler} />
                Is Pool Available:
            </label>
            <br /><br />

            <label>
            <input type="checkbox" name="isSpaAvailable" checked={formData.isSpaAvailable}  onChange={onChangeHandler} />
                Is Spa Available:
            </label>
            <br /><br />

            <label>
            <input type="checkbox" name="isRestaurantAvailable" checked={formData.isRestaurantAvailable} onChange={onChangeHandler} />
                Is Restaurant Available:
            </label>
            <br /><br />
           
           <label>Photos:</label>
            <br />
            <input type="text" name="photos" value={formData.photos} onChange={onChangeHandler}/>
            <br /><br />

            <input type="submit" value="Submit"/>

        </form>
    </div>
 )
};

export default AddHotelForm;