// track the searches made by users
import { Client, Databases, ID, Query } from 'react-native-appwrite';

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_NAME = process.env.EXPO_PUBLIC_APPWRITE_TABLE_NAME!;

const client = new Client()
    .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)

const database = new Databases(client);


export const updateSearchCount = async (query : string, movie: Movie) => {
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_NAME, [
            Query.equal('SearchTerm', query)
        ])
    
        console.log(result);
        // check if a record of that search has already been stored
        if(result.documents.length > 0) {
            const existingMovie = result.documents[0];
    
            await database.updateDocument(
                DATABASE_ID,
                COLLECTION_NAME,
                existingMovie.$id,
                {
                    count: existingMovie.count + 1
                }
            )
        } else {
            await database.createDocument(DATABASE_ID, COLLECTION_NAME, ID.unique(), {
                SearchTerm: query,
                movie_id: movie.id,
                count: 1,
                title: movie.title,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            })
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getTrendingMovies = async (): Promise<TrendingMovie[] | undefined> => {
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_NAME, [
            Query.limit(5),
            Query.orderDesc('count'),
        ])

        return result.documents as unknown as TrendingMovie[]
    } catch (error) {
        console.log(error);
        return undefined;
    }
}