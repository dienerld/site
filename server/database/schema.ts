import { relations, sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const notes = sqliteTable('notes', {
  slug: text('slug').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  description: text('description').notNull(),
  isDraft: integer('is_draft', { mode: 'boolean' }).default(true),
  publishedOnLinkedin: integer('published_on_linkedin', { mode: 'boolean' }).default(false),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(CURRENT_DATE)`),
})

export const projects = sqliteTable('projects', t => ({
  id: t.integer('id').primaryKey({ autoIncrement: true }),
  name: t.text('name').notNull(),
  description: t.text('description').notNull(),
  stack: t.text('stack', { enum: ['full-stack', 'backend', 'frontend', 'mobile'] }).notNull(),
  demo: t.text('demo').notNull(),
  createdAt: t.integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(CURRENT_DATE)`),
  updatedAt: t.integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(CURRENT_DATE)`),
}))

export const technology = sqliteTable('technologies', t => ({
  id: t.integer('id').primaryKey({ autoIncrement: true }),
  name: t.text('name').notNull(),
  icon: t.text('icon').notNull(),
  classColor: t.text('class_color'),
}))

export const sources = sqliteTable('sources', t => ({
  id: t.integer('id').primaryKey({ autoIncrement: true }),
  projectId: t.integer('project_id').references(() => projects.id),
  name: t.text('name').notNull(),
  url: t.text('url').notNull(),
}))

export const projectTechnologies = sqliteTable('project_technologies', t => ({
  projectId: t.integer('project_id').references(() => projects.id),
  technologyId: t.integer('technology_id').references(() => technology.id),
}))

export const projectRelations = relations(projects, ({ many }) => ({
  technologies: many(projectTechnologies, { relationName: 'project_technologies' }),
  sources: many(sources, { relationName: 'project_sources' }),
}))
