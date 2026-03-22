"use client";

import { useEffect, useMemo, useState } from "react";

import OrdersHeader from "@/components/admin/commandes/OrdersHeader";
import OrdersToolbar from "@/components/admin/commandes/OrdersToolbar";
import OrdersStatusFilters from "@/components/admin/commandes/OrdersStatusFilters";
import OrdersList from "@/components/admin/commandes/OrdersList";
import OrderDetailsModal from "@/components/admin/commandes/OrderDetailsModal";
import DeleteOrderModal from "@/components/admin/commandes/DeleteOrderModal";

import {
  normalizeOrders,
  filterOrders,
  getCountByStatus,
} from "@/lib/admin/commandes/ordersUtils";
import {
  getOrdersFromStorage,
  saveOrdersToStorage,
} from "@/lib/api/admin/orders";

export default function AdminCommandesPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedMode, setSelectedMode] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderToDelete, setOrderToDelete] = useState(null);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const storedOrders = await getOrdersFromStorage();
        setOrders(normalizeOrders(storedOrders));
      } catch {
        setOrders([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadOrders();
  }, []);

  const persistOrders = async (updatedOrders) => {
    setOrders(updatedOrders);
    await saveOrdersToStorage(updatedOrders);
  };

  const filteredOrders = useMemo(() => {
    return filterOrders(orders, selectedStatus, selectedMode, searchTerm);
  }, [orders, selectedStatus, selectedMode, searchTerm]);

  const handleUpdateStatus = async (orderId, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );

    await persistOrders(updatedOrders);

    if (selectedOrder?.id === orderId) {
      const updatedSelectedOrder = updatedOrders.find(
        (order) => order.id === orderId
      );
      setSelectedOrder(updatedSelectedOrder || null);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    const updatedOrders = orders.filter((order) => order.id !== orderId);

    await persistOrders(updatedOrders);

    if (selectedOrder?.id === orderId) {
      setSelectedOrder(null);
    }

    setOrderToDelete(null);
  };

  const handleGetCountByStatus = (status) => {
    return getCountByStatus(orders, status);
  };

  return (
    <>
      <div>
        <OrdersHeader />

        <OrdersToolbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedMode={selectedMode}
          setSelectedMode={setSelectedMode}
          isLoading={isLoading}
        />

        <OrdersStatusFilters
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          getCountByStatus={handleGetCountByStatus}
          isLoading={isLoading}
        />

        <OrdersList
          orders={filteredOrders}
          isLoading={isLoading}
          onView={setSelectedOrder}
          onDelete={setOrderToDelete}
          onUpdateStatus={handleUpdateStatus}
        />
      </div>

      <OrderDetailsModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onUpdateStatus={handleUpdateStatus}
      />

      <DeleteOrderModal
        order={orderToDelete}
        onClose={() => setOrderToDelete(null)}
        onConfirm={handleDeleteOrder}
      />
    </>
  );
}