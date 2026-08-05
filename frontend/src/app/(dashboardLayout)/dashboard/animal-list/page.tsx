"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import DataTableHeader from "@/components/shared/DataTableHeader"
import AnimalListTable from "@/components/module/dashboard/animalList/AnimalListTable"

export default function AnimalListPage() {
    const [searchValue, setSearchValue] = useState("")
    const [selectedFilter, setSelectedFilter] = useState("all")

    return (
        <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="bg-[#FCFCFC] border border-[#EAE5DD] shadow-xs rounded-[20px] sm:rounded-[28px] p-4 sm:p-7 flex flex-col gap-5 sm:gap-6"
        >
            {/* Generic Data Table Header */}
            <DataTableHeader
                title="Total Animals"
                totalCount={12600}
                searchValue={searchValue}
                onSearchChange={setSearchValue}
                selectedFilter={selectedFilter}
                onFilterChange={setSelectedFilter}
                filterOptions={[
                    { label: "All", value: "all" },
                    { label: "Active", value: "active" },
                    { label: "Inactive", value: "inactive" },
                    { label: "Pending", value: "pending" },
                ]}
            />

            {/* Farmers Table */}
            <AnimalListTable
                searchValue={searchValue}
                selectedFilter={selectedFilter}
                hideHeaderControls={true}
            />
        </motion.section>
    )
}