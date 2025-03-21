// remove all markdown features

export function sanitizeContent(content: string) {
  let sanitizedContent = content.replace(/[*_~#]/g, '')
  sanitizedContent = sanitizedContent.replace(/-/g, '▪️')
  return sanitizedContent
}
