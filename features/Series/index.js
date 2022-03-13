import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import movieApi from "../../axios/movieApi";
import SeriesItem from "./SeriesItem";

function BestSeries() {
  return (
    <div className="flex-col p-8">
      <div className="list-title">Best Series</div>
      <div className="grid lg:grid-cols-5 lg:gap-y-[50px] lg:gap-x-[12px] sm:grid-cols-1 md:grid-cols-3 sm:gap-y-[50px] sm:gap-x-1">
        <SeriesItem></SeriesItem>
        <SeriesItem></SeriesItem>
        <SeriesItem></SeriesItem>
        <SeriesItem></SeriesItem>
        <SeriesItem></SeriesItem>
        <SeriesItem></SeriesItem>
      </div>
    </div>
  );
}

export default BestSeries;
