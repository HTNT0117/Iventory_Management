import React, { useEffect, useState } from "react";
import axios from "axios";


import {
  DASHBOARD_ORDER_DATA,
  DASHBOARD_CATEGORIES_DATA,
  DASHBOARD_LIST_LOW_QUANTITY,
  DASHBOARD_PRODUCTS_DATA,
} from "../../api/endPointAPI";
import GaugeChart from "../components/chart/GaugeChart.jsx";
import BarChart from "../components/chart/BarChart.jsx";
  
  export default function Dashboard() {
    const [productData, setProductData] = useState(0);
    const [categoriesData, setCategoriesData] = useState(0);
    const [orderData, setOrderData] = useState(0);

  
    useEffect(() => {
      fetchProductData();
      fetchCategoryData();
      fetchOrderData();
      const fetchListLowQuantity = async () => {
        try {
          const res = await axios.get(DASHBOARD_LIST_LOW_QUANTITY,{
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          setListLowQuantity(res.data);
          console.table(res.data);
        } catch (error) {
          console.log("Error fetching listQuantity:", error);
        }
      };
      fetchListLowQuantity();
    }, []);
  
    const fetchProductData = () => {
      fetch(DASHBOARD_PRODUCTS_DATA,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setProductData(data.totalproductofspecificwarehouse);
          console.table(data.totalproductofspecificwarehouse);
        })
        .catch((error) => {
          console.error("Error fetching total products:", error);
        });
    };
  
    const fetchCategoryData = () => {
      fetch(DASHBOARD_CATEGORIES_DATA,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setCategoriesData(data.total_product_category_associations);
          console.table(data.total_product_category_associations);
        })
        .catch((error) => {
          console.error("Error fetching total products:", error);
        });
    };
  
    const fetchOrderData = () => {
      fetch(DASHBOARD_ORDER_DATA,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setOrderData(data.total_order);
        })
        .catch((error) => {
          console.error("Error fetching total products:", error);
        });
    };
  
  return (
      <div className=" min-h-screen mx-3 pr-2">
        <div className={"text-3xl font-bold px-1 pt-6 pb-2"}>Dashboard</div>
        <div className="grid col-span-10 gap-12 md:grid-cols-3 pb-6 ">
          <div className="flex flex-col gap-4 rounded-lg border border-gray-100 bg-white p-14 shadow-lg">
            <div className="inline-flex gap-2 self-start rounded text-black">
              <svg
                  width="70"
                  height="70"
                  viewBox="0 0 70 70"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_543_756)">
                  <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M21.7956 4.375C21.4677 4.37547 21.1441 4.44963 20.8488 4.592C20.5534 4.73436 20.2939 4.9413 20.0893 5.1975L6.74555 21.875H26.2581C26.8382 21.875 27.3946 22.1055 27.8048 22.5157C28.2151 22.9259 28.4456 23.4823 28.4456 24.0625C28.4456 25.803 29.137 27.4722 30.3677 28.7029C31.5984 29.9336 33.2676 30.625 35.0081 30.625C36.7485 30.625 38.4177 29.9336 39.6484 28.7029C40.8792 27.4722 41.5706 25.803 41.5706 24.0625C41.5706 23.4823 41.801 22.9259 42.2113 22.5157C42.6215 22.1055 43.1779 21.875 43.7581 21.875H63.2706L49.9268 5.1975C49.7222 4.9413 49.4627 4.73436 49.1673 4.592C48.872 4.44963 48.5484 4.37547 48.2206 4.375H21.7956ZM16.6768 2.46312C17.291 1.69533 18.0699 1.07535 18.9559 0.649016C19.8418 0.222679 20.8123 0.000876878 21.7956 0L48.2206 0C49.2038 0.000876878 50.1743 0.222679 51.0602 0.649016C51.9462 1.07535 52.7251 1.69533 53.3393 2.46312L69.5268 22.6975C69.7094 22.9255 69.8446 23.1877 69.9242 23.4687C70.0039 23.7497 70.0264 24.0439 69.9906 24.3337L68.2843 38.0013C68.0859 39.5889 67.3143 41.0494 66.1147 42.108C64.915 43.1667 63.3699 43.7506 61.7699 43.75H8.24617C6.64619 43.7506 5.10109 43.1667 3.90143 42.108C2.70177 41.0494 1.9302 39.5889 1.7318 38.0013L0.025548 24.3337C-0.0103106 24.0439 0.0122499 23.7497 0.0918985 23.4687C0.171547 23.1877 0.306671 22.9255 0.489298 22.6975L16.6768 2.46312ZM0.554923 48.8688C0.759914 48.6354 1.01224 48.4484 1.29513 48.3202C1.57801 48.1919 1.88496 48.1254 2.19555 48.125H26.2581C26.8382 48.125 27.3946 48.3555 27.8048 48.7657C28.2151 49.1759 28.4456 49.7323 28.4456 50.3125C28.4456 52.053 29.137 53.7222 30.3677 54.9529C31.5984 56.1836 33.2676 56.875 35.0081 56.875C36.7485 56.875 38.4177 56.1836 39.6484 54.9529C40.8792 53.7222 41.5706 52.053 41.5706 50.3125C41.5706 49.7323 41.801 49.1759 42.2113 48.7657C42.6215 48.3555 43.1779 48.125 43.7581 48.125H67.8206C68.1307 48.1251 68.4372 48.1911 68.7199 48.3187C69.0025 48.4463 69.2548 48.6325 69.46 48.865C69.6652 49.0975 69.8187 49.371 69.9101 49.6673C70.0016 49.9636 70.029 50.276 69.9906 50.5838L68.2843 64.2513C68.0859 65.8389 67.3143 67.2994 66.1147 68.358C64.915 69.4167 63.3699 70.0006 61.7699 70H8.24617C6.64619 70.0006 5.10109 69.4167 3.90143 68.358C2.70177 67.2994 1.9302 65.8389 1.7318 64.2513L0.025548 50.5838C-0.013152 50.276 0.0140339 49.9636 0.105302 49.6671C0.19657 49.3707 0.349834 49.0971 0.554923 48.8644V48.8688Z"
                      fill="black"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_543_751">
                    <rect width="70" height="70" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
              <div className="flex-col justify-center items-start inline-flex w-full px-10">
                <span className="font-bold text-4xl">{categoriesData}</span>
                <span className="text-2xl">Categories</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-lg bg-white p-14 shadow-lg">
            <div className="inline-flex gap-2 self-start text-black ">
              <svg
                  width="70"
                  height="70"
                  viewBox="0 0 70 70"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_543_756)">
                  <path
                      d="M0 56.875C0 58.6155 0.691404 60.2847 1.92211 61.5154C3.15282 62.7461 4.82202 63.4375 6.5625 63.4375H63.4375C65.178 63.4375 66.8472 62.7461 68.0779 61.5154C69.3086 60.2847 70 58.6155 70 56.875V26.25C70 24.5095 69.3086 22.8403 68.0779 21.6096C66.8472 20.3789 65.178 19.6875 63.4375 19.6875H6.5625C4.82202 19.6875 3.15282 20.3789 1.92211 21.6096C0.691404 22.8403 0 24.5095 0 26.25L0 56.875Z"
                      fill="black"
                  />
                  <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.75 13.125C8.75 13.7052 8.98047 14.2616 9.3907 14.6718C9.80094 15.082 10.3573 15.3125 10.9375 15.3125H59.0625C59.6427 15.3125 60.1991 15.082 60.6093 14.6718C61.0195 14.2616 61.25 13.7052 61.25 13.125C61.25 12.5448 61.0195 11.9884 60.6093 11.5782C60.1991 11.168 59.6427 10.9375 59.0625 10.9375H10.9375C10.3573 10.9375 9.80094 11.168 9.3907 11.5782C8.98047 11.9884 8.75 12.5448 8.75 13.125ZM17.5 4.375C17.5 4.95516 17.7305 5.51156 18.1407 5.9218C18.5509 6.33203 19.1073 6.5625 19.6875 6.5625H50.3125C50.8927 6.5625 51.4491 6.33203 51.8593 5.9218C52.2695 5.51156 52.5 4.95516 52.5 4.375C52.5 3.79484 52.2695 3.23844 51.8593 2.8282C51.4491 2.41797 50.8927 2.1875 50.3125 2.1875H19.6875C19.1073 2.1875 18.5509 2.41797 18.1407 2.8282C17.7305 3.23844 17.5 3.79484 17.5 4.375Z"
                      fill="black"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_543_756">
                    <rect width="70" height="70" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
              <div className="flex-col justify-center items-start inline-flex px-10">
                <span className="font-bold text-4xl">{productData}</span>
                <span className="text-2xl">Products</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 shadow-lg rounded-lg border  border-gray-100 bg-white p-14 ">
            <div className="inline-flex gap-2 self-start rounded text-black ">
              <svg
                  width="70"
                  height="70"
                  viewBox="0 0 70 70"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
              >
                <path
                    d="M8.75 17.5L17.5 5.83334H52.5L61.25 17.5M8.75 17.5V58.3333C8.75 59.8804 9.36458 61.3642 10.4585 62.4581C11.5525 63.5521 13.0362 64.1667 14.5833 64.1667H55.4167C56.9638 64.1667 58.4475 63.5521 59.5415 62.4581C60.6354 61.3642 61.25 59.8804 61.25 58.3333V17.5M8.75 17.5H61.25M46.6667 29.1667C46.6667 32.2609 45.4375 35.2283 43.2496 37.4163C41.0617 39.6042 38.0942 40.8333 35 40.8333C31.9058 40.8333 28.9383 39.6042 26.7504 37.4163C24.5625 35.2283 23.3333 32.2609 23.3333 29.1667"
                    stroke="black"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
              </svg>

              <div className="flex-col justify-center items-start inline-flex px-5 ">
                <span className="font-bold text-4xl">{orderData}</span>
                <span className="text-2xl">Order</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-6">
          <div className="flex flex-col rounded-lg border border-gray-100 bg-white shadow-xl  ">
            <div className="text-start p-5 font-bold text-xl">
              Sales statistics
            </div>
            <div className="px-4 pb-4">
              <BarChart section={'Sales'} className="flex items-center justify-center "></BarChart>
            </div>
          </div>
          <div className="flex flex-col rounded-lg border border-gray-100 bg-white shadow-xl">
            <div className="text-start p-5 font-bold text-xl">
              Orders statistics
            </div>
            <div className="px-4 pb-4">
              <BarChart section={'Orders'} className="flex"></BarChart>
            </div>
          </div>
        </div>


        <div className="bg-white  flx flex-col  rounded-lg border border-gray-100 shadow-xl mb-6">
            <div className="text-start p-5 text-3xl font-bold">
              Warehouse's capacity
            </div>
            <div className=" min-w-screen flex flex-col md:flex-row  ">
              <div className="flex justify-center md:basis-1/2">
                <div className="w-full flex flex-col justify-center items-center">
                  <p className={'font-semibold text-lg'}>Warehouse A</p>
                  <GaugeChart warehouse="WarehouseA" className="flex"/>
                </div>

              </div>
              <div className="flex justify-center md:basis-1/2">
                <div className="w-full flex flex-col justify-center items-center">
                  <p className={'font-semibold text-lg'}>Warehouse B</p>
                  <GaugeChart warehouse="WarehouseB" className="flex"/>
                </div>
              </div>
            </div>
          </div>
  </div>
  )
    ;
  }