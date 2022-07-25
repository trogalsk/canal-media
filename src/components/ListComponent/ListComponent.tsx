/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import cx from "classnames";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { ListComponentArrow } from "../ListComponentArrow";
import { ListComponentItem } from "../ListComponentItem";
import React, { useCallback, useMemo, useState } from "react";
import { InView } from "react-intersection-observer";
import Slider, { Settings } from "react-slick";

import { CellType } from "../../enums";
import { IMovieModel } from "../../models";
import {
  AppState,
  useAppSelector,
  useAppDispatch,
  MediaStore,
} from "../../store";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./ListComponent.module.scss";

export interface IListComponentProps {
  id: string;
  title?: string;
  cellType?: CellType;
  cellCount?: number;
  className?: string;
  placeholder?: React.ReactElement;
  pageNumber?: number;
  imageSize?: string;
}

export const ListComponent = ({
  id,
  className,
  title,
  cellType = CellType.Frame,
  cellCount = 5,
  placeholder,
  pageNumber = 1,
  imageSize,
}: IListComponentProps) => {
  const mediaList = useAppSelector(
    (state: AppState) => state.media.movieList[id]
  ) || { results: [] };
  const dispatch = useAppDispatch();

  const getMediaList = useCallback(
    () =>
      dispatch(
        MediaStore.getMovieList({
          mediaListId: id,
          filter: {
            page: pageNumber,
          },
        })
      ),
    [dispatch]
  );

  const [isListFocused, setIsListFocused] = useState(false);
  const [sliderTouched, setSliderTouched] = useState(false);

  const settings: Settings =
    cellType === CellType.Highlights
      ? {
          dots: true,
          autoplay: true,
          autoplaySpeed: 10000,
          pauseOnDotsHover: true,
          pauseOnFocus: true,
          pauseOnHover: true,
          swipeToSlide: true,
          fade: true,
          speed: 700,
          waitForAnimate: false,
        }
      : {};

  const onChangeInView = useCallback(
    (inView: boolean) => {
      if (inView && id && getMediaList) {
        getMediaList();
      }
    },
    [getMediaList, id]
  );

  const renderItems = useMemo(() => {
    if (mediaList && !mediaList.pending && mediaList.results.length > 0) {
      return mediaList.results.map((media: IMovieModel) => {
        return (
          <ListComponentItem
            key={`${media.id}`}
            cellType={cellType}
            media={media}
            isPlaceholder={false}
            imageSize={imageSize}
          />
        );
      });
    }

    return (
      placeholder ||
      Array(cellCount)
        .fill(undefined)
        .map((_, idx) => (
          <ListComponentItem
            key={`placeholder_${idx}`}
            cellType={cellType}
            isPlaceholder
          />
        ))
    );

    return null;
  }, [mediaList]);

  const handleSliderTouched = () => {
    setSliderTouched(true);
  };

  const getArrowContainerStyle = useCallback(
    (direction: string) => {
      const isLeftArrow = direction === "left";
      const showLeftArrowAfterFirstTouch =
        (sliderTouched || cellType === CellType.Highlights) && isLeftArrow;
      const arrows = {
        justifyContent: isLeftArrow ? "flex-start" : "flex-end",
        display: showLeftArrowAfterFirstTouch || !isLeftArrow ? "flex" : "none",
      };
      const background = {
        background: `linear-gradient(to ${direction} , rgb(0, 0, 0, 0.0),  rgb(0, 0, 0, ${
          cellType === CellType.Highlights ? 0 : 0.5
        }))`,
      };
      return { arrows, background };
    },
    [sliderTouched]
  );

  const arrowContainer = useCallback(
    (arrowDirection: string) => {
      return isListFocused ? (
        <ListComponentArrow
          direction={arrowDirection}
          containerStyle={getArrowContainerStyle(arrowDirection)}
        />
      ) : undefined;
    },
    [isListFocused, getArrowContainerStyle]
  );

  const renderHeader = useMemo(() => {
    if (title) {
      return (
        <SkeletonTheme baseColor={"#383346"} highlightColor={"#383346"}>
          <header className={styles.titleContainer}>
            <span className={styles.title}>
              {mediaList &&
              !mediaList.pending &&
              mediaList.results.length > 0 ? (
                title
              ) : (
                <Skeleton width="25rem" />
              )}
            </span>
          </header>
        </SkeletonTheme>
      );
    }
  }, [title, mediaList]);

  // if (mediaList && !mediaList.pending && mediaList.results.length === 0) {
  //   return null;
  // }

  return (
    <InView
      as="div"
      id={`list-${id}`}
      className={cx(styles.list, cellType === CellType.Highlights ? styles.listHighlights : null, className)}
      rootMargin="25% 0px"
      triggerOnce
      onChange={onChangeInView}
    >
      <div
        className={styles.container}
        onMouseOver={() => setIsListFocused(true)}
        onMouseLeave={() => setIsListFocused(false)}
      >
        {renderHeader}
        <Slider
          className={cx({ ["cover-list"]: cellType === CellType.Poster })}
          slidesToShow={cellCount}
          slidesToScroll={cellCount - 1}
          draggable={true}
          infinite={sliderTouched || cellType === CellType.Highlights}
          afterChange={handleSliderTouched}
          prevArrow={arrowContainer("left")}
          nextArrow={arrowContainer("right")}
          {...settings}
        >
          {renderItems}
        </Slider>
      </div>
    </InView>
  );
};
