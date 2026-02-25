import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import type { PanelSize } from "react-resizable-panels";
import { Outlet } from "react-router-dom";
import LeftSidebar from "./LeftSidebar";
import Topbar from "@/components/Topbar";
import { SignedIn } from "@clerk/clerk-react";
import FriendsActivity from "@/components/FriendsActivity";
import { useEffect, useState } from "react";

const MainLayout = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [leftPanelSize, setLeftPanelSize] = useState(20);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="h-screen bg-black text-white flex flex-col">
      <Topbar />
      <ResizablePanelGroup
        orientation="horizontal"
        className="flex-1 flex h-full overflow-hidden p-2"
      >
        {/* left sidebar */}
        <ResizablePanel
          defaultSize="20%"
          minSize={isMobile ? "0%" : "5%"}
          maxSize="30%"
          onResize={(panelSize: PanelSize) =>
            setLeftPanelSize(panelSize.asPercentage)
          }
        >
          <LeftSidebar isCollapsed={leftPanelSize < 12} />
        </ResizablePanel>

        <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />

        {/* Main content */}
        <ResizablePanel defaultSize={isMobile ? "80%" : "60%"}>
          <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent">
            <Outlet />
          </div>
        </ResizablePanel>

        {!isMobile && (
          <>
            <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />

            {/* right sidebar - only visible to logged in users */}
            <ResizablePanel
              defaultSize="20%"
              minSize="0%"
              maxSize="25%"
              collapsedSize="0%"
            >
              <SignedIn>
                <FriendsActivity />
              </SignedIn>
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>
    </div>
  );
};
export default MainLayout;
