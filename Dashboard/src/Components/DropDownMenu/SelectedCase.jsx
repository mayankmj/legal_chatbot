import React, { useState, useRef} from 'react';
import { IoMdArrowDropdownCircle } from 'react-icons/io';

const options = [
  'Criminal',
  'Civil',
  'Family',
  'Employment',
  'Administrative',
  'Commercial',
  'Constitutional',
  'Environmental',
  'International',
  'Property',
];

const SelectedCase = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Select Case');
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    console.log('toggle');
    setIsOpen(prevIsOpen => !prevIsOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          onClick={toggleDropdown}
          type="button"
          className="inline-flex items-center justify-between w-full rounded-md bg-blue-600 px-3 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <span>{selectedOption}</span>
            <IoMdArrowDropdownCircle 
          className={`ml-1 w-6 h-5 ${isOpen ? 'transform rotate-180' : ''}`} />
        </button>
        {isOpen && (
          <div
            ref={dropdownRef}
            className="absolute top-full right-0 mt-1 w-32 h-36 overflow-y-auto rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5"
          >
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              {options.map((option) => (
                <div
                  key={option}
                  onClick={() => handleOptionSelect(option)}
                  className="block px-3 py-2 text-sm text-white hover:bg-gray-600 cursor-pointer"
                  role="menuitem"
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectedCase;
