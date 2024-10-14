import React from "react";
import { Button } from "./components/ui/button";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";

const App: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-100 to-blue-200 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Coming Soon
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-6">
            <Loader2 className="animate-spin h-16 w-16 text-blue-500 mx-auto" />
            <p className="text-lg text-gray-600">
              We're building something great.
            </p>
            <p className="text-sm text-gray-500">
              Check back soon for updates!
            </p>
          </div>
        </CardContent>
        <CardFooter className="justify-center">
          <Button variant="outline" onClick={() => window.location.reload()}>
            Refresh
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default App;
