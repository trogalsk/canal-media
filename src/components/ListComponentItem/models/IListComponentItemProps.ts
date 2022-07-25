/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */

import { CellType } from "../../../enums";
import { IMovieModel } from "../../../models";

export interface IListComponentItemProps {
  cellType?: CellType;
  media?: IMovieModel;
  index?: number;
  isActive?: boolean;
  isSelected?: boolean;
  isRowActive?: boolean;
  style?: React.CSSProperties;
  width?: number;
  isPlaceholder: boolean;
  imageSize?: string;
}
