import styles from "./header.module.css";
import AddToCart from "./add-to-cart";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>MyShop</div>

      <nav className={styles.nav}>
        <a href="#">Home</a>
        <a href="#">Products</a>
        <a href="#">About</a>
      </nav>
      <AddToCart/>
    </header>
  );
};

export default Header;
