/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("plans", (table) => {
    table.increments("id").primary();
    table.integer("user_id").notNullable();
    table.string("kid_id").notNullable();
    table.string("date").notNullable();
    table.string("recipe_id").notNullable();
    table.string("recipe_name").notNullable();
    table.string("recipe_image").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .timestamp("updated_at")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("plans");
};
