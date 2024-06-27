'use client';

import { ChangeEvent, useState } from 'react';

import { Tab, Tabs } from '@nextui-org/tabs';

import { VaultCategory, VaultNetwork } from '@/@types/enum';

import VaultFilter from './VaultFilter';
import VaultList from './VaultList';

const VaultTabs = () => {
  const [selectedNetWork, setSelectedNetWork] = useState<VaultNetwork | 'all'>('all');

  const handleSelectNetwork = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedNetWork(event.target.value as VaultNetwork | 'all');
  };

  return (
    <div className="relative">
      <div className="xl:absolute top-0 right-0 mb-8 xl:mb-0">
        <VaultFilter selectedNetWork={selectedNetWork} onSelectNetWork={handleSelectNetwork} />
      </div>
      <Tabs
        aria-label="Category"
        color="primary"
        variant="bordered"
        classNames={{ tabList: 'border-primary mb-8', tabContent: 'text-base px-4' }}
      >
        <Tab key="all" title="All">
          <div>
            <VaultList selectedCategory="all" selectedNetwork={selectedNetWork} />
          </div>
        </Tab>
        <Tab key="markets" title="Markets">
          <VaultList selectedCategory={VaultCategory.RealYield} selectedNetwork={selectedNetWork} />
        </Tab>
        <Tab key="point_markets" title="Point markets">
          <VaultList selectedCategory={VaultCategory.Points} selectedNetwork={selectedNetWork} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default VaultTabs;
