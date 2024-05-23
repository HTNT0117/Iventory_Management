
import OrderTable from '../components/OrderTable.jsx';
const Order = () => {

    return (
        <div className=" flex flex-col min-h-screen gap-5 overflow-x-hidden mx-3">
            <div className="pt-5">
                <OrderTable/>
            </div>
        </div>
    );
};

export default Order;
