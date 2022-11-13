export const verificarIcone = ( texto ) => {
  if (texto === "Drizzle") {
    return "cloud-drizzle"
  } else
  if (texto === "Thunderstorm") {
    return "cloud-lightning"
  } else
  if (texto === "Rain") {
    return "umbrella"
  } else
  if (texto === "Clear") {
    return "sun"
  } else
  if (texto === "Clouds") {
    return "cloud"
  } else
  if (texto === "Mist" || texto === "Smoke" || texto === "Haze" || texto === "Dust" || texto === "Fog" || texto === "Sand"
  || texto === "Ash" || texto === "Squall" || texto === "Tornado") {
    return "wind"
  }else{
    return "heart"
  }
}