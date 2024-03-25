'use client';

import { Fragment, useState } from 'react';

import { Listbox, Transition } from '@headlessui/react';

import { ChevronDownIcon } from './icons';

type SelectOption = {
  label: string;
  value: string;
};

type SelectProps = {
  placeholder?: string;
  options: SelectOption[];
  defaultValue?: SelectOption;
  onChange?: (opt: SelectOption) => void;
  popupClassName?: string;
};

const Select = (props: SelectProps) => {
  const { placeholder, options, popupClassName = '', defaultValue, onChange } = props;

  const [selected, setSelected] = useState<SelectOption>(
    defaultValue ?? {
      label: '',
      value: '',
    },
  );

  const handleChange = (selectedValue: string) => {
    const selectedOption = options.find((x) => x.value === selectedValue);
    if (selectedOption) {
      setSelected(selectedOption);
      onChange?.(selectedOption);
    }
  };

  return (
    <Listbox value={selected.value} onChange={handleChange}>
      <div className="relative mt-1">
        <Listbox.Button className="relative flex items-center justify-center gap-2 w-full cursor-pointer rounded-full bg-white bg-opacity-10 px-3 lg:px-5 py-1 sm:py-2 lg:py-3 shadow-md hover:bg-opacity-5">
          <span className="block truncate text-sm sm:text-base">
            {selected?.label || placeholder}
          </span>
          <ChevronDownIcon />
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options
            className={`absolute mt-1 max-h-60 sm:w-full overflow-auto rounded-lg bg-rock-footer py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-40 ${popupClassName}`}
          >
            {options.map((opt) => (
              <Listbox.Option
                key={opt.value}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 pl-8 pr-4 ${
                    active ? 'text-white font-semibold' : 'text-gray-300'
                  }`
                }
                value={opt.value}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate uppercase ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {opt.label}
                    </span>
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default Select;
