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

const formSchema = z.object({
  source: z.string(),
  events: z
    .array(z.string().min(1))
    .min(1)
    .nonempty("Please select at least one event."),
  callback_url: z.string(),
});

const SubscriptionDetails = () => {
  const sourceList = [
    {
      id: "2f978c43-45e6-4c45-8a8f-3971c882339a",
      created_at: "2024-11-30T06:35:01.232Z",
      status: "active",
      name: "Stripe",
      description:
        "Stripe is a payment processing platform that enables businesses to accept online payments.",
      events: [
        "PAYMENT_SUCCEEDED",
        "PAYMENT_FAILED",
        "REFUND_CREATED",
        "SUBSCRIPTION_CANCELED",
      ],
      thumbnail: "https://d21r3yo3pas5u.cloudfront.net/webhook/stripe.png",
    },
    {
      id: "f2f29b40-f3fb-4184-8942-557092154a63",
      created_at: "2024-11-30T06:35:01.232Z",
      status: "active",
      name: "Discord",
      description:
        "Discord is a communication platform for gamers, with text, voice, and video chat.",
      events: [
        "MESSAGE_CREATED",
        "USER_JOINED",
        "USER_LEFT",
        "MESSAGE_DELETED",
      ],
      thumbnail: "https://d21r3yo3pas5u.cloudfront.net/webhook/discord.png",
    },
    {
      id: "2afd870d-fb21-4fc6-9022-ade305a81a6a",
      created_at: "2024-11-30T06:35:01.232Z",
      status: "active",
      name: "GitHub",
      description:
        "GitHub is a platform for version control and collaboration, allowing developers to work together on projects.",
      events: [
        "PUSH",
        "ISSUE_OPENED",
        "PULL_REQUEST_MERGED",
        "REPOSITORY_CREATED",
      ],
      thumbnail: "https://d21r3yo3pas5u.cloudfront.net/webhook/github.png",
    },
    {
      id: "6dea7582-e9f6-4c3f-ab20-a59db368efe7",
      created_at: "2024-11-30T06:35:01.232Z",
      status: "active",
      name: "PayPal",
      description:
        "PayPal is an online payment system that supports online money transfers.",
      events: ["PAYMENT_RECEIVED", "PAYMENT_REFUNDED", "INVOICE_PAID"],
      thumbnail: "https://d21r3yo3pas5u.cloudfront.net/webhook/paypal.png",
    },
    {
      id: "94e9773f-1829-49de-9a02-c0114f3f56a8",
      created_at: "2024-11-30T06:35:01.232Z",
      status: "active",
      name: "Twilio",
      description:
        "Twilio is a cloud communications platform that provides APIs for sending messages, making calls, and more.",
      events: [
        "SMS_SENT",
        "CALL_RECEIVED",
        "CALL_COMPLETED",
        "MESSAGE_DELIVERED",
      ],
      thumbnail: "https://d21r3yo3pas5u.cloudfront.net/webhook/twilio.png",
    },
  ];

  const [eventList, setEventList] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      source: "",
      events: [],
      callback_url: "https://example.com/callback-url",
    },
  });

  const { watch, setValue } = form;

  // Watch the selected source
  const selectedSource = watch("source");

  useEffect(() => {
    // Find the events for the selected source
    const source = sourceList.find((item) => item.id === selectedSource);
    if (source) {
      setEventList(source.events);
      setValue("events", [""]);
    } else {
      setEventList([]);
    }
  }, [selectedSource]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
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
              control={form.control}
              name="events"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Events</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={eventList.map((item) => {
                        return { label: item, value: item };
                      })}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      placeholder="Select options"
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
            <Button className="w-full" type="submit">
              Subscribe
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SubscriptionDetails;
