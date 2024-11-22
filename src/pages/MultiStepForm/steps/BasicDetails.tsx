import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  phone: Yup.string().required("Required"),
});

const BasicDetails = ({ next, data, updateData }: any) => {
  return (
    <Formik
      initialValues={data || { name: "", email: "", phone: "" }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        updateData("basicDetails", values);
        next();
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
              value={data?.phone}
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
