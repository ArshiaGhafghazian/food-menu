import { useEffect, useState } from "react"
import styles from "./Header.module.css"
import { CiSearch } from "react-icons/ci"
import { FastFoodCategories } from "../types/FastFoodCategories.type"
function Header() {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [fastFoodCategories, setFastFoodCategories] =
        useState<FastFoodCategories[]>()

    const getCategories = async () => {
        const res = await fetch(
            "https://react-mini-projects-api.classbon.com/FoodCategory/categories"
        )
        const categories = await res.json()
        setFastFoodCategories(categories)
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
                <ul className={`${styles.navList} ${isOpen && styles.active} `}>
                    {fastFoodCategories?.map((category) => {
                        return (
                            <li key={category.id}>
                                <a>{category.name}</a>
                            </li>
                        )
                    })}
                </ul>
                <div className={styles.filter} onClick={filterHandler}>
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
            </nav>
        </header>
    )
}

export default Header
