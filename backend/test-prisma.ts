import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient({ log: ['info'] });
prisma.$connect().then(() => console.log('Connected!')).catch(console.error);
