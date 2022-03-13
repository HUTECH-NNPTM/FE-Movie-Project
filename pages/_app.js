import "../styles/globals.css";
import "../scss/app.scss";
import 'tailwindcss/tailwind.css'

import { Provider } from "react-redux";
import store from "../redux/store";
import EmptyLayout from "../components/layouts/EmptyLayout";

function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout ?? EmptyLayout;

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
