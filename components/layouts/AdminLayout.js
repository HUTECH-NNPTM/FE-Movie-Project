import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Admin/Header";
import SideBarAdmin from "../Admin/SideBar";
import { useRouter } from "next/router";
import userApi from "../../axios/userApi";
import { loginSuccess } from "../../slice/userSlice";
import Loading from "../Loading";
import Head from 'next/head'


function AdminLayout({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const getInfoUser = async (id) => {
    const data = await userApi.getInfoUser(id);
    if (!data.isAdmin) {
      return router.push("/");
    }
    dispatch(loginSuccess(data));
  };

  useEffect(() => {
    let id = localStorage.getItem("id");
    let token = localStorage.getItem("token");

    if (id && token) {
      setLoading(true);
      getInfoUser(id);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } else {
      return router.push("/auth/login");
    }
  }, [router]);

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <Head>
        <title>NNRT - Admin Page</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="bg-white text-black">
        <Header></Header>
        <div className="flex h-full">
          <SideBarAdmin></SideBarAdmin>
          {children}
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
