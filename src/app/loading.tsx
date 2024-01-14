export default function Loading() {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-rock-dark z-50">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex items-end justify-center gap-2 animate-pulse">
        <p className="font-bruno-ace text-xl sm:text-3xl uppercase translate-y-2">Rock Onyx</p>
        <div className="flex items-center gap-3">
          <div className="h-1.5 w-1.5 bg-white rounded-full"></div>
          <div className="h-1.5 w-1.5 bg-white rounded-full"></div>
          <div className="h-1.5 w-1.5 bg-white rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
