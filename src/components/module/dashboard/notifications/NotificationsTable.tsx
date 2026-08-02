"use client"

import * as React from "react"
import ResuableTable, { TableColumn } from "@/components/shared/ResuableTable"
import { MoreVertical, Eye, Edit, Trash2, Bell } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { NotificationItem } from "./AddNotificationModal"

// ─── Local storage helpers ─────────────────────────────────────────────────────
const STORAGE_KEY = "gobadi_notifications"

const OCCURRENCE_CYCLE = ["Once", "Monthly", "Weekly", "Yearly"]

function generateId(): string {
  return `#${Math.floor(33000000 + Math.random() * 999999)}`
}

function loadFromStorage(): NotificationItem[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveToStorage(items: NotificationItem[]) {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

// ─── Seed data (used if localStorage is empty) ────────────────────────────────
function buildSeedData(): NotificationItem[] {
  return Array.from({ length: 12 }, (_, index) => ({
    id: generateId(),
    title: "New Feature Available",
    description: "Please update the app for ge...",
    createdAt: "25/04/2026",
    sendDate: "25/04/2026",
    sendTime: "6:30 pm",
    occurrence: OCCURRENCE_CYCLE[index % 4],
    sentTo: "Farmers",
    sent: "1200 users",
    tapped: "800 users",
  }))
}

// ─── Props ────────────────────────────────────────────────────────────────────
export interface NotificationsTableProps {
  searchValue?: string
  selectedFilter?: string
  hideHeaderControls?: boolean
  onDataChange?: (count: number) => void
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function NotificationsTable({
  searchValue = "",
  selectedFilter = "all",
  hideHeaderControls = false,
  onDataChange,
}: NotificationsTableProps) {
  const [currentPage, setCurrentPage] = React.useState(1)
  const [selectedIds, setSelectedIds] = React.useState<(string | number)[]>([])
  const [notifications, setNotifications] = React.useState<NotificationItem[]>([])
  const [hydrated, setHydrated] = React.useState(false)

  // Load from localStorage on mount
  React.useEffect(() => {
    const stored = loadFromStorage()
    if (stored.length === 0) {
      const seed = buildSeedData()
      saveToStorage(seed)
      setNotifications(seed)
    } else {
      setNotifications(stored)
    }
    setHydrated(true)
  }, [])

  // Notify parent of count
  React.useEffect(() => {
    if (hydrated) {
      onDataChange?.(notifications.length)
    }
  }, [notifications.length, hydrated, onDataChange])

  // Expose addNotification method via ref-like event
  const addNotification = React.useCallback(
    (item: Omit<NotificationItem, "id">) => {
      const newItem: NotificationItem = { ...item, id: generateId() }
      setNotifications((prev) => {
        const updated = [newItem, ...prev]
        saveToStorage(updated)
        return updated
      })
    },
    []
  )

  // Register handler on the window so the page can call it
  React.useEffect(() => {
    ; (window as unknown as Record<string, unknown>).__addNotification = addNotification
    return () => {
      delete (window as unknown as Record<string, unknown>).__addNotification
    }
  }, [addNotification])

  const handleDelete = (id: string) => {
    setNotifications((prev) => {
      const updated = prev.filter((n) => n.id !== id)
      saveToStorage(updated)
      return updated
    })
  }

  const filteredData = React.useMemo(() => {
    return notifications.filter((n) => {
      if (!searchValue.trim()) return true
      const q = searchValue.toLowerCase()
      return (
        n.title.toLowerCase().includes(q) ||
        n.description.toLowerCase().includes(q) ||
        n.sentTo.toLowerCase().includes(q) ||
        n.id.includes(q)
      )
    })
  }, [notifications, searchValue])

  const columns: TableColumn<NotificationItem>[] = [
    {
      key: "id",
      header: "ID",
      cell: (item) => (
        <span className="font-bold text-[#1A1A1A]">{item.id}</span>
      ),
    },
    {
      key: "title",
      header: "Notification Title",
      cell: (item) => (
        <span className="font-semibold text-[#1A1A1A] text-sm">{item.title}</span>
      ),
    },
    {
      key: "description",
      header: "Description",
      cell: (item) => (
        <span className="text-[#525252] text-sm max-w-[180px] truncate block">
          {item.description}
        </span>
      ),
    },
    {
      key: "createdAt",
      header: "Create Date",
      align: "center",
      cell: (item) => (
        <span className="text-[#1A1A1A] text-sm">{item.createdAt}</span>
      ),
    },
    {
      key: "sendDateTime",
      header: "Send Date & Time",
      align: "center",
      cell: (item) => (
        <div className="flex flex-col items-center leading-tight">
          <span className="text-[#1A1A1A] text-sm">{item.sendDate}</span>
          <span className="text-[#737373] text-xs">{item.sendTime}</span>
        </div>
      ),
    },
    {
      key: "occurrence",
      header: "Occurrence",
      align: "center",
      cell: (item) => (
        <span className="text-[#1A1A1A] text-sm">{item.occurrence}</span>
      ),
    },
    {
      key: "sentTo",
      header: "Sent to",
      align: "center",
      cell: (item) => (
        <span className="text-[#1A1A1A] text-sm">{item.sentTo}</span>
      ),
    },
    {
      key: "sent",
      header: "Sent",
      align: "center",
      cell: (item) => (
        <span className="text-[#1A1A1A] text-sm">{item.sent}</span>
      ),
    },
    {
      key: "tapped",
      header: "Tapped",
      align: "center",
      cell: (item) => (
        <span className="text-[#1A1A1A] text-sm">{item.tapped}</span>
      ),
    },
    {
      key: "action",
      header: "Action",
      align: "center",
      cell: (item) => (
        <DropdownMenu>
          <DropdownMenuTrigger className="p-1 rounded-md text-[#525252] hover:text-[#1A1A1A] hover:bg-[#F7F4EE] transition-colors outline-none cursor-pointer">
            <MoreVertical className="w-4 h-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-44 bg-white border border-[#EAE5DD] shadow-lg rounded-xl p-1 z-30"
          >
            <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-[#1A1A1A] hover:bg-[#F7F4EE] rounded-lg cursor-pointer">
              <Eye className="w-3.5 h-3.5 text-[#525252]" />
              <span>View Details</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-[#1A1A1A] hover:bg-[#F7F4EE] rounded-lg cursor-pointer">
              <Bell className="w-3.5 h-3.5 text-[#525252]" />
              <span>Resend</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-[#1A1A1A] hover:bg-[#F7F4EE] rounded-lg cursor-pointer">
              <Edit className="w-3.5 h-3.5 text-[#525252]" />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDelete(item.id)}
              className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5 text-red-600" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  return (
    <ResuableTable<NotificationItem>
      title={hideHeaderControls ? undefined : "Total Notifications"}
      totalCount={hideHeaderControls ? undefined : filteredData.length}
      data={filteredData}
      columns={columns}
      getRowKey={(item) => item.id}
      selectedIds={selectedIds}
      onSelectionChange={setSelectedIds}
      currentPage={currentPage}
      totalPages={Math.max(1, Math.ceil(filteredData.length / 12))}
      onPageChange={setCurrentPage}
    />
  )
};
