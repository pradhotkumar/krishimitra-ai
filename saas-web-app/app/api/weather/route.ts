import { NextRequest, NextResponse } from 'next/server';
import { getWeatherData, getWeatherForecast } from '@/lib/weather-service';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const region = searchParams.get('region');

  if (!region) {
    return NextResponse.json(
      { error: 'Region parameter is required' },
      { status: 400 }
    );
  }

  try {
    const [currentWeather, forecast] = await Promise.all([
      getWeatherData(region),
      getWeatherForecast(region),
    ]);

    return NextResponse.json({
      current: currentWeather,
      forecast: forecast,
      region: region,
    });
  } catch (error: any) {
    console.error('Weather API route error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}
