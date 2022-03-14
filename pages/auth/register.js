import React, { useEffect, useState, useCallback, useRef } from "react";
import authApi from "../../axios/authApi";
import { useRouter } from "next/router";
import Link from "next/link";

function Register() {
  const router = useRouter();

  //state
  const [messErr, setMessErr] = useState("");
  const [messSuccess, setMessageSuccess] = useState("");
  const formInput = useRef("")

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      return router.push("/");
    }
  }, []);

  const handleSubmitRegister = useCallback(async (e) => {
    try {
      e.preventDefault();
      let data = {
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value,
      };

      let register = await authApi.register(data);
      if (register) {
        setMessageSuccess("Đăng kí thành công");
        formInput.current.reset();
        setMessErr("");
      }
    } catch (error) {
      if (error.response.status == 500) {
        setMessErr("username hoặc email đã bị trùng!");
        setMessageSuccess("");
      }
    }
  }, []);

  return (
    <div className="login flex justify-center items-center">
      <form className="max-w-md w-full" ref={formInput} onSubmit={handleSubmitRegister}>
        <div className="flex-col w-full space-y-8 p-10 login__background rounded-lg">
          <div className="text-3xl ">Đăng Kí</div>
          {/* Message Register Success */}
          {messSuccess && (
            <React.Fragment>
              <div
                className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3"
                role="alert"
              >
                <p className="text-sm">Đăng kí thành công !</p>
              </div>
            </React.Fragment>
          )}
          {/* Message Register Error */}
          {messErr && (
            <React.Fragment>
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <span className="block sm:inline">{messErr}</span>
              </div>
            </React.Fragment>
          )}
          <div className="w-full px-3 ">
            <input
              name="username"
              className="appearance-none block w-full bg-gray-500 text-gray-200 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none"
              id="grid-last-name"
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="w-full px-3 ">
            <input
              name="email"
              className="appearance-none block w-full bg-gray-500 text-gray-200 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none"
              id="grid-last-name"
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="w-full px-3">
            <input
              name="password"
              className="appearance-none block w-full bg-gray-500 text-gray-200 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none"
              id="grid-last-name"
              type="password"
              placeholder="Mật khẩu"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-red-600 text-white w-[250px] font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            >
              Đăng kí
            </button>
          </div>
          <div className="flex space-x-2">
            <Link href="/auth/login" className="cursor-pointer">
              Quay lại trang đăng nhập
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
