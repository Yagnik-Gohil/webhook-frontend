import { CirclePlus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MultiSelect } from "@/components/multi-select";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { ISubscription } from "@/types";
import {
  deleteSubscription,
  getSubscription,
  updateSubscription,
} from "@/api/subscription.service";
import DataNotFound from "@/components/DataNotFound";

const formSchema = z.object({
  source: z.string().uuid(),
  events: z
    .array(z.string().min(1))
    .min(1)
    .nonempty("Please select at least one event."),
  callback_url: z.string(),
});

const Subscription = () => {
  const navigate = useNavigate();

  const [list, setList] = useState<ISubscription[]>([]);

  const [allEventList, setAllEventList] = useState<string[]>([]);
  const [selectedEventList, setSelectedEventList] = useState<string[]>([]);
  const [selected, setSelected] = useState<ISubscription | null>(null);

  const fetchList = async () => {
    const result = await getSubscription();
    setList(result.data);
  };

  const handleEventList = (subscription: ISubscription) => {
    setSelected(subscription);
    setAllEventList(subscription.source.events);
    setSelectedEventList(subscription.events);
  };

  const handleDelete = async () => {
    if (selected) {
      const result = await deleteSubscription(selected.id);
      if (result.status) {
        setSelected(null);
        fetchList();
      }
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      source: selected?.source.id,
      events: selected?.events,
      callback_url: selected?.callback_url,
    },
  });

  useEffect(() => {
    if (selected) {
      form.reset({
        source: selected.source.id,
        events: selected.events,
        callback_url: selected.callback_url,
      });
    }
  }, [selected, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (selected) {
      const response = await updateSubscription(selected.id, values);
      if (response.status) {
        window.location.reload();
      }
    }
  }

  return (
    <div className="container mx-auto p-10">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-6 text-zinc-900">
          Subscribed Services
        </h1>
        <Button
          variant="outline"
          onClick={() => navigate("/subscription/create")}
        >
          <CirclePlus className="h-4 w-4 mr-1" /> Add New Subscription
        </Button>
      </div>
      <Sheet>
        <AlertDialog>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Callback URL</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {list.length > 0 ? (
                list.map((subscription) => (
                  <TableRow key={subscription.id}>
                    <TableCell className="font-medium flex items-center gap-2">
                      <img
                        src={subscription.source.thumbnail}
                        alt={`${subscription.source.name} thumbnail`}
                        className="w-10 h-10 object-cover rounded"
                      />
                      {subscription.source.name}
                    </TableCell>
                    <TableCell>{subscription.callback_url}</TableCell>
                    <TableCell>
                      {new Date(subscription.created_at).toDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <SheetTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="ml-2"
                          onClick={() => handleEventList(subscription)}
                        >
                          <Pencil className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </SheetTrigger>

                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="ml-2"
                          onClick={() => setSelected(subscription)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    <DataNotFound message="You haven't subscribed to any service."></DataNotFound>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action will delete the subscription to service.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit Events</SheetTitle>
            <SheetDescription>Add or remove events.</SheetDescription>
          </SheetHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="events"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Events</FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={allEventList.map((item) => {
                          return { label: item, value: item };
                        })}
                        onValueChange={field.onChange}
                        defaultValue={selectedEventList}
                        placeholder="Select Events"
                        className="text-zinc-800 font-normal"
                        variant="inverted"
                        maxCount={10}
                        value={selectedEventList}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="callback_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Callback URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com/callback"
                        {...field}
                        value={form.watch("callback_url")}
                      />
                    </FormControl>
                    <FormDescription>
                      Backend simply forwards the data to this URL after
                      receiving them from the webhook simulator.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" type="submit">
                Save
              </Button>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Subscription;
