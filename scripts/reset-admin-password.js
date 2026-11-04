const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function resetPassword() {
  const newPassword = 'Yumira@123456';
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(newPassword, salt);

  const user = await prisma.user.update({
    where: { email: 'mdrabdurazzakrakib@gmail.com' },
    data: { passwordHash },
  });

  console.log(`Password reset successfully for ${user.email}!`);
  console.log(`New Password: ${newPassword}`);
}

resetPassword()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
