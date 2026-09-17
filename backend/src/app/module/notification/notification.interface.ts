export enum NotificationType {
  ORDER = "order",
  BOOKING = "booking",
  PAYMENT = "payment",
  DELIVERY = "delivery",
  REMINDER = "reminder",
  AI_READY = "ai_ready",
  PRESCRIPTION_READY = "prescription_ready",
  PROMOTION = "promotion",
  SYSTEM = "system",
  MESSAGE = "message",
  REFERRAL = "referral",
}

export const NOTIFICATION_TYPE_VALUES = Object.values(NotificationType) as string[];
