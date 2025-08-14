"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { formatPrice, calculateBondingCurvePrice } from "../lib/utils";

interface Creator {
  name: string;
  username: string;
  profilePictureUrl: string;
}

interface Community {
  communityId: string;
  name: string;
  description: string;
  creator: Creator;
  currentSupply: number;
  maxSupply: number;
  basePrice: number;
  tokenSymbol: string;
}

interface CommunityCardProps {
  community: Community;
  onBuyKey: (communityId: string) => void;
}

export function CommunityCard({ community, onBuyKey }: CommunityCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const currentPrice = calculateBondingCurvePrice(community.currentSupply, community.basePrice);

  const handleBuyKey = async () => {
    try {
      setIsLoading(true);
      setError(null);
      // Simulate blockchain transaction delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      onBuyKey(community.communityId);
    } catch (err) {
      setError("Transaction failed. Please try again.");
      console.error("Buy key error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full h-full flex flex-col hover:border-primary/20 transition-all">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={community.creator.profilePictureUrl} alt={community.creator.name} />
            <AvatarFallback>{community.creator.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-lg">{community.name}</CardTitle>
            <p className="text-sm text-muted">by {community.creator.name}</p>
          </div>
          <div className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium">
            {community.tokenSymbol}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 space-y-4">
        <p className="text-sm text-muted">{community.description}</p>
        
        <div className="flex items-center justify-between bg-bg/80 rounded-md p-3">
          <div>
            <p className="text-sm text-muted">Current Price</p>
            <p className="text-lg font-bold text-primary">{formatPrice(currentPrice)}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted">Members</p>
            <p className="text-lg font-medium">
              <span>{community.currentSupply}</span>
              <span className="text-sm text-muted">/{community.maxSupply}</span>
            </p>
          </div>
        </div>
        
        {error && (
          <div className="p-2 bg-destructive/10 text-sm text-destructive rounded-md">
            {error}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={handleBuyKey}
          isLoading={isLoading}
        >
          Buy Access Key
        </Button>
      </CardFooter>
    </Card>
  );
}
