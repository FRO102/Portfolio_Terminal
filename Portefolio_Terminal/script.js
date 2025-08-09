document.addEventListener('DOMContentLoaded', function() {
    // Variables
    let commandHistory = [];
    let historyIndex = -1;
    let commandCount = 0;
    let sessionStartTime = Date.now();
    
    // DOM elements
    const commandInput = document.getElementById('command-input');
    const commandOutput = document.getElementById('command-output');
    const terminalContent = document.getElementById('terminal-content');
    const commandCountEl = document.getElementById('command-count');
    const sessionTimeEl = document.getElementById('session-time');
    
    // Initialize terminal commands with data
    const terminalCommands = new TerminalCommands(portfolioData, getSessionUptime);
    
    // Initialize
    updateSessionTime();
    setInterval(updateSessionTime, 1000);
    
    // Commands object (REMOVIDO: whoami)
    const commands = {
        help: {
            description: "Show available commands",
            execute: () => terminalCommands.help()
        },
        about: {
            description: "Show detailed about information",
            execute: () => terminalCommands.about()
        },
        skills: {
            description: "Show technical skills and proficiency",
            execute: () => terminalCommands.skills()
        },
        projects: {
            description: "Show portfolio projects",
            execute: () => terminalCommands.projects()
        },
        experience: {
            description: "Show professional experience",
            execute: () => terminalCommands.experience()
        },
        education: {
            description: "Show academic background",
            execute: () => terminalCommands.education()
        },
        contact: {
            description: "Show contact information",
            execute: () => terminalCommands.contact()
        },
        cv: {
            description: "Download CV in PDF format",
            execute: () => terminalCommands.cv()
        },
        clear: {
            description: "Clear the terminal screen",
            execute: () => {
                commandOutput.innerHTML = '';
                return '';
            }
        }
        // REMOVIDO: whoami command
    };
    
    // Event listeners
    commandInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const command = this.value.trim();
            if (command) {
                executeCommand(command);
                if (commandHistory[commandHistory.length - 1] !== command) {
                    commandHistory.push(command);
                }
                historyIndex = -1;
            }
            this.value = '';
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                this.value = commandHistory[commandHistory.length - 1 - historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                this.value = commandHistory[commandHistory.length - 1 - historyIndex];
            } else if (historyIndex === 0) {
                historyIndex = -1;
                this.value = '';
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            const input = this.value.toLowerCase();
            const matches = Object.keys(commands).filter(cmd => cmd.startsWith(input));
            if (matches.length === 1) {
                this.value = matches[0];
            } else if (matches.length > 1) {
                const completion = getCommonPrefix(matches);
                if (completion.length > input.length) {
                    this.value = completion;
                }
            }
        }
    });
    
    // Function to execute commands
    function executeCommand(command) {
        const cmd = command.toLowerCase().trim();
        commandCount++;
        updateCommandCount();
        
        // Add command to output with animation
        const commandDiv = document.createElement('div');
        commandDiv.className = 'command-enter';
        
        if (commands[cmd]) {
            const result = commands[cmd].execute();
            if (result) {
                commandDiv.innerHTML = result;
                commandOutput.appendChild(commandDiv);
            }
        } else {
            commandDiv.innerHTML = `
                <div class="mb-4 command-output">
                    <div class="text-green-400">visitor@portfolio:~$ ${command}</div>
                    <div class="ml-4 text-red-400">
                        ❌ Command not found: '${command}'
                        <div class="text-gray-400 text-sm mt-1">
                            Type 'help' to see available commands
                        </div>
                    </div>
                </div>`;
            commandOutput.appendChild(commandDiv);
        }
        
        // Scroll to bottom
        terminalContent.scrollTop = terminalContent.scrollHeight;
    }
    
    // Copy to clipboard function
    function copyToClipboard(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                console.log('Text copied to clipboard');
            }).catch(err => {
                console.error('Could not copy text: ', err);
            });
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
        }
    }

    // CV Download function
    function downloadCV(filePath, filename) {
        try {
            // Create a temporary link element
            const link = document.createElement('a');
            link.href = filePath;
            link.download = filename;
            link.target = '_blank';
            
            // Append to body, click, and remove
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Show success message in terminal
            showDownloadMessage('success', filename);
        } catch (error) {
            console.error('Download failed:', error);
            showDownloadMessage('error', filename);
        }
    }

    // Show download message in terminal
    function showDownloadMessage(type, filename) {
        const commandDiv = document.createElement('div');
        commandDiv.className = 'command-enter mb-4';
        
        if (type === 'success') {
            commandDiv.innerHTML = `
                <div class="command-output">
                    <div class="text-green-400">system@portfolio:~$ download_status</div>
                    <div class="ml-4 p-3 bg-green-900 bg-opacity-30 rounded border-l-4 border-green-400">
                        <div class="flex items-center space-x-2 text-green-300">
                            <i class="fas fa-check-circle"></i>
                            <span class="font-bold">Download Started Successfully!</span>
                        </div>
                        <div class="text-green-200 text-sm mt-1">
                            📄 File: ${filename}
                        </div>
                        <div class="text-gray-300 text-xs mt-1">
                            Check your downloads folder for the CV file.
                        </div>
                    </div>
                </div>`;
        } else {
            commandDiv.innerHTML = `
                <div class="command-output">
                    <div class="text-red-400">system@portfolio:~$ download_error</div>
                    <div class="ml-4 p-3 bg-red-900 bg-opacity-30 rounded border-l-4 border-red-400">
                        <div class="flex items-center space-x-2 text-red-300">
                            <i class="fas fa-exclamation-triangle"></i>
                            <span class="font-bold">Download Failed!</span>
                        </div>
                        <div class="text-red-200 text-sm mt-1">
                            Could not download ${filename}. Please try again or contact me directly.
                        </div>
                    </div>
                </div>`;
        }
        
        commandOutput.appendChild(commandDiv);
        terminalContent.scrollTop = terminalContent.scrollHeight;
    }
    
    // Make functions globally available
    window.copyToClipboard = copyToClipboard;
    window.downloadCV = downloadCV;
    
    // Utility functions
    function updateSessionTime() {
        const elapsed = Math.floor((Date.now() - sessionStartTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        if (sessionTimeEl) {
            sessionTimeEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    }
    
    function updateCommandCount() {
        if (commandCountEl) {
            commandCountEl.textContent = commandCount;
        }
    }
    
    function getCommonPrefix(strings) {
        if (strings.length === 0) return '';
        let prefix = strings[0];
        for (let i = 1; i < strings.length; i++) {
            while (strings[i].indexOf(prefix) !== 0) {
                prefix = prefix.substring(0, prefix.length - 1);
                if (prefix === '') return '';
            }
        }
        return prefix;
    }
    
    function getSessionUptime() {
        const elapsed = Math.floor((Date.now() - sessionStartTime) / 1000);
        const hours = Math.floor(elapsed / 3600);
        const minutes = Math.floor((elapsed % 3600) / 60);
        const seconds = elapsed % 60;
        
        if (hours > 0) {
            return `${hours}h ${minutes}m ${seconds}s`;
        } else if (minutes > 0) {
            return `${minutes}m ${seconds}s`;
        } else {
            return `${seconds}s`;
        }
    }
    
    // Keep focus on input
    document.addEventListener('click', (e) => {
        if (!e.target.closest('a, button, input, textarea, select')) {
            try {
                if (commandInput && document.activeElement !== commandInput) {
                    commandInput.focus();
                }
            } catch (error) {
                console.log('Focus attempt blocked');
            }
        }
    });
    
    // Initial focus
    function setInitialFocus() {
        try {
            if (commandInput && document.readyState === 'complete') {
                if (!document.activeElement || 
                    document.activeElement === document.body || 
                    document.activeElement.tagName === 'HTML') {
                    commandInput.focus();
                }
            }
        } catch (error) {
            console.log('Initial focus blocked');
        }
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(setInitialFocus, 100);
        });
    } else {
        setTimeout(setInitialFocus, 100);
    }
    
    window.addEventListener('focus', () => {
        setTimeout(setInitialFocus, 50);
    });
    
    // Seleciona o botão fullscreen
    const fullscreenBtn = document.getElementById('fullscreen-btn');

    // Função para alternar fullscreen
    function toggleFullscreen() {
        const terminal = document.querySelector('.terminal');
        if (!document.fullscreenElement) {
            if (terminal.requestFullscreen) {
                terminal.requestFullscreen();
            } else if (terminal.webkitRequestFullscreen) {
                terminal.webkitRequestFullscreen();
            } else if (terminal.mozRequestFullScreen) {
                terminal.mozRequestFullScreen();
            } else if (terminal.msRequestFullscreen) {
                terminal.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    }

    // Adiciona o evento ao botão
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', toggleFullscreen);
    }
});
