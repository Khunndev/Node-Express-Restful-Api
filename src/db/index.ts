import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
  .$extends({
    result: {
      user: {
        fullname: {
          needs: { firstName: true, LastName: true },
          compute(user) {
            return `${user.firstName} ${user.LastName}`;
          },
        },
      },
      post: {
        createAtToDate: {
          needs: { createdAt: true },
          compute(post) {
            return `${post.createdAt.toLocaleDateString()}`;
          },
        },
      },
    },
  })
  .$extends({
    model: {
      category: {
        async searchCategoryByName(keyword: string) {
          return await prisma.category.findMany({
            where: {
              name: {
                contains: keyword,
              },
            },
            orderBy: { id: "desc" },
          });
        },
      },
    },
  })
  .$extends({
    query: {
      post: {
        async findMany({ model, operation, args, query }) {
          args.orderBy = { id: "desc" };
          return query(args);
        },
      },
    },
  });
export { prisma };
