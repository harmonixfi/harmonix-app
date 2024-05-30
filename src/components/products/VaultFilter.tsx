'use client';

import { Select, SelectItem } from '@nextui-org/react';

const STRATEGY_OPTIONS = [
  { label: 'All strategies', value: 'all_strategies' },
  { label: 'Options wheel', value: 'options_wheel' },
  { label: 'Delta neutral', value: 'delta_neutral' },
];

const TYPE_OPTIONS = [
  { label: 'All types', value: 'all_types' },
  { label: 'Real yield', value: 'real_yield' },
  { label: 'Points earning', value: 'points_earning' },
];

const SORT_OPTIONS = [
  { label: 'Name', value: 'name' },
  { label: 'TVL', value: 'tvl' },
  { label: 'APY', value: 'apy' },
];

const VaultFilter = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex-1 flex items-center gap-6">
        <Select
          aria-label="strategy"
          size="md"
          variant="bordered"
          className="max-w-[180px]"
          defaultSelectedKeys={['all_strategies']}
        >
          {STRATEGY_OPTIONS.map((x) => (
            <SelectItem key={x.value}>{x.label}</SelectItem>
          ))}
        </Select>
        <Select
          aria-label="type"
          size="md"
          variant="bordered"
          className="max-w-[180px]"
          defaultSelectedKeys={['all_types']}
        >
          {TYPE_OPTIONS.map((x) => (
            <SelectItem key={x.value}>{x.label}</SelectItem>
          ))}
        </Select>
      </div>

      <Select
        size="md"
        variant="underlined"
        label="Sort by"
        labelPlacement="outside-left"
        classNames={{ base: 'max-w-[180px] items-center', label: 'w-24' }}
        defaultSelectedKeys={['name']}
      >
        {SORT_OPTIONS.map((x) => (
          <SelectItem key={x.value}>{x.label}</SelectItem>
        ))}
      </Select>
    </div>
  );
};

export default VaultFilter;
