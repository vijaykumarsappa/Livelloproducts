import { useState } from "react";
import { Steps } from "antd";
import CartItems from "../components/CartItems";
import PaymentForm from "../components/PaymentForm";
import AddressForm from "../components/AddressForm";

const { Step } = Steps;

const Cart = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const resetSteps = () => setCurrentStep(0);

  return (
    <div className="p-8 max-w-3xl mx-auto ">
      <Steps current={currentStep}>
        <Step title="Cart" className="dark:text-red-500" />
        <Step title="Address" />
        <Step title="Payment" />
      </Steps>

      {currentStep === 0 && <CartItems onNext={nextStep} />}
      {currentStep === 1 && <AddressForm onNext={nextStep} onBack={prevStep} />}
      {currentStep === 2 && (
        <PaymentForm onBack={prevStep} resetStep={resetSteps} />
      )}
    </div>
  );
};

export default Cart;
