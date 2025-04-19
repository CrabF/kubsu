import { Outlet } from "react-router-dom";
import styles from "./Layout.module.css";
import { Logo } from "src/assets/logo";

export const Layout = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Logo />
        <h1 className={styles.title}>
          Кубанский государственный
          <br /> аграрный университет
        </h1>
      </div>
      <Outlet />
    </div>
  );
};
