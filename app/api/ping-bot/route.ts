import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const botApiUrl = process.env.BOT_API_URL || 'https://idk-rx11.onrender.com'
    // Use /ping endpoint for lightweight keep-alive
    const pingUrl = `${botApiUrl}/ping`
    
    console.log('Pinging bot API to keep it awake...')
    const response = await fetch(pingUrl, {
      method: 'GET',
    })
    
    const data = await response.json()
    console.log('Bot API ping response:', data)
    
    return NextResponse.json({ 
      success: true, 
      botStatus: data 
    })
  } catch (error) {
    console.error('Error pinging bot API:', error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    })
  }
}
