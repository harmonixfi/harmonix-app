'use client';

import { Position } from '@/@types/vault';
import { WalletConnectStatus } from '@/@types/wallet';

import PositionRow from './PositionRow';

type ActivePositionsProps = {
  status: WalletConnectStatus;
  loading: boolean;
  error: boolean;
  positions?: Position[];
};

const ActivePositions = (props: ActivePositionsProps) => {
  const { status, loading, error, positions = [] } = props;

  if (status !== 'connected' || loading || error) {
    return null;
  }

  return (
    <div>
      <p className="text-lg md:text-xl lg:text-3xl font-semibold uppercase mt-12 lg:mt-16 xl:mt-24 mb-4 lg:mb-6">
        Your active positions
      </p>

      {positions.length === 0 ? (
        <p className="text-rock-sub-body">You have no positions</p>
      ) : (
        <>
          <div className="sm:border sm:border-rock-divider sm:w-full 3xl:w-4/5 sm:rounded-2xl sm:p-6 2xl:p-9">
            <div className="hidden sm:grid grid-cols-7 gap-2 px-6 mb-6 text-rock-sub-body uppercase text-left text-xs lg:text-xs xl:text-sm 2xl:text-base font-semibold">
              <p className="col-span-2 ">Vault name</p>
              <p className="text-left">Total balance</p>
              <p className="text-left">Initial deposit</p>
              <p className="text-center">PNL</p>
              <p className="text-center">PNL %</p>
              <p className="text-center">APY</p>
            </div>

            {positions.map((item) => (
              <PositionRow key={item.id} position={item} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ActivePositions;
