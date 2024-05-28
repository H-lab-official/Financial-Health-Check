import { Row, Typography, Button } from "antd";
const { Text, Title } = Typography;
import { useNavigate } from "react-router";
import homeTop from '@/assets/images/homeTop.png'
const HomePage: React.FC = () => {
  const navigator = useNavigate();
  return (
    <div className="flex justify-center">
      <div className="bg-white shadow-md rounded-lg px-6 py-2 mx-6 my-2 max-w-2xl w-full">
        <Row align={"middle"} justify={"center"}>
          <img src={homeTop} alt="" />
        </Row>
        <Row align={"middle"} justify={"center"}>
         
          <Title level={4} className=" text-[#243286]">
            Financial Health Check
          </Title>
        </Row>
        <Row align={"middle"} justify={"center"} className="my-4">
          <Text className=" indent-4 px-5">
            สุขภาพการเงิน (Financial Health Check) คือ
            การมีสภาวะทางการเงินที่เพียงพอหรือเหมาะสมกับการดำรงชีวิต
            และยังเป็นรากฐานความมั่นคงทางการเงินในอนาคตอีกด้วย
            หากไม่อยากประสบปัญหาที่กวนใจในอนาคตการตรวจสอบสุขภาพทางการเงินเพื่อวางแผนทางการเงินไว้รับมือกับสถานการณ์ไม่คาดฝันก็เป็นเรื่องที่สำคัญ
            ซึ่งคุณสามารถตรวจสุขภาพทางการเงินง่าย ๆ ด้วยตัวเอง
          </Text>
        </Row>
        <Row align={"middle"} justify={"center"} className="mb-4">
          <Button
            onClick={() => navigator("/protection-plan")}
            className="flex items-center justify-center rounded-full p-5 bg-[#003781] text-white"
          >
            เริ่มทำแบบทดสอบกัน
          </Button>
        </Row>
      </div>
    </div>
  );
};

export default HomePage;
