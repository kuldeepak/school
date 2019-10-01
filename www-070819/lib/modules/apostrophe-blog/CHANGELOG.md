### 2.1.0

Added simple filters for year, month, and day. You can leverage these in your `apostrophe-blog-pages` modules by leveraging the new `piecesFilters` behavior introduced in apostrophe 2.9.0. Simply refer to the filters using `data.piecesFilters.year` etc in your index page template.

[Check out this tutorial to learn more.](http://apostrophecms.org/docs/tutorials/intermediate/cursors.html#creating-filter-u-i-with-code-apostrophe-pieces-pages-code)

### 2.0.2

Sample `index.html` for `apostrophe-blog-pages` now includes the pager.

### 2.0.1

Fixed a significant performance bug. The blog widget was fetching *every* widget rather than just those with the appropriate IDs. The set of results was then being winnowed by the algorithm for handling many widgets with one query, but not before considerable resources were spent fetching areas for those blog posts, etc.
