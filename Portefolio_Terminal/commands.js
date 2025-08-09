class TerminalCommands {
    constructor(data, getSessionUptime) {
        this.data = data;
        this.getSessionUptime = getSessionUptime;
    }
    
    help() {
        const commandList = {
            help: "Show available commands",
            about: "Show detailed about information", 
            skills: "Show technical skills and proficiency",
            projects: "Show portfolio projects",
            experience: "Show professional experience",
            education: "Show academic background", 
            contact: "Show contact information",
            cv: "Download CV in PDF format",
            clear: "Clear the terminal screen"
            // REMOVIDO: whoami: "Display current user information"
        };
        
        let helpText = `
            <div class="mb-4 command-output">
                <div class="text-green-400">visitor@portfolio:~$ help</div>
                <div class="ml-4">
                    <p class="text-cyan-400 mb-3 font-bold">📋 Available Commands:</p>
                    <div class="space-y-2">`;
        
        Object.entries(commandList).forEach(([cmd, desc]) => {
            helpText += `
                <div class="flex items-start space-x-4 p-2 rounded bg-gray-800 bg-opacity-30">
                    <span class="text-yellow-400 font-mono font-bold min-w-fit">${cmd}</span>
                    <span class="text-gray-300 text-sm flex-1">${desc}</span>
                </div>`;
        });
        
        helpText += `
                    </div>
                    <div class="mt-4 p-3 bg-blue-900 bg-opacity-30 rounded border-l-4 border-blue-400">
                        <p class="text-blue-300 text-sm">
                            💡 <strong>Tip:</strong> Use ↑↓ arrows for command history, Tab for autocomplete
                        </p>
                    </div>
                </div>
            </div>`;
        return helpText;
    }
    
    about() {
        const { about } = this.data;
        return `
            <div class="mb-4 command-output">
                <div class="text-green-400">visitor@portfolio:~$ about</div>
                <div class="ml-4">
                    <div class="bg-gray-800 bg-opacity-50 p-4 rounded-lg border border-cyan-400 border-opacity-30">
                        <h3 class="text-cyan-400 font-bold text-lg mb-3">👨‍💻 About Me</h3>
                        <div class="space-y-3 text-gray-300">
                            <p>🎓 <strong>Current Status:</strong> ${about.status}</p>
                            <p>🏫 <strong>Institution:</strong> ${about.institution}</p>
                            <p>💡 <strong>Passion:</strong> ${about.passion}</p>
                            <p>🎯 <strong>Focus:</strong> ${about.focus}</p>
                            <p>🌍 <strong>Languages:</strong> ${about.languages}</p>
                        </div>
                        <div class="mt-4 flex flex-wrap gap-2">
                            ${about.traits.map(trait => `<span class="badge">${trait}</span>`).join('')}
                        </div>
                        
                        <!-- CV Download Section -->
                        <div class="mt-6 p-4 bg-gradient-to-r from-blue-900 to-purple-900 bg-opacity-40 rounded-lg border border-blue-400 border-opacity-30">
                            <h4 class="text-blue-400 font-bold mb-3 flex items-center">
                                <i class="fas fa-file-pdf mr-2"></i>
                                📄 Curriculum Vitae
                            </h4>
                            <div class="flex items-center justify-between">
                                <div class="text-gray-300 text-sm">
                                    <p class="mb-1">Download my complete CV in PDF format</p>
                                    <p class="text-gray-400 text-xs">File: ${about.cv.filename}</p>
                                </div>
                                <button onclick="downloadCV('${about.cv.path}', '${about.cv.filename}')" 
                                        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2 text-sm font-bold">
                                    <i class="fas fa-download"></i>
                                    <span>Download CV</span>
                                </button>
                            </div>
                            
                            <div class="mt-3 text-xs text-gray-400 bg-gray-800 bg-opacity-50 p-2 rounded">
                                <i class="fas fa-info-circle mr-1"></i>
                                <span>Contains detailed information about education, experience, skills and certifications</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
    }
    
    skills() {
        const { skills } = this.data;
        
        let skillsHtml = `
            <div class="mb-4 command-output">
                <div class="text-green-400">visitor@portfolio:~$ skills --list</div>
                <div class="ml-4">
                    <h3 class="text-cyan-400 font-bold mb-4">🛠️ Technical Skills</h3>
                    <div class="flex flex-wrap gap-2 mb-6">`;
        
        skills.technical.forEach(skill => {
            skillsHtml += `<span class="badge">${skill}</span>`;
        });
        
        skillsHtml += `
                </div>
                
                <div class="mt-6">
                    <h4 class="text-green-400 font-bold mb-3">🏆 Certifications</h4>
                    <div class="space-y-2">`;
        
        skills.certifications.forEach(cert => {
            skillsHtml += `
            <a href="${cert.url}" target="_blank" 
               class="text-cyan-400 hover:underline flex items-center space-x-2 p-2 rounded bg-gray-800 bg-opacity-30 hover:bg-opacity-50 transition-colors">
                <span>${cert.icon}</span>
                <span>${cert.name}</span>
                <i class="fas fa-external-link-alt text-xs"></i>
            </a>`;
        });
        
        skillsHtml += `
                    </div>
                </div>
            </div>
        </div>`;
        return skillsHtml;
    }
    
    projects() {
        const { projects } = this.data;
        
        let projectsHtml = `
            <div class="mb-4 command-output">
                <div class="text-green-400">visitor@portfolio:~$ projects --list</div>
                <div class="ml-4">
                    <h3 class="text-cyan-400 font-bold mb-4">🚀 Projects</h3>
                    <div class="space-y-4">`;
        
        projects.forEach(project => {
            projectsHtml += `
                <div class="project-card bg-gray-800 bg-opacity-50 p-4 rounded border-l-4 border-${project.borderColor}-400">
                    <h4 class="text-${project.borderColor}-400 font-bold">${project.icon} ${project.name}</h4>
                    <p class="text-gray-300 mt-1">${project.description}</p>
                    <div class="flex flex-wrap gap-2 mt-2">
                        ${project.technologies.map(tech => `<span class="badge">${tech}</span>`).join('')}
                    </div>
                    <div class="flex items-center justify-between mt-3">
                        <p class="text-gray-400 text-sm">Status: <span class="text-${project.statusColor}-400">${project.status}</span></p>
                        <a href="${project.github}" target="_blank" 
                           class="text-cyan-400 hover:underline text-sm flex items-center space-x-1">
                            <i class="fab fa-github"></i>
                            <span>View on GitHub</span>
                        </a>
                    </div>
                </div>`;
        });
        
        projectsHtml += `
                    </div>
                </div>
            </div>`;
        return projectsHtml;
    }
    
    experience() {
        const { experience } = this.data;
        
        let experienceHtml = `
            <div class="mb-4 command-output">
                <div class="text-green-400">visitor@portfolio:~$ experience --timeline</div>
                <div class="ml-4">
                    <h3 class="text-cyan-400 font-bold mb-4">💼 Professional Experience</h3>
                    <div class="space-y-4">`;
        
        experience.forEach(exp => {
            experienceHtml += `
                <div class="experience-item border-l-2 border-${exp.color}-400 pl-4">
                    <h4 class="text-${exp.color}-400 font-bold">${exp.icon} ${exp.title}</h4>
                    <p class="text-gray-300">${exp.company}</p>
                    <p class="text-gray-400 text-sm">${exp.location}</p>
                    <ul class="text-gray-300 text-sm mt-2 space-y-1">
                        ${exp.tasks.map(task => `<li>• ${task}</li>`).join('')}
                    </ul>
                </div>`;
        });
        
        experienceHtml += `
                    </div>
                </div>
            </div>`;
        return experienceHtml;
    }
    
    education() {
        const { education } = this.data;
        
        let educationHtml = `
            <div class="mb-4 command-output">
                <div class="text-green-400">visitor@portfolio:~$ education --details</div>
                <div class="ml-4">
                    <h3 class="text-cyan-400 font-bold mb-4">🎓 Academic Background</h3>
                    <div class="space-y-4">`;
        
        education.forEach(edu => {
            educationHtml += `
                <div class="education-card bg-gradient-to-r ${edu.gradient} bg-opacity-30 p-4 rounded-lg border border-${edu.color}-400 border-opacity-30">
                    <h4 class="text-${edu.color}-400 font-bold text-lg">${edu.icon} ${edu.title}</h4>
                    <p class="text-gray-300 mb-1">${edu.institution}</p>
                    <div class="flex flex-wrap gap-4 text-sm text-gray-400 mb-2">
                        <span>📅 ${edu.status}</span>
                        <span>🎖️ ${edu.level}</span>
                        <span>📍 ${edu.location}</span>
                    </div>
                    <a href="${edu.url}" class="text-${edu.color}-400 hover:underline text-sm" target="_blank">
                        🔗 ${edu.urlText}
                    </a>
                </div>`;
        });
        
        educationHtml += `
                    </div>
                </div>
            </div>`;
        return educationHtml;
    }
    
    contact() {
        const { contact } = this.data;
        
        return `
            <div class="mb-4 command-output">
                <div class="text-green-400">visitor@portfolio:~$ contact --all</div>
                <div class="ml-4">
                    <div class="bg-gray-800 bg-opacity-50 p-4 rounded-lg border border-cyan-400 border-opacity-30">
                        <h3 class="text-cyan-400 font-bold text-lg mb-4">📞 Contact Information</h3>
                        <div class="space-y-4">
                            <div class="flex items-center space-x-3">
                                <i class="fas fa-envelope text-cyan-400 w-5"></i>
                                <span class="text-gray-300">${contact.email}</span>
                                <button onclick="copyToClipboard('${contact.email}')" 
                                        class="text-yellow-400 hover:text-yellow-300 text-xs">
                                    📋 Copy
                                </button>
                            </div>
                            
                            <div class="flex items-center space-x-3">
                                <i class="fab fa-linkedin text-cyan-400 w-5"></i>
                                <a href="${contact.linkedin.url}" 
                                   target="_blank" class="text-cyan-400 hover:underline">
                                    ${contact.linkedin.text}
                                </a>
                            </div>
                            
                            <div class="flex items-center space-x-3">
                                <i class="fab fa-github text-cyan-400 w-5"></i>
                                <a href="${contact.github.url}" 
                                   target="_blank" class="text-cyan-400 hover:underline">
                                    ${contact.github.text}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
    }
    
    cv() {
        const { about } = this.data;
        return `
            <div class="mb-4 command-output">
                <div class="text-green-400">visitor@portfolio:~$ cv --download</div>
                <div class="ml-4">
                    <div class="bg-gradient-to-r from-blue-900 to-purple-900 bg-opacity-40 p-4 rounded-lg border border-blue-400 border-opacity-30">
                        <h3 class="text-blue-400 font-bold text-lg mb-3 flex items-center">
                            <i class="fas fa-file-pdf mr-2"></i>
                            📄 Curriculum Vitae Download
                        </h3>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div class="space-y-2 text-gray-300 text-sm">
                                <p><strong>📋 Content Includes:</strong></p>
                                <ul class="space-y-1 ml-4">
                                    <li>• Personal Information</li>
                                    <li>• Professional Experience</li>
                                    <li>• Education & Training</li>
                                    <li>• Technical Skills</li>
                                    <li>• Certifications</li>
                                    <li>• Language Proficiency</li>
                                </ul>
                            </div>
                            <div class="space-y-2 text-gray-300 text-sm">
                                <p><strong>📊 File Details:</strong></p>
                                <ul class="space-y-1 ml-4">
                                    <li>• Format: PDF</li>
                                    <li>• Language: Portuguese</li>
                                    <li>• Updated: Recently</li>
                                    <li>• Professional Format</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="flex justify-center">
                            <button onclick="downloadCV('${about.cv.path}', '${about.cv.filename}')" 
                                    class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-3 font-bold">
                                <i class="fas fa-download text-lg"></i>
                                <span>Download CV (PDF)</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>`;
    }
    
    whoami() {
        return `visitor@portfolio - ${this.data.personal.name}'s Terminal Portfolio`;
    }
}

// Export for both Node.js and browser environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TerminalCommands;
} else {
    window.TerminalCommands = TerminalCommands;
}