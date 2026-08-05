"use client"

import * as React from "react"
import ResuableTable, { TableColumn } from "@/components/shared/ResuableTable"
import { Avatar } from "@/components/ui/avatar"
import { MoreVertical, Eye, Edit, Trash2, CalendarCheck, CheckCircle2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export interface FarmerItem {
  id: string
  farmerId: string
  name: string
  email: string
  avatar?: string
  verified?: boolean
  phone: string
  address: string
  animals: number
  tasks: string
  appointments: number
}

const MOCK_FARMERS: FarmerItem[] = Array.from({ length: 12 }, (_, index) => ({
  id: `farmer-${index + 1}`,
  farmerId: "#33512345",
  name: "Ramesh Kumar",
  email: "r.kumar20@gmail.com",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
  verified: index % 3 === 0,
  phone: "+8801936589746",
  address: "Holding No. 105/19K, Maji...",
  animals: 12,
  tasks: "15 tasks",
  appointments: 35,
}))

export interface FarmersTableProps {
  searchValue?: string
  selectedFilter?: string
  hideHeaderControls?: boolean
}

export default function FarmersTable({
  searchValue = "",
  selectedFilter = "all",
  hideHeaderControls = false,
}: FarmersTableProps) {
  const [currentPage, setCurrentPage] = React.useState(1)
  const [selectedIds, setSelectedIds] = React.useState<(string | number)[]>([])

  const filteredData = React.useMemo(() => {
    return MOCK_FARMERS.filter((farmer) => {
      const matchesSearch =
        farmer.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        farmer.email.toLowerCase().includes(searchValue.toLowerCase()) ||
        farmer.phone.includes(searchValue) ||
        farmer.farmerId.includes(searchValue)

      if (selectedFilter === "active") return matchesSearch && farmer.verified
      if (selectedFilter === "inactive") return matchesSearch && !farmer.verified
      return matchesSearch
    })
  }, [searchValue, selectedFilter])

  const columns: TableColumn<FarmerItem>[] = [
    {
      key: "farmerId",
      header: "Farmer ID",
      cell: (item) => (
        <span className="font-bold text-[#1A1A1A]">{item.farmerId}</span>
      ),
    },
    {
      key: "name",
      header: "Farmer Name",
      cell: (item) => (
        <div className="flex items-center gap-3">
          <Avatar
            src={item.avatar}
            alt={item.name}
            fallback={item.name.charAt(0)}
            size="md"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-[#1A1A1A] text-sm leading-tight">
                {item.name}
              </span>
              {/* {item.verified && (
                <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#DCFCE7] text-[#166534] border border-[#BBF7D0]">
                  <CheckCircle2 className="w-2.5 h-2.5" />
                  Verified
                </span>
              )} */}
            </div>
            <span className="text-xs text-[#737373] font-normal leading-tight">
              {item.email}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: "phone",
      header: "Phone No.",
      cell: (item) => (
        <span className="font-medium text-[#1A1A1A]">{item.phone}</span>
      ),
    },
    {
      key: "address",
      header: "Address",
      cell: (item) => (
        <span className="text-[#1A1A1A] max-w-[200px] truncate block">
          {item.address}
        </span>
      ),
    },
    {
      key: "animals",
      header: "No.of Animals",
      align: "center",
      cell: (item) => (
        <span className="font-medium text-[#1A1A1A]">{item.animals}</span>
      ),
    },
    {
      key: "tasks",
      header: "Added Tasks",
      align: "center",
      cell: (item) => (
        <span className="font-medium text-[#1A1A1A]">{item.tasks}</span>
      ),
    },
    {
      key: "appointments",
      header: "Appointments",
      align: "center",
      cell: (item) => (
        <span className="font-medium text-[#1A1A1A]">{item.appointments}</span>
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
          <DropdownMenuContent align="end" className="w-44 bg-white border border-[#EAE5DD] shadow-lg rounded-xl p-1 z-30">
            <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-[#1A1A1A] hover:bg-[#F7F4EE] rounded-lg cursor-pointer">
              <Eye className="w-3.5 h-3.5 text-[#525252]" />
              <span>View Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-[#1A1A1A] hover:bg-[#F7F4EE] rounded-lg cursor-pointer">
              <CalendarCheck className="w-3.5 h-3.5 text-[#525252]" />
              <span>View Appointments</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-[#1A1A1A] hover:bg-[#F7F4EE] rounded-lg cursor-pointer">
              <Edit className="w-3.5 h-3.5 text-[#525252]" />
              <span>Edit Farmer</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg cursor-pointer">
              <Trash2 className="w-3.5 h-3.5 text-red-600" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  return (
    <ResuableTable<FarmerItem>
      title={hideHeaderControls ? undefined : "Total Farmers"}
      totalCount={hideHeaderControls ? undefined : 8000}
      data={filteredData}
      columns={columns}
      getRowKey={(item) => item.id}
      selectedIds={selectedIds}
      onSelectionChange={setSelectedIds}
      currentPage={currentPage}
      totalPages={40}
      onPageChange={setCurrentPage}
    />
  )
}
