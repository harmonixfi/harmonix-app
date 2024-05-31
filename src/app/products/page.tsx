import VaultList from '@/components/products/VaultList';
import Select from '@/components/shared/Select';
import Navbar from '@/components/shared/navbar/Navbar';

export default async function Products() {
  return (
    <>
      <Navbar />

      <div className="hidden md:flex flex-wrap gap-6 w-fit mt-12 mx-auto px-6 sm:px-0">
        <div className="w-44">
          <Select
            placeholder="Strategy"
            options={[
              { value: 'deltaNeutral', label: 'Delta neutral' },
              { value: 'hedging', label: 'Hedging' },
            ]}
          />
        </div>
        <div className="w-52">
          <Select
            placeholder="Deposit asset"
            options={[
              { value: 'usdc', label: 'USDC' },
              { value: 'eth', label: 'ETH' },
              { value: 'btc', label: 'BTC' },
            ]}
          />
        </div>
        <div className="w-36">
          <Select
            placeholder="Sort by"
            options={[
              { value: 'name', label: 'Name' },
              { value: 'apy', label: 'APY' },
              { value: 'tvl', label: 'TVL' },
            ]}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:hidden gap-4 w-full px-6">
        <div>
          <Select
            placeholder="Filter"
            popupClassName="w-[50vw]"
            options={[
              { value: 'deltaNeutral', label: 'Delta neutral' },
              { value: 'hedging', label: 'Hedging' },
              { value: 'usdc', label: 'USDC' },
              { value: 'eth', label: 'ETH' },
              { value: 'btc', label: 'BTC' },
            ]}
          />
        </div>
        <div>
          <Select
            placeholder="Sort by"
            popupClassName="w-[50vw] right-0"
            options={[
              { value: 'name', label: 'Name' },
              { value: 'apy', label: 'APY' },
              { value: 'tvl', label: 'TVL' },
            ]}
          />
        </div>
      </div>

      <VaultList />
    </>
  );
}
