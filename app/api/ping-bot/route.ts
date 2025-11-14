import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const botApiUrl = process.env.BOT_API_URL || 'https://9fa4d7be-3f4f-429e-bc01-ed0dca695ca9-00-35wnnn8ahjqm3.pike.replit.dev/'
    
    console.log('Pinging bot API to keep it awake...')
    const response = await fetch(botApiUrl, {
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
