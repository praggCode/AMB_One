"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
    LayoutDashboard,
    History,
    LogOut,
    Moon,
    Sun,
    Ambulance,
    User,
    Settings,
    ChevronRight,
    Menu
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/common/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/common/ui/dropdown-menu";
import { Button } from "@/common/ui/button";

export default function Sidebar({ links, user, logout }) {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    const getInitials = (name) => {
        if (!name) return "U";
        return name
            .split(" ")
            .map((word) => word[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    const displayName = user?.name || (user?.fullname?.firstName ? `${user.fullname.firstName} ${user.fullname.lastName}` : "User");
    const displayEmail = user?.email || "";

    const SidebarContent = () => (
        <div className="flex flex-col h-full bg-sidebar border-r border-sidebar-border text-sidebar-foreground">
            {/* Header / Logo */}
            <div className="p-6 flex items-center gap-3 border-b border-sidebar-border/50">
                <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                    <Ambulance className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                    <h1 className="font-bold text-lg tracking-tight">AmbuConnect</h1>
                    <p className="text-xs text-muted-foreground font-medium">Emergency Service</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-2 mt-2">
                    Menu
                </div>
                {links.map((link) => {
                    // Check if the current path starts with the link href (for nested routes)
                    // But exact match for dashboard to avoid it being active everywhere
                    const isActive = link.href === pathname || (link.href !== '/user/dashboard' && link.href !== '/driver/dashboard' && pathname.startsWith(link.href));

                    // Map labels to icons if not provided
                    let Icon = LayoutDashboard;
                    if (link.label.toLowerCase().includes("history")) Icon = History;
                    if (link.label.toLowerCase().includes("ambulance") || link.label.toLowerCase().includes("request")) Icon = Ambulance;
                    if (link.label.toLowerCase().includes("settings")) Icon = Settings;

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${isActive
                                ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                                : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                                }`}
                        >
                            <Icon className={`h-5 w-5 ${isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-sidebar-accent-foreground"}`} />
                            <span className="font-medium text-sm">{link.label}</span>
                            {isActive && <ChevronRight className="ml-auto h-4 w-4 opacity-50" />}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer Actions */}
            <div className="p-4 border-t border-sidebar-border/50 space-y-4">

                {/* Theme Toggle - Disabled for now */}
                {/* 
                <div className="flex items-center justify-between px-2 py-2 bg-sidebar-accent/50 rounded-lg">
                    <span className="text-sm font-medium ml-2">App Theme</span>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleTheme}
                        className="h-8 w-8 rounded-full bg-background border border-border hover:bg-accent"
                    >
                        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-amber-500" />
                        <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-primary" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                </div> 
                */}

                {/* User Profile */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="flex items-center gap-3 w-full p-2 rounded-xl hover:bg-sidebar-accent transition-colors text-left group">
                            <Avatar className="h-10 w-10 border-2 border-border group-hover:border-primary/50 transition-colors">
                                <AvatarImage src={user?.avatar} />
                                <AvatarFallback className="bg-primary/10 text-primary font-bold">
                                    {getInitials(displayName)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold truncate group-hover:text-primary transition-colors">{displayName}</p>
                                <p className="text-xs text-muted-foreground truncate">{displayEmail}</p>
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-56" side="right" sideOffset={10}>
                        <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer">
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile Header */}
            <div className="lg:hidden flex items-center justify-between p-4 bg-background border-b sticky top-0 z-50">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                        <Ambulance className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <span className="font-bold">Ambulance</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    <Menu className="h-6 w-6" />
                </Button>
            </div>

            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
            )}

            {/* Sidebar Container */}
            <aside className={`
        fixed top-0 left-0 z-50 h-screen w-72 bg-sidebar border-r border-sidebar-border transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
                <SidebarContent />
            </aside>
        </>
    );
}
