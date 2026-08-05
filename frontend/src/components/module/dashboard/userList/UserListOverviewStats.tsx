"use client";

import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";

import dashboardStatIcon1 from "@/assets/dashboard-download.svg";
import dashboardStatIcon2 from "@/assets/dashboard-user.svg";
import dashboardStatIcon3 from "@/assets/dashboard-farmer.svg";
import dashboardStatIcon4 from "@/assets/dashboard-doctor.svg";
import dashboardtringleicon from "@/assets/dashboardtriangle.svg";
import dashboardredtringleicon from "@/assets/dashboardredtraingle.svg";

interface StatItem {
    id: string;
    title: string;
    value: string;
    change: string;
    isPositive: boolean;
    icon: StaticImageData;
}

const stats: StatItem[] = [
    {
        id: "farmers",
        title: "Farmers",
        value: "678",
        change: "32%",
        isPositive: true,
        icon: dashboardStatIcon3,
    },
    {
        id: "doctors",
        title: "Doctors",
        value: "678",
        change: "48%",
        isPositive: false,
        icon: dashboardStatIcon4,
    },
    {
        id: "active_animals",
        title: "Active Animals",
        value: "678",
        change: "32%",
        isPositive: true,
        icon: dashboardStatIcon1,
    },
    {
        id: "referral_user",
        title: "Referral User",
        value: "180",
        change: "32%",
        isPositive: true,
        icon: dashboardStatIcon2,
    },
];

export default function UserListOverviewStats() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {stats.map((stat, index) => {
                return (
                    <motion.div
                        key={stat.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.08 }}
                        whileHover={{ y: -3 }}
                        className="bg-white border border-[#EAE5DD] shadow-xs rounded-[20px] sm:rounded-[24px] p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden group transition-all duration-200"
                    >
                        {/* Top row: Title and Icon */}
                        <div className="flex items-start justify-between">
                            <span className="text-[#1A1A1A] font-bold text-base sm:text-lg tracking-tight font-display">
                                {stat.title}
                            </span>
                            <div className="w-8 h-8 rounded-full bg-[#F9EFEA] flex items-center justify-center border border-[#F2DFD5] group-hover:scale-110 transition-transform duration-200 shrink-0">
                                <Image src={stat.icon} alt={stat.title} width={18} height={18} />
                            </div>
                        </div>

                        {/* Bottom row: Large value & Trend Badge */}
                        <div className="mt-3 sm:mt-4 flex items-center gap-2">
                            <span className="text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] tracking-tight font-display">
                                {stat.value}
                            </span>

                            <div
                                className={`inline-flex items-center gap-1 text-xs sm:text-sm font-bold ${stat.isPositive
                                    ? "text-[#16A34A]"
                                    : "text-[#DC2626]"
                                    }`}
                            >
                                {
                                    stat.isPositive ? (
                                        <>
                                            <Image src={dashboardtringleicon} alt="Trend Indicator" className={`w-2.5 h-2.5 ${stat.isPositive
                                                ? "fill-[#16A34A] stroke-none"
                                                : "fill-[#DC2626] stroke-none rotate-180"
                                                }`}
                                            />
                                            <span>{stat.change}</span>
                                        </>
                                    ) :
                                        (
                                            <>
                                                <Image src={dashboardredtringleicon} alt="Trend Indicator" className={`w-2.5 h-2.5 ${stat.isPositive
                                                    ? "fill-[#16A34A] stroke-none"
                                                    : "fill-[#DC2626] stroke-none rotate-180"
                                                    }`}
                                                />
                                                <span>{stat.change}</span>
                                            </>
                                        )
                                }
                            </div>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
};
