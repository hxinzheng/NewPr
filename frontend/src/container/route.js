export const pages = [
  "home",
  "list"
]

export const nextIndex = index => ++index % pages.length

export const indexFromPath = path => {
  path = path === '/' ? '/home' : path
  return pages.indexOf(path.substr(1))
}