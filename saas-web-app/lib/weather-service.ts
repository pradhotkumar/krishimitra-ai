// OpenWeatherMap API Integration
interface WeatherData {
  temperature: number;
  humidity: number;
  rainfall: number;
  windSpeed: number;
  description: string;
  lastUpdated: string;
}

export async function getWeatherData(region: string): Promise<WeatherData> {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  
  if (!apiKey) {
    throw new Error('OpenWeatherMap API key not configured');
  }

  try {
    // Fetch current weather
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(region)},IN&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.statusText}`);
    }

    const data = await response.json();

    return {
      temperature: Math.round(data.main.temp),
      humidity: data.main.humidity,
      rainfall: data.rain?.['1h'] || 0,
      windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
      description: data.weather[0].description,
      lastUpdated: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Weather API error:', error);
    throw error;
  }
}

export async function getWeatherForecast(region: string) {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  
  if (!apiKey) {
    throw new Error('OpenWeatherMap API key not configured');
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(region)},IN&appid=${apiKey}&units=metric&cnt=8`
    );

    if (!response.ok) {
      throw new Error(`Weather forecast API error: ${response.statusText}`);
    }

    const data = await response.json();

    return data.list.map((item: any) => ({
      time: item.dt_txt,
      temperature: Math.round(item.main.temp),
      description: item.weather[0].description,
      rainfall: item.rain?.['3h'] || 0,
    }));
  } catch (error) {
    console.error('Weather forecast API error:', error);
    throw error;
  }
}
