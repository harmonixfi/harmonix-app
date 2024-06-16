'use client';

import {
  Badge,
  Card,
  Chip,
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

  const { data, isLoading } = useSWR(address ? ['get-point-reward', address] : null, () =>
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
      <TableBody>
        <TableRow key="1">
          <TableCell>Epoch 1</TableCell>
          <TableCell>{format(new Date(2014, 1, 11), 'MMM dd, yyyy hh:mm aa')}</TableCell>
          <TableCell>{format(new Date(2014, 2, 11), 'MMM dd, yyyy hh:mm aa')}</TableCell>
          <TableCell>
            <Chip
              color="primary"
              variant="bordered"
              size="lg"
              endContent={<PointIcon />}
              className="text-xl py-4"
            >
              200
            </Chip>
          </TableCell>
        </TableRow>
        <TableRow key="2">
          <TableCell>Epoch 2</TableCell>
          <TableCell>{format(new Date(2014, 3, 11), 'MMM dd, yyyy hh:mm aa')}</TableCell>
          <TableCell>
            <span className="opacity-60">N/A</span>
          </TableCell>
          <TableCell>
            <Chip
              color="primary"
              variant="bordered"
              size="lg"
              endContent={<PointIcon />}
              className="text-xl py-4"
            >
              100
            </Chip>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default PointRewardTable;
