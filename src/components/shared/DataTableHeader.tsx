"use client"

import * as React from "react"
import { Search, Filter, ChevronDown } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Kbd, KbdGroup } from "@/components/ui/kbd"

export interface FilterOption {
    label: string
    value: string
}

export interface DataTableHeaderProps {
    /** The title of the entity (e.g., "Farmers", "Products", "Users") */
    title?: string
    /** Total count of items */
    totalCount?: number
    /** Controlled search input value */
    searchValue?: string
    /** Search input placeholder text */
    searchPlaceholder?: string
    /** Search value change handler */
    onSearchChange?: (value: string) => void
    /** Selected filter option value */
    selectedFilter?: string
    /** Array of available filter options */
    filterOptions?: FilterOption[]
    /** Filter selection change handler */
    onFilterChange?: (filter: string) => void
    /** Optional keyboard shortcut hint (e.g. "⌘ K") */
    shortcutHint?: string
    /** Optional extra elements to render on the right (e.g., Export/Add buttons) */
    actions?: React.ReactNode
}

const DEFAULT_FILTER_OPTIONS: FilterOption[] = [
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
]

export default function DataTableHeader({
    title = "Items",
    totalCount,
    searchValue = "",
    searchPlaceholder = "Search...",
    onSearchChange,
    selectedFilter = "all",
    filterOptions = DEFAULT_FILTER_OPTIONS,
    onFilterChange,
    shortcutHint = "⌘ K",
    actions,
}: DataTableHeaderProps) {
    const currentLabel =
        filterOptions.find((opt) => opt.value === selectedFilter)?.label || "All"

    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 pb-1">
            {/* Title & Count */}
            <div className="flex items-center gap-2">
                <h1 className="text-sm font-semibold text-primary">
                    {title}
                </h1>
                {totalCount !== undefined && (
                    <span className="text-sm font-medium text-primary">
                        ( {totalCount.toLocaleString()} )
                    </span>
                )}
            </div>

            {/* Controls Container */}
            <div className="flex flex-row items-center gap-2 sm:gap-3 w-full sm:w-auto justify-end">
                {/* Search Bar */}
                {onSearchChange && (
                    <div className="relative flex items-center w-full sm:w-64 md:w-72">
                        <Search className="absolute left-3 w-4 h-4 text-[#A3A3A3] pointer-events-none z-10" />
                        <Input
                            type="text"
                            value={searchValue}
                            onChange={(e) => onSearchChange(e.target.value)}
                            placeholder={searchPlaceholder}
                            className="h-9 pl-9 pr-12 text-xs sm:text-sm bg-[#F8F7F7] border-[#E2E2E2] text-[#1A1A1A] placeholder:text-[#A3A3A3] focus-visible:ring-0 focus-visible:border-[#ECECEC] focus-visible:bg-white transition-all"
                        />
                        {shortcutHint && (
                            <Kbd className="absolute right-2.5 z-10 text-[10px] font-semibold text-[#737373] bg-[#F1F1F1] border border-[#D5CFB6]">
                                {shortcutHint}
                            </Kbd>
                        )}
                    </div>
                )}

                {/* Filter Dropdown */}
                {onFilterChange && filterOptions.length > 0 && (
                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center gap-2 h-9 px-3.5 bg-white border border-[#E5E0D8] rounded-[10px] text-xs sm:text-sm font-medium text-[#1A1A1A] hover:bg-[#F7F4EE] transition-colors outline-none cursor-pointer">
                            <Filter className="w-3.5 h-3.5 text-[#525252]" />
                            <span>{currentLabel}</span>
                            <ChevronDown className="w-3.5 h-3.5 text-[#737373] ml-1" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="end"
                            className="w-36 bg-white border border-[#EAE5DD] shadow-md rounded-lg p-1 z-30"
                        >
                            {filterOptions.map((opt) => (
                                <DropdownMenuItem
                                    key={opt.value}
                                    onClick={() => onFilterChange(opt.value)}
                                    className="px-3 py-1.5 text-xs font-medium text-[#525252] hover:bg-[#F7F4EE] hover:text-[#1A1A1A] rounded-lg cursor-pointer transition-colors"
                                >
                                    {opt.label}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}

                {/* Custom Actions Slot (e.g. Add Button, Export Button) */}
                {actions}
            </div>
        </div>
    )
}