/**
 * This is a helper utility file for the migration-source.ts
 * configuration. It loads all compiled schema files so that
 * their side-effect registration runs before TypeORM
 * DataSource reads entities.
 */

import * as fs from 'fs'
import * as path from 'path'
import { pathToFileURL } from 'url'
import { promises as sfs } from 'fs'

function walkSync(dir: string, out: string[] = []): string[] {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    for (const e of entries) {
        const full = path.join(dir, e.name)
        if (e.isDirectory()) walkSync(full, out)
        else out.push(full)
    }
    return out
}

async function walk(
    dir: string,
    out: string[] = [],
): Promise<string[]> {
    const entries = await sfs.readdir(dir, { withFileTypes: true })
 
    for (const e of entries) {
        const full = path.join(dir, e.name)
        if (e.isDirectory()) await walk(full, out)
        else out.push(full)
    }
 
    return out
}

/**
 * Loads every compiled *.schema.js file so their
 * side-effect DatabaseTables.register(...) runs
 * before TypeORM DataSource reads entities.
 */
export function loadAllSchemasSync(distRootDir: string): void {
    const files = walkSync(distRootDir)
        .filter((f) => f.endsWith('.schema.js'))
        .filter((f) => !f.includes(`${path.sep}node_modules${path.sep}`))
        .sort((a, b) => a.localeCompare(b))

    // CJS require executes top-level code (where DatabaseTables.register(...) runs)
    for (const absPath of files) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        require(absPath)
    }
}

/**
 * Loads every compiled *.schema.js file so their
 * side-effect DatabaseTables.register(...) runs
 * before TypeORM DataSource reads entities.
 */
export async function loadAllSchemas(
    distRootDir: string
): Promise<void> {
    const files = await walk(distRootDir)
    const schemaFiles = files
        .filter((f) => f.endsWith('.schema.js'))
        // Optional safety: avoid node_modules if distRootDir is too broad
        .filter((f) => !f.includes(`${path.sep}node_modules${path.sep}`))

    // Deterministic order helps debugging
    schemaFiles.sort((a, b) => a.localeCompare(b))

    // Use dynamic import to execute module top-level code (register calls)
    await Promise.all(
        schemaFiles.map(async (absPath) => {
            const url = pathToFileURL(absPath).href
            await import(url)
        }),
    )
}
