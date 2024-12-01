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

interface EventHistory {
  id: string;
  created_at: string;
  event: string;
  description: string;
  payload: {
    event: string;
    source: string;
    payload: unknown;
  };
  subscription: {
    id: string;
    created_at: string;
    status: string;
    events?: string[] | null;
    callback_url: string;
    source: {
      id: string;
      created_at: string;
      status: string;
      name: string;
      description: string;
      events?: string[] | null;
      thumbnail: string;
    };
  };
}

const eventHistory: EventHistory[] = [
  {
    id: "92ee6562-0150-4f15-81f5-69c79ad3ebd1",
    created_at: "2024-11-30T15:19:35.919Z",
    event: "PAYMENT_SUCCEEDED",
    description: "Stripe event occurred",
    payload: {
      event: "PAYMENT_SUCCEEDED",
      source: "Stripe",
      payload: {
        amount: 5000,
        currency: "USD",
        customer: "customer_123",
        transactionId: "txn_001",
      },
    },
    subscription: {
      id: "fd20c9cc-3e83-44ab-8790-0df498059c32",
      created_at: "2024-11-30T07:41:47.221Z",
      status: "active",
      events: ["PAYMENT_SUCCEEDED"],
      callback_url: "https://example.dev/callback-url",
      source: {
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
    },
  },
  {
    id: "fa4ea869-9fea-42d6-9be1-03b25e1484e2",
    created_at: "2024-11-30T15:19:35.493Z",
    event: "PAYMENT_SUCCEEDED",
    description: "Stripe event occurred",
    payload: {
      event: "PAYMENT_SUCCEEDED",
      source: "Stripe",
      payload: {
        amount: 5000,
        currency: "USD",
        customer: "customer_123",
        transactionId: "txn_001",
      },
    },
    subscription: {
      id: "fd20c9cc-3e83-44ab-8790-0df498059c32",
      created_at: "2024-11-30T07:41:47.221Z",
      status: "active",
      events: ["PAYMENT_SUCCEEDED"],
      callback_url: "https://example.dev/callback-url",
      source: {
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
    },
  },
  {
    id: "6b7f81cc-98ad-459e-8878-f4a4aa5f1c27",
    created_at: "2024-11-30T15:19:34.948Z",
    event: "PAYMENT_SUCCEEDED",
    description: "Stripe event occurred",
    payload: {
      event: "PAYMENT_SUCCEEDED",
      source: "Stripe",
      payload: {
        amount: 5000,
        currency: "USD",
        customer: "customer_123",
        transactionId: "txn_001",
      },
    },
    subscription: {
      id: "fd20c9cc-3e83-44ab-8790-0df498059c32",
      created_at: "2024-11-30T07:41:47.221Z",
      status: "active",
      events: ["PAYMENT_SUCCEEDED"],
      callback_url: "https://example.dev/callback-url",
      source: {
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
    },
  },
  {
    id: "dd6c4109-2c4a-4e7c-a629-793b8af9674c",
    created_at: "2024-11-30T15:19:34.304Z",
    event: "PAYMENT_SUCCEEDED",
    description: "Stripe event occurred",
    payload: {
      event: "PAYMENT_SUCCEEDED",
      source: "Stripe",
      payload: {
        amount: 5000,
        currency: "USD",
        customer: "customer_123",
        transactionId: "txn_001",
      },
    },
    subscription: {
      id: "fd20c9cc-3e83-44ab-8790-0df498059c32",
      created_at: "2024-11-30T07:41:47.221Z",
      status: "active",
      events: ["PAYMENT_SUCCEEDED"],
      callback_url: "https://example.dev/callback-url",
      source: {
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
    },
  },
  {
    id: "6e85f2df-0d05-4aa6-a703-8c84ba2431a1",
    created_at: "2024-11-30T15:19:19.721Z",
    event: "PAYMENT_SUCCEEDED",
    description: "Stripe event occurred",
    payload: {
      event: "PAYMENT_SUCCEEDED",
      source: "Stripe",
      payload: {
        amount: 5000,
        currency: "USD",
        customer: "customer_123",
        transactionId: "txn_001",
      },
    },
    subscription: {
      id: "fd20c9cc-3e83-44ab-8790-0df498059c32",
      created_at: "2024-11-30T07:41:47.221Z",
      status: "active",
      events: ["PAYMENT_SUCCEEDED"],
      callback_url: "https://example.dev/callback-url",
      source: {
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
    },
  },
  {
    id: "be330c2e-d9e6-45f9-b3a1-eea2487bad4c",
    created_at: "2024-11-30T15:19:04.049Z",
    event: "PAYMENT_SUCCEEDED",
    description: "Stripe event occurred",
    payload: {
      event: "PAYMENT_SUCCEEDED",
      source: "Stripe",
      payload: {
        amount: 5000,
        currency: "USD",
        customer: "customer_123",
        transactionId: "txn_001",
      },
    },
    subscription: {
      id: "fd20c9cc-3e83-44ab-8790-0df498059c32",
      created_at: "2024-11-30T07:41:47.221Z",
      status: "active",
      events: ["PAYMENT_SUCCEEDED"],
      callback_url: "https://example.dev/callback-url",
      source: {
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
    },
  },
  {
    id: "ba059ed7-5f53-4493-b3f6-b4bdfba6996b",
    created_at: "2024-11-30T15:17:51.880Z",
    event: "PAYMENT_SUCCEEDED",
    description: "Stripe event occurred",
    payload: {
      event: "PAYMENT_SUCCEEDED",
      source: "Stripe",
      payload: {
        amount: 5000,
        currency: "USD",
        customer: "customer_123",
        transactionId: "txn_001",
      },
    },
    subscription: {
      id: "fd20c9cc-3e83-44ab-8790-0df498059c32",
      created_at: "2024-11-30T07:41:47.221Z",
      status: "active",
      events: ["PAYMENT_SUCCEEDED"],
      callback_url: "https://example.dev/callback-url",
      source: {
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
    },
  },
  {
    id: "ce2fcba6-c1e5-4fe3-b429-30a3964ca357",
    created_at: "2024-11-30T15:16:27.818Z",
    event: "PAYMENT_SUCCEEDED",
    description: "Stripe event occurred",
    payload: {
      event: "PAYMENT_SUCCEEDED",
      source: "Stripe",
      payload: {
        amount: 5000,
        currency: "USD",
        customer: "customer_123",
        transactionId: "txn_001",
      },
    },
    subscription: {
      id: "fd20c9cc-3e83-44ab-8790-0df498059c32",
      created_at: "2024-11-30T07:41:47.221Z",
      status: "active",
      events: ["PAYMENT_SUCCEEDED"],
      callback_url: "https://example.dev/callback-url",
      source: {
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
    },
  },
];

const Home = () => {
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
          {eventHistory.map((item) => (
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
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Home;
