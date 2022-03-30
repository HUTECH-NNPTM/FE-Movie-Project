import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import "tailwindcss/tailwind.css";
import EmptyLayout from "../components/layouts/EmptyLayout";
import store from "../redux/store";
import "../scss/app.scss";
import "../styles/globals.css";
import { ToastContainer } from 'react-toastify';



function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout ?? EmptyLayout;

  return (
    <Provider store={store}>
      <Layout>
        <ToastContainer/>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
