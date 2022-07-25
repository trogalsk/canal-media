import { IConfigurationModel } from "../models";
import { HttpClient } from "./HttpClient";

/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
export class ConfigurationService {
  get url(): string {
    return "/3/configuration";
  }

  public get = async (): Promise<IConfigurationModel> => {
    const httpClient = new HttpClient();

    return httpClient.get<IConfigurationModel>(this.url);
  }
}
