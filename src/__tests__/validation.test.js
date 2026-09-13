import { validateEmail, validatePassword, validateLoginForm, validateRegisterForm } from '../utils/validation';

describe('Form Validation Utilities', () => {
  test('validateEmail checks valid and invalid email addresses', () => {
    expect(validateEmail('')).toBe('Email is required');
    expect(validateEmail('invalid-email')).toBe('Invalid email address');
    expect(validateEmail('test@example.com')).toBe('');
  });

  test('validatePassword checks minimum length requirements', () => {
    expect(validatePassword('')).toBe('Password is required');
    expect(validatePassword('12345')).toBe('Password must be at least 6 characters');
    expect(validatePassword('123456')).toBe('');
  });

  test('validateLoginForm returns errors object for invalid inputs', () => {
    const errors = validateLoginForm({ email: '', password: '123' });
    expect(errors.email).toBe('Email is required');
    expect(errors.password).toBe('Password must be at least 6 characters');
  });

  test('validateRegisterForm verifies password confirmation matching', () => {
    const errors = validateRegisterForm({
      name: 'Vasudev',
      email: 'vasudev@example.com',
      password: 'password123',
      confirmPassword: 'password456'
    });
    expect(errors.confirmPassword).toBe('Passwords do not match');
  });
});
