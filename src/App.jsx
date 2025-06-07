import Hotels from "./components/Hotels"
import HotelByTitle from "./components/HotelByTitle"
import AddHotelForm from "./components/AddHotelForm"

function App() {
  return (
    <main>
      <AddHotelForm/>
      <Hotels/>
      <HotelByTitle title="Hotel Indira"/>
    </main>
  )
}

export default App
