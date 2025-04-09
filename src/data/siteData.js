
export const siteData = {
  companyName: "PSDJ",
  fullCompanyName: "PSDJ Interior Architecture",
  tagline: "We craft spaces with precision and passion.",
  description: "Award-winning interior architecture studio creating thoughtful spaces that enhance human experience through rigorous design thinking.",
  
  navigation: [
    { name: "Home", path: "/" },
    { name: "Our Work", path: "/our-work" },
    { name: "Expertise", path: "/expertise" },
    { name: "Contact", path: "/contact" },
  ],
  
  social: [
    { name: "Instagram", url: "https://instagram.com" },
    { name: "LinkedIn", url: "https://linkedin.com" },
    { name: "Pinterest", url: "https://pinterest.com" },
  ],
  
  contact: {
    email: "hello@psdjarchitecture.com",
    phone: "+1 (555) 123-4567",
    address: "123 Design Street, New York, NY 10001",
  },
  
  home: {
    hero: {
      title: "Interior Architecture with Vision",
      subtitle: "Creating spaces that inspire and endure",
      description: "We transform environments through thoughtful design, crafting spaces that reflect our clients' identities while pushing the boundaries of architectural innovation."
    },
    about: {
      title: "Design Philosophy",
      content: "At PSDJ, we believe in the power of design to transform how people experience space. Our approach combines rigorous attention to detail with bold creative vision, resulting in environments that are both functional and emotionally resonant.",
      values: [
        { title: "Precision", description: "Every millimeter matters in our design process." },
        { title: "Innovation", description: "We constantly push boundaries and explore new possibilities." },
        { title: "Collaboration", description: "We work closely with clients to realize their vision." },
        { title: "Sustainability", description: "Responsible design choices for a better future." }
      ]
    },
    featured: {
      title: "Featured Work",
      projects: [
        {
          title: "Meridian Loft",
          category: "Residential",
          image: "/placeholder.svg",
          description: "A minimalist penthouse with panoramic city views."
        },
        {
          title: "Vertex Gallery",
          category: "Commercial",
          image: "/placeholder.svg",
          description: "A contemporary art gallery with flexible exhibition spaces."
        },
        {
          title: "Nova Restaurant",
          category: "Hospitality",
          image: "/placeholder.svg",
          description: "An intimate dining environment with dramatic lighting design."
        }
      ]
    }
  },
  
  work: {
    title: "Our Work",
    description: "A curated portfolio of our most impactful projects across residential, commercial, and hospitality sectors.",
    categories: ["All", "Residential", "Commercial", "Hospitality"],
    projects: [
      {
        title: "Meridian Loft",
        category: "Residential",
        location: "New York, NY",
        year: "2023",
        description: "A minimalist penthouse with panoramic city views.",
        image: "/placeholder.svg",
        galleryImages: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
      },
      {
        title: "Vertex Gallery",
        category: "Commercial",
        location: "Chicago, IL",
        year: "2022",
        description: "A contemporary art gallery with flexible exhibition spaces.",
        image: "/placeholder.svg",
        galleryImages: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
      },
      {
        title: "Nova Restaurant",
        category: "Hospitality",
        location: "Miami, FL",
        year: "2022",
        description: "An intimate dining environment with dramatic lighting design.",
        image: "/placeholder.svg",
        galleryImages: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
      },
      {
        title: "Serene Residence",
        category: "Residential",
        location: "Los Angeles, CA",
        year: "2021",
        description: "A California modern home with seamless indoor-outdoor living.",
        image: "/placeholder.svg",
        galleryImages: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
      },
      {
        title: "Monolith Office",
        category: "Commercial",
        location: "Seattle, WA",
        year: "2021",
        description: "A forward-thinking workspace for a technology company.",
        image: "/placeholder.svg",
        galleryImages: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
      },
      {
        title: "Drift Hotel",
        category: "Hospitality",
        location: "Austin, TX",
        year: "2020",
        description: "A boutique hotel celebrating local materials and craftsmanship.",
        image: "/placeholder.svg",
        galleryImages: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
      }
    ]
  },
  
  expertise: {
    title: "Our Expertise",
    description: "We bring precision, creativity, and technical mastery to every project.",
    services: [
      {
        title: "Interior Architecture",
        description: "Comprehensive spatial design that considers both aesthetics and functionality, creating environments that reflect our clients' identities while optimizing the user experience.",
        icon: "building"
      },
      {
        title: "Space Planning",
        description: "Strategic organization of interior spaces to maximize efficiency, flow, and purpose, ensuring that every square foot serves its intended function.",
        icon: "layout"
      },
      {
        title: "Custom Furniture Design",
        description: "Bespoke furniture solutions tailored to each project's unique requirements, from statement pieces to integrated storage systems.",
        icon: "armchair"
      },
      {
        title: "Material Selection",
        description: "Thoughtful curation of materials that balance visual impact, tactile quality, durability, and sustainability considerations.",
        icon: "palette"
      },
      {
        title: "Lighting Design",
        description: "Sophisticated lighting strategies that enhance spatial qualities, highlight architectural features, and create appropriate atmospheres.",
        icon: "lamp"
      },
      {
        title: "Project Management",
        description: "Meticulous oversight of the execution process, ensuring that designs are realized with precision, on schedule, and within budget.",
        icon: "clipboard-list"
      }
    ],
    process: {
      title: "Our Process",
      steps: [
        {
          number: "01",
          title: "Discovery",
          description: "We begin by understanding your needs, aspirations, constraints, and the unique context of your project."
        },
        {
          number: "02",
          title: "Concept Development",
          description: "We explore creative possibilities and develop a strong conceptual foundation that will guide all design decisions."
        },
        {
          number: "03",
          title: "Design Development",
          description: "We refine the concept into detailed plans, elevations, materials, and specifications."
        },
        {
          number: "04",
          title: "Documentation",
          description: "We prepare comprehensive technical drawings and specifications for accurate implementation."
        },
        {
          number: "05",
          title: "Implementation",
          description: "We work closely with contractors and craftspeople to ensure faithful execution of the design vision."
        }
      ]
    }
  },
  
  contact: {
    title: "Contact Us",
    description: "Let's discuss how we can transform your space.",
    form: {
      name: "Name",
      email: "Email",
      phone: "Phone",
      message: "Message",
      submit: "Submit"
    },
    aboutUs: {
      title: "About Us",
      content: "PSDJ Interior Architecture was founded in 2010 with a vision to create spaces that balance aesthetic beauty with functional excellence. Our team of designers brings diverse backgrounds in architecture, fine arts, and materials science to each project, resulting in spaces that are as practical as they are inspiring. We've been recognized with numerous industry awards and our work has been featured in leading design publications worldwide.",
      team: [
        {
          name: "Patricia Sanders",
          position: "Principal Architect",
          image: "/placeholder.svg"
        },
        {
          name: "David Johnson",
          position: "Creative Director",
          image: "/placeholder.svg"
        },
        {
          name: "Julia Rodríguez",
          position: "Senior Designer",
          image: "/placeholder.svg"
        },
        {
          name: "Michael Chang",
          position: "Project Manager",
          image: "/placeholder.svg"
        }
      ]
    }
  }
};
