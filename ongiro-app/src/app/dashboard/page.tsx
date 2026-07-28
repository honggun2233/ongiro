import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import DashboardClient from './DashboardClient'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  const { data: memorials } = await supabase
    .from('memorials')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return <DashboardClient user={user} memorials={memorials ?? []} />
}
