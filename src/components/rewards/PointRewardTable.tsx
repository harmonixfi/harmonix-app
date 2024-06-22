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
import { getUser } from '@/api/referral';
import { NA_STRING } from '@/constants/common';
import { formatToUTC } from '@/utils/date';
import { toFixedNumber, withCommas } from '@/utils/number';

import { LogoCircleIcon } from '../shared/icons';

const PointRewardTable = () => {
  const { address } = useAccount();

  const { data: user, isLoading: isLoadingUser } = useSWR(
    address ? ['get-user', address] : null,
    () => getUser(address ?? '0x00'),
  );

  const { data = [], isLoading: isLoadingPointReward } = useSWR(
    address && user?.joined ? ['get-point-reward', address] : null,
    () => getPointReward(address || '0x00'),
  );

  if (!address) {
    return (
      <Card className="p-8">
        <p className="text-primary opacity-50 text-base lg:text-xl">
          Connect your wallet to check more
        </p>
      </Card>
    );
  }

  if (isLoadingUser || isLoadingPointReward) {
    return (
      <Card className="items-center p-8 space-y-2">
        <Spinner />
        <p>Loading</p>
      </Card>
    );
  }

  if (!user?.joined) {
    return (
      <Card className="p-8">
        <p className="text-base sm:text-xl opacity-60">Join Harmonix to check more.</p>
      </Card>
    );
  }

  return (
    <div>
      <div className="flex lg:hidden flex-col gap-4">
        {data.length === 0 ? (
          <Card className="p-8 text-opacity-60">No data.</Card>
        ) : (
          data.map((x) => (
            <Card key={x.session_name} className="gap-4 p-8 text-primary">
              <p className="text-xl font-medium">{x.session_name}</p>
              <div className="flex items-center justify-between">
                <p className="opacity-60">Start date</p>
                <p>{x.start_date ? `${formatToUTC(x.start_date)} UTC` : NA_STRING}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="opacity-60">End date</p>
                <p>{x.end_date ? `${formatToUTC(x.end_date)} UTC` : NA_STRING}</p>
              </div>
              <div className="flex items-center justify-center gap-2 text-xl font-medium bg-secondary rounded-full py-1.5">
                {withCommas(toFixedNumber(x.points, 1))}
                <LogoCircleIcon className="w-6 h-6" />
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
          <TableColumn>Session</TableColumn>
          <TableColumn>Start date</TableColumn>
          <TableColumn>End date</TableColumn>
          <TableColumn>Epoch points</TableColumn>
        </TableHeader>
        <TableBody
          emptyContent={
            isLoadingPointReward ? (
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
                  <span>{`${formatToUTC(x.start_date)} UTC`}</span>
                ) : (
                  <span className="opacity-60">{NA_STRING}</span>
                )}
              </TableCell>
              <TableCell>
                {x.end_date ? (
                  <span>{`${formatToUTC(x.end_date)} UTC`}</span>
                ) : (
                  <span className="opacity-60">{NA_STRING}</span>
                )}
              </TableCell>
              <TableCell>
                <Chip
                  color="primary"
                  variant="bordered"
                  size="lg"
                  endContent={<LogoCircleIcon className="w-6 h-6 ml-1" />}
                  className="text-base lg:text-xl px-4 py-4"
                >
                  {withCommas(toFixedNumber(x.points, 1))}
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
