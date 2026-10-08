import { AppConfig, Booking, CustomerProfile, DriverProfile, UserRole } from '../types';
import { MALAYSIAN_CITIES, TONNAGE_OPTIONS, BODY_TYPE_OPTIONS } from './malaysiaLocations';

const DEFAULT_APP_CONFIG: AppConfig = {
  subscription: {
    price: 25,
    days: 30,
  },
  referral: {
    isReferralActive: true,
    requiredCount: 3,
    freeDays: 30,
  },
  returnLoad: {
    isEnabled: true,
  },
  approvalMode: 'manual',
  lorryConfig: {
    tonnages: TONNAGE_OPTIONS,
    bodyTypes: BODY_TYPE_OPTIONS,
  },
  advertisement: {
    topAd: {
      enabled: true,
      text: '🔥 PROMOSI LORI BALIK (RETURN LOAD): Jimat Sehingga 50%!',
      subtext: 'Lori kosong dari JB, KL, Penang & Kuantan sedia ambil kargo anda.',
      badge: 'JIMAT 50%',
      linkUrl: 'https://wa.me/60123456789?text=Hi%20Admin%20DeliveryMY,%20saya%20berminat%20tempah%20lori%20promosi',
      bgTheme: 'amber',
    },
    bottomAd: {
      enabled: true,
      text: '📢 PASANG IKLAN PERCUMA: Ingin Iklankan Servis Lori & Logistik Anda?',
      subtext: 'Hubungi pengurusan DeliveryMY untuk penempatan iklan khas.',
      badge: 'IKLAN RASMI',
      linkUrl: 'https://wa.me/60123456789?text=Hi%20Admin%20DeliveryMY,%20saya%20nak%20iklan%20servis%20lori',
      bgTheme: 'blue',
    },
  },
  whatsapp: {
    bookingConfirm: {
      ms: 'Hi {customerName}! Saya {driverName} pemandu lori {lorryNumber} ({fullLorryType}). Saya telah terima tempahan anda Dari: {fromCity} Ke: {toCity} 📏 {distanceText}. Barang: {goodsType}. Boleh kita bincang harga?',
      en: 'Hi {customerName}! I am {driverName} lorry driver {lorryNumber} ({fullLorryType}). I have accepted your booking From: {fromCity} To: {toCity} 📏 {distanceText}. Goods: {goodsType}. Can we discuss the price?',
      zh: '您好 {customerName}！我是罗里司机 {driverName}，车牌 {lorryNumber} ({fullLorryType})。已接下您从 {fromCity} 到 {toCity} 📏 {distanceText} 的运输需求。货物：{goodsType}。我们可以商议价格吗？',
    },
    onTheWay: {
      ms: 'Hi {customerName}! Saya dalam perjalanan ke lokasi anda (📏 {distanceText}). Saya akan kongsikan live location di WhatsApp ini sebentar lagi.',
      en: 'Hi {customerName}! I am on the way to your location (📏 {distanceText}). I will share my live location in this WhatsApp shortly.',
      zh: '您好 {customerName}！我正在前往装货地点 (📏 {distanceText})。稍后我将在此WhatsApp中分享实时位置。',
    },
    completed: {
      ms: 'Hi {customerName}! Barang telah selamat dihantar. Terima kasih kerana menggunakan perkhidmatan DeliveryMY!',
      en: 'Hi {customerName}! Goods have been safely delivered. Thank you for using DeliveryMY!',
      zh: '您好 {customerName}！货物已安全送达目的地。感谢您使用 DeliveryMY！',
    },
    returnLoad: {
      ms: 'Hi! Lori saya kosong balik dari {fromCity} ke {toCity} (📏 {distanceText}). Harga boleh runding murah!',
      en: 'Hi! My lorry is returning empty from {fromCity} to {toCity} (📏 {distanceText}). Price is negotiable cheap!',
      zh: '您好！我的罗里正从 {fromCity} 空车回程至 {toCity} (📏 {distanceText})。价格优惠可谈！',
    },
  },
  paymentConfig: {
    bankName: 'Maybank Islamic Berhad',
    accountNumber: '5641 2890 1234',
    accountHolder: 'DELIVERYMY LOGISTICS TECH SDN BHD',
    supportWhatsApp: '60123456789',
  },
};

// Realistic Malaysian seed drivers
const SEED_DRIVERS: DriverProfile[] = [
  {
    uid: 'drv-kumar-01',
    name: 'Kumar a/l Selvam',
    email: 'kumar@lorrymy.com',
    phone: '0167891234',
    lorryNumber: 'WXY 1234',
    lorryTonnage: '3 Tan',
    lorryBodyType: 'Closed Box 📦 / Kotak Tertutup / 封闭式',
    fullLorryType: '3 Tan - Closed Box',
    hasTailgate: true, // Equipped with Hydraulic Lift / Tailgate
    city: 'Johor Bahru',
    area: 'Kempas / Larkin',
    myReferralCode: 'KUM88',
    referredBy: 'ALI99',
    referralCount: 2,
    isSubscribed: true,
    subscriptionExpiry: new Date(Date.now() + 25 * 86400000).toISOString(),
    isApproved: true,
    isBlocked: false,
    isAvailable: true,
    isOnline: true,
    lastOnlineAt: new Date().toISOString(),
    currentLat: 1.4655,
    currentLng: 103.7578,
    returnLoad: true, // ACTIVE RETURN LOAD!
    returnLoadFrom: 'Johor Bahru',
    returnLoadTo: 'Kuala Lumpur',
    returnLoadFromOriginal: 'Johor Bahru (JB)',
    returnLoadToOriginal: 'Kuala Lumpur (KL)',
    returnLoadDate: new Date().toISOString().split('T')[0],
    returnLoadNote: 'Lori kosong balik harga boleh runding murah! Empty lorry returning price can negotiate cheap!',
    returnLoadEnabledAt: new Date().toISOString(),
    whatsappNotifyEnabled: true,
    password: 'password123',
    createdAt: '2026-01-10T08:00:00.000Z',
    completedJobsCount: 48,
    totalKmCovered: 14200,
  },
  {
    uid: 'drv-ali-02',
    name: 'Mohd Ali bin Razak',
    email: 'ali@lorrymy.com',
    phone: '0129876543',
    lorryNumber: 'BKL 8821',
    lorryTonnage: '5 Tan',
    lorryBodyType: 'Open Lorry 🚛 / Lori Kargo Terbuka / 开放式',
    fullLorryType: '5 Tan - Open Lorry',
    city: 'Kuala Lumpur',
    area: 'Cheras / Balakong',
    myReferralCode: 'ALI99',
    referralCount: 3,
    isSubscribed: true,
    subscriptionExpiry: new Date(Date.now() + 20 * 86400000).toISOString(),
    isApproved: true,
    isBlocked: false,
    isAvailable: true,
    isOnline: true,
    lastOnlineAt: new Date().toISOString(),
    currentLat: 3.1390,
    currentLng: 101.6869,
    returnLoad: false,
    whatsappNotifyEnabled: true,
    password: 'password123',
    createdAt: '2026-01-15T09:30:00.000Z',
    completedJobsCount: 65,
    totalKmCovered: 18400,
  },
  {
    uid: 'drv-hock-03',
    name: 'Tan Ah Hock (陈亚福)',
    email: 'ahhock@lorrymy.com',
    phone: '0174567890',
    lorryNumber: 'PKN 3399',
    lorryTonnage: '1 Tan',
    lorryBodyType: 'Pickup 🛻 / Lori Pickup',
    fullLorryType: '1 Tan - Pickup',
    city: 'Penang',
    area: 'Butterworth / Bukit Mertajam',
    myReferralCode: 'HCK77',
    referralCount: 1,
    isSubscribed: true,
    subscriptionExpiry: new Date(Date.now() + 18 * 86400000).toISOString(),
    isApproved: true,
    isBlocked: false,
    isAvailable: true,
    isOnline: true,
    lastOnlineAt: new Date().toISOString(),
    currentLat: 5.4141,
    currentLng: 100.3288,
    returnLoad: false,
    whatsappNotifyEnabled: true,
    password: 'password123',
    createdAt: '2026-02-01T10:00:00.000Z',
    completedJobsCount: 32,
    totalKmCovered: 8900,
  },
  {
    uid: 'drv-zain-04',
    name: 'Zainal Abidin',
    email: 'zainal@lorrymy.com',
    phone: '0193456789',
    lorryNumber: 'WA 9012 B',
    lorryTonnage: '10 Tan',
    lorryBodyType: 'Curtain Sider 🎪 / Sider Tirai / 帘布式',
    fullLorryType: '10 Tan - Curtain Sider',
    city: 'Shah Alam',
    area: 'Klang Port',
    myReferralCode: 'ZAI55',
    referralCount: 0,
    isSubscribed: false, // Expired trial demonstration
    subscriptionExpiry: new Date(Date.now() - 2 * 86400000).toISOString(),
    isApproved: true,
    isBlocked: false,
    isAvailable: false,
    isOnline: false,
    returnLoad: false,
    whatsappNotifyEnabled: true,
    password: 'password123',
    createdAt: '2026-02-10T11:00:00.000Z',
    completedJobsCount: 19,
    totalKmCovered: 5300,
  },
  {
    uid: 'drv-ariff-05',
    name: 'Mohd Ariff',
    email: 'ariff@lorrymy.com',
    phone: '0139988776',
    lorryNumber: 'JQR 4455',
    lorryTonnage: '3 Tan',
    lorryBodyType: 'Closed Box 📦 / Kotak Tertutup / 封闭式',
    fullLorryType: '3 Tan - Closed Box',
    city: 'Johor Bahru',
    myReferralCode: 'ARF33',
    referralCount: 0,
    isSubscribed: true,
    subscriptionExpiry: new Date(Date.now() + 30 * 86400000).toISOString(),
    isApproved: false, // Needs admin approval demonstration
    isBlocked: false,
    isAvailable: false,
    isOnline: false,
    returnLoad: false,
    whatsappNotifyEnabled: true,
    password: 'password123',
    createdAt: new Date().toISOString(),
    completedJobsCount: 0,
    totalKmCovered: 0,
  }
];

const SEED_CUSTOMERS: CustomerProfile[] = [
  {
    uid: 'cust-sarah-01',
    name: 'Sarah Lee (李雪莉)',
    email: 'sarah@business.my',
    phone: '0123344556',
    password: 'password123',
    preferredLanguage: 'ms',
    createdAt: '2026-02-01T10:00:00.000Z',
  },
  {
    uid: 'cust-hasan-02',
    name: 'Hasan Basri Enterprise',
    email: 'hasan@perabot.my',
    phone: '0198877665',
    password: 'password123',
    preferredLanguage: 'ms',
    createdAt: '2026-02-15T14:00:00.000Z',
  }
];

const SEED_BOOKINGS: Booking[] = [
  {
    bookingId: 'BK-1082',
    customerId: 'cust-sarah-01',
    customerName: 'Sarah Lee',
    customerPhone: '0123344556',
    fromAddress: 'Kempas Industrial Area, Johor Bahru',
    toAddress: 'Bukit Bintang Logistics Hub, Kuala Lumpur',
    fromCity: 'Johor Bahru',
    toCity: 'Kuala Lumpur',
    fromLat: 1.4655,
    fromLng: 103.7578,
    toLat: 3.1390,
    toLng: 101.6869,
    distanceKM: 330.0,
    distanceText: '330 KM',
    estimatedTime: '6 jam 36 min',
    lorryTonnage: '3 Tan',
    lorryBodyType: 'Closed Box 📦 / Kotak Tertutup / 封闭式',
    fullLorryType: '3 Tan - Closed Box',
    goodsType: 'Kotak Pindahan & Perabot Pejabat',
    dateTime: 'Hari Ini, 2:00 PM',
    note: 'Lori kosong balik harga boleh runding murah!',
    status: 'COMPLETED',
    isReturnLoadOffer: true,
    returnLoadDriverId: 'drv-kumar-01',
    price: null,
    driverId: 'drv-kumar-01',
    driverName: 'Kumar a/l Selvam',
    driverPhone: '0167891234',
    lorryNumber: 'WXY 1234',
    createdAt: '2026-03-01T08:30:00.000Z',
    completedAt: '2026-03-01T16:00:00.000Z',
  },
  {
    bookingId: 'BK-1095',
    customerId: 'cust-hasan-02',
    customerName: 'Hasan Basri Enterprise',
    customerPhone: '0198877665',
    fromAddress: 'Port Klang Free Zone, Klang',
    toAddress: 'Bayan Lepas FTZ, Penang',
    fromCity: 'Shah Alam',
    toCity: 'Penang',
    fromLat: 3.0738,
    fromLng: 101.5183,
    toLat: 5.4141,
    toLng: 100.3288,
    distanceKM: 365.0,
    distanceText: '365 KM',
    estimatedTime: '7 jam 18 min',
    lorryTonnage: '5 Tan',
    lorryBodyType: 'Open Lorry 🚛 / Lori Kargo Terbuka / 开放式',
    fullLorryType: '5 Tan - Open Lorry',
    goodsType: 'Pallet Kayu & Besi Struktur',
    dateTime: 'Besok, 9:00 AM',
    note: 'Perlu kain kanvas tutup rapi tahan hujan',
    status: 'PENDING',
    isReturnLoadOffer: false,
    price: null,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    bookingId: 'BK-1065',
    customerId: 'cust-sarah-01',
    customerName: 'Sarah Lee',
    customerPhone: '0123344556',
    fromAddress: 'Pusat Bandar Puchong, Selangor',
    toAddress: 'Taman Pelangi, Johor Bahru',
    fromCity: 'Kuala Lumpur',
    toCity: 'Johor Bahru',
    fromLat: 3.0333,
    fromLng: 101.6167,
    toLat: 1.4854,
    toLng: 103.7618,
    distanceKM: 324.5,
    distanceText: '325 KM',
    estimatedTime: '4 jam 15 min',
    lorryTonnage: '3 Tan',
    lorryBodyType: 'Closed Box 📦 / Kotak Tertutup / 封闭式',
    fullLorryType: '3 Tan - Closed Box',
    hasTailgate: true,
    goodsType: 'Barangan Elektronik & Kotak Pejabat',
    dateTime: 'Kelmarin, 10:00 AM',
    note: 'Selesai dihantar terus ke gudang pelanggan.',
    status: 'COMPLETED',
    isReturnLoadOffer: false,
    price: null,
    driverId: 'drv-kumar-01',
    driverName: 'Kumar a/l Selvam',
    driverPhone: '0167891234',
    lorryNumber: 'WXY 1234',
    createdAt: '2026-03-05T02:00:00.000Z',
    acceptedAt: '2026-03-05T02:10:00.000Z',
    onTheWayAt: '2026-03-05T03:00:00.000Z',
    completedAt: '2026-03-05T08:30:00.000Z',
  },
  {
    bookingId: 'BK-1048',
    customerId: 'cust-hasan-02',
    customerName: 'Hasan Basri Enterprise',
    customerPhone: '0198877665',
    fromAddress: 'Kawasan Perindustrian Balakong, Cheras',
    toAddress: 'Kuantan Port Logistics Park, Pahang',
    fromCity: 'Kuala Lumpur',
    toCity: 'Kuantan',
    fromLat: 3.0319,
    fromLng: 101.7456,
    toLat: 3.8077,
    toLng: 103.3260,
    distanceKM: 245.0,
    distanceText: '245 KM',
    estimatedTime: '3 jam 40 min',
    lorryTonnage: '5 Tan',
    lorryBodyType: 'Open Lorry 🚛 / Lori Kargo Terbuka / 开放式',
    fullLorryType: '5 Tan - Open Lorry',
    goodsType: 'Bahan Binaan Kayu & Besi',
    dateTime: '4 Mac 2026, 8:00 AM',
    note: 'Selesai diturunkan dengan selamat.',
    status: 'COMPLETED',
    isReturnLoadOffer: false,
    price: null,
    driverId: 'drv-ali-02',
    driverName: 'Mohd Ali bin Razak',
    driverPhone: '0129876543',
    lorryNumber: 'BKL 8821',
    createdAt: '2026-03-04T00:30:00.000Z',
    acceptedAt: '2026-03-04T00:45:00.000Z',
    onTheWayAt: '2026-03-04T01:30:00.000Z',
    completedAt: '2026-03-04T06:00:00.000Z',
  }
];

type StorageListener = () => void;
const listeners: Set<StorageListener> = new Set();

function notifyAll() {
  listeners.forEach((fn) => fn());
}

export const StorageService = {
  subscribe(fn: StorageListener) {
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
    };
  },

  // Initialize data if not yet present
  init() {
    if (typeof window === 'undefined') return;

    if (!localStorage.getItem('deliverymy_config')) {
      localStorage.setItem('deliverymy_config', JSON.stringify(DEFAULT_APP_CONFIG));
    }
    if (!localStorage.getItem('deliverymy_drivers')) {
      localStorage.setItem('deliverymy_drivers', JSON.stringify(SEED_DRIVERS));
    }
    if (!localStorage.getItem('deliverymy_customers')) {
      localStorage.setItem('deliverymy_customers', JSON.stringify(SEED_CUSTOMERS));
    }
    if (!localStorage.getItem('deliverymy_bookings')) {
      localStorage.setItem('deliverymy_bookings', JSON.stringify(SEED_BOOKINGS));
    }
  },

  // Config
  getConfig(): AppConfig {
    try {
      const str = localStorage.getItem('deliverymy_config');
      if (!str) return DEFAULT_APP_CONFIG;
      const parsed = JSON.parse(str);
      if (!parsed.advertisement) {
        parsed.advertisement = DEFAULT_APP_CONFIG.advertisement;
      }
      return parsed;
    } catch {
      return DEFAULT_APP_CONFIG;
    }
  },

  saveConfig(config: AppConfig) {
    localStorage.setItem('deliverymy_config', JSON.stringify(config));
    notifyAll();
  },

  // Current session
  getSession(): {
    isLoggedIn: boolean;
    role: UserRole | null;
    user: CustomerProfile | DriverProfile | { email: string; name: string } | null;
  } {
    try {
      const logged = localStorage.getItem('deliverymy_isLoggedIn') === 'true';
      const role = (localStorage.getItem('deliverymy_role') as UserRole) || null;
      const userStr = localStorage.getItem('deliverymy_user');
      const user = userStr ? JSON.parse(userStr) : null;
      return { isLoggedIn: logged, role, user };
    } catch {
      return { isLoggedIn: false, role: null, user: null };
    }
  },

  setSession(
    role: UserRole,
    user: CustomerProfile | DriverProfile | { email: string; name: string } | null
  ) {
    localStorage.setItem('deliverymy_isLoggedIn', 'true');
    localStorage.setItem('deliverymy_role', role);
    if (user) {
      localStorage.setItem('deliverymy_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('deliverymy_user');
    }
    notifyAll();
  },

  clearSession() {
    localStorage.removeItem('deliverymy_isLoggedIn');
    localStorage.removeItem('deliverymy_role');
    localStorage.removeItem('deliverymy_user');
    notifyAll();
  },

  // Drivers
  getDrivers(): DriverProfile[] {
    try {
      const str = localStorage.getItem('deliverymy_drivers');
      const list: DriverProfile[] = str ? JSON.parse(str) : SEED_DRIVERS;
      return list.map((d) => ({
        ...d,
        isActive: d.isActive !== undefined ? d.isActive : true,
      }));
    } catch {
      return SEED_DRIVERS.map((d) => ({ ...d, isActive: true }));
    }
  },

  getDriverById(uid: string): DriverProfile | null {
    const drivers = this.getDrivers();
    return drivers.find((d) => d.uid === uid) || null;
  },

  saveDriver(driver: DriverProfile) {
    const drivers = this.getDrivers();
    const idx = drivers.findIndex((d) => d.uid === driver.uid);
    if (idx >= 0) {
      drivers[idx] = driver;
    } else {
      drivers.push(driver);
    }
    localStorage.setItem('deliverymy_drivers', JSON.stringify(drivers));

    // Update active session if this is the current logged in driver
    const session = this.getSession();
    if (session.role === 'driver' && (session.user as DriverProfile)?.uid === driver.uid) {
      localStorage.setItem('deliverymy_user', JSON.stringify(driver));
    }

    notifyAll();
  },

  registerDriver(data: Partial<DriverProfile>): DriverProfile {
    const drivers = this.getDrivers();
    const config = this.getConfig();

    // Generate myReferralCode: 3 uppercase letters + 2 digits (e.g. ALI88)
    const letters = (data.name?.replace(/[^a-zA-Z]/g, '').slice(0, 3).toUpperCase() || 'MYR').padEnd(3, 'X');
    const randomDigits = Math.floor(10 + Math.random() * 90).toString();
    const myReferralCode = `${letters}${randomDigits}`;

    const isAutoApproved = config.approvalMode === 'auto';

    const newDriver: DriverProfile = {
      uid: `drv-${Date.now()}`,
      name: data.name || '',
      email: data.email || '',
      phone: data.phone || '',
      lorryNumber: (data.lorryNumber || '').toUpperCase().trim(),
      lorryTonnage: data.lorryTonnage || '3 Tan',
      lorryBodyType: data.lorryBodyType || 'Closed Box 📦 / Kotak Tertutup / 封闭式',
      fullLorryType: `${data.lorryTonnage || '3 Tan'} - ${data.lorryBodyType?.split('/')[0].trim() || 'Closed Box'}${data.hasTailgate ? ' [Tailgate]' : ''}`,
      hasTailgate: !!data.hasTailgate,
      city: data.city || 'Kuala Lumpur',
      area: data.area || '',
      myReferralCode,
      referredBy: data.referredBy?.trim().toUpperCase(),
      referralCount: 0,
      isSubscribed: false, // Requires 30 days initial free trial or referral
      subscriptionExpiry: new Date(Date.now() + 30 * 86400000).toISOString(), // Give new registered driver 30 days initial trial
      isApproved: isAutoApproved, // Auto Approval if mode is 'auto', otherwise requires manual admin review
      isBlocked: false,
      isActive: true, // Default active safety status
      isAvailable: false,
      isOnline: false,
      returnLoad: false,
      whatsappNotifyEnabled: true,
      password: data.password || 'password123',
      createdAt: new Date().toISOString(),
      completedJobsCount: 0,
      totalKmCovered: 0,
    };

    // Referral logic:
    // If referral code entered and app_config/referral/isReferralActive true,
    // find driver with myReferralCode, increment referralCount, if >= requiredCount 3 -> subscriptionExpiry now + freeDays 30, isSubscribed true
    if (newDriver.referredBy && config.referral.isReferralActive) {
      const referrer = drivers.find((d) => d.myReferralCode.toUpperCase() === newDriver.referredBy);
      if (referrer) {
        referrer.referralCount = (referrer.referralCount || 0) + 1;
        if (referrer.referralCount >= config.referral.requiredCount) {
          referrer.isSubscribed = true;
          const currentExpiry = referrer.subscriptionExpiry ? new Date(referrer.subscriptionExpiry).getTime() : Date.now();
          const baseTime = Math.max(Date.now(), currentExpiry);
          referrer.subscriptionExpiry = new Date(baseTime + config.referral.freeDays * 86400000).toISOString();
        }
      }
    }

    drivers.push(newDriver);
    localStorage.setItem('deliverymy_drivers', JSON.stringify(drivers));
    notifyAll();
    return newDriver;
  },

  // Customers
  getCustomers(): CustomerProfile[] {
    try {
      const str = localStorage.getItem('deliverymy_customers');
      return str ? JSON.parse(str) : SEED_CUSTOMERS;
    } catch {
      return SEED_CUSTOMERS;
    }
  },

  registerCustomer(data: Partial<CustomerProfile>): CustomerProfile {
    const customers = this.getCustomers();
    const newCustomer: CustomerProfile = {
      uid: `cust-${Date.now()}`,
      name: data.name || '',
      email: data.email || '',
      phone: data.phone || '',
      password: data.password || 'password123',
      preferredLanguage: data.preferredLanguage || 'ms',
      createdAt: new Date().toISOString(),
    };
    customers.push(newCustomer);
    localStorage.setItem('deliverymy_customers', JSON.stringify(customers));
    notifyAll();
    return newCustomer;
  },

  // Bookings
  getBookings(): Booking[] {
    try {
      const str = localStorage.getItem('deliverymy_bookings');
      return str ? JSON.parse(str) : SEED_BOOKINGS;
    } catch {
      return SEED_BOOKINGS;
    }
  },

  getBookingById(id: string): Booking | null {
    const bookings = this.getBookings();
    return bookings.find((b) => b.bookingId === id) || null;
  },

  createBooking(bookingData: Omit<Booking, 'bookingId' | 'createdAt'>): Booking {
    const bookings = this.getBookings();
    const newBooking: Booking = {
      ...bookingData,
      bookingId: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      price: null, // STRICT RULE: NO PRICE ANYWHERE
    };
    bookings.unshift(newBooking);
    localStorage.setItem('deliverymy_bookings', JSON.stringify(bookings));
    notifyAll();
    return newBooking;
  },

  updateBooking(booking: Booking) {
    const bookings = this.getBookings();
    const idx = bookings.findIndex((b) => b.bookingId === booking.bookingId);
    if (idx >= 0) {
      bookings[idx] = booking;
      localStorage.setItem('deliverymy_bookings', JSON.stringify(bookings));
      notifyAll();
    }
  },

  // Accept job with atomic first-come-first-serve transaction check
  acceptBooking(bookingId: string, driver: DriverProfile): { success: boolean; message: string; booking?: Booking } {
    // Safety check: driver must be active and approved
    if (driver.isActive === false) {
      return { success: false, message: 'Your driver account has been deactivated by administrator. You are blocked from accepting bookings.' };
    }

    if (driver.isBlocked) {
      return { success: false, message: 'Your driver account is currently suspended. Please contact admin.' };
    }

    if (!driver.isApproved) {
      return { success: false, message: 'Your driver account is pending approval from administrator.' };
    }

    const bookings = this.getBookings();
    const booking = bookings.find((b) => b.bookingId === bookingId);

    if (!booking) {
      return { success: false, message: 'Booking not found' };
    }

    if (booking.status !== 'PENDING' && booking.status !== 'PENDING_RETURN_LOAD') {
      return { success: false, message: 'Job already accepted or cancelled by another driver' };
    }

    if (booking.status === 'PENDING_RETURN_LOAD' && booking.returnLoadDriverId && booking.returnLoadDriverId !== driver.uid) {
      return { success: false, message: 'This is an exclusive return load offer reserved for another driver' };
    }

    // Update booking
    booking.status = 'ACCEPTED';
    booking.driverId = driver.uid;
    booking.driverName = driver.name;
    booking.driverPhone = driver.phone;
    booking.lorryNumber = driver.lorryNumber;
    booking.lorryTonnage = driver.lorryTonnage;
    booking.lorryBodyType = driver.lorryBodyType;
    booking.fullLorryType = driver.fullLorryType;
    booking.acceptedAt = new Date().toISOString();

    // Driver busy: set isAvailable to false
    driver.isAvailable = false;
    this.saveDriver(driver);

    this.updateBooking(booking);
    return { success: true, message: 'Job successfully accepted', booking };
  },

  // Activate Driver 30-Day Subscription (triggered directly or via Stripe webhook)
  activateDriverSubscription(driverId: string, days = 30): { success: boolean; driver?: DriverProfile; message: string } {
    const drivers = this.getDrivers();
    const driver = drivers.find((d) => d.uid === driverId);
    if (!driver) {
      return { success: false, message: `Driver not found for ID: ${driverId}` };
    }

    const now = Date.now();
    const currentExpiry = driver.subscriptionExpiry ? new Date(driver.subscriptionExpiry).getTime() : now;
    const baseTime = currentExpiry > now ? currentExpiry : now;
    const newExpiry = new Date(baseTime + days * 86400000).toISOString();

    driver.isSubscribed = true;
    driver.subscriptionExpiry = newExpiry;
    driver.isActive = true; // Ensure active safety status

    this.saveDriver(driver);
    return {
      success: true,
      driver,
      message: `Driver ${driver.name} subscription successfully activated until ${new Date(newExpiry).toLocaleDateString()}.`,
    };
  },

  // WhatsApp link generator (Clean phone 0 -> 60)
  generateWhatsAppLink(phone: string, text: string): string {
    let clean = phone.replace(/[^0-9]/g, '');
    if (clean.startsWith('0')) {
      clean = '60' + clean.slice(1);
    } else if (!clean.startsWith('60')) {
      clean = '60' + clean;
    }
    return `https://wa.me/${clean}?text=${encodeURIComponent(text)}`;
  },

  // Get completed delivery trips for a driver from local storage
  getCompletedTripsByDriver(driverId: string): Booking[] {
    const bookings = this.getBookings();
    return bookings
      .filter((b) => b.driverId === driverId && b.status === 'COMPLETED')
      .sort((a, b) => {
        const timeA = new Date(a.completedAt || a.createdAt).getTime();
        const timeB = new Date(b.completedAt || b.createdAt).getTime();
        return timeB - timeA;
      });
  }
};
