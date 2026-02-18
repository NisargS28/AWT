import { Client, Account } from 'appwrite'

// Initialize Appwrite Client
const client = new Client()

client
  .setEndpoint('https://cloud.appwrite.io/v1') // Appwrite API Endpoint
  .setProject('699587e9000cb41512e2') // Your project ID - Replace this with your actual project ID

// Create account instance
const account = new Account(client)

export { client, account }
