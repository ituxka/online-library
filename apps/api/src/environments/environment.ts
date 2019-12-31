export const environment = {
  production: false,
  apiPort: 3333,
  dbUser: 'postgres',
  dbPassword: 'postgres',
  moderator: {
    email: 'example@test',
    password: 'qwe123',
  },
  email: {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: '', // your login
      pass: '', // your password
    },
  },
};
