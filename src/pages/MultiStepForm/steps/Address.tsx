import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  addressLine1: Yup.string().required("Required"),
  addressLine2: Yup.string(),
  city: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  pincode: Yup.string().required("Required"),
  country: Yup.string().required("Required"),
});

const Address = ({ next, prev, data, updateData }: any) => {
  return (
    <Formik
      initialValues={
        data || {
          addressLine1: "",
          addressLine2: "",
          city: "",
          state: "",
          pincode: "",
          country: "",
        }
      }
      validationSchema={validationSchema}
      onSubmit={(values) => {
        updateData("address", values);
        next();
      }}
    >
      {({ errors, touched }) => (
        <Form className="space-y-6">
          <div>
            <Field
              name="addressLine1"
              className="w-full p-2 border rounded"
              placeholder="Address Line 1"
            />
            {errors.addressLine1 && touched.addressLine1 && (
              <div className="text-red-500 text-sm">{errors.addressLine1}</div>
            )}
          </div>

          <div>
            <Field
              name="addressLine2"
              className="w-full p-2 border rounded"
              placeholder="Address Line 2"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Field
                name="city"
                className="w-full p-2 border rounded"
                placeholder="City"
              />
              {errors.city && touched.city && (
                <div className="text-red-500 text-sm">{errors.city}</div>
              )}
            </div>

            <div>
              <Field
                name="state"
                className="w-full p-2 border rounded"
                placeholder="State"
              />
              {errors.state && touched.state && (
                <div className="text-red-500 text-sm">{errors.state}</div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Field
                name="pincode"
                className="w-full p-2 border rounded"
                placeholder="Pincode"
              />
              {errors.pincode && touched.pincode && (
                <div className="text-red-500 text-sm">{errors.pincode}</div>
              )}
            </div>

            <div>
              <Field
                name="country"
                className="w-full p-2 border rounded"
                placeholder="Country"
              />
              {errors.country && touched.country && (
                <div className="text-red-500 text-sm">{errors.country}</div>
              )}
            </div>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={prev}
              className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
            >
              Previous
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Next
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Address;
