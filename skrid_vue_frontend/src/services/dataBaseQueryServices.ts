import api from "./axios.ts";

/**
 * Fetches the list of authors from the server.
 * 
 * @returns {Promise<string[]>} A promise that resolves to an array of authors.
*/
export async function fetchAuthors() {
    try {
        const response = await api.get("/authors");
        return response.data;
    } catch (error) {
        console.error("Error fetching authors:", error);
        throw error;
    }
}


/**
 * Fetches all the scores from a specific collection by the given author.
 * 
 * @param {string} author - The name of the author to filter by.
 * @returns {Promise<Object>} A promise that resolves to the collection data for the specified author.
 */
export async function fetchCollectionDataByAuthor(author: string) {
    const query = `MATCH (s:Score) WHERE s.collection CONTAINS "${author}" RETURN s ORDER BY s.source`;
    let data = {
        "query": query,
    };
    try {
        const response = await api.post("/crisp-query-results", data);
        return response.data;
    } catch (error) {
        console.error("Error fetching collection data of collection" + author + " :", error);
        throw error;
    }
}