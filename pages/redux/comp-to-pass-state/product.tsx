import { addItem, removeItem, clearAllItems } from '../redux-toolkit/slice'
import styles from './header.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchProducts } from '../redux-toolkit/product-slice'
import type { AppDispatch } from '../redux-toolkit/store'

const Product = () => {
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(fetchProducts())
    }, [])

    const selector = useSelector(state => state.products.items)

    return (
        <section className={styles.products}>
        <h2>Products</h2>
        <button className={styles["add-btn"]} onClick={() => dispatch(clearAllItems())}>Clear Cart</button>

        <div className={styles["product-grid"]}>

        <div className={styles["product-card"]}>
            <img src="https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Large%20Appliances/Washers%20and%20Dryers/Images/252060_0_EdXo48ipp.png?updatedAt=1764593518086?tr=w-1000" alt="Product 1" />
            <h3>Product 1</h3>
            <p>$10.00</p>
            <button className={styles["add-btn"]} onClick={() => dispatch(addItem())}>Add to Cart</button>
            <button className={`${styles["add-btn"]} ${styles["remove-btn"]}`} onClick={() => dispatch(removeItem())}>Remove from Cart</button>
        </div>

        <div className={styles["product-card"]}>
            <img src="https://img-prd-pim.poorvika.com/cdn-cgi/image/width=1600,height=1600,quality=75/product/Whirlpool-8-0kg-fully-automatic-front-load-washing-machine-xpert-care-majestic-silver-Front-View.png" alt="Product 2" />
            <h3>Product 2</h3>
            <p>$15.00</p>
            <button className={styles["add-btn"]} onClick={() => dispatch(addItem())}>Add to Cart</button>
            <button className={`${styles["add-btn"]} ${styles["remove-btn"]}`} onClick={() => dispatch(removeItem())}>Remove from Cart</button>
        </div>

        <div className={styles["product-card"]}>
            <img src="https://img-prd-pim.poorvika.com/cdn-cgi/image/width=1600,height=1600,quality=75/product/Bosch-11-0kg-fully-automatic-front-load-washing-machine-series-6-woi115b0in-dark-lake-Front-Left-View.png" alt="Product 3" />
            <h3>Product 3</h3>
            <p>$20.00</p>
            <button className={styles["add-btn"]} onClick={() => dispatch(addItem())}>Add to Cart</button>
            <button className={`${styles["add-btn"]} ${styles["remove-btn"]}`} onClick={() => dispatch(removeItem())}>Remove from Cart</button>
        </div>
        </div>
        </section>
    )
}

export default Product;