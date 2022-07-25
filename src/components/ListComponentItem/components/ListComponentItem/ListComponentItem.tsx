/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import * as React from "react";
import { CellType } from "../../../../enums";
import { IListComponentItemProps } from "../../models";
import { ListComponentItemPoster } from "../ListComponentItemPoster";
import { ListComponentItemHighlight } from "../ListComponentItemHighlight";
import { ListComponentItemFrame } from "../ListComponentItemFrame";

import styles from "./ListComponentItem.module.scss";

export const ListComponentItem = ({
  cellType = CellType.Frame,
  isPlaceholder = false,
  media,
  isActive,
  width = -1,
  index,
  style,
  imageSize
}: IListComponentItemProps) => {
  const renderView = () => {
    const itemKey = `list-item-${index}_${media ? media.id : ""}`;
    switch (cellType) {
      case CellType.Poster:
        return (
          <ListComponentItemPoster
            key={itemKey}
            media={media}
            index={index}
            isActive={isActive}
            isPlaceholder={isPlaceholder}
            width={width}
            imageSize={imageSize}
          />
        );
      case CellType.Highlights:
        return (
          <ListComponentItemHighlight
            key={itemKey}
            media={media}
            index={index}
            isActive={false}
            isPlaceholder={isPlaceholder}
            width={width}
            imageSize={imageSize}
          />
        );
      case CellType.Frame:
      default:
        return (
          <ListComponentItemFrame
            key={itemKey}
            media={media}
            index={index}
            isActive={isActive}
            isPlaceholder={isPlaceholder}
            width={width}
            cellType={cellType}
            imageSize={imageSize}
          />
        );
    }
  };

  return (
    <div className={styles.item} style={style}>
      {renderView()}
    </div>
  );
};
