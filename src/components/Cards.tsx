import { useEffect, useState } from "react"
import Card from "./Card"
import styles from "./Cards.module.css"
import { FastFoodListType } from "../types/FastFoodList.type"
import Spinner from "./Spinner"

function Cards() {

  const [fastFoodList, setFastFoodList] = useState<FastFoodListType[]>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)

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
      {isLoading && <div style={{width:"100%",display:"flex", justifyContent:"center"}}><Spinner /></div>}
      {error && <div style={{width:"100%",display:"flex", justifyContent:"center", color:"red"}}>مشکلی پیش آمده است</div>}
      <div className={styles.grid}>
        {fastFoodList?.map((fastFood) => (<Card key={fastFood.id} {...fastFood} />))}
      </div>

    </div>
  )
}

export default Cards