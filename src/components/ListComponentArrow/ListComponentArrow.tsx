/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import cx from "classnames";
import LeftArrowIcon from "../../resources/icons/left-arrow.svg";
import RightArrowIcon from "../../resources/icons/right-arrow.svg";
import styles from "./ListComponentArrow.module.scss";

type ContainerStyle = {
  arrows?: React.CSSProperties;
  background?: React.CSSProperties;
};

interface IListComponentArrowProps {
  direction: "left" | "right";
  containerStyle: ContainerStyle;
  onClick?: (event?: React.MouseEvent) => void;
  className?: string;
}

export const ListComponentArrow = ({
  containerStyle,
  direction,
  className,
  onClick,
}: IListComponentArrowProps) => {
  const isDisabled = className?.includes("slick-disabled");
  return (
    <div
      className={cx(styles.container, {
        [styles.left]: direction === "left",
        [styles.right]: direction === "right",
        [styles.disabled]: isDisabled,
      })}
      style={containerStyle.arrows}
      onClick={onClick}
    >
      {direction === "left" ? (
        <div className={styles.arrowBox}>
          <div
            className={styles.backgroundLeft}
            style={containerStyle.background}
          ></div>
          <LeftArrowIcon className={styles.iconLeft} />
        </div>
      ) : (
        <div className={styles.arrowBox}>
          <div
            className={styles.backgroundRight}
            style={containerStyle.background}
          ></div>
          <RightArrowIcon className={styles.iconRight} />
        </div>
      )}
    </div>
  );
};
