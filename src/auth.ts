import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { z } from "zod";
import { db } from "./server/db/index";
import { user } from "./server/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

type User = {
  email: string;
  password: string;
};

async function createUser(
  email: string,
  password: string,
): Promise<User | null> {
  try {
    // Check if user already exists
    const currentUser = await db.query.user.findFirst({
      where: eq(user.email, email),
    });

    if (currentUser) {
      throw new Error("User already exists");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const newUser = await db
      .insert(user)
      .values({
        email,
        password: hashedPassword,
      })
      .returning();

    return newUser[0] ? newUser[0] : null;
  } catch (error) {
    console.error("Failed to create user:", error);
    return null;
  }
}

async function getUser(email: string): Promise<User | undefined> {
  try {
    const currentUser = await db.query.user.findFirst({
      where: eq(user.email, email),
    });
    return currentUser;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("User does not exist");
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (user) {
            const passwordsMatch = await bcrypt.compare(password, user.password);
            if (passwordsMatch) return user;
          } else {
            const newUser = await createUser(email, password);
            if (newUser) return newUser;
          }
        }
        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
});
