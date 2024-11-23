import { useCallback } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { nextStep, prevStep } from "../../../store/stepSlice";
import { setFile } from "../../../store/formSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";

const FileUpload = () => {
  const dispatch = useAppDispatch();
  const { file } = useAppSelector((state) => state.form);
  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (acceptedFiles.length > 0) {
        dispatch(setFile(acceptedFiles[0]));
      }

      if (fileRejections.length > 0) {
        toast.error("Invalid file type. Only PNG and PDF files are allowed.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    },
    [dispatch]
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

      {file && (
        <div className="p-4 bg-gray-100 rounded">
          <p>Selected file: {file.name}</p>
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
          disabled={!file}
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default FileUpload;
