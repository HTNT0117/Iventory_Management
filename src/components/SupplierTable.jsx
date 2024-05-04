// const { createRoot } = ReactDOM;
import React, {  useState, useEffect } from 'react';
import { Table  } from "antd";
import {Button} from "@chakra-ui/react";
import axios from 'axios';
import {SUPPLIER_DATA} from "../../api/endPointAPI.js";
import DeleteDialog from "./btn/DeleteDialog.jsx";

const SupplierTable = () => {
    const [supplierdata, setSuppliersData] = useState([]); // State to store fetched data

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(SUPPLIER_DATA); // Replace with your API endpoint
                setSuppliersData(response.data); // Update the data state with fetched data
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData(); // Call the fetchData function when the component mounts
    }, []); // Empty dependency array to fetch data only once when the component mounts

    const deleteProduct = async (pid) => {
        try {
            // Perform delete operation
            await axios.delete(`${SUPPLIER_DATA}/${pid}`);
            // Optionally, you can also update the suppliersData state after successful delete
            const updatedSuppliers = supplierdata.filter(
                (product) => product.pid !== pid
            );
            setSuppliersData(updatedSuppliers);
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const columns = [

        {
            title: 'Supplier Name',
            dataIndex: 'suppliername',
            key: 'suppliernam',
            // width: '10%',
        },
        {
            title: 'Contact',
            dataIndex: 'suppliercontact',
            key: 'suppliercontact',
        },
        {
            title: 'Address',
            dataIndex: 'supplieraddress',
            key: 'supplieraddress',
            // width: '20%',
        },
        {
            title: 'Action',
            dataIndex: 'sellingprice',
            key: 'sellingprice',
            render: (_, record) => (
                <div className={"flex gap-2"}>
                    <Button colorScheme={'twitter'} >Edit</Button>
                    <Button colorScheme={'red'} >Delete</Button>
                </div>
            ),
        }

    ];
    return (
        <>
            <div className={'pl-2 flex justify-start pt-5 pb-2'}>
                <p className={'font-bold text-2xl'}>Supplier List</p>
            </div>
            <Table
                columns={columns}
                dataSource={supplierdata}
                bordered
                // title={() => 'Product List'}
            />

        </>
    );


};
export default SupplierTable;






// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import DeleteDialog from "./btn/DeleteDialog.jsx";
// import {Button} from "@chakra-ui/react";
// import { WiMoonAltWaxingGibbous1 } from "react-icons/wi";

// import { SUPPLIER_DATA } from "../../api/endPointAPI.js";

// const SupplierTable = ({ data}) => {
//   const [suppliersData, setSuppliersData] = useState([]);
//   const [editSupplier, setEditSupplier] = useState([]);
//   const [isEdit, setIsEdit] = useState(false);
  


//   useEffect(() => {
//     const fetchSuppliers = async () => {
//       try {
//         const res = await axios.get(SUPPLIER_DATA);
//         setSuppliersData(res.data);
//       } catch (error) {
//         console.log("Error fetching suppliers:", error);
//       }
//     };      
//     const intervalId = setInterval(fetchSuppliers, 500);
//     return () => clearInterval(intervalId);
//   }, []);

//   const fetchSupplierName = async (suppliername) => {
//     try {
//         const response = await axios.get(
//             SUPPLIER_DATA`/${suppliername}`
//         );
//         const newData = { ...response.data };
//         console.log("newData >>>>>", newData);
//     } catch (error) {
//         console.error("Error fetching data:", error);
//     }
// };


//   const deleteSupplier = async (suppliername) => {
//     try {
//       // Perform delete operation
//       await axios.delete(`${SUPPLIER_DATA}/${suppliername}`);
//       // Optionally, you can also update the suppliersData state after successful delete
//       const updatedSuppliers = suppliersData.filter(supplier => supplier.SupplierName !== suppliername);
//       setSuppliersData(updatedSuppliers);
//     } catch (error) {
//       console.error('Error deleting supplier:', error);
//     }
//   };

//   const handleClickEdit = (suppliername) => {
//     setEditSupplier(suppliername);
//     fetchSupplierName(suppliername);
//     console.log("Edit ID:", suppliername);
// }

//   const generateTextFile = () => {
//     const dataToExport = JSON.stringify(suppliersData, null, 2);

//     const blob = new Blob([dataToExport], { type: "text/plain" });

//     const url = URL.createObjectURL(blob);

//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "supplier_data.txt";

//     document.body.appendChild(a);
//     a.click();

//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
//   };


//   return (
//     <div className="overflow-x-auto justify-start">
//       <button
//         className="px-4 py-2 mb-4 bg-sky-200 text-black rounded-md hover:bg-sky-700 focus:outline-none"
//         onClick={generateTextFile}
//       >
//         Generate Text File
//       </button>
//       <table className="min-w-full bg-white">
//         <thead>
//           <tr>
//             <th className="px-3 py-3 w-10 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-black uppercase tracking-wider">
//               Num
//             </th>
//             <th className="px-4 py-3 w-40 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-black uppercase tracking-wider">
//               Supplier Name
//             </th>
//             <th className="px-4 py-3 w-40 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-black uppercase tracking-wider">
//               Contact
//             </th>
//             <th className="px-4 py-3 w-56 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-black uppercase tracking-wider">
//               Address
//             </th>
//             <th className="px-4 py-3 w-40 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-black uppercase tracking-wider whitespace-no-wrap">
//               Action
//             </th>
//           </tr>
//         </thead>
//         <tbody className="bg-white">
//           {suppliersData.map(
//             (
//               supplier,
//               index
//             ) => (
//               <tr key={index}>
//                 <td className="px-3 py-3 border-b border-gray-200">
//                   {index + 1}
//                 </td>
//                 <td className="px-4 py-3 border-b border-gray-200">
//                   {supplier.suppliername}
//                 </td>
//                 <td className="px-4 py-3 border-b border-gray-200">
//                   {supplier.suppliercontact}
//                 </td>
//                 <td className="px-4 py-3 border-b border-gray-200">
//                   {supplier.supplieraddress}
//                 </td>
//                 <td className="py-3 border-b border-gray-200 text-center">
//                   <div className={"flex gap-2"}>
//                     <Button colorScheme={'twitter'} onClick={() => handleClickEdit(supplier.suppliername)}>Edit</Button>
//                     {/*<EditBtn*/}
//                     {/*  no1={"Supplier name"}*/}
//                     {/*  no2={"Contact"}*/}
//                     {/*  no3={"Address"}*/}
//                     {/*  onClick={() => editSupplier(supplier.id)}*/}
//                     {/*  save={updateSupplier}*/}
//                     {/*  handleChange={handleChange}*/}
//                     {/*  dataForm={dataForm}*/}
//                     {/*/>*/}
//                     <DeleteDialog onClick={() => deleteSupplier(supplier.suppliername)} />
//                   </div>
//                 </td>
//               </tr>
//             )
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default SupplierTable;