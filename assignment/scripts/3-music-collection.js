console.log('***** Music Collection *****')

// ### Required Features

// 1. - Create a variable `collection` that starts as an empty array.
const collection = [];

// 2. - Add a function named `addToCollection`. This function should:
//    - Take in the album's `title`, `artist`, `yearPublished` as input parameters
//    - Create a new object having the above properties
//    - Add the new object to the end of the `collection` array
//    - Return the newly created object

/**
 * Adds an album to a collection 
 * @param {string} titleInput - album title
 * @param {string} artistInput - album artist
 * @param {number} yearPublishedInput - album year
 * @param {[array]} trackListInput - array of track objects in the format {trackName: 'string', trackDuration: 'string'}
 * @return {object} album object including title, artist and year
 */

function addToCollection(titleInput, artistInput, yearPublishedInput, trackListInput) {
    const newAlbum = {
        title: titleInput,
        artist: artistInput,
        year: yearPublishedInput,
        tracks: trackListInput,
    };
    collection.push(newAlbum);
    return newAlbum;
}

// 3. - Test the `addToCollection` function:
//    - Add 6 albums to your collection. Aim to have a mix of both same and different artists and published years. (Feel free to share your musical interests, or make stuff up. Totally fine either way.)
//    - Console.log each album as added using the returned value.
//    - After all are added, console.log the `collection` array.

console.log(addToCollection('By the Way', 'Red Hot Chili Peppers', 2002, byTheWayTrackListing));
console.log(addToCollection('Californication', 'Red Hot Chili Peppers', 1999, californicationTrackListing));
console.log(addToCollection('Distance and Time', 'Fink', 2007, distanceAndTimeTrackListing));
console.log(addToCollection('good kid, m.A.A.d City', 'Kendrick Lamar', 2012, goodKidMaadCityTrackListing));
console.log(addToCollection('Indicud', 'Kid Cudi', 2013, indicudTrackListing));
console.log(addToCollection('Skin and Bones', 'Foo Fighters', 2006, skinAndBonesTrackListing));

console.log('The collection includes:', collection);

// 4. - Add a function named `showCollection`. This function should:
//    - Take in an array parameter. (This allows it to be reused to show any collection, like the results from the find or search.)
//    - Console.log the number of items in the array.
//    - Loop over the array and console.log each album's information formatted like: `TITLE by ARTIST, published in YEAR`.

/**
 * Shows the properties of albums in a collection
 * @param {[array]} arrayInput - a collection of album objects
 * @return No specified return. Instead, console.log the number of albums and each album's title, artist, published year, and track.
*/

function showCollection(array) {
    console.log('There are', array.length, 'albums in this collection.');
    for (let i = 0; i < array.length; i += 1) {
        console.log(`${array[i].title} by ${array[i].artist}, published in ${array[i].year}:`);
        let trackListArray = array[i].tracks;
        for (let t = 0; t < trackListArray.length; t += 1) {
            console.log(`${t + 1}. ${trackListArray[t].trackName} ${trackListArray[t].trackDuration}`);
        }
    }
};

// 5. - Test the `showCollection` function.
showCollection(collection);

// 6. - Add a function named `findByArtist`. This function should:
//    - Take in `artist` (a string) parameter
//    - Create an array to hold any results, empty to start
//    - Loop through the `collection` and add any objects with a matching artist to the array.
//    - Return the array with the matching results. If no results are found, return an empty array.

/**
 * Search for and show albums found by a specified artist
 * @param {string} artistInput - artist to search for
 * @return {[array]} albumsFound - array of albums found by the specified artist
*/

function findByArtist(artistInput) {
    const albumsFound = [];
    for (let album of collection) {
        if (artistInput === album.artist) {
            albumsFound.push(album);
        }
    }
    return albumsFound;
}

// 7. - Test the `findByArtist` function. Make sure to test with an artist you know is in the collection, as well as an artist you know is not in your collection. Check that for artists with multiple matches, all are found.
console.log(findByArtist('Red Hot Chili Peppers')); //expect albumsFound array containing 'By the Way' and 'Californication'
console.log(findByArtist('Tracy Chapman')); //expect empty albumsFound array

// ### Stretch goals

// 8. - Create a function called `search`. This function should:
//    - Take an input parameter for a search criteria object. Create your solution based on a search object that has these properties:
//      ```
//      { artist: 'Ray Charles', year: 1957 }
//      ```
//    - The returned output from `search` should meet these requirements:
//    - Return a new array of all items in the `collection` matching *all* of the search criteria.
//    - If no results are found, return an empty array.
//    - If there is no search object or an empty search object provided as input, then return all albums in the `collection`.

/**
 * Show albums in the collection array that meet artist, published year, and track name search criteria. 
 * @param {{object}} artistYearTrackInput - object that includes artist name, year published, and track name to search
 * @return {[array]} albumsMatched or collection - array of albums found. If no criteria entered or blank criteria, all albums in collection
 * will be returned.
 */

function search(artistYearTrackInput) {
    const albumsMatched = [];
    if (typeof artistYearTrackInput === 'undefined' || (artistYearTrackInput.artist === '' && artistYearTrackInput.year === '' && artistYearTrackInput.track === '')) {
        return collection;
    } else {
        for (let i = 0; i < collection.length; i += 1) {
            let album = collection[i];
            if (artistYearTrackInput.artist === album.artist && artistYearTrackInput.year === album.year) {
                let trackListArray = collection[i].tracks;
                for (let t = 0; t < trackListArray.length; t += 1) {
                    if (artistYearTrackInput.track === trackListArray[t].trackName) {
                        albumsMatched.push(album);
                    }
                }
            }
        } return albumsMatched;
    }
}

console.log(search({ artist: 'Red Hot Chili Peppers', year: 2002, track: 'Minor Thing' })); //expect albumsMatched array with album 'By the Way'
console.log(search({ artist: 'Fink', year: 2007, track: 'Blueberry Pancakes' })); //expect albumsMatched array with album 'Distance and Time'
console.log(search({ artist: 'Red Hot Chili Peppers', year: 2002, track: 'Not a Track Name' })); //expect empty albumsMatched array (track name doesn't match)
console.log(search({ artist: 'Red Hot Chili Peppers', year: 2003, track: 'Minor Thing' })); //expect empty albumsMatched array (year doesn't match)
console.log(search({ artist: 'Red Hot Chili Peppers', year: 2003, track: '' })); //expect empty albumsMatched array (year and track don't match)
console.log(search({ artist: '', year: '', track: '' })); //expect collection array of all albums (empty search object)
console.log(search()); //expect collection array of all albums (no search object)

// 9. a. - Add an array of `tracks` to your album objects. Each track should have a `name` and `duration`. You will need to update the functions to support this new property:
//    b. - Update the `addToCollection` function to also take an input parameter for the array of tracks.
//    c. - Update `search` to allow a `trackName` search criteria.
//    d. - Update the `showCollection` function to display the list of tracks for each album with its name and duration.
// ```
//     TITLE by ARTIST, published in YEAR:
//     1. NAME: DURATION
//     2. NAME: DURATION
//     3. NAME: DURATION
//     TITLE by ARTIST, published in YEAR:
//     1. NAME: DURATION
//     2. NAME: DURATION
// ```

