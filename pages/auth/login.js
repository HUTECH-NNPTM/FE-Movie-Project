import React, { useEffect, useState, useCallback } from "react";
import authApi from "../../axios/authApi";
import { useRouter } from "next/router";
import Link from "next/link";
import Loading from "../../components/Loading";

function Login() {
  const router = useRouter();

  //state
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      return router.push("/");
    }
  }, []);

  const handleSubmitLogin = useCallback(async (e) => {
    setLoading(true);
    setTimeout(async () => {
      e.preventDefault();
      let dataForm = {
        email: e.target.email.value,
        password: e.target.password.value,
      };
      try {
        const login = await authApi.login(dataForm);
        if (login.accessToken) {
          localStorage.setItem("token", login.accessToken);
          localStorage.setItem("id", login._id);
          return router.push("/");
        }
      } catch (error) {
        if (error.response.status == 401) {
          setMessage("Tài khoản hoặc mật khẩu không chính xác");
        }
      }
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return <Loading loading={loading}></Loading>;
  }

  return (
    <div className="login flex justify-center items-center">
      <form onSubmit={handleSubmitLogin} className="max-w-md w-full">
        <div className="flex-col w-full space-y-8 p-10 login__background rounded-lg">
          <div className="text-3xl">Đăng Nhập</div>
          {message && (
            <React.Fragment>
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <span className="block sm:inline">{message}</span>
                <span
                  onClick={() => setMessage("")}
                  className="absolute top-0 bottom-0 right-0 px-4 py-3"
                >
                  <svg
                    className="fill-current h-6 w-6 text-red-500"
                    role="button"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <title>Close</title>
                    <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                  </svg>
                </span>
              </div>
            </React.Fragment>
          )}
          <div className="w-full px-3 ">
            <input
              required
              name="email"
              className="appearance-none block w-full bg-gray-500 text-gray-200 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none"
              id="grid-last-name"
              type="text"
              placeholder="Email của bạn"
            />
          </div>
          <div className="w-full px-3">
            <input
              required
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
              Đăng nhập
            </button>
          </div>

          <div className="flex space-x-2">
            <span>Bạn mới tham gia?</span>
            <Link href="/auth/register" className="cursor-pointer">
              <span>Đăng kí ngay</span>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
