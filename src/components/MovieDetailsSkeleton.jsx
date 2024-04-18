
const MovieDetailsSkeleton = () => {
  return (
    <>
      <main className="flex flex-col lg:flex-row gap-20 items-center px-10 py-9 bg-gray-100">
        <section className="flex flex-col gap-20">
          <div className="flex items-center gap-2 text-gray-100 text-xl cursor-pointer font-bold">
            <div className="bg-gray-300 w-20 h-6 rounded-md"></div>
            <div className="bg-gray-300 w-20 h-6 rounded-md"></div>
          </div>
          <div className="rounded-2xl shadow-sm shadow-gray-500 bg-gray-300 w-80 h-96"></div>
        </section>
        <section className="flex flex-col gap-7 text-gray-100">
          <div>
            <div className="flex flex-col gap-5">
              <div>
                <div className="border rounded-2xl w-72 lg:w-[800px] h-[250px] shadow-sm shadow-gray-500 bg-gray-300"></div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="bg-gray-300 w-72 xl:w-full h-10"></h1>

            <div className="flex flex-col-reverse lg:flex-row lg:gap-3 items-start text-shadow-custom">
              <div className="flex gap-3 mt-3">
                <div className="border border-[#b1adad] rounded-md p-[1px] font-bold bg-gray-300 w-12 h-3"></div>
                <div className="lg:text-3xl text-xl -mt-2 lg:mt-1 font-extrabold bg-gray-300 w-3 h-2"></div>
                <div className="font-bold text-lg bg-gray-300 w-28 h-3"></div>
              </div>
              <div className="hidden lg:flex items-center gap-3 lg:mt-3">
                <div className="flex gap-3">
                 { [1,2,3,4].map((index) => (<div key={index} className="text-gray-100 font-bold bg-gray-300 w-20 h-3"></div>))}
                </div>
                <div className="lg:text-3xl text-xl -mt-2 lg:mt-1 font-extrabold bg-gray-300 w-3 h-2"></div>
                <div className="font-bold text-lg bg-gray-300 w-20 h-3"></div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 text-shadow-custom">
            <div className="font-bold text-2xl text-shadow bg-gray-300 w-32 h-5"></div>
            <div className="font-[600] bg-gray-300 w-72 xl:w-full h-10"></div>
          </div>
          <div className="flex flex-col lg:flex-row gap-5 lg:gap-10 text-shadow-custom">
            <div className="flex flex-col gap-3">
              <div className="font-extrabold bg-gray-300 w-40 h-3"></div>
              <div className="font-[600] bg-gray-300 w-20 h-3"></div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="font-extrabold bg-gray-300 w-40 h-3"></div>
              <div className="font-[600] bg-gray-300 w-20 h-3"></div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="font-extrabold bg-gray-300 w-40 h-3"></div>
              <div className="font-[600] bg-gray-300 w-20 h-3"></div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default MovieDetailsSkeleton;
