import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { MultiSelect } from "@/components/multi-select";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { createSubscription } from "@/api/subscription.service";
import { useNavigate } from "react-router-dom";
import { ISource } from "@/types";
import { getUnSubscribedService } from "@/api/source.service";

const formSchema = z.object({
  source: z.string(),
  events: z
    .array(z.string().min(1))
    .min(1)
    .nonempty("Please select at least one event."),
  callback_url: z.string(),
});

const SubscriptionDetails = () => {
  const navigate = useNavigate();
  const [sourceList, setSourceList] = useState<ISource[]>([]);
  const [eventList, setEventList] = useState<string[]>([]);

  const [isSubscribedToAll, setIsSubscribedToAll] = useState(false);

  const fetchService = async () => {
    const result = await getUnSubscribedService();

    if (result.data.length == 0 && result.status == 1) {
      setIsSubscribedToAll(true);
    }
    setSourceList(result.data);
  };

  useEffect(() => {
    fetchService();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      source: "",
      events: [],
      callback_url: "http://localhost:4000/callback",
    },
  });

  const { watch } = form;

  // Watch the selected source
  const selectedSource = watch("source");

  useEffect(() => {
    const source = sourceList.find((item) => item.id === selectedSource);
    if (source) {
      setEventList(source.events);
      form.setValue("events", []);
    } else {
      setEventList([]);
    }
  }, [selectedSource, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await createSubscription(values);

    if (response.status) {
      navigate("/subscription");
    }
  }

  return (
    <div className="container mx-auto p-10">
      <h1 className="text-3xl font-bold mb-6 text-zinc-900">
        Add Subscription
      </h1>
      <div className="mt-8 sm:w-full sm:max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="source"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Source</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isSubscribedToAll}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sourceList.map((item) => {
                        return (
                          <SelectItem value={item.id} key={item.id}>
                            <div className="flex gap-4">
                              <img
                                src={item.thumbnail}
                                className="w-6 h-6"
                              ></img>
                              <p>{item.name}</p>
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={isSubscribedToAll}
              control={form.control}
              name="events"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Events</FormLabel>
                  <FormControl>
                    <MultiSelect
                      disabled={isSubscribedToAll}
                      options={eventList.map((item) => {
                        return { label: item, value: item };
                      })}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      placeholder="Select Events"
                      className="text-zinc-800 font-normal"
                      variant="inverted"
                      maxCount={10}
                    />
                  </FormControl>
                  <FormDescription>
                    Choose the events you are interested in.
                  </FormDescription>
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
                      disabled={isSubscribedToAll}
                    />
                  </FormControl>
                  <FormDescription>
                    Backend simply forwards the data to this URL after receiving
                    them from the webhook simulator.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full"
              type={isSubscribedToAll ? "reset" : "submit"}
            >
              {isSubscribedToAll
                ? "You have subscribed to all the services"
                : "Subscribe"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SubscriptionDetails;
