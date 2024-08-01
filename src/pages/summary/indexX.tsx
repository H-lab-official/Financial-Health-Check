import { questionsState } from "@/recoil/questionsState";
import { useRecoilState, useRecoilValue } from "recoil";
import React, { useState } from "react";
import { Button, Row } from "antd";
import ProgressBar from "@/components/progressBar";
import { useNavigate, useLocation } from "react-router";
import { NavBar } from "@/components/navbar";
import protection from "@/assets/images/protection.png";
import health from "@/assets/images/health.png";
import retirement from "@/assets/images/retirement.png";
import Education from "@/assets/images/Education.png";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { nameState, nameData } from "@/recoil/nameState";
import "@/components/css/customRadio.css";
import { selectedState, sortedSelectedState, currentIndexState, progressState } from "@/recoil/progressState";
import { saveQuestionsState } from "@/components/api/saveQuestionsState";

const Summary: React.FC = () => {
  const navigator = useNavigate();
  const location = useLocation();
  const currentStep = location.state?.current || 0;
  const [formData, setFormData] = useRecoilState(questionsState);
  const [current, setCurrent] = useState(currentStep);
  const [progress, setProgress] = useRecoilState<progressState>(progressState);
  const sortedSelected = useRecoilValue(sortedSelectedState);
  const [currentIndex, setCurrentIndex] = useRecoilState(currentIndexState);
  const dataname = useRecoilValue<nameData>(nameState);

  const handleDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const reorderedList = Array.from(sortedSelected);
    const [removed] = reorderedList.splice(result.source.index, 1);
    reorderedList.splice(result.destination.index, 0, removed);

    // Update your recoil state with the new order
    // Assuming you have a setter for sortedSelectedState
    setRecoilState(sortedSelectedState, reorderedList);

    // Update formData order accordingly
    const updatedFormData = { ...formData };
    reorderedList.forEach((value, index) => {
      switch (value) {
        case "1":
          updatedFormData.protectionPlanOrder = index + 1;
          break;
        case "2":
          updatedFormData.healthPlanOrder = index + 1;
          break;
        case "3":
          updatedFormData.retirementPlanOrder = index + 1;
          break;
        case "4":
          updatedFormData.educationPlanOrder = index + 1;
          break;
        default:
          break;
      }
    });
    setFormData(updatedFormData);
  };

  const toGoNext = () => {
    const urlMap: { [key: string]: string } = {
      "1": "/protection-plan",
      "2": "/health-plan",
      "3": "/retirement-plan",
      "4": "/education-plan",
      "5": "/protection-plan",
    };

    if (sortedSelected.length === 1) {
      handleSingleSelection(urlMap);
    } else {
      handleMultipleSelections(urlMap);
    }
  };

  const handleSingleSelection = (urlMap: { [key: string]: string }) => {
    const value = sortedSelected[0];
    if (sortedSelected.length === 1 && value !== "5") {
      navigator("/export-pdf");
    } else {
      if (value === "5") {
        navigateThroughSequence(urlMap);
      } else {
        navigateToValue(urlMap, value, "/export-pdf");
      }
    }
  };

  const handleMultipleSelections = (urlMap: { [key: string]: string }) => {
    if (currentIndex < sortedSelected.length - 1) {
      const value = sortedSelected[currentIndex];
      navigateToValue(urlMap, value);
    } else if (currentIndex === sortedSelected.length - 1) {
      const lastValue = sortedSelected[currentIndex];
      navigateToValue(urlMap, lastValue);
    } else if (currentIndex === sortedSelected.length) {
      navigator("/summary");
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const navigateThroughSequence = (urlMap: { [key: string]: string }) => {
    const sequence = ["1", "2", "3", "4"];

    if (currentIndex < sequence.length) {
      const currentValue = sequence[currentIndex];
      navigateToValue(urlMap, currentValue);
    } else if (currentIndex === sequence.length) {
      navigator("/summary");
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const navigateToValue = (urlMap: { [key: string]: string }, value: string, finalDestination: string = "/summary") => {
    if (urlMap[value]) {
      navigator(urlMap[value]);
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else if (currentIndex === 0) {
      navigator(finalDestination);
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const toGoFirst = () => {
    setCurrentIndex(0);
    toGoNext();
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  const toGoBack = () => {
    const urlMap: { [key: string]: { path: string; state: { current: number } } } = {
      "1": { path: "/protection-plan", state: { current: 3 } },
      "2": { path: "/health-plan", state: { current: 3 } },
      "3": { path: "/retirement-plan", state: { current: 2 } },
      "4": { path: "/education-plan", state: { current: 2 } },
      "5": { path: "/protection-plan", state: { current: 3 } },
    };

    if (sortedSelected.length === 1) {
      handleSingleBack(urlMap);
    } else {
      handleMultipleBack(urlMap);
    }
  };

  const handleSingleBack = (urlMap: { [key: string]: { path: string; state: { current: number } } }) => {
    const value = sortedSelected[0];

    if (value === "5") {
      navigateThroughBackSequence(urlMap);
    } else {
      navigateBackToValue(urlMap, value);
    }
  };

  const handleMultipleBack = (urlMap: { [key: string]: { path: string; state: { current: number } } }) => {
    if (currentIndex > 1) {
      const value = sortedSelected[currentIndex - 2];
      navigateBackToValue(urlMap, value);
    } else if (currentIndex === 1) {
      const firstValue = sortedSelected[0];
      navigateBackToValue(urlMap, firstValue);
    } else {
      navigator(`/?user_params=${dataname.user_params}`, { state: { current: 2 } });
      setCurrentIndex(0);
    }
  };

  const navigateThroughBackSequence = (urlMap: { [key: string]: { path: string; state: { current: number } } }) => {
    const sequence = ["1", "2", "3", "4"];

    if (currentIndex > 0) {
      const previousValue = sequence[currentIndex - 2];
      navigateBackToValue(urlMap, previousValue);
    } else {
      navigator(`/?user_params=${dataname.user_params}`, { state: { current: 2 } });
      setCurrentIndex(0);
    }
  };

  const navigateBackToValue = (urlMap: { [key: string]: { path: string; state: { current: number } } }, value: string) => {
    if (urlMap[value]) {
      navigator(urlMap[value].path, { state: urlMap[value].state });
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const backlast = () => {
    let newPercent = progress.percent;
    newPercent -= 3;
    setProgress({ percent: newPercent, steps: progress.steps });
    toGoBack();
  };

  const nextlast = async () => {
    let newPercent = progress.percent;
    newPercent += 1;
    setProgress({ percent: newPercent, steps: progress.steps });
    await handleSave();
    navigator("/showdata");
  };

  const handleSave = async () => {
    await saveQuestionsState({ data: formData, nameData: dataname });
  };

  const handleDisabled = () => {
    if (current === 0) {
      if (sortedSelected.length === 1) {
        const value = sortedSelected[0];
        switch (value) {
          case "1":
            return !formData.protectionPlanOrder;
          case "2":
            return !formData.healthPlanOrder;
          case "3":
            return !formData.retirementPlanOrder;
          case "4":
            return !formData.educationPlanOrder;
          case "5":
            return (
              !formData.protectionPlanOrder ||
              !formData.healthPlanOrder ||
              !formData.retirementPlanOrder ||
              !formData.educationPlanOrder
            );
          default:
            return true;
        }
      }

      if (sortedSelected.length === 2) {
        const [first, second] = sortedSelected;
        if (first < second) {
          if (first === "1" && second === "2") {
            return !formData.protectionPlanOrder || !formData.healthPlanOrder;
          } else if (first === "1" && second === "3") {
            return !formData.protectionPlanOrder || !formData.retirementPlanOrder;
          } else if (first === "1" && second === "4") {
            return !formData.protectionPlanOrder || !formData.educationPlanOrder;
          } else if (first === "2" && second === "3") {
            return !formData.healthPlanOrder || !formData.retirementPlanOrder;
          } else if (first === "2" && second === "4") {
            return !formData.healthPlanOrder || !formData.educationPlanOrder;
          } else if (first === "3" && second === "4") {
            return !formData.retirementPlanOrder || !formData.educationPlanOrder;
          }
        }
      }

      if (sortedSelected.length === 3) {
        const [first, second, third] = sortedSelected;
        if (first < second && second < third) {
          if (first === "1" && second === "2" && third === "3") {
            return !formData.protectionPlanOrder || !formData.healthPlanOrder || !formData.retirementPlanOrder;
          } else if (first === "1" && second === "2" && third === "4") {
            return !formData.protectionPlanOrder || !formData.healthPlanOrder || !formData.educationPlanOrder;
          } else if (first === "1" && second === "3" && third === "4") {
            return !formData.protectionPlanOrder || !formData.retirementPlanOrder || !formData.educationPlanOrder;
          } else if (first === "2" && second === "3" && third === "4") {
            return !formData.healthPlanOrder || !formData.retirementPlanOrder || !formData.educationPlanOrder;
          }
        }
      }

      if (sortedSelected.length === 4) {
        const [first, second, third, fourth] = sortedSelected;
        if (first < second && second < third && third < fourth) {
          return (
            !formData.protectionPlanOrder ||
            !formData.healthPlanOrder ||
            !formData.retirementPlanOrder ||
            !formData.educationPlanOrder
          );
        }
      }
    }
    return false;
  };

  const divs: { [key: string]: { img: string; label: string; orderKey: keyof typeof formData } } = {
    "1": { img: protection, label: "แผนคุ้มครองรายได้ให้กับครอบครัวในกรณีที่ต้องจากไป", orderKey: "protectionPlanOrder" },
    "2": { img: health, label: "การวางแผนเตรียมเงินเรื่องสุขภาพ", orderKey: "healthPlanOrder" },
    "3": { img: retirement, label: "การวางแผนเตรียมเงินไว้ยามเกษียณ", orderKey: "retirementPlanOrder" },
    "4": { img: Education, label: "การเก็บออมเพื่อค่าเล่าเรียนบุตร", orderKey: "educationPlanOrder" },
  };

  const renderDivs = (): JSX.Element[] => {
    return sortedSelected.map((value, index) => {
      const item = divs[value];

      if (!item) {
        console.error(`Invalid value: ${value}`);
        return null;
      }

      const { img, label, orderKey } = item;
      return (
        <Draggable key={value} draggableId={value} index={index}>
          {(provided) => (
            <div
              className="flex justify-between items-start"
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <div>
                <img src={img} width={70} height={70} alt={label} />
                <p className="text-[12px]">{label}</p>
              </div>
              <div className="mt-12 w-[222px]">
                <p className="text-[12px]">{index + 1}</p>
              </div>
            </div>
          )}
        </Draggable>
      );
    });
  };

  return (
    <div className="flex flex-col justify-center items-center text-[#0E2B81]">
      <div className="fixed top-0 z-40"><NavBar /></div>
      <div className="bg-white shadow-md rounded-lg px-6 py-2 mx-6 mb-2 mt-14 max-w-2xl h-auto flex flex-col w-[400px] gap-3">
        <Row className="flex justify-center items-center mb-3 gap-5 relative">
          <h1 className="text-[24px] text-center text-[#0E2B81]">การจัดลำดับความสำคัญ</h1>
          <ProgressBar percent={progress.percent} current={current} />
          <div className="flex flex-row gap-16 justify-center items-center absolute top-16 right-6">
            <p>น้อย</p>
            <div className="long-arrow-right"></div>
            <p>มาก</p>
          </div>
        </Row>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="plans">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {renderDivs()}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div className="steps-action h-20 flex flex-row justify-center items-center gap-10">
          <Button onClick={backlast} className="bg-white rounded-full w-[120px]">
            ย้อนกลับ
          </Button>
          <Button
            disabled={handleDisabled()}
            onClick={nextlast}
            className="bg-[#003781] rounded-full w-[120px] h-10 text-white"
          >
            สรุปผล
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Summary;
