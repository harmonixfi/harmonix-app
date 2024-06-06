const Loading = () => {
  return (
    <div className="flex">
      {[...Array(10)].map((_, index) => (
        <div key={index} className="wave w-0.5 h-8 sm:h-12 rounded-3xl m-1.5 sm:m-2.5" />
      ))}
    </div>
  );
};

export default Loading;
