import React from "react";
import userApi from "../../axios/userApi";
import MainLayout from "../../components/layouts/MainLayout";

function Profile({user}) {
  return (
    <div className="profile">
      <div className="flex-col mt-[70px]">
        <div className="flex p-3">Tài khoản và cài đặt</div>
        {/* ROW BIGGEST */}
        <div className="flex items-center">
          <div className="flex space-x-28 p-4 m-5 text-sm w-full">
            <div className="flex">Thông tin tài khoản</div>
            <div className="flex-col w-full items-center space-y-3">
              {/* Row */}
              <div className="flex justify-between">
                <div className="flex space-x-2">
                  <div className="font-bold">Username: </div>
                  <div>{user.username}</div>
                </div>
                <div className="flex cursor-pointer text-green-500">Đổi</div>
              </div>
              {/* Row */}
              <div className="flex justify-between">
                <div className="flex space-x-2">
                  <div className="font-bold">Họ tên: </div>
                  <div>{user?.name ? user.name : "Chưa cập nhật"}</div>
                </div>
                <div className="flex cursor-pointer text-green-500">
                  Đổi tên
                </div>
              </div>
              {/* Row */}
              <div className="flex justify-between">
                <div className="flex space-x-2">
                  <div className="font-bold">Email: </div>
                  <div className="break-all">{user?.email}</div>
                </div>
                <div className="flex cursor-pointer text-green-500">
                  Xác thực email
                </div>
              </div>
              {/* Row */}
              <div className="flex justify-between">
                <div className="flex space-x-2">
                  <div className="font-bold">Giới tính: </div>
                  <div>{user?.gender ? user.gender : "Chưa cập nhật"}</div>
                </div>
                <div className="flex cursor-pointer text-green-500">
                  Đổi giới tính
                </div>
              </div>
              {/* Row */}
              <div className="flex justify-between">
                <div className="flex space-x-2">
                  <div className="font-bold">Số điện thoại: </div>
                  <div>{user?.phone ? user.phone : "Chưa cập nhật"}</div>
                </div>
                <div className="flex cursor-pointer text-green-500">
                  Đổi sdt
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
Profile.Layout = MainLayout;

export const getServerSideProps = async ({ params }) => {
  const user = await userApi.getInfoUser(params.id);
  return {
    props: {
      user,
    },
  };
};

export default Profile;
