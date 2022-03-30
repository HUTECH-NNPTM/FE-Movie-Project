import React, { useEffect } from "react";
import AdminLayout from "../../../components/layouts/AdminLayout";
import Series from "../../../features/Admin/Series";

function SeriesAdmin() {
  return (
    <div className="w-full">
      <Series></Series>
    </div>
  );
}

SeriesAdmin.Layout = AdminLayout;

export default SeriesAdmin;
