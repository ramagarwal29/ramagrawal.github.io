# Black-Scholes Option Pricing Calculator

A professional web-based calculator for estimating option values using the Black-Scholes model. Perfect for ESOP valuations and financial analysis.

## Features

- **Complete Black-Scholes Implementation**: Accurate mathematical model for European-style options
- **Professional Interface**: Clean, modern design with intuitive input forms
- **Real-time Validation**: Form validation with helpful error messages
- **Interactive Tooltips**: Explanations for each parameter
- **Quick Examples**: Pre-loaded scenarios for different option types
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Value Breakdown**: Shows intrinsic value, time value, and market assessment

## What's Included

- `index.html` - Main HTML file with complete calculator interface
- `styles.css` - Custom CSS styles and animations
- `script.js` - Complete JavaScript implementation with Black-Scholes algorithm
- `package.json` - Package configuration for local development
- `README.md` - This documentation file

## Quick Start

### Option 1: Direct Browser Usage
1. Download all files to a folder
2. Open `index.html` in any modern web browser
3. Start calculating option values immediately

### Option 2: Local Server (Recommended)
1. Download all files to a folder
2. Install Node.js if you haven't already
3. Open terminal/command prompt in the folder
4. Run: `npm install -g live-server`
5. Run: `npm start`
6. Browser will open automatically at `http://localhost:3000`

### Option 3: Python Server
1. Download all files to a folder
2. Open terminal/command prompt in the folder
3. Run: `python -m http.server 8000`
4. Open browser to `http://localhost:8000`

## How to Use

### Basic Calculation
1. **Current Share Price (S)**: Enter the current market price of the stock
2. **Exercise Price (K)**: Enter the strike price of the option
3. **Time to Maturity (T)**: Enter time until expiration in years (e.g., 0.25 for 3 months)
4. **Risk-free Rate (r)**: Enter the annual risk-free interest rate as a percentage
5. **Volatility (σ)**: Enter the annual volatility as a percentage
6. **Option Type**: Select either Call or Put option
7. Click "Calculate Option Value" to see results

### Quick Examples
Use the pre-loaded examples in the right panel:
- **Tech Stock Call**: High-growth stock with moderate volatility
- **Conservative Put**: Lower-risk scenario with defensive positioning
- **High Volatility Call**: Startup or growth stock with high uncertainty

### Keyboard Shortcuts
- **Ctrl/Cmd + Enter**: Calculate option value
- **Ctrl/Cmd + R**: Reset form (prevents browser refresh)

## Understanding the Results

### Option Value
The main result showing the theoretical fair value of the option according to the Black-Scholes model.

### Value Breakdown
- **Intrinsic Value**: The immediate exercise value of the option
- **Time Value**: The additional value due to time remaining until expiration
- **Moneyness (S/K)**: Ratio of stock price to strike price

### Market Assessment
Contextual information about whether the option is:
- **In-the-money**: Has intrinsic value
- **At-the-money**: Strike price near current price
- **Out-of-the-money**: No intrinsic value, only time value

## Black-Scholes Model Assumptions

The calculator uses the standard Black-Scholes model which assumes:
- European-style exercise (can only be exercised at expiration)
- Constant volatility and risk-free rate
- No dividends during the option's life
- Efficient markets with no transaction costs
- Log-normal distribution of stock prices

## Technical Details

### Mathematical Implementation
- Custom implementation of the error function (erf)
- Normal cumulative distribution function (CDF)
- Complete Black-Scholes formula for both calls and puts
- Input validation and error handling

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive design
- No external dependencies except Tailwind CSS CDN

### File Structure
```
black-scholes-calculator/
├── index.html          # Main application
├── styles.css          # Custom styling
├── script.js           # JavaScript logic
├── package.json        # Project configuration
└── README.md          # Documentation
```

## Customization

### Styling
Edit `styles.css` to customize:
- Color scheme
- Fonts and typography
- Animations and transitions
- Responsive breakpoints

### Functionality
Edit `script.js` to modify:
- Calculation parameters
- Validation rules
- Additional financial metrics
- Example scenarios

### Layout
Edit `index.html` to change:
- Form structure
- Information panels
- Header and footer content

## Troubleshooting

### Common Issues
1. **Calculator not working**: Ensure JavaScript is enabled in your browser
2. **Styling issues**: Check that `styles.css` is in the same folder as `index.html`
3. **Form validation errors**: All fields must be filled with positive numbers (except risk-free rate which can be zero or positive)

### Error Messages
- "All parameters must be positive": Check that stock price, strike price, time, and volatility are all greater than zero
- "Risk-free rate cannot be negative": Risk-free rate must be zero or positive
- "This field is required": All input fields must be completed

## License

MIT License - Feel free to use and modify for your projects.

## Support

For questions or issues:
1. Check this README file
2. Verify all files are in the same directory
3. Ensure you're using a modern web browser
4. Check browser console for any error messages

## Mathematical References

The Black-Scholes formula implemented:

**Call Option**: C = S₀N(d₁) - Ke^(-rT)N(d₂)

**Put Option**: P = Ke^(-rT)N(-d₂) - S₀N(-d₁)

Where:
- d₁ = [ln(S₀/K) + (r + σ²/2)T] / (σ√T)
- d₂ = d₁ - σ√T
- N(x) = cumulative standard normal distribution

## Version History

- **v1.0.0**: Initial release with complete Black-Scholes implementation
  - Professional interface design
  - Form validation and error handling
  - Interactive tooltips and examples
  - Mobile responsive layout
  - Comprehensive value breakdown
