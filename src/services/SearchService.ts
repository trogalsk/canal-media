import { IMovieFilterModel, IMovieListModel } from "../models";
import { HttpClient } from "./HttpClient";

/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
export class SearchService {
  get url(): string {
    return "/3/search";
  }

  public searchMovie = async (filter: IMovieFilterModel = {}): Promise<IMovieListModel> => {
    const httpClient = new HttpClient();

    const {
      page = 1,
      query = ""
    } = filter;

    return httpClient.get<IMovieListModel>(`${this.url}/movie?page=${page}&query=${query}`);
  }
}
