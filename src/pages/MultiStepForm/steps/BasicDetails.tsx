import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { nextStep } from "../../../store/stepSlice";
import { setBasicDetails } from "../../../store/formSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  phone: Yup.string().required("Required"),
});

const BasicDetails = () => {
  const dispatch = useAppDispatch();
  const { basicDetails } = useAppSelector((state) => state.form);

  return (
    <Formik
      initialValues={basicDetails || { name: "", email: "", phone: "" }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        dispatch(setBasicDetails(values));

        dispatch(nextStep());
      }}
    >
      {({ errors, touched, setFieldValue }) => (
        <Form className="space-y-6">
          <div>
            <Field
              name="name"
              className="w-full p-2 border rounded"
              placeholder="Full Name"
            />
            {errors.name && touched.name && (
              <div className="text-red-500 text-sm">{errors.name}</div>
            )}
          </div>

          <div>
            <Field
              name="email"
              type="email"
              className="w-full p-2 border rounded"
              placeholder="Email"
            />
            {errors.email && touched.email && (
              <div className="text-red-500 text-sm">{errors.email}</div>
            )}
          </div>

          <div>
            <PhoneInput
              country={"in"}
              value={basicDetails?.phone}
              onChange={(phone) => setFieldValue("phone", phone)}
              containerClass="w-full"
              inputClass="w-full p-2 border rounded"
            />
            {errors.phone && touched.phone && (
              <div className="text-red-500 text-sm">{errors.phone}</div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Next
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default BasicDetails;
