import React, { useState, useEffect } from 'react';
import { Table } from "antd";
import { Button, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, useDisclosure } from "@chakra-ui/react";
import axios from 'axios';
import { SUPPLIER_DATA } from "../../api/endPointAPI.js";
import DeleteDialog from "./btn/DeleteDialog.jsx";
import EditSupplierModal from './EditSupplierModal.jsx';

const SupplierTable = () => {
    const [supplierData, setSupplierData] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedSupplierId, setSelectedSupplierId] = useState(null);
    const [deleteSupplierId, setDeleteSupplierId] = useState([])

    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();
    const [deleteProductId, setDeleteProductId] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axios.get(SUPPLIER_DATA, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setSupplierData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
        const intervalId = setInterval(fetchData, 300);
        return () => clearInterval(intervalId);
    }, []);

    const deleteSupplier = async () => {
        try {
            await axios.delete(`${SUPPLIER_DATA}/${deleteSupplierId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const updatedSupplier = supplierData.filter(
                (supplier) => supplier.suppliername !== deleteSupplierId
            );
            setSupplierData(updatedSupplier);
            onClose(); // Close the confirmation modal
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const openEditModal = (supplierId) => {
        setSelectedSupplierId(supplierId);
        setIsEditModalOpen(true);
    };

    const columns = [
        {
            title: 'Supplier Name',
            dataIndex: 'suppliername',
            key: 'suppliername',
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
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div className="flex gap-2">
                    <Button colorScheme="twitter" onClick={() => openEditModal(record.sid)}>Edit</Button>
                    <Button colorScheme="red" onClick={() => handleDelete(record.suppliername)}>Delete</Button>
                </div>
            ),
        },
    ];

    
    const handleDelete = (sid) => {
        setDeleteSupplierId(sid);
        onOpen(); // Open the confirmation modal
    };
    return (
        <>
            <div className="pl-2 flex justify-start pt-5 pb-2">
                <p className="font-bold text-2xl">Supplier List</p>
            </div>
            <Table
                columns={columns}
                dataSource={supplierData}
                rowKey="sid"
                bordered
            />
            {selectedSupplierId && (
                <EditSupplierModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    supplierId={selectedSupplierId}
                    fetchData={fetchData}
                />
            )}
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete Product
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure you want to delete this supplier? This action cannot be undone.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme="red" onClick={deleteSupplier} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
};

export default SupplierTable;
