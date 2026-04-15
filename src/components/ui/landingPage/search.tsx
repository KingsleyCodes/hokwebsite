import { Search } from "lucide-react";

export default function SearchComponent() {
  return (
    <div className="outline-burntOrange font-montserrat relative mx-auto mt-12 max-w-xl rounded-full font-medium outline-1">
      <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
      <input
        type="text"
        placeholder="Search"
        className="w-full rounded-full border border-gray-200 py-2 pr-4 pl-10 focus:ring-1 focus:ring-black focus:outline-none"
      />
    </div>
  );
}
