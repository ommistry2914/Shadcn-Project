import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  const chatbots = [
    { id: 1, name: "Support Bot", description: "Handles customer support queries." },
    { id: 2, name: "Sales Bot", description: "Assists with product recommendations." },
    { id: 3, name: "HR Bot", description: "Helps with HR-related inquiries." },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen p-6">
      <Card className="w-full max-w-2xl p-6 shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Dashboard</h1>
        
        {/* Chatbots List */}
        <div className="space-y-4">
          {chatbots.map((bot) => (
            <Card key={bot.id} className="p-4">
              <CardHeader>
                <CardTitle>{bot.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{bot.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add New Chatbot Button */}
        <div className="mt-6 flex justify-center">
          <Button variant="default">Add New Chatbot</Button>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
