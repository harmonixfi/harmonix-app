import Link from 'next/link';

import Tooltip from '../shared/Tooltip';
import { ExternalLinkIcon, QuestionIcon } from '../shared/icons';

type WidgetMetricProps = {
  label: string;
  value: string | number;
  link?: string;
  labelTooltip?: string;
};

const WidgetMetric = (props: WidgetMetricProps) => {
  const { label, value, link, labelTooltip } = props;

  return (
    <div className="flex flex-col gap-1 items-center justify-center">
      {link ? (
        <Link
          href={link}
          target="_blank"
          className="flex items-center gap-2 text-rock-highlight hover:underline"
        >
          <p className="text-xl font-semibold">{value}</p>
          {link && <ExternalLinkIcon className="w-4 h-4" />}
        </Link>
      ) : (
        <p className="text-xl font-semibold">{value}</p>
      )}
      {labelTooltip ? (
        <div className="flex items-center gap-2">
          <p className="text-rock-gray font-extralight">{label}</p>
          <Tooltip message={labelTooltip}>
            <QuestionIcon className="w-4 h-4" />
          </Tooltip>
        </div>
      ) : (
        <p className="text-rock-gray font-extralight">{label}</p>
      )}
    </div>
  );
};

export default WidgetMetric;
