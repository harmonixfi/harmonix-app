const Loading = () => {
  return (
    <div className="flex">
      {[...Array(10)].map((_, index) => (
        <div key={index} className="wave w-1 h-16 sm:h-20 rounded-3xl m-1.5 sm:m-2.5" />
      ))}
    </div>
  );
};

export default Loading;
