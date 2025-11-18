import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import clientPromise from '@/lib/mongodb'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const session = await getServerSession()
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    console.log('Fetching applications for user:', session.user.name)
    
    const client = await clientPromise
    const db = client.db('fxg_applications')
    
    // Filter applications by the logged-in user - check multiple fields
    const userApplications = await db.collection('applications')
      .find({
        $or: [
          { sessionUsername: session.user.name },
          { discordUsername: session.user.name },
          { sessionEmail: session.user.email }
        ]
      })
      .toArray()

    console.log(`Found ${userApplications.length} applications for user`)

    // Return only necessary fields
    const sanitizedApps = userApplications.map((app: any) => ({
      id: app.id,
      type: app.type,
      status: app.status,
      discordUsername: app.discordUsername,
      submittedAt: app.submittedAt,
      updatedAt: app.updatedAt || app.submittedAt,
    }))

    return NextResponse.json(sanitizedApps)
  } catch (error) {
    console.error('Error fetching application status:', error)
    // Return empty array instead of error to prevent UI issues
    // This handles cases where MongoDB is unavailable
    return NextResponse.json([])
  }
}
