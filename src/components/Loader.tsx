export default function Loader() {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-full ">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      <div className="text-2xl font-normal text-gray-900 tracking-wider m-4">
        Loading...
      </div>
    </div>
  );
}
