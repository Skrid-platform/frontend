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
export async function fetchCollectionScoresNamesByAuthor(author: string) {
    const query = `MATCH (s:Score) WHERE s.collection CONTAINS "${author}" RETURN s ORDER BY s.source`;
    let data = {
        "query": query,
    };
    try {
        const response = await api.post("/crisp-query-results", data);
        return response.data.results;
    } catch (error) {
        console.error("Error fetching collection data of collection" + author + " :", error);
        throw error;
    }
}

/**
 * Fetches a MEI file by its name and the author's name.
 * @param {string} name - The name of the MEI file to fetch.
 * @param {string} authorName - The name of the author of the MEI file.
 * @returns {Promise<Object>} A promise that resolves to the MEI file data.
 * */
export async function fetchMeiFileByFileName(fileName: string, authorName: string){
    let author = authorName.replace(/ /g, '-');
    try {
        const response = await api.get(`/data/${author}/mei/${fileName}`);
        return response.data
    } catch (error) {
        console.error("Error fetching MEI file by name:", fileName, "for author:", authorName);
        throw error;
    }
}