import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";

const Pagination = ({
  offset,
  limit,
  total,
  setOffset,
  setLimit,
  handlePreviousPage,
  handleNextPage,
}: {
  offset: number;
  limit: number;
  total: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
}) => {
  const recordsPerPageOptions = [5, 10, 15, 20];

  // Calculate the range of items being displayed
  const start = total === 0 ? 0 : offset + 1;
  const end = Math.min(offset + limit, total);

  return (
    <div className="flex justify-between items-center mt-4 p-4 gap-4 font-medium border border-gray-300 rounded-lg shadow-md bg-white absolute">
      <div className="flex items-center space-x-2">
        <Select
          onValueChange={(value) => {
            setLimit(Number(value)); // Update the limit
            setOffset(0); // Reset offset to 0
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder={String(limit)} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup className="font-medium">
              {recordsPerPageOptions.map((option) => (
                <SelectItem key={option} value={String(option)}>
                  {option}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center">
        <Button
          onClick={handlePreviousPage}
          disabled={offset === 0}
          className="rounded-full h-8 w-8 bg-zinc-700 text-white hover:bg-zinc-800 transition duration-200"
        >
          <CircleArrowLeft />
        </Button>
        <span className="text-zinc-700 font-semibold mx-4">
          Page {Math.floor(offset / limit) + 1} of {Math.ceil(total / limit)}
        </span>
        <Button
          onClick={handleNextPage}
          disabled={offset + limit >= total}
          className="rounded-full h-8 w-8 bg-zinc-700 text-white hover:bg-zinc-800 transition duration-200"
        >
          <CircleArrowRight />
        </Button>
      </div>

      <div className="text-gray-700 font-medium">
        {total > 0
          ? `Showing ${start} to ${end} of ${total} entries`
          : "No entries to display"}
      </div>
    </div>
  );
};

export default Pagination;
