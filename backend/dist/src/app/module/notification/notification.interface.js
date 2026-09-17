"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NOTIFICATION_TYPE_VALUES = exports.NotificationType = void 0;
var NotificationType;
(function (NotificationType) {
    NotificationType["ORDER"] = "order";
    NotificationType["BOOKING"] = "booking";
    NotificationType["PAYMENT"] = "payment";
    NotificationType["DELIVERY"] = "delivery";
    NotificationType["REMINDER"] = "reminder";
    NotificationType["AI_READY"] = "ai_ready";
    NotificationType["PRESCRIPTION_READY"] = "prescription_ready";
    NotificationType["PROMOTION"] = "promotion";
    NotificationType["SYSTEM"] = "system";
    NotificationType["MESSAGE"] = "message";
    NotificationType["REFERRAL"] = "referral";
})(NotificationType || (exports.NotificationType = NotificationType = {}));
exports.NOTIFICATION_TYPE_VALUES = Object.values(NotificationType);
