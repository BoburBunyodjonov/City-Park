export interface User {
    uid: string;
    email: string;
    role: 'admin' | 'user'; // Admin yoki oddiy foydalanuvchi
  }