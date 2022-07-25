/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IErrorModel } from "./IErrorModel";
import { IMovieModel } from "./IMovieModel";

export interface IMovieStateModel {
  data?: IMovieModel;

  error?: IErrorModel;

  pending?: boolean;
}
