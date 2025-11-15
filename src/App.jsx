import React, { useEffect, useMemo, useState } from 'react'
import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'
import { ArrowDown, Moon, Sun, Mail, Download, ExternalLink } from 'lucide-react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function useFetch(path, initial = []) {
  const url = useMemo(() => `${API_BASE}${path}`, [path])
  const [data, setData] = useState(initial)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    let active = true
    setLoading(true)
    fetch(url)
      .then(r => r.json())
      .then(d => { if (active) { setData(d); setLoading(false) }})
      .catch(() => { if (active) { setData(initial); setLoading(false) }})
    return () => { active = false }
  }, [url])
  return { data, loading }
}

function DarkModeToggle() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])
  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setDark(d => !d)}
      className="fixed right-6 top-6 z-30 inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/40 backdrop-blur px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-white/90 dark:hover:bg-black/60 transition"
    >
      {dark ? <Sun className="w-4 h-4"/> : <Moon className="w-4 h-4"/>}
      <span className="hidden md:inline">{dark ? 'Light' : 'Dark'} mode</span>
    </button>
  )
}

function Nav() {
  const items = [
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#collections', label: 'Collections' },
    { href: '#experience', label: 'Experience' },
    { href: '#services', label: 'Services' },
    { href: '#contact', label: 'Contact' },
  ]
  return (
    <nav className="pointer-events-none fixed inset-x-0 top-0 z-20">
      <div className="pointer-events-auto mx-auto max-w-6xl px-6 py-5 flex items-center justify-between">
        <a href="#" className="font-medium tracking-tight text-gray-900 dark:text-white">Aryan Gupta</a>
        <div className="hidden md:flex items-center gap-6 text-sm text-gray-700 dark:text-gray-300">
          {items.map(it => (
            <a key={it.href} href={it.href} className="hover:opacity-70 transition">{it.label}</a>
          ))}
        </div>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="relative h-[90vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/xzUirwcZB9SOxUWt/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/40 to-white/80 dark:from-black/60 dark:via-black/30 dark:to-black/70 pointer-events-none" />

      <div className="relative z-10 h-full mx-auto max-w-6xl px-6 flex flex-col justify-center">
        <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.7}} className="text-5xl md:text-7xl font-semibold tracking-tight text-gray-900 dark:text-white">Aryan Gupta</motion.h1>
        <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.7, delay:0.1}} className="mt-4 text-xl md:text-2xl text-gray-700 dark:text-gray-200">Visual Designer | Systems Thinker | Storyteller</motion.p>
        <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.7, delay:0.2}} className="mt-6 max-w-2xl text-gray-600 dark:text-gray-300">A minimal, editorial-style portfolio showcasing research-driven design, systems thinking, and expressive visuals.</motion.p>
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1, duration:0.6, repeat:Infinity, repeatType:'reverse'}} className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-700 dark:text-gray-300">
          <ArrowDown className="w-6 h-6 animate-bounce" />
        </motion.div>
      </div>
    </section>
  )
}

function About({ profile }) {
  const p = profile?.[0]
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <div className="grid md:grid-cols-3 gap-12 items-start">
        <div className="md:col-span-2">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">About</h2>
          <p className="mt-6 text-gray-700 dark:text-gray-300 leading-relaxed">{p?.bio || 'Master of Design student at NIFT Panchkula (2024–2026). Passionate about information design, systems thinking, and visual storytelling across mediums.'}</p>
          <div className="mt-8 grid sm:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400">Education</h3>
              <ul className="mt-3 space-y-2 text-gray-800 dark:text-gray-200">
                {(p?.education?.length ? p.education : ['Master of Design — NIFT Panchkula (2024–2026)']).map((e,i)=>(
                  <li key={i}>• {e}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400">Skills</h3>
              <p className="mt-3 text-gray-800 dark:text-gray-200">{(p?.skills_design||['Visual Design','Information Design','System Mapping']).join(' • ')}</p>
              <p className="mt-1 text-gray-800 dark:text-gray-200">{(p?.skills_tech||['Figma','Adobe Suite','Prototyping']).join(' • ')}</p>
            </div>
          </div>
          <p className="mt-8 text-gray-700 dark:text-gray-300">{p?.philosophy || 'Design is a way to narrate systems, reduce complexity, and craft meaningful experiences.'}</p>
        </div>
        <div className="md:col-span-1">
          <div className="aspect-[3/4] w-full rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700 shadow-inner" />
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
            <a href={`mailto:${p?.email||'hello@example.com'}`} className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/10 transition"><Mail className="w-4 h-4"/> Email</a>
            <a href={p?.resume_url||'#'} className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/10 transition"><Download className="w-4 h-4"/> Resume</a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Projects({ projects }) {
  const list = projects?.length ? projects : [
    { title: 'Information System for Campus Mobility', summary: 'Wayfinding and data storytelling', tags:['Information Design','UX'], cover_image: '' },
    { title: 'Visual Identity for Creative Collective', summary: 'Modular system and brand toolkit', tags:['Identity','Systems'], cover_image: '' },
    { title: 'Product Concept — Camera of 2030', summary: 'Speculative design & interaction', tags:['Concept','Vision'], cover_image: '' },
  ]
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <div className="flex items-end justify-between">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">Featured Projects</h2>
        <a href="#" className="text-sm text-gray-600 dark:text-gray-300 hover:opacity-70">View all</a>
      </div>
      <div className="mt-10 grid md:grid-cols-3 gap-6">
        {list.map((p, i) => (
          <a key={i} href="#" className="group block rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-white/60 dark:bg-black/30 backdrop-blur hover:shadow-xl transition">
            <div className="aspect-[4/3] w-full bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700" />
            <div className="p-5">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400">
                {p.tags?.slice(0,2).map((t,idx)=>(<span key={idx}>{t}</span>))}
              </div>
              <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white group-hover:translate-x-0.5 transition-transform">{p.title}</h3>
              <p className="mt-1 text-gray-600 dark:text-gray-300">{p.summary}</p>
              <div className="mt-3 inline-flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
                Read case <ExternalLink className="w-4 h-4"/>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

function Collections({ items }) {
  const list = items?.length ? items : Array.from({length:8}).map((_,i)=>({ title:`Study ${i+1}`, category: i%2? 'Photography':'Visual Design', image_url: '' }))
  return (
    <section id="collections" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">Collections</h2>
      <div className="mt-8 columns-1 sm:columns-2 md:columns-3 gap-4 [column-fill:_balance]"><div className="contents">
        {list.map((it, i) => (
          <div key={i} className="mb-4 break-inside-avoid rounded-xl overflow-hidden border border-black/10 dark:border-white/10 bg-white/60 dark:bg-black/30">
            <div className="aspect-[4/5] w-full bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700" />
            <div className="p-3">
              <div className="text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400">{it.category}</div>
              <div className="text-gray-900 dark:text-white">{it.title}</div>
            </div>
          </div>
        ))}
      </div></div>
    </section>
  )
}

function Experience({ items }) {
  const list = items?.length ? items : [
    { type:'Internship', role:'Design Intern', org:'Studio Alpha', start:'2023', end:'2023', description:'Worked on visual systems and UI.'},
    { type:'Leadership', role:'Club Lead', org:'Fashion Club', start:'2022', end:'2023', description:'Led events and collaborations.'},
    { type:'Volunteering', role:'Volunteer', org:'Design for Good', start:'2021', description:'Community-centered design.'},
  ]
  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">Experience</h2>
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        {list.map((e, i) => (
          <div key={i} className="rounded-2xl border border-black/10 dark:border-white/10 p-6 bg-white/60 dark:bg-black/30 backdrop-blur">
            <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">{e.type}</div>
            <div className="mt-1 text-lg text-gray-900 dark:text-white">{e.role} — {e.org}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">{e.start}{e.end?`–${e.end}`:''}</div>
            {e.description && (<p className="mt-3 text-gray-700 dark:text-gray-300">{e.description}</p>)}
          </div>
        ))}
      </div>
    </section>
  )
}

function Services({ items }) {
  const list = items?.length ? items : [
    { title: 'Information Design', description: 'Turning complexity into clarity across reports, maps, and systems.' },
    { title: 'System Mapping', description: 'Visualizing relationships, feedback loops, and flows.' },
    { title: 'Product & UI/UX Concepts', description: 'Research-driven concepts and interaction models.' },
    { title: 'Visual Identity', description: 'Modular identities and expressive visual language.' },
    { title: 'Creative Direction', description: 'Story-driven campaigns and art direction.' },
  ]
  return (
    <section id="services" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">What I Do</h2>
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        {list.map((s, i) => (
          <div key={i} className="rounded-2xl border border-black/10 dark:border-white/10 p-6 bg-white/60 dark:bg-black/30 backdrop-blur">
            <div className="text-lg text-gray-900 dark:text-white">{s.title}</div>
            <p className="mt-2 text-gray-700 dark:text-gray-300">{s.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function Contact() {
  const [state, setState] = useState({ name:'', email:'', message:'' })
  const [status, setStatus] = useState('')
  const submit = async (e) => {
    e.preventDefault()
    setStatus('Sending…')
    try {
      const r = await fetch(`${API_BASE}/api/contact`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(state) })
      if (!r.ok) throw new Error('Failed')
      setStatus('Thanks — I will get back to you soon.')
      setState({ name:'', email:'', message:'' })
    } catch {
      setStatus('Could not send right now. Please email me instead.')
    }
  }
  return (
    <section id="contact" className="mx-auto max-w-3xl px-6 py-20 md:py-28">
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">Contact</h2>
      <form onSubmit={submit} className="mt-8 grid gap-4">
        <input required value={state.name} onChange={e=>setState(s=>({...s, name:e.target.value}))} placeholder="Your name" className="rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/30 px-4 py-3 outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10" />
        <input required type="email" value={state.email} onChange={e=>setState(s=>({...s, email:e.target.value}))} placeholder="Email" className="rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/30 px-4 py-3 outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10" />
        <textarea required value={state.message} onChange={e=>setState(s=>({...s, message:e.target.value}))} placeholder="Message" rows={6} className="rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/30 px-4 py-3 outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10" />
        <div className="flex items-center gap-4">
          <button className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 px-5 py-2.5 text-gray-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition">Send</button>
          <span className="text-sm text-gray-600 dark:text-gray-300">{status}</span>
        </div>
      </form>
    </section>
  )
}

function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-6 py-10 text-sm text-gray-600 dark:text-gray-300">
      <div className="border-t border-black/10 dark:border-white/10 pt-6">Crafted with intention by Aryan Gupta</div>
    </footer>
  )
}

export default function App() {
  const profile = useFetch('/api/profile').data
  const projects = useFetch('/api/projects').data
  const collectionItems = useFetch('/api/collections').data
  const experience = useFetch('/api/experience').data
  const services = useFetch('/api/services').data

  return (
    <div className="min-h-screen bg-white dark:bg-[#0b0b0b]">
      <DarkModeToggle />
      <Nav />
      <Hero />
      <About profile={profile} />
      <Projects projects={projects} />
      <Collections items={collectionItems} />
      <Experience items={experience} />
      <Services items={services} />
      <Contact />
      <Footer />
    </div>
  )
}
