"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { formatPrice } from "../lib/utils";

interface CreatorStats {
  totalCommunities: number;
  totalRevenue: number;
  totalMembers: number;
  avgKeyPrice: number;
}

interface CreatorDashboardProps {
  stats: CreatorStats;
  onCreateCommunity: () => void;
}

export function CreatorDashboard({ 
  stats = {
    totalCommunities: 2,
    totalRevenue: 1250.75,
    totalMembers: 177,
    avgKeyPrice: 22.50
  }, 
  onCreateCommunity = () => console.log("Create community clicked")
}: Partial<CreatorDashboardProps>) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Creator Dashboard</h2>
        <Button onClick={onCreateCommunity}>
          Create New Community
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Communities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCommunities}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPrice(stats.totalRevenue)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalMembers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg Key Price</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPrice(stats.avgKeyPrice)}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
