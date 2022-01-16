import { PrismaClient, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const handle = async (
  req: NextApiRequest,
  res: NextApiResponse<User>,
) => {
  const { id } = req.body;
  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
  });
  res.json(user);
};

export default handle;
