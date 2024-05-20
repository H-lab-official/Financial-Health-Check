import {
  calculateRequiredScholarships,
  calculateTotalPreparationAssets,
  educationPlanState,
  totalMissingSelector,
} from "@/recoil/educationPlanState";
import {
  calculateAdditionalRoomFee,
  calculateAnnualTreatments,
  calculateDailyCompensation,
  calculateEmergencyCosts,
  calculateTreatingSeriousIllness,
  healthPlanState,
} from "@/recoil/healthPlanState";
import {
  calculateCoverage,
  calculateExpenses,
  calculateInitialYearlyExpense,
  calculateRequiredAmount,
  calculateTotalAssets,
  calculateTotalDebts,
  protectionPlanState,
} from "@/recoil/protectionPlanState";
import { questionsState } from "@/recoil/questionsState";
import {
  calculatePreparationYears,
  calculateTotalCosts,
  calculateTotalPreparation,
  calculateWorkingYears,
  calculateisTotalPreparationAssets,
  mustBeSavedSelector,
  retirementPlanState,
  totalRetirementMissingSelector,
} from "@/recoil/retirementPlanState";
import { Row, Table, Typography } from "antd";
import { useRecoilState, useRecoilValue } from "recoil";

const { Title } = Typography;

const PDFSave: React.FC = () => {
  const [questionsData] = useRecoilState(questionsState);
  const [protectionPlanData] = useRecoilState(protectionPlanState);
  const [healthPlanData] = useRecoilState(healthPlanState);
  const [retirementPlanData] = useRecoilState(retirementPlanState);
  const [educationPlanData] = useRecoilState(educationPlanState);
  const totalMissing = useRecoilValue(totalRetirementMissingSelector);
  const mustBeSaved = useRecoilValue(mustBeSavedSelector);
  const educationMissing = useRecoilValue(totalMissingSelector);
  const convertMoney = (value: string) => {
    return parseFloat(value).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };
  return (
    <div
      className="flex justify-center"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div className="bg-white shadow-md rounded-lg px-10 py-2 mx-6 my-2 max-w-3xl w-full">
        <Row style={{ marginBottom: 30 }}>
          <Title level={5}>ชื่อลูกค้า : xxxxxxxxx xxxx</Title>
        </Row>
        <Row style={{ marginBottom: 30 }}>
          <Table
            columns={[
              {
                title: "ผลลัพธ์ โดยรวม",
                dataIndex: "label",
                key: "label",
              },
              {
                dataIndex: "value",
                key: "value",
              },
            ]}
            dataSource={[
              {
                id: 1,
                label: "ค่าใช้จ่ายในครอบครัว",
                value: convertMoney(calculateCoverage(protectionPlanData)),
              },
              {
                id: 2,
                label: "วางแผนเพื่อสุขภาพ",
                value: convertMoney(calculateAnnualTreatments(healthPlanData)),
              },
              {
                id: 3,
                label: "ค่าใช้จ่ายหลังเกษียณ",
                value: convertMoney(totalMissing),
              },
              {
                id: 4,
                label: "วางแผนเพื่อการศึกษาบุตร",
                value: convertMoney(educationMissing),
              },
            ]}
            pagination={false}
            bordered
          ></Table>
        </Row>

        <Row style={{ marginBottom: 30 }}>
          <Table
            columns={[
              {
                dataIndex: "id",
                key: "id",
              },
              {
                title: "ความสำคัญที่คุณเลือกเป็นดังนี้",
                dataIndex: "label",
                key: "label",
              },
              {
                title: "ความสำคัญที่คุณเลือก",
                dataIndex: "value",
                key: "value",
                align: "center",
              },
            ]}
            dataSource={[
              {
                id: parseInt(questionsData.protectionPlanOrder),
                label: "คุ้มครองรายได้ให้กับครอบครัวในกรณีที่ต้องจากไป",
                value: [
                  { value: "1", label: "ต่ำ" },
                  { value: "2", label: "ปานกลาง" },
                  { value: "3", label: "มาก" },
                ]
                  .filter((obj) => obj.value == questionsData.protectionPlan)
                  .map((obj) => obj.label)
                  .join(","),
              },
              {
                id: parseInt(questionsData.retirementPlanOrder),
                label: "การวางแผนเตรียมเงินไว้ยามเกษียณ",
                value: [
                  { value: "1", label: "ต่ำ" },
                  { value: "2", label: "ปานกลาง" },
                  { value: "3", label: "มาก" },
                ]
                  .filter((obj) => obj.value == questionsData.retirementPlan)
                  .map((obj) => obj.label)
                  .join(","),
              },
              {
                id: parseInt(questionsData.healthPlanOrder),
                label: "การวางแผนเกี่ยวกับสุขภาพ",
                value: [
                  { value: "1", label: "ต่ำ" },
                  { value: "2", label: "ปานกลาง" },
                  { value: "3", label: "มาก" },
                ]
                  .filter((obj) => obj.value == questionsData.healthPlan)
                  .map((obj) => obj.label)
                  .join(","),
              },
              {
                id: parseInt(questionsData.educationPlanOrder),
                label: "การเก็บออมเพื่อค่าเล่าเรียนบุตร",
                value: [
                  { value: "1", label: "ต่ำ" },
                  { value: "2", label: "ปานกลาง" },
                  { value: "3", label: "มาก" },
                ]
                  .filter((obj) => obj.value == questionsData.educationPlan)
                  .map((obj) => obj.label)
                  .join(","),
              },
            ].sort((a, b) => a.id - b.id)}
            pagination={false}
            bordered
          ></Table>
        </Row>

        <Row style={{ marginBottom: 30 }}>
          <Table
            columns={[
              {
                dataIndex: "index",
                key: "index",
              },
              {
                title: "คุ้มครองรายได้ให้กับครอบครัวในกรณีที่ต้องจากไป",
                dataIndex: "label",
                key: "label",
              },
              {
                dataIndex: "value",
                key: "value",
                align: "center",
              },
              {
                dataIndex: "unit",
                key: "unit",
              },
              {
                title: "หมายเหตุ",
                dataIndex: "note",
                key: "note",
              },
            ]}
            dataSource={[
              {
                id: 1,
                label: "ค่าใช้จ่าย",
                value: "",
                unit: "",
                note: "",
              },
              {
                id: 2,
                index: 1,
                label: "ค่าใช้จ่ายภายในครอบครัว",
                value: convertMoney(protectionPlanData.initialMonthlyExpense),
                unit: "บาท/เดือน",
                note: "",
              },
              {
                id: 3,
                index: 2,
                label: "ค่าใช้จ่ายภายในครอบครัวบาท/ปี",
                value: convertMoney(
                  calculateInitialYearlyExpense(protectionPlanData)
                ),
                unit: "บาท/ปี",
                note: "",
              },
              {
                id: 4,
                index: 3,
                label: "จำนวนปีที่ต้องการดูแลครอบครัว",
                value: protectionPlanData.numberOfYears,
                unit: "ปี",
                note: "",
              },
              {
                id: 5,
                index: 4,
                label: "เงินสำรองฉุกเฉิน (50% ของ รายได้บาท/ปี)",
                value: convertMoney(protectionPlanData.adjustedYearlyExpenses),
                unit: "บาท",
                note: "",
              },
              {
                id: 6,
                index: 5,
                label: "เงินเฟ้อ",
                value: parseFloat(protectionPlanData.inflationRate) * 100,
                unit: "%",
                note: "",
              },
              {
                id: 7,
                index: 6,
                label: "เงินสำรองที่จำเป็นต้องจัดเตรียมไว้",
                value: convertMoney(calculateExpenses(protectionPlanData)),
                unit: "บาท",
                note: "",
              },
              {
                id: 8,

                label: "",
                value: "",
                unit: "",
                note: "",
              },
              {
                id: 9,

                label: "หนี้สินค้างชำระ",
                value: "",
                unit: "",
                note: "",
              },
              {
                id: 10,
                index: 7,
                label: "ค่าผ่อนบ้านคงค้างทั้งหมด",
                value: convertMoney(protectionPlanData.homePayments),
                unit: "บาท",
                note: "",
              },
              {
                id: 11,
                index: 8,
                label: "ค่าผ่อนรถคงค้างทั้งหมด",
                value: convertMoney(protectionPlanData.carPayments),
                unit: "บาท",
                note: "",
              },
              {
                id: 12,
                index: 9,
                label: "หนี้สินอื่นๆ",
                value: convertMoney(protectionPlanData.otherDebts),
                unit: "บาท",
                note: "",
              },
              {
                id: 14,
                index: 10,
                label: "รวมหนี้สิน",
                value: convertMoney(calculateTotalDebts(protectionPlanData)),
                unit: "บาท",
                note: "",
              },
              {
                id: 15,
                label: "",
                value: "",
                unit: "",
                note: "",
              },
              {
                id: 16,
                index: 12,
                label: "จำนวนเงินที่ต้องการ",
                value: convertMoney(
                  calculateRequiredAmount(protectionPlanData)
                ),
                unit: "บาท",
                note: "",
              },
              {
                id: 17,
                label: "",
                value: "",
                unit: "",
                note: "",
              },
              {
                id: 18,
                label: "สิ่งที่เตรียมไว้แล้ว (มีสภาพคล่อง)",
                value: "",
                unit: "",
                note: "",
              },
              {
                id: 19,
                index: 13,
                label: "เงินฝากธนาคาร",
                value: convertMoney(protectionPlanData.bankDeposit),
                unit: "บาท",
                note: "",
              },
              {
                id: 20,
                index: 14,
                label: "ทุนประกันชีวิต",
                value: convertMoney(protectionPlanData.lifeInsuranceFund),
                unit: "บาท",
                note: "",
              },
              {
                id: 21,
                index: 15,
                label: "ทรัพย์สินอื่น ๆ",
                value: convertMoney(protectionPlanData.otherAssets),
                unit: "บาท",
                note: "",
              },
              {
                id: 22,
                index: 16,
                label: "รวมสิ่งที่เตรียมไว้แล้ว",
                value: convertMoney(calculateTotalAssets(protectionPlanData)),
                unit: "บาท",
                note: "",
              },
              {
                id: 23,
                label: "",
                value: "",
                unit: "",
              },
              {
                id: 24,
                index: 17,
                label: "ความคุ้มครองที่จำเป็น",
                value: convertMoney(calculateCoverage(protectionPlanData)),
                unit: "บาท",
                note: "",
              },
              {
                id: 25,
                label: "",
                value: "",
                unit: "",
              },
              {
                id: 26,
                label: "ผลลัพธ์",
                value: convertMoney(calculateCoverage(protectionPlanData)),
                unit: "บาท",
                note: "",
              },
            ]}
            pagination={false}
            bordered
          ></Table>
        </Row>

        <Row style={{ marginBottom: 30 }}>
          <Table
            columns={[
              {
                dataIndex: "index",
                key: "index",
              },
              {
                title: "วางแผนเพื่อสุขภาพ",
                dataIndex: "label",
                key: "label",
              },
              {
                dataIndex: "value",
                key: "value",
                align: "center",
              },
              {
                dataIndex: "unit",
                key: "unit",
              },
              {
                title: "หมายเหตุ",
                dataIndex: "note",
                key: "note",
              },
            ]}
            dataSource={[
              {
                id: 1,
                label: "กลุ่มโรงพยาบาลที่ใช้บริการประจำ",
                value: [
                  { label: "โรงพยาบาลรัฐ", value: "1500.00" },
                  { label: "โรงพยาบาลรัฐนอกเวลา", value: "2500.00" },
                  { label: "โรงพยาบาลเอกชน", value: "4000.00" },
                  { label: "โรงพยาบาลเอกชนพรีเมียม", value: "6000.00" },
                ]
                  .filter((obj) => obj.value === healthPlanData.hospitals)
                  .map((obj) => obj.label)
                  .join(","),
                index: 1,
                unit: "",
                note: "",
              },
              {
                id: 2,
                index: 2,
                label: "ค่าห้องต่อวันประมาณ",
                value: convertMoney(healthPlanData.hospitals),
                unit: "บาท",
                note: "",
              },
              {
                id: 3,

                label: "",
                value: "",
                unit: "",
                note: "",
              },
              {
                id: 4,

                label: "สวัสดิการที่คาดหวังจะได้",
                value: "",
                unit: "",
                note: "",
              },
              {
                id: 5,
                index: 3,
                label: "ค่าห้องวันละ",
                value: convertMoney(healthPlanData.hospitals),
                unit: "บาท",
                note: "",
              },
              {
                id: 6,
                index: 3.1,
                label: "ค่าชดเชยรายวัน",
                value: convertMoney(
                  healthPlanData.dailyCompensationFromWelfare
                ),
                unit: "บาท",
                note: "",
              },
              {
                id: 7,
                index: 4,
                label: "ค่ารักษาโรคร้ายแรง",
                value: convertMoney(healthPlanData.treatingSeriousIllness),
                unit: "บาท",
                note: "",
              },
              {
                id: 8,
                index: 5,
                label: "ค่ารักษาอุบัติเหตุฉุกเฉิน",
                value: convertMoney(healthPlanData.emergencyCosts),
                unit: "บาท",
                note: "",
              },
              {
                id: 9,
                index: 6,
                label: "งบประมาณค่ารักษาบาท/ปี (เหมาจ่าย)",
                value: convertMoney(healthPlanData.annualTreatment),
                unit: "บาท",
                note: "",
              },
              {
                id: 10,

                label: "",
                value: "",
                unit: "",
                note: "",
              },
              {
                id: 11,

                label: "สวัสดิการปัจจุบันจากบริษัท หรือ จากประกันที่มี",
                value: "",
                unit: "",
                note: "",
              },
              {
                id: 12,
                index: 7,
                label: "ค่าห้องวันละ",
                value: convertMoney(healthPlanData.roomFeeFromCompany),
                unit: "บาท",
                note: "",
              },
              {
                id: 13,
                index: 7.1,
                label: "ค่าชดเชยรายวัน",
                value: convertMoney(
                  healthPlanData.dailyCompensationFromWelfare
                ),
                unit: "บาท",
                note: "",
              },
              {
                id: 14,
                index: 8,
                label: "ค่ารักษาโรคร้ายแรง",
                value: convertMoney(
                  healthPlanData.treatingSeriousIllnessFromCompany
                ),
                unit: "บาท",
                note: "",
              },
              {
                id: 15,
                index: 9,
                label: "ค่ารักษาอุบัติเหตุฉุกเฉิน",
                value: convertMoney(healthPlanData.emergencyCostsFromCompany),
                unit: "บาท",
                note: "",
              },
              {
                id: 16,
                index: 10,
                label: "งบประมาณค่ารักษาบาท/ปี (เหมาจ่าย)",
                value: convertMoney(healthPlanData.annualTreatmentFromCompany),
                unit: "บาท",
                note: "",
              },
              {
                id: 17,

                label: "",
                value: "",
                unit: "",
                note: "",
              },
              {
                id: 18,

                label: "สวัสดิการที่ต้องเพิ่มเติม",
                value: "",
                unit: "",
                note: "",
              },
              {
                id: 19,
                index: 11,
                label: "ค่าห้องวันละ",
                value: convertMoney(calculateAdditionalRoomFee(healthPlanData)),
                unit: "บาท",
                note: "",
              },
              {
                id: 20,
                index: 11.1,
                label: "ค่าชดเชยรายวัน",
                value: convertMoney(calculateDailyCompensation(healthPlanData)),
                unit: "บาท",
                note: "",
              },
              {
                id: 21,
                index: 12,
                label: "ค่ารักษาโรคร้ายแรง",
                value: convertMoney(
                  calculateTreatingSeriousIllness(healthPlanData)
                ),
                unit: "บาท",
                note: "",
              },
              {
                id: 22,
                index: 13,
                label: "ค่ารักษาอุบัติเหตุฉุกเฉิน",
                value: convertMoney(calculateEmergencyCosts(healthPlanData)),
                unit: "บาท",
                note: "",
              },
              {
                id: 23,
                index: 14,
                label: "งบประมาณค่ารักษาบาท/ปี (เหมาจ่าย)",
                value: convertMoney(calculateAnnualTreatments(healthPlanData)),
                unit: "บาท",
                note: "",
              },
              {
                id: 24,

                label: "",
                value: "",
                unit: "",
                note: "",
              },

              {
                id: 25,
                label: "ผลลัพธ์",
                value: convertMoney(calculateAnnualTreatments(healthPlanData)),
                unit: "",
                note: "",
              },
            ]}
            pagination={false}
            bordered
          ></Table>
        </Row>

        <Row style={{ marginBottom: 30 }}>
          <Table
            columns={[
              {
                dataIndex: "index",
                key: "index",
              },
              {
                title: "ค่าใช้จ่ายหลังเกษียณ",
                dataIndex: "label",
                key: "label",
              },
              {
                dataIndex: "value",
                key: "value",
                align: "center",
              },
              {
                dataIndex: "unit",
                key: "unit",
              },
              {
                title: "หมายเหตุ",
                dataIndex: "note",
                key: "note",
              },
            ]}
            dataSource={[
              {
                id: 1,
                index: 1,
                label: "กินอยู่",
                value: convertMoney(retirementPlanData.livingCosts),
                unit: "บาท/เดือน",
                note: "",
              },
              {
                id: 2,
                index: 2,
                label: "ค่าน้ำค่าไฟ ค่าใช้จ่ายภายในบ้าน",
                value: convertMoney(retirementPlanData.houseCosts),
                unit: "บาท/เดือน",
                note: "",
              },
              {
                id: 3,
                index: 3,
                label: "ค่ามือถือ อินเตอร์เน็ต",
                value: convertMoney(retirementPlanData.internetCosts),
                unit: "บาท/เดือน",
                note: "",
              },
              {
                id: 4,

                label: "",
                value: "",
                unit: "",
                note: "",
              },
              {
                id: 5,
                index: 4,
                label: "ค่าเสื้อผ้า",
                value: convertMoney(retirementPlanData.clothingCosts),
                unit: "บาท",
                note: "",
              },
              {
                id: 6,
                index: 5,
                label: "ค่ารักษาพยาบาล",
                value: convertMoney(retirementPlanData.medicalCosts),
                unit: "บาท",
                note: "",
              },
              {
                id: 7,
                index: 6,
                label: "ค่าใช้จ่ายอื่น ๆ (ขาดได้ ไม่ใช่ปัจจัย 4)",
                value: convertMoney(retirementPlanData.otherCosts),
                unit: "บาท",
                note: "",
              },
              {
                id: 8,

                label: "",
                value: "",
                unit: "",
                note: "",
              },
              {
                id: 9,
                index: 7,
                label: "รวมค่าใช้จ่ายต่อปี",
                value: convertMoney(calculateTotalCosts(retirementPlanData)),
                unit: "บาท",
                note: "",
              },
              {
                id: 10,
                label: "",
                value: "",
                unit: "",
                note: "",
              },
              {
                id: 11,
                index: 8,
                label: "อายุตอนนี้",
                value: retirementPlanData.age,
                unit: "ปี",
                note: "",
              },
              {
                id: 12,
                index: 9,
                label: "อายุเกษียณ",
                value: retirementPlanData.retireAge,
                unit: "ปี",
                note: "",
              },
              {
                id: 13,
                index: 10,
                label: "คาดการณ์อายุขัย",
                value: retirementPlanData.lifExpectancy,
                unit: "ปี",
                note: "",
              },
              {
                id: 14,
                label: "",
                value: "",
                unit: "",
                note: "",
              },
              {
                id: 15,
                index: 11,
                label: "จำนวนปีที่ทำงานได้",
                value: calculateWorkingYears(retirementPlanData),
                unit: "ปี",
                note: "",
              },
              {
                id: 16,
                index: 12,
                label: "จำนวนปีที่ต้องเตรียม",
                value: calculatePreparationYears(retirementPlanData),
                unit: "ปี",
                note: "",
              },
              {
                id: 17,
                label: "",
                value: "",
                unit: "",
                note: "",
              },
              {
                id: 18,
                index: 13,
                label: "เงินเฟ้อ",
                value: parseFloat(retirementPlanData.inflationRate) * 100,
                unit: "%",
                note: "",
              },
              {
                id: 19,
                index: 14,
                label: "รวมค่าใช้จ่ายที่ต้องเตรียม",
                value: convertMoney(
                  calculateTotalPreparation(retirementPlanData)
                ),
                unit: "บาท",
                note: "",
              },
              {
                id: 20,
                label: "",
                value: "",
                unit: "",
                note: "",
              },
              {
                id: 21,
                label: "สิ่งที่เตรียมไว้แล้ว (มีสภาพคล่อง)",
                value: "",
                unit: "",
                note: "",
              },
              {
                id: 22,
                index: 15,
                label: "เงินฝาก",
                value: convertMoney(retirementPlanData.deposit),
                unit: "บาท",
                note: "",
              },
              {
                id: 23,
                index: 16,
                label: "ทรัพย์สินอื่น ๆ",
                value: convertMoney(retirementPlanData.otherAssets),
                unit: "บาท",
                note: "",
              },
              {
                id: 24,
                index: 17,
                label: "ทุนประกัน",
                value: convertMoney(retirementPlanData.insuranceFund),
                unit: "บาท",
                note: "",
              },
              {
                id: 25,
                index: 18,
                label: "รวมสิ่งที่เตรียมไว้แล้ว",
                value: convertMoney(
                  calculateisTotalPreparationAssets(retirementPlanData)
                ),

                unit: "บาท",
                note: "",
              },
              {
                id: 26,

                label: "",
                value: "",
                unit: "",
                note: "",
              },
              {
                id: 27,
                index: 19,
                label: "รวมที่ขาดอยู่",
                value: convertMoney(totalMissing),
                unit: "บาท",
                note: "",
              },
              {
                id: 28,
                index: 20,
                label: "ต่อปีที่ต้องเก็บได้",
                value: convertMoney(mustBeSaved),
                unit: "บาท",
                note: "",
              },
              {
                id: 29,

                label: "",
                value: "",
                unit: "",
                note: "",
              },
              {
                id: 30,
                label: "ผลลัพธ์",
                value: convertMoney(totalMissing),
                unit: "",
                note: "",
              },
            ]}
            pagination={false}
            bordered
          ></Table>
        </Row>

        <Row style={{ marginBottom: 30 }}>
          <Table
            columns={[
              {
                dataIndex: "index",
                key: "index",
              },
              {
                title: "วางแผนเพื่อการศึกษาบุตร",
                dataIndex: "label",
                key: "label",
              },
              {
                dataIndex: "value",
                key: "value",
                align: "center",
              },
              {
                dataIndex: "unit",
                key: "unit",
              },
              {
                title: "หมายเหตุ",
                dataIndex: "note",
                key: "note",
              },
            ]}
            dataSource={[
              {
                id: 1,
                index: 1,
                label: "ระดับการศึกษาที่คาดหวัง",
                value: educationPlanData.levelOfeducation,
                unit: "",
                note: "",
              },
              {
                id: 2,
                index: 2,
                label: "ลักษณะโรงเรียน หรือ หลักสูตรที่คาดหวัง",
                value: [
                  { value: "107000.00", label: "รัฐบาล" },
                  { value: "214900.00", label: "เอกชน" },
                  { value: "500000.00", label: "อินเตอร์" },
                ]
                  .filter(
                    (obj) => obj.value === educationPlanData.typeOfeducation
                  )
                  .map((obj) => obj.label)
                  .join(","),
                unit: "",
                note: "",
              },
              {
                id: 3,

                label: "",
                value: "",
                unit: "",
                note: "",
              },
              {
                id: 4,

                label: "ทุนการศึกษาที่จำเป็น",
                value: "",
                unit: "",
                note: "",
              },
              {
                id: 5,
                index: 3,
                label: "ค่าเล่าเรียน",
                value: convertMoney(educationPlanData.typeOfeducation),
                unit: "บาทต่อปี",
                note: "",
              },
              {
                id: 6,
                index: 4,
                label: "ค่าใช้จ่ายระหว่างศึกษา",
                value: convertMoney(
                  (
                    parseFloat(educationPlanData.typeOfeducation) * 0.15
                  ).toFixed(2)
                ),
                unit: "บาทต่อปี",
                note: "",
              },
              {
                id: 7,
                index: 5,
                label: "จำนวนปีการศึกษาของลูกที่จะต้องส่ง",
                value: educationPlanData.yearsOfeducation,
                unit: "ปี",
                note: "",
              },
              {
                id: 8,
                index: 6,
                label: "จำนวนปีการศึกษาของลูกที่จะต้องส่ง",
                value: parseFloat(educationPlanData.inflationRate) * 100,
                unit: "%",
                note: "",
              },
              {
                id: 9,
                label: "",
                value: "",
                unit: "",
                note: "",
              },
              {
                id: 10,
                index: 7,
                label: "รวมทุนการศึกษาที่จำเป็น",
                value: convertMoney(
                  calculateRequiredScholarships(educationPlanData)
                ),
                unit: "บาท",
                note: "",
              },

              {
                id: 11,
                label: "",
                value: "",
                unit: "",
                note: "",
              },
              {
                id: 12,

                label: "สิ่งที่เตรียมไว้แล้ว",
                value: "",
                unit: "",
                note: "",
              },
              {
                id: 13,
                index: 8,
                label: "เงินฝาก",
                value: convertMoney(educationPlanData.deposit),
                unit: "บาท",
                note: "",
              },
              {
                id: 14,
                index: 9,
                label: "กรมธรรม์ที่ครบกำหนด",
                value: convertMoney(educationPlanData.insuranceFund),
                unit: "บาท",
                note: "",
              },
              {
                id: 15,
                index: 10,
                label: "อื่นๆ",
                value: convertMoney(educationPlanData.otherAssets),
                unit: "บาท",
                note: "",
              },
              {
                id: 16,
                index: 11,
                label: "รวมทุนการศึกษาที่เตรียมไว้แล้ว",

                value: convertMoney(
                  calculateTotalPreparationAssets(educationPlanData)
                ),
                unit: "บาท",
                note: "",
              },
              {
                id: 17,
                label: "",
                value: "",
                unit: "",
                note: "",
              },
              {
                id: 18,
                index: 12,
                label: "รวมที่ขาดอยู่",
                value: convertMoney(educationMissing),
                unit: "บาท",
                note: "",
              },
              {
                id: 19,
                label: "",
                value: "",
                unit: "",
                note: "",
              },

              {
                id: 20,
                label: "ผลลัพธ์",
                value: convertMoney(educationMissing),
                unit: "",
                note: "",
              },
            ]}
            pagination={false}
            bordered
          ></Table>
        </Row>
      </div>
    </div>
  );
};

export default PDFSave;
