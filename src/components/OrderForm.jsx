import { useState, useEffect } from "react";
import axios from "axios";

import { ORDER_LIST, SUPPLIER_DATA, PRODUCT_DATA } from "../../api/endPointAPI.js";

const OrderForm = ({ onAddOrder, onCloseModal }) => {
  const [supplier, setSupplier] = useState([]);
  const [product, setProduct] = useState([]);
  const [SupplierName, setSupplierName] = useState("");
  const [ProductName, setProductName] = useState("");
  const [Quantity, setQuantity] = useState("");
  const [orderList, setOrderList] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [Warehouse, setWarehouse] = useState("");
  const [Order_Detail_ID, setOrder_Detail_ID] = useState("");

  const [productPrice, setProductPrice] = useState(0); 

  useEffect(() => {
    const fetchSupplierName = async () => {
      try {
        const res = await axios.get(SUPPLIER_DATA);
        const supplierGetName = Array.from(new Set(res.data.map((item) => item.suppliername)));
        setSupplier(supplierGetName);
        console.table(res.data);
      } catch (error) {
        console.error("Error fetching supplier names:", error);
      }
    };
    fetchSupplierName();

    const fetchWarehouses = async () => {
      try {
        const res = await axios.get("https://luoi-lot-ca-pf3yfmx32q-de.a.run.app/typye/order/warehouse");
        setWarehouses(res.data);
        console.table(res.data);
      } catch (error) {
        console.error("Error fetching warehouses:", error);
      }
    };
    fetchWarehouses();
  }, []);

  const fetchProductName = async (supplierName) => {
    try {
      const res = await axios.get(`https://luoi-lot-ca-pf3yfmx32q-de.a.run.app/typye/order/products/${supplierName}`);
      const productGetName = Array.from(new Set(res.data.map((item) => item.pname)));
      setProduct(productGetName);
      console.table(productGetName);
    } catch (error) {
      console.error("Error fetching product names:", error);
    }
  };

  const fetchProductPrice = async (productName) => {
    try {
      const res = await axios.get(`${PRODUCT_DATA}/${productName}`);
      const product = res.data; // Assuming the response contains a single product
      if (product.costprice) {
        const price = parseFloat(product.costprice);
        setProductPrice(price);
        console.log("Product price fetched:", price);
      }
    } catch (error) {
      console.error("Error fetching product price:", error);
    }
  };

  const handleAddToList = async () => {
    await fetchProductPrice(ProductName);
  };

  useEffect(() => {
    if (ProductName && Quantity !== "" && productPrice !== 0) {
      const orderItem = {
        ProductName: ProductName,
        Quantity: parseInt(Quantity),
        Price: productPrice,
        Amount: parseInt(Quantity) * productPrice,
        SupplierName: SupplierName,
        Warehouse: Warehouse,
      };
      setOrderList([...orderList, orderItem]);
      setProductName("");
      setQuantity("");
    }
  }, [productPrice]); // Run this effect whenever productPrice changes

  const handleSupplierChange = (selectedSupplier) => {
    setSupplierName(selectedSupplier);
    fetchProductName(selectedSupplier);
    setProductName("");
    setQuantity("");
    setOrderList([]);
  };

  const handleWarehouseChange = (selectedWarehouse) => {
    setWarehouse(selectedWarehouse);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const ordersWithId = orderList.map(order => ({
      ...order,
      OrderID: Order_Detail_ID,  // Add OrderID to each order
    }));
    try {
      const response = await axios.post(ORDER_LIST, { orders: ordersWithId });
      setOrderList([]);
      console.table(response.data);
    } catch (error) {
      console.error("Error:", error);
      alert("Error saving order data. Please try again.");
    }
    onAddOrder(orderList);
    onCloseModal();
  };

  const handleDelete = (index) => {
    const updatedOrderList = [...orderList];
    updatedOrderList.splice(index, 1);
    setOrderList(updatedOrderList);
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white shadow-md rounded-md overflow-auto">
      <div className={"close float-end text-2xl hover:text-red cursor-pointer"} onClick={onCloseModal}>
        &times;
      </div>

      <h2 className="text-xl font-semibold mb-4">New Order</h2>

      <div className="mb-4">
        <label htmlFor="Order_Detail_ID" className="block mb-1">
          Order ID:
        </label>
        <input
          type="text"
          id="Order_Detail_ID"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          value={Order_Detail_ID}
          onChange={(e) => setOrder_Detail_ID(e.target.value)}
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="Warehouse" className="block mb-1">
          Warehouse:
        </label>
        <select
          id="Warehouse"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          value={Warehouse}
          onChange={(e) => handleWarehouseChange(e.target.value)}
        >
          <option value="">Select Warehouse</option>
          {warehouses.map((warehouse, index) => (
            <option key={index} value={warehouse.wname}>
              {warehouse.wname}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="SupplierName" className="block mb-1">
          Supplier:
        </label>
        <select
          id="SupplierName"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          value={SupplierName}
          onChange={(e) => handleSupplierChange(e.target.value)}
        >
          <option value="">Select Supplier</option>
          {supplier.map((supplier, index) => (
            <option key={index} value={supplier}>
              {supplier}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="product" className="block mb-1">
          Product:
        </label>
        <select
          id="product"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          value={ProductName}
          onChange={(e) => setProductName(e.target.value)}
        >
          <option value="">Select Product</option>
          {product.map((product, index) => (
            <option key={index} value={product}>
              {product}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="Quantity" className="block mb-1">
          Quantity:
        </label>
        <input
          type="number"
          id="Quantity"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          value={Quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>

      <div className="flex justify-end gap-5">
        <button
          className="px-4 py-2 bg-sky-200 font-semibold rounded-md hover:bg-sky-600 focus:outline-none"
          onClick={handleAddToList}
        >
          Add to List
        </button>
        <button
          className="px-4 py-2 bg-sky-200 font-semibold rounded-md hover:bg-sky-600 focus:outline-none"
          onClick={handleSave}
        >
          Save order
        </button>
      </div>

      <table className="min-w-full  ">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left">Product</th>
            <th className="px-6 py-3 text-left">Quantity</th>
            <th className="px-6 py-3 text-left">Price</th>
            <th className="px-6 py-3 text-left">Amount</th>
            <th className="px-6 py-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {orderList.map((orderItem, index) => (
            <tr key={index}>
              <td className="border px-6 py-4">{orderItem.ProductName}</td>
              <td className="border px-6 py-4">{orderItem.Quantity}</td>
              <td className="border px-6 py-4">{orderItem.Price}</td>
              <td className="border px-6 py-4">{orderItem.Amount}</td>
              <td className="border px-6 py-4">
                <button
                  className=" text-red font-bold px-4 py-2 rounded-md hover:bg-red-600"
                  onClick={() => handleDelete(index)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderForm;
