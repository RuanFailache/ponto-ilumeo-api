import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createUser(name: string, registrationCode: string) {
    await prisma.user.create({
        data: {
            name,
            registrationCode,
        },
    });
}

async function main() {
    const users = await prisma.user.findMany();

    if (users.length === 0) {
        await createUser('Ruan Failache', '#45XXFMF');
        await createUser('Eliane Gomes', '#53LEVC3');
        await createUser('Subaru Sakaguchi', '#9IMER43');
        await createUser('Gilberto Tavares', '#P0BO561');
        await createUser('Debora Dugazaio', '#LOY7I99');
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
