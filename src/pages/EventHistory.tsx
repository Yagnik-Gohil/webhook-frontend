import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Delete, Eye } from "lucide-react";
import Pagination from "@/components/Pagination";
import { useEffect, useState } from "react";
import { IEventHistory, ISource } from "@/types";
import { getEventHistory } from "@/api/event-history.service";
import { getSubscribedService } from "@/api/source.service";
import DataNotFound from "@/components/DataNotFound";

const EventHistory = () => {
  const [serviceList, setServiceList] = useState<ISource[]>([]);
  const [eventList, setEventList] = useState<string[]>([]);

  const [list, setList] = useState<IEventHistory[]>([]);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [source, setSource] = useState<string | undefined>(undefined);
  const [event, setEvent] = useState<string | undefined>(undefined);

  const fetchList = async () => {
    const result = await getEventHistory(limit, offset, source, event);
    setList(result.data);
    setTotal(result.total);
  };

  const fetchService = async () => {
    const result = await getSubscribedService();
    setServiceList(result.data);
  };

  useEffect(() => {
    fetchService();
  }, []);

  const handleSource = (value: string) => {
    setSource(value);
    setEvent(undefined);

    const service = serviceList.find((item) => item.id == value);
    if (service) {
      setEventList(service.events);
    }
    setOffset(0);
  };

  const handleEvent = (value: string) => {
    setEvent(value);
    setOffset(0);
  };

  const handleReset = () => {
    window.location.reload();
  };

  useEffect(() => {
    fetchList();
  }, [limit, offset, source, event]);

  const handleNextPage = () => {
    if (offset + limit < total) {
      setOffset((prevOffset) => prevOffset + limit);
    }
  };

  const handlePreviousPage = () => {
    if (offset > 0) {
      setOffset((prevOffset) => prevOffset - limit);
    }
  };
  return (
    <div className="container mx-auto p-10">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-6 text-zinc-900">Event History</h1>

        <div className="flex flex-row gap-2">
          <Select onValueChange={handleSource} value={source}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Service" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {serviceList.map((service) => (
                  <SelectItem value={service.id} key={service.id}>
                    <div className="flex gap-4">
                      <img
                        src={service.thumbnail}
                        className="w-6 h-6"
                        alt={service.name}
                      />
                      <p>{service.name}</p>
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select onValueChange={handleEvent} value={event}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Event" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {eventList.map((event) => (
                  <SelectItem value={event} key={event}>
                    <p>{event}</p>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={handleReset}>
            <Delete />
            Clear Filter
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Service</TableHead>
            <TableHead>Event</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-end">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {list.length > 0 ? (
            list.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium flex items-center gap-2">
                  <img
                    src={item.subscription.source.thumbnail}
                    alt={`${item.payload.source} thumbnail`}
                    className="w-10 h-10 object-cover rounded"
                  />
                  {item.payload.source}
                </TableCell>
                <TableCell>{item.payload.event}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>
                  {new Date(item.created_at).toDateString()}
                  {" | "}
                  {new Date(item.created_at).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                </TableCell>
                <TableCell className="text-end">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm" className="ml-2">
                        <Eye className="h-4 w-4" />
                        View
                      </Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Response from webhook</SheetTitle>
                        <pre className="overflow-x-auto text-sm p-2 bg-zinc-800 rounded-md select-text">
                          <SheetDescription className="bg-zinc-900 text-white p-4 rounded-md shadow-md">
                            <code>{JSON.stringify(item.payload, null, 2)}</code>
                          </SheetDescription>
                        </pre>
                      </SheetHeader>
                    </SheetContent>
                  </Sheet>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                <DataNotFound></DataNotFound>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Pagination
        offset={offset}
        limit={limit}
        total={total}
        setOffset={setOffset}
        setLimit={setLimit}
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
      />
    </div>
  );
};

export default EventHistory;
