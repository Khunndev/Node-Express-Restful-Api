import { Prisma } from "@prisma/client";
import { prisma } from "../db";
import bcrypt, { compare } from "bcrypt";

interface userdata {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export async function checkisExisitngUser(data: userdata) {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });
  if (user) {
    return true;
  }
  return false;
}

export async function checkUser(email: string, password: string) {
  const user: any = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  const isValid = await compare(password, user.password);
  if (isValid) {
    return user;
  }
  return false;
}

export async function RegisterUser(data: userdata) {
  //2. encode password using bcrypt
  const hashedPassword = await bcrypt.hash(data.password, 10);
  //3. create new user
  const newUser = await prisma.user.create({
    data: {
      firstName: data.firstname,
      LastName: data.lastname,
      email: data.email,
      password: hashedPassword,
    },
  });
  return newUser;
}

export async function getUserDetailbyId(id: number) {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      firstName: true,
      LastName: true,
      email: true,
      profile: {
        select: {
          address: true,
          bio: true,
        },
      },
      posts: {
        select: {
          id: true,
          title: true,
          category: {
            select: { name: true },
          },
        },
      },
    },
  });
  return user;
}
