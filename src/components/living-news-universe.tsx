"use client";

import { useEffect, useRef } from "react";

type UniverseProps = { topics?: string[] };
type ParticleState = "inbound" | "orbit" | "outbound";
type TopicParticle = { id: number; label: string; x: number; y: number; vx: number; vy: number; angle: number; orbitRadius: number; age: number; depth: number; radius: number; state: ParticleState; orbitFor: number; maxAge: number };
type CollisionPulse = { x: number; y: number; age: number; size: number };
type BurstRay = { angle: number; length: number; age: number; speed: number };

const FALLBACK_TOPICS = ["AI", "SEO", "PYTHON", "CAREER", "TECH", "FINANCE", "TRAVEL", "EDUCATION", "STARTUPS", "DIGITAL"];
const TOPOLOGIES = [
  [[-1, -.6], [-.2, -.9], [.65, -.45], [1, .1], [.4, .75], [-.55, .65], [-.9, .05]],
  [[-.95, -.1], [-.35, -.72], [.35, -.25], [.95, -.05], [.2, .42], [-.2, .9], [.7, .85]],
  [[-.9, -.62], [-.25, -.25], [.5, -.72], [.95, -.25], [.35, .38], [-.5, .25], [-.75, .85]],
];
const TOPOLOGY_EDGES = [[[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], [1, 5]], [[0, 1], [1, 2], [2, 4], [4, 5], [5, 0], [2, 3], [3, 6]], [[0, 1], [1, 4], [4, 3], [3, 2], [2, 1], [1, 5], [5, 6]]];

export function LivingNewsUniverse({ topics = FALLBACK_TOPICS }: UniverseProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labels = topics.length ? Array.from(new Set(topics)).slice(0, 10) : FALLBACK_TOPICS;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    let width = 1;
    let height = 1;
    let frame = 0;
    let elapsed = 0;
    let last = 0;
    let nextSpawn = 0;
    let nextBurst = 5.5;
    let topology = 0;
    let topologyChangedAt = 0;
    let particleId = 0;
    let particles: TopicParticle[] = [];
    let collisionPulses: CollisionPulse[] = [];
    let burstRays: BurstRay[] = [];
    let reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: 0, y: 0, active: false };
    const random = (seed: number) => { const value = Math.sin(seed * 91.173 + 17.41) * 43758.5453; return value - Math.floor(value); };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      if (!particles.length) for (let index = 0; index < (width < 700 ? 6 : 12); index += 1) spawnParticle(index * .7);
    };

    const core = () => ({ x: width * .79 + (pointer.active ? pointer.x * 8 : 0), y: height * .43 + (pointer.active ? pointer.y * 6 : 0) });
    const spawnParticle = (offset = 0) => {
      const side = Math.floor(random(particleId + offset + 4) * 4);
      const edge = side === 0 ? { x: random(particleId + 9) * width, y: -18 } : side === 1 ? { x: width + 18, y: random(particleId + 10) * height } : side === 2 ? { x: random(particleId + 11) * width, y: height + 18 } : { x: -18, y: random(particleId + 12) * height };
      particles.push({ id: particleId, label: labels[particleId % labels.length], x: edge.x, y: edge.y, vx: 0, vy: 0, angle: random(particleId + 15) * Math.PI * 2, orbitRadius: 38 + random(particleId + 16) * 78, age: 0, depth: .25 + random(particleId + 17) * .75, radius: 2 + random(particleId + 18) * 3.5, state: "inbound", orbitFor: 1.7 + random(particleId + 19) * 2.8, maxAge: 9 + random(particleId + 20) * 6 });
      particleId += 1;
    };

    const triggerBurst = () => {
      const centre = core();
      burstRays = Array.from({ length: width < 700 ? 7 : 12 }, (_, index) => ({ angle: (index / (width < 700 ? 7 : 12)) * Math.PI * 2 + elapsed * .2, length: 20 + random(index + elapsed) * 80, age: 0, speed: 1.3 + random(index + 20) * 1.5 }));
      particles.forEach((particle) => { if (particle.state === "orbit") { particle.state = "outbound"; particle.vx = Math.cos(particle.angle) * (35 + particle.depth * 45); particle.vy = Math.sin(particle.angle) * (35 + particle.depth * 45); particle.x = centre.x + Math.cos(particle.angle) * particle.orbitRadius; particle.y = centre.y + Math.sin(particle.angle) * particle.orbitRadius; } });
      nextBurst = elapsed + (reducedMotion ? 99 : 6.5 + random(particleId + 22) * 3.5);
    };

    const update = (delta: number) => {
      elapsed += delta;
      if (!reducedMotion && elapsed > nextSpawn) { spawnParticle(); nextSpawn = elapsed + .55 + random(particleId + 26) * .8; }
      if (!reducedMotion && elapsed > nextBurst) triggerBurst();
      if (!reducedMotion && elapsed - topologyChangedAt > 4.5) { topology = (topology + 1) % TOPOLOGIES.length; topologyChangedAt = elapsed; }
      const centre = core();
      particles.forEach((particle) => {
        particle.age += delta;
        if (particle.state === "inbound") {
          const dx = centre.x - particle.x;
          const dy = centre.y - particle.y;
          particle.vx += dx * delta * .22;
          particle.vy += dy * delta * .22;
          particle.vx *= .94;
          particle.vy *= .94;
          particle.x += particle.vx * delta;
          particle.y += particle.vy * delta;
          if (Math.hypot(dx, dy) < 44) { particle.state = "orbit"; particle.age = 0; }
        } else if (particle.state === "orbit") {
          particle.angle += delta * (.55 + particle.depth * .65);
          particle.x = centre.x + Math.cos(particle.angle) * particle.orbitRadius;
          particle.y = centre.y + Math.sin(particle.angle) * particle.orbitRadius;
          if (particle.age > particle.orbitFor) { particle.state = "outbound"; particle.vx = Math.cos(particle.angle) * (24 + particle.depth * 48); particle.vy = Math.sin(particle.angle) * (24 + particle.depth * 48); }
        } else { particle.x += particle.vx * delta; particle.y += particle.vy * delta; particle.vx *= .997; particle.vy *= .997; }
      });
      for (let first = 0; first < particles.length; first += 1) for (let second = first + 1; second < particles.length; second += 1) {
        const a = particles[first]; const b = particles[second];
        if (Math.hypot(a.x - b.x, a.y - b.y) < 30 && a.age > .35 && b.age > .35 && (Math.floor(elapsed * 2 + a.id + b.id) % 4 === 0)) {
          collisionPulses.push({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2, age: 0, size: 5 + a.depth * 10 });
          a.vx += (a.x - b.x) * .4; a.vy += (a.y - b.y) * .4;
        }
      }
      collisionPulses = collisionPulses.filter((pulse) => { pulse.age += delta; return pulse.age < 1.2; });
      burstRays = burstRays.filter((ray) => { ray.age += delta; return ray.age < 1.4; });
      particles = particles.filter((particle) => particle.age < particle.maxAge && particle.x > -90 && particle.x < width + 90 && particle.y > -90 && particle.y < height + 90);
      while (!reducedMotion && particles.length < (width < 700 ? 7 : 14)) spawnParticle();
    };

    const drawBackground = () => {
      const count = width < 700 ? 16 : 30;
      for (let index = 0; index < count; index += 1) {
        const x = (random(index + 31) * width + elapsed * (2 + random(index + 32) * 5)) % width;
        const y = random(index + 33) * height;
        context.fillStyle = "rgba(213, 236, 226, .2)";
        context.fillRect(x, y, 1, 1);
      }
    };

    const drawCore = () => {
      const centre = core();
      const layout = TOPOLOGIES[topology];
      const scale = Math.min(width, height) * .12;
      const corePoints = layout.map(([x, y], index) => ({ x: centre.x + x * scale + Math.sin(elapsed * .7 + index) * 4, y: centre.y + y * scale + Math.cos(elapsed * .55 + index) * 4 }));
      TOPOLOGY_EDGES[topology].forEach(([from, to]) => { context.strokeStyle = `rgba(246, 176, 151, ${.28 + Math.sin(elapsed + from) * .08})`; context.lineWidth = 1.1; context.beginPath(); context.moveTo(corePoints[from].x, corePoints[from].y); context.lineTo(corePoints[to].x, corePoints[to].y); context.stroke(); });
      corePoints.forEach((point, index) => { context.beginPath(); context.arc(point.x, point.y, 2.4 + Math.sin(elapsed * 1.3 + index) * .7, 0, Math.PI * 2); context.fillStyle = index === topology ? "#f6b097" : "#b2dbd0"; context.fill(); });
      context.font = "600 9px DM Sans, sans-serif";
      context.fillStyle = "rgba(246, 176, 151, .62)";
      context.fillText("INFORMATION CORE", centre.x - 44, centre.y + scale * 1.45);
    };

    const drawParticles = () => {
      const centre = core();
      particles.forEach((particle) => {
        if (particle.state === "inbound") { context.strokeStyle = `rgba(178, 219, 208, ${.08 + particle.depth * .15})`; context.lineWidth = .7; context.beginPath(); context.moveTo(particle.x, particle.y); context.lineTo(centre.x, centre.y); context.stroke(); }
        context.beginPath(); context.arc(particle.x, particle.y, particle.radius * particle.depth, 0, Math.PI * 2); context.fillStyle = particle.state === "orbit" ? "#f6b097" : "#d5ece2"; context.fill();
        if (particle.depth > .62) { context.font = "600 9px DM Sans, sans-serif"; context.fillStyle = `rgba(248, 244, 236, ${.42 + particle.depth * .4})`; context.fillText(particle.label.replaceAll("-", " ").toUpperCase(), particle.x + 7, particle.y - 6); }
      });
      collisionPulses.forEach((pulse) => { const progress = pulse.age / 1.2; context.strokeStyle = `rgba(231, 93, 63, ${1 - progress})`; context.lineWidth = 1.2; context.beginPath(); context.arc(pulse.x, pulse.y, pulse.size + progress * 22, 0, Math.PI * 2); context.stroke(); for (let index = 0; index < 3; index += 1) { const angle = index * 2 + pulse.age * 4; context.fillStyle = `rgba(246, 176, 151, ${1 - progress})`; context.fillRect(pulse.x + Math.cos(angle) * progress * 18, pulse.y + Math.sin(angle) * progress * 18, 2, 2); } });
      burstRays.forEach((ray) => { const progress = ray.age / 1.4; const length = ray.length * Math.min(1, ray.age * ray.speed); const alpha = 1 - progress; context.strokeStyle = `rgba(246, 176, 151, ${alpha * .7})`; context.lineWidth = 1; context.beginPath(); context.moveTo(centre.x, centre.y); context.lineTo(centre.x + Math.cos(ray.angle) * length, centre.y + Math.sin(ray.angle) * length); context.stroke(); });
    };

    const render = (now: number) => { const delta = Math.min(.04, last ? (now - last) / 1000 : .016); last = now; if (!reducedMotion) update(delta); context.clearRect(0, 0, width, height); drawBackground(); drawCore(); drawParticles(); if (!reducedMotion) frame = window.requestAnimationFrame(render); };
    const updatePointer = (event: PointerEvent) => { pointer.x = (event.clientX / Math.max(window.innerWidth, 1) - .5) * 2; pointer.y = (event.clientY / Math.max(window.innerHeight, 1) - .5) * 2; pointer.active = true; };
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionChange = () => { reducedMotion = motionQuery.matches; window.cancelAnimationFrame(frame); last = 0; render(performance.now()); if (!reducedMotion) frame = window.requestAnimationFrame(render); };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    window.addEventListener("pointermove", updatePointer, { passive: true });
    motionQuery.addEventListener("change", handleMotionChange);
    render(performance.now());
    if (!reducedMotion) frame = window.requestAnimationFrame(render);
    return () => { window.cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener("pointermove", updatePointer); motionQuery.removeEventListener("change", handleMotionChange); };
  }, [labels]);

  return <div className="news-universe" aria-hidden="true"><canvas className="universe-core" ref={canvasRef} /></div>;
}
