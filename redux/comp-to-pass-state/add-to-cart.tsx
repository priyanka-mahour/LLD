import styles from "./header.module.css";
import { useSelector } from "react-redux";
import type { RootState } from '../../pages/redux-toolkit/store'

const AddToCart = () => {
    const selector = useSelector((state: RootState) => state.cart.value)

    return (
        <div className={styles["cart-wrapper"]}>
        <span className={styles["cart-icon"]}>🛒</span>
        <span className={styles["cart-count"]}>{selector}</span>
      </div>
    )
}

export default AddToCart;
