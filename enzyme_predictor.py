#!/usr/bin/env python3
"""
pH and Enzyme Activity Predictor
================================

This program simulates how changes in pH affect enzyme activity and demonstrates enzyme denaturation.
It includes three enzymes: Pepsin, Amylase, and Trypsin, each with their own optimal pH ranges.

Author: AI Assistant
Date: 2025-10-13
"""

import math

# Define enzyme profiles
enzymes = {
    "Pepsin": {
        "name": "Pepsin",
        "optimal_ph": 2.0,
        "optimal_range": (1.5, 2.5),
        "denature_range": (1.0, 3.5),
        "description": "Pepsin is a digestive enzyme found in the stomach that breaks down proteins.",
        "location": "Stomach"
    },
    "Amylase": {
        "name": "Amylase",
        "optimal_ph": 7.0,
        "optimal_range": (6.5, 7.5),
        "denature_range": (5.0, 9.0),
        "description": "Amylase breaks down starch into sugars and is found in saliva and pancreas.",
        "location": "Saliva, Pancreas"
    },
    "Trypsin": {
        "name": "Trypsin",
        "optimal_ph": 8.0,
        "optimal_range": (7.5, 8.5),
        "denature_range": (6.0, 10.0),
        "description": "Trypsin is a pancreatic enzyme that cleaves proteins at specific amino acid sequences.",
        "location": "Pancreas"
    }
}

def calculate_activity_percentage(enzyme_data, ph):
    """
    Calculate the exact activity percentage based on pH and enzyme properties.
    
    Args:
        enzyme_data (dict): Dictionary containing enzyme properties
        ph (float): pH value to test
    
    Returns:
        float: Activity percentage (0-100)
    """
    optimal_ph = enzyme_data["optimal_ph"]
    optimal_min, optimal_max = enzyme_data["optimal_range"]
    denature_min, denature_max = enzyme_data["denature_range"]
    
    # Check for denaturation
    if ph < denature_min or ph > denature_max:
        return 0.0
    
    # Check for optimal range
    if optimal_min <= ph <= optimal_max:
        # Within optimal range, use bell curve for more realistic activity
        distance_from_optimal = abs(ph - optimal_ph)
        max_distance = max(optimal_max - optimal_ph, optimal_ph - optimal_min)
        activity = 100 * math.exp(-2 * (distance_from_optimal / max_distance) ** 2)
        return max(95, activity)  # Ensure minimum 95% in optimal range
    
    # Outside optimal range but not denatured
    if ph < optimal_min:
        # Between denature_min and optimal_min
        distance_from_optimal = optimal_min - ph
        max_distance = optimal_min - denature_min
        activity = 70 * math.exp(-1.5 * (distance_from_optimal / max_distance) ** 2)
        return max(20, activity)
    else:
        # Between optimal_max and denature_max
        distance_from_optimal = ph - optimal_max
        max_distance = denature_max - optimal_max
        activity = 70 * math.exp(-1.5 * (distance_from_optimal / max_distance) ** 2)
        return max(20, activity)

def get_activity_description(activity_percentage):
    """
    Get descriptive text for activity level.
    
    Args:
        activity_percentage (float): Activity percentage (0-100)
    
    Returns:
        str: Description of activity level
    """
    if activity_percentage == 0:
        return "Enzyme is denatured! No activity (0%)"
    elif activity_percentage >= 95:
        return f"Optimal activity (~{activity_percentage:.0f}%)"
    elif activity_percentage >= 70:
        return f"High activity ({activity_percentage:.0f}%)"
    elif activity_percentage >= 40:
        return f"Moderate activity ({activity_percentage:.0f}%)"
    elif activity_percentage >= 20:
        return f"Reduced activity ({activity_percentage:.0f}%)"
    else:
        return f"Very low activity ({activity_percentage:.0f}%)"

def display_enzyme_info(enzyme_name):
    """Display detailed information about the selected enzyme."""
    enzyme = enzymes[enzyme_name]
    print(f"\n{'='*50}")
    print(f"ENZYME INFORMATION: {enzyme['name'].upper()}")
    print(f"{'='*50}")
    print(f"Description: {enzyme['description']}")
    print(f"Location: {enzyme['location']}")
    print(f"Optimal pH: {enzyme['optimal_ph']}")
    print(f"Optimal Range: {enzyme['optimal_range'][0]} - {enzyme['optimal_range'][1]}")
    print(f"Denaturation Range: pH < {enzyme['denature_range'][0]} or pH > {enzyme['denature_range'][1]}")
    print(f"{'='*50}")

def display_ph_scale():
    """Display a visual pH scale."""
    print("\n" + "="*60)
    print("pH SCALE REFERENCE")
    print("="*60)
    print("0  1  2  3  4  5  6  7  8  9  10 11 12 13 14")
    print("â”£â”â”â”£â”â”â”£â”â”â”£â”â”â”£â”â”â”£â”â”â”£â”â”â”£â”â”â”£â”â”â”£â”â”â”£â”â”â”â”£â”â”â”£â”â”â”£â”â”â”«")
    print("â”‚     ACIDIC      â”‚NEUTRALâ”‚      BASIC      â”‚")
    print("â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜")
    print("              Battery Acid  Pure Water   Bleach")
    print("                 Stomach    Blood       Soap")
    print("="*60)

def main():
    """Main program function."""
    print("ðŸ§¬ pH AND ENZYME ACTIVITY PREDICTOR ðŸ§¬")
    print("="*50)
    print("This program predicts enzyme activity based on pH levels.")
    print("Available enzymes: Pepsin, Amylase, Trypsin")
    print("="*50)
    
    # Display pH scale
    display_ph_scale()
    
    while True:
        try:
            # Get enzyme selection
            print("\nAvailable enzymes:")
            for i, enzyme_name in enumerate(enzymes.keys(), 1):
                print(f"{i}. {enzyme_name}")
            
            print("\nChoose an enzyme:")
            print("Enter enzyme name (Pepsin/Amylase/Trypsin) or number (1/2/3)")
            print("Type 'quit' to exit")
            
            user_input = input("Your choice: ").strip()
            
            if user_input.lower() == 'quit':
                print("Thank you for using the pH and Enzyme Activity Predictor!")
                break
            
            # Handle numeric input
            if user_input.isdigit():
                enzyme_list = list(enzymes.keys())
                if 1 <= int(user_input) <= len(enzyme_list):
                    selected_enzyme = enzyme_list[int(user_input) - 1]
                else:
                    print("âŒ Invalid number. Please choose 1, 2, or 3.")
                    continue
            else:
                # Handle text input
                selected_enzyme = user_input.title()
                if selected_enzyme not in enzymes:
                    print(f"âŒ Invalid enzyme. Please choose from: {', '.join(enzymes.keys())}")
                    continue
            
            # Display enzyme information
            display_enzyme_info(selected_enzyme)
            
            # Get pH input
            ph_input = input(f"\nEnter pH value (0.0 - 14.0): ").strip()
            ph_value = float(ph_input)
            
            # Validate pH range
            if not (0.0 <= ph_value <= 14.0):
                print("âŒ Invalid pH value. pH must be between 0.0 and 14.0.")
                continue
            
            # Calculate activity
            enzyme_data = enzymes[selected_enzyme]
            activity_percentage = calculate_activity_percentage(enzyme_data, ph_value)
            activity_description = get_activity_description(activity_percentage)
            
            # Display results
            print(f"\n{'='*50}")
            print("ðŸ”¬ ENZYME ACTIVITY PREDICTION RESULTS")
            print(f"{'='*50}")
            print(f"Enzyme: {selected_enzyme}")
            print(f"Input pH: {ph_value}")
            print(f"Predicted Activity: {activity_description}")
            
            # Additional analysis
            if activity_percentage == 0:
                print(f"ðŸ’€ The enzyme has been denatured at pH {ph_value}!")
                print("   The protein structure has been irreversibly altered.")
            elif activity_percentage >= 95:
                print(f"ðŸŽ¯ Perfect conditions! The enzyme is working at peak efficiency.")
            elif activity_percentage >= 70:
                print(f"âœ… Good conditions! The enzyme maintains high activity.")
            elif activity_percentage >= 40:
                print(f"âš ï¸  Suboptimal conditions. Consider adjusting pH.")
            else:
                print(f"ðŸš¨ Poor conditions. Enzyme activity is significantly reduced.")
            
            print(f"{'='*50}")
            
            # Ask if user wants to continue
            continue_choice = input("\nWould you like to test another enzyme/pH combination? (y/n): ").strip().lower()
            if continue_choice not in ['y', 'yes']:
                print("Thank you for using the pH and Enzyme Activity Predictor!")
                break
                
        except ValueError:
            print("âŒ Invalid input. Please enter a valid number for pH.")
        except KeyboardInterrupt:
            print("\n\nProgram interrupted. Goodbye!")
            break
        except Exception as e:
            print(f"âŒ An error occurred: {e}")

if __name__ == "__main__":
    main()