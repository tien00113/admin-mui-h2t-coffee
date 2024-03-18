import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import SortIcon from '@mui/icons-material/Sort';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

const categories = [
    { name: 'My Profile', link: '/profile' },
    { name: 'My Contacts', link: '#' },
    { name: 'Account Settings', link: '/pages/settings' },
  ];

const FilterDropdown = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const trigger = useRef<any>(null);
    const dropdown = useRef<any>(null);

    // close on click outside
    useEffect(() => {
        const clickHandler = ({ target }: MouseEvent) => {
            if (!dropdown.current) return;
            if (
                !dropdownOpen ||
                dropdown.current.contains(target) ||
                trigger.current.contains(target)
            )
                return;
            setDropdownOpen(false);
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    });
    useEffect(() => {
        const keyHandler = ({ keyCode }: KeyboardEvent) => {
            if (!dropdownOpen || keyCode !== 27) return;
            setDropdownOpen(false);
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    });

    return (
        <div className="relative">
            <Link
                ref={trigger}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-4"
                to="#"
            >
                <SortIcon className="lg:hidden" />
        <span className="hidden lg:inline">Phân loại</span>
            </Link>

            {/* <!-- Dropdown Start --> */}
            <div
                ref={dropdown}
                onFocus={() => setDropdownOpen(true)}
                onBlur={() => setDropdownOpen(false)}
                className={`absolute mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${dropdownOpen === true ? 'block' : 'hidden'
                    }`}
            >
                <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
                    {categories.map((category, index) => (
                        <li key={index}>
                            <Link
                                to={category.link}
                                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                            >
                                {category.name}
                            </Link>
                        </li>
                    ))}
                </ul>
                <button className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
                    <PlaylistAddIcon />
                    Thêm
                </button>
            </div>
            {/* <!-- Dropdown End --> */}
        </div>
    );
}

export default FilterDropdown