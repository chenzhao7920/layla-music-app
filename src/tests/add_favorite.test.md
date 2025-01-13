# Favorite Button Test Cases

## Test Case 1: Add Item to Favorites

### Objective

Check if users can add items to favorites.

### Steps

1. Open the main page
2. Find an item without favorite mark
3. Click the favorite button (heart icon)
4. Check if the heart icon changes color

### Expected Results

- Heart icon turns red
- Item is marked as favorite
- Success message shows (if applicable)

---

## Test Case 2: Favorites Persist After Page Change

### Objective

Verify favorites stay marked when changing pages.

### Steps

1. Add favorite to item on page 1
2. Go to page 2
3. Return to page 1
4. Check if favorite mark is still there

### Expected Results

- Favorite mark stays red after page change
- No favorites are lost when moving between pages
- Same items stay marked as favorites

---

## Test Case 3: Remove Item from Favorites

### Objective

Test if users can remove items from favorites.

### Steps

1. Find an item marked as favorite
2. Click the red heart icon
3. Check if the mark is removed

### Expected Results

- Heart icon returns to default color
- Item is no longer marked as favorite
- Remove message shows (if applicable)

---

## Test Case 4: Multiple Items as Favorites

### Objective

Check if multiple items can be marked as favorites.

### Steps

1. Mark first item as favorite
2. Mark second item as favorite
3. Mark third item as favorite
4. Change page and return

### Expected Results

- All three items stay marked
- Favorites work on different items
- All marks stay after page refresh

---

## Additional Notes

### Important Checks

- Favorites should save after browser refresh
- Favorite marks should load quickly
- System should handle many favorites
- Favorites should work with filters on
