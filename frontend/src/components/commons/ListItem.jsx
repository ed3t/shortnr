import React from "react";

export default function ListItem({ urlObject }) {
  const link = `${import.meta.env.VITE_FRONTEND_URL}/${urlObject?.shortUrl}`;
  const formattedDate = new Date(urlObject?.createdAt).toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );
  return (
    <div className="flex-table-item is-order">
      <div className="flex-table-cell" data-th="Long Url">
        <span>{urlObject?.longUrl}</span>
      </div>
      <div className="flex-table-cell is-grow" data-th="Short Url">
        <span>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={link}
            className="light-text link"
          >
            {link}
          </a>
        </span>
      </div>
      <div className="flex-table-cell is-grow" data-th="Visits">
        <span className="light-text">{urlObject?.visits}</span>
      </div>
      <div className="flex-table-cell cell-end" data-th="Created">
        <span className="light-text">{formattedDate}</span>
      </div>
    </div>
  );
}
