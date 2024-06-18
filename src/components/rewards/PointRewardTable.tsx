'use client';

import {
  Card,
  Chip,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import { format } from 'date-fns';
import useSWR from 'swr';
import { useAccount } from 'wagmi';

import { getPointReward } from '@/api/point';
import { NA_STRING } from '@/constants/common';

import { FlatLogoIcon } from '../shared/icons';

const PointIcon = () => {
  return (
    <span className="relative w-6 h-6 bg-primary rounded-full">
      <FlatLogoIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4" />
    </span>
  );
};

const PointRewardTable = () => {
  const { address } = useAccount();

  const { data = [], isLoading } = useSWR(address ? ['get-point-reward', address] : null, () =>
    getPointReward(address || '0x00'),
  );

  const loading = !data || isLoading;

  if (!address) {
    return (
      <Card className="p-8">
        <p className="text-primary opacity-50 text-base lg:text-xl">
          Connect your wallet to check more
        </p>
      </Card>
    );
  }

  return (
    <div>
      <div className="flex lg:hidden flex-col gap-4">
        {loading ? (
          <Card className="items-center p-8 space-y-2">
            <Spinner />
            <p>Loading</p>
          </Card>
        ) : data.length === 0 ? (
          <Card className="p-8 text-opacity-60">No data.</Card>
        ) : (
          data.map((x) => (
            <Card key={x.session_name} className="gap-4 p-8 text-primary">
              <p className="text-xl font-medium">{x.session_name}</p>
              <div className="flex items-center justify-between">
                <p className="opacity-60">Start date</p>
                <p>{x.start_date ? format(x.start_date, 'MMM dd, yyyy hh:mm aa') : NA_STRING}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="opacity-60">End date</p>
                <p>{x.end_date ? format(x.end_date, 'MMM dd, yyyy hh:mm aa') : NA_STRING}</p>
              </div>
              <div className="flex items-center justify-center gap-2 text-xl font-medium bg-secondary rounded-full py-1.5">
                {x.points}
                <PointIcon />
              </div>
            </Card>
          ))
        )}
      </div>
      <Table
        aria-label="Reward point table"
        isStriped
        classNames={{
          base: 'hidden lg:flex',
          th: 'bg-secondary text-primary text-base font-medium py-3',
          td: 'py-4 text-base',
        }}
      >
        <TableHeader>
          <TableColumn>Epoch</TableColumn>
          <TableColumn>Start date</TableColumn>
          <TableColumn>End date</TableColumn>
          <TableColumn>Epoch points</TableColumn>
        </TableHeader>
        <TableBody
          emptyContent={
            loading ? (
              <div className="space-y-2">
                <Spinner />
                <p>Loading</p>
              </div>
            ) : (
              'No data.'
            )
          }
          items={data}
        >
          {(x) => (
            <TableRow key={x.session_name}>
              <TableCell>{x.session_name}</TableCell>
              <TableCell>
                {x.start_date ? (
                  <span>{format(x.start_date, 'MMM dd, yyyy hh:mm aa')}</span>
                ) : (
                  <span className="opacity-60">N/A</span>
                )}
              </TableCell>
              <TableCell>
                {x.end_date ? (
                  <span>{format(x.end_date, 'MMM dd, yyyy hh:mm aa')}</span>
                ) : (
                  <span className="opacity-60">N/A</span>
                )}
              </TableCell>
              <TableCell>
                <Chip
                  color="primary"
                  variant="bordered"
                  size="lg"
                  endContent={<PointIcon />}
                  className="text-base lg:text-xl py-4"
                >
                  {x.points}
                </Chip>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default PointRewardTable;
