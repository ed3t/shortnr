import React, { useEffect, useState } from "react";
import { apiList } from "@utils/api";
import { parseApiError } from "@utils/parseError";
import DataTable from "@components/commons/DataTable";

import "./List.scss";

const List = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState("desc");
  const [urlObjects, setUrlObjects] = useState([]);

  useEffect(() => {
    const fetchUrls = async () => {
      setLoading(true);
      try {
        const urls = await apiList();
        setUrlObjects(urls);
      } catch (err) {
        console.error(parseApiError(err));
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUrls();
  }, []);

  if (loading) {
    return <div className="pageloader" />;
  }

  return (
    <div className="section">
      <div className="container">
        <h3 className="margin-bottom margin-top large">All URLs listed here</h3>
        <div className="flex-list-wrapper">
          <DataTable
            error={error}
            loading={loading}
            urlObjects={urlObjects}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            sortColumn={sortColumn}
            setSortColumn={setSortColumn}
            sortDirection={sortDirection}
            setSortDirection={setSortDirection}
          />
        </div>
      </div>
    </div>
  );
};

export default List;
