

exports.up = function(knex, Promise) {
 return knex.raw(`
    CREATE FUNCTION public.upsert_rating(ratingFor integer, ratingBy integer, skillId integer, rating1 integer)
    RETURNS public.rating
    AS $$
        INSERT INTO rating(rating_for, rating_by, skill_id, rating)
        VALUES
            (ratingFor, ratingBy, skillId, rating1)
        ON CONFLICT (rating_for, rating_by, skill_id) DO UPDATE
        SET rating = rating1
        RETURNING *;
    $$ LANGUAGE sql VOLATILE STRICT;
  `)
};

exports.down = function(knex, Promise) {
    return knex.raw(`DROP FUNCTION IF EXISTS upsert_rating`)
};
