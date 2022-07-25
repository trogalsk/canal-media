/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */

import React, { useEffect } from "react";
import { useRouter } from "next/router";
import {
  useAppDispatch,
  MediaStore,
  AppState,
  useAppSelector,
} from "../../store";
import {
  AppFooter,
  AppHeader,
  LoaderSpinner,
  ImageWithPlaceholder,
} from "../../components";

import placeholder from "../../resources/icons/placeholder.png";

import styles from "./MediaDetailsScreen.module.scss";

export const MediaDetailsScreen = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const mediaId = +(router.query.id || -1);
  const mediaState = useAppSelector((state: AppState) => state.media.media);
  const media = mediaState.data?.id === mediaId ? mediaState.data : undefined;
  const configuration = useAppSelector(
    (state: AppState) => state.configuration.configuration
  );

  useEffect(() => {
    // Scroll content to top
    document.body.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    // Get movie data
    if (mediaId && !media) {
      dispatch(MediaStore.getMovie({ id: mediaId }));
    }
  }, [mediaId]);

  const renderContent = () => {
    if (mediaState.pending) {
      return <LoaderSpinner className={styles.loader} />;
    }

    if (mediaState.error || !media) {
      return (
        <>
          <h2>App encountered some problems during load media details</h2>
          <p>{mediaState.error?.message}</p>
        </>
      );
    }

    const bannerImageUrl = `${configuration?.images?.base_url}w1280${media?.backdrop_path}`;
    const posterImageUrl = `${configuration?.images?.base_url}w342${media?.poster_path}`;

    return (
      <div className={styles.mediaDetails}>
        <div className={styles.background}>
          <ImageWithPlaceholder
            placeholderSrc={placeholder.src}
            placeholderAltText={media.title}
            imageSrc={bannerImageUrl}
            imageContainerClassName={styles.image}
          />
          <img
            className={styles.poster}
            src={posterImageUrl}
            alt={media.title}
          />
          <div className={styles.mediaMainInfo}>
            <h1>{media.title}</h1>
            {media?.genres && !!media.genres.length && (
              <p className={styles.genre}>{media.genres.map((genre) => genre.name).join(", ")}</p>
            )}
          </div>

          {/* <div className={styles.playInfoWrapper}>
                <MediaDetailsPlayInfo canWatch={canWatch} isMobile={isMobile} />
              </div>
              

              <MediaDetailsCoverImg
                className={styles.coverImg}
                images={media?.Images}
                altText={media?.Title}
              />
              <MediaDetailsTopContent isLoggedIn={isLoggedIn} media={media} /> */}
        </div>
        <div className={styles.mediaAdditionalInfo}>
          <p className={styles.description}>{media.overview}</p>
          <ul className={styles.mediaAdditionalList}>
            {media?.production_companies &&
              !!media.production_companies.length && (
                <li className={styles.mediaAdditionalListItem}>
                  <h3>Production company</h3>
                  <p>
                    {media.production_companies
                      .map((company) => company.name)
                      .join(", ")}
                  </p>
                </li>
              )}
            {media?.production_countries &&
              !!media.production_countries.length && (
                <li className={styles.mediaAdditionalListItem}>
                  <h3>Production country</h3>
                  <p>
                    {media.production_countries
                      .map((country) => country.name)
                      .join(", ")}
                  </p>
                </li>
              )}
            {media?.spoken_languages && !!media.spoken_languages.length && (
              <li className={styles.mediaAdditionalListItem}>
                <h3>Language</h3>
                <p>
                  {media.spoken_languages
                    .map((language) => language.name)
                    .join(", ")}
                </p>
              </li>
            )}
            {media.popularity && (
              <li className={styles.mediaAdditionalListItem}>
                <h3>Popularity</h3>
                <p>{media.popularity}</p>
              </li>
            )}
            {media.vote_average && (
              <li className={styles.mediaAdditionalListItem}>
                <h3>Vote</h3>
                <p>{media.vote_average}</p>
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <AppHeader />
      <main className={styles.main}>{renderContent()}</main>
      <AppFooter />
    </div>
  );
};
