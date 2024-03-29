"use client"

import { User, HelpCircle, Users, Home, Shield, Activity, ChevronRight, Play, FileQuestion, CheckCircle, LogIn, Cog, PlusCircle, CheckCheck, Check, UsersIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactElement } from 'react'


const HomeItem = {
  id: 'G0ic',
  label: 'Anasayfa',
  icon: <Home size='0.875rem' />,
  path: '/',
  parent: []
}
const nthSurvey = {
  id: '5bMj',
  label: '. Anket',
  icon: <Check size='1rem' />,
  path: '/admin/survey/ended/',
  parent: ['G0ic', '1jvg', 'SkDk',]
}
const nthPartipiciant = {
  id: '60Mj',
  label: '. Katılımcı',
  icon: <User size='1rem' />,
  path: '/admin/participant/',
  parent: ['G0ic', 'g8Dk']
}
const nthQuestion = {
  id: 'Rkow',
  label: " id'li Soru",
  icon: <HelpCircle size='1rem' />,
  path: '/admin/survey/running/',
  parent: ['G0ic', '1jvg', 'RwiS']
} 
const routes = [
  nthPartipiciant,
  nthSurvey,
  nthQuestion, 
  {
    id: 'SkDk',
    label: 'Tamamlanmış Anketler',
    icon: <CheckCheck size='1rem' />,
    path: '/admin/survey/ended',
    parent: ['G0ic', '1jvg',]
  },
  {
    id: 'g8Dk',
    label: 'Katılımcılar',
    icon: <Users size='1rem' />,
    path: '/admin/participant',
    parent: ['G0ic',]
  },
  {
    id: '458k',
    label: 'Yeni Katılımcı',
    icon: <User size='1rem' />,
    path: '/admin/participant/new',
    parent: ['G0ic', 'g8Dk']
  },
  {
    id: 'D9nt',
    label: 'Yeni Anket',
    icon: <PlusCircle size='1rem' />,
    path: '/admin/survey/new',
    parent: ['G0ic', '1jvg',]
  },
  {
    id: '04Cq',
    label: 'Yayınlanmamış Anket',
    icon: <Cog size='1rem' />,
    path: '/admin/survey/pre',
    parent: ['G0ic', '1jvg',]
  },
  {
    id: 'RwiS',
    label: 'Aktif Anket',
    icon: <Activity size='1rem' />,
    path: '/admin/survey/running',
    parent: ['G0ic', '1jvg',]
  },
  {
    id: '1jvg',
    label: 'Admin',
    icon: <Shield size='1rem' />,
    path: '/admin',
    parent: ['G0ic']
  },
  {
    id: 'ZNI1',
    label: 'Giriş yap',
    path: '/login',
    icon: <LogIn size='1rem' />,
    parent: ['G0ic']
  },
  {
    id: 'sE9s',
    label: 'Anket tamamlandı',
    path: '/survey/completed',
    icon: <CheckCircle size='1rem' />,
    parent: ['G0ic']
  },
  {
    id: '0jmc',
    label: 'Anket soruları',
    icon: <FileQuestion size='1rem' />,
    path: '/survey/questions',
    parent: ['G0ic']
  },
  {
    id: 'uQ0f',
    label: 'Ankete Başla',
    icon: <Play size='1rem' />,
    path: '/survey',
    parent: ['G0ic']
  },
  {
    id: '0Qtf',
    label: 'Anket Raporu',
    icon: <UsersIcon size='1rem' />,
    path: '/admin/report/survey',
    parent: ['G0ic']
  },
  {
    id: '1Qtf',
    label: 'Soru Raporu',
    icon: <UsersIcon size='1rem' />,
    path: '/admin/report/question',
    parent: ['G0ic']
  },
  {
    id: '2Qtf',
    label: 'Cevap Raporu',
    icon: <UsersIcon size='1rem' />,
    path: '/admin/report/answer',
    parent: ['G0ic']
  },
  {
    id: '2Qtf',
    label: "Anket Katılım Raporu",
    icon: <UsersIcon size='1rem' />,
    path: '/admin/report/survey-voters',
    parent: ['G0ic']
  },
  HomeItem
]

export function BreadCrumb() {
  const path = usePathname()
  const parents = [] as {
    id: string;
    label: string;
    icon: JSX.Element;
    path: string;
    parent: string[];
  }[]
  
  if (/\d/.test(path)) {

    let arr;

    if (path.includes('participant')) {
      arr = nthPartipiciant
    }
    else if (path.includes('running')) {
      arr = nthQuestion
    } 
    else {
      arr = nthSurvey
    }

    const surveyId = path.replace(/^\D+/g, '');

    arr.parent.forEach(p => {
      const parent = routes.find(r => r.id == p)!
      parents.push(parent)
    });

    parents.push({
      id: arr.id,
      icon: arr.icon,
      parent: [],
      path: arr.path + surveyId,
      label: surveyId + arr.label
    })
  }
  else {
    const match = routes.find(r => r.path == path)
    if (!match) {
      parents.push(HomeItem)
    }
    else {
      match.parent.forEach(p => {
        const parent = routes.find(r => r.id == p)!
        parents.push(parent)
      });

    }

    parents.push(match!)
  }

  return (
    <div className='flex mt-2 p-2 w-full text-sm flex-wrap sm:flex-nowrap items-center justify-start'>
      {parents.map((parent, i) => {
        return (
          <div key={parent.id} className='flex items-center'>
            <Link href={parent.path}>
              <Sp i={parent.icon} v={parent.label} />
            </Link>
            {i + 1 != parents.length &&
              <>
                &nbsp;<ChevronRight size='1.25rem' />&nbsp;
              </>
            }
          </div>
        )
      })}
    </div>
  )
}

interface SProps {
  v: string,
  i: ReactElement
}
function Sp({ v, i }: SProps) {
  return (
    <span className='flex items-center'>
      {i}&nbsp;{v}
    </span>
  );
}