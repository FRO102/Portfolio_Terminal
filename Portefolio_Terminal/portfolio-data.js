const portfolioData = {
    personal: {
        name: "Frederico Oliveira",
        title: "Computer Engineering Student",
        email: "froliveira10213@sapo.pt",
        location: "Leiria, Portugal",
        year: "3rd year",
        institution: "Instituto Politécnico de Leiria"
    },
    
    about: {
        status: "3rd year Computer Engineering student",
        institution: "Instituto Politécnico de Leiria",
        passion: "System administration, services and infrastructure",
        focus: "Efficient solutions and continuous learning",
        languages: "Portuguese (native), English (B1)",
        traits: ["Team Player", "Quick Learner", "Problem Solver", "Detail-Oriented"],
        cv: {
            filename: "Frederico_Oliveira_CV.pdf",
            path: "./assets/cv/Frederico_Oliveira_CV.pdf"
        }
    },
    
    skills: {
        technical: [
            "Networking",
            "AWS Cloud", 
            "System Administration",
            "Virtualization",
            "C Language",
            "Java",
            "Laravel",
            "Linux",
            "Git/GitHub",
            "Technical Documentation"
        ],
        certifications: [
            {
                name: "AWS Academy Cloud Foundations",
                icon: "🏆",
                url: "https://www.credly.com/badges/c8ef9340-6f73-4da4-baf4-c23590edd89f/public_url"
            },
            {
                name: "AWS Academy Cloud Security Foundations", 
                icon: "🔒",
                url: "https://www.credly.com/badges/4df0c06a-8ac9-44a3-a3c6-23afb18cc67e/public_url"
            }
        ]
    },
    
    projects: [
        {
            name: "Home Lab",
            icon: "🌐", 
            description: "Virtual network infrastructure for learning and testing",
            technologies: ["Proxmox", "Ubuntu server", "OpnSense", "Cloudflare"],
            status: "In Progress",
            statusColor: "yellow",
            borderColor: "green",
            github: "https://github.com/frederico-oliveira/network-lab"
        }
    ],
    
    experience: [
        {
            title: "Help Desk Intern",
            company: "Capgemini",
            location: "Lisbon, Portugal",
            icon: "🛠️",
            color: "green",
            tasks: [
                "Technical support and user assistance via phone and email",
                "Hardware and software troubleshooting and diagnostics", 
                "Equipment installation and configuration",
                "User training and guidance on tools and systems",
                "System monitoring and preventive maintenance"
            ]
        }
    ],
    
    education: [
        {
            title: "Bachelor's in Computer Engineering",
            institution: "Instituto Politécnico de Leiria - Escola Superior de Tecnologia e Gestão",
            status: "Present",
            level: "NQF Level 6",
            location: "Leiria, Portugal",
            url: "https://www.ipleiria.pt/curso/licenciatura-em-engenharia-informatica/",
            urlText: "ipleiria.pt",
            icon: "🎯",
            color: "cyan",
            gradient: "from-blue-900 to-purple-900"
        },
        {
            title: "Vocational Course in IT Equipment Technician",
            institution: "Instituto dos Pupilos do Exército", 
            status: "Completed",
            level: "NQF Level 4",
            location: "Lisboa, Portugal",
            url: "https://pupilos.pt/",
            urlText: "pupilos.pt",
            icon: "⚡",
            color: "green",
            gradient: "from-green-900 to-teal-900"
        }
    ],
    
    contact: {
        email: "froliveira10213@sapo.pt",
        linkedin: {
            url: "https://www.linkedin.com/in/frederico-oliveira-3598a614b/",
            text: "LinkedIn Profile"
        },
        github: {
            url: "https://github.com/FRO102",
            text: "GitHub Profile"
        }
    }
};

// Export for both Node.js and browser environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = portfolioData;
} else {
    window.portfolioData = portfolioData;
}