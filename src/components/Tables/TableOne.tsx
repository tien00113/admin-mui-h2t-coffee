import { BRAND } from '../../types/brand';
import BrandOne from '../../images/brand/brand-01.svg';
import BrandTwo from '../../images/brand/brand-02.svg';
import BrandThree from '../../images/brand/brand-03.svg';
import BrandFour from '../../images/brand/brand-04.svg';
import BrandFive from '../../images/brand/brand-05.svg';
import { SlSettings } from "react-icons/sl";
import { SlClose } from "react-icons/sl";
import { Chip } from '@mui/material';
import { AppDispatch, RootState } from '../../Redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getCusTomerAction } from '../../Redux/Admin/admin.action';

const brandData: BRAND[] = [
  {
    logo: BrandOne,
    name: 'Google',
    visitors: 3.5,
    revenues: '5,768',
    sales: 590,
    conversion: 4.8,
  },
  {
    logo: BrandTwo,
    name: 'Twitter',
    visitors: 2.2,
    revenues: '4,635',
    sales: 467,
    conversion: 4.3,
  },
  {
    logo: BrandThree,
    name: 'Github',
    visitors: 2.1,
    revenues: '4,290',
    sales: 420,
    conversion: 3.7,
  },
  {
    logo: BrandFour,
    name: 'Vimeo',
    visitors: 1.5,
    revenues: '3,580',
    sales: 389,
    conversion: 2.5,
  },
  {
    logo: BrandFive,
    name: 'Facebook',
    visitors: 3.5,
    revenues: '6,768',
    sales: 390,
    conversion: 4.2,
  },
];


const TableOne = () => {
  const dispatch: AppDispatch = useDispatch();
  const customers = useSelector((state: RootState) => state.admin.customer);

  useEffect(()=>{
    if (customers.length < 1) {
      dispatch(getCusTomerAction());
    }
  },[dispatch]);
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark xl:pb-1">
      <div className="flex flex-col">
        <div className="grid grid-cols-6 rounded-sm bg-stroke dark:bg-meta-4 sm:grid-cols-6">
          <div className="col-span-1 p-2.5 xl:p-5">
            <h5 className="text-sm font-medium xsm:text-base">

            </h5>
          </div>
          <div className=" col-span-1 p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium xsm:text-base">
              Email
            </h5>
          </div>
          <div className="col-span-1 p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium xsm:text-base">
              Doanh Số
            </h5>
          </div>
          <div className="col-span-1 p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium xsm:text-base">
              Lượng Đơn
            </h5>
          </div>
          <div className="col-span-1 hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium xsm:text-base">
              Trạng Thái
            </h5>
          </div>
          <div className="col-span-1 hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium xsm:text-base">
              Hành Động
            </h5>
          </div>
        </div>

        {customers.map((customer: any, key: number) => (
          <div
            className={`grid grid-cols-6 px-2 sm:grid-cols-6 ${key === brandData.length - 1
                ? ''
                : 'border-b border-stroke dark:border-strokedark'
              } ${(key + 1) % 2 === 0 ? 'bg-[#dadee277] dark:bg-[#292c31]' : ''}`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className="flex-shrink-0 w-15 h-15 opacity-35">
                <img src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png" alt="Brand" />
              </div>
              <p className="hidden text-black dark:text-white sm:block">
                {customer?.username}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{customer?.email}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-primary">968,000</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">18</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <Chip label="Active" color="success" variant="outlined" />
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-title-sm">
              <p title='Sửa' className="text-meta-5 px-2 cursor-pointer"><SlSettings /></p>
              <p title='Xóa' className="text-meta-1"><SlClose /></p>
            </div>
          </div>
          
        ))}
      </div>
    </div>
    
  );
};

export default TableOne;
