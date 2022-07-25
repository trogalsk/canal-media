/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { IMovieListStateModel, ISearchQueryModel } from "../../models";
import {
  AppFooter,
  AppHeader,
  GridComponent,
  LoaderSpinner,
} from "../../components";
import { MediaStore, useAppDispatch, useAppSelector } from "../../store";
import { CellType } from "../../enums";
import { COMMON, ROUTES } from "../..//constants";

import styles from "./SearchScreen.module.scss";

export const SearchScreen = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const params = router.query as ISearchQueryModel;
  const queryString = params.query?.toString();
  const pageNumber = +(params.page || 1);
  const mediaSearch = useAppSelector<IMovieListStateModel>(
    (store) => store.media.mediaSearch
  );

  useEffect(() => {
    if (
      pageNumber &&
      queryString &&
      queryString.length >= COMMON.MIN_SEARCH_LENGTH
    ) {
      dispatch(
        MediaStore.searchMovie({
          filter: {
            page: pageNumber,
            query: queryString,
          },
        })
      );
    }
  }, [params]);

  const getMore = () => {
    router.replace(
      {
        pathname: ROUTES.SEARCH_SCREEN,
        query: {
          ...params,
          page: pageNumber + 1,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  const renderResults = () => {
    const hasMoreItems =
      mediaSearch?.total_results &&
      mediaSearch?.total_results > mediaSearch?.results?.length;
    const isOnFirstPage = mediaSearch?.page === 1;
    const isOnNextPage = mediaSearch?.page && mediaSearch?.page > 1;

    if (mediaSearch.pending && isOnFirstPage) {
      return (
        <div className={styles.loader}>
          <LoaderSpinner />
        </div>
      );
    }

    if (mediaSearch.results.length === 0) {
      return (
        <div>
          <h1>No search results</h1>
          <p>Sorry, we didn&apos;t find any results matching this search.</p>
        </div>
      );
    }

    return (
      <>
        <GridComponent
          columns={4}
          mediaList={mediaSearch.results}
          loading={mediaSearch.pending}
          cellType={CellType.Frame}
          title="SEARCH RESULTS"
        />
        {hasMoreItems && (
          <div className={styles.loader}>
            {mediaSearch?.pending && isOnNextPage ? (
              <LoaderSpinner />
            ) : (
              <button className={styles.button} onClick={getMore}>
                Show more
              </button>
            )}
          </div>
        )}
      </>
    );
  };

  return (
    <div className={styles.container}>
      <AppHeader />
      <main className={styles.main}>{renderResults()}</main>
      <AppFooter />
    </div>
  );
};
