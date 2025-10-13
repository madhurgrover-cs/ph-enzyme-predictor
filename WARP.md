# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a pH and Enzyme Activity Predictor - an educational tool that simulates how pH levels affect enzyme activity. It demonstrates enzyme denaturation through both a web application and a Python command-line program. The project focuses on three digestive enzymes: Pepsin (stomach acid), Amylase (neutral pH), and Trypsin (basic pancreatic environment).

## Development Commands

### Running the Applications

**Web Application:**
```bash
# Open the web app directly in browser
start index.html
# Or use Python's built-in server for local development
python -m http.server 8000
```

**Python Program:**
```bash
# Run the interactive command-line tool
python enzyme_predictor.py
```

### Testing and Validation

**Manual Testing Web App:**
```bash
# Test with different browsers (Windows)
start chrome index.html
start firefox index.html
start msedge index.html
```

**Testing Python Script:**
```bash
# Test with specific enzyme/pH combinations
echo "1\n2.0\ny\n2\n7.0\ny\n3\n8.0\nquit" | python enzyme_predictor.py
```

**Code Validation:**
```bash
# Check Python syntax
python -m py_compile enzyme_predictor.py
# Validate HTML (if html-validator is installed)
html5validator index.html
```

### Development Workflow

**File Structure Verification:**
```bash
# List all project files
Get-ChildItem -Recurse -Name
# Verify web dependencies are accessible
curl -I "https://cdn.jsdelivr.net/npm/chart.js"
```

## Architecture Overview

### Dual Implementation Design
The project uses a **dual implementation pattern** - the same core enzyme activity calculation logic is implemented in both Python and JavaScript to provide consistent results across platforms.

### Core Algorithm Architecture
Both implementations share the same mathematical model:
- **Bell curve distribution** for optimal pH range (95-100% activity)
- **Exponential decay** for suboptimal ranges (20-70% activity) 
- **Hard cutoffs** for denaturation zones (0% activity)

### Web Application Architecture

**Frontend Stack:**
- Vanilla JavaScript ES6+ (no frameworks)
- Chart.js for data visualization
- CSS3 with custom properties for theming
- Font Awesome for iconography

**Key Components:**
- `app.js` - Main application logic and UI management
- `style.css` - Dark theme styling with CSS Grid/Flexbox
- `index.html` - Multi-section SPA structure

**Data Flow:**
```
User Input (pH/Enzyme) â†’ Calculation Engine â†’ Results Display â†’ Chart Update â†’ Activity Meter
```

**State Management Pattern:**
Global state variables (`currentEnzyme`, `currentPh`) with reactive updates through event handlers.

### Python Application Architecture

**Design Pattern:**
- Procedural programming with functional decomposition
- Error handling with try-catch blocks
- Interactive loop with user input validation

**Core Functions:**
- `calculate_activity_percentage()` - Mathematical enzyme activity model
- `get_activity_description()` - Activity level categorization
- `display_enzyme_info()` / `display_ph_scale()` - CLI visualization

### Enzyme Data Architecture

**Shared Data Structure:**
```javascript
enzymes = {
  "Pepsin": {
    optimalPh: 2.0,
    optimalRange: [1.5, 2.5],
    denatureRange: [1.0, 3.5],
    // ... additional properties
  }
}
```

This structure is consistent between Python (dictionary) and JavaScript (object) implementations.

## Important Implementation Details

### Mathematical Models
The activity calculation uses scientifically-based approaches:
- **Henderson-Hasselbalch principles** for pH effects
- **Protein denaturation theory** for activity loss
- **Real enzyme data** from biochemical literature

### Cross-Platform Consistency
Both Python and JavaScript implementations produce identical results for the same inputs. When modifying calculations, **always update both versions** to maintain consistency.

### Browser Compatibility
The web application uses modern JavaScript features (ES6+) and CSS Grid. Test compatibility when making changes to:
- Arrow functions and template literals
- CSS custom properties (variables)
- Chart.js integration

### Error Handling Patterns
- **Python**: Exception handling with user-friendly error messages
- **JavaScript**: Event validation and graceful degradation
- **Both**: Input sanitization and range validation (pH 0-14)

## Key Files and Their Roles

### Core Application Files
- `enzyme_predictor.py` - Complete standalone CLI application
- `js/app.js` - Web application logic, event handling, and calculations  
- `index.html` - Multi-section SPA with navigation and interactive elements
- `css/style.css` - Dark theme styling with animations and responsive design

### Data and Configuration
- Enzyme definitions are embedded directly in both Python and JavaScript files
- No external configuration files or databases
- All styling uses CSS custom properties for theme consistency

### Documentation
- `README.md` - Comprehensive user documentation with technical details
- No additional documentation or rules files present

## Development Guidelines

### Adding New Enzymes
1. Update enzyme data structure in **both** `enzyme_predictor.py` and `js/app.js`
2. Ensure optimal/denaturation ranges follow scientific literature
3. Add corresponding color scheme in JavaScript for web visualization
4. Update HTML select options in `index.html`

### Modifying Calculations
1. **Critical**: Update the calculation logic in both Python and JavaScript simultaneously
2. Test with known pH/enzyme combinations to verify consistency
3. Validate against expected biochemical behavior

### UI/UX Changes
1. Follow the existing dark theme design patterns
2. Maintain responsive design principles (mobile-first approach)
3. Preserve accessibility features (ARIA labels, keyboard navigation)
4. Test across different screen sizes and browsers

### Scientific Accuracy
- All enzyme data should be based on peer-reviewed sources
- pH ranges must reflect realistic biological conditions  
- Activity calculations should follow established biochemical principles
- Educational content should be scientifically accurate

## Testing Approach

### Manual Testing Scenarios
1. **Cross-platform consistency**: Same enzyme/pH inputs should give identical results
2. **Edge cases**: Test pH values at range boundaries (0, 14, denaturation limits)
3. **UI responsiveness**: Test on mobile devices and different browser sizes
4. **Educational accuracy**: Verify enzyme information against biochemical sources

### Browser Testing Priority
1. Chrome/Chromium (primary)
2. Firefox  
3. Edge
4. Safari (if available)

## Common Issues and Solutions

### Chart.js Loading Issues
If charts don't display, verify CDN accessibility and chart initialization timing.

### Python Path Issues  
Ensure Python 3.6+ is available. The script uses only standard library modules.

### CSS Animation Performance
If animations are sluggish, check for CSS animation conflicts or browser hardware acceleration.

### Mobile Responsiveness
Test touch interactions on sliders and ensure proper viewport scaling on mobile devices.