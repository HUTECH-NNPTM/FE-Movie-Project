import React from "react";
import SeriesItem from "./SeriesItem";

function BestSeries({ series, title }) {
  return (
    <div className="flex-col p-3 pb-16">
      <div className="list-title">{title}</div>
      <div className="flex flex-wrap gap-x-5 gap-y-14">
        {series.map((item, index) => (
          <SeriesItem key={index} data={item}></SeriesItem>
        ))}
      </div>
    </div>
  );
}

export default BestSeries;
