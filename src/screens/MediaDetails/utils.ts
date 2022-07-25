/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IMediaModel, useMediaByIdSelector } from "@nf/common";
import { useRouter } from "next/router";

export type IMediaDetailsParams = {
  id: string;
};
export interface IMediaDetailsLocationState {
  media?: IMediaModel;
}

export const useMediaDetailsMediaSelector = () => {
  const router = useRouter();
  const params = router.query as IMediaDetailsParams;
  const media = useMediaByIdSelector(params.id ?? -1);

  if (media.Media) {
    return media.Media;
  }

  return undefined;
};

export const useMediaDetailsActionsSelector = () => {
  const router = useRouter();
  const params = router.query as IMediaDetailsParams;
  const media = useMediaByIdSelector(params.id ?? -1);

  return { isLoading: media.IsLoading, error: media.Error };
};
