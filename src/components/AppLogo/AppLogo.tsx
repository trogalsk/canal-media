/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import Link from "next/link";
import { RouteHelper } from "../../helpers";

import styles from "./AppLogo.module.scss";

interface IAppLogoProps {
  noMargin?: boolean;
}

export const AppLogo = ({ noMargin = false }: IAppLogoProps) => {
  const headerClassName = noMargin ? styles.headerNoMargin : styles.header;

  return (
    <div className={headerClassName}>
      <Link href={RouteHelper.getHomePath()}>
        <a>
          <img className={styles.logo} src="/logo.png" alt="Canal media" />
        </a>
      </Link>
    </div>
  );
};
