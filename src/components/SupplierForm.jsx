import React, { useState } from 'react'

// eslint-disable-next-line react/prop-types
const SupplierForm = ({ addSupplier }) => {

    const [formSupplier, setFormSupplier] = useState({
        supplierName: '',
        contact: '',
        address: '',
    });

    const handleInputChange = (e) => {
        setFormSupplier({ ...formSupplier, [e.target.name]: e.target.value });
    };

    const handleSave = (e) => {
        e.preventDefault();
        addSupplier(formSupplier);
        setFormSupplier({
            supplierName: '',
            contact: '',
            address: '',
        });
    };

    const handleCancel = () => {

    }

    return (
        <div className="flex justify-center">
            <div className="bg-white p-6 shadow-md rounded-md  ">
                <h2 className="text-xl font-semibold mb-4">Supplier Form</h2>
                <div className="mb-4">
                    <label htmlFor="supplierName" className="block mb-1">Supplier Name:</label>
                    <input
                        type="text"
                        id="supplierName"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        name='supplierName'
                        value={formSupplier.supplierName}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="contact" className="block mb-1">Contact:</label>
                    <input
                        type="text"
                        id="contact"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        name='contact'
                        value={formSupplier.contact}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="address" className="block mb-1">Address:</label>
                    <textarea
                        id="address"
                        className="w-full h-auto px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        name='address'
                        value={formSupplier.address}
                        onChange={handleInputChange}
                    ></textarea>
                </div>
                <div className="flex justify-center px-20">
                    <button
                        className="px-4 py-2 mr-2 bg-blue-500 text-black bg-sky-300 rounded-md hover:bg-sky-600 focus:outline-none"
                        onClick={handleSave}
                    > Save
                    </button>
                    <button
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SupplierForm