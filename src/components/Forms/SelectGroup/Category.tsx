import React, { useState } from 'react';

const Category
: React.FC<{ onCategoryChange: (category: { name: string; id: any }) => void }> = ({onCategoryChange}) => {
  const [selectedOption, setSelectedOption] = useState<{ name: string; id: any } | null>(null);
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  return (
    <div>
      <label className="mb-2.5 font-medium block text-black dark:text-white">
        {' '}
        Phân loại{' '}
      </label>

      <div className="relative z-30 bg-transparent dark:bg-form-input">
        <select
          value={selectedOption ? JSON.stringify(selectedOption) : ''}
          onChange={(e) => {
            const selectedCategory = JSON.parse(e.target.value);
            setSelectedOption(selectedCategory);
            onCategoryChange(selectedCategory)
            changeTextColor();
          }}
          className={`relative z-40 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
            isOptionSelected ? 'text-black dark:text-white' : ''
          }`}
        >
          <option value="" disabled className="text-body dark:text-bodydark">
            Chọn phân loại
          </option>
          <option value='{"id": 1}' className="text-body dark:text-bodydark">
            Đồ ăn
          </option>
          {/* <option value="UK" className="text-body dark:text-bodydark">
            Đồ ăn nhanh
          </option>
          <option value="Canada" className="text-body dark:text-bodydark">
            Thêm phân loại
          </option> */}
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
