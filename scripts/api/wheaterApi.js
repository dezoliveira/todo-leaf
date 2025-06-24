const url = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m"

export const getWeatherForecast = async (lat, lon) => {

  try {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto`)
    const data = await response.json()
    console.log(data)
    return data 

  } catch (error) {
    console.error('Erro ao exibir os dados', error)
  }
}