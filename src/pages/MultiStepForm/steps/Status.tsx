import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { submitFormData } from "../../../services/api";

interface StatusProps {
  prev: () => void;
  formData: {
    basicDetails: any;
    address: any;
    file: File | null;
    multiFiles: File[];
    geolocation: {
      latitude: number;
      longitude: number;
    } | null;
  };
}

const Status = ({ prev, formData }: StatusProps) => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"submitting" | "success" | "error">(
    "submitting"
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const submitForm = async () => {
      try {
        const formDataToSubmit = new FormData();

        // Append basic details
        Object.entries(formData.basicDetails).forEach(([key, value]) => {
          formDataToSubmit.append(`basicDetails[${key}]`, value as string);
        });

        // Append address
        Object.entries(formData.address).forEach(([key, value]) => {
          formDataToSubmit.append(`address[${key}]`, value as string);
        });

        // Append single file
        if (formData.file) {
          formDataToSubmit.append("file", formData.file);
        }

        // Append multiple files
        formData.multiFiles.forEach((file, index) => {
          formDataToSubmit.append(`multiFiles[${index}]`, file);
        });

        // Append geolocation
        if (formData.geolocation) {
          formDataToSubmit.append(
            "geolocation",
            JSON.stringify(formData.geolocation)
          );
        }

        await submitFormData(formDataToSubmit);
        setStatus("success");
        setMessage("Form submitted successfully!");
        toast.success("Form submitted successfully!");
      } catch (error) {
        setStatus("error");
        setMessage("Error submitting form. Please try again.");
        toast.error("Error submitting form");
      }
    };

    submitForm();
  }, [formData]);

  const handleDone = () => {
    navigate("/dashboard");
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        {status === "submitting" && (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-lg">Submitting your form...</p>
          </div>
        )}

        {status === "success" && (
          <div className="space-y-4">
            <div className="text-green-500">
              <svg
                className="mx-auto h-16 w-16"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900">{message}</h3>
          </div>
        )}

        {status === "error" && (
          <div className="space-y-4">
            <div className="text-red-500">
              <svg
                className="mx-auto h-16 w-16"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900">{message}</h3>
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={prev}
          className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          disabled={status === "submitting"}
        >
          Previous
        </button>

        {status !== "submitting" && (
          <button
            type="button"
            onClick={handleDone}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Done
          </button>
        )}
      </div>
    </div>
  );
};

export default Status;
