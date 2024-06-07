import "@/components/css/DotsComponent.css"
interface StepInfo {
  title: string;
  content: JSX.Element;
}
interface DotsComponentProps {
  steps: StepInfo[];
  current: number;
}
const DotsComponent: React.FC<DotsComponentProps> = ({ steps, current }) => {
  const dotsCount = steps.length-1;
  return (
    <div className="dots-container">
      {[...Array(dotsCount)].map((_, index) => (<>
        <div key={index} className={`dot ${current===0?" hidden":index+1 === current ? "active" : ""}`} />
       </>
      ))}
    </div>
  );
};
export default DotsComponent;