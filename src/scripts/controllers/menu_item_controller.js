import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["item"]
    static classes = ["active"]

    connect() {
        this.element.addEventListener('click', this.handleClick.bind(this))
        this.element.addEventListener('mouseenter', this.handleMouseEnter.bind(this))
        this.element.addEventListener('mouseleave', this.handleMouseLeave.bind(this))
    }

    disconnect() {
        this.element.removeEventListener('click', this.handleClick.bind(this))
        this.element.removeEventListener('mouseenter', this.handleMouseEnter.bind(this))
        this.element.removeEventListener('mouseleave', this.handleMouseLeave.bind(this))
    }

    handleClick(event) {
        // Remove active class from all menu items
        const allMenuItems = document.querySelectorAll('.menu-item')
        allMenuItems.forEach(item => {
            item.classList.remove('active')
        })

        // Add active class to clicked item
        this.element.classList.add('active')

        // Store active menu item in localStorage for persistence
        const href = this.element.getAttribute('href')
        if (href && href !== '#') {
            localStorage.setItem('activeMenuItem', href)
        }

        // Add animation class
        this.element.classList.add('fade-in')
        setTimeout(() => {
            this.element.classList.remove('fade-in')
        }, 300)
    }

    handleMouseEnter(event) {
        if (!this.element.classList.contains('active')) {
            this.element.style.transform = 'translateX(4px)'
        }
    }

    handleMouseLeave(event) {
        if (!this.element.classList.contains('active')) {
            this.element.style.transform = 'translateX(0)'
        }
    }

    // Method to programmatically set active state
    setActive() {
        const allMenuItems = document.querySelectorAll('.menu-item')
        allMenuItems.forEach(item => {
            item.classList.remove('active')
        })
        this.element.classList.add('active')
    }

    // Method to check if this menu item should be active based on current URL
    checkActiveState() {
        const currentPath = window.location.pathname
        const href = this.element.getAttribute('href')
        
        if (href && currentPath.includes(href) && href !== '#') {
            this.setActive()
        }
    }
} 