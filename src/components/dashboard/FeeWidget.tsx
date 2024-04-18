const FeeWidget = () => {
  return (
    <div className="w-full flex flex-col gap-6 bg-white bg-opacity-5 border border-rock-divider rounded-2xl px-6 py-2">
      <p className="text-rock-gray uppercase mt-3 ml-2">Fee structure</p>
      <div className="flex items-center justify-between px-2 pb-4">
        <div className="flex flex-col gap-1 items-center justify-center">
          <p className="text-xl font-semibold">0%</p>
          <p className="text-rock-gray font-extralight">Entry</p>
        </div>
        <div className="flex flex-col gap-1 items-center justify-center">
          <p className="text-xl font-semibold">0.5%</p>
          <p className="text-rock-gray font-extralight">Exit</p>
        </div>
        <div className="flex flex-col gap-1 items-center justify-center">
          <p className="text-xl font-semibold">10%</p>
          <p className="text-rock-gray font-extralight">Performance</p>
        </div>
        <div className="flex flex-col gap-1 items-center justify-center">
          <p className="text-xl font-semibold">1%</p>
          <p className="text-rock-gray font-extralight">Management</p>
        </div>
      </div>
    </div>
  );
};

export default FeeWidget;
