/**
 * Simplified Ethiopia border outline (lon, lat).
 * Emphasizes the distinctive eastern Ogaden projection and northern tip.
 */
export const ETHIOPIA_OUTLINE: [number, number][] = [
  [37.9, 14.85],
  [38.5, 14.7],
  [39.2, 14.45],
  [39.9, 14.1],
  [40.6, 13.6],
  [41.2, 13.0],
  [41.7, 12.4],
  [42.1, 11.8],
  [42.5, 11.2],
  [42.9, 10.6],
  [43.5, 10.1],
  [44.3, 9.6],
  [45.2, 9.1],
  [46.0, 8.5],
  [46.8, 7.9],
  [47.5, 7.2],
  [47.8, 6.3],
  [47.5, 5.5],
  [46.8, 4.9],
  [45.6, 4.4],
  [44.2, 4.0],
  [42.8, 3.7],
  [41.4, 3.55],
  [40.0, 3.6],
  [38.8, 3.9],
  [37.6, 4.4],
  [36.6, 5.1],
  [35.8, 5.9],
  [35.1, 6.8],
  [34.5, 7.7],
  [34.0, 8.6],
  [33.6, 9.5],
  [33.5, 10.4],
  [33.8, 11.2],
  [34.4, 11.9],
  [35.2, 12.5],
  [36.0, 13.1],
  [36.8, 13.7],
  [37.4, 14.3],
  [37.9, 14.85],
]

export const ETHIOPIA_NODES: { id: string; lon: number; lat: number; weight: number }[] = [
  { id: 'addis', lon: 38.75, lat: 9.03, weight: 1.0 },
  { id: 'dire-dawa', lon: 41.87, lat: 9.59, weight: 0.7 },
  { id: 'mekelle', lon: 39.47, lat: 13.5, weight: 0.65 },
  { id: 'bahir-dar', lon: 37.39, lat: 11.57, weight: 0.6 },
  { id: 'hawassa', lon: 38.48, lat: 7.05, weight: 0.55 },
  { id: 'jimma', lon: 36.83, lat: 7.67, weight: 0.5 },
  { id: 'gondar', lon: 37.47, lat: 12.61, weight: 0.5 },
  { id: 'jijiga', lon: 42.8, lat: 9.35, weight: 0.45 },
  { id: 'adama', lon: 39.27, lat: 8.54, weight: 0.55 },
  { id: 'dessie', lon: 39.63, lat: 11.13, weight: 0.4 },
]

export const ETHIOPIA_CENTER = { lon: 40.0, lat: 9.0 }
export const MAP_SCALE = 0.42

/** Project lon/lat → local XY for Shape (before extrude/rotate) */
export function projectToShape(lon: number, lat: number, scale = MAP_SCALE): [number, number] {
  const x = (lon - ETHIOPIA_CENTER.lon) * scale
  const y = (lat - ETHIOPIA_CENTER.lat) * scale
  return [x, y]
}

/** Project lon/lat → scene XZ after Extrude+rotateX(-PI/2) convention */
export function projectLonLat(lon: number, lat: number, scale = MAP_SCALE): [number, number] {
  const x = (lon - ETHIOPIA_CENTER.lon) * scale
  const z = -(lat - ETHIOPIA_CENTER.lat) * scale
  return [x, z]
}

/** AABB center of outline in shape space — matches ExtrudeGeometry.center() XZ */
export function getOutlineCenter(scale = MAP_SCALE): { x: number; z: number } {
  let minX = Infinity
  let maxX = -Infinity
  let minZ = Infinity
  let maxZ = -Infinity
  for (const [lon, lat] of ETHIOPIA_OUTLINE) {
    const [x, z] = projectLonLat(lon, lat, scale)
    minX = Math.min(minX, x)
    maxX = Math.max(maxX, x)
    minZ = Math.min(minZ, z)
    maxZ = Math.max(maxZ, z)
  }
  return { x: (minX + maxX) / 2, z: (minZ + maxZ) / 2 }
}
