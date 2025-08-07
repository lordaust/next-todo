import { NextResponse } from 'next/server'

/**
 * Health check endpoint that responds with "pong" to any ping request
 * Used for monitoring service availability and basic connectivity testing
 */
export async function GET() {
  return NextResponse.json(
    { 
      message: 'pong',
      timestamp: new Date().toISOString(),
      status: 'healthy'
    },
    { 
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    }
  )
}

/**
 * Also handle POST requests for ping (some monitoring tools prefer POST)
 */
export async function POST() {
  return NextResponse.json(
    { 
      message: 'pong',
      timestamp: new Date().toISOString(),
      status: 'healthy'
    },
    { 
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    }
  )
}
