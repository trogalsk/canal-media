/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import React, { useCallback } from "react";
import { useAppSelector, AppState } from "../../../../store";
import { ImageWithPlaceholder } from "../../../ImageWithPlaceholder";
import placeholder from "../../../../resources/icons/placeholder.png";
import { IListComponentItemProps } from "../../models";
import { RouteHelper } from "../../../../helpers";
import { useRouter } from "next/router";
import cx from "classnames";

import styles from "./ListComponentItemPoster.module.scss";

export const ListComponentItemPoster = ({
  media,
  isPlaceholder = false,
  imageSize = "w185",
}: IListComponentItemProps) => {
  const configuration = useAppSelector(
    (state: AppState) => state.configuration.configuration,
  );
  const router = useRouter();
  const imageUrl = `${configuration?.images?.base_url}${imageSize}${media?.poster_path}`;

  const goToMedia = useCallback(() => {
    if (!media) {
      return;
    }

    router.push({
      pathname: RouteHelper.getDetailsPath(media),
    });
  }, [media]);

  if (!media || isPlaceholder) {
    return (
      <div className={styles.containerSkeleton}>
        <div className={styles.itemSkeleton} />
      </div>
    );
  }

  return (
    <div className={cx(styles.item)} onClick={goToMedia}>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <ImageWithPlaceholder
            imageSrc={imageUrl}
            placeholderAltText={media.title}
            imageContainerClassName={styles.image}
            placeholderSrc={placeholder.src}
          />
        </div>
      </div>
    </div>
  );
};
