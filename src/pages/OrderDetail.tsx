import { Button } from '@mui/material';
import SplitButton from '../components/Dropdowns/SplitButton'
import DefaultLayout from '../layout/DefaultLayout'
import PrintIcon from '@mui/icons-material/Print';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../Redux/store';
import { updateOrderStatusAction } from '../Redux/Order/order.action';
import { useState } from 'react';

const OrderDetail = () => {
    const location = useLocation();

    const [order, setOrder] = useState(location?.state?.item)

    let initialStatus = '';
    if (order?.status === 'PLACED') {
        initialStatus = 'CONFIRMED';
    } else if (order?.status === 'CONFIRMED') {
        initialStatus = 'SHIPPED';
    } else if (order?.status === 'SHIPPED') {
        initialStatus = 'CANCELLED';
    }
    const [orderStatus, setOrderStatus] = useState(initialStatus);

    const dispatch: AppDispatch = useDispatch();

    const date = new Date(order?.createAt);
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;

    const handleChangeOrderStatus = (stt: string) => {
        setOrderStatus(stt);
    }

    const handleUpdateStatusOrder = () => {

        dispatch(updateOrderStatusAction({ status: orderStatus, orderId: order?.orderId }));

        const updatedOrder = {
            ...order,
            status: orderStatus
        };

        setOrder(updatedOrder);
    }

    console.log("thoong tin don hàng: ", order);

    return (
        <DefaultLayout>
            <div className='grid grid-cols-10 p-3'>
                <div className='col-span-6 '>
                    <div className='grid grid-cols-2 text-black pb-3 items-center'>
                        <div className='flex'>
                            <p>
                                Mã Đơn Hàng:
                            </p>
                            <p className='pl-2 font-medium text-red-500'>
                                {order?.orderId}
                            </p>
                        </div>
                        <div className='flex px-3'>
                            Trạng Thái:
                            <p className={`px-2 ${order?.status === 'PLACED'
                                ? 'text-primary'
                                : order?.status === 'CONFIRMED'
                                    ? 'text-warning'
                                    : order?.status === 'SHIPPED'
                                        ? 'text-cyan-500'
                                        : order?.status === 'DELIVERED'
                                            ? 'text-success'
                                            : 'text-danger'
                                }`}>
                                {
                                    order?.status === 'PLACED' ? "Chờ Xác Nhận" : order?.status === 'CONFIRMED' ? "Chờ Giao Hàng" : order?.status === 'SHIPPED' ? "Đang Giao" : order?.status === 'DELIVERED' ? "Hoàn Thành" : "Đã Hủy"
                                }
                            </p>
                        </div>
                    </div>
                    <div className='shadow-sky-200 shadow-1 rounded-lg px-5'>
                        <table className='w-full table-auto'>
                            <thead>
                                <tr className='text-black'>
                                    <th className='pb-2 pt-4'>Mặt Hàng</th>
                                    <th className='pb-2 pt-4'>Số lượng</th>
                                    <th className='pb-2 pt-4'>Đơn Giá</th>
                                    <th className='pb-2 pt-4'>Tổng Giá</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order?.orderItems.map((item: any, index: any) => (<tr key={index} className='border-t border-[#85a1da]'>
                                    <td className='py-2'>
                                        <div className='flex'>
                                            <div className='pr-2'>
                                                <img src={item?.product?.image[0]?.imageUrl} width={50} height={60} alt="" />
                                            </div>
                                            <div className='px-1'>
                                                <div className='font-medium text-black'>
                                                    <p> {item?.product?.name} </p>
                                                </div>
                                                <p className='text-sm'>
                                                    Size: {item?.sizeOption?.name}
                                                </p>
                                                <p className='text-sm'>
                                                    Topping: {item?.toppingOption?.name}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='flex justify-center orders-center text-black'>
                                            x {item?.quantity}
                                        </div>
                                    </td>
                                    <td>
                                        <div className='flex justify-center items-center text-black'>
                                            {item?.priceSale / item?.quantity}
                                        </div>
                                    </td>
                                    <td>
                                        <div className='flex justify-center items-center text-primary font-medium'>
                                            {item?.priceSale}
                                        </div>
                                    </td>
                                </tr>))}
                            </tbody>
                        </table>
                    </div>

                    <div className='mt-3 pl-5 flex'>
                        <div className='font-medium text-black'>Ghi Chú: </div>
                        <div className='pl-2 text-black'>
                            {order?.note}
                        </div>
                    </div>

                    <div className='mx-15 border-t mt-4'></div>

                    <div className='pt-3 grid grid-cols-3'>
                        <div className='col-span-1 flex justify-center items-end translate-x-3'>
                            <SplitButton status={order?.status} onStatusChange={handleChangeOrderStatus} />
                        </div>
                        <div className='col-span-1 flex justify-center translate-x-3'>
                            <Button variant='contained' color='primary'>
                                <p className='-translate-x-1'><PrintIcon /></p>
                                <span className='px-1'>Xuất Bill</span>
                            </Button>
                        </div>
                        <div className='col-span-1 flex justify-center items-center'>
                            <Button variant='contained' color='success' onClick={handleUpdateStatusOrder}>
                                Cập Nhật
                            </Button>
                        </div>
                    </div>
                </div>
                <div className='col-span-4 mx-5'>
                    <div className='text-center pt-5 text-black font-medium'>
                        THÔNG TIN THANH TOÁN
                    </div>
                    <div className='flex pl-5'>
                        <div className='w-full mt-4 '>
                            <div className='w-full border-b flex p-2'>
                                <div className='flex items-start w-full text-black'>
                                    Thời Gian Đặt Hàng:
                                </div>
                                <div className='flex items-end justify-end w-full'>
                                    {formattedDate}
                                </div>
                            </div>
                            <div className='w-full border-b flex p-2'>
                                <div className='flex items-start text-black w-full'>
                                    Phương Thức Thanh Toán:
                                </div>
                                <div className='flex items-end justify-end w-full'>
                                    COD
                                </div>
                            </div>
                            <div className='w-full border-b flex p-2'>
                                <div className='flex items-start text-black w-full'>
                                    Tổng Tiền Hàng:
                                </div>
                                <div className='flex items-end justify-end w-full text-black font-medium'>
                                    {order?.totalSalePrice}
                                </div>
                            </div>
                            <div className='w-full border-b flex p-2'>
                                <div className='flex items-start text-black w-full'>
                                    Phí Vận Chuyển:
                                </div>
                                <div className='flex items-end justify-end w-full text-success'>
                                    0
                                </div>
                            </div>
                            <div className='w-full border-b flex p-2'>
                                <div className='flex items-start text-black w-full'>
                                    Tổng Thanh Toán:
                                </div>
                                <div className='flex items-end justify-end w-full text-red-500 font-medium'>
                                    {order?.totalSalePrice}
                                </div>
                            </div>

                            <div className='items-center justify-center mt-3'>
                                <div className='text-black'>
                                    Địa Chỉ Giao Hàng:
                                </div>
                                <div className='pl-5 pt-1'>
                                    <div className='flex'>
                                        <p className='text-black'>Họ và Tên: </p>
                                        <span className='pl-2'>{order?.shippingAddress?.recipientName}</span>
                                    </div>
                                    <div className='flex'>
                                        <p className='text-black'>Số Điện Thoại: </p>
                                        <span className='pl-2'>{order?.shippingAddress?.phoneNumber}</span>
                                    </div>
                                    <div className='flex'>
                                        <p className='text-black whitespace-nowrap'> Địa Chỉ: </p>
                                        <span className='pl-2'>{order?.shippingAddress?.street + ", " + order?.shippingAddress?.ward + ", " + order?.shippingAddress?.district + ", " + order?.shippingAddress?.city}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    )
}

export default OrderDetail