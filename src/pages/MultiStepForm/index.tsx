import { useState } from "react";
import BasicDetails from "./steps/BasicDetails";
import Address from "./steps/Address";
import FileUpload from "./steps/FileUpload";
import MultiFileUpload from "./steps/MultiFileUpload";
import Status from "./steps/Status";
import ProgressBar from "../../components/ProgressBar";
import useAuth from "../../hooks/useAuth";

const steps = [
  "Basic Details",
  "Address",
  "File Upload",
  "Multi File Upload",
  "Status",
];

const MultiStepForm = () => {
  const { logout } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    basicDetails: {},
    address: {},
    file: null,
    multiFiles: [],
    geolocation: null,
  });

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const updateFormData = (step: string, data: any) => {
    setFormData((prev) => ({ ...prev, [step]: data }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <BasicDetails
            next={nextStep}
            data={formData.basicDetails}
            updateData={updateFormData}
          />
        );
      case 1:
        return (
          <Address
            next={nextStep}
            prev={prevStep}
            data={formData.address}
            updateData={updateFormData}
          />
        );
      case 2:
        return (
          <FileUpload
            next={nextStep}
            prev={prevStep}
            data={formData.file}
            updateData={updateFormData}
          />
        );
      case 3:
        return (
          <MultiFileUpload
            next={nextStep}
            prev={prevStep}
            data={formData.multiFiles}
            updateData={updateFormData}
          />
        );
      case 4:
        return <Status prev={prevStep} formData={formData} />;
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
