import * as React from "react";
import { cn } from "@/lib/utils";

export const SidebarProvider = ({ children }) => <>{children}</>;
export const Sidebar = ({ children, className }) => <aside className={cn("", className)}>{children}</aside>;
export const SidebarContent = ({ children, className }) => <div className={cn("", className)}>{children}</div>;
export const SidebarGroup = ({ children }) => <div>{children}</div>;
export const SidebarGroupLabel = ({ children }) => <div>{children}</div>;
export const SidebarGroupContent = ({ children }) => <div>{children}</div>;
export const SidebarMenu = ({ children }) => <ul>{children}</ul>;
export const SidebarMenuItem = ({ children }) => <li>{children}</li>;
export const SidebarMenuButton = ({ children, className, ...props }) => <button className={cn("", className)} {...props}>{children}</button>;
export const SidebarTrigger = () => null;
