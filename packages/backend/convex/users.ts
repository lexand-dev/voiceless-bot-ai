import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const getMany = query({
  args: {},
  handler: async ({ db }) => {
    return await db.query("users").collect();
  }
});

export const add = mutation({
  args: { name: v.string() },
  handler: async ({ db }, { name }) => {
    const user = await db.insert("users", { name });
    return user;
  }
});
