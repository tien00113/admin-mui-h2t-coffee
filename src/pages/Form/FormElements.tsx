import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { ChangeEvent, useEffect, useState } from 'react';
import Category from '../../components/Forms/SelectGroup/Category';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { AppDispatch, RootState } from '../../Redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { createProductAction } from '../../Redux/Product/product.action';
import SizeOptions from '../Product/SizeOptions';
import ToppingOptions from '../Product/ToppingOptions';
import { uploadToCloudinary } from '../../utils/uploadToCloudinary';
import { Backdrop, CircularProgress } from '@mui/material';
import { createCategory, getAllCategoryAction } from '../../Redux/Category/Category.action';
interface Size {
  name: string;
  price: number;
}
interface ToppingOption {
  nameTopping: string;
  priceTopping: number;
}
interface ProductImage {
  imageUrl: string;
}
interface ProductData {
  product: {
    name: string;
    price: number;
    salePrice: number;
    description: string;
    category: {
      id: any;
    } | null;
  };
  sizeOptions: Size[];
  toppingOptions: ToppingOption[];
  productImages: ProductImage[];
}

const initialProductData: ProductData = {
  product: {
    name: '',
    price: 0,
    salePrice: 0,
    description: '',
    category: null,
  },
  sizeOptions: [],
  toppingOptions: [],
  productImages: [],
};

const FormElements = () => {
  // const category = useSelector((state: RootState) => state.category.category);
  const dispatch: AppDispatch = useDispatch();
  const [selectedFiles, setSelectedFiles] = useState<string[]>(Array(4).fill(''));
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files!);
    handleOpen();
    const newFiles = await Promise.all(files.map(async file => {
      const fileUrl = await uploadToCloudinary(file, 'image');
      return fileUrl;
    }));
    handleClose();
    const validFiles = newFiles.filter((file): file is string => Boolean(file));
    setSelectedFiles(prevState => {
      let updatedFiles = [...validFiles, ...prevState];
      if (updatedFiles.length > 4) {
        updatedFiles = updatedFiles.slice(0, 4);
      }
      return updatedFiles;
    });
  };

  const handleAddProduct = async (values: ProductData, { setSubmitting }: FormikHelpers<ProductData>) => {
    const data = {
      ...values,
      productImages: selectedFiles.filter(imageUrl => imageUrl !== '').map(imageUrl => ({ imageUrl })),
    }
    setSubmitting(false);

    await dispatch(createProductAction(data));
  };

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const [showAddButton, setShowAddButton] = useState<boolean>(false);
  const [showInput, setShowInput] = useState<boolean>(false);
  const [newCategory, setNewCategory] = useState<string>('');

  const handleAddCategory = async() => {
    const obj = { name: newCategory};
    setShowInput(false);
    await dispatch(createCategory(obj));
    console.log("da nhan them phan loai ",obj);
  }

  // useEffect(()=>{
  //   dispatch(getAllCategoryAction());
  // },[category]);
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Thêm sản phẩm" />
      <div className="mx-auto max-w-270">
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark bg-slate-500">
                <h3 className="font-medium text-white dark:text-white text-center">
                  THÔNG TIN SẢN PHẨM
                </h3>
              </div>
              <div className="p-6">
                <Formik initialValues={initialProductData} onSubmit={handleAddProduct}>
                  {({ setFieldValue }) => (<Form>
                    <section>
                      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="flex flex-col gap-5.5 p-3.5">
                          <div className="">
                            <label
                              className="mb-3 block font-medium text-black dark:text-white"
                            >
                              Tên sản phẩm
                            </label>
                            <Field
                              className="w-full rounded border border-stroke py-2 px-3.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                              style={{ backgroundColor: 'transparent' }}
                              type="text"
                              name="product.name"
                              id="product.name"
                              placeholder="Nhập tên ..."
                            />
                          </div>
                          <div className="flex flex-col gap-5.5 sm:flex-row">
                            <div className="w-full">
                              <label
                                className="mb-3 block font-medium text-black dark:text-white"
                              >
                                Giá gốc
                              </label>
                              <div className="relative">
                                <Field
                                  className="w-full rounded border border-stroke py-2 pl-3.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                  type="number"
                                  name="product.price"
                                  id="product.price"
                                />
                              </div>
                            </div>

                            <div className="w-full">
                              <label
                                className="mb-3 block font-medium text-black dark:text-white"
                              >
                                Giá sale
                              </label>
                              <Field
                                className="w-full rounded border border-stroke py-2 px-3.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                type="number"
                                name="product.salePrice"
                                id="product.salePrice"
                              />
                            </div>
                          </div>
                          <Category onCategoryChange={(item) => {
                            setFieldValue("product.category", item);
                            setShowAddButton(true);
                          }} />
                          {!showAddButton &&
                            <div className='flex'>
                              <p onClick={() => setShowInput(!showInput)} className='p-2 border border-primary text-primary rounded-md cursor-pointer'>Thêm phân loại</p>
                              {showInput &&
                                <div className='flex w-[40%] ml-5'>
                                  <input className='w-full p-2 border rounded border-stroke focus:border-primary focus-visible:outline-none' type="text"value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder='Nhập tên' />
                                  <button className='flex bg-primary text-white rounded-md w-25 ml-3 justify-center items-center' onClick={handleAddCategory}>
                                    <p className='p-1'>Xác nhận</p>
                                  </button>
                                </div>
                              }
                            </div>
                          }
                          <div className="">
                            <label
                              className="mb-3 block font-medium text-black dark:text-white"
                            >
                              Mô tả
                            </label>
                            <div className="relative">
                              <Field as='textarea'
                                style={{ backgroundColor: 'transparent' }}
                                className="w-full rounded border border-stroke bg-gray py-3 pl-3.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                name="product.description"
                                id="product.description"
                                rows={6}
                                placeholder="Mô tả sản phẩm ..."
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2">
                            <div>
                              <label className="mb-3 block font-medium text-black dark:text-white">
                                Size
                              </label>
                              <div className='border border-stroke p-2'>
                                <SizeOptions onSizeChange={(newSize) => setFieldValue('sizeOptions', newSize)} />
                              </div>
                            </div>
                            <div>
                              <label className="mb-3 block font-medium text-black dark:text-white">
                                Topping
                              </label>
                              <div className='border border-stroke p-2'>
                                <ToppingOptions onToppingChange={(newTopping) => setFieldValue('toppingOptions', newTopping)} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>

                    <div className="my-3 flex items-center gap-3">
                      <div>
                        <span className="mb-1.5 text-black dark:text-white font-medium">
                          Chọn ảnh sản phẩm
                        </span>
                      </div>
                    </div>
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                      <div className="p-2">
                        <div className="grid grid-cols-4 gap-1">
                          {selectedFiles.map((file, i) => (
                            <div
                              key={i}
                              id={`FileUpload${i}`}
                              className="relative cursor-pointer appearance-none rounded border-dashed border-blue-500 bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
                              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}

                            >
                              <input
                                id='image-input'
                                type="file"
                                name='image'
                                accept="image/*"
                                className="absolute z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                                onChange={handleFileChange}
                                multiple
                              />
                              {file ? (
                                <img src={file} alt={`preview ${i}`} className="h-full w-full object-cover" style={{ maxWidth: '260px', maxHeight: '260px' }} />
                              ) : (
                                <label htmlFor="image-input">
                                  <div className="flex flex-col items-center justify-center space-y-3">
                                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                                      <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          clipRule="evenodd"
                                          d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                                          fill="#3C50E0"
                                        />
                                        <path
                                          fillRule="evenodd"
                                          clipRule="evenodd"
                                          d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                                          fill="#3C50E0"
                                        />
                                        <path
                                          fillRule="evenodd"
                                          clipRule="evenodd"
                                          d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                                          fill="#3C50E0"
                                        />
                                      </svg>
                                    </span>
                                  </div>
                                </label>
                              )}
                            </div>
                          ))}
                          <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={open}
                            onClick={handleClose}
                          >
                            <CircularProgress color="inherit" />
                          </Backdrop>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-start gap-3 pt-4">
                      {/* <button
                        className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-2 dark:border-strokedark dark:text-white"
                        type="submit"
                      >
                        Xóa
                      </button> */}
                      <button
                        className="flex justify-center rounded bg-primary py-2 px-10 font-medium text-gray hover:bg-opacity-90"
                        type="submit"
                      >
                        Lưu
                      </button>
                    </div>
                  </Form>)}
                </Formik>
              </div>
            </div>
          </div>
          <div className="col-span-5 xl:col-span-2">
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default FormElements;
