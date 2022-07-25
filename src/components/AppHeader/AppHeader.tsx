/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import React, { useMemo, useState } from "react";
import { InView } from "react-intersection-observer";
import { AppLogo } from "../AppLogo";
import { SearchInput } from "../SearchInput";
import cx from "classnames";

import styles from "./AppHeader.module.scss";

export const AppHeader = () => {
  const [isInPrimaryView, setIsInPrimaryView] = useState(true);

  const renderHeader = useMemo(() => {
    return (
      <header
        className={cx(styles.header, {
          [styles.headerTop]: isInPrimaryView,
        })}
      >
        <div className={styles.headerLeft}>
          <AppLogo />
        </div>
        <div className={styles.headerRight}>
          <SearchInput />
        </div>
      </header>
    );
  }, [isInPrimaryView]);

  return (
    <InView onChange={(inView) => setIsInPrimaryView(inView)}>
      {renderHeader}
    </InView>
  );
};
