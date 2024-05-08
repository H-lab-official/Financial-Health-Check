import { Form, Select } from "antd";
import { useState } from "react";
import InputField from "./InputField";

interface FormData {
  initialMonthlyExpense: string;
  initialYearlyExpense: string;
  adjustedYearlyExpenses: string;
  numberOfYears: string;
  inflationRate: string;
  homePayments: string;
  carPayments: string;
  otherDebts: string;
  bankDeposit: string;
  lifeInsuranceFund: string;
  otherAssets: string;
  totalAmount: string;
  totalDebts: string;
  requiredAmount: string;
  totalAssets: string;
  coverage: string;
}

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    initialMonthlyExpense: "",
    initialYearlyExpense: "",
    adjustedYearlyExpenses: "",
    numberOfYears: "",
    inflationRate: "3",
    homePayments: "",
    carPayments: "",
    otherDebts: "",
    bankDeposit: "",
    lifeInsuranceFund: "",
    otherAssets: "",
    totalAmount: "",
    totalDebts: "",
    requiredAmount: "",
    totalAssets: "",
    coverage: "",
  });

  const handleInputChange = (field: keyof FormData) => (value: string) => {
    const formattedValue = value.replace(/[^\d\.]/g, "");

    setFormData((prevFormData) => {
      const newFormData = { ...prevFormData, [field]: formattedValue };

      if (isExpenseField(field)) {
        updateExpenses(newFormData);
        updateRequiredAmount(newFormData);
        updateCoverage(newFormData);
      } else if (isDebtField(field)) {
        updateDebts(newFormData);
        updateRequiredAmount(newFormData);
        updateCoverage(newFormData);
      } else if (isAssetsField(field)) {
        updateAssests(newFormData);
        updateCoverage(newFormData);
      }

      return newFormData;
    });
  };

  const isExpenseField = (field: keyof FormData) =>
    [
      "initialMonthlyExpense",
      "adjustedYearlyExpenses",
      "numberOfYears",
      "inflationRate",
    ].includes(field);

  const isDebtField = (field: keyof FormData) =>
    ["homePayments", "carPayments", "otherDebts"].includes(field);

  const isAssetsField = (field: keyof FormData) =>
    ["bankDeposit", "lifeInsuranceFund", "otherAssets"].includes(field);

  const updateExpenses = (formData: FormData) => {
    if (formData.initialMonthlyExpense !== "") {
      formData.initialYearlyExpense = (
        parseFloat(formData.initialMonthlyExpense) * 12
      ).toFixed(2);
    } else {
      formData.initialYearlyExpense = "";
    }
    if (
      formData.initialMonthlyExpense !== "" &&
      formData.adjustedYearlyExpenses !== "" &&
      formData.numberOfYears !== "" &&
      formData.inflationRate !== ""
    ) {
      const totalAmount =
        (parseFloat(formData.initialYearlyExpense) +
          parseFloat(formData.adjustedYearlyExpenses)) *
        ((1 -
          Math.pow(
            1 + parseFloat(formData.inflationRate) / 100,
            parseFloat(formData.numberOfYears)
          )) /
          (1 - (1 + parseFloat(formData.inflationRate) / 100)));
      formData.totalAmount = totalAmount.toFixed(2);
    } else {
      formData.totalAmount = "";
    }
  };

  const updateDebts = (formData: FormData) => {
    if (
      formData.homePayments !== "" &&
      formData.carPayments !== "" &&
      formData.otherDebts !== ""
    ) {
      const totalDebts =
        parseFloat(formData.homePayments) +
        parseFloat(formData.carPayments) +
        parseFloat(formData.otherDebts);
      formData.totalDebts = totalDebts.toFixed(2);
    } else {
      formData.totalDebts = "";
    }
  };

  const updateRequiredAmount = (formData: FormData) => {
    if (formData.totalDebts !== "" && formData.totalAmount !== "") {
      const totalRequiredAmount =
        parseFloat(formData.totalDebts) + parseFloat(formData.totalAmount);

      formData.requiredAmount = totalRequiredAmount.toFixed(2);
    } else {
      formData.requiredAmount = "";
    }
  };

  const updateAssests = (formData: FormData) => {
    if (
      formData.bankDeposit !== "" &&
      formData.lifeInsuranceFund !== "" &&
      formData.otherAssets
    ) {
      const totalAssets =
        parseFloat(formData.bankDeposit) +
        parseFloat(formData.lifeInsuranceFund) +
        parseFloat(formData.otherAssets);

      formData.totalAssets = totalAssets.toFixed(2);
    } else {
      formData.totalAssets = "";
    }
  };

  const updateCoverage = (formData: FormData) => {
    if (formData.totalAssets !== "" && formData.requiredAmount !== "") {
      const coverage =
        parseFloat(formData.requiredAmount) - parseFloat(formData.totalAssets);

      formData.coverage = coverage.toFixed(2);
    } else {
      formData.coverage = "";
    }
  };

  return (
    <div className="flex justify-center">
      <div className="bg-white shadow-md rounded-lg px-6 py-2 mx-6 my-2 max-w-xl w-full">
        <Form>
          <p className="text-xl font-bold py-4">ค่าใช้จ่าย</p>
          <InputField
            label="ค่าใช้จ่ายภายในครอบครัว"
            value={formData.initialMonthlyExpense}
            onChange={handleInputChange("initialMonthlyExpense")}
            addonAfter="฿"
            placeholder="40,000.00"
          />
          <InputField
            label="ค่าใช้จ่ายภายในครอบครัวต่อปี"
            value={formData.initialYearlyExpense}
            onChange={() => {}}
            readOnly
            placeholder="48,000.00"
            addonAfter="฿"
          />
          <InputField
            label="ค่าใช้จ่ายเงินก้อนที่จะเกิด (ค่าซ่อมรถ ซ่อมบ้าน เที่ยว เสริมสวย)"
            value={formData.adjustedYearlyExpenses}
            onChange={handleInputChange("adjustedYearlyExpenses")}
            addonAfter="฿"
            placeholder="50,000.00"
          />
          <InputField
            label="จำนวนปีที่ต้องการดูแลครอบครัว"
            value={formData.numberOfYears}
            onChange={handleInputChange("numberOfYears")}
            addonAfter="ปี"
            placeholder="20"
          />
          <Form.Item label="เงินเฟ้อ">
            <Select
              defaultValue={formData.inflationRate}
              onChange={handleInputChange("inflationRate")}
              options={[
                { value: "3", label: "3 %" },
                { value: "7", label: "7 %" },
              ]}
            />
          </Form.Item>
          <div className="py-4">
            <InputField
              label="จำนวนเงินที่ครอบครัวต้องการ ถ้าเกิดเป็นอะไร ณ วันนี้"
              value={formData.totalAmount}
              onChange={() => {}}
              readOnly
              addonAfter="฿"
            />
          </div>
          <p className=" text-xl font-bold py-4">หนี้สินค้างชำระ</p>
          <InputField
            label="ค่าผ่อนบ้านคงค้างทั้งหมด รวมดอกเบี้ย"
            value={formData.homePayments}
            onChange={handleInputChange("homePayments")}
            addonAfter="฿"
            placeholder="3,000,000.00"
          />
          <InputField
            label="ค่าผ่อนรถคงค้างทั้งหมด รวมดอกเบี้ย"
            value={formData.carPayments}
            onChange={handleInputChange("carPayments")}
            addonAfter="฿"
            placeholder="300,000.00"
          />
          <InputField
            label="หนี้สินอื่นๆ"
            value={formData.otherDebts}
            onChange={handleInputChange("otherDebts")}
            addonAfter="฿"
            placeholder="50,000.00"
          />
          <InputField
            label="รวมหนี้สิน"
            value={formData.totalDebts}
            onChange={() => {}}
            addonAfter="฿"
          />
          <div className="py-4">
            <InputField
              label="จำนวนเงินที่ต้องการ"
              value={formData.requiredAmount}
              onChange={() => {}}
              addonAfter="฿"
            />
          </div>

          <p className=" text-xl font-bold py-4">
            สิ่งที่เตรียมไว้แล้ว (มีสภาพคล่อง)
          </p>
          <InputField
            label="เงินฝากธนาคาร"
            value={formData.bankDeposit}
            onChange={handleInputChange("bankDeposit")}
            addonAfter="฿"
            placeholder="1,000,000.00"
          />
          <InputField
            label="ทุนประกันชีวิต"
            value={formData.lifeInsuranceFund}
            onChange={handleInputChange("lifeInsuranceFund")}
            addonAfter="฿"
            placeholder="6,000,000.00"
          />
          <InputField
            label="ทรัพย์สินอื่น ๆ"
            value={formData.otherAssets}
            onChange={handleInputChange("otherAssets")}
            addonAfter="฿"
            placeholder="3,000,000.00"
          />
          <InputField
            label="รวมสิ่งที่เตรียมไว้แล้ว"
            value={formData.totalAssets}
            onChange={() => {}}
            addonAfter="฿"
          />
          <div className="py-4">
            <InputField
              label="ความคุ้มครองที่จำเป็น"
              value={formData.coverage}
              onChange={() => {}}
              addonAfter="฿"
            />
          </div>
        </Form>
      </div>
    </div>
  );
};

export default App;
