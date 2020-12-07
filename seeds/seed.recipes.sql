INSERT INTO recipes (cocktail_name, cocktail_type, whiskey_type, description, created_by)
    VALUES
        ('Perfect Manhattan', 'Martini', 'Rye Whiskey', 'Best Straight up cocktail', 5),
        ('Old Fashioned', 'Lowball', 'Bourbon Whiskey', 'Classic drink that needs no description', 3),
        ('Fancy Schmanzy', 'Highball', 'Irish Whiskey', NULL, 6),
        ('Wild Turkey', 'Lowball', 'Tennessee Whiskey', NULL, 1),
        ('Something Sweet', 'Snifter', 'Japanese Whisky', 'Something sweet certainly...', 5),
        ('Crazy Aces', 'Lowball', 'Single Malt Whisky', NULL, 2);

INSERT INTO ingredients (ingredient_string, recipe_id)
    VALUES
        ('2oz Rye Whiskey', 1),
        ('2 dashes bitters', 1),
        ('1/2 oz dry vermouth', 1),
        ('1/2 oz sweet vermouth', 1),
        ('3 oz bourbon', 2),
        ('3 dashes of bitters', 2),
        ('1 tsp sugar', 2),
        ('1 tsp water', 2),
        ('2 fancy tablets', 3),
        ('3 oz Irish Whiskey', 3),
        ('2 oz Tennessee Whiskey', 4),
        ('3 wild turkey feathers', 4),
        ('2 oz Japanese Whisky', 5),
        ('1 part sugar', 5),
        ('1 part spice', 5),
        ('1 part everything nice', 5),
        ('2 oz Single Malt Whisky', 6),
        ('1 oz crazy stuff', 6);

INSERT INTO cocktail_steps (step_content, recipe_id)
    VALUES
        ('Chill Glass in freezer', 1),
        ('In a shaker with ice pour in ingredients', 1),
        ('Stir really well to mix together', 1),
        ('Take glass out of freezer', 1),
        ('Strain shaker contents into the glass', 1),
        ('Enjoy!', 1),
        ('Place sugar in empty glass', 2),
        ('Soak sugar with bitters', 2),
        ('Muddle sugar and bitters in glass', 2),
        ('Place single whiskey ice cube or fill glass with ice', 2),
        ('Pour Bourbon over ice', 2),
        ('Peel Orange and Garnish', 2),
        ('Do some stuff', 3),
        ('Make it crazy', 3),
        ('Wow so cool', 3),
        ('Greatest cocktail', 4),
        ('You can make it', 4),
        ('It''s easy', 4),
        ('Just do it', 4),
        ('I don''t know how to make this', 5),
        ('What am I doing?', 5),
        ('Sure this looks good', 5),
        ('Cool', 6),
        ('Calm', 6),
        ('Collected', 6);