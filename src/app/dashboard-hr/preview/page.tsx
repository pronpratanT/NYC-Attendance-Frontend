"use client"
import React from 'react'
import Calendar from '@/components/dashboard/calendar'
import CalendarTest from '@/components/dashboard/calendar_test'

export default function PreviewPage() {
  return (
    <div>
        <div>
            <Calendar />
        </div>
        <div className=''>
            <CalendarTest />
        </div>
    </div>
  )
}
