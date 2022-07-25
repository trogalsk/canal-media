import { IMovieModel } from "../models";
import { HttpClient } from "./HttpClient";

/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
export class MovieService {
  get url(): string {
    return "/3/movie";
  }

  public get = async (id: number): Promise<IMovieModel> => {
    const httpClient = new HttpClient();

    return httpClient.get<IMovieModel>(`${this.url}/${id}`);
  };
}
