import { useEffect, useState } from 'react';
import displayMoney from '../../utils/displayMoney';

interface Topping {
    name: string;
    price: number | null;
}

interface ToppingOptionsProps {
    onToppingChange: (toppingOptions: Topping[]) => void;
    resetTrigger: number;
    product: any | null;
}

const ToppingOptions: React.FC<ToppingOptionsProps> = ({ onToppingChange, resetTrigger, product }) => {
    const [toppingOptions, setToppingOptions] = useState<Topping[]>([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState<number | null>(null);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    useEffect(() => {
        onToppingChange(toppingOptions);
    }, [toppingOptions]);

    useEffect(() => {
        if (product) {
            setToppingOptions(product?.toppingOptions || []);
        } else {
            setName('');
            setPrice(null);
            setToppingOptions([]);
        }
    }, [resetTrigger, product]);

    const handleAddTopping = () => {
        if (editingIndex !== null) {
            // Update the existing size
            setToppingOptions(prevToppings => prevToppings.map((topping, index) => index === editingIndex ? { name, price } : topping));
            setEditingIndex(null);
        } else {
            // Add a new Topping
            setToppingOptions(prevToppings => [...prevToppings, { name, price }]);
        }
        setName('');
        setPrice(null);
    };

    const handleRemoveTopping = (index: number) => {
        setToppingOptions(prevToppings => prevToppings.filter((_, i) => i !== index));
    };

    const handleClickTopping = (topping: Topping, index: number) => {
        setName(topping?.name);
        setPrice(topping?.price);
        setEditingIndex(index);
    };

    return (
        <div className="grid">
            <div className='flex p-3 box-border w-full'>
                {toppingOptions.map((topping, index) => (
                    <div
                        key={index}
                        className="m-1 -translate-x-4 flex items-center justify-center rounded border-[.5px] border-stroke bg-gray px-2.5 py-1.5 text-sm font-medium dark:border-strokedark dark:bg-white/30"
                    >
                        <div className='flex cursor-pointer' onClick={() => handleClickTopping(topping, index)}>
                            <div className="max-w-full flex-initial">
                                {topping.name} ({topping?.price !== null ? displayMoney(topping.price) : 'N/A'})
                            </div>
                            <div className="flex flex-auto flex-row-reverse">
                                <div
                                    className="cursor-pointer pl-2 translate-x-1 -translate-y-1 hover:text-danger"
                                    onClick={(e) => { e.stopPropagation(); handleRemoveTopping(index) }}
                                >
                                    <svg
                                        className="fill-current"
                                        role="button"
                                        width="12"
                                        height="12"
                                        viewBox="0 0 12 12"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
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
                    </div>
                ))}
            </div>
            <div className='mb-2 border border-[#b8bdc9] w-[60%]'>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='p-2 w-full text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary'
                    type="text"
                    placeholder='Tên'
                />
            </div>
            <div className='border border-[#b8bdc9] w-[60%]'>
                <input
                    value={price !== null ? price : ''}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className='p-2 w-full text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary'
                    type="number"
                    placeholder='Giá Thêm(Vnd)'
                />
            </div>
            <div className='flex'>
                <button type='button' className='m-2 rounded-md border bg-primary py-2 px-[6%] text-white hover:opacity-90 translate-y-2' onClick={handleAddTopping}>Thêm</button>
                <button type='button' className='m-2 rounded-md border bg-danger py-2 px-[8%] text-white hover:opacity-90 translate-y-2'>Đặt Lại</button>
            </div>
        </div>
    );
};

export default ToppingOptions;