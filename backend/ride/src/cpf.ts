// @ts-nocheck
export function validate(cpf) {
    const VALID_CPF_LENGTH = 11;
    const CPF_LENGTH_WITHOUT_DIGITS = 9;
    const FIRST_DIGIT_MULTIPLICATION_FACTOR = 11;
    const SECOND_DIGIT_MULTIPLICATION_FACTOR = 12;

    const numericalCPF = cpf?.replace(/\D/g, '');
    if (!numericalCPF || numericalCPF.length !== VALID_CPF_LENGTH) return false;
    
    const hasOnlyRepeatedNumbers = numericalCPF.split("").every((char) => char === numericalCPF[0])
    if (hasOnlyRepeatedNumbers) return false;

    let calculatedFirstDigit = 0;
    let calculatedSecondDigit = 0;

    for (let i = 1; i <= CPF_LENGTH_WITHOUT_DIGITS; i++) {
        const currentDigit = +numericalCPF.substring(i - 1, i);;
        calculatedFirstDigit = calculatedFirstDigit + (FIRST_DIGIT_MULTIPLICATION_FACTOR - i) * currentDigit;
        calculatedSecondDigit = calculatedSecondDigit + (SECOND_DIGIT_MULTIPLICATION_FACTOR - i) * currentDigit;
    }

    let restCalculatedFirstDigit = (calculatedFirstDigit % FIRST_DIGIT_MULTIPLICATION_FACTOR);
    const firstDigitNumber = (restCalculatedFirstDigit < 2) ? 0 : 11 - restCalculatedFirstDigit;

    calculatedSecondDigit += 2 * firstDigitNumber;
    const restSecondDigit = (calculatedSecondDigit % 11);
    const secondDigitNumber = (restSecondDigit < 2) ? 0 : 11 - restSecondDigit;
    const calculatedDigit = `${firstDigitNumber}${secondDigitNumber}`;

    const informedDigit = numericalCPF.substring(CPF_LENGTH_WITHOUT_DIGITS, VALID_CPF_LENGTH);
    return informedDigit === calculatedDigit;
}