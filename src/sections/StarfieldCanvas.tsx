import { useRef, useEffect, useCallback } from 'react'

interface Particle {
  x: number
  y: number
  z: number
  origX: number
  origY: number
  origZ: number
  vx: number
  vy: number
  vz: number
  color: string
  hue: number
}

export default function StarfieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const animFrameRef = useRef<number>(0)
  const timeRef = useRef(0)
  const explosionRef = useRef({ isExploding: false, isImploding: false, timer: 0 })
  const isMobileRef = useRef(false)

  const initParticles = useCallback((count: number, cubeSize: number) => {
    const colors = ['#4fd1c5', '#63b3ed', '#f687b3', '#ffffff']
    const particles: Particle[] = []
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * cubeSize
      const y = (Math.random() - 0.5) * cubeSize
      const z = (Math.random() - 0.5) * cubeSize
      const color = colors[Math.floor(Math.random() * colors.length)]
      let hue = 180
      if (color === '#63b3ed') hue = 210
      else if (color === '#f687b3') hue = 330
      else if (color === '#ffffff') hue = 0
      particles.push({
        x, y, z,
        origX: x, origY: y, origZ: z,
        vx: 0, vy: 0, vz: 0,
        color,
        hue
      })
    }
    return particles
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    isMobileRef.current = window.innerWidth < 768
    const particleCount = isMobileRef.current ? 800 : 2200
    const cubeSize = 1000
    const baseSpeed = 0.3
    const fov = 800

    particlesRef.current = initParticles(particleCount, cubeSize)

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }

    const handleClick = () => {
      explosionRef.current.isExploding = true
      explosionRef.current.isImploding = false
      explosionRef.current.timer = 10
    }

    window.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('click', handleClick)

    const project = (x: number, y: number, z: number) => {
      const scale = fov / (fov + z)
      return {
        x2d: x * scale + canvas.width / 2,
        y2d: y * scale + canvas.height / 2,
        scale
      }
    }

    const animate = () => {
      timeRef.current += baseSpeed * 0.01
      const t = timeRef.current
      const particles = particlesRef.current
      const mouse = mouseRef.current
      const explosion = explosionRef.current

      // Trail effect
      ctx.fillStyle = 'rgba(11, 17, 32, 0.15)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Rotation angles
      const rotY = t * 0.5
      const rotX = t * 0.2
      const cosY = Math.cos(rotY)
      const sinY = Math.sin(rotY)
      const cosX = Math.cos(rotX)
      const sinX = Math.sin(rotX)

      // Handle explosion
      if (explosion.isExploding) {
        explosion.timer--
        for (const p of particles) {
          const angle = Math.atan2(p.y, p.x)
          const elev = Math.atan2(p.z, Math.sqrt(p.x * p.x + p.y * p.y))
          const force = 15 * (explosion.timer / 10)
          p.vx += Math.cos(angle) * Math.cos(elev) * force
          p.vy += Math.sin(angle) * Math.cos(elev) * force
          p.vz += Math.sin(elev) * force
        }
        if (explosion.timer <= 0) {
          explosion.isExploding = false
          explosion.isImploding = true
          explosion.timer = 60
        }
      }

      // Handle implosion
      if (explosion.isImploding) {
        explosion.timer--
        const progress = 1 - explosion.timer / 60
        for (const p of particles) {
          const targetX = p.origX * (1 - progress * 0.9)
          const targetY = p.origY * (1 - progress * 0.9)
          const targetZ = p.origZ * (1 - progress * 0.9)
          p.vx += (targetX - p.x) * 0.02
          p.vy += (targetY - p.y) * 0.02
          p.vz += (targetZ - p.z) * 0.02
          p.vx *= 0.95
          p.vy *= 0.95
          p.vz *= 0.95
        }
        if (explosion.timer <= 0) {
          explosion.isImploding = false
          for (const p of particles) {
            p.vx = 0
            p.vy = 0
            p.vz = 0
          }
        }
      }

      // Sort particles by z for proper rendering
      const sortedParticles = [...particles].sort((a, b) => b.z - a.z)

      for (const p of sortedParticles) {
        // Apply rotation around Y axis
        let rx = p.x * cosY - p.z * sinY
        let rz = p.x * sinY + p.z * cosY
        let ry = p.y

        // Apply rotation around X axis
        let ry2 = ry * cosX - rz * sinX
        let rz2 = ry * sinX + rz * cosX

        // Mouse repulsion (on 2D projected position)
        const proj = project(rx, ry2, rz2)
        const dx = proj.x2d - mouse.x
        const dy = proj.y2d - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const repelRadius = 150

        if (dist < repelRadius && dist > 0) {
          const force = (repelRadius - dist) / repelRadius
          const angle = Math.atan2(dy, dx)
          p.vx += Math.cos(angle) * force * 8
          p.vy += Math.sin(angle) * force * 8
          p.vz += force * 4
        }

        // Apply velocity with damping
        p.x += p.vx
        p.y += p.vy
        p.z += p.vz
        p.vx *= 0.92
        p.vy *= 0.92
        p.vz *= 0.92

        // Gentle auto-rotation of positions
        if (!explosion.isExploding && !explosion.isImploding) {
          const autoRotSpeed = 0.3
          const nx = p.x * Math.cos(autoRotSpeed * 0.005) - p.z * Math.sin(autoRotSpeed * 0.005)
          const nz = p.x * Math.sin(autoRotSpeed * 0.005) + p.z * Math.cos(autoRotSpeed * 0.005)
          p.x = nx
          p.z = nz
        }

        // Re-apply rotation for rendering
        rx = p.x * cosY - p.z * sinY
        rz = p.x * sinY + p.z * cosY
        ry = p.y
        ry2 = ry * cosX - rz * sinX
        rz2 = ry * sinX + rz * cosX

        // Project to 2D
        const finalProj = project(rx, ry2, rz2)
        const { x2d, y2d, scale } = finalProj

        // Skip if off screen
        if (x2d < -50 || x2d > canvas.width + 50 || y2d < -50 || y2d > canvas.height + 50) continue

        // Color based on z-depth
        const zNorm = Math.max(0, Math.min(1, (rz2 + cubeSize / 2) / cubeSize))
        const lightness = 20 + zNorm * 70
        const alpha = 0.3 + zNorm * 0.7
        const size = 1.5 * scale

        // Draw particle
        ctx.beginPath()
        ctx.arc(x2d, y2d, Math.max(0.5, size), 0, Math.PI * 2)

        if (p.color === '#ffffff') {
          ctx.fillStyle = `hsla(0, 0%, ${lightness}%, ${alpha})`
        } else {
          ctx.fillStyle = `hsla(${p.hue}, 80%, ${lightness}%, ${alpha})`
        }
        ctx.fill()

        // Glow for nearby particles
        if (scale > 0.8 && zNorm > 0.5) {
          ctx.beginPath()
          ctx.arc(x2d, y2d, size * 3, 0, Math.PI * 2)
          if (p.color === '#ffffff') {
            ctx.fillStyle = `hsla(0, 0%, ${lightness}%, ${alpha * 0.08})`
          } else {
            ctx.fillStyle = `hsla(${p.hue}, 80%, ${lightness}%, ${alpha * 0.08})`
          }
          ctx.fill()
        }
      }

      animFrameRef.current = requestAnimationFrame(animate)
    }

    animFrameRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animFrameRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('click', handleClick)
    }
  }, [initParticles])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        cursor: 'crosshair'
      }}
    />
  )
}
