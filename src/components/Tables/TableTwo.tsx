import EditIcon from '@mui/icons-material/Edit';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../Redux/store';
import { getAllProductAction } from '../../Redux/Product/product.action';
import { useEffect, useState } from 'react';
import { Box, IconButton, InputBase, Menu, MenuItem, Pagination } from '@mui/material';
import displayMoney from '../../utils/displayMoney';
import SortIcon from '@mui/icons-material/Sort';
import { getAllCategoryAction } from '../../Redux/Category/Category.action';

const TableTwo = () => {
  const productData = useSelector((state: RootState) => state.product.product) ?? [];
  const category = useSelector((state: RootState) => state.category.category) ?? [];
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [searchValue, setSearchValue] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const [page, setPage] = useState(1);

  const itemsPerPage = 8;

  useEffect(() => {
    dispatch(getAllProductAction());
  }, [dispatch])

  const handleChangePage = (
    event: any,
    newPage: number
  ) => {
    setPage(newPage);
  }

  useEffect(() => {
    dispatch(getAllCategoryAction());
  }, [dispatch]);

  const handleClose = (ctg: string) => {
    setFilterCategory(ctg);
    setAnchorEl(null);
  };

  const handleClickMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const filteredProduct = productData ? productData.filter((item: any) => {
    return (
      item?.category?.name.includes(filterCategory) && item?.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }) : [];

  const currentProductData = filteredProduct.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="py-4 px-4 md:px-4 xl:px-4">
          <div className="flex flex-wrap gap-5 xl:gap-20 justify-between">
            <div>
              <Box
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 250 }}
              >
                <IconButton
                  sx={{ p: '10px' }}
                  aria-label="menu"
                  onClick={handleClickMenu}
                >
                  <SortIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={() => handleClose('')}
                >

                  {category.map((ctg: any) =>
                    <MenuItem onClick={() => handleClose(ctg?.name)}>{ctg?.name}</MenuItem>
                  )}
                </Menu>
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Tìm Sản Phẩm..."
                  inputProps={{ 'aria-label': 'search product' }}
                  value={searchValue}
                  onChange={handleSearchChange}
                />
              </Box>
            </div>
            <Link
              to="/san-pham/them"
              className="inline-flex items-center justify-center rounded-md border border-primary py-2 px-4 text-center font-medium text-primary hover:bg-opacity-90 lg:px-2 xl:px-2"
            >
              Thêm sản phẩm
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-11 border-t border-stroke py-4.5 px-4 dark:border-strokedark md:px-6 2xl:px-8">
          <div className="col-span-2 flex items-center justify-center">
            <div className="font-medium">Tên</div>
          </div>
          <div className="col-span-1 hidden items-center justify-center sm:flex">
            <p className="font-medium">Phân loại</p>
          </div>
          <div className="col-span-1 flex items-center justify-center">
            <p className="font-medium">Giá</p>
          </div>
          {/* <div className="col-span-1 flex items-center justify-center">
          <p className="font-medium">Size</p>
        </div>
        <div className="col-span-1 flex items-center justify-center">
          <p className="font-medium">Topping</p>
        </div> */}
          <div className='col-span-3 flex justify-center items-center font-medium'>
            Size
          </div>
          <div className='col-span-3 flex justify-center items-center font-medium'>
            Topping
          </div>
          <div className="col-span-1 flex items-center justify-center">
            <p className="font-medium">Hành động</p>
          </div>
        </div>

        {productData && currentProductData.map((item: any, index: number) => (
          <div
            className="grid grid-cols-11 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-11 md:px-6 2xl:px-8"
            key={index}
          >
            <div className="col-span-2 flex items-center ">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="h-10 w-12 rounded-md py-2 -translate-y-6">

                  <img className='object-cover' width={"70rem"} src={item?.image[0]?.imageUrl} alt="product" />

                </div>
                <p className="text-sm text-black dark:text-white ">
                  {item?.name}
                </p>
              </div>
            </div>
            <div className="col-span-1 hidden items-center justify-center sm:flex">
              <p className="text-sm text-black dark:text-white">
                {item?.category?.name}
              </p>
            </div>
            <div className="col-span-1 flex flex-col items-center">
              <div className="text-black font-medium dark:text-white">
                {displayMoney(item?.price)}
              </div>
              <div className="text-sm text-black dark:text-white font-light line-through">
                {displayMoney(item?.salePrice)}
              </div>
            </div>
            <div className='col-span-3 -translate-y-4'>
              <div className='ml-2 translate-y-2 flex p-1 justify-center'>
                {item?.sizeOptions.map((size: any) => (
                  <p className='px-1'>
                    <span className='text-black'>
                      {size?.name}
                    </span>
                    <span className='text-sm text-primary'>
                      ({displayMoney(size?.price)})
                    </span>
                  </p>))}
              </div>
            </div>
            <div className='col-span-3 -translate-y-4'>
              <div className='ml-2 translate-y-2 flex p-1 justify-center'>
                {item?.toppingOptions.map((topping: any) => (
                  <p className='px-1'>
                    <span className='text-black'>
                      {topping?.name}
                    </span>
                    <span className='text-sm text-danger'>
                      ({displayMoney(topping?.price)})
                    </span>
                  </p>))}
              </div>
            </div>
            <div className="col-span-1 flex items-center justify-center">
              <p title='Chỉnh Sửa' className='cursor-pointer text-primary' onClick={() => navigate('/san-pham/chinh-sua', { state: { item: item } })}><EditIcon /></p>
              <p title='Xóa' className='px-2 cursor-pointer text-red-500'>
                <svg
                  className="fill-current"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  color='#FF0000'
                >
                  <path
                    d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                    fill=""
                  />
                  <path
                    d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                    fill=""
                  />
                  <path
                    d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                    fill=""
                  />
                  <path
                    d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                    fill=""
                  />
                </svg>
              </p>
              <p title='Chi Tiết' className='cursor-pointer text-lime-600'><ArrowRightAltIcon /></p>
            </div>
          </div>
        ))}

        <Box display='flex' justifyContent="center" padding={"1rem"}>
          <Pagination count={Math.ceil(productData.length / itemsPerPage)} page={page}
            onChange={handleChangePage} color='primary' />
        </Box>
      </div>
    </div>
  );
};

export default TableTwo;
