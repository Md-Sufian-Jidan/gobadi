"use client"

import * as React from "react"
import ResuableTable, { TableColumn } from "@/components/shared/ResuableTable"
import { Avatar } from "@/components/ui/avatar"
import { MoreVertical, Eye, Edit, Trash2, CalendarCheck, Stethoscope } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export interface AnimalOwner {
  name: string
  tag: string
  avatar?: string
}

export interface AnimalItem {
  id: string
  animalTag: string
  animalName: string
  category: string
  avatar?: string
  age: string
  breed: string
  gender: string
  liveWeight: string
  price: string
  vaccinationDate: string
  doctorVisit: number
  owner: AnimalOwner
}

const MOCK_ANIMALS: AnimalItem[] = [
  {
    id: "animal-1",
    animalTag: "#33512345",
    animalName: "Kala Pahar",
    category: "Bull",
    avatar: "https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&w=150&q=80",
    age: "28 mo",
    breed: "Albenian",
    gender: "Male",
    liveWeight: "480 kg",
    price: "680 /kg",
    vaccinationDate: "25/04/2026",
    doctorVisit: 3,
    owner: {
      name: "Abdul Karim",
      tag: "#33512346",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    },
  },
  {
    id: "animal-2",
    animalTag: "#33512346",
    animalName: "Lali",
    category: "Local",
    avatar: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=150&q=80",
    age: "16 mo",
    breed: "Australian",
    gender: "Male",
    liveWeight: "420 kg",
    price: "685/kg",
    vaccinationDate: "25/04/2026",
    doctorVisit: 3,
    owner: {
      name: "Nazrul Haque",
      tag: "#33512347",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    },
  },
  {
    id: "animal-3",
    animalTag: "#33512347",
    animalName: "Donald Tramp",
    category: "Bull",
    avatar: "https://images.unsplash.com/photo-1570042707229-450f3aa10006?auto=format&fit=crop&w=150&q=80",
    age: "14 mo",
    breed: "Bangladeshi",
    gender: "Male",
    liveWeight: "740 kg",
    price: "680 /kg",
    vaccinationDate: "25/04/2026",
    doctorVisit: 3,
    owner: {
      name: "Jahangir Alam",
      tag: "#33512352",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    },
  },
  {
    id: "animal-4",
    animalTag: "#33512348",
    animalName: "Dhola Pahar",
    category: "Buffalo",
    avatar: "https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?auto=format&fit=crop&w=150&q=80",
    age: "18 mo",
    breed: "Indian",
    gender: "Male",
    liveWeight: "380 kg",
    price: "690 /kg",
    vaccinationDate: "25/04/2026",
    doctorVisit: 3,
    owner: {
      name: "Delwar Hossain",
      tag: "#33512354",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
    },
  },
  {
    id: "animal-5",
    animalTag: "#33512349",
    animalName: "Kala Pahar",
    category: "Bull",
    avatar: "https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&w=150&q=80",
    age: "28 mo",
    breed: "Albenian",
    gender: "Male",
    liveWeight: "480 kg",
    price: "680 /kg",
    vaccinationDate: "25/04/2026",
    doctorVisit: 3,
    owner: {
      name: "Golam Mostafa",
      tag: "#33512339",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80",
    },
  },
  {
    id: "animal-6",
    animalTag: "#33512350",
    animalName: "Lali",
    category: "Local",
    avatar: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=150&q=80",
    age: "16 mo",
    breed: "Australian",
    gender: "Male",
    liveWeight: "420 kg",
    price: "685/kg",
    vaccinationDate: "25/04/2026",
    doctorVisit: 3,
    owner: {
      name: "Abu Bakar Siddique",
      tag: "#33512332",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
    },
  },
  {
    id: "animal-7",
    animalTag: "#33512351",
    animalName: "Donald Tramp",
    category: "Bull",
    avatar: "https://images.unsplash.com/photo-1570042707229-450f3aa10006?auto=format&fit=crop&w=150&q=80",
    age: "14 mo",
    breed: "Bangladeshi",
    gender: "Male",
    liveWeight: "740 kg",
    price: "680 /kg",
    vaccinationDate: "25/04/2026",
    doctorVisit: 3,
    owner: {
      name: "Shamsuzzaman",
      tag: "#33512345",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80",
    },
  },
  {
    id: "animal-8",
    animalTag: "#33512352",
    animalName: "Dhola Pahar",
    category: "Buffalo",
    avatar: "https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?auto=format&fit=crop&w=150&q=80",
    age: "18 mo",
    breed: "Indian",
    gender: "Male",
    liveWeight: "380 kg",
    price: "690 /kg",
    vaccinationDate: "25/04/2026",
    doctorVisit: 3,
    owner: {
      name: "Zahid Hasan",
      tag: "#33512546",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80",
    },
  },
  {
    id: "animal-9",
    animalTag: "#33512353",
    animalName: "Kala Pahar",
    category: "Bull",
    avatar: "https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&w=150&q=80",
    age: "28 mo",
    breed: "Albenian",
    gender: "Male",
    liveWeight: "480 kg",
    price: "680 /kg",
    vaccinationDate: "25/04/2026",
    doctorVisit: 3,
    owner: {
      name: "Mahbubur Rahman",
      tag: "#33519876",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
    },
  },
  {
    id: "animal-10",
    animalTag: "#33512354",
    animalName: "Lali",
    category: "Local",
    avatar: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=150&q=80",
    age: "16 mo",
    breed: "Australian",
    gender: "Male",
    liveWeight: "420 kg",
    price: "685/kg",
    vaccinationDate: "25/04/2026",
    doctorVisit: 3,
    owner: {
      name: "Nazmul Huda",
      tag: "#33515864",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&q=80",
    },
  },
  {
    id: "animal-11",
    animalTag: "#33512355",
    animalName: "Donald Tramp",
    category: "Bull",
    avatar: "https://images.unsplash.com/photo-1570042707229-450f3aa10006?auto=format&fit=crop&w=150&q=80",
    age: "14 mo",
    breed: "Bangladeshi",
    gender: "Male",
    liveWeight: "740 kg",
    price: "680 /kg",
    vaccinationDate: "25/04/2026",
    doctorVisit: 3,
    owner: {
      name: "Nurul Islam",
      tag: "#33512968",
      avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=150&q=80",
    },
  },
  {
    id: "animal-12",
    animalTag: "#33512356",
    animalName: "Dhola Pahar",
    category: "Buffalo",
    avatar: "https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?auto=format&fit=crop&w=150&q=80",
    age: "18 mo",
    breed: "Indian",
    gender: "Male",
    liveWeight: "380 kg",
    price: "690 /kg",
    vaccinationDate: "25/04/2026",
    doctorVisit: 3,
    owner: {
      name: "Mizanur Rahman",
      tag: "#33512747",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    },
  },
]

export interface AnimalListTableProps {
  searchValue?: string
  selectedFilter?: string
  hideHeaderControls?: boolean
}

export default function AnimalListTable({
  searchValue = "",
  selectedFilter = "all",
  hideHeaderControls = false,
}: AnimalListTableProps) {
  const [currentPage, setCurrentPage] = React.useState(1)
  const [selectedIds, setSelectedIds] = React.useState<(string | number)[]>([])

  const filteredData = React.useMemo(() => {
    return MOCK_ANIMALS.filter((animal) => {
      const matchesSearch =
        animal.animalTag.toLowerCase().includes(searchValue.toLowerCase()) ||
        animal.animalName.toLowerCase().includes(searchValue.toLowerCase()) ||
        animal.breed.toLowerCase().includes(searchValue.toLowerCase()) ||
        animal.owner.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        animal.owner.tag.includes(searchValue)

      return matchesSearch
    })
  }, [searchValue])

  const columns: TableColumn<AnimalItem>[] = [
    {
      key: "animalTag",
      header: "Animal Tag",
      cell: (item) => (
        <span className="font-bold text-[#1A1A1A]">{item.animalTag}</span>
      ),
    },
    {
      key: "animalName",
      header: "Animal Name",
      cell: (item) => (
        <div className="flex items-center gap-3">
          <Avatar
            src={item.avatar}
            alt={item.animalName}
            fallback={item.animalName.charAt(0)}
            size="md"
          />
          <div className="flex flex-col">
            <span className="font-bold text-[#1A1A1A] text-sm leading-tight">
              {item.animalName}
            </span>
            <span className="text-xs text-[#737373] font-normal leading-tight">
              {item.category}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: "age",
      header: "Age",
      cell: (item) => (
        <span className="font-medium text-[#1A1A1A]">{item.age}</span>
      ),
    },
    {
      key: "breed",
      header: "Breed",
      cell: (item) => (
        <span className="font-medium text-[#1A1A1A]">{item.breed}</span>
      ),
    },
    {
      key: "gender",
      header: "Gender",
      cell: (item) => (
        <span className="font-medium text-[#1A1A1A]">{item.gender}</span>
      ),
    },
    {
      key: "liveWeight",
      header: "Live Wt",
      cell: (item) => (
        <span className="font-medium text-[#1A1A1A]">{item.liveWeight}</span>
      ),
    },
    {
      key: "price",
      header: "Price",
      cell: (item) => (
        <span className="font-medium text-[#1A1A1A]">{item.price}</span>
      ),
    },
    {
      key: "vaccinationDate",
      header: "Vaccination Date",
      cell: (item) => (
        <span className="font-medium text-[#1A1A1A]">{item.vaccinationDate}</span>
      ),
    },
    {
      key: "doctorVisit",
      header: "Doctor Visit",
      align: "center",
      cell: (item) => (
        <span className="font-medium text-[#1A1A1A]">{item.doctorVisit}</span>
      ),
    },
    {
      key: "owner",
      header: "Owner",
      cell: (item) => (
        <div className="flex items-center gap-3">
          <Avatar
            src={item.owner.avatar}
            alt={item.owner.name}
            fallback={item.owner.name.charAt(0)}
            size="md"
          />
          <div className="flex flex-col">
            <span className="font-bold text-[#1A1A1A] text-sm leading-tight">
              {item.owner.name}
            </span>
            <span className="text-xs text-[#737373] font-normal leading-tight">
              {item.owner.tag}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: "action",
      header: "Action",
      align: "center",
      cell: (item) => (
        <DropdownMenu>
          <DropdownMenuTrigger className="p-1 rounded-md text-[#525252] hover:text-[#1A1A1A] hover:bg-[#F7F4EE] transition-colors outline-none cursor-pointer">
            <MoreVertical className="w-4 h-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-44 bg-white border border-[#EAE5DD] shadow-lg rounded-xl p-1 z-30"
          >
            <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-[#1A1A1A] hover:bg-[#F7F4EE] rounded-lg cursor-pointer">
              <Eye className="w-3.5 h-3.5 text-[#525252]" />
              <span>View Animal</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-[#1A1A1A] hover:bg-[#F7F4EE] rounded-lg cursor-pointer">
              <Stethoscope className="w-3.5 h-3.5 text-[#525252]" />
              <span>Doctor Records</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-[#1A1A1A] hover:bg-[#F7F4EE] rounded-lg cursor-pointer">
              <Edit className="w-3.5 h-3.5 text-[#525252]" />
              <span>Edit Details</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg cursor-pointer">
              <Trash2 className="w-3.5 h-3.5 text-red-600" />
              <span>Delete Animal</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  return (
    <ResuableTable<AnimalItem>
      title={hideHeaderControls ? undefined : "Total Animals"}
      totalCount={hideHeaderControls ? undefined : 12600}
      data={filteredData}
      columns={columns}
      getRowKey={(item) => item.id}
      selectedIds={selectedIds}
      onSelectionChange={setSelectedIds}
      currentPage={currentPage}
      totalPages={50}
      onPageChange={setCurrentPage}
    />
  )
}
