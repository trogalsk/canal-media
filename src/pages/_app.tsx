import { Provider } from "react-redux";
import type { AppProps } from "next/app";

import { store } from "../store";
import { Root } from "./root";

import "../styles/global.scss";

export default function MyApp({ Component, pageProps }: AppProps) {
  
  return (
    <Provider store={store}>
      <Root>
        <Component {...pageProps} />
      </Root>
    </Provider>
  )
}
