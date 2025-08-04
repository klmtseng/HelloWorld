export function generateLevel() {
  const size = 10
  const tileSize = 64
  const grid = Array.from({ length: size }, () => Array(size).fill('wall'))
  const rooms = []
  const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

  while (rooms.length < 4) {
    const w = rand(2, 3)
    const h = rand(2, 3)
    const x = rand(0, size - w)
    const y = rand(0, size - h)
    const room = { x, y, w, h }
    let overlap = false
    for (const r of rooms) {
      if (x + w > r.x && x < r.x + r.w && y + h > r.y && y < r.y + r.h) {
        overlap = true
        break
      }
    }
    if (overlap) continue
    rooms.push(room)
    for (let yy = y; yy < y + h; yy++) {
      for (let xx = x; xx < x + w; xx++) {
        grid[yy][xx] = 'room'
      }
    }
  }

  for (let i = 1; i < rooms.length; i++) {
    const prev = rooms[i - 1]
    const curr = rooms[i]
    const x1 = Math.floor(prev.x + prev.w / 2)
    const y1 = Math.floor(prev.y + prev.h / 2)
    const x2 = Math.floor(curr.x + curr.w / 2)
    const y2 = Math.floor(curr.y + curr.h / 2)
    for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
      if (grid[y1][x] === 'wall') grid[y1][x] = 'corridor'
    }
    for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
      if (grid[y][x2] === 'wall') grid[y][x2] = 'corridor'
    }
  }

  return { grid, rooms, tileSize }
}
