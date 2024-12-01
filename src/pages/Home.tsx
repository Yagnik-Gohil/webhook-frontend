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
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useEffect } from "react";
import { connectSocket } from "@/api/socket.service";
import { IEvent } from "@/types";
import NoEventsMessage from "@/components/NoEventsMessage";
import { useDispatch, useSelector } from "react-redux";
import { addEvent } from "@/state/event-history/eventHistorySlice";
import { RootState } from "@/state/store";

const Home = () => {
  const dispatch = useDispatch();
  const eventHistory = useSelector(
    (state: RootState) => state.eventHistory.events
  );

  useEffect(() => {
    const socket = connectSocket();
    if (socket) {
      // Listen for webhook-event
      socket.on("webhook-event", (data: IEvent) => {
        dispatch(addEvent(data));
      });

      return () => {
        socket.off("webhook-event");
      };
    }
  }, [dispatch]);

  return (
    <div className="container mx-auto p-10">
      <h1 className="text-3xl font-bold mb-6 text-zinc-900">
        Listening to events
      </h1>
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
          {eventHistory.length > 0 ? (
            eventHistory.map((item) => (
              <TableRow key={item.payload.id}>
                <TableCell className="font-medium flex items-center gap-2">
                  <img
                    src={item.thumbnail}
                    alt={`${item.source} thumbnail`}
                    className="w-10 h-10 object-cover rounded"
                  />
                  {item.source}
                </TableCell>
                <TableCell>{item.event}</TableCell>
                <TableCell>{`${item.source} event occurred`}</TableCell>
                <TableCell>
                  {new Date().toLocaleTimeString("en-US", {
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
                <NoEventsMessage></NoEventsMessage>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Home;
