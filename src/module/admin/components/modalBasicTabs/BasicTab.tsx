import { useState } from 'react';

export function BasicTab() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow space-y-4">
      <h1 className="text-2xl font-bold">Basic Information</h1>

      {/* Name Input */}
      <div className="flex flex-col">
        <label htmlFor="name" className="font-semibold mb-1">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Description Input */}
      <div className="flex flex-col">
        <label htmlFor="description" className="font-semibold mb-1">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows={4}
        />
      </div>

      {/* Image Input */}
      <div className="flex flex-col">
        <label htmlFor="image" className="font-semibold mb-1">
          Image
        </label>
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="border rounded px-3 py-2"
        />
        {image && (
          <p className="mt-2 text-sm text-gray-600">Selected: {image.name}</p>
        )}
      </div>
    </div>
  );
}
