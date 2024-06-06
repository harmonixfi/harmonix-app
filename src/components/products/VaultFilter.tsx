'use client';

import { ChangeEventHandler } from 'react';

import { Select, SelectItem } from '@nextui-org/react';

import { VaultNetwork } from '@/@types/enum';

import { ArbitrumIcon, EthereumIcon } from '../shared/icons';

const CHAIN_OPTIONS = [
  { label: 'All chains', value: 'all' },
  { label: 'Arbitrum One', value: VaultNetwork.ArbitrumOne },
  { label: 'Ethereum', value: VaultNetwork.Ethereum },
];

const SORT_OPTIONS = [
  { label: 'Name', value: 'name' },
  { label: 'TVL', value: 'tvl' },
  { label: 'APY', value: 'apy' },
];

type VaultFilterProps = {
  selectedNetWork: 'all' | VaultNetwork;
  onSelectNetWork: ChangeEventHandler<HTMLSelectElement>;
};

const VaultFilter = (props: VaultFilterProps) => {
  const { selectedNetWork, onSelectNetWork } = props;

  return (
    <div className="flex items-center gap-8">
      <Select
        aria-label="chain"
        classNames={{
          base: 'w-40 shrink-0',
          trigger:
            'bg-primary rounded-full text-white data-[hover=true]:bg-primary data-[hover=true]:bg-opacity-80',
          value: 'group-data-[has-value=true]:text-white',
        }}
        selectedKeys={[selectedNetWork]}
        onChange={onSelectNetWork}
      >
        {CHAIN_OPTIONS.map((x) => (
          <SelectItem key={x.value} textValue={x.label}>
            <div className="flex items-center gap-2">
              {x.value === VaultNetwork.ArbitrumOne ? (
                <ArbitrumIcon className="w-5 h-5" />
              ) : x.value === VaultNetwork.Ethereum ? (
                <EthereumIcon className="w-5 h-5" />
              ) : null}
              {x.label}
            </div>
          </SelectItem>
        ))}
      </Select>

      <Select
        size="md"
        variant="underlined"
        label="Sort by:"
        labelPlacement="outside-left"
        classNames={{ base: 'w-48 items-center', label: 'w-20' }}
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
