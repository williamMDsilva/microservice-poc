import postgres, { Sql } from 'postgres'

export default function createDatabaseConnection(databaseStringConnection: string): Sql {
  return postgres(databaseStringConnection, { /* options */ })
}