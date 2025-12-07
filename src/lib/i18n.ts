export type Language = 'en' | 'hi' | 'sd'

export interface Translations {
  nav: {
    about: string
    leadership: string
    events: string
    publications: string
    media: string
    contact: string
    admin: string
    annualReports: string
  }
  hero: {
    subtitle: string
  }
  about: {
    title: string
    missionTitle: string
    affiliationsTitle: string
    founded: string
    registered: string
  }
  leadership: {
    title: string
    subtitle: string
  }
  events: {
    title: string
    subtitle: string
    upcoming: string
    past: string
    all: string
    venue: string
    date: string
    readMore: string
  }
  publications: {
    title: string
    subtitle: string
    publishedOn: string
    readMore: string
  }
  media: {
    title: string
    subtitle: string
    visitChannel: string
  }
  contact: {
    title: string
    subtitle: string
    phone: string
    email: string
    address: string
    pan: string
    panSubtitle: string
    supportTitle: string
    supportText: string
    contactUs: string
    callNow: string
    donate: string
    bankDetails: string
    accountNumber: string
    ifscCode: string
    accountHolder: string
  }
  footer: {
    quickLinks: string
    followUs: string
    copyright: string
  }
  annualReports: {
    title: string
    subtitle: string
    downloadReport: string
    year: string
    readMore: string
  }
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      about: 'About',
      leadership: 'Leadership',
      events: 'Events',
      publications: 'Publications',
      media: 'Media',
      contact: 'Contact',
      admin: 'Admin',
      annualReports: 'Annual Reports'
    },
    hero: {
      subtitle: 'Preserving Culture, Empowering Youth, Enriching Community'
    },
    about: {
      title: 'About Us',
      missionTitle: 'Our Mission',
      affiliationsTitle: 'Our Affiliations',
      founded: 'Founded',
      registered: 'Registered'
    },
    leadership: {
      title: 'Our Leadership',
      subtitle: 'Meet the dedicated team guiding our cultural mission'
    },
    events: {
      title: 'Events & Programs',
      subtitle: 'Discover our cultural activities, workshops, and performances',
      upcoming: 'Upcoming',
      past: 'Past',
      all: 'All',
      venue: 'Venue',
      date: 'Date',
      readMore: 'Read More'
    },
    publications: {
      title: 'Press & Publications',
      subtitle: 'Media coverage and recognition of our cultural work',
      publishedOn: 'Published on',
      readMore: 'Read More'
    },
    media: {
      title: 'Media Gallery',
      subtitle: 'Watch our performances, plays, and cultural programs',
      visitChannel: 'Visit Our YouTube Channel'
    },
    contact: {
      title: 'Get In Touch',
      subtitle: 'Connect with us to learn more about our programs, events, or to support our mission',
      phone: 'Phone',
      email: 'Email',
      address: 'Address',
      pan: 'PAN Number',
      panSubtitle: 'For donation purposes',
      supportTitle: 'Support Our Mission',
      supportText: 'Your contributions help us preserve cultural heritage, train youth in traditional arts, and organize meaningful cultural programs that enrich our community.',
      contactUs: 'Contact Us',
      callNow: 'Call Now',
      donate: 'Donate Now',
      bankDetails: 'Bank Account Details',
      accountNumber: 'Account Number',
      ifscCode: 'IFSC Code',
      accountHolder: 'Account Holder'
    },
    footer: {
      quickLinks: 'Quick Links',
      followUs: 'Follow Us',
      copyright: 'All rights reserved'
    },
    annualReports: {
      title: 'Annual Reports',
      subtitle: 'View our yearly achievements and activities',
      downloadReport: 'Download Report',
      year: 'Year',
      readMore: 'Read More'
    }
  },
  hi: {
    nav: {
      about: 'हमारे बारे में',
      leadership: 'नेतृत्व',
      events: 'कार्यक्रम',
      publications: 'प्रकाशन',
      media: 'मीडिया',
      contact: 'संपर्क करें',
      admin: 'प्रशासक',
      annualReports: 'वार्षिक रिपोर्ट'
    },
    hero: {
      subtitle: 'संस्कृति का संरक्षण, युवाओं को सशक्त बनाना, समुदाय को समृद्ध करना'
    },
    about: {
      title: 'हमारे बारे में',
      missionTitle: 'हमारा मिशन',
      affiliationsTitle: 'हमारी संबद्धताएं',
      founded: 'स्थापना',
      registered: 'पंजीकृत'
    },
    leadership: {
      title: 'हमारा नेतृत्व',
      subtitle: 'हमारे सांस्कृतिक मिशन का मार्गदर्शन करने वाली समर्पित टीम से मिलें'
    },
    events: {
      title: 'कार्यक्रम और गतिविधियाँ',
      subtitle: 'हमारी सांस्कृतिक गतिविधियों, कार्यशालाओं और प्रदर्शनों की खोज करें',
      upcoming: 'आगामी',
      past: 'पिछले',
      all: 'सभी',
      venue: 'स्थान',
      date: 'तिथि',
      readMore: 'और पढ़ें'
    },
    publications: {
      title: 'प्रेस और प्रकाशन',
      subtitle: 'हमारे सांस्कृतिक कार्यों की मीडिया कवरेज और मान्यता',
      publishedOn: 'प्रकाशित',
      readMore: 'और पढ़ें'
    },
    media: {
      title: 'मीडिया गैलरी',
      subtitle: 'हमारे प्रदर्शन, नाटक और सांस्कृतिक कार्यक्रम देखें',
      visitChannel: 'हमारा यूट्यूब चैनल देखें'
    },
    contact: {
      title: 'संपर्क में रहें',
      subtitle: 'हमारे कार्यक्रमों, आयोजनों के बारे में जानने या हमारे मिशन का समर्थन करने के लिए हमसे जुड़ें',
      phone: 'फोन',
      email: 'ईमेल',
      address: 'पता',
      pan: 'पैन नंबर',
      panSubtitle: 'दान उद्देश्यों के लिए',
      supportTitle: 'हमारे मिशन का समर्थन करें',
      supportText: 'आपका योगदान हमें सांस्कृतिक विरासत को संरक्षित करने, पारंपरिक कलाओं में युवाओं को प्रशिक्षित करने और हमारे समुदाय को समृद्ध करने वाले सार्थक सांस्कृतिक कार्यक्रम आयोजित करने में मदद करता है।',
      contactUs: 'हमसे संपर्क करें',
      callNow: 'अभी कॉल करें',
      donate: 'अभी दान करें',
      bankDetails: 'बैंक खाता विवरण',
      accountNumber: 'खाता संख्या',
      ifscCode: 'आईएफएससी कोड',
      accountHolder: 'खाता धारक'
    },
    footer: {
      quickLinks: 'त्वरित लिंक',
      followUs: 'हमें फॉलो करें',
      copyright: 'सर्वाधिकार सुरक्षित'
    },
    annualReports: {
      title: 'वार्षिक रिपोर्ट',
      subtitle: 'हमारी वार्षिक उपलब्धियां और गतिविधियां देखें',
      downloadReport: 'रिपोर्ट डाउनलोड करें',
      year: 'वर्ष',
      readMore: 'और पढ़ें'
    }
  },
  sd: {
    nav: {
      about: 'اسان جي باري ۾',
      leadership: 'اڳواڻي',
      events: 'واقعا',
      publications: 'اشاعت',
      media: 'ميڊيا',
      contact: 'رابطو',
      admin: 'منتظم',
      annualReports: 'سالياني رپورٽون'
    },
    hero: {
      subtitle: 'ثقافت جو تحفظ، نوجوانن کي بااختيار بڻائڻ، ڪميونٽي کي بھرپور ڪرڻ'
    },
    about: {
      title: 'اسان جي باري ۾',
      missionTitle: 'اسان جو مشن',
      affiliationsTitle: 'اسان جون وابستگيون',
      founded: 'قائم ٿيو',
      registered: 'رجسٽرڊ'
    },
    leadership: {
      title: 'اسان جي اڳواڻي',
      subtitle: 'اسان جي ثقافتي مشن جي رھنمائي ڪندڙ وقف ٽيم سان ملو'
    },
    events: {
      title: 'واقعا ۽ پروگرام',
      subtitle: 'اسان جون ثقافتي سرگرميون، ورڪشاپ ۽ پرفارمنس دريافت ڪريو',
      upcoming: 'ايندڙ',
      past: 'گذريل',
      all: 'سڀ',
      venue: 'جڳھ',
      date: 'تاريخ',
      readMore: 'وڌيڪ پڙھو'
    },
    publications: {
      title: 'پريس ۽ اشاعتون',
      subtitle: 'اسان جي ثقافتي ڪم جي ميڊيا ڪوريج ۽ سڃاڻپ',
      publishedOn: 'شايع ٿيو',
      readMore: 'وڌيڪ پڙھو'
    },
    media: {
      title: 'ميڊيا گيلري',
      subtitle: 'اسان جي پرفارمنس، ڊراما ۽ ثقافتي پروگرام ڏسو',
      visitChannel: 'اسان جو يوٽيوب چينل ڏسو'
    },
    contact: {
      title: 'رابطي ۾ رھو',
      subtitle: 'اسان جي پروگرامن، واقعن بابت وڌيڪ سکڻ يا اسان جي مشن جي مدد لاءِ اسان سان رابطو ڪريو',
      phone: 'فون',
      email: 'اي ميل',
      address: 'پتو',
      pan: 'پين نمبر',
      panSubtitle: 'عطيي جي مقصد لاءِ',
      supportTitle: 'اسان جي مشن جي مدد ڪريو',
      supportText: 'توهان جو تعاون اسان کي ثقافتي ورثي کي محفوظ ڪرڻ، روايتي فنون ۾ نوجوانن کي تربيت ڏيڻ، ۽ اسان جي ڪميونٽي کي بھرپور ڪندڙ معنيٰ خيز ثقافتي پروگرام منظم ڪرڻ ۾ مدد ڪري ٿو.',
      contactUs: 'اسان سان رابطو ڪريو',
      callNow: 'ھاڻي ڪال ڪريو',
      donate: 'ھاڻي عطيو ڏيو',
      bankDetails: 'بينڪ اڪائونٽ تفصيل',
      accountNumber: 'اڪائونٽ نمبر',
      ifscCode: 'آءِ ايف ايس سي ڪوڊ',
      accountHolder: 'اڪائونٽ هولڊر'
    },
    footer: {
      quickLinks: 'تيز لنڪس',
      followUs: 'اسان جي پيروي ڪريو',
      copyright: 'سڀ حق محفوظ'
    },
    annualReports: {
      title: 'سالياني رپورٽون',
      subtitle: 'اسان جون سالانه ڪاميابيون ۽ سرگرميون ڏسو',
      downloadReport: 'رپورٽ ڊائون لوڊ ڪريو',
      year: 'سال',
      readMore: 'وڌيڪ پڙهو'
    }
  }
}

export function useTranslation(language: Language): Translations {
  return translations[language]
}
