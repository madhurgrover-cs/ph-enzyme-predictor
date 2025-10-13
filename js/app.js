// pH and Enzyme Activity Predictor - JavaScript Implementation
// ============================================================

// Enzyme data - same as Python implementation
const enzymes = {
    "Pepsin": {
        name: "Pepsin",
        optimalPh: 2.0,
        optimalRange: [1.5, 2.5],
        denatureRange: [1.0, 3.5],
        description: "Pepsin is a digestive enzyme found in the stomach that breaks down proteins into smaller peptides.",
        location: "Stomach",
        color: "#ff6b6b",
        function: "Protein digestion",
        details: [
            "Works in highly acidic conditions (pH 1.5-2.5)",
            "Secreted as inactive pepsinogen, activated by stomach acid",
            "Breaks proteins into smaller polypeptides",
            "Essential for protein digestion in humans"
        ]
    },
    "Amylase": {
        name: "Amylase",
        optimalPh: 7.0,
        optimalRange: [6.5, 7.5],
        denatureRange: [5.0, 9.0],
        description: "Amylase breaks down starch into simple sugars and is found in saliva and pancreatic juice.",
        location: "Saliva, Pancreas",
        color: "#4ecdc4",
        function: "Starch digestion",
        details: [
            "Works optimally at neutral pH (6.5-7.5)",
            "Found in both saliva and pancreatic juice",
            "Converts starch into maltose and glucose",
            "Begins carbohydrate digestion in the mouth"
        ]
    },
    "Trypsin": {
        name: "Trypsin",
        optimalPh: 8.0,
        optimalRange: [7.5, 8.5],
        denatureRange: [6.0, 10.0],
        description: "Trypsin is a pancreatic enzyme that cleaves proteins at specific amino acid sequences.",
        location: "Pancreas",
        color: "#45b7d1",
        function: "Protein cleavage",
        details: [
            "Works optimally in basic conditions (pH 7.5-8.5)",
            "Secreted by the pancreas into the small intestine",
            "Cleaves proteins at lysine and arginine residues",
            "Critical for protein digestion and absorption"
        ]
    }
};

// Global variables
let currentEnzyme = null;
let currentPh = 7.0;
let activityChart = null;

// DOM elements
const enzymeSelect = document.getElementById('enzyme-select');
const phSlider = document.getElementById('ph-slider');
const phInput = document.getElementById('ph-input');
const phDisplay = document.getElementById('ph-display');
const calculateBtn = document.getElementById('calculate-btn');
const resultsContainer = document.getElementById('results-container');
const activityMeter = document.getElementById('activity-meter');
const enzymeInfo = document.getElementById('enzyme-info');
const phPointer = document.getElementById('ph-pointer');
const enzymeRanges = document.getElementById('enzyme-ranges');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

// Mathematical functions for enzyme activity calculation
function calculateActivityPercentage(enzymeData, ph) {
    const optimalPh = enzymeData.optimalPh;
    const [optimalMin, optimalMax] = enzymeData.optimalRange;
    const [denatureMin, denatureMax] = enzymeData.denatureRange;
    
    // Check for denaturation
    if (ph < denatureMin || ph > denatureMax) {
        return 0.0;
    }
    
    // Check for optimal range
    if (ph >= optimalMin && ph <= optimalMax) {
        // Within optimal range, use bell curve for more realistic activity
        const distanceFromOptimal = Math.abs(ph - optimalPh);
        const maxDistance = Math.max(optimalMax - optimalPh, optimalPh - optimalMin);
        const activity = 100 * Math.exp(-2 * Math.pow(distanceFromOptimal / maxDistance, 2));
        return Math.max(95, activity); // Ensure minimum 95% in optimal range
    }
    
    // Outside optimal range but not denatured
    if (ph < optimalMin) {
        // Between denatureMin and optimalMin
        const distanceFromOptimal = optimalMin - ph;
        const maxDistance = optimalMin - denatureMin;
        const activity = 70 * Math.exp(-1.5 * Math.pow(distanceFromOptimal / maxDistance, 2));
        return Math.max(20, activity);
    } else {
        // Between optimalMax and denatureMax
        const distanceFromOptimal = ph - optimalMax;
        const maxDistance = denatureMax - optimalMax;
        const activity = 70 * Math.exp(-1.5 * Math.pow(distanceFromOptimal / maxDistance, 2));
        return Math.max(20, activity);
    }
}

function getActivityDescription(activityPercentage) {
    if (activityPercentage === 0) {
        return {
            description: "Enzyme is denatured! No activity (0%)",
            status: "denatured",
            emoji: "💀",
            details: "The enzyme has lost its structure and cannot function."
        };
    } else if (activityPercentage >= 95) {
        return {
            description: `Optimal activity (~${Math.round(activityPercentage)}%)`,
            status: "optimal",
            emoji: "🎯",
            details: "Perfect conditions! The enzyme is working at peak efficiency."
        };
    } else if (activityPercentage >= 70) {
        return {
            description: `High activity (${Math.round(activityPercentage)}%)`,
            status: "good",
            emoji: "✅",
            details: "Good conditions! The enzyme maintains high activity."
        };
    } else if (activityPercentage >= 40) {
        return {
            description: `Moderate activity (${Math.round(activityPercentage)}%)`,
            status: "moderate",
            emoji: "⚠️",
            details: "Suboptimal conditions. Consider adjusting pH for better activity."
        };
    } else if (activityPercentage >= 20) {
        return {
            description: `Reduced activity (${Math.round(activityPercentage)}%)`,
            status: "poor",
            emoji: "🚨",
            details: "Poor conditions. Enzyme activity is significantly reduced."
        };
    } else {
        return {
            description: `Very low activity (${Math.round(activityPercentage)}%)`,
            status: "poor",
            emoji: "🚨",
            details: "Critical conditions. Enzyme is barely functional."
        };
    }
}

// pH scale management
function updatePhPointer(ph) {
    const percentage = (ph / 14) * 100;
    phPointer.style.left = `${percentage}%`;
}

function createEnzymeRanges() {
    enzymeRanges.innerHTML = '';
    
    Object.values(enzymes).forEach(enzyme => {
        const [optimalMin, optimalMax] = enzyme.optimalRange;
        const [denatureMin, denatureMax] = enzyme.denatureRange;
        
        // Create optimal range indicator
        const optimalRange = document.createElement('div');
        optimalRange.className = `enzyme-range ${enzyme.name.toLowerCase()}`;
        optimalRange.style.left = `${(optimalMin / 14) * 100}%`;
        optimalRange.style.width = `${((optimalMax - optimalMin) / 14) * 100}%`;
        optimalRange.title = `${enzyme.name} optimal range: ${optimalMin} - ${optimalMax}`;
        
        enzymeRanges.appendChild(optimalRange);
    });
}

// Chart creation and management
function createActivityChart(enzymeData) {
    const ctx = document.getElementById('activity-chart').getContext('2d');
    
    // Generate data points for smooth curve
    const dataPoints = [];
    const labels = [];
    
    for (let ph = 0; ph <= 14; ph += 0.1) {
        labels.push(ph.toFixed(1));
        dataPoints.push(calculateActivityPercentage(enzymeData, ph));
    }
    
    // Destroy existing chart if it exists
    if (activityChart) {
        activityChart.destroy();
    }
    
    activityChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: `${enzymeData.name} Activity`,
                data: dataPoints,
                borderColor: enzymeData.color,
                backgroundColor: `${enzymeData.color}20`,
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 6,
                pointHoverBackgroundColor: enzymeData.color,
                pointHoverBorderColor: '#ffffff',
                pointHoverBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: `${enzymeData.name} Activity vs pH`,
                    color: '#ffffff',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                legend: {
                    labels: {
                        color: '#b4b4b8'
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'pH',
                        color: '#ffffff',
                        font: {
                            weight: 'bold'
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#b4b4b8',
                        callback: function(value, index) {
                            return index % 20 === 0 ? this.getLabelForValue(value) : '';
                        }
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Activity (%)',
                        color: '#ffffff',
                        font: {
                            weight: 'bold'
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#b4b4b8'
                    },
                    min: 0,
                    max: 100
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            },
            onHover: (event, activeElements) => {
                if (activeElements.length > 0) {
                    const index = activeElements[0].index;
                    const hoveredPh = parseFloat(labels[index]);
                    updatePhPointer(hoveredPh);
                }
            }
        }
    });
}

// UI update functions
function updateEnzymeInfo(enzymeName) {
    const enzymeDetails = document.querySelector('.enzyme-details');
    
    if (!enzymeName) {
        enzymeDetails.innerHTML = '<p class="select-message">Select an enzyme to see detailed information</p>';
        return;
    }
    
    const enzyme = enzymes[enzymeName];
    enzymeDetails.innerHTML = `
        <div class="enzyme-header" style="margin-bottom: 1.5rem;">
            <h4 style="color: ${enzyme.color}; font-size: 1.3rem; margin-bottom: 0.5rem;">${enzyme.name}</h4>
            <p style="margin-bottom: 1rem;">${enzyme.description}</p>
        </div>
        
        <div class="enzyme-properties">
            <div class="property-row" style="display: flex; justify-content: space-between; margin-bottom: 0.75rem; padding: 0.5rem 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                <span style="color: var(--text-secondary);">Location:</span>
                <span style="color: var(--accent-primary); font-weight: 600;">${enzyme.location}</span>
            </div>
            <div class="property-row" style="display: flex; justify-content: space-between; margin-bottom: 0.75rem; padding: 0.5rem 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                <span style="color: var(--text-secondary);">Optimal pH:</span>
                <span style="color: var(--accent-primary); font-weight: 600;">${enzyme.optimalPh}</span>
            </div>
            <div class="property-row" style="display: flex; justify-content: space-between; margin-bottom: 0.75rem; padding: 0.5rem 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                <span style="color: var(--text-secondary);">Optimal Range:</span>
                <span style="color: var(--accent-primary); font-weight: 600;">${enzyme.optimalRange[0]} - ${enzyme.optimalRange[1]}</span>
            </div>
            <div class="property-row" style="display: flex; justify-content: space-between; margin-bottom: 1.5rem; padding: 0.5rem 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                <span style="color: var(--text-secondary);">Function:</span>
                <span style="color: var(--accent-primary); font-weight: 600;">${enzyme.function}</span>
            </div>
        </div>
        
        <div class="enzyme-details-list">
            <h5 style="color: var(--text-primary); margin-bottom: 0.75rem;">Key Features:</h5>
            <ul style="margin: 0; padding-left: 1.5rem;">
                ${enzyme.details.map(detail => `<li style="margin-bottom: 0.5rem; color: var(--text-secondary);">${detail}</li>`).join('')}
            </ul>
        </div>
    `;
}

function updateActivityMeter(activity, activityInfo) {
    const meterFill = document.getElementById('meter-fill');
    const meterText = document.getElementById('meter-text');
    const activityStatus = document.getElementById('activity-status');
    
    // Update meter fill
    meterFill.style.width = `${activity}%`;
    meterText.textContent = `${Math.round(activity)}%`;
    
    // Update meter color based on activity level
    if (activity === 0) {
        meterFill.style.background = 'var(--gradient-danger)';
    } else if (activity >= 95) {
        meterFill.style.background = 'var(--gradient-accent)';
    } else if (activity >= 70) {
        meterFill.style.background = 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)';
    } else if (activity >= 40) {
        meterFill.style.background = 'linear-gradient(135deg, #ffd93d 0%, #ff8a00 100%)';
    } else {
        meterFill.style.background = 'var(--gradient-danger)';
    }
    
    // Update status
    activityStatus.textContent = `${activityInfo.emoji} ${activityInfo.details}`;
    activityStatus.className = `activity-status status-${activityInfo.status}`;
}

function updateResults(enzymeName, ph) {
    if (!enzymeName) {
        resultsContainer.innerHTML = `
            <div class="no-results">
                <i class="fas fa-flask"></i>
                <p>Select an enzyme and pH value to see activity prediction</p>
            </div>
        `;
        activityMeter.classList.add('hidden');
        return;
    }
    
    const enzyme = enzymes[enzymeName];
    const activity = calculateActivityPercentage(enzyme, ph);
    const activityInfo = getActivityDescription(activity);
    
    // Update results container
    resultsContainer.innerHTML = `
        <div class="result-summary">
            <div class="result-header" style="text-align: center; margin-bottom: 2rem;">
                <h3 style="color: ${enzyme.color}; font-size: 1.5rem; margin-bottom: 0.5rem;">${enzyme.name} at pH ${ph}</h3>
                <p style="color: var(--text-secondary);">Activity Prediction Results</p>
            </div>
            
            <div class="result-details" style="background: var(--bg-tertiary); padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem;">
                <div class="result-item" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <span style="color: var(--text-secondary);">Selected Enzyme:</span>
                    <span style="color: ${enzyme.color}; font-weight: 600;">${enzyme.name}</span>
                </div>
                <div class="result-item" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <span style="color: var(--text-secondary);">Input pH:</span>
                    <span style="color: var(--accent-primary); font-weight: 600;">${ph}</span>
                </div>
                <div class="result-item" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <span style="color: var(--text-secondary);">Activity Level:</span>
                    <span style="color: var(--accent-primary); font-weight: 600;">${Math.round(activity)}%</span>
                </div>
                <div class="result-item" style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: var(--text-secondary);">Status:</span>
                    <span style="color: var(--accent-primary); font-weight: 600;">${activityInfo.description}</span>
                </div>
            </div>
            
            <div class="result-explanation" style="text-align: center; padding: 1rem; background: rgba(${activity === 0 ? '255, 71, 87' : activity >= 70 ? '107, 207, 127' : '255, 217, 61'}, 0.1); border: 1px solid ${activity === 0 ? 'var(--accent-danger)' : activity >= 70 ? 'var(--accent-success)' : 'var(--accent-warning)'}; border-radius: 12px;">
                <div style="font-size: 2rem; margin-bottom: 0.5rem;">${activityInfo.emoji}</div>
                <p style="color: var(--text-primary); font-weight: 600; margin-bottom: 0.5rem;">${activityInfo.description}</p>
                <p style="color: var(--text-secondary); font-size: 0.9rem;">${activityInfo.details}</p>
            </div>
        </div>
    `;
    
    // Show and update activity meter
    activityMeter.classList.remove('hidden');
    updateActivityMeter(activity, activityInfo);
}

// Event handlers
function handleEnzymeSelection() {
    currentEnzyme = enzymeSelect.value;
    updateEnzymeInfo(currentEnzyme);
    
    if (currentEnzyme) {
        calculateBtn.disabled = false;
        createActivityChart(enzymes[currentEnzyme]);
        updateResults(currentEnzyme, currentPh);
    } else {
        calculateBtn.disabled = true;
        if (activityChart) {
            activityChart.destroy();
            activityChart = null;
        }
        updateResults(null, currentPh);
    }
}

function handlePhChange() {
    const newPh = parseFloat(this.value);
    if (newPh >= 0 && newPh <= 14) {
        currentPh = newPh;
        phDisplay.textContent = newPh.toFixed(1);
        phSlider.value = newPh;
        phInput.value = newPh;
        updatePhPointer(newPh);
        
        if (currentEnzyme) {
            updateResults(currentEnzyme, currentPh);
        }
    }
}

function handleCalculateButton() {
    if (currentEnzyme) {
        updateResults(currentEnzyme, currentPh);
        
        // Smooth scroll to results
        document.querySelector('.activity-chart-container').scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
        });
    }
}

function handleQuickTest(enzyme, ph) {
    enzymeSelect.value = enzyme;
    currentEnzyme = enzyme;
    currentPh = parseFloat(ph);
    
    phDisplay.textContent = ph;
    phSlider.value = ph;
    phInput.value = ph;
    
    updatePhPointer(currentPh);
    updateEnzymeInfo(currentEnzyme);
    calculateBtn.disabled = false;
    
    createActivityChart(enzymes[currentEnzyme]);
    updateResults(currentEnzyme, currentPh);
    
    // Add visual feedback
    const clickedButton = event.target;
    const originalText = clickedButton.textContent;
    clickedButton.textContent = 'Applied! ✓';
    clickedButton.style.background = 'var(--gradient-secondary)';
    
    setTimeout(() => {
        clickedButton.textContent = originalText;
        clickedButton.style.background = '';
    }, 1500);
}

function handleNavigation(targetSection) {
    // Update nav links
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.section === targetSection) {
            link.classList.add('active');
        }
    });
    
    // Update sections
    sections.forEach(section => {
        section.classList.remove('active');
        if (section.id === targetSection) {
            section.classList.add('active');
        }
    });
}

// Initialize the application
function initializeApp() {
    // Set up event listeners
    enzymeSelect.addEventListener('change', handleEnzymeSelection);
    phSlider.addEventListener('input', handlePhChange);
    phInput.addEventListener('input', handlePhChange);
    calculateBtn.addEventListener('click', handleCalculateButton);
    
    // Quick test buttons
    document.querySelectorAll('.quick-test-buttons .btn').forEach(button => {
        button.addEventListener('click', () => {
            const enzyme = button.dataset.enzyme;
            const ph = button.dataset.ph;
            handleQuickTest(enzyme, ph);
        });
    });
    
    // Navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            handleNavigation(link.dataset.section);
        });
    });
    
    // Initialize pH pointer and enzyme ranges
    updatePhPointer(currentPh);
    createEnzymeRanges();
    
    // Initialize enzyme info
    updateEnzymeInfo(null);
    
    // Set initial values
    phDisplay.textContent = currentPh.toFixed(1);
    calculateBtn.disabled = true;
    
    console.log('pH and Enzyme Activity Predictor initialized successfully!');
}

// Utility functions for animations and effects
function addLoadingAnimation(element) {
    element.style.opacity = '0.6';
    element.style.pointerEvents = 'none';
}

function removeLoadingAnimation(element) {
    element.style.opacity = '1';
    element.style.pointerEvents = 'auto';
}

function showTooltip(element, message, duration = 3000) {
    const tooltip = document.createElement('div');
    tooltip.textContent = message;
    tooltip.style.cssText = `
        position: absolute;
        background: var(--bg-card);
        color: var(--text-primary);
        padding: 0.5rem 1rem;
        border-radius: 8px;
        font-size: 0.875rem;
        z-index: 10000;
        box-shadow: var(--shadow-medium);
        border: 1px solid rgba(255, 255, 255, 0.1);
        transform: translateX(-50%);
        top: -40px;
        left: 50%;
    `;
    
    element.style.position = 'relative';
    element.appendChild(tooltip);
    
    setTimeout(() => {
        if (tooltip.parentNode) {
            tooltip.parentNode.removeChild(tooltip);
        }
    }, duration);
}

// Advanced features
function generateReport() {
    if (!currentEnzyme) return;
    
    const enzyme = enzymes[currentEnzyme];
    const activity = calculateActivityPercentage(enzyme, currentPh);
    const activityInfo = getActivityDescription(activity);
    
    const report = {
        enzyme: enzyme.name,
        ph: currentPh,
        activity: Math.round(activity),
        status: activityInfo.description,
        timestamp: new Date().toISOString(),
        recommendations: getRecommendations(enzyme, currentPh, activity)
    };
    
    return report;
}

function getRecommendations(enzyme, ph, activity) {
    const recommendations = [];
    const [optimalMin, optimalMax] = enzyme.optimalRange;
    const [denatureMin, denatureMax] = enzyme.denatureRange;
    
    if (activity === 0) {
        recommendations.push("Enzyme is denatured - consider using fresh enzyme solution");
        recommendations.push(`Adjust pH to within ${optimalMin}-${optimalMax} range`);
    } else if (activity < 70) {
        if (ph < optimalMin) {
            recommendations.push(`Increase pH towards optimal range (${optimalMin}-${optimalMax})`);
        } else if (ph > optimalMax) {
            recommendations.push(`Decrease pH towards optimal range (${optimalMin}-${optimalMax})`);
        }
        recommendations.push("Consider buffer systems to maintain stable pH");
    } else {
        recommendations.push("Current conditions are favorable for enzyme activity");
        recommendations.push("Monitor pH stability to maintain optimal performance");
    }
    
    return recommendations;
}

// Error handling
window.addEventListener('error', (event) => {
    console.error('Application error:', event.error);
    showTooltip(document.body, 'An error occurred. Please refresh the page.', 5000);
});

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initializeApp);

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        enzymes,
        calculateActivityPercentage,
        getActivityDescription,
        generateReport
    };

}
