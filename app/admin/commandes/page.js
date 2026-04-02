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
        setIsLoading(true);

        const res = await fetch("/api/orders", {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
          cache: "no-store",
        });

        const data = await res.json();

        if (!res.ok) {
          console.error("Failed to load orders:", data);
          setOrders([]);
          return;
        }

        const safeOrders = Array.isArray(data) ? data : data.orders || [];
        setOrders(normalizeOrders(safeOrders));
      } catch (error) {
        console.error("Load orders error:", error);
        setOrders([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    return filterOrders(orders, selectedStatus, selectedMode, searchTerm);
  }, [orders, selectedStatus, selectedMode, searchTerm]);

  const handleUpdateStatus = async (orderId, newStatus) => {
  try {
    const res = await fetch(`/api/orders/${orderId}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        status: newStatus,
      }),
    });

    const text = await res.text();
    const data = text ? JSON.parse(text) : {};

    if (!res.ok) {
      console.error("Update status error:", data);
      alert(data.message || "Erreur lors de la mise à jour du statut");
      return;
    }

    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );

    setOrders(updatedOrders);

    if (selectedOrder?.id === orderId) {
      const updatedSelectedOrder = updatedOrders.find(
        (order) => order.id === orderId
      );
      setSelectedOrder(updatedSelectedOrder || null);
    }
  } catch (error) {
    console.error("Update status error:", error);
    alert("Server error");
  }
};

  const handleDeleteOrder = async (orderId) => {
    console.log("delete orderId =", orderId);
  try {
    const res = await fetch(`/api/orders/${orderId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
      },
    });

    const text = await res.text();
    const data = text ? JSON.parse(text) : {};

    if (!res.ok) {
      console.error("Delete order error:", data);
      alert(data.message || "Erreur lors de la suppression");
      return;
    }

    const updatedOrders = orders.filter((order) => order.id !== orderId);
    setOrders(updatedOrders);

    if (selectedOrder?.id === orderId) {
      setSelectedOrder(null);
    }

    setOrderToDelete(null);
  } catch (error) {
    console.error("Delete order error:", error);
    alert("Server error");
  }
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