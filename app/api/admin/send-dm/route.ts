import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    // Check admin authentication
    const cookieStore = cookies()
    const adminSession = cookieStore.get('admin_session')
    
    if (!adminSession) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { discordId, applicantName, applicationType, status } = await request.json()

    if (!discordId || !applicantName || !applicationType || !status) {
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

    if (!botApiSecret) {
      console.error('BOT_API_SECRET not configured')
      return NextResponse.json({ 
        error: 'Bot API not configured' 
      }, { status: 500 })
    }

    const response = await fetch(`${botApiUrl}${endpoint}`, {
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

    const data = await response.json()

    if (!response.ok) {
      console.error('Bot API error:', data)
      return NextResponse.json({ 
        error: 'Failed to send DM',
        details: data.error 
      }, { status: 500 })
    }

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
