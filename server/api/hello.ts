export default defineEventHandler((event) => {
    // extract the "from" query parameter
    const from = getQuery(event)?.from || 'tairo'
  
    return `Hello ${from}!`
  })
  