import type { LibSQLDatabase } from 'drizzle-orm/libsql'
import { createClient as createLibSQLClient } from '@libsql/client/http'
import { drizzle as drizzleLibSQL } from 'drizzle-orm/libsql'

export * as tables from '~/server/database/schema'

let database: LibSQLDatabase | null = null

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
