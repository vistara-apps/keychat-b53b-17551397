
"use client";

import { useState } from "react";
import { CommunityCard } from "./community-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Search, Filter, TrendingUp } from "lucide-react";

export function Marketplace() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const mockCommunities = [
    {
      communityId: "1",
      name: "Crypto Builders",
      description: "Exclusive community for crypto developers, builders, and entrepreneurs. Share insights, collaborate on projects, and network with industry leaders.",
      creator: {
        name: "Alex Chen",
        username: "alexbuilds",
        profilePictureUrl: "/avatars/alex.png"
      },
      currentSupply: 45,
      maxSupply: 100,
      basePrice: 10.0,
      tokenSymbol: "CRYPTO"
    },
    {
      communityId: "2", 
      name: "NFT Artists Hub",
      description: "Creative space for digital artists exploring NFTs. Get feedback, find collectors, and learn about the latest trends in digital art and collectibles.",
      creator: {
        name: "Sarah Miller",
        username: "artbysarah",
        profilePictureUrl: "/avatars/sarah.png"
      },
      currentSupply: 128,
      maxSupply: 200,
      basePrice: 15.0,
      tokenSymbol: "ART"
    },
    {
      communityId: "3",
      name: "DeFi Strategists",
      description: "Advanced DeFi strategies and yield farming discussions. Share alpha, analyze protocols, and stay ahead of the curve in decentralized finance.",
      creator: {
        name: "Mike Rodriguez",
        username: "defimic",
        profilePictureUrl: "/avatars/mike.png"
      },
      currentSupply: 67,
      maxSupply: 150,
      basePrice: 25.0,
      tokenSymbol: "DEFI"
    },
    {
      communityId: "4",
      name: "Web3 Founders",
      description: "Founders building the next generation of web3 companies. Discuss fundraising, product development, and scaling strategies.",
      creator: {
        name: "Emma Thompson",
        username: "emmaweb3",
        profilePictureUrl: "/avatars/emma.png"
      },
      currentSupply: 32,
      maxSupply: 75,
      basePrice: 50.0,
      tokenSymbol: "FOUND"
    }
  ];

  const handleBuyKey = (communityId: string) => {
    console.log("Buying key for community:", communityId);
    // TODO: Implement buy key functionality
  };

  const filteredCommunities = mockCommunities.filter(community =>
    community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    community.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    community.creator.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container space-y-xl">
      <div className="text-center space-y-md">
        <h1 className="text-display">Discover Communities</h1>
        <p className="text-body text-muted max-w-2xl mx-auto">
          Join exclusive creator communities with tokenized access keys. Own your membership, share in the rewards.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted h-4 w-4" />
          <Input
            placeholder="Search communities, creators, or topics..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex items-center">
          <Filter className="h-4 w-4 mr-sm" />
          Filters
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger 
            value="all" 
            isActive={activeTab === "all"}
            onClick={() => setActiveTab("all")}
          >
            All
          </TabsTrigger>
          <TabsTrigger 
            value="trending" 
            isActive={activeTab === "trending"}
            onClick={() => setActiveTab("trending")}
          >
            <TrendingUp className="h-4 w-4 mr-1" />
            Trending
          </TabsTrigger>
          <TabsTrigger 
            value="new" 
            isActive={activeTab === "new"}
            onClick={() => setActiveTab("new")}
          >
            New
          </TabsTrigger>
          <TabsTrigger 
            value="affordable" 
            isActive={activeTab === "affordable"}
            onClick={() => setActiveTab("affordable")}
          >
            Affordable
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" isActive={activeTab === "all"}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-xl">
            {filteredCommunities.map((community) => (
              <CommunityCard
                key={community.communityId}
                community={community}
                onBuyKey={handleBuyKey}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="trending" isActive={activeTab === "trending"}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-xl">
            {filteredCommunities
              .sort((a, b) => b.currentSupply - a.currentSupply)
              .map((community) => (
                <CommunityCard
                  key={community.communityId}
                  community={community}
                  onBuyKey={handleBuyKey}
                />
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="new" isActive={activeTab === "new"}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-xl">
            {filteredCommunities
              .sort((a, b) => a.currentSupply - b.currentSupply)
              .map((community) => (
                <CommunityCard
                  key={community.communityId}
                  community={community}
                  onBuyKey={handleBuyKey}
                />
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="affordable" isActive={activeTab === "affordable"}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-xl">
            {filteredCommunities
              .sort((a, b) => a.basePrice - b.basePrice)
              .map((community) => (
                <CommunityCard
                  key={community.communityId}
                  community={community}
                  onBuyKey={handleBuyKey}
                />
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {filteredCommunities.length === 0 && (
        <div className="text-center py-xl">
          <p className="text-body text-muted">No communities found matching your search.</p>
        </div>
      )}
    </div>
  );
}
