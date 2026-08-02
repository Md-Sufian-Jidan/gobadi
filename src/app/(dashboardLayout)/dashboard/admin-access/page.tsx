"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Plus } from "lucide-react"
import DataTableHeader from "@/components/shared/DataTableHeader"
import AdminTable from "@/components/module/dashboard/adminAccess/AdminTable"
import AddAdminModal from "@/components/module/dashboard/adminAccess/AddAdminModal"
import type { AdminFormData } from "@/components/module/dashboard/adminAccess/AddAdminModal"

export default function AdminAccessPage() {
    const [searchValue, setSearchValue] = useState("")
    const [selectedFilter, setSelectedFilter] = useState("all")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [totalCount, setTotalCount] = useState(0)

    const handleAdd = useCallback((admin: AdminFormData) => {
        const addFn = (window as unknown as Record<string, unknown>).__addAdmin
        if (typeof addFn === "function") {
            ;(addFn as (a: AdminFormData) => void)(admin)
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
                    title="Admin List"
                    totalCount={totalCount}
                    searchValue={searchValue}
                    onSearchChange={setSearchValue}
                    selectedFilter={selectedFilter}
                    onFilterChange={setSelectedFilter}
                    filterOptions={[
                        { label: "All", value: "all" },
                        { label: "Active", value: "active" },
                        { label: "Inactive", value: "inactive" },
                    ]}
                    actions={
                        <button
                            type="button"
                            id="add-new-admin-btn"
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center gap-2 h-9 px-4 rounded-xl bg-[#F0EDE8] border border-[#E5E0D8] text-xs sm:text-sm font-semibold text-[#1A1A1A] hover:bg-[#E5E0D8] transition-colors cursor-pointer whitespace-nowrap"
                        >
                            <Plus className="w-4 h-4" />
                            Add New Admin
                        </button>
                    }
                />

                {/* Admin Table */}
                <AdminTable
                    searchValue={searchValue}
                    selectedFilter={selectedFilter}
                    hideHeaderControls
                    onDataChange={setTotalCount}
                />
            </motion.section>

            {/* Add Admin Modal */}
            <AddAdminModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                onAdd={handleAdd}
            />
        </>
    )
}