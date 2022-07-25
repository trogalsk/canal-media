/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version??: 1.0
 */
export interface IConfigurationModel {
  images?: {
    base_url?: string;
    secure_base_url?: string;
    backdrop_sizes?: string[];
    logo_sizes?: string[];
    poster_sizes?: string[];
    profile_sizes?: string[];
    still_sizes?: string[];
  };
  change_keys?: string[];
}
