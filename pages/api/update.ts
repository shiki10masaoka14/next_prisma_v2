import { PrismaClient, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const handle = async (
  req: NextApiRequest,
  res: NextApiResponse<User>,
) => {
  const { id, item, value } = req.body;
  const update = await prisma.user.update({
    where: { id: Number(id) },
    data: { [item]: value },
  });
  res.json(update);
};

export default handle;
