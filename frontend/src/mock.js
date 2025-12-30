export const portfolioData = {
  personal: {
    name: "Ariel Barclay Christian",
    nickname: "Clay", 
    age: "19", 
    born: "Sanggau, 7 September 2006",
    title: "Multimedia & Computer Science",
    tagline: "Pemula yang sedang belajar menjadi Full-stack Developer dan Desainer Grafis.",
    bio: "Saya seorang Mahasiswa Teknik Informatika & Lulusan SMK Multimedia yang punya minat besar dalam pengembangan full-stack, kecerdasan buatan, dan desain grafis. saya senang belajar membuat desain web dan desain yang menarik, ayo kenal lebih dekat dengan saya !",
    email: "arielbarclay.8181@email.com",
    phone: "+62 812-9993-8984",
    location: "South Jakarta, Indonesia",
    avatar: "/image.png",
    resume: "#",
    social: {
      github: "https://github.com/arielbarclay8181-cloud",
      linkedin: "https://linkedin.com",
      twitter: "https://x.com/claychrst",
      instagram: "https://www.instagram.com/claychrst/"
    }
  },

  skills: [
    {
      category: "Programming Languages",
      items: [
        { name: "JavaScript", level: 40, icon: "Code2" },
        { name: "Python", level: 40, icon: "Terminal" },
        { name: "Golang", level: 20, icon: "Code" },
        { name: "C", level: 10, icon: "Cpu" },
        { name: "TypeScript", level: 40, icon: "FileCode" }
      ]
    },
    {
      category: "Web Development",
      items: [
        { name: "React.js", level: 40, icon: "Layers" },
        { name: "Node.js", level: 40, icon: "Server" },
        { name: "SupaBase", level: 40, icon: "Zap" },
        { name: "MongoDB", level: 5, icon: "Database" },
        { name: "Tailwind CSS", level: 40, icon: "Palette" }
      ]
    },
    {
      category: "Tools For Programming ",
      items: [
        { name: "VS Code", level: 70, icon: "Code" },
        { name: "Git & GitHub", level: 30, icon: "GitBranch" },
        { name: "Docker", level: 10,icon: "Container" },
        { name: "Figma", level: 50, icon: "Figma" }
      ]
    },
    {
      category: "Design & Creative",
      items: [
        { name: "Adobe Photoshop", level: 80, icon: "Palette" },
        { name: "Affinity", level: 70, icon: "PenTool" },
        { name: "Canva", level: 80, icon: "Layout" },
        { name: "Capcut", level: 60, icon: "Video" }
      ]
    },
    {
      category: "Languages",
      items: [
        { name: "Indonesia", level: 100, icon: "Globe" }, 
        { name: "English", level: 60, icon: "Globe" }, 
        { name: "China", level: 0, icon: "Globe" }
      ]
    }
  ],

  projects: [
    {
      id: 1,
      title: "Web Class",
      description: "Web untuk informasi kelas online dengan banyak fitur menarik",
      image: "/webkelas.png",
      type: "apps",
      tags: ["react", "Typescript", "Node.js", "Supabase"],
      github: "https://github.com/arielbarclay8181-cloud/web-kelas-2ia13",
      demo: "https://web-kelas-2ia13.vercel.app/",
      color: "pink"
    },
    {
      id: 2,
      title: "Aplikasi Rumah sakit Gunadarma",
      description: "Tugas Informatika Kesehatan membuat aplikasi rumah sakit sederhana",
      image: "/rslogo.png",
      type: "apps", 
      tags: ["react", "Typescript", "Node.js", "Supabase"],
      github: "https://github.com/arielbarclay8181-cloud/aplikasi-rumah-sakit-sederhana.git",
      demo: "https://aplikasi-rumah-sakit-sederhana.vercel.app/",
      color: "green"
    },
    {
      id: 3,
      title: "Design Social media",
      description: "Social media post design",
      image: "/3.jpeg", 
      type: "design",
      tags: ["Photoshop"],
      color: "cyan"
    },
    {
      id: 4,
      title: "Short Video",
      description: "Short Movie Hasil Dari kerja Kelompok Praktikum Videografi.",
      thumbnail: "/smkg.png", 
      videoLink: "https://drive.google.com/drive/folders/1ffGR2MkSASCmpvMCWe0sTDnRgz1yPNnO", 
      type: "video",
      tags: ["Adobe Premiere"],
      color: "purple"
    },
        {
      id: 5,
      title: "My Portfolio",
      description: "Portfolio pribadi tentang saya",
      image: "/clay.png",
      type: "apps",
      tags: ["react", "Typescript", "Node.js", "FastAPI" , "neonDB" , "Python"],
      github: "https://github.com/arielbarclay8181-cloud/my-portfolio.git",
      demo: "https://my-portfolio-three-nu-pm0vhn1ye6.vercel.app/",
      color: "cyan"
    },
    {
      id: 6,
      title: "Design recruitment",
      description: "Design recruitment",
      image: "/1.jpeg", 
      type: "design",
      tags: ["Photoshop"],
      color: "purple"
    },
    {
      id: 7,
      title: "Design Social media",
      description: "Social media post design",
      image: "/2.jpeg", 
      type: "design",
      tags: ["Photoshop"],
      color: "cyan"
    },
    {
      id: 8,
      title: "Design Big Day",
      description: "Design Eid Al-Fitr",
      image: "/4.jpeg", 
      type: "design",
      tags: ["Photoshop"],
      color: "purple"
    },
    {      
    id: 9,
      title: "Design Commemorative Day",
      description: "International Day for the Preservation of the Ozone Layer",
      image: "/5.jpeg", 
      type: "design",
      tags: ["Photoshop"],
      color: "cyan"
    },
    {
      id: 10,
      title: "Design Social media",
      description: "Social media post design",
      image: "/6.jpeg", 
      type: "design",
      tags: ["Photoshop"],
      color: "purple"
    },
    {      
    id: 11,
      title: "Design Social media",
      description: "Social media post design",
      image: "/7.jpeg", 
      type: "design",
      tags: ["Photoshop"],
      color: "cyan"
    },
    {
      id: 12,
      title: "Design Social media",
      description: "Social media post design",
      image: "/8.jpeg", 
      type: "design",
      tags: ["Photoshop"],
      color: "purple"
    },
    {
      id: 13,
      title: "Design Benner",
      description: "Benner Design Food",
      image: "/9.jpg", 
      type: "design",
      tags: ["Photoshop"],
      color: "cyan"
    },
    {
      id: 14,
      title: "Web Panti Jompo Sahabat Harapan Senja 2",
      description: "Web untuk informasi panti jompo sahabat harapan senja 2",
      image: "/logo2.png",
      type: "apps",
      tags: ["react", "Typescript", "Node.js"],
      github: "https://github.com/arielbarclay8181-cloud/web-shs2.git",
      demo: "https://www.sahabatharapansenja2.com/",
      color: "pink"
    }
  ],

  experience: [
    {
      id: 1,
      title: "Sekolah Dasar",
      company: "Budi Mulia Desa Putera",
      period: "2014 - 2017",
      description: "Menyelesaikan pendidikan dasar (SD) dengan fokus pada pengembangan kemampuan dasar belajar.",
      type: "education"
    },
    {
      id: 2,
      title: "Sekolah Menegah Pertama",
      company: "Budi Mulia Desa Putera",
      period: "2017 - 2020",
      description: "Menyelesaikan pendidikan menengah pertama (SMP).",
      type: "education"
    },
    {
      id: 3,
      title: "Sekolah Menengah Kejuruan Grafika - Multimedia",
      company: "Budi Mulia Desa Putera",
      period: "2020 - 2024",
      description: "Fokus utama pada keahlian Desain Grafis, Fotografi, dan Videografi. Mendapatkan pelatihan praktik intensif di bidang Multimedia.",
      type: "education"
    },
    {
      id: 4,
      title: "University - Informatics Engineering",
      company: "Gunadarma University",
      period: "2024 - present",
      description: "Sedang menempuh pendidikan Sarjana di bidang Teknik Informatika",
      type: "education"
    },
    {
      id: 5,
      title: "Internship - Asistent Team Creative",
      company: "PT Stella Satindo",
      period: "juli 2023 - oktober 2023",
      description: "Membuat design untuk postingan promosi sosial media & Menjadi Pemeran untuk video promosi",
      type: "work"
    },
    {
      id: 6,
      title: "Freelancer",
      company: "Globaline Freight Forwarder",
      period: "januari 2024 - april 2024",
      description: "Membuat konten dalam bentuk Design Grafis.",
      type: "work"
    },
    {
      id: 7,
      title: "Interniship - Data Entry",
      company: "PT. Sari Melati Kencana - Pizza Hut",
      period: "Juli 2025 - September 2025",
      description: "Mengambil data dari google maps, Cleaning Data, Untuk Keperluan Mechine Learning",
      type: "work"
    }
  ],

  Certificate: [
    {
      title: "Sertifikat Fundamental of Python",
      description: "Kursus Data Science Semester 1 di Univesitas Gunadarma",
      year: "17 Februari - 01 Maret 2025",
      link: "Sertifikat Fundamental of Python.pdf" 
    },
    {
      title: "Sertifikat Fundamental of Data Science",
      description: "Kursus Data Science Semester 2 di Univesitas Gunadarma",
      year: "16 Juni - 21 Juni 2025",
      link: "Sertifikat Fundamental of Data Science.pdf" 
    }
  ]
};