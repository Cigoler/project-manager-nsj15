"use client";

import * as React from "react";
import {
  BookOpen,
  Bot,
  LifeBuoy,
  Send,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { RovtechLogo } from "./rovtech-logo";

const data = {
  user: {
    name: "seyed",
    email: "sa@rov.tech",
    avatar: "/avatars/sa.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Settings",
          url: "/settings",
        },
      ],
    },
    {
      title: "Contacts",
      url: "/contacts",
      icon: Bot,
      items: [
        {
          title: "Organisations",
          url: "/contacts/organisations",
        },
        {
          title: "People",
          url: "/contacts/people",
        },
      ],
    },
    {
      title: "Projects",
      url: "/projects",
      icon: BookOpen,
      items: [
        {
          title: "All Projects",
          url: "/projects",
        },
        {
          title: "New Project",
          url: "/projects/new",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "/support",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "/feedback",
      icon: Send,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <RovtechLogo />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    Project Manager
                  </span>
                  <span className="truncate text-xs">Rovtech Solutions</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain title="Main" items={data.navMain} />
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}
