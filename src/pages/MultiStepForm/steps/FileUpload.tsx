import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const FileUpload = ({ next, prev, data, updateData }: any) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        updateData("file", acceptedFiles[0]);
      }
    },
    [updateData]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
  });

  return (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-gray-300 p-8 text-center rounded-lg cursor-pointer hover:border-blue-500"
      >
        <input {...getInputProps()} />
        <p>Drag & drop a file here, or click to select file</p>
        <p className="text-sm text-gray-500">
          Only PNG and PDF files are allowed
        </p>
      </div>

      {data && (
        <div className="p-4 bg-gray-100 rounded">
          <p>Selected file: {data.name}</p>
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
          disabled={!data}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FileUpload;
