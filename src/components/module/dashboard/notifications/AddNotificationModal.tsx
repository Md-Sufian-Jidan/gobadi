"use client"

import * as React from "react"
import { Plus, MonitorSmartphone, Clock, Users, AlignLeft, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"

// ─── Types ────────────────────────────────────────────────────────────────────
export interface NotificationItem {
  id: string
  title: string
  description: string
  createdAt: string
  sendDate: string
  sendTime: string
  occurrence: string
  sentTo: string
  sent: string
  tapped: string
}

const OCCURRENCE_OPTIONS = ["Once", "Daily", "Weekly", "Monthly", "Yearly"]
const TIME_OPTIONS = ["Immediately", "Custom Time"]
const RECIPIENT_OPTIONS = ["All Farmers", "All Doctors", "All Users", "Farmers", "Doctors"]

const INITIAL_FORM = {
  title: "",
  description: "",
  occurrence: "Once",
  time: "Immediately",
  recipients: "All Farmers",
}

// ─── Styled Select ────────────────────────────────────────────────────────────
function StyledSelect({
  icon: Icon,
  value,
  onChange,
  options,
  label,
}: {
  icon?: React.ElementType
  value: string
  onChange: (val: string) => void
  options: string[]
  label: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-[#1A1A1A]">{label}</label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373] pointer-events-none z-10" />
        )}
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "w-full h-10 appearance-none rounded-xl border border-[#E5E0D8] bg-[#F8F7F7] text-sm font-medium text-[#1A1A1A] outline-none focus:border-[#1A1A1A] focus:bg-white transition-all cursor-pointer pr-9",
            Icon ? "pl-9" : "pl-3"
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
    </div>
  )
}

// ─── Modal ────────────────────────────────────────────────────────────────────
export interface AddNotificationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (notification: Omit<NotificationItem, "id">) => void
}

export default function AddNotificationModal({
  open,
  onOpenChange,
  onAdd,
}: AddNotificationModalProps) {
  const [form, setForm] = React.useState(INITIAL_FORM)
  const [errors, setErrors] = React.useState<Partial<typeof INITIAL_FORM>>({})

  const handleChange = (field: keyof typeof INITIAL_FORM, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validate = () => {
    const newErrors: Partial<typeof INITIAL_FORM> = {}
    if (!form.title.trim()) newErrors.title = "Notification title is required."
    if (!form.description.trim()) newErrors.description = "Message description is required."
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return

    const now = new Date()
    const padded = (n: number) => String(n).padStart(2, "0")
    const createDate = `${padded(now.getDate())}/${padded(now.getMonth() + 1)}/${now.getFullYear()}`
    const hours = now.getHours()
    const minutes = padded(now.getMinutes())
    const ampm = hours >= 12 ? "pm" : "am"
    const displayHours = hours % 12 || 12
    const sendTime = `${displayHours}:${minutes} ${ampm}`

    onAdd({
      title: form.title.trim(),
      description: form.description.trim(),
      createdAt: createDate,
      sendDate: createDate,
      sendTime,
      occurrence: form.occurrence,
      sentTo: form.recipients,
      sent: "0 users",
      tapped: "0 users",
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
      <DialogContent className="max-w-[480px] w-full" showCloseButton>
        <DialogBody className="pt-6 gap-5">
          {/* Notification Title */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-[#1A1A1A]">Notification Title</label>
            <Input
              type="text"
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Enter notification title..."
              className={cn(
                "h-10 rounded-xl border-[#E5E0D8] bg-[#F8F7F7] text-sm placeholder:text-[#A3A3A3] focus-visible:ring-0 focus-visible:border-[#1A1A1A] focus-visible:bg-white",
                errors.title && "border-red-400"
              )}
            />
            {errors.title && (
              <span className="text-xs text-red-500">{errors.title}</span>
            )}
          </div>

          {/* Occurrence + Time row */}
          <div className="grid grid-cols-2 gap-3">
            <StyledSelect
              icon={MonitorSmartphone}
              label="Occurrence"
              value={form.occurrence}
              onChange={(val) => handleChange("occurrence", val)}
              options={OCCURRENCE_OPTIONS}
            />
            <StyledSelect
              icon={Clock}
              label="Time"
              value={form.time}
              onChange={(val) => handleChange("time", val)}
              options={TIME_OPTIONS}
            />
          </div>

          {/* Recipients */}
          <StyledSelect
            icon={Users}
            label="Recipients"
            value={form.recipients}
            onChange={(val) => handleChange("recipients", val)}
            options={RECIPIENT_OPTIONS}
          />

          {/* Message Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-[#1A1A1A]">Message Description</label>
            <Textarea
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Enter message description..."
              rows={4}
              className={cn(
                "rounded-xl border-[#E5E0D8] bg-[#F8F7F7] text-sm placeholder:text-[#A3A3A3] resize-none focus-visible:ring-0 focus-visible:border-[#1A1A1A] focus-visible:bg-white",
                errors.description && "border-red-400"
              )}
            />
            {errors.description && (
              <span className="text-xs text-red-500">{errors.description}</span>
            )}
          </div>
        </DialogBody>

        {/* Footer Buttons */}
        <DialogFooter className="pt-0">
          <button
            type="button"
            onClick={handleSubmit}
            className="flex items-center gap-2 h-10 px-5 rounded-xl bg-[#F0EDE8] text-sm font-semibold text-[#1A1A1A] hover:bg-[#E5E0D8] transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add Notification
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
};
