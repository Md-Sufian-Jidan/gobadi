"use client"

import * as React from "react"
import { Plus, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogBody,
    DialogFooter,
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
    firstName: "",
    lastName: "",
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
    required,
    error,
}: {
    value: T
    onChange: (val: T) => void
    options: readonly T[]
    label: string
    required?: boolean
    error?: string
}) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-[#1A1A1A]">
                {label}
                {required && <span className="text-red-500 ml-0.5">*</span>}
            </label>
            <div className="relative">
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value as T)}
                    className={cn(
                        "w-full h-10 appearance-none rounded-xl border border-[#E5E0D8] bg-[#F8F7F7] text-sm font-medium text-[#1A1A1A] outline-none focus:border-[#1A1A1A] focus:bg-white transition-all cursor-pointer px-3 pr-9",
                        error && "border-red-400"
                    )}
                >
                    {options.map((opt) => (
                        <option key={opt} value={opt}>
                            {opt}
                        </option>
                    ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373] pointer-events-none" />
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
    required,
    error,
    type = "text",
}: {
    label: string
    value: string
    onChange: (val: string) => void
    placeholder?: string
    required?: boolean
    error?: string
    type?: string
}) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-[#1A1A1A]">
                {label}
                {required && <span className="text-red-500 ml-0.5">*</span>}
            </label>
            <Input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className={cn(
                    "h-10 rounded-xl border-[#E5E0D8] bg-[#F8F7F7] text-sm placeholder:text-[#A3A3A3] focus-visible:ring-0 focus-visible:border-[#1A1A1A] focus-visible:bg-white transition-all",
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
        if (!form.email.trim()) {
            newErrors.email = "Email is required."
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = "Enter a valid email address."
        }
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = () => {
        if (!validate()) return
        onAdd({
            firstName: form.firstName.trim(),
            lastName: form.lastName.trim(),
            email: form.email.trim(),
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
            <DialogContent className="max-w-[520px] w-full" showCloseButton>
                <DialogHeader>
                    <DialogTitle>Add New Admin</DialogTitle>
                </DialogHeader>

                <DialogBody className="gap-4">
                    {/* First Name + Last Name */}
                    <div className="grid grid-cols-2 gap-3">
                        <TextField
                            label="First Name"
                            value={form.firstName}
                            onChange={(val) => handleChange("firstName", val)}
                            placeholder="Enter first name"
                            required
                            error={errors.firstName}
                        />
                        <TextField
                            label="Last Name"
                            value={form.lastName}
                            onChange={(val) => handleChange("lastName", val)}
                            placeholder="Enter last name"
                            required
                            error={errors.lastName}
                        />
                    </div>

                    {/* Email */}
                    <TextField
                        label="Email Address"
                        value={form.email}
                        onChange={(val) => handleChange("email", val)}
                        placeholder="example@domain.com"
                        required
                        type="email"
                        error={errors.email}
                    />

                    {/* Role + Designation */}
                    <div className="grid grid-cols-2 gap-3">
                        <StyledSelect
                            label="Role"
                            value={form.role}
                            onChange={(val) => handleChange("role", val)}
                            options={ROLE_OPTIONS}
                            required
                        />
                        <StyledSelect
                            label="Designation"
                            value={form.designation}
                            onChange={(val) => handleChange("designation", val)}
                            options={DESIGNATION_OPTIONS}
                            required
                        />
                    </div>

                    {/* Status */}
                    <StyledSelect
                        label="Status"
                        value={form.status}
                        onChange={(val) => handleChange("status", val)}
                        options={STATUS_OPTIONS}
                        required
                    />
                </DialogBody>

                <DialogFooter>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="flex items-center gap-2 h-10 px-5 rounded-xl bg-[#F0EDE8] text-sm font-semibold text-[#1A1A1A] hover:bg-[#E5E0D8] transition-colors cursor-pointer"
                    >
                        <Plus className="w-4 h-4" />
                        Add Admin
                    </button>
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="h-10 px-5 rounded-xl bg-[#C1652F] text-sm font-semibold text-white hover:bg-[#A85425] transition-colors cursor-pointer"
                    >
                        Cancel
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}