# Pagination Feature Test Cases

## Test Case 1: Default Pagination State

### Objective

Verify that the pagination controls are correctly displayed and configured on initial page load.

### Steps

1. Open the application and navigate to the page with pagination
2. Observe the pagination controls and default settings

### Expected Results

- Default rows per page is set to 5
- number displays "1 of X" (where X is total items)
- Previous page button is disabled on first page
- Next page button is enabled if there are more pages
- Rows per page dropdown shows available options (5, 10, 20)

---

## Test Case 2: Changing Rows Per Page

### Objective

Ensure that changing the number of rows per page updates the display correctly.

### Steps

1. Open the page with default pagination (5 rows)
2. Click the rows per page dropdown
3. Select 10 rows per page
4. Observe the changes in the display

### Expected Results

- Number of displayed items changes to 25 per page
- Data is correctly displayed with 25 items
- Pagination info updates to reflect new page count

---

## Test Case 3: Navigation Between Pages

### Objective

Verify that users can navigate between pages using next and previous buttons.

### Steps

1. Start on page 1 with multiple pages of data
2. Click the "Next Page" button
3. Observe the second page
4. Click the "Previous Page" button
5. Return to first page

### Expected Results

- Next button navigates to next page
- Previous button navigates to previous page
- Data refreshes with correct items for each page
- Previous button is disabled on first page
- Next button is disabled on last page

---

## Test Case 4: Last Page Behavior

### Objective

Ensure correct behavior when reaching the last page of results.

### Steps

1. Click the Filter + button and apply Canada, 2005 to show fewer items
2. Navigate to the last page of results
3. Observe pagination controls
4. Check displayed data

### Expected Results

- Next page button is disabled
- Previous page button is enabled
- Correct number of remaining items is displayed
- Data is displayed correctly for final page

---

## Test Case 5: Rows Per Page Edge Cases

### Objective

Verify pagination behavior with different rows per page selections.

### Steps

1. Select maximum rows per page (20)
2. Observe display and controls
3. Select minimum rows per page (5)
4. Check pagination updates

### Expected Results

- Display updates correctly for both large and small page sizes
- Page count recalculates accurately
- No data loss occurs during size changes
- Navigation controls work correctly at all page sizes

---

## Additional Notes

### Pagination Control Requirements

- Row per page options must include: 5, 10, 20
- Page navigation must be disabled when inappropriate
- Pagination range always display
- Row count must be accurate and update with filters

### Edge Case Considerations

- Behavior when total items is less than rows per page
- Handling empty result sets
- Interaction with other features (sorting, filtering)
- Performance with large data sets
