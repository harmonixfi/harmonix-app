import Typography from '@/components/shared/Typography';
import { LineChartData } from '@/components/shared/chart/LineChart';

import VaultDetailTemplate from '../detail/VaultDetailTemplate';
import DeltaNeutralOverview from './DeltaNeutralOverview';
import DeltaNeutralParameter from './DeltaNeutralParameter';
import DeltaNeutralSafetyAssurance from './DeltaNeutralSafetyAssurance';

type DeltaNeutralDetailProps = {
  weeklyApy: number;
  monthlyApy: number;
  apr: number;
  marketData: LineChartData[];
  onyxData: LineChartData[];
};

const DeltaNeutralDetail = (props: DeltaNeutralDetailProps) => {
  const { weeklyApy, monthlyApy, apr, marketData, onyxData } = props;

  return (
    <VaultDetailTemplate
      name="Delta neutral vault"
      weeklyApy={weeklyApy}
      monthlyApy={monthlyApy}
      apr={apr}
      marketData={marketData}
      onyxData={onyxData}
      description={
        <Typography className="sm:w-4/5">
          This vault/strategy is designed to capitalize on the upward trend of ETH, aiming to not
          only exceed the performance of holding ETH alone by{' '}
          <span className="font-bold text-[#4281FF]">20%-50%</span> but also to minimize drawdowns
          by up to <span className="font-bold text-[#4281FF]">50%</span> during bearish/downward
          market trends.
        </Typography>
      }
      parameter={<DeltaNeutralParameter />}
      overview={<DeltaNeutralOverview />}
      safetyAssurance={<DeltaNeutralSafetyAssurance />}
    />
  );
};

export default DeltaNeutralDetail;
