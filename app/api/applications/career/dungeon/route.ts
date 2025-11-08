import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { getServerSession } from 'next-auth/next'
import { addApplication } from '@/lib/storage'
import { authOptions } from '@/lib/authOptions'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    const body = await request.json()
    
    console.log('Received dungeon career application:', body)
    console.log('Session user:', session?.user)
    
    const application = {
      id: uuidv4(),
      ...body,
      // Store Discord session info
      sessionUsername: session?.user?.name,
      sessionEmail: session?.user?.email,
      sessionDiscordId: body.discordId, // Use the manually entered Discord ID
      sessionAvatar: session?.user?.image,
      status: 'pending',
      submittedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      applicationType: 'career',
      careerType: 'dungeon',
    }
    
    console.log('Saving dungeon career application with data:', application)
    
    await addApplication(application)
    
    console.log('Dungeon career application saved successfully')
    
    return NextResponse.json({ success: true, id: application.id })
  } catch (error) {
    console.error('Error saving dungeon career application:', error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to save application' },
      { status: 500 }
    )
  }
}
