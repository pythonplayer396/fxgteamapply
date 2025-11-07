import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    console.log('=== Discord DM API Called ===')
    
    // Check admin authentication
    const cookieStore = cookies()
    const adminSession = cookieStore.get('admin_session')
    
    if (!adminSession) {
      console.error('No admin session found')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { discordId, applicantName, applicationType, status } = await request.json()
    
    console.log('Request data:', { discordId, applicantName, applicationType, status })

    if (!discordId || !applicantName || !applicationType || !status) {
      console.error('Missing required fields')
      return NextResponse.json({ 
        error: 'Missing required fields' 
      }, { status: 400 })
    }

    // Determine which endpoint to call based on status
    let endpoint = ''
    if (status === 'interview') {
      endpoint = '/send-interview-dm'
    } else if (status === 'approved') {
      endpoint = '/send-approval-dm'
    } else if (status === 'denied' || status === 'interview_failed') {
      endpoint = '/send-denial-dm'
    } else {
      // No DM needed for other statuses
      return NextResponse.json({ success: true, message: 'No DM sent for this status' })
    }

    // Call bot API
    const botApiUrl = process.env.BOT_API_URL || 'https://fxg-bot-api.onrender.com'
    const botApiSecret = process.env.BOT_API_SECRET

    console.log('Bot API URL:', botApiUrl)
    console.log('Bot API Secret configured:', !!botApiSecret)
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
        error: 'Failed to send DM',
        details: data.error || data 
      }, { status: 500 })
    }

    console.log('✅ Discord DM sent successfully!')
    return NextResponse.json({ 
      success: true, 
      message: 'Discord DM sent successfully' 
    })
  } catch (error) {
    console.error('Error sending Discord DM:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
