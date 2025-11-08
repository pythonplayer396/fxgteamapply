import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { discordId, applicantName, applicationType, status } = body

    console.log('Received career DM request:', { discordId, applicantName, applicationType, status })

    if (!discordId || !applicantName || !applicationType || !status) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Determine endpoint based on status
    let endpoint = ''
    if (status === 'approved') {
      endpoint = '/send-career-approval-dm'
    } else if (status === 'denied') {
      endpoint = '/send-career-denial-dm'
    } else {
      // Career applications don't have interview status
      return NextResponse.json({ success: true, message: 'No DM sent for this status' })
    }

    // Call bot API
    const botApiUrl = process.env.BOT_API_URL || 'https://fxg-bot-api.onrender.com'
    const botApiSecret = process.env.BOT_API_SECRET

    console.log('Bot API URL:', botApiUrl)
    console.log('Endpoint to call:', endpoint)

    if (!botApiSecret) {
      console.error('BOT_API_SECRET not configured')
      return NextResponse.json({ 
        error: 'Bot API not configured - missing BOT_API_SECRET environment variable' 
      }, { status: 500 })
    }

    const fullUrl = `${botApiUrl}${endpoint}`
    console.log('Calling bot API at:', fullUrl)

    const response = await fetch(fullUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${botApiSecret}`
      },
      body: JSON.stringify({
        discordId,
        applicantName,
        applicationType
      })
    })

    console.log('Bot API response status:', response.status)
    const data = await response.json()
    console.log('Bot API response data:', data)

    if (!response.ok) {
      console.error('Bot API error:', data)
      return NextResponse.json({ 
        error: 'Failed to send career DM',
        details: data 
      }, { status: response.status })
    }

    return NextResponse.json({ 
      success: true, 
      message: data.message 
    })
  } catch (error) {
    console.error('Error in send-career-dm route:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}
