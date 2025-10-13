# pH and Enzyme Activity Predictor

![pH Enzyme Predictor](https://img.shields.io/badge/pH%20Enzyme-Predictor-blue)
![Version](https://img.shields.io/badge/version-1.0.0-green)
![License](https://img.shields.io/badge/license-MIT-blue)

A comprehensive educational tool for understanding how pH levels affect enzyme activity and demonstrate enzyme denaturation. This project includes both a web application and a standalone Python program.

## ðŸ§¬ Overview

The pH and Enzyme Activity Predictor simulates enzyme behavior under different pH conditions, focusing on three important digestive enzymes:

- **Pepsin** - Works in acidic stomach conditions (pH 1.5-2.5)
- **Amylase** - Functions optimally at neutral pH (pH 6.5-7.5) 
- **Trypsin** - Operates in basic pancreatic environment (pH 7.5-8.5)

## âœ¨ Features

### Web Application
- ðŸŽ¨ **Dark Theme Interface** - Modern, eye-friendly design
- ðŸ“Š **Interactive Charts** - Real-time activity visualization using Chart.js
- ðŸŽšï¸ **pH Slider Controls** - Intuitive input with instant feedback
- ðŸ“ **pH Scale Visualization** - Visual representation of optimal ranges
- ðŸ“± **Responsive Design** - Works on desktop, tablet, and mobile
- ðŸ§ª **Activity Meter** - Animated progress indicator
- ðŸ“š **Educational Content** - Detailed enzyme information and learning materials
- âš¡ **Quick Tests** - Pre-configured optimal conditions for each enzyme
- ðŸ”„ **Real-time Updates** - Instant calculation and visualization

### Python Program
- ðŸ’» **Command-line Interface** - Easy-to-use terminal application
- ðŸ§® **Mathematical Models** - Bell curve distribution for realistic activity prediction
- ðŸ“ˆ **Detailed Output** - Comprehensive activity analysis and recommendations
- ðŸ”„ **Interactive Loop** - Test multiple enzyme/pH combinations
- ðŸŽ¯ **Quick Selection** - Choose enzymes by name or number
- ðŸ“Š **Visual pH Scale** - ASCII art pH reference guide

## ðŸš€ Getting Started

### Web Application

1. **Clone or Download** the project files
2. **Open** `index.html` in your web browser
3. **Select** an enzyme from the dropdown menu
4. **Adjust** the pH value using the slider or input field
5. **View** the real-time activity prediction and charts

#### Or use the live version:
[ðŸŒ Open pH Enzyme Predictor](file:///C:/Users/DELL/ph-enzyme-predictor/index.html)

### Python Program

1. **Requirements**: Python 3.6 or higher
2. **Run** the program:
   ```bash
   python enzyme_predictor.py
   ```
3. **Follow** the interactive prompts to select enzymes and pH values

## ðŸ“– How to Use

### Web Interface

1. **Navigate** between sections using the top navigation:
   - **Predictor**: Main calculation tool
   - **Education**: Learn about enzymes and pH
   - **About**: Project information and technical details

2. **Using the Predictor**:
   - Select an enzyme from the dropdown
   - Use the pH slider or input field to set pH value
   - View results in real-time or click "Calculate Activity"
   - Explore the interactive activity chart
   - Try the "Quick Tests" for optimal conditions

3. **Understanding Results**:
   - **Activity Meter**: Visual percentage of enzyme function
   - **Status Indicators**: Color-coded activity levels
   - **pH Scale**: Shows your current pH and enzyme ranges
   - **Activity Chart**: Complete enzyme behavior curve

### Python Program

1. **Enzyme Selection**: Choose by name (Pepsin/Amylase/Trypsin) or number (1/2/3)
2. **pH Input**: Enter any value between 0.0 and 14.0
3. **Results**: Get detailed activity analysis and recommendations
4. **Repeat**: Test multiple combinations or type 'quit' to exit

## ðŸ§ª Enzyme Data

| Enzyme | Optimal pH | Optimal Range | Denaturation Range | Location |
|--------|------------|---------------|-------------------|----------|
| Pepsin | 2.0 | 1.5 - 2.5 | < 1.0 or > 3.5 | Stomach |
| Amylase | 7.0 | 6.5 - 7.5 | < 5.0 or > 9.0 | Saliva, Pancreas |
| Trypsin | 8.0 | 7.5 - 8.5 | < 6.0 or > 10.0 | Pancreas |

## ðŸ“Š Activity Calculation

The enzyme activity is calculated using mathematical models that simulate real enzyme behavior:

### Optimal Range (95-100% activity)
- Uses bell curve distribution around optimal pH
- Ensures minimum 95% activity within optimal range

### Suboptimal Range (20-70% activity)  
- Exponential decay function based on distance from optimal
- Minimum 20% activity before denaturation

### Denaturation (0% activity)
- Complete loss of function outside survivable pH range
- Irreversible structural damage to enzyme

## ðŸ› ï¸ Technical Details

### Web Technologies
- **HTML5** - Semantic structure and accessibility
- **CSS3** - Modern styling with CSS variables and animations
- **JavaScript (ES6+)** - Interactive functionality and calculations
- **Chart.js** - Data visualization and charting
- **Font Awesome** - Icons and visual elements
- **Google Fonts** - Typography (Inter font family)

### Python Features
- **Math Module** - Exponential calculations for activity curves
- **Error Handling** - Robust input validation and exception handling
- **Object-Oriented Design** - Clean, maintainable code structure
- **Cross-Platform** - Works on Windows, macOS, and Linux

## ðŸ“ Project Structure

```
ph-enzyme-predictor/
â”œâ”€â”€ index.html              # Main web application
â”œâ”€â”€ css/
â”‚   â””â”€â”€ style.css           # Dark theme styling
â”œâ”€â”€ js/
â”‚   â””â”€â”€ app.js              # Interactive functionality
â”œâ”€â”€ enzyme_predictor.py     # Python standalone program
â””â”€â”€ README.md              # This documentation
```

## ðŸŽ¯ Educational Applications

This tool is perfect for:

- **Biology Students** - Understanding enzyme kinetics and pH effects
- **Chemistry Classes** - Learning about protein structure and function
- **Medical Education** - Digestive enzyme behavior and conditions
- **Biochemistry Research** - Enzyme optimization and analysis
- **Science Teachers** - Interactive classroom demonstrations

## ðŸ§¬ Enzyme Details

### Pepsin
- **Function**: Protein digestion in stomach
- **Structure**: Acid-stable protease
- **Clinical Relevance**: Peptic ulcers, acid reflux
- **Key Features**: 
  - Secreted as inactive pepsinogen
  - Activated by stomach acid (HCl)
  - Breaks proteins into polypeptides

### Amylase  
- **Function**: Starch breakdown to sugars
- **Structure**: Glycoside hydrolase enzyme
- **Clinical Relevance**: Pancreatic function, diabetes
- **Key Features**:
  - Found in saliva and pancreas
  - Begins digestion in mouth
  - Critical for carbohydrate metabolism

### Trypsin
- **Function**: Protein cleavage at specific sites
- **Structure**: Serine protease enzyme  
- **Clinical Relevance**: Pancreatic insufficiency
- **Key Features**:
  - Secreted by pancreas
  - Works in small intestine
  - Specific for lysine/arginine residues

## ðŸŽ¨ Design Features

### Dark Theme
- Eye-friendly dark background (#0a0a0b)
- High contrast text for readability
- Gradient accents for visual appeal
- Smooth animations and transitions

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Touch-friendly controls
- Adaptive typography

### Accessibility
- ARIA labels for screen readers
- Keyboard navigation support
- High contrast color schemes
- Semantic HTML structure

## ðŸ”¬ Scientific Accuracy

The calculations are based on established biochemical principles:

- **Henderson-Hasselbalch Equation** principles for pH effects
- **Michaelis-Menten Kinetics** concepts for enzyme behavior
- **Protein Denaturation Theory** for activity loss modeling
- **Real Enzyme Data** from scientific literature

## ðŸš€ Future Enhancements

Potential improvements for future versions:

- **Temperature Effects** - Add temperature variable to calculations
- **Inhibitor Simulation** - Model competitive/non-competitive inhibition  
- **Multiple Enzymes** - Compare multiple enzymes simultaneously
- **Data Export** - Save results as CSV or PDF reports
- **Custom Enzymes** - Allow users to define custom enzyme parameters
- **3D Visualizations** - Interactive molecular structure viewer
- **Laboratory Integration** - Connect with real lab equipment

## ðŸ¤ Contributing

Contributions are welcome! Please feel free to:

- Report bugs or issues
- Suggest new features
- Submit pull requests
- Improve documentation
- Add more enzyme data

## ðŸ“„ License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ðŸ‘¨â€ðŸ’» Author

Created with â¤ï¸ for scientific education and learning.

## ðŸ™ Acknowledgments

- **Chart.js** - For excellent charting capabilities
- **Font Awesome** - For beautiful icons
- **Google Fonts** - For typography
- **Scientific Community** - For enzyme research and data
- **Educational Institutions** - For inspiration and feedback

---

## ðŸ”— Quick Links

- [ðŸŒ Web Application](file:///C:/Users/DELL/ph-enzyme-predictor/index.html)
- [ðŸ Python Script](enzyme_predictor.py)
- [ðŸ“š Educational Resources](#educational-applications)
- [ðŸ”¬ Technical Documentation](#technical-details)

---

*Made for students, researchers, and anyone curious about enzyme biochemistry! ðŸ§¬*