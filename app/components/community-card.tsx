"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { formatPrice, calculateBondingCurvePrice } from "../lib/utils";

interface Community {
  communityId: string;
  name: string;
  description: string;
  creatorName: string;
  creatorAvatar: string;
  currentSupply: number;
  maxSupply: number;
  initialPrice: number;
  tokenSymbol: string;
}

interface CommunityCardProps {
  community: Community;
  onJoin: (communityId: string) => void;
}

export function CommunityCard({ community, onJoin }: CommunityCardProps) {
  const currentPrice = calculateBondingCurvePrice(community.currentSupply, community.initialPrice);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={community.creatorAvatar} alt={community.creatorName} />
            <AvatarFallback>{community.creatorName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">{community.name}</CardTitle>
            <p className="text-sm text-secondary">by {community.creatorName}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-secondary mb-4">{community.description}</p>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm">Current Price:</span>
            <span className="font-medium">{formatPrice(currentPrice)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">Supply:</span>
            <span className="font-medium">{community.currentSupply}/{community.maxSupply}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">Token:</span>
            <span className="font-medium">{community.tokenSymbol}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={() => onJoin(community.communityId)}
        >
          Buy Access Key
        </Button>
      </CardFooter>
    </Card>
  );
}
