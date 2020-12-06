CREATE TABLE cocktail_steps (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    step_content TEXT NOT NULL,
    recipe_id INTEGER REFERENCES recipes(id) ON DELETE CASCADE NOT NULL
);