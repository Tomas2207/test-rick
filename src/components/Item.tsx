const Item = ({ children }: { children: string }) => {
  return (
    <div className="flex-1 border-x flex justify-center items-center text-center">
      {children}
    </div>
  );
};

export default Item;
