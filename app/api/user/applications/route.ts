import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import clientPromise from '@/lib/mongodb'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const session = await getServerSession()
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    console.log('Fetching user applications for:', session.user.name)
    
    const client = await clientPromise
    const db = client.db('fxg_applications')
    
    // Filter applications by user - check multiple fields
    const userApps = await db.collection('applications')
      .find({
        $or: [
          { sessionUsername: session.user.name },
          { discordUsername: session.user.name },
          { sessionEmail: session.user.email },
          { email: session.user.email }
        ]
      })
      .toArray()

    console.log(`Found ${userApps.length} applications`)

    return NextResponse.json(userApps)
  } catch (error) {
    console.error('Error fetching user applications:', error)
    return NextResponse.json([])
  }
}
