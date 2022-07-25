/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import React, { useMemo } from "react";
import Link from "next/link";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { ImageWithRatio } from "../../../ImageWithRatio";
import { IListComponentItemProps } from "../../models";
import { ImageRatio } from "../../../../enums";
import { useAppSelector, AppState } from "../../../../store";
import { RouteHelper } from "../../../../helpers";

import styles from "./ListComponentItemHighlight.module.scss";

type IListComponentItemHighlightProps = IListComponentItemProps;

export const ListComponentItemHighlight = ({
  media,
  isPlaceholder,
}: IListComponentItemHighlightProps) => {
  const configuration = useAppSelector(
    (state: AppState) => state.configuration.configuration,
  );
  const renderSkeleton = useMemo(() => {
    if (!media) {
      return (
        <div className={`${styles.item} ${styles.itemSkeleton}`}>
          <SkeletonTheme>
            <div className={styles.skeleton}>
              <div style={{ marginBottom: "14px" }}>
                <Skeleton width={"20%"} height="18px" />
              </div>
              <div style={{ marginBottom: "5px" }}>
                <Skeleton width={"40%"} height="49px" />
              </div>
              <div style={{ marginBottom: "30px" }}>
                <Skeleton width={"30%"} height="24px" />
              </div>
              <div style={{ marginBottom: "5px" }}>
                <Skeleton width={"50%"} height="18px" />
              </div>
              <div style={{ marginBottom: "5px" }}>
                <Skeleton width={"48%"} height="18px" />
              </div>
              <div style={{ marginBottom: "5px" }}>
                <Skeleton width={"49%"} height="18px" />
              </div>
              <div>
                <Skeleton width={"35%"} height="18px" />
              </div>
            </div>
          </SkeletonTheme>
        </div>
      );
    }
  }, [media]);

  if (!media || isPlaceholder) {
    return <>{renderSkeleton}</>;
  }

  const imageUrl = `${configuration?.images?.base_url}w1280${media?.backdrop_path}`;

  return (
    <Link href={RouteHelper.getDetailsPath(media)}>
      <a className={styles.item} id="highlightListItem">
        <ImageWithRatio
          isSpinner={false}
          key={media?.id}
          ratio={ImageRatio.SIXTEEN_SEVEN}
          contentClassName={styles.background}
          imageSrc={imageUrl}
        >
          <div className={styles.container}>
            <div className={styles.content}>
              <h1 className={styles.title}>{media?.title}</h1>
              <div className={styles.infoContainer}>
                <p className={styles.description}>{media.overview}</p>
              </div>
            </div>
          </div>
        </ImageWithRatio>
      </a>
    </Link>
  );
};
