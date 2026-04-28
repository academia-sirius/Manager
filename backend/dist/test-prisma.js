"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient({ log: ['info'] });
prisma.$connect().then(() => console.log('Connected!')).catch(console.error);
//# sourceMappingURL=test-prisma.js.map