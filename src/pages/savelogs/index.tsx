import React, { useState, useEffect } from 'react';
import { Table, Spin, Tabs, Button } from 'antd';
import { useNavigate } from 'react-router';
import { NavBar } from '@/components/navbar';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/th'; // Import ภาษาไทย
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

moment.locale('th'); // ตั้งค่าภาษาไทยให้กับ moment

const { TabPane } = Tabs;

const ViewAllLogs: React.FC = () => {
    const [logs, setLogs] = useState<any[]>([]);
    const [planLogs, setPlanLogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/logs`);
                setLogs(response.data);

                const planResponse = await axios.get(`${import.meta.env.VITE_API_URL}/planlogs`);
                setPlanLogs(planResponse.data);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching logs:', error);
                setLoading(false);
            }
        };

        fetchLogs();
    }, []);

    const planMap: { [key: string]: string } = {
        '1': 'ProtectionPlan',
        '2': 'HealthPlan',
        '3': 'RetirementPlan',
        '4': 'EducationPlan',
        '5': 'AllPlan',
    };

    const renderPlans = (plans: string[]) => {
        return plans.map(plan => planMap[plan] || plan).join(', ');
    };

    const transformLogsForExport = (logs: any[]) => {
        return logs.map(log => ({
            ...log,
            selectedPlans: renderPlans(log.selectedPlans),
            timestamp: moment(log.timestamp).format('LLLL'),
        }));
    };

    const commonColumns = [
        {
            title: 'User Params',
            dataIndex: 'user_params',
            key: 'user_params',
            sorter: (a: any, b: any) => a.user_params.localeCompare(b.user_params),
            sortDirections: ['ascend', 'descend'],
        },
        {
            title: 'Timestamp',
            dataIndex: 'timestamp',
            key: 'timestamp',
            render: (timestamp: string) => moment(timestamp).format('LLLL'),
            sorter: (a: any, b: any) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
            sortDirections: ['ascend', 'descend'],
        },
    ];

    const generalLogsColumns = [
        ...commonColumns,
        {
            title: 'Selected Plans',
            dataIndex: 'selectedPlans',
            key: 'selectedPlans',
            render: renderPlans,
        },
    ];

    const planLogsColumns = [
        ...commonColumns,
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: number) => (status === 1 ? 'Success' : 'Failure'),
        },
    ];

    const exportToExcel = (data: any[], fileName: string) => {
        const transformedData = transformLogsForExport(data);
        const worksheet = XLSX.utils.json_to_sheet(transformedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(blob, `${fileName}.xlsx`);
    };
    const exportToExcel2 = (data: any[], fileName: string) => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(blob, `${fileName}.xlsx`);
    };

    return (
        <div className="flex flex-col justify-center items-center text-[#0E2B81]">
            <div className="fixed top-0 z-40"><NavBar /></div>
            <div className="bg-white shadow-md rounded-lg px-6 mx-6 mb-2 mt-12 max-w-2xl h-auto flex flex-col w-[800px] gap-3">
                <h2 className="text-2xl my-2 text-center font-bold">All Selection Logs</h2>
                {loading ? (
                    <Spin size="large" />
                ) : (
                    <>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="Selected Plans" key="1">
                                <Button onClick={() => exportToExcel(logs, 'GeneralLogs')} type="primary" style={{ marginBottom: 16 }}>
                                    Download Selected Plans as Excel
                                </Button>
                                <Table dataSource={logs} columns={generalLogsColumns} rowKey="id" />
                            </TabPane>
                            <TabPane tab="All Plan Logs" key="2">
                                <Button onClick={() => exportToExcel2(planLogs, 'PlanLogs')} type="primary" style={{ marginBottom: 16 }}>
                                    Download Plan Logs as Excel
                                </Button>
                                <Table dataSource={planLogs} columns={planLogsColumns} rowKey="id" />
                            </TabPane>
                        </Tabs>
                    </>
                )}
            </div>
        </div>
    );
};

export default ViewAllLogs;
