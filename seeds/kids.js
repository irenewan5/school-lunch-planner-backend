/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("kids").del();
  await knex("kids").insert([
    { id: 1, user_id: 1, name: "John Doe" },
    { id: 2, user_id: 1, name: "Jane Doe" },
  ]);
};
