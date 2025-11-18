import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    console.log('=== Discord DM API Called ===')
    
    const { discordId, applicantName, applicationType, status, isCareer } = await request.json()
    
    // Check admin authentication only for non-career applications
    if (!isCareer) {
      const cookieStore = cookies()
      const adminSession = cookieStore.get('admin_session')
      
      if (!adminSession) {
        console.error('No admin session found')
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
    }
    
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
    } else if (status === 'denied' || status === 'declined' || status === 'interview_failed') {
      endpoint = '/send-denial-dm'
    } else {
      // No DM needed for other statuses
      return NextResponse.json({ success: true, message: 'No DM sent for this status' })
    }

    // Call bot API
    const botApiUrl = process.env.BOT_API_URL || 'https://api-dgm0.onrender.com'
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

    // Create an AbortController for timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 25000) // 25 second timeout

    try {
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
        }),
        signal: controller.signal
      })

      clearTimeout(timeoutId)
      console.log('Bot API response status:', response.status)

      // Check if response is ok before trying to parse JSON
      if (!response.ok) {
        let errorData
        try {
          const text = await response.text()
          errorData = text ? JSON.parse(text) : { error: `HTTP ${response.status}` }
        } catch {
          errorData = { error: `HTTP ${response.status}: ${response.statusText}` }
        }
        console.error('Bot API error:', errorData)
        return NextResponse.json({ 
          error: 'Failed to send DM',
          details: errorData.error || errorData 
        }, { status: response.status >= 500 ? 502 : 500 })
      }

      // Safely parse JSON response
      let data
      try {
        const text = await response.text()
        data = text ? JSON.parse(text) : {}
      } catch (parseError) {
        console.error('Failed to parse bot API response:', parseError)
        return NextResponse.json({ 
          error: 'Invalid response from bot API',
          details: 'Response was not valid JSON'
        }, { status: 502 })
      }

      console.log('Bot API response data:', data)
      console.log('✅ Discord DM sent successfully!')
      return NextResponse.json({ 
        success: true, 
        message: 'Discord DM sent successfully' 
      })
    } catch (fetchError: any) {
      clearTimeout(timeoutId)
      
      if (fetchError.name === 'AbortError') {
        console.error('Bot API request timed out after 25 seconds')
        return NextResponse.json({ 
          error: 'Request timeout',
          details: 'The bot API did not respond in time. Please try again later.'
        }, { status: 504 })
      }
      
      throw fetchError // Re-throw other errors to be caught by outer catch
    }
  } catch (error) {
    console.error('Error sending Discord DM:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
