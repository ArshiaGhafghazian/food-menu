import { useContext, useEffect, useState } from "react"
import styles from "./Header.module.css"
import { CiSearch } from "react-icons/ci"
import { FastFoodCategories } from "../types/FastFoodCategories.type"
import Spinner from "./Spinner"
import { FilterContext } from "../context/FilterFastFoodContext"
function Header() {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [fastFoodCategories, setFastFoodCategories] =
        useState<FastFoodCategories[]>()

    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<boolean>(false)

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

    const filterHandler = () => {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <header>
            <div className={styles.top}>
                <img src="../../public/pizza.jpg" alt="" />
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
                                    onClick={filterHandler}
                                >
                                    {isOpen ? "بستن فیلتر" : "نمایش فیلتر"}
                                </div>
                                <div className={styles.inputContainer}>
                                    <input
                                        className={styles.input}
                                        type="text"
                                        placeholder="جستجو"
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
