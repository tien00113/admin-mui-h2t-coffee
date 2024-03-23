import React, { useState } from 'react';

interface Option {
  name: string;
  price: number;
}

const DropdownCard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<Option[]>([
    { name: 'Thạch', price: 0 },
    { name: 'Trân trâu', price: 0 },
    { name: 'Pupping', price: 0 },
    { name: 'Lô hội', price: 0 },
  ]);

  const handleInputChange = (index: number, field: keyof Option, value: string) => {
    const newOptions = [...options];
    // newOptions[index][field] = field === 'price' ? parseFloat(value) : value;
    setOptions(newOptions);
  };

  return (
    <div className="w-full max-w-xs mx-auto">
      <button
        className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-400"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? 'Đóng' : 'Mở'} thẻ nhập
      </button>
      {isOpen && options.map((option, index) => (
        <div key={index} className="mt-4">
          <input
            className="w-full px-3 py-2 mb-3 text-gray-700 border rounded focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Nhập tên"
            value={option.name}
            onChange={(e) => handleInputChange(index, 'name', e.target.value)}
          />
          <input
            className="w-full px-3 py-2 text-gray-700 border rounded focus:outline-none focus:shadow-outline"
            type="number"
            placeholder="Nhập giá"
            value={option.price}
            onChange={(e) => handleInputChange(index, 'price', e.target.value)}
          />
        </div>
      ))}
    </div>
  );
};

export default DropdownCard;
