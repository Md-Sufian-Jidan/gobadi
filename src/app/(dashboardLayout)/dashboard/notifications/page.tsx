"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Plus } from "lucide-react"
import DataTableHeader from "@/components/shared/DataTableHeader"
import NotificationsTable from "@/components/module/dashboard/notifications/NotificationsTable"
import AddNotificationModal, {
  NotificationItem,
} from "@/components/module/dashboard/notifications/AddNotificationModal"

export default function NotificationsPage() {
  const [searchValue, setSearchValue] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [totalCount, setTotalCount] = useState(120)

  const handleAdd = useCallback((notification: Omit<NotificationItem, "id">) => {
    // The table manages its own localStorage, we trigger it via window proxy
    const addFn = (window as unknown as Record<string, unknown>).__addNotification
    if (typeof addFn === "function") {
      ;(addFn as (n: Omit<NotificationItem, "id">) => void)(notification)
    }
  }, [])

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="bg-[#FCFCFC] border border-[#EAE5DD] shadow-xs rounded-[20px] sm:rounded-[28px] p-4 sm:p-7 flex flex-col gap-5 sm:gap-6"
      >
        {/* Page Header */}
        <DataTableHeader
          title="Total Notifications"
          totalCount={totalCount}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
          filterOptions={[
            { label: "All", value: "all" },
            { label: "Once", value: "once" },
            { label: "Weekly", value: "weekly" },
            { label: "Monthly", value: "monthly" },
            { label: "Yearly", value: "yearly" },
          ]}
          actions={
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 h-9 px-4 rounded-xl bg-[#F0EDE8] border border-[#E5E0D8] text-xs sm:text-sm font-semibold text-[#1A1A1A] hover:bg-[#E5E0D8] transition-colors cursor-pointer whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              Add New Notification
            </button>
          }
        />

        {/* Notifications Table */}
        <NotificationsTable
          searchValue={searchValue}
          selectedFilter={selectedFilter}
          hideHeaderControls
          onDataChange={setTotalCount}
        />
      </motion.section>

      {/* Add Notification Modal */}
      <AddNotificationModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onAdd={handleAdd}
      />
    </>
  )
}