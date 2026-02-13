export const required = (value, field) => (value ? '' : `${field} is required`);
export const minLength = (value, len, field) => (value?.length >= len ? '' : `${field} must be at least ${len} characters`);
export const isEmail = (value) => (/\S+@\S+\.\S+/.test(value) ? '' : 'Invalid email');
