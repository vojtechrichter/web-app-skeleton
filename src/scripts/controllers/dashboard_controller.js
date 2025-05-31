import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["sidebar", "main", "card", "stat"]
    static classes = ["collapsed", "expanded"]

    connect() {
        this.initializeResponsive()
        this.animateOnLoad()
        this.setupKeyboardShortcuts()
        this.checkSavedMenuState()
    }

    initializeResponsive() {
        this.handleResize = this.handleResize.bind(this)
        window.addEventListener('resize', this.handleResize)
        this.handleResize() // Initial call
    }

    handleResize() {
        const isMobile = window.innerWidth < 1024 // lg breakpoint
        
        if (isMobile) {
            this.element.classList.add('mobile-view')
        } else {
            this.element.classList.remove('mobile-view')
        }

        // Update card layouts for mobile
        if (this.hasCardTargets) {
            this.cardTargets.forEach(card => {
                if (isMobile) {
                    card.classList.add('mobile-card')
                } else {
                    card.classList.remove('mobile-card')
                }
            })
        }
    }

    animateOnLoad() {
        // Animate cards in sequence
        if (this.hasCardTargets) {
            this.cardTargets.forEach((card, index) => {
                card.style.opacity = '0'
                card.style.transform = 'translateY(20px)'
                
                setTimeout(() => {
                    card.style.transition = 'all 0.3s ease-out'
                    card.style.opacity = '1'
                    card.style.transform = 'translateY(0)'
                }, index * 100)
            })
        }

        // Animate stats counting up
        if (this.hasStatTargets) {
            this.statTargets.forEach(stat => {
                this.animateCounter(stat)
            })
        }
    }

    animateCounter(element) {
        const target = element.textContent.replace(/[^0-9.-]+/g, '')
        const numericTarget = parseFloat(target)
        
        if (isNaN(numericTarget)) return

        const prefix = element.textContent.replace(/[0-9.-]+/g, '').substring(0, 1)
        const suffix = element.textContent.replace(/[0-9.-]+/g, '').substring(1)
        
        let current = 0
        const increment = numericTarget / 50
        const timer = setInterval(() => {
            current += increment
            if (current >= numericTarget) {
                current = numericTarget
                clearInterval(timer)
            }
            
            let displayValue = Math.floor(current).toLocaleString()
            if (numericTarget % 1 !== 0) {
                displayValue = current.toFixed(1)
            }
            
            element.textContent = prefix + displayValue + suffix
        }, 20)
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (event) => {
            // Cmd/Ctrl + K for search focus
            if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
                event.preventDefault()
                const searchInput = document.querySelector('input[placeholder="Search..."]')
                if (searchInput) {
                    searchInput.focus()
                }
            }

            // Escape to close any open dropdowns
            if (event.key === 'Escape') {
                const openDropdowns = document.querySelectorAll('[data-dropdown-target="menu"]:not(.hidden)')
                openDropdowns.forEach(dropdown => {
                    dropdown.classList.add('hidden')
                })
            }
        })
    }

    checkSavedMenuState() {
        const savedMenuItem = localStorage.getItem('activeMenuItem')
        if (savedMenuItem) {
            const menuItem = document.querySelector(`a[href="${savedMenuItem}"]`)
            if (menuItem && menuItem.closest('.menu-item')) {
                const menuItemElement = menuItem.closest('.menu-item')
                menuItemElement.classList.add('active')
            }
        }
    }

    // Action to refresh dashboard data
    refresh() {
        // Add loading state
        this.element.classList.add('loading')
        
        // Simulate API call
        setTimeout(() => {
            this.element.classList.remove('loading')
            
            // Re-animate stats
            if (this.hasStatTargets) {
                this.statTargets.forEach(stat => {
                    this.animateCounter(stat)
                })
            }
            
            // Show success notification
            this.showNotification('Dashboard refreshed successfully', 'success')
        }, 1000)
    }

    // Action to toggle sidebar (for future mobile toggle functionality)
    toggleSidebar() {
        if (this.hasSidebarTarget) {
            this.sidebarTarget.classList.toggle('collapsed')
            this.mainTarget.classList.toggle('expanded')
        }
    }

    // Utility method to show notifications
    showNotification(message, type = 'info') {
        const notification = document.createElement('div')
        notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 transition-all duration-300 transform translate-x-full`
        
        const typeClasses = {
            success: 'bg-success-100 text-success-800 border border-success-200',
            error: 'bg-danger-100 text-danger-800 border border-danger-200',
            warning: 'bg-warning-100 text-warning-800 border border-warning-200',
            info: 'bg-primary-100 text-primary-800 border border-primary-200'
        }
        
        notification.className += ` ${typeClasses[type] || typeClasses.info}`
        notification.innerHTML = `
            <div class="flex items-center space-x-2">
                <span>${message}</span>
                <button class="ml-2 text-current opacity-70 hover:opacity-100" onclick="this.parentElement.parentElement.remove()">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>
        `
        
        document.body.appendChild(notification)
        
        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full')
        }, 100)
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.classList.add('translate-x-full')
            setTimeout(() => {
                notification.remove()
            }, 300)
        }, 5000)
    }

    disconnect() {
        window.removeEventListener('resize', this.handleResize)
    }
} 