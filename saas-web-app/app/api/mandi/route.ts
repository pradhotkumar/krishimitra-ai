import { NextRequest, NextResponse } from 'next/server';
import { getMandiPrices, searchCommodity } from '@/lib/mandi-service';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const state = searchParams.get('state');
  const district = searchParams.get('district');
  const commodity = searchParams.get('commodity');

  if (!state && !commodity) {
    return NextResponse.json(
      { error: 'State or commodity parameter is required' },
      { status: 400 }
    );
  }

  try {
    let prices;
    
    if (commodity) {
      prices = await searchCommodity(commodity, state || undefined);
    } else {
      prices = await getMandiPrices(state!, district || undefined);
    }

    return NextResponse.json({
      prices: prices,
      state: state,
      district: district,
      commodity: commodity,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Mandi API route error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch mandi prices' },
      { status: 500 }
    );
  }
}
