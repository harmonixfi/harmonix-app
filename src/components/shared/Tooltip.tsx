'use client';

import { ReactNode, useState } from 'react';

type TooltipProps = {
  message: ReactNode;
  children: ReactNode;
};
const Tooltip = (props: TooltipProps) => {
  const { message, children } = props;

  const [show, setShow] = useState(false);

  return (
    <div className="relative flex flex-col items-center group">
      <span
        className="flex justify-center"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {children}
      </span>
      <div
        className={`absolute bottom-full -translate-y-2 flex flex-col items-center group-hover:flex ${
          !show ? 'hidden' : null
        }`}
      >
        <div className="relative p-4 text-sm normal-case leading-5 text-white w-72 bg-rock-tooltip shadow-lg rounded-md">
          {message}
        </div>
        <div className="w-4 h-4 -mt-2 rotate-45 bg-rock-button" />
      </div>
    </div>
  );
};

export default Tooltip;
