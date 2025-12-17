export const envs = {
  kover: {
    url: import.meta.env.VITE_KOVER_API_URL || 'https://dev.kover.do/api',
    local:import.meta.env.VITE_KOVER_API_URL || 'http://localhost:3000/api'
  }
}