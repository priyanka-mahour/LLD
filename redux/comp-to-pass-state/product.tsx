import { addItem, removeItem, clearAllItems } from '../../pages/redux-toolkit/slice'
import styles from './header.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchProducts } from '../../pages/redux-toolkit/product-slice'
import type { AppDispatch, RootState } from '../../pages/redux-toolkit/store'

// Optional: type for each product item (update based on your API)
interface ProductItem {
  id: string
  title: string
  price: number
  image: string
}

const Product = () => {
    // type-safe dispatch
    const dispatch = useDispatch<AppDispatch>()

    // fetch products on mount
    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    // type-safe selector
    const items = useSelector((state: RootState) => state.products.items)

    return (
        <section className={styles.products}>
            <h2>Products</h2>

            <button
                className={styles["add-btn"]}
                onClick={() => dispatch(clearAllItems())}
            >
                Clear Cart
            </button>

            <div className={styles["product-grid"]}>

                {items?.map((item: ProductItem) => (
                    <div className={styles["product-card"]} key={item.id}>
                        <img src={item.image} alt={item.title} />
                        <h3>{item.title}</h3>
                        <p>${item.price}</p>

                        <button
                            className={styles["add-btn"]}
                            onClick={() => dispatch(addItem())}
                        >
                            Add to Cart
                        </button>

                        <button
                            className={`${styles["add-btn"]} ${styles["remove-btn"]}`}
                            onClick={() => dispatch(removeItem())}
                        >
                            Remove from Cart
                        </button>
                    </div>
                ))}

            </div>
        </section>
    )
}

export default Product