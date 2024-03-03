import React, { createContext, useState } from 'react'
import { FastFoodListType } from '../types/FastFoodList.type'

type FilterContextType = {
    fastFoodList: FastFoodListType[]
    setFastFoodList: React.Dispatch<React.SetStateAction<FastFoodListType[]>>
    isLoading:boolean
    error:boolean
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
    setError: React.Dispatch<React.SetStateAction<boolean>>
}

const initial: FilterContextType = {
    fastFoodList: [],
     setFastFoodList: () => {},
     isLoading:true,
     error:true,
     setIsLoading:() => {},
     setError:() => {},

}
export const FilterContext = createContext<FilterContextType>(initial)


const FilterFastFoodContext: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [fastFoodList, setFastFoodList] = useState<FastFoodListType[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<boolean>(false)
    return (
        <FilterContext.Provider value={{ fastFoodList, setFastFoodList,isLoading,setIsLoading,error,setError }}>
            {children}
        </FilterContext.Provider>
    )
}
export default FilterFastFoodContext