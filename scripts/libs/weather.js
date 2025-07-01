import { getWeatherForecast } from "../api/wheaterApi"

const weatherDescriptions = {
  0: "Céu limpo",
  1: "Parcialmente nublado",
  2: "Parcialmente nublado",
  3: "Nublado",
  45: "Névoa",
  61: "Chuva leve",
  63: "Chuva moderada",
  65: "Chuva forte",
  80: "Pancadas leves",
  95: "Tempestade",
  99: "Granizo"
}

const weatherIcons = {
  0: "fas fa-sun",
  1: "fas fa-cloud-sun",
  2: "fas fa-cloud",
  3: "fas fa-cloud",
  45: "fas fa-smog",
  61: "fas fa-cloud-showers-heavy",
  63: "fas fa-cloud-rain",
  65: "fas fa-cloud-showers-heavy",
  80: "fas fa-cloud-sun-rain",
  95: "fas fa-bolt",
  99: "fas fa-poo-storm"
}

export function getWeatherDescription(code) {
  return weatherDescriptions[code] || "🌈 Clima desconhecido"
}

export function getWeatherIcons(code) {
  return weatherIcons[code] || "fas fa-question"
}

export async function loadWeather(lat, lon, index=0) {
  const { daily } = await getWeatherForecast(lat, lon)

  const code = daily.weathercode[index]
  const icon = getWeatherIcons(code)
  const description = getWeatherDescription(code) 
  const max = daily.temperature_2m_max[index]
  const min = daily.temperature_2m_min[index]

  return {
    code,
    icon,
    description,
    max,
    min
  }
}