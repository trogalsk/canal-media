/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import * as React from "react";
import { useEffect } from "react";
import { LoaderSpinner } from "../LoaderSpinner";
import styles from "./ImageWithPlaceholder.module.scss";

export interface IImageWithPlaceholderProps {
  imageContainerClassName?: string; // custom className for component
  imageContainerStyles?: React.CSSProperties; // custom styles for component
  imageClassName?: string; // custom styles for image element
  imageSrc?: string; // source for the image which will be rendered once it is loaded
  spinner?: boolean;
  placeholderSrc?: string;
  placeholderAltText?: string;
  children?: React.ReactNode;
}

export interface State {
  hasBeenLoaded?: string; // flag that indicates whether or not image has been loaded
}

/*
 * Component which will display given image based od imageSrc. Until image is not loaded (ready to be rendered)
 * a placeholder image will be rendered
 */
export const ImageWithPlaceholder: React.FC<IImageWithPlaceholderProps> = ({
  imageClassName,
  imageSrc,
  spinner,
  children,
  imageContainerClassName = "",
  imageContainerStyles = {},
  placeholderSrc,
  placeholderAltText,
}: IImageWithPlaceholderProps) => {
  const [isLoaded, setIsLoaded] = React.useState<boolean>();
  const imageLoader: HTMLImageElement = new Image();

  const loadImage = (currentOverlayImage = "") => {
    imageLoader.src = currentOverlayImage;
    imageLoader.onload = () => {
      setIsLoaded(true);
    };
  };

  useEffect(() => {
    loadImage(imageSrc);

    return () => {
      imageLoader.src = "";
    };
  }, [imageSrc]);

  const viewContent = () => {
    if (isLoaded && imageSrc) {
      const imgClassName = imageClassName
        ? `${styles.image} ${imageClassName}`
        : styles.image;
      return (
        <img
          alt={placeholderAltText}
          key="placeholder"
          draggable={false}
          src={imageSrc}
          className={imgClassName}
        />
      );
    } else if (placeholderSrc && spinner) {
      return (
        <div key="spinner" className={styles.spinner}>
          <LoaderSpinner />
        </div>
      );
    }

    return [];
  };
  const backgroundStyle = imageContainerStyles;

  if (!isLoaded) {
    if (placeholderSrc) {
      backgroundStyle.backgroundImage = `url(${placeholderSrc})`;
    }
  }

  return (
    <div
      className={isLoaded ? imageContainerClassName : styles.placeholder}
      style={backgroundStyle}
    >
      {viewContent()}
      {children}
    </div>
  );
};
