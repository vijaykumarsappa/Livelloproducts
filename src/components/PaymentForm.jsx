import { useState } from "react";
import { Button, Modal, Input } from "antd";
import { FaCreditCard, FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../store/cartSlice";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const PaymentForm = ({ onBack, resetStep }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const [isPaymentModalVisible, setPaymentModalVisible] = useState(false);
  const [selectedPaymentMode, setSelectedPaymentMode] = useState("");

  const openPaymentModal = () => {
    setPaymentModalVisible(true);
  };

  const handleModalCancel = () => {
    setPaymentModalVisible(false);
    setSelectedPaymentMode("");
  };

  const validationSchema = Yup.object().shape({
    upiId:
      selectedPaymentMode === "upi"
        ? Yup.string()
            .matches(
              /^[\w.-]+@[\w.-]+$/,
              "Enter a valid UPI ID (e.g., john.doe@upi)"
            )
            .required("UPI ID is required")
        : Yup.string(),
    cardNumber:
      selectedPaymentMode === "card"
        ? Yup.string()
            .matches(
              /^\d{16}$/,
              "Card number must be 16 digits (e.g., 1234123412341234)"
            )
            .required("Card number is required")
        : Yup.string(),
    expiry:
      selectedPaymentMode === "card"
        ? Yup.string()
            .matches(
              /^(0[1-9]|1[0-2])\/\d{2}$/,
              "Expiry must be in MM/YY format (e.g., 09/25)"
            )
            .required("Expiry date is required")
        : Yup.string(),
    cvv:
      selectedPaymentMode === "card"
        ? Yup.string()
            .matches(/^\d{3}$/, "CVV must be 3 digits (e.g., 123)")
            .required("CVV is required")
        : Yup.string(),
  });

  const confirmPayment = (values) => {
    //  process payment
    setPaymentModalVisible(false);
    toast.success("Payment Successful! 🎉 Order Confirmed!");
    dispatch(clearCart());
    resetStep();
  };

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <FaCreditCard className="mr-2" size={24} style={{ color: "#f4ac4c" }} />
        Payment Details
      </h2>
      <p className="text-xl font-bold">
        Total: <span className="text-green-600">${totalPrice.toFixed(2)}</span>
      </p>
      <div className="mt-4">
        <Button
          type="primary"
          onClick={openPaymentModal}
          style={{ backgroundColor: "#3D8D7A", borderColor: "#81b1ce" }}
        >
          Pay Now
        </Button>
      </div>
      <Button className="mt-4" onClick={onBack}>
        <FaArrowLeft className="mr-2" size={20} /> Back
      </Button>

      {/* Payment  Modal */}
      <Modal
        title="Select Payment Mode"
        visible={isPaymentModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <p>Please select your payment mode:</p>
        <div className="mt-4 flex flex-col space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              value="upi"
              checked={selectedPaymentMode === "upi"}
              onChange={(e) => setSelectedPaymentMode(e.target.value)}
              className="mr-2"
            />
            UPI
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="card"
              checked={selectedPaymentMode === "card"}
              onChange={(e) => setSelectedPaymentMode(e.target.value)}
              className="mr-2"
            />
            Credit/Debit Card
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="cod"
              checked={selectedPaymentMode === "cod"}
              onChange={(e) => setSelectedPaymentMode(e.target.value)}
              className="mr-2"
            />
            Cash on Delivery
          </label>
        </div>

        {(selectedPaymentMode === "upi" || selectedPaymentMode === "card") && (
          <Formik
            initialValues={{
              upiId: "",
              cardNumber: "",
              expiry: "",
              cvv: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => confirmPayment(values)}
          >
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit} className="mt-4 space-y-4">
                {selectedPaymentMode === "upi" && (
                  <div>
                    <Field
                      as={Input}
                      name="upiId"
                      placeholder="e.g., john.doe@upi"
                    />
                    <ErrorMessage
                      name="upiId"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                )}
                {selectedPaymentMode === "card" && (
                  <>
                    <div>
                      <Field
                        as={Input}
                        name="cardNumber"
                        placeholder="Card Number (e.g., 1234123412341234)"
                      />
                      <ErrorMessage
                        name="cardNumber"
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                    <div>
                      <Field
                        as={Input}
                        name="expiry"
                        placeholder="Expiry (MM/YY, e.g., 09/25)"
                      />
                      <ErrorMessage
                        name="expiry"
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                    <div>
                      <Field
                        as={Input}
                        name="cvv"
                        placeholder="CVV (e.g., 123)"
                      />
                      <ErrorMessage
                        name="cvv"
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                  </>
                )}
                {selectedPaymentMode === "cod" && (
                  <div className="mt-4">
                    <Button
                      type="primary"
                      onClick={() => confirmPayment({})}
                      style={{
                        backgroundColor: "#3D8D7A",
                        borderColor: "#81b1ce",
                      }}
                    >
                      Confirm Payment
                    </Button>
                  </div>
                )}
                {(selectedPaymentMode === "upi" ||
                  selectedPaymentMode === "card") && (
                  <div className="flex justify-end space-x-2">
                    <Button onClick={handleModalCancel}>Cancel</Button>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{
                        backgroundColor: "#3D8D7A",
                        borderColor: "#81b1ce",
                      }}
                    >
                      Confirm Payment
                    </Button>
                  </div>
                )}
              </Form>
            )}
          </Formik>
        )}
        {selectedPaymentMode === "cod" && (
          <div className="mt-4">
            <Button
              type="primary"
              onClick={() => confirmPayment({})}
              style={{ backgroundColor: "#3D8D7A", borderColor: "#81b1ce" }}
            >
              Confirm Payment
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PaymentForm;
