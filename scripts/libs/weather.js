import { getWeatherForecast } from "../api/wheaterApi"

const weatherDescriptions = {
  0: "☀️ Céu limpo",
  1: "🌤 Parcialmente nublado",
  2: "⛅ Parcialmente nublado",
  3: "☁️ Nublado",
  45: "🌫 Névoa",
  61: "🌦 Chuva leve",
  63: "🌧 Chuva moderada",
  65: "🌧 Chuva forte",
  80: "🌦 Pancadas leves",
  95: "⛈ Tempestade",
  99: "🌩 Granizo"
}

export function getWeatherDescription(code) {
  return weatherDescriptions[code] || "🌈 Clima desconhecido"
}

export async function loadWeather(lat, lon) {
  const { daily } = await getWeatherForecast(lat, lon)

  const code = daily.weathercode[0]
  const description = getWeatherDescription(code) 
  const max = daily.temperature_2m_max[0]
  const min = daily.temperature_2m_min[0]

  return {
    description,
    code,
    max,
    min
  }
}