import { Form, Input, Typography, Row, Col, Spin } from "antd";
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { NavBar } from "./navbar";

const LoadingPage = () => {



    return (
        <div className="flex flex-col justify-center items-center text-[#0E2B81]">
            <div className=" fixed top-0 z-40"><NavBar /></div>
            <div className="bg-white rounded-lg px-6  mx-6 my-20 max-w-2xl h-auto flex flex-col justify-center items-center w-[400px] gap-3 ">
                <h1>กำลังโหลดตรวจสอบข้อมูล โปรดรอสักครู่</h1>
                <Spin size="large" />
            </div>
        </div>

    );
};

export default LoadingPage;
