"use client";

import { useEffect, useMemo, useState } from "react";

import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import DashboardStats from "@/components/admin/dashboard/DashboardStats";
import CategoryChartCard from "@/components/admin/dashboard/CategoryChartCard";
import AvailabilityChartCard from "@/components/admin/dashboard/AvailabilityChartCard";
import PriceChartCard from "@/components/admin/dashboard/PriceChartCard";
import LastOrderCard from "@/components/admin/dashboard/LastOrderCard";
import RecentCoffeesTable from "@/components/admin/dashboard/RecentCoffeesTable";
import QuickActionsCard from "@/components/admin/dashboard/QuickActionsCard";
import AdminAlertsCard from "@/components/admin/dashboard/AdminAlertsCard";
import CoffeesToWatchCard from "@/components/admin/dashboard/CoffeesToWatchCard";

import { getCategoryLabel } from "@/lib/admin/dashboard/helpers";
import {
  normalizeCoffees,
  buildStats,
  buildCategoryChartData,
  buildAvailabilityChartData,
  buildPriceRangeChartData,
  buildRecentCoffees,
  buildDashboardCards,
  buildAdminAlerts,
  buildCoffeesToWatch,
} from "@/lib/admin/dashboard/dashboardUtils";
import { getCafes } from "@/lib/api/admin/cafes";
import { getDashboardData } from "@/lib/api/admin/dashboard";

export default function AdminDashboardPage() {
  const [dashboardData, setDashboardData] = useState({
    lastOrder: null,
    addons: [],
    users: [],
    orders: [],
  });

  const [cafes, setCafes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [dashboard, cafesData] = await Promise.all([
          getDashboardData(),
          getCafes(),
        ]);

        setDashboardData(dashboard);
        setCafes(Array.isArray(cafesData) ? cafesData : []);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const normalizedCoffees = useMemo(() => normalizeCoffees(cafes), [cafes]);

  const stats = useMemo(() => {
    return buildStats(normalizedCoffees, dashboardData);
  }, [normalizedCoffees, dashboardData]);

  const categoryChartData = useMemo(() => {
    return buildCategoryChartData(normalizedCoffees, getCategoryLabel);
  }, [normalizedCoffees]);

  const availabilityChartData = useMemo(() => {
    return buildAvailabilityChartData(stats);
  }, [stats]);

  const priceRangeChartData = useMemo(() => {
    return buildPriceRangeChartData(normalizedCoffees);
  }, [normalizedCoffees]);

  const recentCoffees = useMemo(() => {
    return buildRecentCoffees(normalizedCoffees);
  }, [normalizedCoffees]);

  const dashboardCards = useMemo(() => {
    return buildDashboardCards(stats);
  }, [stats]);

  const adminAlerts = useMemo(() => {
    return buildAdminAlerts(normalizedCoffees);
  }, [normalizedCoffees]);

  const coffeesToWatch = useMemo(() => {
    return buildCoffeesToWatch(normalizedCoffees);
  }, [normalizedCoffees]);

  return (
    <div className="w-full min-w-0 overflow-x-hidden">
      <DashboardHeader />

      <DashboardStats cards={dashboardCards} isLoading={isLoading} />

      <div className="mb-8 grid gap-5 xl:grid-cols-[1.4fr_1fr]">
        <CategoryChartCard
          categoryChartData={categoryChartData}
          isLoading={isLoading}
        />
        <AvailabilityChartCard
          availabilityChartData={availabilityChartData}
          isLoading={isLoading}
        />
      </div>

      <div className="mb-8 grid gap-5 xl:grid-cols-[1.2fr_1fr]">
        <PriceChartCard
          priceRangeChartData={priceRangeChartData}
          isLoading={isLoading}
        />
        <LastOrderCard
          lastOrder={dashboardData.lastOrder}
          isLoading={isLoading}
        />
      </div>

      <div className="mb-8 grid gap-5 xl:grid-cols-[1.2fr_1fr]">
        <RecentCoffeesTable
          recentCoffees={recentCoffees}
          isLoading={isLoading}
        />
        <QuickActionsCard />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_1.2fr]">
        <AdminAlertsCard
          adminAlerts={adminAlerts}
          isLoading={isLoading}
        />
        <CoffeesToWatchCard
          coffeesToWatch={coffeesToWatch}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}