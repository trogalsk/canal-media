import { IMovieFilterModel, IMovieListModel } from "../models";
import { HttpClient } from "./HttpClient";

/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
export class DiscoverService {
  get url(): string {
    return "/3/discover";
  }

  public getMovieList = async (
    filter: IMovieFilterModel = {},
  ): Promise<IMovieListModel> => {
    const httpClient = new HttpClient();

    const { page = 1, sort_by = "popularity.desc" } = filter;

    return httpClient.get<IMovieListModel>(
      `${this.url}/movie?page=${page}&sort_by=${sort_by}`,
    );
  };
}
