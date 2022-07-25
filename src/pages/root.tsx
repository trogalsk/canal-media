import React, { useCallback, useEffect } from "react";
import {
  useAppDispatch,
  useAppSelector,
  ConfigurationStore,
  AppState,
} from "../store";

interface IRootProps {
  children?: React.ReactNode;
}

export const Root: React.FC<IRootProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const configuration = useAppSelector(
    (state: AppState) => state.configuration.configuration
  );

  const getConfiguration = useCallback(
    () => dispatch(ConfigurationStore.getConfiguration()),
    [dispatch]
  );

  useEffect(() => {
    if (!configuration) {
      getConfiguration();
    }
  }, []);

  return <>{children}</>;
};
