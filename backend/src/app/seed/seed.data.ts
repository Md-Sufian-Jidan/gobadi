import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";

const SEED_PASSWORD = "Password123!";

async function seedUsers() {
  const count = await prisma.user.count();

  if (count > 0) {
    // console.log("ℹ️  Users already seeded, skipping...");
    return prisma.user.findMany();
  }
  // console.log("Seeding users...");
  const passwordHash = await bcrypt.hash(SEED_PASSWORD, 10);

  const doctorData = [
    {
      phone: "+8801700000001",
      email: "doctor1@gobadi.test",
      name: "Dr. Michael Wilson",
    },
    {
      phone: "+8801700000002",
      email: "doctor2@gobadi.test",
      name: "Dr. Jessica Taylor",
    },
    {
      phone: "+8801700000003",
      email: "doctor3@gobadi.test",
      name: "Dr. Ahmed Rahman",
    },
    {
      phone: "+8801700000004",
      email: "doctor4@gobadi.test",
      name: "Dr. Farhana Islam",
    },
    {
      phone: "+8801700000005",
      email: "doctor5@gobadi.test",
      name: "Dr. Tanvir Hasan",
    },
    {
      phone: "+8801700000006",
      email: "doctor6@gobadi.test",
      name: "Dr. Nusrat Jahan",
    },
    {
      phone: "+8801700000007",
      email: "doctor7@gobadi.test",
      name: "Dr. Rakibul Karim",
    },
    {
      phone: "+8801700000008",
      email: "doctor8@gobadi.test",
      name: "Dr. Samira Akter",
    },
    {
      phone: "+8801700000009",
      email: "doctor9@gobadi.test",
      name: "Dr. Mahmudul Hasan",
    },
    {
      phone: "+8801700000010",
      email: "doctor10@gobadi.test",
      name: "Dr. Ayesha Rahman",
    },
    {
      phone: "+8801700000011",
      email: "doctor11@gobadi.test",
      name: "Dr. Imran Hossain",
    },
    {
      phone: "+8801700000012",
      email: "doctor12@gobadi.test",
      name: "Dr. Sultana Ahmed",
    },
    {
      phone: "+8801700000013",
      email: "doctor13@gobadi.test",
      name: "Dr. Faisal Karim",
    },
    {
      phone: "+8801700000014",
      email: "doctor14@gobadi.test",
      name: "Dr. Mehedi Hasan",
    },
    {
      phone: "+8801700000015",
      email: "doctor15@gobadi.test",
      name: "Dr. Sadia Islam",
    },
  ];

  const doctorUsers = await Promise.all(
    doctorData.map((doctor) =>
      prisma.user.create({
        data: {
          phone: doctor.phone,
          email: doctor.email,
          role: "doctor",
          name: doctor.name,
          password: passwordHash,
          verified: true,
        },
      })
    )
  );

  const farmerData = [
    {
      phone: "+8801800000001",
      email: "farmer1@gobadi.test",
      name: "Abdul Karim",
    },
    {
      phone: "+8801800000002",
      email: "farmer2@gobadi.test",
      name: "Rahim Uddin",
    },
    {
      phone: "+8801800000003",
      email: "farmer3@gobadi.test",
      name: "Kamal Hossain",
    },
    {
      phone: "+8801800000004",
      email: "farmer4@gobadi.test",
      name: "Jamal Mia",
    },
    {
      phone: "+8801800000005",
      email: "farmer5@gobadi.test",
      name: "Habib Ullah",
    },
    {
      phone: "+8801800000006",
      email: "farmer6@gobadi.test",
      name: "Sohel Rana",
    },
    {
      phone: "+8801800000007",
      email: "farmer7@gobadi.test",
      name: "Nasir Ahmed",
    },
    {
      phone: "+8801800000008",
      email: "farmer8@gobadi.test",
      name: "Mizanur Rahman",
    },
    {
      phone: "+8801800000009",
      email: "farmer9@gobadi.test",
      name: "Rafiqul Islam",
    },
    {
      phone: "+8801800000010",
      email: "farmer10@gobadi.test",
      name: "Shahidul Alam",
    },
    {
      phone: "+8801800000011",
      email: "farmer11@gobadi.test",
      name: "Arif Hossain",
    },
    {
      phone: "+8801800000012",
      email: "farmer12@gobadi.test",
      name: "Masud Rana",
    },
    {
      phone: "+8801800000013",
      email: "farmer13@gobadi.test",
      name: "Babul Mia",
    },
    {
      phone: "+8801800000014",
      email: "farmer14@gobadi.test",
      name: "Saidur Rahman",
    },
    {
      phone: "+8801800000015",
      email: "farmer15@gobadi.test",
      name: "Anwar Hossain",
    },
  ];

  const farmerUsers = await Promise.all(
    farmerData.map((farmer) =>
      prisma.user.create({
        data: {
          phone: farmer.phone,
          email: farmer.email,
          role: "user",
          name: farmer.name,
          password: passwordHash,
          verified: true,
        },
      })
    )
  );

  const clinicData = [
    {
      phone: "+8801900000001",
      email: "clinic1@gobadi.test",
      name: "Savar Veterinary Clinic",
    },
    {
      phone: "+8801900000002",
      email: "clinic2@gobadi.test",
      name: "Narayanganj Animal Care",
    },
  ];

  const clinicUsers = await Promise.all(
    clinicData.map((clinic) =>
      prisma.user.create({
        data: {
          phone: clinic.phone,
          email: clinic.email,
          role: "clinic",
          name: clinic.name,
          password: passwordHash,
          verified: true,
        },
      })
    )
  );

  const adminData = [
    {
      phone: "+8801900000003",
      email: "admin@gobadi.test",
      name: "Admin Supervisor",
    },
    {
      phone: "+8801900000004",
      email: "manager@gobadi.test",
      name: "System Manager",
    },
  ];

  const adminUsers = await Promise.all(
    adminData.map((admin) =>
      prisma.user.create({
        data: {
          phone: admin.phone,
          email: admin.email,
          role: "admin",
          name: admin.name,
          password: passwordHash,
          verified: true,
        },
      })
    )
  );

  const allUsers = [
    ...doctorUsers,
    ...farmerUsers,
    ...clinicUsers,
    ...adminUsers,
  ];

  // console.log("✅ Users seeded:", {
  //   doctors: doctorUsers.length,
  //   farmers: farmerUsers.length,
  //   clinics: clinicUsers.length,
  //   admins: adminUsers.length,
  //   total: allUsers.length,
  // });

  return allUsers;
}

async function seedDoctors(users: any[]) {
  const count = await prisma.doctor.count();
  if (count > 0) {
    // console.log("ℹ️  Doctors already seeded, skipping...");
    return prisma.doctor.findMany();
  }

  const doctorUsers = users.filter((u) => u.role === "doctor");
  // console.log("Seeding doctors...");

  const doc1 = await prisma.doctor.create({
    data: {
      userId: doctorUsers[0]?.id ?? null,
      name: "Dr. Michael Wilson",
      specialty: "Veterinary Surgeon",
      experience: "8 Years",
      rating: 4.8,
      avatar: "michael_doctor.png",
      bio: "Dr. Michael has spent over 8 years caring for farm animals, specialized in large cattle surgery and herd management.",
      qualifications: ["DVM, BAU", "MS in Large Animal Surgery"],
      licenseNumber: "VET-LIC-8821",
      consultationFee: 800,
      isVerified: true,
    },
  });

  const doc2 = await prisma.doctor.create({
    data: {
      userId: doctorUsers[1]?.id ?? null,
      name: "Dr. Jessica Taylor",
      specialty: "Animal Nutritionist",
      experience: "6 Years",
      rating: 4.9,
      avatar: "jessica_doctor.png",
      bio: "Dr. Jessica specializes in optimal nutrition and disease prevention for cows, goats, and sheep.",
      qualifications: ["DVM, BAU", "MS in Animal Nutrition"],
      licenseNumber: "VET-LIC-9932",
      consultationFee: 600,
      isVerified: true,
    },
  });

  const doc3 = await prisma.doctor.create({
    data: {
      userId: doctorUsers[2]?.id ?? null,
      name: "Dr. Ahmed Rahman",
      specialty: "Large Animal Medicine",
      experience: "10 Years",
      rating: 4.7,
      avatar: "ahmed_doctor.png",
      bio: "Dr. Ahmed provides comprehensive veterinary care for cattle and other livestock, with a focus on disease diagnosis and prevention.",
      qualifications: ["DVM, BAU", "MVSc in Veterinary Medicine"],
      licenseNumber: "VET-LIC-1045",
      consultationFee: 700,
      isVerified: true,
    },
  });

  const doc4 = await prisma.doctor.create({
    data: {
      userId: doctorUsers[3]?.id ?? null,
      name: "Dr. Farhana Islam",
      specialty: "Veterinary Medicine",
      experience: "7 Years",
      rating: 4.8,
      avatar: "farhana_doctor.png",
      bio: "Dr. Farhana specializes in preventive healthcare, vaccination, and treatment of common diseases in farm animals.",
      qualifications: ["DVM, CVASU", "MS in Veterinary Medicine"],
      licenseNumber: "VET-LIC-2167",
      consultationFee: 650,
      isVerified: true,
    },
  });

  const doc5 = await prisma.doctor.create({
    data: {
      userId: doctorUsers[4]?.id ?? null,
      name: "Dr. Tanvir Hasan",
      specialty: "Livestock Specialist",
      experience: "9 Years",
      rating: 4.6,
      avatar: "tanvir_doctor.png",
      bio: "Dr. Tanvir focuses on livestock health, herd productivity, and early detection of infectious diseases.",
      qualifications: ["DVM, BAU", "MS in Livestock Production"],
      licenseNumber: "VET-LIC-3278",
      consultationFee: 750,
      isVerified: true,
    },
  });

  const doc6 = await prisma.doctor.create({
    data: {
      userId: doctorUsers[5]?.id ?? null,
      name: "Dr. Nusrat Jahan",
      specialty: "Veterinary Dermatologist",
      experience: "5 Years",
      rating: 4.9,
      avatar: "nusrat_doctor.png",
      bio: "Dr. Nusrat specializes in diagnosing and treating skin infections, allergies, and parasitic conditions in livestock.",
      qualifications: ["DVM, BAU", "PGD in Veterinary Dermatology"],
      licenseNumber: "VET-LIC-4389",
      consultationFee: 550,
      isVerified: true,
    },
  });

  const doc7 = await prisma.doctor.create({
    data: {
      userId: doctorUsers[6]?.id ?? null,
      name: "Dr. Rakibul Karim",
      specialty: "Veterinary Reproduction Specialist",
      experience: "11 Years",
      rating: 4.8,
      avatar: "rakibul_doctor.png",
      bio: "Dr. Rakibul specializes in cattle reproductive health, breeding management, and fertility-related treatments.",
      qualifications: ["DVM, BAU", "MS in Animal Reproduction"],
      licenseNumber: "VET-LIC-5490",
      consultationFee: 850,
      isVerified: true,
    },
  });

  const doc8 = await prisma.doctor.create({
    data: {
      userId: doctorUsers[7]?.id ?? null,
      name: "Dr. Samira Akter",
      specialty: "Small Ruminant Specialist",
      experience: "6 Years",
      rating: 4.7,
      avatar: "samira_doctor.png",
      bio: "Dr. Samira provides specialized healthcare for goats and sheep, including nutrition, vaccination, and disease management.",
      qualifications: ["DVM, CVASU", "MS in Small Ruminant Medicine"],
      licenseNumber: "VET-LIC-6512",
      consultationFee: 600,
      isVerified: true,
    },
  });

  const doc9 = await prisma.doctor.create({
    data: {
      userId: doctorUsers[8]?.id ?? null,
      name: "Dr. Mahmudul Hasan",
      specialty: "Veterinary Pathologist",
      experience: "12 Years",
      rating: 4.9,
      avatar: "mahmudul_doctor.png",
      bio: "Dr. Mahmudul has extensive experience in laboratory diagnosis, infectious diseases, and livestock disease surveillance.",
      qualifications: ["DVM, BAU", "PhD in Veterinary Pathology"],
      licenseNumber: "VET-LIC-7623",
      consultationFee: 900,
      isVerified: true,
    },
  });

  const doc10 = await prisma.doctor.create({
    data: {
      userId: doctorUsers[9]?.id ?? null,
      name: "Dr. Ayesha Rahman",
      specialty: "Farm Animal Practitioner",
      experience: "7 Years",
      rating: 4.8,
      avatar: "ayesha_doctor.png",
      bio: "Dr. Ayesha provides practical veterinary care for cattle, goats, and sheep with a strong focus on preventive health and farm management.",
      qualifications: ["DVM, BAU", "MS in Veterinary Public Health"],
      licenseNumber: "VET-LIC-8734",
      consultationFee: 700,
      isVerified: true,
    },
  });

  // console.log("✅ Doctors seeded:", [
  //   doc1.name,
  //   doc2.name,
  //   doc3.name,
  //   doc4.name,
  //   doc5.name,
  //   doc6.name,
  //   doc7.name,
  //   doc8.name,
  //   doc9.name,
  //   doc10.name,
  // ]);

  return [
    doc1,
    doc2,
    doc3,
    doc4,
    doc5,
    doc6,
    doc7,
    doc8,
    doc9,
    doc10,
  ];
}

async function seedAvailability(doctors: any[]) {
  const count = await prisma.doctorAvailability.count();
  if (count > 0) {
    // console.log("ℹ️  Doctor availability already seeded, skipping...");
    return;
  }

  // console.log("Seeding doctor availability (Mon-Fri, 09:00-17:00)...");
  const weekdays = [1, 2, 3, 4, 5];
  const entries = doctors.flatMap((doctor) =>
    weekdays.map((dayOfWeek) => ({
      doctorId: doctor.id,
      dayOfWeek,
      startTime: "09:00",
      endTime: "17:00",
      slotDurationMinutes: 30,
      bufferMinutes: 10,
      isActive: true,
    }))
  );
  await prisma.doctorAvailability.createMany({ data: entries });
  // console.log("✅ Doctor availability seeded:", entries.length, "entries");
}

async function seedAnimals() {
  const count = await prisma.animal.count();
  if (count > 0) {
    // console.log("ℹ️  Animals already seeded, skipping...");
    return;
  }

  // console.log("Seeding animals...");
  await prisma.animal.createMany({
    data: [
      {
        name: "Donald Tramp",
        breed: "Albino Buffalo",
        weight: "725 Kg",
        age: "28 Months",
        color: "Pinkish White",
      },
      {
        name: "Kabir Cow",
        breed: "Bangladeshi Cow",
        weight: "650 Kg",
        age: "24 Months",
        color: "Brown",
      },
      {
        name: "Max",
        breed: "Golden Retriever",
        weight: "30 Kg",
        age: "3 Years",
        color: "Golden",
      },
      {
        name: "Luna",
        breed: "Persian Cat",
        weight: "4.5 Kg",
        age: "2 Years",
        color: "White",
      },
      {
        name: "Rocky",
        breed: "German Shepherd",
        weight: "34 Kg",
        age: "5 Years",
        color: "Black & Tan",
      },
      {
        name: "Bella",
        breed: "Labrador Retriever",
        weight: "28 Kg",
        age: "4 Years",
        color: "Chocolate",
      },
      {
        name: "Charlie",
        breed: "Beagle",
        weight: "12 Kg",
        age: "2 Years",
        color: "Tricolor",
      },
      {
        name: "Milo",
        breed: "Siamese Cat",
        weight: "4 Kg",
        age: "1 Year",
        color: "Cream & Brown",
      },
      {
        name: "Daisy",
        breed: "Poodle",
        weight: "8 Kg",
        age: "3 Years",
        color: "White",
      },
      {
        name: "Coco",
        breed: "Bengal Cat",
        weight: "5 Kg",
        age: "2 Years",
        color: "Spotted Brown",
      },
      {
        name: "Bruno",
        breed: "Rottweiler",
        weight: "45 Kg",
        age: "6 Years",
        color: "Black & Tan",
      },
      {
        name: "Lucy",
        breed: "Cocker Spaniel",
        weight: "13 Kg",
        age: "4 Years",
        color: "Black",
      },
    ],
  });
  // console.log("✅ Animals seeded");
}

async function seedCategoriesAndBrandsAndProducts() {
  const catCount = await prisma.category.count();
  if (catCount > 0) {
    // console.log("ℹ️  Categories/brands/products already seeded, skipping...");
    return { categories: [], brands: [], products: [] };
  }

  // console.log("Seeding categories, brands, and products...");

  const cat1 = await prisma.category.create({
    data: {
      name: "Medicine & Vaccines",
      slug: "medicine-vaccines",
      description: "Antibiotics, vaccines, and supplements",
    },
  });
  const cat2 = await prisma.category.create({
    data: {
      name: "Feeds & Supplements",
      slug: "feeds-supplements",
      description: "Animal feeds, bhushi, and growth boosters",
    },
  });
  const cat3 = await prisma.category.create({
    data: {
      name: "Tools & Accessories",
      slug: "tools-accessories",
      description: "Ear tags, milk pails, and farm machinery",
    },
  });
  const cat4 = await prisma.category.create({
    data: {
      name: "Equipment & Machinery",
      slug: "equipment-machinery",
      description: "Milking machines, feed mixers, and farm equipment",
    },
  });
  const cat5 = await prisma.category.create({
    data: {
      name: "Consultation Services",
      slug: "consultation-services",
      description: "Veterinary consultations and health advisory services",
    },
  });
  const categories = [cat1, cat2, cat3, cat4, cat5];

  const brand1 = await prisma.brand.create({
    data: {
      name: "Renata Animal Health",
      slug: "renata-animal-health",
      logo: "renata.png",
      website: "https://renata-ltd.com",
    },
  });
  const brand2 = await prisma.brand.create({
    data: {
      name: "ACI Animal Health",
      slug: "aci-animal-health",
      logo: "aci.png",
      website: "https://aci-bd.com",
    },
  });
  const brand3 = await prisma.brand.create({
    data: {
      name: "Square Vet",
      slug: "square-vet",
      logo: "square.png",
      website: "https://squarepharma.com.bd",
    },
  });
  const brand4 = await prisma.brand.create({
    data: {
      name: "Kazi Vet",
      slug: "kazi-vet",
      logo: "square.png",
      website: "https://kaziagro.com",
    },
  });
  const brand5 = await prisma.brand.create({
    data: {
      name: "Navana",
      slug: "navana",
      logo: "square.png",
      website: "https://navana.com",
    },
  });
  const brands = [brand1, brand2, brand3, brand4, brand5];

  const prod1 = await prisma.product.create({
    data: {
      name: "Renadex Injection 100ml",
      sku: "MED-REN-001",
      price: 260,
      discount: 15,
      images: ["renadex.png"],
      description: "Effective rehydration and support injection for weak cattle.",
      categoryId: cat1.id,
      brandId: brand1.id,
      status: "published",
    },
  });
  const prod2 = await prisma.product.create({
    data: {
      name: "ACI Cattle Feed Premium Mix 25kg",
      sku: "FED-ACI-002",
      price: 1350,
      discount: 50,
      images: ["cattle_feed.png"],
      description: "Balanced feed formulated to boost milk production in dairy cows.",
      categoryId: cat2.id,
      brandId: brand2.id,
      status: "published",
    },
  });
  const prod3 = await prisma.product.create({
    data: {
      name: "Square Dewormer Bolus",
      sku: "MED-SQ-003",
      price: 45,
      discount: 0,
      images: ["dewormer.png"],
      description: "Broad spectrum dewormer tablet for goats and cows.",
      categoryId: cat1.id,
      brandId: brand3.id,
      status: "published",
    },
  });
  const products = [prod1, prod2, prod3];

  await prisma.inventoryLedger.createMany({
    data: [
      { productId: prod1.id, quantity: 150, movementType: "addition", referenceId: "Initial import stock" },
      { productId: prod2.id, quantity: 80, movementType: "addition", referenceId: "Initial warehouse arrival" },
      { productId: prod3.id, quantity: 1200, movementType: "addition", referenceId: "Initial pharmacy stock" },
    ],
  });

  // console.log("✅ Categories, brands, products, and inventory seeded");
  return { categories, brands, products };
}

async function seedClinicAndServices(users: any[], doctors: any[]) {
  const count = await prisma.clinic.count();
  if (count > 0) {
    // console.log("ℹ️  Clinic/services already seeded, skipping...");
    return prisma.clinic.findFirst();
  }

  const clinicManager = users.find((u) => u.role === "clinic") || users[0];
  // console.log("Seeding clinic and services...");

  const clinic = await prisma.clinic.create({
    data: {
      userId: clinicManager.id,
      name: "Savar Central Veterinary Clinic",
      location: "Dhaka - Aricha Hwy, Savar",
      description: "Comprehensive medical care, diagnostic lab, and surgery suite for all livestock species.",
      isVerified: true,
      rating: 4.9,
      avatar: "savar_clinic.png",
      businessHours: { mon_fri: "08:00 - 20:00", sat_sun: "09:00 - 15:00" },
    },
  });
  const clinic2 = await prisma.clinic.create({
    data: {
      userId: clinicManager.id,
      name: "Mirpur Central Veterinary Clinic",
      location: "Dhaka - Mirpur",
      description: "Comprehensive medical care, diagnostic lab, and surgery suite for all livestock species.",
      isVerified: true,
      rating: 4.8,
      avatar: "mirpur_clinic.png",
      businessHours: { mon_fri: "08:00 - 20:00", sat_sun: "09:00 - 15:00" },
    },
  });
  const clinic3 = await prisma.clinic.create({
    data: {
      userId: clinicManager.id,
      name: "Dhanmondi Central Veterinary Clinic",
      location: "Dhaka - Dhanmondi",
      description: "Comprehensive medical care, diagnostic lab, and surgery suite for all livestock species.",
      isVerified: true,
      rating: 4.9,
      avatar: "dhanmondi_clinic.png",
      businessHours: { mon_fri: "08:00 - 20:00", sat_sun: "09:00 - 15:00" },
    },
  });

  await prisma.clinicDoctor.createMany({
    data: doctors.map((d) => ({ clinicId: clinic.id, doctorId: d.id })),
  });

  await prisma.service.createMany({
    data: [
      {
        providerType: "clinic",
        providerId: clinic.id,
        name: "Cattle Vaccination & Deworming Package",
        description: "Full herd diagnostic and immunization package.",
        price: 1800,
        durationMinutes: 45,
        isOnline: false,
        isOffline: true,
        location: clinic.location,
        isActive: true,
      },
      {
        providerType: "doctor",
        providerId: doctors[0].id,
        name: "Large Cattle Surgical Consult",
        description: "Emergency and scheduled surgical consultation for cattle.",
        price: 1000,
        durationMinutes: 30,
        isOnline: true,
        isOffline: true,
        isActive: true,
      },
    ],
  });

  // console.log("✅ Clinic and services seeded");
  return clinic;
}

async function seedLivestock(users: any[]) {
  const count = await prisma.livestock.count();
  if (count > 0) {
    // console.log("ℹ️  Livestock already seeded, skipping...");
    return prisma.livestock.findMany();
  }

  const farmer = users.find((u) => u.role === "user") || users[0];
  // console.log("Seeding livestock...");

  const ls1 = await prisma.livestock.create({
    data: {
      sellerId: farmer.id,
      species: "cow",
      breed: "Friesian Crossbreed",
      price: 320000,
      age: "24 Months",
      weight: 520,
      gender: "male",
      images: ["friesian_cow.jpg"],
      videos: [],
      location: "Savar, Dhaka",
      isSold: false,
      isReserved: false,
      status: "published",
      healthStatus: "Healthy",
      farmName: "Savar Dairy Farm",
    },
  });

  const ls2 = await prisma.livestock.create({
    data: {
      sellerId: farmer.id,
      species: "goat",
      breed: "Black Bengal",
      price: 28000,
      age: "12 Months",
      weight: 38,
      gender: "female",
      images: ["black_bengal_goat.jpg"],
      videos: [],
      location: "Manikganj, Dhaka",
      isSold: false,
      isReserved: false,
      status: "published",
      healthStatus: "Healthy",
      farmName: "Black Bengal Farm",
    },
  });

  // console.log("✅ Livestock seeded:", [ls1.breed, ls2.breed]);
  return [ls1, ls2];
}

async function seedChatMessages(users: any[], doctors: any[]) {
  const count = await prisma.chatMessage.count();
  if (count > 0) {
    // console.log("ℹ️  Chat messages already seeded, skipping...");
    return;
  }

  const doctor = doctors[0];
  const patient = users.find((u) => u.role === "user");
  if (!doctor || !patient) {
    // console.log("⚠️  Skipping chat seed: missing doctor or patient");
    return;
  }

  // console.log("Seeding conversation and chat messages...");

  const conversation = await prisma.conversation.create({
    data: {
      doctorId: doctor.id,
      doctorUserId: doctor.userId ?? null,
      patientId: patient.id,
      lastMessageAt: new Date(),
    },
  });

  await prisma.chatMessage.createMany({
    data: [
      {
        conversationId: conversation.id,
        senderId: doctor.userId ?? doctor.id,
        senderRole: "doctor",
        text: "Hello, how can I help you and your animal today?",
        status: "READ",
      },
      {
        conversationId: conversation.id,
        senderId: patient.id,
        senderRole: "user",
        text: "Thank you for reaching out!\nWe are looking for a surgery.",
        status: "DELIVERED",
      },
    ],
  });

  // console.log("✅ Conversation and chat messages seeded");
}

async function seedCommerceAndEngagementData(users: any[], doctors: any[]) {
  const addressCount = await prisma.address.count();
  if (addressCount > 0) {
    // console.log("ℹ️  Commerce/engagement data already seeded, skipping...");
    return;
  }

  const farmer = users.find((u) => u.role === "user") || users[0];
  const product = await prisma.product.findFirst({ orderBy: { id: "asc" } });
  const livestock = await prisma.livestock.findFirst({ orderBy: { id: "asc" } });
  const doctor = doctors[0];
  if (!product || !livestock || !doctor) {
    // console.log("⚠️  Skipping commerce seed: missing product, livestock, or doctor");
    return;
  }

  // console.log("Seeding addresses, cart, wishlist, order, and engagement data...");

  // Addresses
  await prisma.address.createMany({
    data: [
      {
        userId: farmer.id,
        label: "Home",
        contactName: farmer.name || "Test Farmer",
        phone: farmer.phone || "+8801800000001",
        division: "Dhaka",
        district: "Dhaka",
        upazila: "Mirpur",
        postalCode: "1216",
        isDefault: true,
      },
      {
        userId: farmer.id,
        label: "Farm",
        contactName: farmer.name || "Test Farmer",
        phone: farmer.phone || "+8801800000001",
        division: "Dhaka",
        district: "Savar",
        upazila: "Savar Sadar",
        postalCode: "1340",
        isDefault: false,
      },
    ],
  });

  // Cart item
  await prisma.cartItem.create({
    data: { userId: farmer.id, productId: product.id, quantity: 2 },
  });

  // Wishlist item
  await prisma.wishlistItem.create({
    data: { userId: farmer.id, livestockId: livestock.id },
  });

  // Order
  const orderId = `GBD-${Date.now().toString(36).toUpperCase()}`;
  const itemPrice = product.price;
  const subtotal = itemPrice * 1;
  const tax = Math.round(subtotal * 0.05);
  const shippingFee = 100;
  const netAmount = subtotal + tax + shippingFee;

  await prisma.order.create({
    data: {
      id: orderId,
      userId: farmer.id,
      totalPrice: subtotal,
      tax,
      shippingFee,
      discountAmount: 0,
      netAmount,
      deliveryAddress: {
        label: "Home",
        contactName: farmer.name || "Test Farmer",
        phone: farmer.phone || "+8801800000001",
        division: "Dhaka",
        district: "Dhaka",
        upazila: "Mirpur",
        postalCode: "1216",
        addressLine: "Road# 9, house# 5, Lane#3, Mirpur 11/a",
      },
      deliveryMethod: "standard",
      status: "delivered",
      paymentStatus: "successful",
    },
  });

  // Order item
  await prisma.orderItem.create({
    data: {
      orderId,
      productId: product.id,
      quantity: 1,
      price: itemPrice,
      discount: product.discount || 0,
      name: product.name,
    },
  });

  // Transaction
  await prisma.transaction.create({
    data: {
      orderId,
      userId: farmer.id,
      amount: netAmount,
      provider: "simulate",
      status: "successful",
      gatewayTransactionId: `SIM-${orderId}`,
      auditTrail: [{ status: "successful", timestamp: new Date().toISOString() }],
    },
  });

  // Delivery
  await prisma.delivery.create({
    data: {
      orderId,
      trackingNumber: `TRK-${orderId}`,
      courierName: "Gobadi Logistics",
      status: "delivered",
      timeline: [
        { status: "pending", timestamp: new Date().toISOString(), description: "Order placed" },
        { status: "delivered", timestamp: new Date().toISOString(), description: "Delivered to customer" },
      ],
    },
  });

  // Reviews
  await prisma.review.createMany({
    data: [
      {
        userId: farmer.id,
        targetType: "product",
        targetId: String(product.id),
        rating: 5,
        text: "Worked great for my herd, will buy again.",
        isVerified: true,
      },
      {
        userId: farmer.id,
        targetType: "doctor",
        targetId: String(doctor.id),
        rating: 5,
        text: "Very knowledgeable and responsive, highly recommend.",
        isVerified: true,
      },
    ],
  });

  // Notifications
  await prisma.notification.createMany({
    data: [
      {
        userId: farmer.id,
        title: "Order delivered",
        body: `Your order ${orderId} has been delivered.`,
        type: "delivery",
        referenceType: "Order",
        referenceId: orderId,
        isRead: false,
      },
      {
        userId: farmer.id,
        title: "AI diagnosis ready",
        body: "Your animal health scan results are ready to view.",
        type: "ai_ready",
        isRead: false,
      },
      {
        userId: farmer.id,
        title: "Veterinary booking confirmed",
        body: "Your appointment with Dr. Michael Wilson has been confirmed.",
        type: "booking",
        referenceType: "Booking",
        referenceId: "BOOK-1001",
        isRead: false,
      },
      {
        userId: farmer.id,
        title: "Payment successful",
        body: "Your payment of ৳850 was completed successfully.",
        type: "payment",
        referenceType: "Payment",
        referenceId: "PAY-1001",
        isRead: true,
      },
      {
        userId: farmer.id,
        title: "Order confirmed",
        body: `Your order ${orderId} has been confirmed and is being prepared.`,
        type: "order",
        referenceType: "Order",
        referenceId: orderId,
        isRead: false,
      },
      {
        userId: farmer.id,
        title: "Delivery on the way",
        body: "Your veterinary supplies are out for delivery and should arrive soon.",
        type: "delivery",
        referenceType: "Order",
        referenceId: "ORD-1002",
        isRead: false,
      },
      {
        userId: farmer.id,
        title: "Vaccination reminder",
        body: "Your cow is due for its scheduled vaccination. Please book a veterinary appointment.",
        type: "reminder",
        referenceType: "Animal",
        referenceId: "1",
        isRead: false,
      },
      {
        userId: farmer.id,
        title: "Prescription ready",
        body: "The prescription from your recent veterinary consultation is ready to view.",
        type: "prescription_ready",
        referenceType: "Prescription",
        referenceId: "RX-1001",
        isRead: false,
      },
      {
        userId: farmer.id,
        title: "New message from veterinarian",
        body: "Dr. Jessica Taylor sent you a message about your animal's treatment.",
        type: "message",
        referenceType: "Doctor",
        referenceId: "2",
        isRead: false,
      },
      {
        userId: farmer.id,
        title: "Special livestock offer",
        body: "Get 15% off selected cattle supplements and veterinary products this week.",
        type: "promotion",
        referenceType: "Promotion",
        referenceId: "PROMO-15",
        isRead: true,
      },
      {
        userId: farmer.id,
        title: "Referral reward available",
        body: "Invite a fellow farmer to GoBadi and earn rewards when they complete their first order.",
        type: "referral",
        referenceType: "Referral",
        referenceId: "REF-1001",
        isRead: false,
      },
      {
        userId: farmer.id,
        title: "Booking reminder",
        body: "Your veterinary appointment is scheduled for tomorrow at 10:00 AM.",
        type: "reminder",
        referenceType: "Booking",
        referenceId: "BOOK-1002",
        isRead: false,
      },
      {
        userId: farmer.id,
        title: "AI health report updated",
        body: "Your animal's AI health report has been updated with additional recommendations.",
        type: "ai_ready",
        referenceType: "AnimalScan",
        referenceId: "SCAN-1001",
        isRead: true,
      },
      {
        userId: farmer.id,
        title: "Order payment pending",
        body: "Payment is still pending for your recent veterinary product order.",
        type: "payment",
        referenceType: "Order",
        referenceId: "ORD-1003",
        isRead: false,
      },
      {
        userId: farmer.id,
        title: "Welcome to GoBadi",
        body: "Welcome to GoBadi! You can now manage your animals, book veterinarians, and order livestock products.",
        type: "system",
        isRead: true,
      },
    ],
  });

  // AI Diagnosis
  await prisma.aiDiagnosis.create({
    data: {
      userId: farmer.id,
      images: [],
      symptoms: ["visual_scan"],
      status: "READY",
      analysisResult: "Possible early-stage Foot and Mouth Disease detected",
      confidenceScore: 0.82,
      recommendations: ["Quarantine the herd", "Contact a veterinarian immediately"],
      recommendedDoctorIds: [doctor.id],
    },
  });

  // console.log("✅ Commerce and engagement data seeded");
}

async function backfillDemoCredentials() {
  const passwordHash = await bcrypt.hash(SEED_PASSWORD, 10);
  const demoAccounts = [
    { phone: "+8801700000001", email: "doctor@gobadi.test", role: "doctor" as const, name: "Dr. Michael Wilson" },
    { phone: "+8801800000001", email: "patient@gobadi.test", role: "user" as const, name: "Test Farmer Patient" },
    { phone: "+8801800000002", email: "clinic@gobadi.test", role: "clinic" as const, name: "Savar Clinic Manager" },
    { phone: "+8801900000001", email: "admin@gobadi.test", role: "admin" as const, name: "Admin Supervisor" },
  ];

  let backfilled = false;
  for (const account of demoAccounts) {
    const user = await prisma.user.findFirst({ where: { phone: account.phone } });
    if (!user) {
      await prisma.user.create({
        data: {
          phone: account.phone,
          email: account.email,
          role: account.role,
          name: account.name,
          password: passwordHash,
          verified: true,
        },
      });
      backfilled = true;
    } else if (!user.password || user.role !== account.role) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          email: user.email ?? account.email,
          role: account.role,
          password: passwordHash,
          verified: true,
        },
      });
      backfilled = true;
    }
  }
  if (backfilled) {
    // console.log("✅ Backfilled demo login credentials — password:", SEED_PASSWORD);
  }
}

export async function seedAllData() {
  try {
    // console.log("\n🌱 Starting database seed...");
    const users = await seedUsers();
    const doctors = await seedDoctors(users);
    await seedAvailability(doctors);
    await seedAnimals();
    await seedCategoriesAndBrandsAndProducts();
    await seedClinicAndServices(users, doctors);
    await seedLivestock(users);
    await seedChatMessages(users, doctors);
    await seedCommerceAndEngagementData(users, doctors);
    await backfillDemoCredentials();
    // console.log("🌱 Database seeding completed!\n");
  } catch (error) {
    // console.error("❌ Seed failed:", error);
  }
}
