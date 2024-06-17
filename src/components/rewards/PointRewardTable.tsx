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
        <p className="text-primary opacity-50 text-xl">Connect your wallet to check more</p>
      </Card>
    );
  }

  return (
    <Table
      aria-label="Reward point table"
      isStriped
      classNames={{
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
            'No rows to display.'
          )
        }
        items={data}
      >
        {(x) => (
          <TableRow key={x.session_name}>
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
                  className="text-xl py-4"
                >
                  {x.points}
                </Chip>
              </TableCell>
            </TableRow>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default PointRewardTable;
