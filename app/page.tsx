"use client";

import {
  useMiniKit,
  useAddFrame,
  useOpenUrl,
} from "@coinbase/onchainkit/minikit";
import {
  Name,
  Identity,
  Address,
  Avatar,
  EthBalance,
} from "@coinbase/onchainkit/identity";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import { useEffect, useMemo, useState, useCallback } from "react";
import { Button } from "./components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/ui/tabs";
import { Marketplace } from "./components/marketplace";
import { CreatorDashboard } from "./components/creator-dashboard";
import { UserProfile } from "./components/user-profile";
import { Home, Users, User, Plus, Key } from "lucide-react";

export default function App() {
  const { setFrameReady, isFrameReady, context } = useMiniKit();
  const [frameAdded, setFrameAdded] = useState(false);
  const [activeTab, setActiveTab] = useState("marketplace");

  const addFrame = useAddFrame();
  const openUrl = useOpenUrl();

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  const handleAddFrame = useCallback(async () => {
    const frameAdded = await addFrame();
    setFrameAdded(Boolean(frameAdded));
  }, [addFrame]);

  const saveFrameButton = useMemo(() => {
    if (context && !context.client.added) {
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleAddFrame}
          className="text-primary p-md"
        >
          <Plus className="h-4 w-4 mr-xs" />
          Save Frame
        </Button>
      );
    }

    if (frameAdded) {
      return (
        <div className="flex items-center space-x-1 text-small font-medium text-primary animate-fade-in">
          <Key className="h-4 w-4" />
          <span>Saved</span>
        </div>
      );
    }

    return null;
  }, [context, frameAdded, handleAddFrame]);

  return (
    <div className="flex flex-col min-h-screen bg-bg text-text">
      <div className="w-full max-w-screen-lg mx-auto px-4 sm:px-6 md:px-xl py-4 sm:py-lg">
        <header className="flex flex-wrap sm:flex-nowrap justify-between items-center mb-6 sm:mb-xl gap-4">
          <div className="flex items-center space-x-md">
            <div className="p-sm bg-primary rounded-md">
              <Key className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-h3 font-bold">KeyChat</h1>
              <p className="text-small text-muted">Own Your Community Access</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-md ml-auto sm:ml-0">
            {saveFrameButton}
            <Wallet className="z-10">
              <ConnectWallet>
                <Avatar className="h-8 w-8" />
                <Name className="hidden sm:inline text-inherit" />
              </ConnectWallet>
              <WalletDropdown>
                <Identity className="px-lg pt-md pb-sm" hasCopyAddressOnClick>
                  <Avatar />
                  <Name />
                  <Address />
                  <EthBalance />
                </Identity>
                <WalletDropdownDisconnect />
              </WalletDropdown>
            </Wallet>
          </div>
        </header>

        <main className="flex-1">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-6 sm:mb-xl">
              <TabsTrigger 
                value="marketplace" 
                isActive={activeTab === "marketplace"}
                onClick={() => setActiveTab("marketplace")}
                className="flex items-center justify-center space-x-sm"
              >
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Marketplace</span>
                <span className="sm:hidden">Home</span>
              </TabsTrigger>
              <TabsTrigger 
                value="creator" 
                isActive={activeTab === "creator"}
                onClick={() => setActiveTab("creator")}
                className="flex items-center justify-center space-x-sm"
              >
                <Users className="h-4 w-4" />
                <span>Creator</span>
              </TabsTrigger>
              <TabsTrigger 
                value="profile" 
                isActive={activeTab === "profile"}
                onClick={() => setActiveTab("profile")}
                className="flex items-center justify-center space-x-sm"
              >
                <User className="h-4 w-4" />
                <span>Profile</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="marketplace" isActive={activeTab === "marketplace"}>
              <Marketplace />
            </TabsContent>
            
            <TabsContent value="creator" isActive={activeTab === "creator"}>
              <CreatorDashboard />
            </TabsContent>
            
            <TabsContent value="profile" isActive={activeTab === "profile"}>
              <UserProfile />
            </TabsContent>
          </Tabs>
        </main>

        <footer className="mt-8 sm:mt-xl pt-4 sm:pt-lg flex justify-center border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted text-xs"
            onClick={() => openUrl("https://base.org/builders/minikit")}
          >
            Built on Base with MiniKit
          </Button>
        </footer>
      </div>
    </div>
  );
}
