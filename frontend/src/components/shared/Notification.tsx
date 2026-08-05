"use client"

import * as React from "react"
import { Bell, MessageSquare, Package, Plus, Heart, Zap } from "lucide-react"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

// ─── Notification Item Interface ──────────────────────────────────────────────
export interface NotificationItemData {
  id: string
  avatarSrc: string
  avatarFallback: string
  badgeType: "comment" | "package" | "plus" | "heart" | "zap"
  title: string
  timeAgo: string
  isUnread: boolean
  body: React.ReactNode
  description?: string
  actions?: {
    declineText: string
    acceptText: string
  }
}

// ─── Dummy Data (Matching Screenshot) ─────────────────────────────────────────
const DUMMY_NOTIFICATIONS: NotificationItemData[] = [
  {
    id: "1",
    avatarSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    avatarFallback: "RD",
    badgeType: "comment",
    title: "Randomdash",
    timeAgo: "1h ago",
    isUnread: true,
    body: (
      <span>
        Commented on <strong className="font-semibold text-black">Classic Car in Studio</strong>
      </span>
    ),
    description:
      "These draggabale sliders look really cool. Maybe these could be displayed when you h...",
  },
  {
    id: "2",
    avatarSrc: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    avatarFallback: "CT",
    badgeType: "package",
    title: "Cute Turtle is generated",
    timeAgo: "1h ago",
    isUnread: true,
    body: <span>Matte texture - UI8 Style</span>,
    description: "Prompt: Create 3D character dancing",
  },
  {
    id: "3",
    avatarSrc: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    avatarFallback: "3D",
    badgeType: "plus",
    title: "3D object is generated",
    timeAgo: "1h ago",
    isUnread: true,
    body: (
      <span>
        Invited you to edit <strong className="font-semibold text-black">Minimalist Architecture S...</strong>
      </span>
    ),
    actions: {
      declineText: "Decline",
      acceptText: "Accept",
    },
  },
  {
    id: "4",
    avatarSrc: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    avatarFallback: "M",
    badgeType: "heart",
    title: "Marina",
    timeAgo: "1h ago",
    isUnread: false,
    body: (
      <span>
        Liked <strong className="font-semibold text-black">Classic Car in Studio</strong>
      </span>
    ),
  },
  {
    id: "5",
    avatarSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    avatarFallback: "3D",
    badgeType: "comment",
    title: "3D object is generated",
    timeAgo: "1h ago",
    isUnread: false,
    body: (
      <span>
        Commented on <strong className="font-semibold text-black">Classic Car in Studio</strong>
      </span>
    ),
    description:
      "These draggabale sliders look really cool. Maybe these could be displayed when you h...",
  },
  {
    id: "6",
    avatarSrc: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80",
    avatarFallback: "AG",
    badgeType: "zap",
    title: "Animation is generated",
    timeAgo: "1h ago",
    isUnread: false,
    body: <span>12s – 720p</span>,
    description: "Prompt: Create 3D character dancing",
  },
  {
    id: "7",
    avatarSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    avatarFallback: "3D",
    badgeType: "package",
    title: "3D object is generated",
    timeAgo: "1h ago",
    isUnread: false,
    body: <span>Matte texture - UI8 Style</span>,
  },
]

// ─── Avatar Badge Icon Component ───────────────────────────────────────────────
function BadgeOverlay({ type }: { type: NotificationItemData["badgeType"] }) {
  switch (type) {
    case "comment":
      return (
        <div className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#8B5CF6] text-white ring-2 ring-white">
          <MessageSquare className="h-2.5 w-2.5 fill-white" />
        </div>
      )
    case "package":
      return (
        <div className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#84CC16] text-white ring-2 ring-white">
          <Package className="h-2.5 w-2.5" />
        </div>
      )
    case "plus":
      return (
        <div className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#22C55E] text-white ring-2 ring-white">
          <Plus className="h-2.5 w-2.5 stroke-[3]" />
        </div>
      )
    case "heart":
      return (
        <div className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#EF4444] text-white ring-2 ring-white">
          <Heart className="h-2.5 w-2.5 fill-white" />
        </div>
      )
    case "zap":
      return (
        <div className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#3B82F6] text-white ring-2 ring-white">
          <Zap className="h-2.5 w-2.5 fill-white" />
        </div>
      )
    default:
      return null
  }
}

// ─── Main Notification Component ──────────────────────────────────────────────
export default function Notification() {
  const [filter, setFilter] = React.useState<"all" | "unread">("all")
  const [notifications, setNotifications] = React.useState<NotificationItemData[]>(DUMMY_NOTIFICATIONS)

  const unreadCount = notifications.filter((n) => n.isUnread).length

  const filteredNotifications = React.useMemo(() => {
    if (filter === "unread") {
      return notifications.filter((n) => n.isUnread)
    }
    return notifications
  }, [filter, notifications])

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isUnread: false } : item))
    )
  }

  return (
    <Popover>
      <PopoverTrigger>
        <button
          id="notification-bell-btn"
          className="relative p-2 sm:p-2.5 rounded-xl sm:rounded-2xl text-[#1A1A1A] transition-colors cursor-pointer hover:bg-[#F7F4EE] outline-none"
          title="Notifications"
          aria-label="Open notifications"
        >
          <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-[#1A1A1A]" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-[#22C55E] rounded-full ring-2 ring-white animate-pulse" />
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-[380px] sm:w-[410px] p-0 rounded-[24px] bg-white border border-[#EAE5DD] shadow-[0_20px_50px_rgba(0,0,0,0.12)] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#F0EDE8]">
          <h3 className="text-base font-bold text-[#1A1A1A] tracking-tight">Notifications</h3>

          {/* Filter Pills */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer ${filter === "all"
                ? "bg-[#EFEFEF] text-[#1A1A1A]"
                : "text-[#8E8E93] hover:text-[#1A1A1A]"
                }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("unread")}
              className={`px-3 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer ${filter === "unread"
                ? "bg-[#EFEFEF] text-[#1A1A1A]"
                : "text-[#8E8E93] hover:text-[#1A1A1A]"
                }`}
            >
              Unread
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="max-h-[480px] overflow-y-auto divide-y divide-[#F5F2EC]">
          {filteredNotifications.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#8E8E93]">
              No {filter === "unread" ? "unread " : ""}notifications.
            </div>
          ) : (
            filteredNotifications.map((item) => (
              <div
                key={item.id}
                onClick={() => handleMarkAsRead(item.id)}
                className="group relative flex items-start gap-3.5 p-4 hover:bg-[#FAFAFA] transition-colors cursor-pointer"
              >
                {/* Avatar with Badge */}
                <div className="relative shrink-0 mt-0.5">
                  <Avatar
                    src={item.avatarSrc}
                    fallback={item.avatarFallback}
                    className="h-10 w-10 border-0"
                  />
                  <BadgeOverlay type={item.badgeType} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pr-3">
                  {/* Title & TimeAgo */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-sm font-bold text-[#1A1A1A] leading-tight">
                      {item.title}
                    </span>
                    <span className="text-xs font-normal text-[#999999]">
                      {item.timeAgo}
                    </span>
                  </div>

                  {/* Action / Subtitle */}
                  <div className="text-xs text-[#444444] font-normal leading-relaxed mt-0.5">
                    {item.body}
                  </div>

                  {/* Description / Prompt */}
                  {item.description && (
                    <div className="text-xs text-[#8E8E93] font-normal leading-relaxed mt-1 line-clamp-2">
                      {item.description}
                    </div>
                  )}

                  {/* Interactive Action Buttons */}
                  {item.actions && (
                    <div className="flex items-center gap-2.5 mt-2.5" onClick={(e) => e.stopPropagation()}>
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => handleMarkAsRead(item.id)}
                        className="h-9 px-5 rounded-xl bg-[#EFEFEF] hover:bg-[#E5E5E5] text-xs font-semibold text-[#1A1A1A] border-0 shadow-none cursor-pointer transition-colors"
                      >
                        {item.actions.declineText}
                      </Button>
                      <Button
                        type="button"
                        onClick={() => handleMarkAsRead(item.id)}
                        className="h-9 px-5 rounded-xl bg-[#222222] hover:bg-[#000000] text-xs font-semibold text-white border-0 shadow-none cursor-pointer transition-colors"
                      >
                        {item.actions.acceptText}
                      </Button>
                    </div>
                  )}
                </div>

                {/* Unread Green Dot */}
                {item.isUnread && (
                  <span className="absolute right-4 top-4 h-2 w-2 rounded-full bg-[#34D399] shrink-0" />
                )}
              </div>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}