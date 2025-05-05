import React from "react";
import { formatDate } from "@app/helpers";

export default function ListItem({ urlObject }) {
  const shortUrl = `${import.meta.env.VITE_FRONTEND_URL}/${urlObject?.shortUrlPath}`;

  const { formattedDate, formattedTime } = formatDate(urlObject?.createdAt);

  return (
    <div className="flex-table-item is-order">
      <div className="flex-table-cell is-grow" data-th="Long Url">
        <span className="long-url is-list">{urlObject?.longUrl}</span>
      </div>
      <div className="flex-table-cell is-grow" data-th="Short Url">
        <span>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={shortUrl}
            className="light-text link"
          >
            {shortUrl}
          </a>
        </span>
      </div>
      <div className="flex-table-cell" data-th="Visits">
        <span className="light-text">{urlObject?.visits}</span>
      </div>
      <div className="flex-table-cell cell-end" data-th="Created">
        <span className="light-text">{`${formattedDate}, ${formattedTime}`}</span>
      </div>
    </div>
  );
}
