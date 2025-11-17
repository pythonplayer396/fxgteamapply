import { MongoClient } from 'mongodb'

// Get MongoDB URI from environment
const uri = process.env.MONGODB_URI

// MongoDB connection options
const options = {}

let client: MongoClient
let clientPromise: Promise<MongoClient>

// Create a safe connection function that never throws at module level
function createConnection(): Promise<MongoClient> {
  // If no URI is provided, return a rejected promise
  // This is safe for build time as it doesn't throw synchronously
  if (!uri) {
    return Promise.reject(new Error('MongoDB URI is not configured. Please set MONGODB_URI environment variable.'))
  }

  try {
    client = new MongoClient(uri, options)
    return client.connect()
  } catch (error) {
    // Return rejected promise instead of throwing
    return Promise.reject(error)
  }
}

// Initialize connection based on environment
if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable to preserve connection across HMR
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }
  
  if (!globalWithMongo._mongoClientPromise) {
    globalWithMongo._mongoClientPromise = createConnection()
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  // In production mode, create a new connection
  clientPromise = createConnection()
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise
