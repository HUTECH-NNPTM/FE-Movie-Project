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
    <div className="absolute shadow-xl rounded-md top-10 left-[-260px] w-[350px] max-w-[300px] h-[200px] text-sm bg-[#151515]">
      <div className="w-full p-3 border-b-[1px]">
        <div className="w-full">
          <div className="flex text-sm pb-1">Đang đăng nhập</div>
          <div onClick={() => router.push(`/profile/${info?._id}`)} className="flex m-1 border-[1px] p-1 space-x-5 items-center rounded-md hover:bg-black">
            <Avatar className="navIcon m-5" icon={<UserOutlined />} />
            <div className="flex-col">
              <div className="font-bold break-all">{info?.username}</div>
              <div className="text-gray-300 break-all">{info?.email}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-col justify-center mt-3">
        <div className="flex items-center justify-center">
          <button onClick={handleLogout} className="bg-transparent hover:bg-red-400 text-white font-semibold hover:text-white py-2 px-8 border border-red-500 hover:border-transparent rounded">
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
