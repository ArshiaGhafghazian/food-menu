import { useContext, useEffect } from "react"
import Card from "./Card"
import styles from "./Cards.module.css"
import Spinner from "./Spinner"
import { FilterContext } from "../context/FilterFastFoodContext"



function Cards() {

  const { fastFoodList, setFastFoodList, isLoading, setIsLoading, error, setError } = useContext(FilterContext)

  const getFastFoodList = async () => {
      try {
          const res = await fetch(
            "https://react-mini-projects-api.classbon.com/FastFood/list"
          )
          const foodList = await res.json()
          setFastFoodList(foodList)
      } catch (error) {
          setError(true)
      } finally {
          setIsLoading(false)
      }
  }


  useEffect(() => {
    getFastFoodList()
  }, [])


  return (

    <div className={styles.container}>
      {error && <div style={{ width: "100%", display: "flex", justifyContent: "center", color: "red" }}>مشکلی پیش آمده است</div>}
      {isLoading ? (<div style={{ width: "100%", display: "flex", justifyContent: "center" }}><Spinner /></div>) : <>

        {fastFoodList.length < 1 && <div style={{ width: "100%", display: "flex", justifyContent: "center", color: "red" }}>چیزی برای نمایش وجود ندارد</div>}
        <div className={styles.grid}>
          {fastFoodList?.map((fastFood) => (<Card key={fastFood.id} {...fastFood} />))}
        </div>
      </>}


    </div>
  )
}

export default Cards