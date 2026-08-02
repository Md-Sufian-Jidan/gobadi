"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown, Eye, EyeOff, Camera } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const COUNTRIES = [
    { code: "DE", flag: "🇩🇪", label: "Germany (+49)" },
    { code: "BD", flag: "🇧🇩", label: "Bangladesh (+880)" },
    { code: "US", flag: "🇺🇸", label: "United States (+1)" },
    { code: "UK", flag: "🇬🇧", label: "United Kingdom (+44)" },
];

const ROLES = ["SUPER ADMIN", "ADMIN", "MANAGER", "MODERATOR"];

export default function SettingsPage() {
    const [firstName, setFirstName] = useState("Istiak");
    const [lastName, setLastName] = useState("Ratul");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
    const [role, setRole] = useState("SUPER ADMIN");
    const [profileImage, setProfileImage] = useState(
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop"
    );

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setProfileImage(url);
            toast.success("Profile picture updated!");
        }
    };

    const handleSave = () => {
        if (password && password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }
        toast.success("Settings updated successfully!");
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="bg-[#FCFCFC] border border-[#EAE5DD] shadow-xs rounded-[20px] sm:rounded-[28px] p-4 sm:p-7 flex flex-col gap-6"
        >
            {/* Page Header */}
            <div className="border-b border-[#F5F2EC] pb-4">
                <h1 className="text-lg sm:text-xl font-bold text-[#1A1A1A] font-display tracking-tight">
                    Settings
                </h1>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* ── Left Column: Profile Card & Information (4 cols) ── */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    
                    {/* User Profile Avatar Card */}
                    <div className="bg-white border border-[#EAE5DD] rounded-[24px] p-6 sm:p-8 flex flex-col items-center justify-center text-center shadow-xs">
                        <div className="relative group w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-[#F5F2EC] shadow-sm mb-5">
                            <Image
                                src={profileImage}
                                alt="Demo User"
                                fill
                                className="object-cover"
                                unoptimized
                            />
                            {/* Overlay Camera upload button */}
                            <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white cursor-pointer transition-opacity duration-200">
                                <Camera className="w-6 h-6 mb-1" />
                                <span className="text-xs font-semibold">Change Photo</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                            </label>
                        </div>

                        <h2 className="text-lg font-bold text-[#C15C2B] uppercase tracking-wide">
                            DEMO USER
                        </h2>
                        <p className="text-sm font-medium text-[#737373] mt-1">
                            asample.user@gmail.com
                        </p>
                    </div>

                    {/* Information & Preferences Card */}
                    <div className="bg-white border border-[#EAE5DD] rounded-[24px] p-6 sm:p-7 flex flex-col gap-6 shadow-xs text-sm">
                        {/* Information Section */}
                        <div className="flex flex-col gap-3">
                            <h3 className="text-base font-bold text-[#1A1A1A]">Information</h3>
                            <div className="flex flex-col gap-2 leading-relaxed">
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-[#1A1A1A]">Name:</span>
                                    <span className="text-[#525252]">Demo User</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-[#1A1A1A]">Email:</span>
                                    <span className="text-[#525252]">asample.user@gmail.com</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-[#1A1A1A]">Phone:</span>
                                    <span className="text-[#525252]">+880 xxxx-xxxxxx</span>
                                </div>
                            </div>
                        </div>

                        {/* Preferences Section */}
                        <div className="flex flex-col gap-3 pt-2 border-t border-[#F5F2EC]">
                            <h3 className="text-base font-bold text-[#1A1A1A]">Preferences</h3>
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-[#1A1A1A]">Role:</span>
                                <span className="font-bold text-[#C15C2B]">SUPER ADMIN</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Right Column: Edit Profile & Password Form (8 cols) ── */}
                <div className="lg:col-span-8 bg-white border border-[#EAE5DD] rounded-[24px] p-6 sm:p-8 flex flex-col gap-5 shadow-xs">
                    
                    {/* First Name & Last Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-[#1A1A1A]">
                                First Name<span className="text-[#1A1A1A]">*</span>
                            </label>
                            <Input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="Istiak"
                                className="h-11 rounded-xl bg-[#FCFCFC] border-[#E5E0D8] text-sm text-[#1A1A1A] placeholder:text-[#A3A3A3] focus-visible:ring-0 focus-visible:border-[#1A1A1A] transition-all shadow-none"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-[#1A1A1A]">
                                Last Name<span className="text-[#1A1A1A]">*</span>
                            </label>
                            <Input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Ratul"
                                className="h-11 rounded-xl bg-[#FCFCFC] border-[#E5E0D8] text-sm text-[#1A1A1A] placeholder:text-[#A3A3A3] focus-visible:ring-0 focus-visible:border-[#1A1A1A] transition-all shadow-none"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-[#1A1A1A]">
                            Email<span className="text-[#1A1A1A]">*</span>
                        </label>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="h-11 rounded-xl bg-[#FCFCFC] border-[#E5E0D8] text-sm text-[#1A1A1A] placeholder:text-[#A3A3A3] focus-visible:ring-0 focus-visible:border-[#1A1A1A] transition-all shadow-none"
                        />
                    </div>

                    {/* Phone with Country Selector */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-[#1A1A1A]">
                            Phone<span className="text-[#1A1A1A]">*</span>
                        </label>
                        <div className="flex items-center h-11 rounded-xl border border-[#E5E0D8] bg-[#FCFCFC] overflow-hidden focus-within:border-[#1A1A1A] transition-all">
                            <DropdownMenu>
                                <DropdownMenuTrigger className="h-full px-3 flex items-center gap-1.5 text-sm border-r border-[#E5E0D8] bg-transparent outline-none cursor-pointer hover:bg-[#F7F4EE] transition-colors shrink-0">
                                    <span className="text-base">{selectedCountry.flag}</span>
                                    <ChevronDown className="w-3.5 h-3.5 text-[#737373]" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start" className="w-48 bg-white border border-[#EAE5DD] shadow-lg rounded-xl py-1 z-20 text-xs">
                                    {COUNTRIES.map((c) => (
                                        <DropdownMenuItem
                                            key={c.code}
                                            onClick={() => setSelectedCountry(c)}
                                            className="w-full px-3 py-2 flex items-center gap-2 hover:bg-[#F7F4EE] cursor-pointer text-[#1A1A1A] font-medium"
                                        >
                                            <span className="text-base">{c.flag}</span>
                                            <span>{c.label}</span>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Phone number"
                                className="flex-1 h-full px-3.5 bg-transparent text-sm text-[#1A1A1A] placeholder:text-[#A3A3A3] outline-none"
                            />
                        </div>
                    </div>

                    {/* Change Password */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-[#1A1A1A]">
                            Change Password
                        </label>
                        <div className="relative">
                            <Input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="*************"
                                className="h-11 pr-10 rounded-xl bg-[#FCFCFC] border-[#E5E0D8] text-sm text-[#1A1A1A] placeholder:text-[#A3A3A3] focus-visible:ring-0 focus-visible:border-[#1A1A1A] transition-all shadow-none"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#A3A3A3] hover:text-[#1A1A1A] transition-colors cursor-pointer"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? (
                                    <EyeOff className="w-4 h-4" />
                                ) : (
                                    <Eye className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-[#1A1A1A]">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <Input
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="*************"
                                className="h-11 pr-10 rounded-xl bg-[#FCFCFC] border-[#E5E0D8] text-sm text-[#1A1A1A] placeholder:text-[#A3A3A3] focus-visible:ring-0 focus-visible:border-[#1A1A1A] transition-all shadow-none"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#A3A3A3] hover:text-[#1A1A1A] transition-colors cursor-pointer"
                                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                            >
                                {showConfirmPassword ? (
                                    <EyeOff className="w-4 h-4" />
                                ) : (
                                    <Eye className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Role Dropdown */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-[#1A1A1A]">
                            Role<span className="text-[#1A1A1A]">*</span>
                        </label>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="w-full h-11 px-4 rounded-xl border border-[#E5E0D8] bg-[#FCFCFC] flex items-center justify-between text-sm font-medium text-[#1A1A1A] outline-none cursor-pointer hover:border-[#1A1A1A] transition-all">
                                <span>{role}</span>
                                <ChevronDown className="w-4 h-4 text-[#737373]" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-full min-w-[240px] bg-white border border-[#EAE5DD] shadow-lg rounded-xl py-1 z-20 text-sm">
                                {ROLES.map((r) => (
                                    <DropdownMenuItem
                                        key={r}
                                        onClick={() => setRole(r)}
                                        className="w-full px-4 py-2 hover:bg-[#F7F4EE] cursor-pointer text-[#1A1A1A] font-medium"
                                    >
                                        {r}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-2 flex items-center justify-end gap-3 pt-2">
                        <Button
                            type="button"
                            onClick={handleSave}
                            className="h-11 px-6 rounded-xl bg-[#C15C2B] hover:bg-[#A84F23] text-white font-semibold text-sm transition-all shadow-none cursor-pointer"
                        >
                            Save Changes
                        </Button>
                    </div>
                </div>

            </div>
        </motion.div>
    );
}
