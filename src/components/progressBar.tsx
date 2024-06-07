import {Progress } from "antd";

interface progressBarProps{
percent:number;
current:number;

}

const ProgressBar:React.FC<progressBarProps>=({percent,current})=>{
    return (
        <Progress percent={percent} strokeColor="#243286" showInfo={false} status="active" className={`${current===0?"hidden":""}`} />
    )
}
export default ProgressBar