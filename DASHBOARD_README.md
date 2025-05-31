# Dashboard UI Kit Documentation

## Overview

This dashboard UI kit provides a comprehensive, modern, and responsive dashboard solution built with HTML, Tailwind CSS, and Stimulus.js. It features a clean design system, consistent components, and full mobile responsiveness.

## Features

- 🎨 **Modern Design**: Clean, professional interface inspired by the best dashboard designs
- 📱 **Fully Responsive**: Perfect functionality on desktop and mobile devices
- 🎯 **Consistent Design System**: Unified colors, typography, spacing, and components
- ⚡ **Interactive Components**: Animated statistics, hover effects, and smooth transitions
- 🔧 **Easily Customizable**: Colors and styles can be changed via configuration
- 🧩 **Component-Based**: Reusable components for consistent development
- ♿ **Accessible**: Built with accessibility best practices

## File Structure

```
├── app/Presentation/
│   ├── @dashboard_layout.latte          # Base dashboard layout
│   └── TemplateComponents/
│       ├── dashboard-home.latte         # Main dashboard page
│       └── data-table.latte            # Data table example
├── src/
│   ├── assets/styles/main.css          # Design system & components
│   └── scripts/
│       ├── index.js                    # Stimulus application setup
│       └── controllers/
│           ├── dashboard_controller.js  # Main dashboard controller
│           ├── menu_item_controller.js  # Menu navigation controller
│           └── stat_card_controller.js  # Statistics card controller
└── www/assets/
    ├── images/                         # Image assets
    └── icons/                          # Icon assets
```

## Design System

### Color Palette

The dashboard uses a carefully crafted color system that can be easily customized:

- **Primary**: Blue tones for main actions and highlights
- **Secondary**: Gray tones for text and subtle elements
- **Success**: Green tones for positive states
- **Warning**: Orange/yellow tones for caution states
- **Danger**: Red tones for error states

### Typography

- **Font Family**: Inter (with fallbacks)
- **Sizes**: Consistent scale from xs to 3xl
- **Weights**: Regular, medium, semibold, bold

### Spacing & Layout

- **Grid System**: Responsive grid with 1-4 columns
- **Spacing**: 8px base unit with consistent multipliers
- **Border Radius**: Consistent rounded corners
- **Shadows**: Subtle elevation system

## Components

### Layout Components

#### Dashboard Sidebar
```html
<aside class="dashboard-sidebar">
  <!-- Logo, navigation, user profile -->
</aside>
```

#### Main Content Area
```html
<main class="dashboard-main">
  <header class="dashboard-header">
    <!-- Page title, actions -->
  </header>
  <div class="dashboard-content">
    <!-- Page content -->
  </div>
</main>
```

### Navigation Components

#### Menu Items
```html
<a href="#" class="menu-item active" data-controller="menu-item">
  <svg class="menu-item-icon">...</svg>
  <span class="menu-item-text">Dashboard</span>
</a>
```

Features:
- Active state management
- Hover animations
- Mobile responsive (icon-only on mobile)

### Content Components

#### Stat Cards
```html
<div class="stat-card" data-controller="stat-card" 
     data-stat-card-prefix-value="$" 
     data-stat-card-end-value-value="12426">
  <div class="stat-icon stat-icon-primary">...</div>
  <div class="stat-value" data-stat-card-target="value">$12,426</div>
  <div class="stat-label">Total Revenue</div>
  <div class="stat-change stat-change-positive">+12% from last month</div>
</div>
```

Features:
- Animated counting
- Hover effects
- Customizable prefixes/suffixes
- Change indicators

#### Cards
```html
<div class="card card-md">
  <div class="card-header">
    <h3 class="card-title">Title</h3>
    <p class="card-subtitle">Subtitle</p>
  </div>
  <div class="card-body">
    <!-- Content -->
  </div>
  <div class="card-footer">
    <!-- Actions -->
  </div>
</div>
```

Sizes: `card-sm`, `card-md`, `card-lg`

#### Buttons
```html
<button class="btn btn-primary">Primary Action</button>
<button class="btn btn-secondary">Secondary Action</button>
```

Variants: `btn-primary`, `btn-secondary`, `btn-success`, `btn-warning`, `btn-danger`
Sizes: `btn-sm`, `btn-lg`

#### Badges
```html
<span class="badge badge-success">Active</span>
<span class="badge badge-warning">Pending</span>
```

#### Form Elements
```html
<input class="form-input" type="text" placeholder="Enter text...">
<select class="form-select">...</select>
<textarea class="form-textarea">...</textarea>
```

### Grid System

```html
<div class="dashboard-grid">
  <div class="dashboard-grid-item">1 column</div>
  <div class="dashboard-grid-item-2">2 columns</div>
  <div class="dashboard-grid-item-3">3 columns</div>
  <div class="dashboard-grid-item-4">4 columns</div>
</div>
```

## Stimulus Controllers

### Dashboard Controller

Main controller for dashboard functionality:

```javascript
// Refresh dashboard data
this.dispatch('refresh')

// Show notification
this.showNotification('Message', 'success')

// Toggle sidebar (mobile)
this.toggleSidebar()
```

### Menu Item Controller

Handles navigation menu interactions:

```javascript
// Set active menu item
this.setActive()

// Check if should be active based on URL
this.checkActiveState()
```

### Stat Card Controller

Manages statistic card animations:

```javascript
// Update value with animation
this.updateValue(newValue, animate = true)

// Refresh card data
this.refresh()
```

## Customization

### Changing Colors

Edit the CSS custom properties in `src/assets/styles/main.css`:

```css
@theme {
  --color-primary-500: #your-color;
  --color-primary-600: #your-darker-color;
  /* ... */
}
```

### Adding New Components

1. Add styles to `main.css` using the design system:

```css
.my-component {
  @apply bg-white rounded-lg border border-secondary-200 p-4;
}
```

2. Create Stimulus controller if needed:

```javascript
// src/scripts/controllers/my_component_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    // Initialize component
  }
}
```

3. Register the controller:

```javascript
// src/scripts/index.js
application.register('my-component', MyComponentController);
```

### Responsive Behavior

The dashboard automatically adapts to different screen sizes:

- **Desktop (lg+)**: Full sidebar with text and icons
- **Mobile (<lg)**: Compact sidebar with icons only
- **Cards**: Stack vertically on mobile
- **Tables**: Horizontal scroll on mobile

## Best Practices

### Accessibility

- Use semantic HTML elements
- Include proper ARIA attributes
- Ensure keyboard navigation works
- Maintain sufficient color contrast

### Performance

- Use CSS transforms for animations
- Implement intersection observer for animations
- Lazy load heavy components
- Optimize images and icons

### Maintainability

- Follow the established design system
- Use consistent naming conventions
- Document custom components
- Keep controllers focused and small

## Usage Examples

### Creating a New Dashboard Page

1. Create a new Latte template:

```latte
{layout '../@dashboard_layout.latte'}

{block pageTitle}My Page{/block}
{block pageSubtitle}Page description{/block}

{block headerActions}
<button class="btn btn-primary">Action</button>
{/block}

{block dashboardContent}
<div class="dashboard-grid">
  <!-- Your content -->
</div>
{/block}
```

### Adding Statistics

```latte
<div class="stat-card" data-controller="stat-card" 
     data-stat-card-end-value-value="1234">
  <div class="stat-icon stat-icon-primary">
    <!-- Your icon -->
  </div>
  <div class="stat-value" data-stat-card-target="value">1,234</div>
  <div class="stat-label">Your Metric</div>
</div>
```

### Creating Forms

```latte
<form class="space-y-4">
  <div class="form-group">
    <label class="form-label">Email</label>
    <input class="form-input" type="email" required>
  </div>
  <div class="form-group">
    <label class="form-label">Message</label>
    <textarea class="form-textarea" rows="4"></textarea>
  </div>
  <button class="btn btn-primary">Submit</button>
</form>
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

When adding new components:

1. Follow the existing design patterns
2. Use the established color and spacing system
3. Ensure mobile responsiveness
4. Add appropriate Stimulus controllers for interactivity
5. Update this documentation

## Troubleshooting

### Styles not applying
- Check if Tailwind CSS is properly compiled
- Verify custom classes are defined in `main.css`

### Animations not working
- Ensure Stimulus controllers are properly registered
- Check browser console for JavaScript errors

### Mobile layout issues
- Test responsive classes are applied correctly
- Verify viewport meta tag is present

## Support

For questions or issues with the dashboard kit, please refer to:
- Component documentation in this file
- Tailwind CSS documentation
- Stimulus.js documentation 