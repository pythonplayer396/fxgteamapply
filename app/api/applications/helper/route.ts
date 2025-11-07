import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { getServerSession } from 'next-auth/next'
import { addApplication } from '@/lib/storage'

export async function POST(request: Request) {
  try {
    const session = await getServerSession()
    const body = await request.json()
    
    console.log('Received helper application:', body)
    console.log('Session user:', session?.user)
    console.log('Session user discordId:', (session?.user as any)?.discordId)
    
    const application = {
      id: uuidv4(),
      ...body,
      // Store Discord session info
      sessionUsername: session?.user?.name || body.discordUsername,
      sessionEmail: session?.user?.email,
      sessionDiscordId: (session?.user as any)?.discordId,
      sessionAvatar: session?.user?.image,
      status: 'pending',
      submittedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    
    console.log('Saving application with data:', application)
    
    await addApplication(application)
    
    console.log('Helper application saved successfully')
    
    return NextResponse.json({ success: true, id: application.id })
  } catch (error) {
    console.error('Error saving helper application:', error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to save application' },
      { status: 500 }
    )
  }
}
