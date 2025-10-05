// /src/components/media/MediaGrid.jsx
import React from "react";

const MediaGrid = ({ items = [] }) => {
  if (!items.length) {
    return (
      <div className="p-4 text-center text-gray-500">
        No media available.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="rounded-2xl overflow-hidden shadow-md bg-white hover:shadow-lg transition"
        >
          {item.thumbnail ? (
            <img
              src={item.thumbnail}
              alt={item.title || "Media item"}
              className="w-full h-40 object-cover"
            />
          ) : (
            <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500 text-sm">No image</span>
            </div>
          )}
          <div className="p-2">
            <p className="text-sm font-medium truncate">{item.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MediaGrid;
