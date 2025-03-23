import type { LibSQLDatabase } from 'drizzle-orm/libsql'
import process from 'node:process'
import { createClient as createLibSQLClient } from '@libsql/client/http'
import { drizzle as drizzleLibSQL } from 'drizzle-orm/libsql'

export * as tables from '../database/schema'

let database: LibSQLDatabase<typeof tables> | null = null

export function useDatabase() {
  const { tursoDBURL, tursoDBToken } = useRuntimeConfig()

  if (tursoDBURL && tursoDBToken) {
    database = drizzleLibSQL(
      createLibSQLClient({
        url: process.env.TURSO_DB_URL!,
        authToken: process.env.TURSO_DB_TOKEN!,
      }),
    )
  }

  return database
}
