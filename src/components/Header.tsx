import { useContext, useEffect, useState } from "react"
import { FastFoodCategories } from "../types/FastFoodCategories.type"
import { FilterContext } from "../context/FilterFastFoodContext"
import Spinner from "./Spinner"
import { CiSearch } from "react-icons/ci"
import styles from "./Header.module.css"



function Header() {
    const [fastFoodCategories, setFastFoodCategories] = useState<FastFoodCategories[]>()
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState("")
    
    const { setFastFoodList, setIsLoading } = useContext(FilterContext)

    const fastFoodFilterHandler = async (id?: number) => {
        setFastFoodList([])
        setIsLoading(true)
        try {
            const res = await fetch(
                `https://react-mini-projects-api.classbon.com/FastFood/list${id ? `?categoryId=${id.toString()}` : ""}`
            )
            const list = await res.json()
            setFastFoodList(list)
        } catch (error) {
            console.log(error);


        } finally {
            setIsLoading(false)
        }
    }

    const getCategories = async () => {
        try {
            const res = await fetch(
                "https://react-mini-projects-api.classbon.com/FoodCategory/categories"
            )
            const categories = await res.json()
            setFastFoodCategories(categories)
        } catch (error) {
            setError(true)
        } finally {
            setLoading(false)
        }
    }


    const searchHandler = async () => {
        setFastFoodList([])
        setIsLoading(true)
        try {
            const response = await fetch(`https://react-mini-projects-api.classbon.com/FastFood/search${inputValue ? `?term=${inputValue}` : ""}`)
            const result = await response.json()
            setFastFoodList(result)

        } catch (error) {
            console.log(error);

        } finally {
            setIsLoading(false)
        }

    }

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }

    useEffect(() => {
        getCategories()

    }, [])

    useEffect(() => {
        const timeOut = setTimeout(() => {
            searchHandler()
        }, 700)

        return () => clearTimeout(timeOut)

    }, [inputValue])

    return (
        <header>
            <div className={styles.top}>
                <img src="/pizza.jpg" alt="پیتزا" />
            </div>
            <nav className={styles.nav}>
                {loading ? (
                    <div className={styles.loadingContainer}>
                        <Spinner />
                    </div>
                ) : (
                    <>
                        {error ? (
                            <div className={styles.errorContainer}>
                                <span>
                                    در ارتباط با سرور مشکلی پیش آمده است.
                                </span>
                            </div>
                        ) : (
                            <>
                                <ul
                                    className={`${styles.navList} ${isOpen && styles.active
                                        } `}
                                >
                                    <li onClick={() => fastFoodFilterHandler()}>
                                        <a>همه</a>
                                    </li>

                                    {fastFoodCategories?.map((category) => {
                                        return (
                                            <li key={category.id} onClick={() => fastFoodFilterHandler(category.id)}>
                                                <a>{category.name}</a>
                                            </li>
                                        )
                                    })}
                                </ul>
                                <div
                                    className={styles.filter}
                                    onClick={()=>setIsOpen(!isOpen)}
                                >
                                    {isOpen ? "بستن فیلتر" : "نمایش فیلتر"}
                                </div>
                                <div className={styles.inputContainer}>
                                    <input
                                        className={styles.input}
                                        type="text"
                                        placeholder="جستجو"
                                        value={inputValue}
                                        onChange={inputChangeHandler}
                                    />
                                    <div className={styles.icon}>
                                        <CiSearch size={20} />
                                    </div>
                                </div>
                            </>
                        )}
                    </>
                )}
            </nav>
        </header>
    )
}

export default Header
