/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version?: 1.0
 */
export interface IMovieModel {
  poster_path?: string;
  adult?: boolean;
  overview?: string;
  release_date?: string;
  genre_ids?: number[];
  id?: number;
  original_title?: string;
  original_language?: string;
  title?: string;
  backdrop_path?: string;
  popularity?: number;
  vote_count?: number;
  video?: boolean;
  vote_average?: number;
  budget?: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage?: string;
  production_companies?: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries?: {
    iso_3166_1: string;
    name: string;
  }[];
  runtime?: number;
  spoken_languages?: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status?: string;
  tagline?: string;
}
