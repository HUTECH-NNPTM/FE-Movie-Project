import React from "react";
import SeriesItem from "./SeriesItem";

function BestSeries({ series }) {
  return (
    <div className="flex-col p-3">
      <div className="list-title">PHIM TẬP DÀI HAY</div>
      <div className="grid lg:grid-cols-5 lg:gap-y-[50px] lg:gap-x-[12px] sm:grid-cols-1 md:grid-cols-3 sm:gap-y-[50px] sm:gap-x-1">
        {series.map((item, index) => (
          <SeriesItem key={index} data={item}></SeriesItem>
        ))}
      </div>
    </div>
  );
}

export default BestSeries;
