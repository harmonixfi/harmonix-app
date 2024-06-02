'use client';

import { Fragment, useMemo, useState } from 'react';

import { Listbox, Transition } from '@headlessui/react';

import { SupportedCurrency } from '@/@types/enum';

import { ChevronDownIcon, DaiIcon, UsdcCircleIcon, UsdtCircleIcon } from './icons';

type CurrencySelectProps = {
  value: SupportedCurrency;
  onChange: (v: SupportedCurrency) => void;
};

const CurrencySelect = (props: CurrencySelectProps) => {
  const { value, onChange } = props;

  const options = useMemo(
    () =>
      Object.values(SupportedCurrency).map((x) => ({
        label: x,
        value: x,
      })),
    [],
  );

  const handleChange = (selectedValue: string) => {
    const selectedOption = options.find((x) => x.value === selectedValue);
    if (selectedOption) {
      onChange(selectedOption.value);
    }
  };

  return (
    <Listbox value={value} onChange={handleChange}>
      <div className="relative mt-1">
        <Listbox.Button className="relative flex items-center justify-center gap-2 cursor-pointer rounded-full shadow-md text-sm text-white font-normal uppercase border border-rock-light-blue px-2 py-1.5">
          {value === SupportedCurrency.Usdt ? (
            <UsdtCircleIcon className="w-8 h-8" />
          ) : value === SupportedCurrency.Usdc ? (
            <UsdcCircleIcon className="w-8 h-8" />
          ) : (
            <DaiIcon className="w-8 h-8" />
          )}
          <span>{value}</span>
          <ChevronDownIcon />
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-lg bg-rock-button py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {options.map((opt) => (
              <Listbox.Option
                key={opt.value}
                className={({ active }) =>
                  `relative cursor-pointer select-none px-2.5 py-2 text-sm ${
                    active ? 'text-white font-medium bg-gray-600' : 'text-gray-200'
                  }`
                }
                value={opt.value}
              >
                {() => (
                  <div className="flex items-center gap-3">
                    {opt.value === SupportedCurrency.Usdt ? (
                      <UsdtCircleIcon className="w-8 h-8" />
                    ) : opt.value === SupportedCurrency.Usdc ? (
                      <UsdcCircleIcon className="w-8 h-8" />
                    ) : (
                      <DaiIcon className="w-8 h-8" />
                    )}

                    <span className="block truncate uppercase font-normal">{opt.label}</span>
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default CurrencySelect;
