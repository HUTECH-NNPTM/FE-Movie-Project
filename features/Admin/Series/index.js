import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../components/Admin/Loading";
import listApi from "../../../axios/listApi";
import { fetchSeries } from "../../../slice/seriesSlice";
import SeriesItem from "./SeriesItem";
import { useRouter } from "next/router";
import FormAdd from "./FormAdd";
import FormEdit from "./FormEdit";


function Series() {
  const series = useSelector((state) => state.series.data);
  const loading = useSelector((state) => state.series.loading);
  const [openFormAdd, setOpenFormAdd] = useState(false);
  const [openFormEdit, setOpenFormEdit] = useState(false);
  const [seriesID, setSeriesID] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const getAllLists = async () => {
    const response = await listApi.getAllList();
    dispatch(fetchSeries(response));
  };

  const handleFormAdd = () => {
    setOpenFormAdd(!openFormAdd);
  };

  const handleCloseForm = () => {
    setOpenFormAdd(false);
  };

  const handleCloseFormEdit = () => { 
    setOpenFormEdit(false);
  }

  const handleFormEdit = (id) => { 
    setOpenFormEdit(!openFormEdit);
    setSeriesID(id);
  }

  useEffect(() => {
    getAllLists();
    return () => getAllLists();
  }, [router]);

  return (
    <div className="bg-transparent h-full">
      {loading && <Loading></Loading>}

      {openFormAdd && <FormAdd handleCloseForm={handleCloseForm}></FormAdd>}

      {openFormEdit && <FormEdit handleCloseForm={handleCloseFormEdit} id={seriesID}></FormEdit>}

      {/* SECTION */}
      <section className="antialiased text-gray-600 h-full px-4">
        <div className="flex flex-col p-5 h-full ">
          {/* Table */}
          <div className="w-full mx-auto bg-gray-50 shadow-lg rounded-sm border border-gray-200">
            <header className="px-5 py-4 border-b border-gray-100">
              <div className="flex w-full justify-between">
                <h2 className="font-semibold text-gray-800">Series</h2>
                <button
                  onClick={handleFormAdd}
                  type="button"
                  class="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900"
                >
                  Add Series
                </button>
              </div>
            </header>
            <div className="p-3">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                    <tr>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Image</div>
                      </th>
                      <th className="p-2">
                        <div className="font-semibold text-left">Title</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Genre</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">Type</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">Limit</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">Time</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">Action</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-100">
                    {series?.map((item, index) => {
                      return <SeriesItem key={index} item={item} handleFormEdit={handleFormEdit}></SeriesItem>;
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Series;
