
// interface Size {
//   name: string;
//   price: number;
// }
// interface ToppingOption {
//   nameTopping: string;
//   priceTopping: number;
// }
// interface ProductImage {
//   imageUrl: string;
// }
// interface ProductData {
//   product: {
//     name: string;
//     price: number;
//     salePrice: number;
//     description: string;
//     category: {
//       id: any;
//     } | null;
//   };
//   sizeOptions: Size[];
//   toppingOptions: ToppingOption[];
//   productImages: ProductImage[];
// }

import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../layout/DefaultLayout";

// const initialProductData: ProductData = {
//   product: {
//     name: '',
//     price: 0,
//     salePrice: 0,
//     description: '',
//     category: null,
//   },
//   sizeOptions: [],
//   toppingOptions: [],
//   productImages: [],
// };

const EditProduct = () => {
  //   const dispatch: AppDispatch = useDispatch();
  //   const [selectedFiles, setSelectedFiles] = useState<string[]>(Array(4).fill(''));
  //   const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
  //     const files = Array.from(event.target.files!);
  //     handleOpen();
  //     const newFiles = await Promise.all(files.map(async file => {
  //       const fileUrl = await uploadToCloudinary(file, 'image');
  //       return fileUrl;
  //     }));
  //     handleClose();
  //     const validFiles = newFiles.filter((file): file is string => Boolean(file));
  //     setSelectedFiles(prevState => {
  //       let updatedFiles = [...validFiles, ...prevState];
  //       if (updatedFiles.length > 4) {
  //         updatedFiles = updatedFiles.slice(0, 4);
  //       }
  //       return updatedFiles;
  //     });
  //   };

  // const handleAddProduct = async (values: ProductData, { setSubmitting }: FormikHelpers<ProductData>) => {
  //   const data = {
  //     ...values,
  //     productImages: selectedFiles.filter(imageUrl => imageUrl !== '').map(imageUrl => ({ imageUrl })),
  //   }
  //   setSubmitting(false);

  //   await dispatch(createProductAction(data));
  // };

  //   const [open, setOpen] = useState(false);
  //   const handleClose = () => {
  //     setOpen(false);
  //   };
  //   const handleOpen = () => {
  //     setOpen(true);
  //   };
  //   const [showAddButton, setShowAddButton] = useState<boolean>(false);
  //   const [showInput, setShowInput] = useState<boolean>(false);
  //   const [newCategory, setNewCategory] = useState<string>('');

  //   const handleAddCategory = async () => {
  //     const obj = { name: newCategory };
  //     setShowInput(false);
  //     await dispatch(createCategory(obj));
  //     console.log("da nhan them phan loai ", obj);
  //   }

  //   const formik = useFormik({
  //     initialValues: initialProductData,
  //     onSubmit: async (values, { setSubmitting, resetForm }) => {
  //       const data = {
  //         ...values,
  //         productImages: selectedFiles.filter(imageUrl => imageUrl !== '').map(imageUrl => ({ imageUrl })),
  //       }
  //       setSubmitting(false);

  //       const resultAction = await dispatch(createProductAction(data));
  //       if (createProductAction.fulfilled.match(resultAction)) {
  //         alert('Đã thêm sản phẩm thành công');
  //         resetForm();
  //       } else {
  //         if (resultAction.payload) {
  //           // This is assuming the server's response is in this format
  //           const payload = resultAction.payload as { error: string };
  //           alert(`Có lỗi xảy ra: ${payload.error}`);
  //         } else {
  //           alert('Có lỗi xảy ra');
  //         }
  //       }
  //     },
  //   });

  //   const [resetTrigger, setResetTrigger] = useState(0);
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Sửa sản phẩm" />
      <div className="mx-auto max-w-270">
        <div className="grid grid-cols-2 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark bg-slate-500">
                <h3 className="font-medium text-white dark:text-white text-center">
                  THÔNG TIN SẢN PHẨM
                </h3>
              </div>
              <div className="p-6">
                <section>
                  <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="flex flex-col gap-5.5 p-3.5">

                    </div>
                  </div>
                </section>
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

export default EditProduct;
