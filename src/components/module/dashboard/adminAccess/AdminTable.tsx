"use client"

import * as React from "react"
import Image from "next/image"
import ResuableTable, { TableColumn } from "@/components/shared/ResuableTable"
import { MoreVertical, Eye, Edit, Trash2, ShieldCheck, ShieldOff } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────
export interface AdminItem {
    id: string
    officeId: string
    firstName: string
    lastName: string
    email: string
    avatar?: string
    role: "SUPER ADMIN" | "ADMIN"
    designation: string
    status: "Active" | "Inactive"
}

// ─── Storage helpers ──────────────────────────────────────────────────────────
const STORAGE_KEY = "gobadi_admins"

function generateId(): string {
    return `#${Math.floor(33000000 + Math.random() * 9999999)}`
}

function loadFromStorage(): AdminItem[] {
    if (typeof window === "undefined") return []
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        return raw ? JSON.parse(raw) : []
    } catch {
        return []
    }
}

function saveToStorage(items: AdminItem[]) {
    if (typeof window === "undefined") return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

// ─── Seed data ────────────────────────────────────────────────────────────────
const DEMO_AVATARS = [
    "https://api.dicebear.com/9.x/avataaars/svg?seed=admin1",
    "https://api.dicebear.com/9.x/avataaars/svg?seed=admin2",
    "https://api.dicebear.com/9.x/avataaars/svg?seed=admin3",
    "https://api.dicebear.com/9.x/avataaars/svg?seed=admin4",
]

function buildSeedData(): AdminItem[] {
    return [
        {
            id: generateId(),
            officeId: "#33512345",
            firstName: "Demo",
            lastName: "User 1",
            email: "asample.user1@gmail.com",
            avatar: DEMO_AVATARS[0],
            role: "SUPER ADMIN",
            designation: "Founder",
            status: "Active",
        },
        {
            id: generateId(),
            officeId: "#33512345",
            firstName: "Demo",
            lastName: "User 2",
            email: "asample.user2@gmail.com",
            avatar: DEMO_AVATARS[1],
            role: "ADMIN",
            designation: "Founder",
            status: "Active",
        },
        {
            id: generateId(),
            officeId: "#33512345",
            firstName: "Demo",
            lastName: "User 3",
            email: "asample.user3@gmail.com",
            avatar: DEMO_AVATARS[2],
            role: "ADMIN",
            designation: "Co-Founder",
            status: "Active",
        },
        {
            id: generateId(),
            officeId: "#33512345",
            firstName: "Demo",
            lastName: "User 4",
            email: "asample.user4@gmail.com",
            avatar: DEMO_AVATARS[3],
            role: "ADMIN",
            designation: "Co-Founder",
            status: "Active",
        },
    ]
}

// ─── Status Badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: "Active" | "Inactive" }) {
    return (
        <span
            className={cn(
                "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold",
                status === "Active"
                    ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                    : "bg-red-50 text-red-600 ring-1 ring-red-200"
            )}
        >
            <span
                className={cn(
                    "w-1.5 h-1.5 rounded-full",
                    status === "Active" ? "bg-emerald-500" : "bg-red-500"
                )}
            />
            {status}
        </span>
    )
}

// ─── Role Badge ───────────────────────────────────────────────────────────────
function RoleBadge({ role }: { role: "SUPER ADMIN" | "ADMIN" }) {
    return (
        <span
            className={cn(
                "inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold tracking-wide",
                role === "SUPER ADMIN"
                    ? "bg-amber-50 text-amber-700 ring-1 ring-amber-200"
                    : "bg-sky-50 text-sky-700 ring-1 ring-sky-200"
            )}
        >
            {role}
        </span>
    )
}

// ─── Props ────────────────────────────────────────────────────────────────────
export interface AdminTableProps {
    searchValue?: string
    selectedFilter?: string
    hideHeaderControls?: boolean
    onDataChange?: (count: number) => void
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function AdminTable({
    searchValue = "",
    selectedFilter = "all",
    hideHeaderControls = false,
    onDataChange,
}: AdminTableProps) {
    const [currentPage, setCurrentPage] = React.useState(1)
    const [selectedIds, setSelectedIds] = React.useState<(string | number)[]>([])
    const [admins, setAdmins] = React.useState<AdminItem[]>([])
    const [hydrated, setHydrated] = React.useState(false)

    // Load from localStorage on mount
    React.useEffect(() => {
        const stored = loadFromStorage()
        if (stored.length === 0) {
            const seed = buildSeedData()
            saveToStorage(seed)
            setAdmins(seed)
        } else {
            setAdmins(stored)
        }
        setHydrated(true)
    }, [])

    // Notify parent of count
    React.useEffect(() => {
        if (hydrated) {
            onDataChange?.(admins.length)
        }
    }, [admins.length, hydrated, onDataChange])

    // Expose addAdmin method via window proxy
    const addAdmin = React.useCallback(
        (item: Omit<AdminItem, "id" | "officeId">) => {
            const newItem: AdminItem = {
                ...item,
                id: generateId(),
                officeId: `#${Math.floor(33000000 + Math.random() * 9999999)}`,
            }
            setAdmins((prev) => {
                const updated = [newItem, ...prev]
                saveToStorage(updated)
                return updated
            })
        },
        []
    )

    React.useEffect(() => {
        ; (window as unknown as Record<string, unknown>).__addAdmin = addAdmin
        return () => {
            delete (window as unknown as Record<string, unknown>).__addAdmin
        }
    }, [addAdmin])

    const handleDelete = (id: string) => {
        setAdmins((prev) => {
            const updated = prev.filter((a) => a.id !== id)
            saveToStorage(updated)
            return updated
        })
    }

    const handleToggleStatus = (id: string) => {
        setAdmins((prev) => {
            const updated = prev.map((a) =>
                a.id === id
                    ? { ...a, status: a.status === "Active" ? "Inactive" : "Active" as "Active" | "Inactive" }
                    : a
            )
            saveToStorage(updated)
            return updated
        })
    }

    // Filter by search & status filter
    const filteredData = React.useMemo(() => {
        return admins.filter((a) => {
            // Status filter
            if (selectedFilter !== "all") {
                const filterLower = selectedFilter.toLowerCase()
                if (a.status.toLowerCase() !== filterLower) return false
            }

            // Search filter
            if (!searchValue.trim()) return true
            const q = searchValue.toLowerCase()
            return (
                `${a.firstName} ${a.lastName}`.toLowerCase().includes(q) ||
                a.email.toLowerCase().includes(q) ||
                a.officeId.toLowerCase().includes(q) ||
                a.role.toLowerCase().includes(q) ||
                a.designation.toLowerCase().includes(q)
            )
        })
    }, [admins, searchValue, selectedFilter])

    const columns: TableColumn<AdminItem>[] = [
        {
            key: "officeId",
            header: "Office ID",
            cell: (item) => (
                <span className="font-bold text-[#1A1A1A] text-sm">{item.officeId}</span>
            ),
        },
        {
            key: "name",
            header: "Name",
            cell: (item) => (
                <div className="flex items-center gap-3 min-w-[180px]">
                    <div className="relative w-9 h-9 rounded-full overflow-hidden bg-[#F0EDE8] flex-shrink-0 ring-1 ring-[#EAE5DD]">
                        {item.avatar ? (
                            <Image
                                src={item.avatar}
                                alt={`${item.firstName} ${item.lastName}`}
                                fill
                                className="object-cover"
                                unoptimized
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-sm font-bold text-[#525252]">
                                {item.firstName[0]}{item.lastName[0]}
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col leading-tight">
                        <span className="font-semibold text-[#1A1A1A] text-sm whitespace-nowrap">
                            {item.firstName.toUpperCase()} {item.lastName.toUpperCase()}
                        </span>
                        <span className="text-[#737373] text-xs">{item.email}</span>
                    </div>
                </div>
            ),
        },
        {
            key: "role",
            header: "Role",
            align: "center",
            cell: (item) => <RoleBadge role={item.role} />,
        },
        {
            key: "designation",
            header: "Designation",
            align: "center",
            cell: (item) => (
                <span className="text-[#1A1A1A] text-sm">{item.designation}</span>
            ),
        },
        {
            key: "status",
            header: "Status",
            align: "center",
            cell: (item) => <StatusBadge status={item.status} />,
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
                            <Edit className="w-3.5 h-3.5 text-[#525252]" />
                            <span>Edit Admin</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => handleToggleStatus(item.id)}
                            className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-[#1A1A1A] hover:bg-[#F7F4EE] rounded-lg cursor-pointer"
                        >
                            {item.status === "Active" ? (
                                <>
                                    <ShieldOff className="w-3.5 h-3.5 text-amber-600" />
                                    <span>Deactivate</span>
                                </>
                            ) : (
                                <>
                                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                                    <span>Activate</span>
                                </>
                            )}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => handleDelete(item.id)}
                            className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                        >
                            <Trash2 className="w-3.5 h-3.5 text-red-600" />
                            <span>Delete Admin</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        },
    ]

    return (
        <ResuableTable<AdminItem>
            title={hideHeaderControls ? undefined : "Admin List"}
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
}
