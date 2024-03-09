type Props = {
  getPage: (direction: 'prev' | 'next') => void;
  pageInfo: {
    next: string | null;
    prev: string | null;
  };
};

const Buttons = ({ getPage, pageInfo }: Props) => {
  return (
    <div className="flex gap-1 w-full max-w-[1200px] justify-end mx-auto">
      <button
        disabled={pageInfo.prev === null}
        onClick={() => getPage('prev')}
        className={pageInfo.prev !== null ? 'text-white' : 'text-gray-400'}
      >
        Previous
      </button>
      <div>|</div>
      <button
        disabled={pageInfo.next === null}
        onClick={() => getPage('next')}
        className={pageInfo.next !== null ? 'text-white' : 'text-gray-400'}
      >
        Next
      </button>
    </div>
  );
};

export default Buttons;
