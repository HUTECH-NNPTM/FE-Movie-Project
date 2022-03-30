import React from "react";
import Link from "next/link";

function DataSearch({ item }) {
  return (
    <>
      <Link href={`/watch/movies/${item._id}`}>
        <div className="flex hover:bg-[#101010] p-2 rounded-md items-center space-x-2">
          <img
            className="object-cover w-12 h-12 rounded-full"
            src={item.img}
          ></img>
          <div className="!text-xs break-all">{item.title}</div>
        </div>
      </Link>
    </>
  );
}

export default DataSearch;
