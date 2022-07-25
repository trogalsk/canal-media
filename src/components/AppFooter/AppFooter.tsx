/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { AppLogo } from "../AppLogo";

import styles from "./AppFooter.module.scss";

export const AppFooter = () => {
  return (
    <footer className={styles.appFooter}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <AppLogo />
        </div>
        <div className={styles.columns}>
          <div className={styles.column}>
            &copy; Canal Media
            <br />
            All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
