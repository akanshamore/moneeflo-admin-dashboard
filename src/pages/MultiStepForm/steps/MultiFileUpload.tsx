import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

const MultiFileUpload = ({ next, prev, data, updateData }: any) => {
  const [geolocation, setGeolocation] = useState<any>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGeolocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      updateData("multiFiles", acceptedFiles.slice(0, 5));
      if (geolocation) {
        updateData("geolocation", geolocation);
      }
    },
    [updateData, geolocation]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "application/pdf": [".pdf"],
    },
    maxFiles: 5,
  });

  return (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-gray-300 p-8 text-center rounded-lg cursor-pointer hover:border-blue-500"
      >
        <input {...getInputProps()} />
        <p>Drag & drop up to 5 files here, or click to select files</p>
        <p className="text-sm text-gray-500">
          Only PNG and PDF files are allowed
        </p>
      </div>

      {data && data.length > 0 && (
        <div className="p-4 bg-gray-100 rounded">
          <p>Selected files:</p>
          <ul className="list-disc pl-5">
            {data.map((file: File, index: number) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}

      {geolocation && (
        <div className="p-4 bg-gray-100 rounded">
          <p>Location detected:</p>
          <p>Latitude: {geolocation.latitude}</p>
          <p>Longitude: {geolocation.longitude}</p>
        </div>
      )}

      <div className="flex justify-between">
        <button
          type="button"
          onClick={prev}
          className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={next}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          disabled={!data || data.length === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MultiFileUpload;
