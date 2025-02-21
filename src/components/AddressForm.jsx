import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Input } from "antd";
import { FaHome, FaArrowLeft, FaCreditCard } from "react-icons/fa";
import { motion } from "framer-motion";

const AddressForm = ({ onNext, onBack }) => {
  const savedAddress = JSON.parse(localStorage.getItem("addressDetails"));

  const [isEditing, setIsEditing] = useState(!savedAddress);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Invalid phone number (10 digits required)")
      .required("Phone number is required"),
    address: Yup.string().required("Address is required"),
    pincode: Yup.string().required("Pincode is required"),
    town: Yup.string().required("Town is required"),
  });

  const handleSaveAddress = (values) => {
    localStorage.setItem("addressDetails", JSON.stringify(values));
    setIsEditing(false);
    console.log("Address Details Saved:", values);
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      className="mt-6"
    >
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <FaHome className="mr-2" size={24} />
        Enter Your Shipping Address
      </h2>

      {!isEditing && savedAddress ? (
        <div className="space-y-4 border p-4 rounded-md bg-gray-50 dark:text-black">
          <p>
            <strong>Name:</strong> {savedAddress.name}
          </p>
          <p>
            <strong>Phone:</strong> {savedAddress.phone}
          </p>
          <p>
            <strong>Address:</strong> {savedAddress.address}
          </p>
          <p>
            <strong>Pincode:</strong> {savedAddress.pincode}
          </p>
          <p>
            <strong>Town:</strong> {savedAddress.town}
          </p>
          <div className="flex justify-between mt-4">
            <Button onClick={onBack}>
              <FaArrowLeft className="mr-1" size={16} />
              Back
            </Button>
            <div className="flex space-x-4">
              <Button
                type="primary"
                onClick={onNext}
                style={{ backgroundColor: "#3D8D7A", borderColor: "#81b1ce" }}
              >
                <FaCreditCard className="mr-1" size={16} />
                Proceed to Payment
              </Button>
              <Button onClick={() => setIsEditing(true)}>Change Address</Button>
            </div>
          </div>
        </div>
      ) : (
        <Formik
          initialValues={{
            name: savedAddress?.name || "",
            phone: savedAddress?.phone || "",
            address: savedAddress?.address || "",
            pincode: savedAddress?.pincode || "",
            town: savedAddress?.town || "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => handleSaveAddress(values)}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-semibold">Name</label>
                <Field as={Input} name="name" />
                <ErrorMessage
                  name="name"
                  component="p"
                  className="text-red-500"
                />
              </div>

              <div>
                <label className="block font-semibold">Phone Number</label>
                <Field as={Input} name="phone" />
                <ErrorMessage
                  name="phone"
                  component="p"
                  className="text-red-500"
                />
              </div>

              <div>
                <label className="block font-semibold">
                  Address (Pincode & Area)
                </label>
                <Field as={Input.TextArea} rows={3} name="address" />
                <ErrorMessage
                  name="address"
                  component="p"
                  className="text-red-500"
                />
              </div>

              <div>
                <label className="block font-semibold">Pincode</label>
                <Field as={Input} name="pincode" />
                <ErrorMessage
                  name="pincode"
                  component="p"
                  className="text-red-500"
                />
              </div>

              <div>
                <label className="block font-semibold">Town</label>
                <Field as={Input} name="town" />
                <ErrorMessage
                  name="town"
                  component="p"
                  className="text-red-500"
                />
              </div>

              <div className="flex justify-between mt-4">
                <Button onClick={onBack}>
                  <FaArrowLeft className="mr-1" size={16} />
                  Back
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ backgroundColor: "#3D8D7A" }}
                >
                  <FaCreditCard
                    className="mr-1"
                    size={16}
                    style={{ backgroundColor: "#3D8D7A" }}
                  />
                  Save & Proceed to Payment
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </motion.div>
  );
};

export default AddressForm;
