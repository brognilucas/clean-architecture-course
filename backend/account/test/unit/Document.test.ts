import Document  from '../../src/domain/document/Document';


export const VALID_MOCK_DOCUMENT = "702.134.697-23";

test("Should return true if cpf is valid", () => {
  expect(Document.validate(VALID_MOCK_DOCUMENT)).toBe(true);
})

test("Should return false if cpf is invalid", () => {
  expect(Document.validate("123.456.789-00")).toBe(false);
})

test('should return false if all numbers are repeated', () => {
  expect(Document.validate("111.111.111-11")).toBe(false);
})

test('should return false if cpf is empty', () => {
  expect(Document.validate("")).toBe(false);
})

test('should return false if cpf is null', () => {
  expect(Document.validate(null)).toBe(false);
})

test('should return false if cpf is non numeric', () => {
  expect(Document.validate("abc")).toBe(false);
})