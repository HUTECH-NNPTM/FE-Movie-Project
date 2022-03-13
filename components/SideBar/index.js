import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { logoutSuccess } from "../../slice/userSlice";
import { useRouter } from 'next/router'

function SideBar() {
  const user = useSelector((state) => state.user.info);
  const [info, setInfo] = useState({});
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    setInfo(user);
  }, [user]);

  const handleLogout = () => { 
    localStorage.clear();
    dispatch(logoutSuccess());
    return router.push("/auth/login");
  }

  return (
    <div className="absolute border-[1px] rounded-md top-10 left-[-310px] w-[350px] max-w-[350px] h-[200px] text-sm background-tranparent">
      <div className="w-full p-3 border-b-[1px]">
        <div className="w-full">
          <div className="flex text-sm">Đang đăng nhập</div>
          <div className="flex m-1 border-[1px] p-1 space-x-5 items-center rounded-md hover:bg-black">
            <Avatar className="navIcon m-5" icon={<UserOutlined />} />
            <div className="flex-col">
              <div className="font-bold">{info?.username}</div>
              <div className="text-gray-300">cá nhân</div>
              <div className="text-gray-300">{info?.email}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-col justify-center mt-3">
        <div className="flex items-center justify-center">
          <button onClick={handleLogout} class="bg-red-500 hover:bg-red-400 text-white font-semibold hover:text-white py-2 px-8 border border-red-500 hover:border-transparent rounded">
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
