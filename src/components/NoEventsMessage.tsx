import { Button } from "@/components/ui/button";  // Assuming you have a Button component
import { useNavigate } from "react-router-dom";  // For navigation

const NoEventsMessage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center p-6 bg-gray-100 border border-dashed rounded-md mt-8">
      <div className="text-center">
        <h2 className="text-lg font-medium text-zinc-900 mb-4">
          If you do not receive any events, try subscribing to events from the subscription page...
        </h2>
        <p className="text-sm clear-start pb-6">Hint: Subscribe to all services to receive more events</p>
        <Button
          variant="outline"
          onClick={() => navigate("/subscription")}  // Navigates to the subscription page
        >
          Go to Subscription Page
        </Button>
      </div>
    </div>
  );
};

export default NoEventsMessage;
