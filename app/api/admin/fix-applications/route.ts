import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function POST(request: Request) {
  try {
    // Simple security - you can add better auth later
    const { secret } = await request.json()
    
    if (secret !== process.env.ADMIN_SESSION_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    console.log('Starting application fix...')
    
    const client = await clientPromise
    const db = client.db('fxg_applications')
    const collection = db.collection('applications')

    // Get all applications that don't have sessionUsername
    const applications = await collection.find({
      sessionUsername: { $exists: false }
    }).toArray()

    console.log(`Found ${applications.length} applications to fix`)

    let fixed = 0
    
    // Update each application
    for (const app of applications) {
      const update = {
        $set: {
          sessionUsername: app.discordUsername,
          sessionEmail: app.email || null
        }
      }

      await collection.updateOne(
        { _id: app._id },
        update
      )

      console.log(`Fixed application ${app.id} - set sessionUsername to: ${app.discordUsername}`)
      fixed++
    }

    return NextResponse.json({ 
      success: true, 
      message: `Fixed ${fixed} applications`,
      fixed 
    })
  } catch (error) {
    console.error('Error fixing applications:', error)
    return NextResponse.json(
      { error: 'Failed to fix applications', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}
