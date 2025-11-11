import prisma from "../../config/db/prismaClient.js";

const saveFeed = async (data) => {
  return prisma.feeds.create({ data });
};

const searchFeedById = async (userId) => {
  return await prisma.feeds.findMany({
    where: {
      user_id: userId,
    },
    select: {
      id: true,
      content: true,
      user_id: true,
      created_at: true,
      users: {
        select: {
          username: true,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });
};

const getFollowingUser = async (id) => {
  return await prisma.follows.findMany({
    where: {
      followers_id: id,
    },
    select: {
      following_id: true,
    },
  });
};

const getMainFeeds = async (userIds, page, limit) => {
  const skip = (page - 1) * limit;
  const [feeds, totalCount] = await Promise.all([
    prisma.feeds.findMany({
      where: {
        user_id: {
          in: userIds,
        },
      },
      select: {
        id: true,
        content: true,
        created_at: true,
        users: {
          select: {
            id: true,
            username: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
      skip: skip,
      take: limit,
    }),
    prisma.feeds.count({
      where: {
        user_id: {
          in: userIds,
        },
      },
    }),
  ]);
  return {
    feeds,
    totalCount,
  };
};

export default { saveFeed, searchFeedById, getFollowingUser,getMainFeeds };
