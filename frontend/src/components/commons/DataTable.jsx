import React, { useState, useMemo } from "react";
import { ITEMS_PER_BATCH, MIN_SEARCH_LENGTH } from "@app/constants";
import ListItem from "./ListItem";
import Placeloader from "./Placeloader";
import EmptyIcon from "@components/icons/EmptyIcon";

const DataTable = ({
  error,
  loading,
  urlObjects,
  searchTerm,
  setSearchTerm,
  sortColumn,
  setSortColumn,
  sortDirection,
  setSortDirection,
}) => {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_BATCH);

  const filteredData = useMemo(() => {
    if (searchTerm.length < MIN_SEARCH_LENGTH) {
      return urlObjects;
    }
    const term = searchTerm.toLowerCase();
    return urlObjects.filter((item) =>
      ["longUrl"].some((field) =>
        item[field]?.toString().toLowerCase().includes(term)
      )
    );
  }, [urlObjects, searchTerm]);

  const sortedData = useMemo(() => {
    if (!sortColumn) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortColumn];
      const bVal = b[sortColumn];
      if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortColumn, sortDirection]);

  const visibleItems = sortedData.slice(0, visibleCount);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setVisibleCount(ITEMS_PER_BATCH);
  };

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection((dir) => (dir === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
    setVisibleCount(ITEMS_PER_BATCH);
  };

  const handleLoadMore = () => {
    setVisibleCount((count) =>
      Math.min(count + ITEMS_PER_BATCH, sortedData.length)
    );
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <div className="control has-icon">
          <input
            type="text"
            placeholder="Type to search..."
            value={searchTerm}
            onChange={handleSearch}
            className="input search"
            disabled={loading}
          />
          <div className="form-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex-table margin-bottom large">
        <div className={`flex-table-header ${loading ? "is-disabled" : ""}`}>
          <span onClick={() => handleSort("longUrl")} className="cursor-pointer is-grow">
            Long URL{" "}
            {sortColumn === "longUrl" &&
              (sortDirection === "asc" ? "↑" : "↓")}
          </span>
          <span
            onClick={() => handleSort("shortUrl")}
            className="cursor-pointer is-grow"
          >
            Short URL{" "}
            {sortColumn === "shortUrl" &&
              (sortDirection === "asc" ? "↑" : "↓")}
          </span>
          <span
            onClick={() => handleSort("visits")}
            className="cursor-pointer"
          >
            Visits{" "}
            {sortColumn === "visits" &&
              (sortDirection === "asc" ? "↑" : "↓")}
          </span>
          <span
            onClick={() => handleSort("createdAt")}
            className="cursor-pointer cell-end"
          >
            Created{" "}
            {sortColumn === "createdAt" &&
              (sortDirection === "asc" ? "↑" : "↓")}
          </span>
        </div>

        <div className="flex-orders-inner">
          {error ? (
            <div className="grow flex items-center justify-center">
              <h4>Something went wrong!</h4>
            </div>
          ) : loading && visibleItems.length === 0 ? (
            <Placeloader />
          ) : visibleItems.length > 0 ? (
            visibleItems.map((item, idx) => (
              <div key={item.id || idx}>
                <ListItem urlObject={item} />
              </div>
            ))
          ) : (
            <div className="grow flex items-center justify-center">
              <div className="text-center margin-top large">
                <EmptyIcon />
                <p>No data to show!</p>
              </div>
            </div>
          )}
        </div>

        {visibleCount < sortedData.length && !loading && (
          <div className="text-center margin-top">
            <button
              type="button"
              className="button primary-button"
              onClick={handleLoadMore}
              style={{margin: '0 auto'}}
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataTable;
