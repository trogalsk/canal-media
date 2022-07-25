/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */

import * as React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { ListComponentItem } from "../ListComponentItem";
import { IMovieModel } from "../../models";
import { CellType } from "../../enums";

import styles from "./GridComponent.module.scss";

const GRID_COLS = 4;
const DEFAULT_COL_PADDING = 12;
const DEFAULT_ROW_PADDING = 12;

export interface IGridComponentProps {
  cellType?: CellType;
  className?: string;
  imageSize?: string;
  columns?: number;
  rows?: number;
  colPadding?: number;
  rowPadding?: number;
  style?: React.CSSProperties;
  dataLength?: number;
  loading?: boolean;
  mediaList: IMovieModel[];
  title?: string;
}

export const GridComponent: React.FC<IGridComponentProps> = ({
  className = styles.grid,
  columns = GRID_COLS,
  rows,
  rowPadding = DEFAULT_ROW_PADDING,
  colPadding = DEFAULT_COL_PADDING,
  loading = false,
  cellType = CellType.Frame,
  mediaList = [],
  style,
  title,
}: IGridComponentProps) => {
  const chunk = (array: IMovieModel[] | undefined, size = 1) => {
    if (!array) {
      return [];
    }

    const arrayChunks = [];
    for (let i = 0; i < array.length; i += size) {
      const arrayChunk = array.slice(i, i + size);
      arrayChunks.push(arrayChunk);
    }
    return arrayChunks;
  };

  const renderHeader = () => {
    const skeletonColor = "#383346";
    const hasItems = mediaList.length > 0;

    if (title) {
      return (
        <SkeletonTheme baseColor={skeletonColor} highlightColor={skeletonColor}>
          <header className={styles.titleContainer}>
            <p className={styles.title}>
              {hasItems && !loading ? title : <Skeleton width="25rem" />}
            </p>
          </header>
        </SkeletonTheme>
      );
    }
  };

  const entities = mediaList;

  let grid = chunk(entities, columns);

  if (rows) {
    grid = grid.slice(0, rows);
  }

  return (
    <div className={className} style={style}>
      {renderHeader()}
      {grid.map((row, rowIndex) => (
        <div
          key={`row-${rowIndex}`}
          className={styles.row}
          style={{ margin: `0 -${rowPadding / 2}px ${rowPadding}px` }}
        >
          {row.map((media, columnIndex) => (
            <div
              key={`col-${columnIndex}`}
              className={styles.col}
              style={{
                width: ` ${100 / columns}%`,
                padding: `0 ${colPadding / 2}px`,
              }}
            >
              <ListComponentItem
                key={`list-item-${rowIndex}-${columnIndex}`}
                media={media}
                cellType={cellType}
                isPlaceholder={!!loading}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
