"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"
import type { AdminItem } from "@/components/module/dashboard/adminAccess/AdminTable"

// ─── Types ────────────────────────────────────────────────────────────────────
export type AdminFormData = Omit<AdminItem, "id" | "officeId">

const ROLE_OPTIONS: AdminItem["role"][] = ["SUPER ADMIN", "ADMIN"]
const DESIGNATION_OPTIONS = ["Founder", "Co-Founder", "Manager", "Developer", "Analyst", "Support"]
const STATUS_OPTIONS: AdminItem["status"][] = ["Active", "Inactive"]

const INITIAL_FORM: {
    firstName: string
    lastName: string
    email: string
    role: AdminItem["role"]
    designation: string
    status: AdminItem["status"]
} = {
    firstName: "Demo",
    lastName: "User",
    email: "",
    role: "ADMIN",
    designation: "Founder",
    status: "Active",
}

// ─── Styled Select ────────────────────────────────────────────────────────────
function StyledSelect<T extends string>({
    value,
    onChange,
    options,
    label,
    error,
}: {
    value: T
    onChange: (val: T) => void
    options: readonly T[]
    label: string
    error?: string
}) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm sm:text-base font-semibold text-[#1A1A1A]">
                {label}*
            </label>
            <div className="relative">
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value as T)}
                    className={cn(
                        "w-full h-13 appearance-none rounded-[16px] border border-[#E8E8E8] bg-white text-sm sm:text-base font-medium text-[#1A1A1A] outline-none focus:border-[#1A1A1A] shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all cursor-pointer px-4.5 pr-10",
                        error && "border-red-400"
                    )}
                >
                    {options.map((opt) => (
                        <option key={opt} value={opt}>
                            {opt}
                        </option>
                    ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#1A1A1A] pointer-events-none stroke-[2.5]" />
            </div>
            {error && <span className="text-xs text-red-500">{error}</span>}
        </div>
    )
}

// ─── Text Field ───────────────────────────────────────────────────────────────
function TextField({
    label,
    value,
    onChange,
    placeholder,
    error,
    type = "text",
}: {
    label: string
    value: string
    onChange: (val: string) => void
    placeholder?: string
    error?: string
    type?: string
}) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm sm:text-base font-semibold text-[#1A1A1A]">
                {label}*
            </label>
            <Input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className={cn(
                    "h-13 rounded-[16px] border border-[#EEEEEE] bg-[#F7F7F8] text-sm sm:text-base font-normal text-[#1A1A1A] placeholder:text-[#A3A3A3] focus-visible:ring-0 focus-visible:border-[#1A1A1A] focus-visible:bg-white shadow-none px-4.5 transition-all",
                    error && "border-red-400"
                )}
            />
            {error && <span className="text-xs text-red-500">{error}</span>}
        </div>
    )
}

// ─── Modal ────────────────────────────────────────────────────────────────────
export interface AddAdminModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onAdd: (admin: AdminFormData) => void
}

export default function AddAdminModal({ open, onOpenChange, onAdd }: AddAdminModalProps) {
    const [form, setForm] = React.useState(INITIAL_FORM)
    const [errors, setErrors] = React.useState<Partial<typeof INITIAL_FORM>>({})

    const handleChange = <K extends keyof typeof INITIAL_FORM>(
        field: K,
        value: (typeof INITIAL_FORM)[K]
    ) => {
        setForm((prev) => ({ ...prev, [field]: value }))
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: "" }))
        }
    }

    const validate = (): boolean => {
        const newErrors: Partial<typeof INITIAL_FORM> = {}
        if (!form.firstName.trim()) newErrors.firstName = "First name is required."
        if (!form.lastName.trim()) newErrors.lastName = "Last name is required."
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = () => {
        if (!validate()) return
        onAdd({
            firstName: form.firstName.trim(),
            lastName: form.lastName.trim(),
            email: form.email.trim() || `${form.firstName.toLowerCase()}@example.com`,
            role: form.role,
            designation: form.designation,
            status: form.status,
            avatar: `https://api.dicebear.com/9.x/avataaars/svg?seed=${Date.now()}`,
        })
        setForm(INITIAL_FORM)
        setErrors({})
        onOpenChange(false)
    }

    const handleCancel = () => {
        setForm(INITIAL_FORM)
        setErrors({})
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                showCloseButton={false}
                className="max-w-[560px] w-[calc(100vw-2rem)] p-7 sm:p-9 rounded-[32px] sm:rounded-[36px] bg-[#FAF8F5] border border-[#EEEEEE] shadow-[0_25px_60px_rgba(0,0,0,0.12)]"
            >
                <div className="flex flex-col gap-6">
                    {/* First Name + Last Name */}
                    <div className="grid grid-cols-2 gap-4">
                        <TextField
                            label="First Name"
                            value={form.firstName}
                            onChange={(val) => handleChange("firstName", val)}
                            placeholder="Demo"
                            error={errors.firstName}
                        />
                        <TextField
                            label="Last Name"
                            value={form.lastName}
                            onChange={(val) => handleChange("lastName", val)}
                            placeholder="User"
                            error={errors.lastName}
                        />
                    </div>

                    {/* Role + Designation */}
                    <div className="grid grid-cols-2 gap-4">
                        <StyledSelect
                            label="Role"
                            value={form.role}
                            onChange={(val) => handleChange("role", val)}
                            options={ROLE_OPTIONS}
                        />
                        <StyledSelect
                            label="Designation"
                            value={form.designation}
                            onChange={(val) => handleChange("designation", val)}
                            options={DESIGNATION_OPTIONS}
                        />
                    </div>

                    {/* Status */}
                    <StyledSelect
                        label="Status"
                        value={form.status}
                        onChange={(val) => handleChange("status", val)}
                        options={STATUS_OPTIONS}
                    />

                    {/* Footer Action Buttons */}
                    <div className="flex items-center gap-3.5 mt-2">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="h-12 px-7 rounded-[16px] bg-[#E3E3E3] border border-[#D0D0D0] text-sm sm:text-base font-semibold text-[#1A1A1A] hover:bg-[#D8D8D8] transition-colors cursor-pointer outline-none shadow-xs"
                        >
                            Add Admin
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="h-12 px-8 rounded-[16px] bg-[#D9531E] text-sm sm:text-base font-semibold text-white hover:bg-[#C24614] transition-all cursor-pointer outline-none shadow-[0_4px_14px_rgba(217,83,30,0.28)]"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}