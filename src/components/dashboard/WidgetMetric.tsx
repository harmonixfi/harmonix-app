import { Tooltip } from '@nextui-org/react';
import Link from 'next/link';

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
          <Tooltip
            showArrow
            color="foreground"
            closeDelay={100}
            classNames={{ base: 'w-64' }}
            content={labelTooltip}
          >
            <span>
              <QuestionIcon className="w-4 h-4" />
            </span>
          </Tooltip>
        </div>
      ) : (
        <p className="text-rock-gray font-extralight">{label}</p>
      )}
    </div>
  );
};

export default WidgetMetric;
