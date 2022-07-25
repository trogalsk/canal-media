/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IMovieModel } from "./IMovieModel";

export interface IMovieListModel {
  results: IMovieModel[];

  page?: number;

  total_results?: number;

  total_pages?: number;
}
