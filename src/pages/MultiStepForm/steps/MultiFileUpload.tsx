import { useCallback, useEffect, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { nextStep, prevStep } from "../../../store/stepSlice";
import { setGeolocation, setMultiFiles } from "../../../store/formSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";

const MultiFileUpload = () => {
  const { geolocation, multiFiles } = useAppSelector((state) => state.form);
  const dispatch = useAppDispatch();

  const [files, setFiles] = useState<File[]>(multiFiles || []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          dispatch(
            setGeolocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            })
          );
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      const totalFiles = files.length + acceptedFiles.length;

      if (totalFiles > 5) {
        toast.error(
          "Maximum 5 files allowed. Please remove some files first.",
          {
            position: "top-right",
            autoClose: 3000,
          }
        );
        return;
      }

      if (rejectedFiles.length > 0) {
        toast.error("Invalid file type. Only PNG and PDF files are allowed.", {
          position: "top-right",
          autoClose: 3000,
        });
      }

      const newFiles = [...files, ...acceptedFiles].slice(0, 5);
      setFiles(newFiles);
      dispatch(setMultiFiles(newFiles));

      if (geolocation) {
        dispatch(setGeolocation(geolocation));
      }
    },
    [files, geolocation]
  );

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    dispatch(setMultiFiles(newFiles));
  };

  const clearAllFiles = () => {
    setFiles([]);
    dispatch(setMultiFiles([]));
  };

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
        <p>
          Drag & drop up to {5 - files.length} files here, or click to select
          files
        </p>
        <p className="text-sm text-gray-500">
          Only PNG and PDF files are allowed
        </p>
      </div>

      {files.length > 0 && (
        <div className="p-4 bg-gray-100 rounded">
          <div className="flex justify-between items-center mb-2">
            <p className="font-semibold">Selected files:</p>
            <button
              onClick={clearAllFiles}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Clear All
            </button>
          </div>
          <ul className="space-y-2">
            {files.map((file: File, index: number) => (
              <li key={index} className="flex justify-between items-center">
                <span>{file.name}</span>
                <button
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:text-red-700 ml-2"
                >
                  Remove
                </button>
              </li>
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
          onClick={() => dispatch(prevStep())}
          className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={() => dispatch(nextStep())}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          disabled={files.length === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MultiFileUpload;
