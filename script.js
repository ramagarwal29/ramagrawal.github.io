// Black-Scholes Option Pricing Calculator
// Complete JavaScript implementation

// Black-Scholes Mathematical Implementation
function normalCDF(x) {
    return (1.0 + erf(x / Math.sqrt(2.0))) / 2.0;
}

function erf(x) {
    const a1 = 0.254829592;
    const a2 = -0.284496736;
    const a3 = 1.421413741;
    const a4 = -1.453152027;
    const a5 = 1.061405429;
    const p = 0.3275911;

    const sign = x < 0 ? -1 : 1;
    x = Math.abs(x);

    const t = 1.0 / (1.0 + p * x);
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

    return sign * y;
}

function blackScholes(S, K, T, r, sigma, optionType) {
    if (S <= 0 || K <= 0 || T <= 0 || sigma <= 0) {
        throw new Error('All parameters must be positive');
    }

    const d1 = (Math.log(S / K) + (r + 0.5 * sigma * sigma) * T) / (sigma * Math.sqrt(T));
    const d2 = d1 - sigma * Math.sqrt(T);

    let price;
    
    if (optionType === 'call') {
        price = S * normalCDF(d1) - K * Math.exp(-r * T) * normalCDF(d2);
    } else if (optionType === 'put') {
        price = K * Math.exp(-r * T) * normalCDF(-d2) - S * normalCDF(-d1);
    } else {
        throw new Error("Invalid option type. Use 'call' or 'put'.");
    }

    return Math.max(0, price);
}

// Form validation
function validateForm() {
    let isValid = true;
    const fields = ['currentPrice', 'exercisePrice', 'timeToMaturity', 'riskFreeRate', 'volatility'];
    
    fields.forEach(field => {
        const input = document.getElementById(field);
        const errorDiv = document.getElementById(field + '-error');
        const value = parseFloat(input.value);
        
        // Clear previous errors
        input.classList.remove('error-border');
        errorDiv.classList.add('hidden');
        
        if (!input.value || isNaN(value)) {
            showFieldError(field, 'This field is required');
            isValid = false;
        } else if (value <= 0 && field !== 'riskFreeRate') {
            showFieldError(field, 'Value must be greater than 0');
            isValid = false;
        } else if (field === 'riskFreeRate' && value < 0) {
            showFieldError(field, 'Risk-free rate cannot be negative');
            isValid = false;
        }
    });
    
    return isValid;
}

function showFieldError(fieldId, message) {
    const input = document.getElementById(fieldId);
    const errorDiv = document.getElementById(fieldId + '-error');
    
    input.classList.add('error-border');
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
}

// Toast notifications
function showToast(title, description, type = 'success') {
    const toast = document.getElementById('toast');
    const toastIcon = document.getElementById('toast-icon');
    const toastTitle = document.getElementById('toast-title');
    const toastDescription = document.getElementById('toast-description');
    
    // Set icon based on type
    if (type === 'success') {
        toastIcon.innerHTML = '<svg class="text-green-500 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>';
    } else {
        toastIcon.innerHTML = '<svg class="text-red-500 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>';
    }
    
    toastTitle.textContent = title;
    toastDescription.textContent = description;
    
    // Show toast
    toast.classList.remove('hidden', 'translate-x-full');
    toast.classList.add('translate-x-0');
    
    // Hide after 5 seconds
    setTimeout(() => {
        toast.classList.add('translate-x-full');
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 300);
    }, 5000);
}

// Form handling
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('calculator-form');
    const calculateBtn = document.getElementById('calculateBtn');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (!validateForm()) {
            showToast('Validation Error', 'Please fix the errors in the form before calculating.', 'error');
            return;
        }
        
        // Get form values
        const currentPrice = parseFloat(document.getElementById('currentPrice').value);
        const exercisePrice = parseFloat(document.getElementById('exercisePrice').value);
        const timeToMaturity = parseFloat(document.getElementById('timeToMaturity').value);
        const riskFreeRate = parseFloat(document.getElementById('riskFreeRate').value);
        const volatility = parseFloat(document.getElementById('volatility').value);
        const optionType = document.querySelector('input[name="optionType"]:checked').value;
        
        // Show loading state
        const originalText = calculateBtn.innerHTML;
        calculateBtn.innerHTML = '<div class="loading-spinner"></div>Calculating...';
        calculateBtn.disabled = true;
        
        try {
            // Simulate calculation delay for better UX
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const optionValue = blackScholes(
                currentPrice,
                exercisePrice,
                timeToMaturity,
                riskFreeRate / 100, // Convert percentage to decimal
                volatility / 100,   // Convert percentage to decimal
                optionType
            );

            displayResults(optionValue, optionType, {
                currentPrice,
                exercisePrice,
                timeToMaturity,
                riskFreeRate,
                volatility,
                optionType
            });
            
            showToast(
                'Calculation Complete',
                `${optionType.charAt(0).toUpperCase() + optionType.slice(1)} option value: $${optionValue.toFixed(2)}`
            );
            
        } catch (error) {
            console.error('Calculation error:', error);
            showToast('Calculation Error', error.message, 'error');
        } finally {
            // Reset button
            calculateBtn.innerHTML = originalText;
            calculateBtn.disabled = false;
        }
    });
});

function displayResults(optionValue, optionType, inputs) {
    const resultsContent = document.getElementById('results-content');
    
    // Calculate additional metrics
    const intrinsicValue = optionType === 'call' 
        ? Math.max(0, inputs.currentPrice - inputs.exercisePrice)
        : Math.max(0, inputs.exercisePrice - inputs.currentPrice);
    
    const timeValue = optionValue - intrinsicValue;
    const moneyness = inputs.currentPrice / inputs.exercisePrice;
    
    resultsContent.innerHTML = `
        <div class="fade-in-up">
            <div class="text-center p-6">
                <div class="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg class="text-success-green w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>
                <h4 class="text-sm font-medium text-gray-700 mb-2">Estimated Option Value</h4>
                <div class="text-3xl font-bold text-gray-900 mb-1">$${optionValue.toFixed(2)}</div>
                <div class="text-sm text-secondary-slate mb-6">
                    ${optionType.charAt(0).toUpperCase() + optionType.slice(1)} Option
                </div>
                
                <!-- Value Breakdown -->
                <div class="bg-gray-50 rounded-lg p-4 mb-4">
                    <h5 class="font-medium text-gray-700 mb-3 text-sm">Value Breakdown</h5>
                    <div class="space-y-2 text-sm">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Intrinsic Value:</span>
                            <span class="font-medium">$${intrinsicValue.toFixed(2)}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Time Value:</span>
                            <span class="font-medium">$${timeValue.toFixed(2)}</span>
                        </div>
                        <div class="flex justify-between border-t pt-2">
                            <span class="text-gray-600">Moneyness (S/K):</span>
                            <span class="font-medium">${moneyness.toFixed(3)}</span>
                        </div>
                    </div>
                </div>
                
                <!-- Input Summary -->
                <div class="text-left space-y-2 text-sm">
                    <h5 class="font-medium text-gray-700 mb-2">Input Parameters</h5>
                    <div class="flex justify-between">
                        <span class="text-gray-600">Current Price (S):</span>
                        <span class="font-medium">$${inputs.currentPrice.toFixed(2)}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">Strike Price (K):</span>
                        <span class="font-medium">$${inputs.exercisePrice.toFixed(2)}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">Time to Maturity:</span>
                        <span class="font-medium">${inputs.timeToMaturity} years</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">Risk-free Rate:</span>
                        <span class="font-medium">${inputs.riskFreeRate}%</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">Volatility:</span>
                        <span class="font-medium">${inputs.volatility}%</span>
                    </div>
                </div>
                
                <!-- Market Assessment -->
                <div class="mt-4 p-3 rounded-lg ${optionType === 'call' && moneyness > 1 ? 'bg-green-50' : optionType === 'put' && moneyness < 1 ? 'bg-green-50' : 'bg-yellow-50'}">
                    <div class="text-xs text-gray-600 text-center">
                        ${getMarketAssessment(optionType, moneyness, timeValue, intrinsicValue)}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getMarketAssessment(optionType, moneyness, timeValue, intrinsicValue) {
    if (optionType === 'call') {
        if (moneyness > 1.05) {
            return "In-the-money call with significant intrinsic value";
        } else if (moneyness > 0.95) {
            return "At-the-money call - high time value sensitivity";
        } else {
            return "Out-of-the-money call - value depends on time and volatility";
        }
    } else {
        if (moneyness < 0.95) {
            return "In-the-money put with significant intrinsic value";
        } else if (moneyness < 1.05) {
            return "At-the-money put - high time value sensitivity";
        } else {
            return "Out-of-the-money put - value depends on time and volatility";
        }
    }
}

function resetForm() {
    document.getElementById('calculator-form').reset();
    document.querySelector('input[name="optionType"][value="call"]').checked = true;
    
    // Clear any error states
    const fields = ['currentPrice', 'exercisePrice', 'timeToMaturity', 'riskFreeRate', 'volatility'];
    fields.forEach(field => {
        const input = document.getElementById(field);
        const errorDiv = document.getElementById(field + '-error');
        input.classList.remove('error-border');
        errorDiv.classList.add('hidden');
    });
    
    // Reset results
    document.getElementById('results-content').innerHTML = `
        <div class="text-center p-8">
            <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="text-gray-400 w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 002 2z"></path>
                </svg>
            </div>
            <p class="text-secondary-slate text-sm">
                Enter the option parameters and click calculate to see the estimated option value
            </p>
        </div>
    `;
    
    showToast('Form Reset', 'All fields have been cleared');
}

// Load example calculations
function loadExample(type) {
    const examples = {
        'tech': {
            currentPrice: 100,
            exercisePrice: 110,
            timeToMaturity: 1,
            riskFreeRate: 5,
            volatility: 25,
            optionType: 'call'
        },
        'safe': {
            currentPrice: 50,
            exercisePrice: 45,
            timeToMaturity: 0.5,
            riskFreeRate: 3,
            volatility: 15,
            optionType: 'put'
        },
        'volatile': {
            currentPrice: 200,
            exercisePrice: 220,
            timeToMaturity: 0.25,
            riskFreeRate: 4.5,
            volatility: 40,
            optionType: 'call'
        }
    };
    
    const example = examples[type];
    if (!example) return;
    
    // Fill form fields
    document.getElementById('currentPrice').value = example.currentPrice;
    document.getElementById('exercisePrice').value = example.exercisePrice;
    document.getElementById('timeToMaturity').value = example.timeToMaturity;
    document.getElementById('riskFreeRate').value = example.riskFreeRate;
    document.getElementById('volatility').value = example.volatility;
    document.querySelector(`input[name="optionType"][value="${example.optionType}"]`).checked = true;
    
    showToast('Example Loaded', `${type.charAt(0).toUpperCase() + type.slice(1)} example parameters loaded`);
}

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter to calculate
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        document.getElementById('calculateBtn').click();
    }
    
    // Ctrl/Cmd + R to reset (prevent browser refresh)
    if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        e.preventDefault();
        resetForm();
    }
});

// Add input formatting
document.addEventListener('DOMContentLoaded', function() {
    // Format number inputs on blur
    const numberInputs = document.querySelectorAll('input[type="number"]');
    numberInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !isNaN(this.value)) {
                const value = parseFloat(this.value);
                if (this.id === 'currentPrice' || this.id === 'exercisePrice') {
                    this.value = value.toFixed(2);
                } else if (this.id === 'timeToMaturity') {
                    this.value = value.toFixed(2);
                } else {
                    this.value = value.toFixed(2);
                }
            }
        });
        
        // Add visual feedback on focus
        input.addEventListener('focus', function() {
            this.classList.add('ring-2', 'ring-blue-500');
        });
        
        input.addEventListener('blur', function() {
            this.classList.remove('ring-2', 'ring-blue-500');
        });
    });
});