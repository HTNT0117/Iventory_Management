import React, { useState } from 'react';
import axios from 'axios';
import { SUPPLIER_DATA } from '../../api/endPointAPI';

const SupplierForm = () => {
    const initialValues = {
        SupplierName: '',
        SupplierContact: '',
        SupplierAddress: '',
    };
    const [formSupplier, setFormSupplier] = useState(initialValues);
    const [showWarning, setShowWarning] = useState(false);

    const handleChange = (e) => {
        setFormSupplier({ ...formSupplier, [e.target.name]: e.target.value });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        // Check if any field is empty
        if (!formSupplier.SupplierName || !formSupplier.SupplierContact || !formSupplier.SupplierAddress) {
            setShowWarning(true);
            return;
        }
        try {
            const response = await axios.post(SUPPLIER_DATA, formSupplier, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setFormSupplier(initialValues);
            console.table(response.data);
        } catch (error) {
            console.error('Error:', error);
            alert('Error saving supplier data. Please try again.');
        }
    };

    const handleCancel = () => {
        setFormSupplier(initialValues);
    };

    const closeWarningModal = () => {
        setShowWarning(false);
    };

    return (
        <div className="w-fit">
            <div className="bg-white p-6 shadow-md rounded-md">
                <h2 className="text-xl font-semibold mb-4">Supplier Form</h2>
                <div className="mb-4">
                    <label htmlFor="SupplierName" className="block mb-1">Supplier Name:</label>
                    <input
                        type="text"
                        id="SupplierName"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        name='SupplierName'
                        value={formSupplier.SupplierName}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="SupplierContact" className="block mb-1">Contact:</label>
                    <input
                        type="text"
                        id="SupplierContact"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        name='SupplierContact'
                        value={formSupplier.SupplierContact}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="SupplierAddress" className="block mb-1">Address:</label>
                    <textarea
                        id="SupplierAddress"
                        className="w-full h-auto px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        name='SupplierAddress'
                        value={formSupplier.SupplierAddress}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className="flex justify-center gap-4 px-20">
                    <button
                        className="px-4 py-2 bg-gray-300 font-semibold rounded-md hover:bg-gray-400 focus:outline-none"
                        onClick={handleCancel}
                    >
                        Clear
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-500 font-semibold bg-sky-300 rounded-md hover:bg-sky-600 focus:outline-none"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                </div>
            </div>

            {/* Warning Modal */}
            {showWarning && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-black bg-opacity-50 absolute inset-0"></div>
                    <div className="bg-white p-6 rounded-md shadow-md relative z-10">
                        <h2 className="text-xl font-semibold mb-4">Warning</h2>
                        <p className="mb-4">All fields are required. Please fill out all fields.</p>
                        <button
                            className=" py-2 bg-blue-500 text-blue pl-[250px] font-semibold rounded-md hover:bg-blue-600 focus:outline-none"
                            onClick={closeWarningModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SupplierForm;
