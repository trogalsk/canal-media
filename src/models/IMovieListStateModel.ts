/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IErrorModel } from "./IErrorModel";
import { IMovieFilterModel } from "./IMovieFilterModel";
import { IMovieListModel } from "./IMovieListModel";

export interface IMovieListStateModel extends IMovieListModel {
  filter?: IMovieFilterModel;

  error?: IErrorModel;

  pending?: boolean;
}
