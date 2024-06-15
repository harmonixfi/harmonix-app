'use client';

import { Card } from '@nextui-org/react';

import { Position } from '@/@types/portfolio';
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
    <Card className="p-8 text-primary">
      <p className="text-xl font-medium opacity-50 capitalize">Your active positions</p>

      {positions.length === 0 ? (
        <p className="mt-4">You have no positions</p>
      ) : (
        <>
          <div className="w-full p-6 bg-rock-grey01 rounded-2xl mt-6">
            <div className="hidden sm:grid grid-cols-7 gap-2 px-6 text-left text-sm xl:text-base 2xl:text-lg font-semibold mb-6">
              <p className="col-span-2 ">Vault name</p>
              <p className="text-left">Total balance</p>
              <p className="text-left">Initial deposit</p>
              <p className="text-center">PNL</p>
              <p className="text-center">PNL %</p>
              <p className="text-center">APY</p>
            </div>

            <div className="flex flex-col gap-4">
              {positions.map((item) => (
                <PositionRow key={item.id} position={item} />
              ))}
            </div>
          </div>
        </>
      )}
    </Card>
  );
};

export default ActivePositions;
