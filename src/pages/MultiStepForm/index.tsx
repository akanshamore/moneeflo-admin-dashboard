import BasicDetails from "./steps/BasicDetails";
import Address from "./steps/Address";
import FileUpload from "./steps/FileUpload";
import MultiFileUpload from "./steps/MultiFileUpload";
import Status from "./steps/Status";
import ProgressBar from "../../components/ProgressBar";
import useAuth from "../../hooks/useAuth";
import { useAppSelector } from "../../hooks/store";

const steps = [
  "Basic Details",
  "Address",
  "File Upload",
  "Multi File Upload",
  "Status",
];

const MultiStepForm = () => {
  const { currentStep } = useAppSelector((state) => state.step);
  const { logout } = useAuth();

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <BasicDetails />;
      case 1:
        return <Address />;
      case 2:
        return <FileUpload />;
      case 3:
        return <MultiFileUpload />;
      case 4:
        return <Status />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-end mb-6">
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
        <ProgressBar steps={steps} currentStep={currentStep} />
        <div className="mt-8 bg-white p-8 rounded-lg shadow">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
