/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    {
      id: 1,
      name: "Thomas Doe",
      email: "thomas@doe.me",
      username: "john",
      password_hash:
        "96d9632f363564cc3032521409cf22a852f2032eec099ed5967c0d000cec607a",
    },
  ]);
};
