import React, { useEffect } from "react";
import AdminLayout from "../../../components/layouts/AdminLayout";
import Movies from "../../../features/Admin/Movies";

function MoviesAdmin() {
  return (
    <div className="w-full">
      <Movies></Movies>
    </div>
  );
}

MoviesAdmin.Layout = AdminLayout;

export default MoviesAdmin;
