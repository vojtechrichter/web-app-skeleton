import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["value", "change", "icon"]
    static values = { 
        startValue: Number,
        endValue: Number,
        duration: { type: Number, default: 1000 },
        prefix: { type: String, default: "" },
        suffix: { type: String, default: "" },
        decimals: { type: Number, default: 0 }
    }

    connect() {
        this.setupIntersectionObserver()
        this.addHoverEffects()
    }

    setupIntersectionObserver() {
        // Animate when the card comes into view
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateValue()
                    this.observer.unobserve(this.element)
                }
            })
        }, {
            threshold: 0.1
        })

        this.observer.observe(this.element)
    }

    addHoverEffects() {
        this.element.addEventListener('mouseenter', this.handleMouseEnter.bind(this))
        this.element.addEventListener('mouseleave', this.handleMouseLeave.bind(this))
    }

    handleMouseEnter() {
        this.element.style.transform = 'translateY(-2px)'
        this.element.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
        
        if (this.hasIconTarget) {
            this.iconTarget.style.transform = 'scale(1.1)'
        }
    }

    handleMouseLeave() {
        this.element.style.transform = 'translateY(0)'
        this.element.style.boxShadow = ''
        
        if (this.hasIconTarget) {
            this.iconTarget.style.transform = 'scale(1)'
        }
    }

    animateValue() {
        if (!this.hasValueTarget) return

        const start = this.startValueValue || 0
        const end = this.endValueValue || this.extractNumberFromText(this.valueTarget.textContent)
        const duration = this.durationValue
        const decimals = this.decimalsValue
        
        let startTime = null
        
        const updateValue = (currentTime) => {
            if (!startTime) startTime = currentTime
            
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            
            // Easing function for smooth animation
            const easeOutCubic = 1 - Math.pow(1 - progress, 3)
            
            const currentValue = start + (end - start) * easeOutCubic
            
            this.displayValue(currentValue, decimals)
            
            if (progress < 1) {
                requestAnimationFrame(updateValue)
            } else {
                this.displayValue(end, decimals)
                this.onAnimationComplete()
            }
        }
        
        requestAnimationFrame(updateValue)
    }

    displayValue(value, decimals) {
        let formattedValue = decimals > 0 ? value.toFixed(decimals) : Math.floor(value)
        
        // Add thousand separators for large numbers
        if (Math.abs(value) >= 1000) {
            formattedValue = parseFloat(formattedValue).toLocaleString()
        }
        
        this.valueTarget.textContent = this.prefixValue + formattedValue + this.suffixValue
    }

    extractNumberFromText(text) {
        const match = text.match(/[\d,.]+/)
        return match ? parseFloat(match[0].replace(/,/g, '')) : 0
    }

    onAnimationComplete() {
        // Add a subtle pulse effect when animation completes
        this.valueTarget.style.animation = 'pulse 0.3s ease-in-out'
        setTimeout(() => {
            this.valueTarget.style.animation = ''
        }, 300)
        
        // Trigger custom event
        this.dispatch('animationComplete', { 
            detail: { 
                value: this.endValueValue,
                element: this.element 
            } 
        })
    }

    // Public method to update the stat value with animation
    updateValue(newValue, animate = true) {
        const oldValue = this.extractNumberFromText(this.valueTarget.textContent)
        
        if (animate) {
            this.startValueValue = oldValue
            this.endValueValue = newValue
            this.animateValue()
        } else {
            this.displayValue(newValue, this.decimalsValue)
        }
        
        // Update change indicator if present
        this.updateChangeIndicator(oldValue, newValue)
    }

    updateChangeIndicator(oldValue, newValue) {
        if (!this.hasChangeTarget) return
        
        const change = newValue - oldValue
        const changePercent = oldValue !== 0 ? ((change / oldValue) * 100) : 0
        
        // Update change text
        const sign = change >= 0 ? '+' : ''
        this.changeTarget.textContent = `${sign}${changePercent.toFixed(1)}% from last period`
        
        // Update change classes
        this.changeTarget.classList.remove('stat-change-positive', 'stat-change-negative')
        if (change >= 0) {
            this.changeTarget.classList.add('stat-change-positive')
        } else {
            this.changeTarget.classList.add('stat-change-negative')
        }
    }

    // Action to refresh/reload the stat
    refresh() {
        this.element.style.opacity = '0.5'
        
        // Simulate API call
        setTimeout(() => {
            this.element.style.opacity = '1'
            this.animateValue()
        }, 500)
    }

    // Action for click interactions
    click() {
        // Add click animation
        this.element.style.transform = 'scale(0.98)'
        setTimeout(() => {
            this.element.style.transform = ''
        }, 150)
        
        // Trigger custom event for external handling
        this.dispatch('clicked', { 
            detail: { 
                value: this.extractNumberFromText(this.valueTarget.textContent),
                element: this.element 
            } 
        })
    }

    disconnect() {
        if (this.observer) {
            this.observer.disconnect()
        }
        
        this.element.removeEventListener('mouseenter', this.handleMouseEnter.bind(this))
        this.element.removeEventListener('mouseleave', this.handleMouseLeave.bind(this))
    }
} 