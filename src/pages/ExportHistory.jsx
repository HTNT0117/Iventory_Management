import React, { useEffect, useState } from 'react'
import DeleteDialog from "../components/btn/DeleteDialog.jsx";
import axios from 'axios';
import { EXPORT_HISTORY_DATA } from '../../api/endPointAPI.js';
import { Table } from "antd";


const ExportHistory = () => {
    const [exportHistoryData,setExportHistoryData] = useState([])

    useEffect(()=>
    {
        axios.get(EXPORT_HISTORY_DATA,{
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
        .then(res=>
            {
                console.log(res.data)
                setExportHistoryData(res.data)
            }
        )
    },[])

    const columns = [
        {
            title: 'EID',
            dataIndex: 'eid',
            key: 'eid',
        },
        {
            title: 'Employee name',
            dataIndex: 'employeename',
            key: 'employeename',
        },
        {
            title: 'Date',
            dataIndex: 'exportdate',
            key: 'exportdate',
        }
    ]


    return (
        <>

            <div className="overflow-x-auto flex flex-col pt-6 mx-3 pr-2">
                <div className="pb-2 justify-start items-center inline-flex text-black text-2xl font-bold">
                    <div>
                        View Export History
                    </div>
                </div>
                <Table
                columns={columns}
                dataSource={exportHistoryData}
                rowKey="eid"
                bordered
            />
            </div>
        </>
    )
}
export default ExportHistory