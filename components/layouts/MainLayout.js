import { useRouter } from "next/router";
import React, {useEffect} from "react";
import Header from "../Header";

function MainLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      return router.push("/auth/login");
    }
  }, []);

  return (
    <>
      <Header></Header>
      {children}
    </>
  );
}

export default MainLayout;
