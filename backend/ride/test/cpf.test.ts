import {  validate } from '../src/cpf';

test("Should return true if cpf is valid", () => {
  expect(validate("095.720.389-66")).toBe(true);
})

test("Should return false if cpf is invalid", () => {
  expect(validate("123.456.789-00")).toBe(false);
})

test('should return false if all numbers are repeated', () => {
  expect(validate("111.111.111-11")).toBe(false);
})

test('should return false if cpf is empty', () => {
  expect(validate("")).toBe(false);
})

test('should return false if cpf is null', () => {
  expect(validate(null)).toBe(false);
})

test('should return false if cpf is non numeric', () => {
  expect(validate("abc")).toBe(false);
})