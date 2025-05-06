export const detectCardType = (cardNumber) => {
    // Eliminar espacios y caracteres no numéricos
    const cleaned = cardNumber.replace(/\D/g, '');
    
    // Patrones para diferentes tipos de tarjeta
    const patterns = {
        visa: /^4/,
        mastercard: /^5[1-5]/,
        amex: /^3[47]/,
        diners: /^3(?:0[0-5]|[68][0-9])/,
        discover: /^6(?:011|5[0-9]{2})/,
        jcb: /^(?:2131|1800|35\d{3})/
    };
    
        for (const [type, pattern] of Object.entries(patterns)) {
            if (cleaned.match(pattern)) {
                return type;
            }
        }
        
        return null;
    };

    export const validateCardNumber = (cardNumber) => {
        // Implementar algoritmo de Luhn para validación
        const cleaned = cardNumber.replace(/\D/g, '');
        
        let sum = 0;
        let shouldDouble = false;
    
        for (let i = cleaned.length - 1; i >= 0; i--) {
            let digit = parseInt(cleaned.charAt(i), 10);
            
            if (shouldDouble) {
                digit *= 2;
                if (digit > 9) {
                digit -= 9;
            }
        }
        
        sum += digit;
        shouldDouble = !shouldDouble;
    }
    
    return sum % 10 === 0;
};