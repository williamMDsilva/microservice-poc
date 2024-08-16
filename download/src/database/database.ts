import postgres, { Sql } from 'postgres'
import { validate as isValidUUID } from 'uuid';


export default function saveStausDownload(databaseStringConnection: string, document: any): Sql {
  const sql: Sql = postgres(databaseStringConnection, { /* options */ })

  insertDocument(sql, document)

  return sql
}

async function insertDocument(sql: Sql, document: any) {
  const saveDocument = await sql`
      insert into "document"
        (   id,
            data,
            ready
        )
      values
        (
            ${document?.nf?.props?.id},
            ${JSON.stringify(document)},
            false
        )
      returning id, ready;
    `

  return {
    id: saveDocument[0].id
  }
}

export async function updateDocumentStatus(databaseStringConnection: string, id: string) {
  const sql: Sql = postgres(databaseStringConnection, { /* options */ })

  if (!isValidUUID(id)) {
    throw new Error("Invalid document")
  }

  await sql`
        UPDATE "document" SET ready = true WHERE id = ${id};
    `

  return {
    id
  }
}
