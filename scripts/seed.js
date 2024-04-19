const { db } = require("@vercel/postgres");
const {
  users,
} = require("./utils/placeholderdata");
const bcrypt = require("bcrypt");

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "invoices" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        isadmin BOOLEAN NOT NULL DEFAULT false
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, name, email, password, isadmin)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword}, ${user.isadmin})
        ON CONFLICT (id) DO NOTHING;
      `;
      })
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
}




async function seedCustomers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "customers" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS customers (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        artist VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        image_url VARCHAR(255),
        date TIMESTAMP DEFAULT NOW()
      );
    `;

    console.log(`Created "customers" table`);

    // Insert data into the "customers" table
    // const insertedCustomers = await Promise.all(
    //   customers.map(
    //     (customer) => client.sql`
    //     INSERT INTO customers (id, artist, email, image_url)
    //     VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
    //     ON CONFLICT (id) DO NOTHING;
    //   `
    //   )
    // );

    // console.log(`Seeded ${insertedCustomers.length} customers`);

    // return {
    //   createTable,
    //   customers: insertedCustomers,
    // };
  } catch (error) {
    console.error("Error seeding customers:", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();
  client.sql`DROP table IF EXISTS users CASCADE`;
  client.sql`DROP table IF EXISTS customers CASCADE`;
  await seedUsers(client);
  await seedCustomers(client);
  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});