// @ts-nocheck
export default class Document {
    static private CPF_LENGTH_WITHOUT_DIGITS = 9;
    static private VALID_CPF_LENGTH = 11;
    static private FIRST_DIGIT_MULTIPLICATION_FACTOR = 11;
    static private SECOND_DIGIT_MULTIPLICATION_FACTOR = 12;
    
    static private calculateDigits(document) { 
        let calculatedFirstDigit = 0;
        let calculatedSecondDigit = 0;
        for (let i = 1; i <= Document.CPF_LENGTH_WITHOUT_DIGITS; i++) {
            const currentDigit = +document.substring(i - 1, i);;
            calculatedFirstDigit = calculatedFirstDigit + (Document.FIRST_DIGIT_MULTIPLICATION_FACTOR - i) * currentDigit;
            calculatedSecondDigit = calculatedSecondDigit + (Document.SECOND_DIGIT_MULTIPLICATION_FACTOR - i) * currentDigit;
        }

        let restCalculatedFirstDigit = (calculatedFirstDigit % Document.FIRST_DIGIT_MULTIPLICATION_FACTOR);
        const firstDigitNumber = (restCalculatedFirstDigit < 2) ? 0 : 11 - restCalculatedFirstDigit;
        calculatedSecondDigit += 2 * firstDigitNumber;
        const restSecondDigit = (calculatedSecondDigit % 11);
        const secondDigitNumber = (restSecondDigit < 2) ? 0 : 11 - restSecondDigit;
        const calculatedDigit = `${firstDigitNumber}${secondDigitNumber}`;
        return calculatedDigit;
    }
    
    static private hasValidSize(document) {
        return document && document.length == Document.VALID_CPF_LENGTH
    }

    static private digitsAreAllEqual(document) {
        return document.split('').every((digit) => digit === document[0]);
    }

    static validate(cpf) {
        const numericalCPF = cpf?.replace(/\D/g, '');
        if (!Document.hasValidSize(numericalCPF) || Document.digitsAreAllEqual(numericalCPF)) return false;
        const calculatedDigit = Document.calculateDigits(numericalCPF);
        const informedDigit = numericalCPF.substring(Document.CPF_LENGTH_WITHOUT_DIGITS, Document.VALID_CPF_LENGTH);
        return informedDigit === calculatedDigit;
    }
}
