
import "./App.css"
import Cards from "./components/Cards"
import Header from "./components/Header"

import FilterFastFoodContext from "./context/FilterFastFoodContext"

function App() {

    return (
        <>
            <FilterFastFoodContext>
                <Header />
                <Cards />
            </FilterFastFoodContext>
        </>
    )
}

export default App
