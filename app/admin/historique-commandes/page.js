"use client";

import { useEffect, useMemo, useState } from "react";

import OrdersHeader from "@/components/admin/commandes/OrdersHeader";
import OrdersToolbar from "@/components/admin/commandes/OrdersToolbar";
import OrdersStatusFilters from "@/components/admin/commandes/OrdersStatusFilters";
import OrdersList from "@/components/admin/commandes/OrdersList";
import OrderDetailsModal from "@/components/admin/commandes/OrderDetailsModal";
import toast from "react-hot-toast";
import HistorySummaryChart from "@/components/admin/commandes/HistorySummaryChart";

import {
  normalizeOrders,
  filterOrders,
  getCountByStatus,
} from "@/lib/admin/commandes/ordersUtils";

export default function AdminHistoriqueCommandesPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedMode, setSelectedMode] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [dateFrom, setDateFrom] = useState("");
const [dateTo, setDateTo] = useState("");

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setIsLoading(true);

        const token = sessionStorage.getItem("token");

        const res = await fetch("/backend/admin/orders", {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        });

        const data = await res.json();

        if (!res.ok) {
          console.error("Failed to load archived orders:", data);
          setOrders([]);
          return;
        }

        const safeOrders = Array.isArray(data) ? data : data.orders || [];
        const normalized = normalizeOrders(safeOrders);

        const archivedOnly = normalized.filter(
          (order) => order.isArchived === true
        );

        setOrders(archivedOnly);
      } catch (error) {
        console.error("Load archived orders error:", error);
        setOrders([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadOrders();
  }, []);

  const filteredOrders = useMemo(() => {
  return filterOrders(
    orders,
    selectedStatus,
    selectedMode,
    searchTerm,
    dateFrom,
    dateTo
  );
}, [orders, selectedStatus, selectedMode, searchTerm, dateFrom, dateTo]);



const historyStats = useMemo(() => {
  const totalOrders = filteredOrders.length;

  const totalRevenue = filteredOrders.reduce((sum, order) => {
    return sum + Number(order.total || order.totalPrice || 0);
  }, 0);

  return {
    totalOrders,
    totalRevenue,
  };
}, [filteredOrders]);

  const handleUpdateStatus = async () => {
    toast.error("Les commandes archivées ne peuvent pas être modifiées");
  };

  const handleGetCountByStatus = (status) => {
    return getCountByStatus(orders, status);
  };

  return (
    <>
      <div>
        <OrdersHeader
          title="Historique des commandes"
          description="Consultez les commandes terminées ou annulées."
        />

        <div className="mb-4 rounded-2xl border border-dark/10 bg-white/50 px-4 py-3 text-sm text-dark/70">
  Les commandes dans l’historique sont en lecture seule.
</div>

        <OrdersToolbar
  searchTerm={searchTerm}
  setSearchTerm={setSearchTerm}
  selectedMode={selectedMode}
  setSelectedMode={setSelectedMode}
  dateFrom={dateFrom}
  setDateFrom={setDateFrom}
  dateTo={dateTo}
  setDateTo={setDateTo}
  showModeFilter={false}
  isLoading={isLoading}
/>


<div className="mb-4 grid gap-4 md:grid-cols-2">
  <div className="rounded-3xl border border-dark/10 bg-white/40 p-5 shadow-sm">
    <p className="text-sm text-dark/60">Commandes dans l’historique</p>
    <p className="mt-2 text-3xl font-bold text-dark">
      {historyStats.totalOrders}
    </p>
    <p className="mt-3 text-sm text-dark/65">
      Résultat selon les filtres appliqués
    </p>
  </div>

  <div className="rounded-3xl border border-dark/10 bg-white/40 p-5 shadow-sm">
    <p className="text-sm text-dark/60">Revenus dans l’historique</p>
    <p className="mt-2 text-3xl font-bold text-dark">
      {historyStats.totalRevenue.toFixed(2)} DT
    </p>
    <p className="mt-3 text-sm text-dark/65">
      Total des commandes affichées
    </p>
  </div>
</div>

<div className="mb-6">
  <HistorySummaryChart
    totalOrders={historyStats.totalOrders}
    totalRevenue={historyStats.totalRevenue}
  />
</div>

        <OrdersStatusFilters
  selectedStatus={selectedStatus}
  setSelectedStatus={setSelectedStatus}
  getCountByStatus={handleGetCountByStatus}
  isLoading={isLoading}
  variant="history"
/>

        <OrdersList
          orders={filteredOrders}
          isLoading={isLoading}
          onView={setSelectedOrder}
          onDelete={null}
          onUpdateStatus={handleUpdateStatus}
        />
      </div>

      <OrderDetailsModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onUpdateStatus={handleUpdateStatus}
      />
    </>
  );
}