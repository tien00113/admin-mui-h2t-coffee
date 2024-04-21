import React, { useEffect, useState } from 'react';
import { AppDispatch, RootState } from '../../../Redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategoryAction } from '../../../Redux/Category/Category.action';

interface Category {
  name: string;
  id: any;
}

interface CategoryProps {
  onCategoryChange: (category: Category) => void;
  resetTrigger: number;
  product: any | null;
}

const Category
  : React.FC<CategoryProps> = ({ onCategoryChange, resetTrigger, product }) => {

    const dispatch: AppDispatch = useDispatch();
    const category = useSelector((state: RootState) => state.category.category);

    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

    const changeTextColor = () => {
      setIsOptionSelected(true);
    };

    useEffect(() => {
      dispatch(getAllCategoryAction());
    }, [dispatch]);

    useEffect(()=>{
      setSelectedOption(null);
    },[resetTrigger])

    return (
      <div>
        <label className="mb-2.5 font-medium block text-black dark:text-white">
          {' '}
          Phân loại{' '}
        </label>

        <div className="relative z-30 bg-transparent dark:bg-form-input">
          <select
            value={selectedOption || ''}
            onChange={(e) => {
              const selectedName = e.target.value;
              const selectedCategory = category.find((item: Category) => item.name === selectedName);
              setSelectedOption(selectedName);
              onCategoryChange(selectedCategory);
              changeTextColor();
            }}
            className={`relative z-40 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${isOptionSelected ? 'text-black dark:text-white' : ''
              }`}
          >
            <option value={product ? product : ''} disabled className="text-body dark:text-bodydark">
              Chọn phân loại
            </option>
            {category && category.map((item: Category) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
          <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
            <svg
              className="fill-current"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.8">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                  fill=""
                ></path>
              </g>
            </svg>
          </span>
        </div>
      </div>
    );
  };

export default Category;
