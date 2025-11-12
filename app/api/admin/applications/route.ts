import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { logAuditEvent } from '@/lib/auditLog'
import { readDatabase, updateApplication, deleteApplication } from '@/lib/storage'

// Middleware to check admin authentication
function checkAdminAuth() {
  const cookieStore = cookies()
  const adminSession = cookieStore.get('admin_session')?.value
  const validToken = process.env.ADMIN_SESSION_SECRET || 'admin-authenticated'
  
  if (!adminSession || adminSession !== validToken) {
    return false
  }
  return true
}

export async function GET(request: Request) {
  // Check authentication
  if (!checkAdminAuth()) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const db = await readDatabase()
    console.log('Admin fetching applications, count:', db.applications?.length || 0)
    console.log('Applications data:', db.applications)
    return NextResponse.json(db.applications || [])
  } catch (error) {
    console.error('Error fetching applications for admin:', error)
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  // Check authentication
  if (!checkAdminAuth()) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const { id, status, type, careerType, applicationType } = await request.json()
    const db = await readDatabase()
    
    const app: any = db.applications.find((app: any) => app.id === id)
    if (app) {
      const updateData: any = {
        updatedAt: new Date().toISOString()
      }
      
      // Handle status updates
      if (status !== undefined) {
        const oldStatus = app.status
        updateData.status = status
        
        // Log status change
        await logAuditEvent({
          action: 'APPLICATION_STATUS_CHANGED',
          adminUser: 'admin', // In production, get from session
          targetId: id,
          targetType: 'application',
          details: {
            oldStatus,
            newStatus: status,
            applicationType: app.type,
            discordUsername: app.discordUsername
          }
        })
      }
      
      // Handle category updates
      if (type !== undefined || careerType !== undefined || applicationType !== undefined) {
        const oldCategory = app.careerType || app.type
        
        if (type !== undefined) updateData.type = type
        if (careerType !== undefined) updateData.careerType = careerType
        if (applicationType !== undefined) updateData.applicationType = applicationType
        
        // Clear conflicting fields
        if (type && (type === 'helper' || type === 'developer')) {
          updateData.careerType = null
          updateData.applicationType = null
        }
        
        // Log category change
        await logAuditEvent({
          action: 'APPLICATION_CATEGORY_CHANGED',
          adminUser: 'admin',
          targetId: id,
          targetType: 'application',
          details: {
            oldCategory,
            newCategory: careerType || type,
            discordUsername: app.discordUsername
          }
        })
      }
      
      await updateApplication(id, updateData)
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  // Check authentication
  if (!checkAdminAuth()) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { error: 'Application ID required' },
        { status: 400 }
      )
    }
    
    const db = await readDatabase()
    const appToDelete: any = db.applications.find((app: any) => app.id === id)
    
    await deleteApplication(id)
    
    // Log deletion
    if (appToDelete) {
      await logAuditEvent({
        action: 'APPLICATION_DELETED',
        adminUser: 'admin', // In production, get from session
        targetId: id,
        targetType: 'application',
        details: {
          applicationType: appToDelete.type,
          discordUsername: appToDelete.discordUsername,
          status: appToDelete.status
        }
      })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete application' },
      { status: 500 }
    )
  }
}
