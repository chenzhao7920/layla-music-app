# Filter Feature Test Cases

## Test Case 1: Default Filters on Initial Load

### Objective

Verify that the default filters are correctly applied and displayed when the page loads.

### Steps

1. Open the application and navigate to the album search page
2. Observe the displayed filter tags

### Expected Results

- The tags for Country: Canada and Year: 2024 are displayed by default
- No Genre tag is displayed
- A Filter + button is visible on the page

---

## Test Case 2: Removing a Filter Tag

### Objective

Ensure that clicking the "X" button on a filter tag removes the corresponding filter.

### Steps

1. Open the application and confirm the presence of default tags (Canada and 2024)
2. Click the "X" button next to the Canada tag
3. Observe the updated list of tags

### Expected Results

- The Canada tag is removed from the page
- The 2024 tag remains visible
- The search results are updated to exclude the Canada filter

---

## Test Case 3: Opening the Drawer and Updating Filters

### Objective

Verify that the drawer opens when clicking the Filter + button, and filters can be updated.

### Steps

1. Click the Filter + button
2. In the drawer, update the following filters:
   - Change Country to USA
   - Change Year to 2023
   - Select Jazz from the Genre dropdown
3. Click the Submit button in the drawer
4. Observe the updated tags and album search results on the main page

### Expected Results

- The tags for USA, 2023, and Jazz are displayed
- The tags for Canada and 2024 are removed
- Album search results reflect the updated filters

---

## Test Case 4: Updating Album Search Results Based on Filters

### Objective

Ensure that album search results are updated according to the applied filters.

### Steps

1. Verify the default album search results
2. Click the Filter + button and update the Country to France
3. Click the Submit button in the drawer
4. Observe the updated album search results

### Expected Results

- The album search results include only albums from France
- Albums from other countries are excluded

---

## Additional Notes

### Filter Behavior

- All filters are optional
- If a filter is not applied, it should not appear as a tag
- The Filter + button should always be accessible regardless of the current filter state
- The drawer should close after clicking the Submit button
- The main page should reflect the updated filters and search results immediately after submission
