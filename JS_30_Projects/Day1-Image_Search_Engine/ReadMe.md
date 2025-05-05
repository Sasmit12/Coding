# Day 1 - Image Search Engine

This project is a simple image search engine that allows users to search for images using keywords and displays the results fetched from the Unsplash API.

## File Structure

JS_30_Projects/Day1-Image_Search_Engine/
├── index.html
├── script.js
└── style.css


-   `index.html`: The main HTML file containing the structure of the web page.
-   `script.js`: The JavaScript file containing the logic for fetching images from the Unsplash API and updating the page.
-   `style.css`: The CSS file containing the styling for the web page.

## How it Works

1.  **HTML (`index.html`)**:
    -   Sets up the basic structure of the page, including the title, a search form with an input field and a search button, a container to display the search results, and a "Show More" button for pagination.
    -   Links the `style.css` for styling and `script.js` for functionality.

2.  **CSS (`style.css`)**:
    -   Provides the styling for the different elements on the page, including the background color, text styles, form layout, image grid, and button appearance.

3.  **JavaScript (`script.js`)**:
    -   Retrieves the Unsplash API access key.
    -   Gets references to the search form, search input box, search results container, and the "Show More" button.
    -   Initializes variables to store the current search keyword and the current page number.
    -   The `searchImages()` function:
        -   Gets the search keyword from the input box.
        -   Constructs the URL for the Unsplash API request using the current page number and keyword.
        -   Fetches data from the Unsplash API.
        -   Parses the JSON response to get the image results.
        -   If it's the first page of results, it clears the existing content in the `searchResult` container.
        -   Iterates through the results and creates `<img>` and `<a>` elements for each image, setting the source to the small image URL from Unsplash and linking the `<a>` to the original Unsplash page.
        -   Appends the created image links to the `searchResult` container.
        -   Displays the "Show More" button after the initial search.
    -   An event listener is added to the search form to trigger the `searchImages()` function when the form is submitted. It prevents the default form submission behavior and resets the page number to 1 for a new search.
    -   An event listener is added to the "Show More" button to increment the page number and call `searchImages()` again to load more images.
    -   The `searchImages()` function is called once initially to potentially display default or previous search results if any (though in this initial state, it won't fetch anything without a keyword).

## Unsplash API Key

The script uses an access key to interact with the Unsplash API:

```javascript
const accessKey ="7iILKHH4A31N5NGdCwag7IAgb7LPSTK3a4J0Y-Ag304"
Note: This is a public access key and might have usage limitations. For a production application, it's recommended to handle API keys more securely.

Usage
Open the index.html file in your web browser.
Type a keyword (e.g., "nature", "cars", "mountains") into the search box.
Click the "Search" button.
The images related to your search query will be displayed below the search form.
If there are more images available, a "Show More" button will appear. Click it to load the next page of results.