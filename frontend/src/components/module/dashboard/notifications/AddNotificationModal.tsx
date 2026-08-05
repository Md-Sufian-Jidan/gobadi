"use client"

import * as React from "react"
import { MonitorSmartphone, Clock, User, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
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
  title: "Create a 3D model of a sleek, futuristic car with neon accents.",
  description: "Create a 3D model of a sleek, futuristic car with neon accents.",
  occurrence: "Once",
  time: "Immediately",
  recipients: "All Farmers",
}

function StyledSelect({
  icon: Icon,
  value,
  onChange,
  options,
  label,
  isRecipients,
}: {
  icon?: React.ElementType
  value: string
  onChange: (val: string) => void
  options: string[]
  label: string
  isRecipients?: boolean
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm sm:text-base font-semibold text-[#1A1A1A]">{label}</label>
      <div className="relative flex items-center">
        {/* Recipients custom pill view overlay */}
        {isRecipients ? (
          <div className="absolute left-3 pointer-events-none flex items-center gap-2 bg-[#F6F6F8] border border-[#E5E5E5] text-[#1A1A1A] text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full">
            <User className="w-4 h-4 text-[#555555]" />
            <span>{value}</span>
          </div>
        ) : Icon ? (
          <div className="absolute left-4 pointer-events-none text-[#555555]">
            <Icon className="w-5 h-5" />
          </div>
        ) : null}

        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "w-full h-13 appearance-none rounded-[16px] border border-[#E8E8E8] bg-white text-sm sm:text-base font-semibold text-[#1A1A1A] outline-none focus:border-[#1A1A1A] shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all cursor-pointer pr-10",
            isRecipients ? "pl-32" : Icon ? "pl-12" : "pl-4"
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
    </div>
  )
}

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
      <DialogContent
        showCloseButton={false}
        className="max-w-[560px] w-[calc(100vw-2rem)] p-7 sm:p-9 rounded-[32px] sm:rounded-[36px] bg-[#FAFAFA] border border-[#EEEEEE] shadow-[0_25px_60px_rgba(0,0,0,0.12)]"
      >
        <div className="flex flex-col gap-6">
          {/* Notification Title */}
          <div className="flex flex-col gap-2">
            <label className="text-sm sm:text-base font-semibold text-[#1A1A1A]">
              Notification Title
            </label>
            <Input
              type="text"
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Create a 3D model of a sleek, futuristic car with neon accents."
              className={cn(
                "h-13 rounded-[16px] border border-[#EEEEEE] bg-[#F7F7F8] text-sm sm:text-base font-normal text-[#1A1A1A] placeholder:text-[#A3A3A3] focus-visible:ring-0 focus-visible:border-[#1A1A1A] focus-visible:bg-white shadow-none px-4.5 transition-all",
                errors.title && "border-red-400"
              )}
            />
            {errors.title && (
              <span className="text-xs text-red-500">{errors.title}</span>
            )}
          </div>

          {/* Occurrence + Time row */}
          <div className="grid grid-cols-2 gap-4">
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
            label="Recipients"
            value={form.recipients}
            onChange={(val) => handleChange("recipients", val)}
            options={RECIPIENT_OPTIONS}
            isRecipients
          />

          {/* Message Description */}
          <div className="flex flex-col gap-2">
            <label className="text-sm sm:text-base font-semibold text-[#1A1A1A]">
              Message Description
            </label>
            <Textarea
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Create a 3D model of a sleek, futuristic car with neon accents."
              rows={3}
              className={cn(
                "rounded-[18px] border border-[#EEEEEE] bg-[#F7F7F8] text-sm sm:text-base font-normal text-[#1A1A1A] placeholder:text-[#A3A3A3] resize-none focus-visible:ring-0 focus-visible:border-[#1A1A1A] focus-visible:bg-white shadow-none p-4.5 transition-all min-h-[110px]",
                errors.description && "border-red-400"
              )}
            />
            {errors.description && (
              <span className="text-xs text-red-500">{errors.description}</span>
            )}
          </div>

          {/* Footer Action Buttons */}
          <div className="flex items-center gap-3.5 mt-2">
            <button
              type="button"
              onClick={handleSubmit}
              className="h-12 px-7 rounded-[16px] bg-[#E3E3E3] border border-[#D0D0D0] text-sm sm:text-base font-semibold text-[#1A1A1A] hover:bg-[#D8D8D8] transition-colors cursor-pointer outline-none shadow-xs"
            >
              Add Notification
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
