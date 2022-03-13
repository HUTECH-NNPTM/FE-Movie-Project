import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import userApi from "../axios/userApi";
// import Slider from "../components/Slider";
// import Movies from "../features/Movies";
// import Series from "../features/Series";

import { loginSuccess } from "../slice/userSlice";

function Home() {
  const id = localStorage.getItem("id");
  const dispatch = useDispatch();

  const getInfoUser = async (id) => {
    const data = await userApi.getInfoUser(id);
    dispatch(loginSuccess(data));
  };

  useEffect(() => {
    getInfoUser(id);
  }, []);

  return (
    <div className="homePage">
      {/* Slider */}
      {/* <Slider name={props.type}></Slider> */}
      {/* Best Movie */}
      {/* <Movies></Movies> */}
      {/* Best Series */}
      {/* <Series></Series> */}
    </div>
  );
}
export default Home;
