document.addEventListener('DOMContentLoaded', function() {
    const commandInput = document.getElementById('command-input');
    const commandOutput = document.getElementById('command-output');
    const terminalContent = document.getElementById('terminal-content');
    
    // Available commands
    const commands = {
        help: {
            description: "Show available commands",
            execute: () => {
                let output = '<div class="mb-4"><div class="text-cyan-400">Available commands:</div><ul class="list-disc ml-6 mt-2">';
                for (const cmd in commands) {
                    output += `<li><span class="text-green-400">${cmd}</span> - ${commands[cmd].description}</li>`;
                }
                output += '</ul></div>';
                return output;
            }
        },
        clear: {
            description: "Clear the terminal",
            execute: () => {
                commandOutput.innerHTML = '';
                return '';
            }
        },
        about: {
            description: "Show about information",
            execute: () => {
                return `
                    <div class="mb-4">
                        <div class="text-green-400">$ about</div>
                        <div class="ml-4 text-gray-300">
                            <p class="mb-2">Computer Engineering student, currently in the 3rd year.</p>
                            <p class="mb-2">Proactive, analytical and focused on efficient solutions.</p>
                            <p>Enthusiastic about IT systems and fascinated by systems administration, services and infrastructures.</p>
                        </div>
                    </div>
                `;
            }
        },
        experience: {
            description: "Show professional experience",
            execute: () => {
                return `
                    <div class="mb-4">
                        <div class="text-green-400">$ experience</div>
                        <div class="ml-4">
                            <h3 class="text-cyan-400 font-bold mb-2">Capgemini – Lisbon, Portugal</h3>
                            <p class="text-gray-300 mb-1">Intern - Help Desk</p>
                            <ul class="list-disc ml-6 text-gray-300">
                                <li>User technical support and assistance</li>
                                <li>Equipment installation and configuration</li>
                                <li>User training and guidance</li>
                                <li>Monitoring and preventive maintenance</li>
                            </ul>
                        </div>
                    </div>
                `;
            }
        },
        education: {
            description: "Show academic background",
            execute: () => {
                return `
                    <div class="mb-4">
                        <div class="text-green-400">$ education</div>
                        <div class="ml-4">
                            <h3 class="text-cyan-400 font-bold mb-2">Bachelor's in Computer Engineering</h3>
                            <p class="text-gray-300 mb-1">Polytechnic Institute of Leiria - School of Technology and Management</p>
                            <p class="text-gray-400 text-sm mb-3">2020 - Present | NQF Level 6</p>
                            
                            <h3 class="text-cyan-400 font-bold mb-2">Vocational Course in IT Equipment Technician and Management</h3>
                            <p class="text-gray-300 mb-1">Instituto dos Pupilos do Exército</p>
                            <p class="text-gray-400 text-sm">NQF Level 4</p>
                        </div>
                    </div>
                `;
            }
        },
        skills: {
            description: "Show technical skills",
            execute: () => {
                return `
                    <div class="mb-4">
                        <div class="text-green-400">$ skills</div>
                        <div class="ml-4">
                            <h3 class="text-cyan-400 font-bold mb-2">Main digital skills:</h3>
                            <div class="flex flex-wrap gap-2 mb-4">
                                <span class="badge">Networking</span>
                                <span class="badge">AWS Cloud</span>
                                <span class="badge">Virtualization</span>
                                <span class="badge">C Language</span>
                                <span class="badge">Java</span>
                                <span class="badge">Laravel</span>
                                <span class="badge">Tailwind</span>
                                <span class="badge">Linux</span>
                            </div>
                            
                            <h3 class="text-cyan-400 font-bold mb-2">Other skills:</h3>
                            <div class="flex flex-wrap gap-2">
                                <span class="badge">Morse Code</span>
                                <span class="badge">Braille</span>
                            </div>
                        </div>
                    </div>
                `;
            }
        },
        certificates: {
            description: "Show obtained certificates",
            execute: () => {
                return `
                    <div class="mb-4">
                        <div class="text-green-400">$ certificates</div>
                        <div class="ml-4">
                            <div class="mb-3">
                                <h3 class="text-cyan-400 font-bold mb-1">AWS Academy Graduate - AWS Academy Cloud Foundations</h3>
                                <a href="https://www.credly.com/badges/c8ef9340-6f73-4da4-baf4-c23590edd89f/public_url" 
                                   class="text-cyan-400 hover:underline" target="_blank">View certificate</a>
                            </div>
                            <div>
                                <h3 class="text-cyan-400 font-bold mb-1">AWS Academy Graduate - AWS Academy Cloud Security Foundations</h3>
                                <a href="https://www.credly.com/badges/4df0c06a-8ac9-44a3-a3c6-23afb18cc67e/public_url" 
                                   class="text-cyan-400 hover:underline" target="_blank">View certificate</a>
                            </div>
                        </div>
                    </div>
                `;
            }
        },
        contact: {
            description: "Show contact information",
            execute: () => {
                return `
                    <div class="mb-4">
                        <div class="text-green-400">$ contact</div>
                        <div class="ml-4">
                            <div class="flex items-center mb-2">
                                <i class="fas fa-phone-alt text-cyan-400 mr-2"></i>
                                <span class="text-gray-300">(+351) 914989348</span>
                            </div>
                            <div class="flex items-center mb-2">
                                <i class="fas fa-envelope text-cyan-400 mr-2"></i>
                                <span class="text-gray-300">froliveira10213@sapo.pt</span>
                            </div>
                            <div class="flex items-center mb-2">
                                <i class="fas fa-map-marker-alt text-cyan-400 mr-2"></i>
                                <span class="text-gray-300">2415-030 Leiria, Portugal</span>
                            </div>
                        </div>
                    </div>
                `;
            }
        },
        theme: {
            description: "Change terminal theme",
            execute: () => {
                return `
                    <div class="mb-4">
                        <div class="text-green-400">$ theme</div>
                        <div class="ml-4">
                            <p class="text-gray-300 mb-2">Available themes:</p>
                            <div class="flex flex-wrap gap-2">
                                <button class="px-3 py-1 bg-cyan-600 rounded text-white" onclick="changeTheme('cyan')">Cyber</button>
                                <button class="px-3 py-1 bg-green-600 rounded text-white" onclick="changeTheme('green')">Matrix</button>
                                <button class="px-3 py-1 bg-purple-600 rounded text-white" onclick="changeTheme('purple')">Synthwave</button>
                                <button class="px-3 py-1 bg-red-600 rounded text-white" onclick="changeTheme('red')">Retro</button>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
    };
    
    // Handle command input
    commandInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const command = commandInput.value.trim().toLowerCase();
            commandInput.value = '';
            
            // Display the command
            commandOutput.innerHTML += `<div class="text-green-400">$ ${command}</div>`;
            
            // Execute command or show error
            if (commands[command]) {
                commandOutput.innerHTML += commands[command].execute();
            } else if (command) {
                commandOutput.innerHTML += `<div class="ml-4 text-red-400">Command not found: ${command}. Type 'help' for available commands.</div>`;
            }
            
            // Scroll to bottom
            terminalContent.scrollTop = terminalContent.scrollHeight;
        }
    });
    
    // Focus input on any click
    document.addEventListener('click', function() {
        commandInput.focus();
    });
});

// Theme changer function
function changeTheme(color) {
    const terminal = document.querySelector('.terminal');
    const glowText = document.querySelectorAll('.glow-text');
    const skillBars = document.querySelectorAll('.skill-bar');
    
    // Remove all color classes
    const colors = ['cyan', 'green', 'purple', 'red'];
    colors.forEach(c => {
        terminal.classList.remove(`border-${c}-400`, `border-${c}-500`, `shadow-${c}-500`);
        glowText.forEach(el => el.classList.remove(`text-${c}-400`, `glow-text-${c}`));
    });
    
    // Add new color classes
    terminal.classList.add(`border-${color}-400`, `shadow-${color}-500`);
    glowText.forEach(el => el.classList.add(`text-${color}-400`, `glow-text-${color}`));
    
    // Update skill bars
    skillBars.forEach(bar => {
        bar.style.background = `linear-gradient(90deg, var(--tw-${color}-400), var(--tw-${color}-600))`;
    });
}