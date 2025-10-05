// /src/pages/media/MediaEdit.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const MediaEdit = () => {
  const { id } = useParams(); // media id from route
  const navigate = useNavigate();

  // Example state for media fields
  const [media, setMedia] = useState({
    title: "",
    description: "",
    altText: "",
    tags: "",
    thumbnail: "",
  });

  const [loading, setLoading] = useState(true);

  // Fetch media data (mocked for now)
  useEffect(() => {
    // Replace this with real API call
    const fetchMedia = async () => {
      setLoading(true);
      // simulate API call
      setTimeout(() => {
        setMedia({
          title: "Sample Image",
          description: "A sample image description",
          altText: "sample image alt text",
          tags: "sample, image",
          thumbnail: "https://via.placeholder.com/300x200",
        });
        setLoading(false);
      }, 500);
    };

    fetchMedia();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedia((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Save to API
    console.log("Saving media:", media);
    navigate("/media"); // go back to media list
  };

  if (loading) {
    return <div className="p-4 text-gray-500">Loading media...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Media</h1>

      <div className="mb-6">
        {media.thumbnail ? (
          <img
            src={media.thumbnail}
            alt={media.altText || "Preview"}
            className="w-full max-h-64 object-contain rounded-2xl border"
          />
        ) : (
          <div className="w-full h-64 bg-gray-100 flex items-center justify-center rounded-2xl">
            <span className="text-gray-400">No preview available</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={media.title}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            placeholder="Enter media title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={media.description}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            placeholder="Enter description"
            rows="3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Alt Text</label>
          <input
            type="text"
            name="altText"
            value={media.altText}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            placeholder="Enter alt text (for accessibility)"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Tags</label>
          <input
            type="text"
            name="tags"
            value={media.tags}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            placeholder="Comma-separated tags"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => navigate("/media")}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default MediaEdit;
