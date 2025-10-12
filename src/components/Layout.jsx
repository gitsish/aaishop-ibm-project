import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { ReviewProvider } from "@/contexts/ReviewContext";

export const Layout = ({ children }) => {
  return (
    <ReviewProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          {children || <Outlet />}
        </main>
      </div>
    </ReviewProvider>
  );
};
