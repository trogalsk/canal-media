/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import cx from "classnames";
import React, { useState } from "react";
import { useRouter } from "next/router";

import { COMMON, ROUTES } from "../../constants";
import { ISearchQueryModel } from "../../models";

import SearchIcon from "../../resources/icons/search.svg";

import styles from "./SearchInput.module.scss";

export const SearchInput = () => {
  const router = useRouter();
  const params = router.query as ISearchQueryModel;
  const queryString = params.query;
  const [focused, setFocused] = useState<boolean>(!!queryString);

  const onSearchClick = () => {
    setFocused(true);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = (e.target.value || "").trim();

    if (value.length >= COMMON.MIN_SEARCH_LENGTH) {
      if (router.pathname.includes("search")) {
        router.replace(
          {
            pathname: ROUTES.SEARCH_SCREEN,
            query: {
              ...params,
              query: encodeURIComponent(value),
              page: 1,
            },
          },
          undefined,
          { shallow: true },
        );
      } else {
        router.push({
          pathname: ROUTES.SEARCH_SCREEN,
          query: {
            query: encodeURIComponent(value),
            page: 1,
          },
        });
      }
    }
  };

  return (
    <div
      className={cx(styles.container, {
        [styles.isActive]: queryString || focused,
      })}
    >
      <span
        className={cx(styles.inputContainer, {
          [styles.inputContainerActive]: queryString || focused,
        })}
      >
        <input
          type="text"
          className={styles.input}
          autoFocus={!!queryString}
          spellCheck={false}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          defaultValue={params.query ? decodeURIComponent(params.query) : ""}
        />
        <button className={styles.button} onClick={onSearchClick}>
          <SearchIcon />
        </button>
      </span>
    </div>
  );
};
