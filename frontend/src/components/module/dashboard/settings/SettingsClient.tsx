"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Eye, EyeOff, Camera, Loader2, User as UserIcon } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getUserProfile, updateUser } from "@/services/user.service";

const COUNTRIES = [
    { code: "DE", flag: "🇩🇪", label: "Germany (+49)" },
    { code: "BD", flag: "🇧🇩", label: "Bangladesh (+880)" },
    { code: "US", flag: "🇺🇸", label: "United States (+1)" },
    { code: "UK", flag: "🇬🇧", label: "United Kingdom (+44)" },
];

const ROLES = ["SUPER ADMIN", "ADMIN", "MANAGER", "MODERATOR", "USER", "DOCTOR", "CLINIC"];

interface UserProfile {
    _id?: string;
    id?: string;
    firstName?: string;
    lastName?: string;
    name?: string;
    email: string;
    phone?: string;
    role: string;
    avatar?: string;
    image?: string;
}

const getImageUrl = (url?: string) => {
    if (!url) return undefined;
    if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("blob:")) return url;
    const apiBase = process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/v1\/?$/, "") || "http://localhost:5000";
    return `${apiBase}${url.startsWith("/") ? "" : "/"}${url}`;
};

export default function SettingsClient({ initialUser }: { initialUser?: UserProfile }) {
    const [userId, setUserId] = useState<string>(initialUser?._id || initialUser?.id || "");
    const [firstName, setFirstName] = useState<string>(initialUser?.firstName || "");
    const [lastName, setLastName] = useState<string>(initialUser?.lastName || "");
    const [email, setEmail] = useState<string>(initialUser?.email || "");
    const [phone, setPhone] = useState<string>(initialUser?.phone || "");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
    const [role, setRole] = useState<string>(initialUser?.role?.toUpperCase() || "SUPER ADMIN");
    const [profileImage, setProfileImage] = useState<string>(initialUser?.avatar || initialUser?.image || "");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(!initialUser);
    const [saving, setSaving] = useState<boolean>(false);

    useEffect(() => {
        if (!initialUser) {
            async function fetchProfile() {
                try {
                    setLoading(true);
                    const res = await getUserProfile();
                    if (res.status && res.data) {
                        const u = res.data;
                        setUserId(u._id || u.id || "");
                        if (u.name) {
                            const parts = u.name.trim().split(/\s+/);
                            setFirstName(parts[0] || "");
                            setLastName(parts.slice(1).join(" ") || "");
                        }
                        if (u.email) setEmail(u.email);
                        if (u.phone) setPhone(u.phone);
                        if (u.role) setRole(u.role.toUpperCase());
                        if (u.avatar || u.image) setProfileImage(u.avatar || u.image);
                    }
                } catch (error) {
                    console.error("Failed to load user profile:", error);
                    toast.error("Error loading profile details");
                } finally {
                    setLoading(false);
                }
            }
            fetchProfile();
        } else if (initialUser.name && (!initialUser.firstName || !initialUser.lastName)) {
            const parts = initialUser.name.trim().split(/\s+/);
            setFirstName(parts[0] || "");
            setLastName(parts.slice(1).join(" ") || "");
        }
    }, [initialUser]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast.error("Image must be smaller than 5 MB");
                return;
            }
            setSelectedFile(file);
            const url = URL.createObjectURL(file);
            setProfileImage(url);
            toast.success("Profile picture selected!");
        }
    };

    const handleSave = async () => {
        if (!userId) {
            toast.error("User ID not found");
            return;
        }

        if (password && password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        if (password && password.length < 6) {
            toast.error("Password must be at least 6 characters long!");
            return;
        }

        try {
            setSaving(true);
            const formData = new FormData();
            const fullName = [firstName, lastName].filter(Boolean).join(" ").trim();
            formData.append("name", fullName);

            if (password) {
                formData.append("password", password);
            }

            if (selectedFile) {
                formData.append("avatar", selectedFile);
            }

            const res = await updateUser(userId, formData);
            if (res.status) {
                toast.success("Settings updated successfully!");
                setPassword("");
                setConfirmPassword("");
                setSelectedFile(null);
                if (res.data?.avatar || res.data?.image) {
                    setProfileImage(res.data.avatar || res.data.image);
                }
            } else {
                toast.error(res.message || "Failed to update profile");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Failed to save changes");
        } finally {
            setSaving(false);
        }
    };

    const firstChar = firstName.trim() ? firstName.trim()[0].toUpperCase() : "";
    const lastChar = lastName.trim() ? lastName.trim()[0].toUpperCase() : "";
    const initials = `${firstChar}${lastChar}` || "U";
    const displayName = [firstName, lastName].filter(Boolean).join(" ") || "Demo User";
    const resolvedAvatarUrl = getImageUrl(profileImage);

    if (loading) {
        return (
            <Card className="bg-[#FCFCFC] border-[#EAE5DD] shadow-xs rounded-[20px] sm:rounded-[28px] p-12 flex flex-col items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-[#C15C2B] mb-3" />
                <p className="text-sm font-medium text-[#737373]">Loading settings...</p>
            </Card>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex flex-col gap-6"
        >
            <Card className="bg-[#FCFCFC] border-[#EAE5DD] shadow-xs rounded-[20px] sm:rounded-[28px] p-4 sm:p-7 border">
                {/* Page Header */}
                <CardHeader className="border-b border-[#F5F2EC] pb-4 px-0 pt-0">
                    <CardTitle className="text-lg sm:text-xl font-bold text-[#1A1A1A] font-display tracking-tight">
                        Settings
                    </CardTitle>
                    <CardDescription className="text-sm text-[#737373]">
                        Manage your account details, security credentials, and preferences.
                    </CardDescription>
                </CardHeader>

                <CardContent className="px-0 pt-6">
                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                        {/* ── Left Column: Profile Card & Information (4 cols) ── */}
                        <div className="lg:col-span-4 flex flex-col gap-6">

                            {/* User Profile Avatar Card */}
                            <Card className="bg-white border-[#EAE5DD] rounded-[24px] p-6 sm:p-8 flex flex-col items-center justify-center text-center shadow-xs">
                                <div className="relative group w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-[#F5F2EC] shadow-sm mb-5 flex items-center justify-center bg-[#F5F2EC]">
                                    <Avatar
                                        src={resolvedAvatarUrl}
                                        alt={displayName}
                                        fallback={initials}
                                        className="w-full h-full text-4xl sm:text-5xl font-bold bg-[#F5F2EC] text-[#C15C2B] border-none rounded-full flex items-center justify-center select-none"
                                    />
                                    {/* Overlay Camera upload button */}
                                    <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white cursor-pointer transition-opacity duration-200 rounded-full">
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
                                    {displayName}
                                </h2>
                                <p className="text-sm font-medium text-[#737373] mt-1">
                                    {email || "asample.user@gmail.com"}
                                </p>
                            </Card>

                            {/* Information & Preferences Card */}
                            <Card className="bg-white border-[#EAE5DD] rounded-[24px] p-6 sm:p-7 flex flex-col gap-6 shadow-xs text-sm">
                                {/* Information Section */}
                                <div className="flex flex-col gap-3">
                                    <h3 className="text-base font-bold text-[#1A1A1A]">Information</h3>
                                    <div className="flex flex-col gap-2 leading-relaxed">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-[#1A1A1A]">Name:</span>
                                            <span className="text-[#525252]">{displayName}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-[#1A1A1A]">Email:</span>
                                            <span className="text-[#525252]">{email || "asample.user@gmail.com"}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-[#1A1A1A]">Phone:</span>
                                            <span className="text-[#525252]">{phone || "+880 xxxx-xxxxxx"}</span>
                                        </div>
                                    </div>
                                </div>

                                <Separator className="bg-[#F5F2EC]" />

                                {/* Preferences Section */}
                                <div className="flex flex-col gap-3">
                                    <h3 className="text-base font-bold text-[#1A1A1A]">Preferences</h3>
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-[#1A1A1A]">Role:</span>
                                        <span className="font-bold text-[#C15C2B]">{role}</span>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* ── Right Column: Edit Profile & Password Form (8 cols) ── */}
                        <Card className="lg:col-span-8 bg-white border-[#EAE5DD] rounded-[24px] p-6 sm:p-8 flex flex-col gap-5 shadow-xs">

                            {/* First Name & Last Name */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="firstName" className="text-sm font-bold text-[#1A1A1A]">
                                        First Name<span className="text-[#C15C2B]">*</span>
                                    </Label>
                                    <Input
                                        id="firstName"
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        placeholder="First Name"
                                        className="h-11 rounded-[12px] bg-white border-[#E8E1D8] text-sm text-[#1A1A1A] placeholder:text-[#A3A3A3] focus-visible:ring-0 focus-visible:border-[#1A1A1A] transition-all shadow-none"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="lastName" className="text-sm font-bold text-[#1A1A1A]">
                                        Last Name<span className="text-[#C15C2B]">*</span>
                                    </Label>
                                    <Input
                                        id="lastName"
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        placeholder="Last Name"
                                        className="h-11 rounded-[12px] bg-white border-[#E8E1D8] text-sm text-[#1A1A1A] placeholder:text-[#A3A3A3] focus-visible:ring-0 focus-visible:border-[#1A1A1A] transition-all shadow-none"
                                    />
                                </div>
                            </div>

                            {/* Email (Readonly) */}
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="email" className="text-sm font-bold text-[#1A1A1A]">
                                    Email<span className="text-[#C15C2B]">*</span>
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    readOnly
                                    disabled
                                    placeholder="Enter your email"
                                    className="h-11 rounded-[12px] bg-white border-[#E8E1D8] text-sm text-[#737373] cursor-not-allowed shadow-none select-none opacity-80"
                                />
                            </div>

                            {/* Phone with Country Selector (Readonly) */}
                            <div className="flex flex-col gap-2">
                                <Label className="text-sm font-bold text-[#1A1A1A]">
                                    Phone<span className="text-[#C15C2B]">*</span>
                                </Label>
                                <div className="flex items-center h-11 rounded-[12px] border border-[#E8E1D8] bg-white overflow-hidden opacity-80 cursor-not-allowed">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger disabled className="h-full px-3 flex items-center gap-1.5 text-sm border-r border-[#E5E0D8] bg-transparent outline-none cursor-not-allowed shrink-0">
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
                                        readOnly
                                        disabled
                                        placeholder="Phone number"
                                        className="flex-1 h-full px-3.5 bg-transparent text-sm text-[#737373] cursor-not-allowed outline-none"
                                    />
                                </div>
                            </div>

                            {/* Change Password */}
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="password" className="text-sm font-bold text-[#1A1A1A]">
                                    Change Password
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="*************"
                                        className="h-11 pr-10 rounded-[12px] bg-white border-[#E8E1D8] text-sm text-[#1A1A1A] placeholder:text-[#A3A3A3] focus-visible:ring-0 focus-visible:border-[#1A1A1A] transition-all shadow-none"
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
                                <Label htmlFor="confirmPassword" className="text-sm font-bold text-[#1A1A1A]">
                                    Confirm Password
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="*************"
                                        className="h-11 pr-10 rounded-[12px] bg-white border-[#E8E1D8] text-sm text-[#1A1A1A] placeholder:text-[#A3A3A3] focus-visible:ring-0 focus-visible:border-[#1A1A1A] transition-all shadow-none"
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
                                <Label className="text-sm font-bold text-[#1A1A1A]">
                                    Role<span className="text-[#C15C2B]">*</span>
                                </Label>
                                <DropdownMenu>
                                    <DropdownMenuTrigger disabled className="w-full h-11 px-4 rounded-[12px] border border-[#E8E1D8] bg-white flex items-center justify-between text-sm font-medium text-[#737373] outline-none cursor-not-allowed opacity-80">
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
                                    disabled={saving}
                                    className="h-11 px-6 rounded-xl bg-[#C15C2B] hover:bg-[#A84F23] text-white font-semibold text-sm transition-all shadow-none cursor-pointer flex items-center gap-2 disabled:opacity-50"
                                >
                                    {saving ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            <span>Saving...</span>
                                        </>
                                    ) : (
                                        <span>Save Changes</span>
                                    )}
                                </Button>
                            </div>
                        </Card>

                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
