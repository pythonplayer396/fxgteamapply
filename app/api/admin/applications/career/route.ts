import { NextResponse } from 'next/server'
import { readDatabase, updateApplication } from '@/lib/storage'

export async function GET() {
  try {
    const data = await readDatabase()
    const allApplications = data.applications || []
    
    console.log('Total applications in database:', allApplications.length)
    console.log('Sample application types:', allApplications.slice(0, 3).map((app: any) => ({
      type: app.type,
      applicationType: app.applicationType,
      careerType: app.careerType
    })))
    
    // Filter for career applications only
    const careerApplications = allApplications.filter(
      (app: any) => app.applicationType === 'career' || app.careerType
    )
    
    console.log('Filtered career applications:', careerApplications.length)
    console.log('Career apps:', careerApplications.map((app: any) => ({
      id: app.id,
      type: app.type,
      applicationType: app.applicationType,
      careerType: app.careerType
    })))
    
    return NextResponse.json(careerApplications)
  } catch (error) {
    console.error('Error fetching career applications:', error)
    return NextResponse.json(
      { error: 'Failed to fetch career applications' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, status } = body
    
    if (!id || !status) {
      return NextResponse.json(
        { error: 'Missing id or status' },
        { status: 400 }
      )
    }
    
    console.log('Updating career application:', { id, status })
    
    await updateApplication(id, {
      status,
      updatedAt: new Date().toISOString(),
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating career application:', error)
    return NextResponse.json(
      { error: 'Failed to update career application' },
      { status: 500 }
    )
  }
}
