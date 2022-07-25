/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { ROUTES } from "../constants";
import { IMovieModel } from "../models";

export class RouteHelper {
  static getDetailsPath(media: IMovieModel) {
    return `${ROUTES.MOVIE_DETAILS_SCREEN}/${media.id}`;
  }

  static getHomePath() {
    return ROUTES.HOME;
  }
}
