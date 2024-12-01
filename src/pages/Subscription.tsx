import { CirclePlus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";

interface Subscription {
  id: string;
  created_at: string;
  status: string;
  events: string[];
  callback_url: string;
  source: {
    id: string;
    created_at: string;
    status: string;
    name: string;
    description: string;
    events: string[];
    thumbnail: string;
  };
}

const subscriptions: Subscription[] = [
  {
    id: "317a6561-ab7f-49b9-be64-7349b5ab9424",
    created_at: "2024-11-30T07:22:17.010Z",
    status: "active",
    events: [
      "PAYMENT_SUCCEEDED",
      "PAYMENT_FAILED",
      "REFUND_CREATED",
      "SUBSCRIPTION_CANCELED",
    ],
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
];

const Subscription = () => {
  const navigate = useNavigate();

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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Service</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subscriptions.map((subscription) => (
            <TableRow key={subscription.id}>
              <TableCell className="font-medium flex items-center gap-2">
                <img
                  src={subscription.source.thumbnail}
                  alt={`${subscription.source.name} thumbnail`}
                  className="w-10 h-10 object-cover rounded"
                />
                {subscription.source.name}
              </TableCell>
              <TableCell>
                {new Date(subscription.created_at).toDateString()}
              </TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="sm" className="ml-2">
                  <Pencil className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="ml-2">
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Subscription;
