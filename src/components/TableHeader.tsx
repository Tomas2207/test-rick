const TableHeader = () => {
  return (
    <div className="flex w-full  border sticky top-0 bg-purple-950">
      <div className="h-12 w-16 sm:w-24 md:w-40" />
      <div className="flex-1 border-x flex justify-center items-center text-center">
        Name
      </div>
      <div className="flex-1 border-x flex justify-center items-center text-center">
        Status
      </div>
      <div className="flex-1 border-x flex justify-center items-center text-center">
        Species
      </div>
    </div>
  );
};

export default TableHeader;
