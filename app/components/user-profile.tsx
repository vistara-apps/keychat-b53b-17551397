
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { formatPrice, formatAddress } from "@/lib/utils";
import { Key, TrendingUp, MessageCircle, ExternalLink } from "lucide-react";

export function UserProfile() {
  const [activeTab, setActiveTab] = useState("keys");

  const mockUser = {
    walletAddress: "0x1234567890abcdef1234567890abcdef12345678",
    username: "cryptofan",
    profilePictureUrl: "/avatars/user.png",
    totalValue: 1250.75,
    keysOwned: 5,
    communitiesJoined: 3
  };

  const mockOwnedKeys = [
    {
      tokenId: "1",
      community: {
        name: "Crypto Builders",
        creator: "Alex Chen",
        tokenSymbol: "CRYPTO"
      },
      purchasePrice: 12.50,
      currentValue: 18.75,
      change: "+50.0%",
      membersSince: "2024-01-15"
    },
    {
      tokenId: "2",
      community: {
        name: "NFT Artists Hub", 
        creator: "Sarah Miller",
        tokenSymbol: "ART"
      },
      purchasePrice: 22.00,
      currentValue: 31.25,
      change: "+42.0%",
      membersSince: "2024-01-20"
    },
    {
      tokenId: "3",
      community: {
        name: "DeFi Strategists",
        creator: "Mike Rodriguez", 
        tokenSymbol: "DEFI"
      },
      purchasePrice: 45.00,
      currentValue: 52.50,
      change: "+16.7%",
      membersSince: "2024-02-01"
    }
  ];

  const mockActivity = [
    {
      type: "purchase",
      community: "Crypto Builders",
      amount: 18.75,
      timestamp: "2024-02-15T10:30:00Z"
    },
    {
      type: "revenue",
      community: "NFT Artists Hub",
      amount: 2.50,
      timestamp: "2024-02-14T15:45:00Z"
    },
    {
      type: "price_change",
      community: "DeFi Strategists", 
      amount: 7.50,
      timestamp: "2024-02-13T09:15:00Z"
    }
  ];

  return (
    <div className="container space-y-xl">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-lg">
            <Avatar className="h-16 w-16">
              <AvatarImage src={mockUser.profilePictureUrl} alt={mockUser.username} />
              <AvatarFallback className="bg-primary text-white text-h3">
                {mockUser.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle className="text-h2">@{mockUser.username}</CardTitle>
              <CardDescription className="flex items-center mt-sm">
                {formatAddress(mockUser.walletAddress)}
                <ExternalLink className="h-4 w-4 ml-sm" />
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="text-h2 font-bold text-primary">
                {formatPrice(mockUser.totalValue)}
              </div>
              <div className="text-small text-muted">Portfolio Value</div>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-xl">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-sm">
            <CardTitle className="text-small font-medium">Keys Owned</CardTitle>
            <Key className="h-4 w-4 text-muted" />
          </CardHeader>
          <CardContent>
            <div className="text-h2 font-bold">{mockUser.keysOwned}</div>
            <p className="text-xs text-muted">Across {mockUser.communitiesJoined} communities</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-sm">
            <CardTitle className="text-small font-medium">Total Gains</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted" />
          </CardHeader>
          <CardContent>
            <div className="text-h2 font-bold text-accent">+$342.50</div>
            <p className="text-xs text-muted">+37.4% overall return</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-sm">
            <CardTitle className="text-small font-medium">Communities</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted" />
          </CardHeader>
          <CardContent>
            <div className="text-h2 font-bold">{mockUser.communitiesJoined}</div>
            <p className="text-xs text-muted">Active memberships</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger 
            value="keys" 
            isActive={activeTab === "keys"}
            onClick={() => setActiveTab("keys")}
          >
            My Keys
          </TabsTrigger>
          <TabsTrigger 
            value="activity" 
            isActive={activeTab === "activity"}
            onClick={() => setActiveTab("activity")}
          >
            Activity
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="keys" isActive={activeTab === "keys"}>
          <div className="space-y-md">
            {mockOwnedKeys.map((key) => (
              <Card key={key.tokenId}>
                <CardContent className="flex items-center justify-between p-xl">
                  <div className="flex-1">
                    <h3 className="text-h3 font-semibold">{key.community.name}</h3>
                    <p className="text-small text-muted mt-xs">
                      by {key.community.creator} • Member since {new Date(key.membersSince).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-xl text-center">
                    <div>
                      <div className="text-small text-muted">Purchase Price</div>
                      <div className="font-semibold">{formatPrice(key.purchasePrice)}</div>
                    </div>
                    <div>
                      <div className="text-small text-muted">Current Value</div>
                      <div className="font-semibold">{formatPrice(key.currentValue)}</div>
                    </div>
                    <div>
                      <div className="text-small text-muted">Change</div>
                      <div className="font-semibold text-accent">{key.change}</div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-sm ml-xl">
                    <Button size="sm" variant="outline">
                      Chat
                    </Button>
                    <Button size="sm" variant="outline">
                      Sell
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="activity" isActive={activeTab === "activity"}>
          <div className="space-y-md">
            {mockActivity.map((activity, index) => (
              <Card key={index}>
                <CardContent className="flex items-center justify-between p-xl">
                  <div className="flex items-center space-x-md">
                    <div className={`p-sm rounded-full ${
                      activity.type === 'purchase' ? 'bg-primary/10 text-primary' :
                      activity.type === 'revenue' ? 'bg-accent/10 text-accent' :
                      'bg-secondary/10 text-secondary'
                    }`}>
                      {activity.type === 'purchase' && <Key className="h-4 w-4" />}
                      {activity.type === 'revenue' && <TrendingUp className="h-4 w-4" />}
                      {activity.type === 'price_change' && <TrendingUp className="h-4 w-4" />}
                    </div>
                    <div>
                      <div className="font-semibold">
                        {activity.type === 'purchase' && 'Key Purchase'}
                        {activity.type === 'revenue' && 'Revenue Share'}
                        {activity.type === 'price_change' && 'Price Increase'}
                      </div>
                      <div className="text-small text-muted">{activity.community}</div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-semibold text-accent">
                      +{formatPrice(activity.amount)}
                    </div>
                    <div className="text-small text-muted">
                      {new Date(activity.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
