export const save = (key, value) => localStorage.setItem(`${key}`, value);

export const get = (key) => localStorage.getItem(`${key}`);