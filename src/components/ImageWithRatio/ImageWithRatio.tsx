/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import * as React from "react";
import cx from "classnames";
import { LoaderSpinner } from "../LoaderSpinner";
import { InView } from "react-intersection-observer";
import { ImageRatio } from "../../enums";
import styles from "./ImageWithRatio.module.scss";
import { useEffect } from "react";

export interface IImageWithRatioProps {
  imageSrc?: string; // source for the image which will be rendered once it is loaded
  placeholderSrc?: string;
  isSpinner?: boolean;
  ratio?: ImageRatio;
  className?: string;
  contentClassName?: string;
  width?: number | string;
  height?: number | string;
  onClick?: () => void;
  onResize?: (width: number, height: number) => void;
  hasGradient?: boolean;
  children?: React.ReactNode;
}

export interface State {
  hasBeenLoaded?: string; // flag that indicates whether or not image has been loaded
  width: number | string;
  height: number | string;
}

/*
 * Component which will display given image based od imageSrc. Until image is not loaded (ready to be rendered)
 * a placeholder image will be rendered
 */
export const ImageWithRatio = ({
  imageSrc,
  placeholderSrc,
  ratio = ImageRatio.ONE_ONE,
  width = -1,
  height = -1,
  hasGradient = false,
  isSpinner = false,
  onClick,
  onResize,
  children,
  className,
  contentClassName,
}: IImageWithRatioProps) => {
  const [isLoaded, setIsLoaded] = React.useState<boolean>();
  const imageLoader: HTMLImageElement = new Image();

  const getContainerStyle = () => {
    const style: React.CSSProperties = {};
    if (width !== -1) {
      style.width = width;
    }

    if (height !== -1) {
      style.height = height;
    }
    return style;
  };

  const getRatioStyle = () => {
    if (hasGradient) {
      return {
        backgroundImage: `linear-gradient(to bottom, transparent, black 90%), url(${imageSrc})`,
      };
    }
    return {
      backgroundImage: `url(${isLoaded ? imageSrc : placeholderSrc})`,
    };
  };

  const getRatioClassName = () => {
    let className = styles.image;

    switch (ratio) {
      case ImageRatio.ONE_ONE:
        className += " " + styles.ratio11;
        break;
      case ImageRatio.SIXTEEN_NINE:
        className += " " + styles.ratio169;
        break;
      case ImageRatio.SIXTEEN_SEVEN:
        className += " " + styles.ratio167;
        break;
      case ImageRatio.SIXTEEN_SIX:
        className += " " + styles.ratio166;
        break;
      case ImageRatio.SIXTEEN_FIVE:
        className += " " + styles.ratio165;
        break;
      case ImageRatio.FOUR_THREE:
        className += " " + styles.ratio43;
        break;
      case ImageRatio.THREE_TWO:
        className += " " + styles.ratio32;
        break;
      case ImageRatio.EIGHT_FIVE:
        className += " " + styles.ratio85;
        break;
      case ImageRatio.TWENTY_TWENTYTHREE:
        className += " " + styles.ratio2023;
        break;
      default:
        break;
    }

    return className;
  };

  const loadImage = (currentOverlayImage = "") => {
    imageLoader.src = currentOverlayImage;
    imageLoader.onload = () => {
      if (onResize) {
        onResize(imageLoader.width, imageLoader.height);
      }
      setIsLoaded(true);
    };
  };

  useEffect(() => {
    loadImage(imageSrc);

    return () => {
      imageLoader.src = "";
    };
  }, [imageSrc]);

  const onImageClick = () => {
    onClick?.();
  };

  return (
    <div
      onClick={onImageClick}
      style={getContainerStyle()}
      className={cx(className, styles.image)}
    >
      <InView rootMargin="25% 0px" triggerOnce={true}>
        {({ inView, ref }) =>
          inView ? (
            <div
              ref={ref}
              style={getRatioStyle()}
              className={getRatioClassName()}
            >
              {!isLoaded && isSpinner !== false && (
                <div className={styles.spinner}>
                  <LoaderSpinner />
                </div>
              )}
              <div className={cx(contentClassName, styles.content)}>
                {children}
              </div>
            </div>
          ) : (
            <div ref={ref} className={getRatioClassName()} />
          )
        }
      </InView>
    </div>
  );
};
