const Loader = (): JSX.Element => {
  return (
    <div className="mt-[150px] text-center">
      <span
        className="w-[30px] h-[30px] m-auto border-4 border-solid border-[#ffc5c5] border-b-[#a62626] rounded-full inline-block box-border animate-spin"
        role="status"
        aria-label="Loading"
      />
    </div>
  );
};

export default Loader;
