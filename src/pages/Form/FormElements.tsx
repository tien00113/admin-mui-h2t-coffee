import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { ChangeEvent, useEffect, useState } from 'react';
import Category from '../../components/Forms/SelectGroup/Category';
import { Field, Form, Formik, FormikHelpers, useFormik } from 'formik';
import { AppDispatch } from '../../Redux/store';
import { useDispatch } from 'react-redux';
import { createProductAction, updateProductAction } from '../../Redux/Product/product.action';
import SizeOptions from '../Product/SizeOptions';
import ToppingOptions from '../Product/ToppingOptions';
import { uploadToCloudinary } from '../../utils/uploadToCloudinary';
import { Backdrop, CircularProgress } from '@mui/material';
import { createCategory } from '../../Redux/Category/Category.action';
import { useLocation } from 'react-router-dom';
import swal from 'sweetalert';
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
    price: number | null;
    salePrice: number | null;
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
    price: null,
    salePrice: null,
    description: '',
    category: null,
  },
  sizeOptions: [],
  toppingOptions: [],
  productImages: [],
};

const FormElements = () => {
  const location = useLocation();
  const product = location?.state?.item || undefined;

  const dispatch: AppDispatch = useDispatch();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [uploadingFiles, setUploadingFiles] = useState<{ imageUrl: string }[]>([]);

  const [selectedFiles, setSelectedFiles] = useState(() => {
    const productImages = product?.image || [];
    const emptySlots = Array(4 - productImages.length).fill(null);
    return [...productImages, ...emptySlots];
  });

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files!);
    handleOpen();
    const newFiles = await Promise.all(files.map(async file => {
      const fileUrl = await uploadToCloudinary(file, 'image');
      return { imageUrl: fileUrl };
    }));
    handleClose();
    const validFiles = newFiles.filter((file): file is { imageUrl: string } => (Boolean(file.imageUrl)));
    setUploadingFiles(validFiles);

    setSelectedFiles((prevState: any) => {
      let updatedFiles = [...prevState];
      if (editingIndex !== null) {
        const currentFile = updatedFiles[editingIndex];
        if (currentFile?.id) {
          updatedFiles[editingIndex] = { ...validFiles[0], id: currentFile.id };
        } else {
          updatedFiles[editingIndex] = validFiles[0];
        }
        setEditingIndex(null);
      } else {
        // Add new images
        updatedFiles = [...validFiles, ...prevState];
      }
      // Ensure the array length does not exceed 4
      if (updatedFiles.length > 4) {
        updatedFiles = updatedFiles.slice(0, 4);
      }
      // Remove null values
      updatedFiles = updatedFiles.filter(file => file !== null);

      return updatedFiles;

    });

  };

  const handleRemoveImage = (index: number) => {
    setSelectedFiles(prevState => {
      const updatedFiles = [...prevState];
      updatedFiles[index] = null;
      return updatedFiles;
    });
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

  const handleAddCategory = async () => {
    const obj = { name: newCategory };
    setShowInput(false);
    await dispatch(createCategory(obj));
  }

  useEffect(() => {
    if (uploadingFiles.length > 0) {
      setSelectedFiles(prevState => {
        let updatedFiles = [...prevState];
        if (editingIndex !== null) {
          // Update the existing image
          updatedFiles[editingIndex] = uploadingFiles[0];
          setEditingIndex(null);
        } else {
          // Add new images only if there are empty slots
          const emptySlotsIndex = updatedFiles.findIndex(file => !file);
          if (emptySlotsIndex !== -1) {
            updatedFiles[emptySlotsIndex] = uploadingFiles[0];
          }
        }
        return updatedFiles;
      });
      setUploadingFiles([]);
    }
  }, [uploadingFiles]);

  const formik = useFormik({
    initialValues: product ? product : initialProductData,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const data = {
        ...values,
        productImages: selectedFiles.filter((imageUrl: string) => imageUrl !== '').map((imageUrl: string) => ({ imageUrl })),
      }
      setSubmitting(false);

      console.log("dữ liệu gửi form đi create product: ", data);

      const resultAction = await dispatch(createProductAction(data));
      if (createProductAction.fulfilled.match(resultAction)) {
        // alert('Đã thêm sản phẩm thành công');
        swal({
          title: "Good job!",
          text: "You clicked the button!",
          icon: "success",
        });
        resetForm();
      } else {
        if (resultAction.payload) {
          // This is assuming the server's response is in this format
          const payload = resultAction.payload as { error: string };
          // alert(`Có lỗi xảy ra: ${payload.error}`);
          swal({
            title: "Lỗi rồi",
            text: "You clicked the button!",
            icon: "success",
          });
        } else {
          alert('Có lỗi xảy ra');
        }
      }
    },
  });

  const [resetTrigger, setResetTrigger] = useState(0);

  console.log("các file ảnh trong bộ nhớ đệm: ", selectedFiles);
  console.log("các file ảnh upload trong bộ nhớ đệm: ", uploadingFiles);
  console.log("file edititngindex: ", editingIndex);
  return (
    <DefaultLayout>
      {product ? (<Breadcrumb pageName="Sửa sản phẩm" />) : (<Breadcrumb pageName="Thêm sản phẩm" />)}
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
                <Formik initialValues={formik.initialValues} onSubmit={async (values, { setSubmitting, resetForm }) => {
                  const data = {
                    ...values,
                    productImages: selectedFiles.filter((file: { imageUrl: string }) => file !== null).map((file: { imageUrl: string }) => ({ imageUrl: file.imageUrl })),
                    image: selectedFiles.filter((imageUrl: string) => imageUrl !== null),
                  }
                  setSubmitting(false);

                  if (product) {
                    console.log("dữ liệu form gửi đi: ", data);
                    const result = await dispatch(updateProductAction(data));
                    if (updateProductAction.fulfilled.match(result)) {
                      alert("Đã sửa thành công");

                    } else {
                      alert("Lỗi rồi mày");
                    }
                  } else {
                    console.log("dữ liệu gửi form đi create product: ", data);
                    const resultAction = await dispatch(createProductAction(data));
                    if (createProductAction.fulfilled.match(resultAction)) {
                      alert('Đã thêm sản phẩm thành công');
                      resetForm();
                      setResetTrigger(resetTrigger + 1);
                      setSelectedFiles(Array(4).fill(''));
                    } else {
                      if (resultAction.payload) {
                        const payload = resultAction.payload as { error: string };
                        alert(`Có lỗi xảy ra: ${payload.error}`);
                      } else {
                        alert('Có lỗi xảy ra');
                      }
                    }
                  }

                }}>
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
                              name={product ? "name" : "product.name"}
                              id={product ? "name" : "product.name"}
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
                                  name={product ? "price" : "product.price"}
                                  id={product ? "price" : "product.price"}
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
                                name={product ? "salePrice" : "product.salePrice"}
                                id={product ? "salePrice" : "product.salePrice"}
                              />
                            </div>
                          </div>
                          <Category onCategoryChange={(item) => {
                            setFieldValue((product ? "category" : "product.category"), item);
                            setShowAddButton(true);
                          }} resetTrigger={resetTrigger} product={product} />
                          {!showAddButton &&
                            <div className='flex'>
                              <p onClick={() => setShowInput(!showInput)} className='p-2 border border-primary text-primary rounded-md cursor-pointer'>Thêm phân loại</p>
                              {showInput &&
                                <div className='flex w-[40%] ml-5'>
                                  <input className='w-full p-2 border rounded border-stroke focus:border-primary focus-visible:outline-none' type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder='Nhập tên' />
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
                                name={product ? "description" : "product.description"}
                                id={product ? "description" : "product.description"}
                                rows={4}
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
                                <SizeOptions onSizeChange={(newSize) => setFieldValue('sizeOptions', newSize)} resetTrigger={resetTrigger} product={product} />
                              </div>
                            </div>
                            <div>
                              <label className="mb-3 block font-medium text-black dark:text-white">
                                Topping
                              </label>
                              <div className='border border-stroke p-2'>
                                <ToppingOptions onToppingChange={(newTopping) => setFieldValue('toppingOptions', newTopping)} resetTrigger={resetTrigger} product={product} />
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
                          {selectedFiles.filter(Boolean).map((file: { imageUrl: string }, i: number) => (<div>

                            <div
                              key={i}
                              id={`FileUpload${i}`}
                              className="relative cursor-pointer appearance-none rounded border-dashed border-blue-500 bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
                              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                              onClick={() => setEditingIndex(i)}
                            >

                              <input
                                id='image-input'
                                type="file"
                                name='image'
                                accept="image/*"
                                className="absolute z-10 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                                onChange={handleFileChange}
                                multiple
                              />

                              <img src={file.imageUrl} alt={`preview ${i}`} className="h-full w-full object-cover" style={{ maxWidth: '260px', maxHeight: '260px' }} />
                              <div className='flex z-50 justify-start items-start -translate-y-36 translate-x-3 hover:text-danger'>
                                <svg
                                  className="fill-current"
                                  role="button"
                                  width="22"
                                  height="22"
                                  viewBox="0 0 12 12"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  onClick={() => handleRemoveImage(i)}
                                >
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M9.35355 3.35355C9.54882 3.15829 9.54882 2.84171 9.35355 2.64645C9.15829 2.45118 8.84171 2.45118 8.64645 2.64645L6 5.29289L3.35355 2.64645C3.15829 2.45118 2.84171 2.45118 2.64645 2.64645C2.45118 2.84171 2.45118 3.15829 2.64645 3.35355L5.29289 6L2.64645 8.64645C2.45118 8.84171 2.45118 9.15829 2.64645 9.35355C2.84171 9.54882 3.15829 9.54882 3.35355 9.35355L6 6.70711L8.64645 9.35355C8.84171 9.54882 9.15829 9.54882 9.35355 9.35355C9.54882 9.15829 9.54882 8.84171 9.35355 8.64645L6.70711 6L9.35355 3.35355Z"
                                    fill="currentColor"
                                  ></path>
                                </svg>
                              </div>
                            </div>


                          </div>
                          ))}
                          {selectedFiles.filter(Boolean).length < 4 && (
                            <div
                              className="relative cursor-pointer appearance-none rounded border-dashed border-blue-500 bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
                              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                              onClick={() => {
                                const nonNullFiles = selectedFiles.filter(Boolean).length;
                                if (nonNullFiles < 4) {
                                  setEditingIndex(nonNullFiles);
                                }
                              }}
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
                            </div>
                          )}
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
                      <button
                        className="flex justify-center rounded bg-primary py-2 px-10 font-medium text-gray hover:bg-opacity-90"
                        type="submit"
                      >
                        {product ? "Cập Nhật" : "Lưu"}
                      </button>
                      {product && <button
                        className="flex justify-center rounded bg-red-600 border border-stroke py-2 px-6 font-medium text-white hover:bg-opacity-80 dark:border-strokedark dark:text-white"
                        type="button"
                      >
                        Xóa
                      </button>}
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
