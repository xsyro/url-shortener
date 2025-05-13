import { validateUrl } from './validate.util';

describe('validateUrl', () => {
  it('should return true for a valid HTTP URL', () => {
    const url = 'http://example.com';
    expect(validateUrl(url)).toBe(true);
  });

  it('should return true for a valid HTTPS URL', () => {
    const url = 'https://example.com';
    expect(validateUrl(url)).toBe(true);
  });

  it('should return true for a valid FTP URL', () => {
    const url = 'ftp://example.com';
    expect(validateUrl(url)).toBe(true);
  });

  it('should return true for a valid URL with a port', () => {
    const url = 'http://example.com:8080';
    expect(validateUrl(url)).toBe(true);
  });

  it('should return true for a valid URL with a path', () => {
    const url = 'http://example.com/path/to/resource';
    expect(validateUrl(url)).toBe(true);
  });

  it('should return true for a valid URL with query parameters', () => {
    const url = 'http://example.com?query=param';
    expect(validateUrl(url)).toBe(true);
  });

  it('should return true for a valid URL with a fragment', () => {
    const url = 'http://example.com#fragment';
    expect(validateUrl(url)).toBe(true);
  });

  it('should return false for an invalid URL without a protocol', () => {
    const url = 'example.com';
    expect(validateUrl(url)).toBe(false);
  });

  it('should return false for an invalid URL with unsupported protocol', () => {
    const url = 'abcd://example.com';
    expect(validateUrl(url)).toBe(false);
  });

  it('should return false for an invalid URL with malformed structure', () => {
    const url = 'http://';
    expect(validateUrl(url)).toBe(false);
  });

  it('should return false for an invalid URL with spaces', () => {
    const url = 'http://example .com';
    expect(validateUrl(url)).toBe(false);
  });

  it('should return false for an invalid URL with invalid IP address', () => {
    const url = 'http://999.999.999.999';
    expect(validateUrl(url)).toBe(false);
  });

  it('should return false for an empty string', () => {
    const url = '';
    expect(validateUrl(url)).toBe(false);
  });

  it('should return false for a null value', () => {
    const url = null as unknown as string;
    expect(validateUrl(url)).toBe(false);
  });

  it('should return false for an undefined value', () => {
    const url = undefined as unknown as string;
    expect(validateUrl(url)).toBe(false);
  });
});
