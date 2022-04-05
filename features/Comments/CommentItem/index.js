import React, { useEffect, useState } from "react";
import userApi from "../../../axios/userApi";
import Moment from "react-moment";
import { Avatar, Image } from "antd";

function CommentItem({ item }) {
  const [data, setData] = useState({});

  const getUserComment = async () => {
    if (item.userId) {
      const response = await userApi.getInfoUser(item.userId);
      setData(response);
    }
  };

  useEffect(() => {
    getUserComment();
  }, []);

  return (
    <div className="flex items-center space-x-4 p-3">
      <div className="flex">
        {data.profilePic == "" ? (
          <React.Fragment>
            <div className="flex w-12 h-12 bg-gray-200 text-black rounded-full overflow-hidden items-center justify-center">
              <div className="flex">
                <img
                  className="object-cover rounded-full h-8 w-8"
                  src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                ></img>
              </div>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="flex">
              <img
                className="object-cover rounded-full h-12 w-12"
                src={data.profilePic}
              ></img>
            </div>
          </React.Fragment>
        )}
      </div>
      <div className="flex-col justify-between flex-1">
        <div className="flex flex-1 justify-between item-center">
          <div className="break-all text-xs font-bold">{data.username}</div>
          <div className="text-xs text-gray-400">
            <Moment fromNow>{item.createdAt}</Moment>
          </div>
        </div>
        <div className="flex-end text-xs">
          <div className="break-all text-xs">{item.message}</div>
        </div>
      </div>
    </div>
  );
}

export default CommentItem;
