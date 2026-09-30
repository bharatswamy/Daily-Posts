"use client";

import { useEffect, useRef } from "react";

type MachineProps = { topics?: string[] };
type MachineNode = { id: number; x: number; y: number; vx: number; vy: number; label: string; depth: number; radius: number; age: number; maxAge: number };
type Signal = { a: number; b: number; progress: number; speed: number };
type Pulse = { x: number; y: number; age: number; power: number };
type Cluster = { key: string; ids: number[]; age: number };

const FALLBACK_TOPICS = ["AI", "TECH", "SEO", "CAREER", "FINANCE", "TRAVEL", "EDUCATION", "PROGRAMMING", "STARTUPS", "DIGITAL"];

export function InformationMachine({ topics = FALLBACK_TOPICS }: MachineProps) {
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
    let nextNodeAt = 0;
    let nextBurstAt = 5;
    let nodeId = 0;
    let nodes: MachineNode[] = [];
    let signals: Signal[] = [];
    let energyPulses: Pulse[] = [];
    let clusters: Cluster[] = [];
    const activeConnections = new Set<string>();
    const collisionCooldown = new Map<string, number>();
    let reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: 0, y: 0, active: false };

    const random = (seed: number) => { const value = Math.sin(seed * 78.233 + 21.17) * 43758.5453; return value - Math.floor(value); };
    const machinePoint = () => ({ x: width * .78 + (pointer.active ? pointer.x * 10 : 0), y: height * .46 + (pointer.active ? pointer.y * 8 : 0) });
    const topic = (id: number) => labels[id % labels.length].replaceAll("-", " ").toUpperCase();

    const spawnNode = (seed = nodeId) => {
      const angle = random(seed + 2) * Math.PI * 2;
      const distance = Math.max(width, height) * (.1 + random(seed + 3) * .48);
      const origin = machinePoint();
      nodes.push({ id: nodeId, x: origin.x + Math.cos(angle) * distance, y: origin.y + Math.sin(angle) * distance, vx: (random(seed + 4) - .5) * 38, vy: (random(seed + 5) - .5) * 38, label: topic(nodeId), depth: .35 + random(seed + 6) * .65, radius: 2 + random(seed + 7) * 3.5, age: 0, maxAge: 8 + random(seed + 8) * 8 });
      nodeId += 1;
    };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      if (!nodes.length) for (let index = 0; index < (width < 700 ? 9 : 18); index += 1) spawnNode(index + 30);
    };

    const triggerBurst = () => {
      const origin = machinePoint();
      energyPulses.push({ x: origin.x, y: origin.y, age: 0, power: 1.4 });
      for (let index = 0; index < (width < 700 ? 4 : 7); index += 1) {
        spawnNode(nodeId + index + 70);
        const node = nodes[nodes.length - 1];
        const angle = (index / (width < 700 ? 4 : 7)) * Math.PI * 2 + elapsed;
        node.x = origin.x;
        node.y = origin.y;
        node.vx = Math.cos(angle) * (50 + node.depth * 75);
        node.vy = Math.sin(angle) * (50 + node.depth * 75);
      }
      nextBurstAt = elapsed + (reducedMotion ? 99 : 6 + random(nodeId + 90) * 4);
    };

    const registerConnection = (a: MachineNode, b: MachineNode) => {
      const key = a.id < b.id ? `${a.id}:${b.id}` : `${b.id}:${a.id}`;
      if (!activeConnections.has(key)) { activeConnections.add(key); signals.push({ a: a.id, b: b.id, progress: 0, speed: .32 + Math.max(a.depth, b.depth) * .4 }); }
      return key;
    };

    const update = (delta: number) => {
      elapsed += delta;
      if (!reducedMotion && elapsed > nextNodeAt) { spawnNode(); nextNodeAt = elapsed + .5 + random(nodeId + 100) * .9; }
      if (!reducedMotion && elapsed > nextBurstAt) triggerBurst();
      const origin = machinePoint();
      nodes.forEach((node) => {
        node.age += delta;
        const dx = origin.x - node.x;
        const dy = origin.y - node.y;
        const distance = Math.hypot(dx, dy) || 1;
        node.vx += (dx / distance) * delta * (node.depth * 4);
        node.vy += (dy / distance) * delta * (node.depth * 4);
        node.vx += Math.sin(elapsed * .7 + node.id) * delta * 7;
        node.vy += Math.cos(elapsed * .55 + node.id * .6) * delta * 7;
        node.vx *= .994;
        node.vy *= .994;
        node.x += node.vx * delta;
        node.y += node.vy * delta;
      });

      const currentConnections = new Set<string>();
      for (let first = 0; first < nodes.length; first += 1) for (let second = first + 1; second < nodes.length; second += 1) {
        const a = nodes[first]; const b = nodes[second];
        if (Math.hypot(a.x - b.x, a.y - b.y) < 135) {
          const key = registerConnection(a, b);
          currentConnections.add(key);
          if (Math.hypot(a.x - b.x, a.y - b.y) < 34) {
            const lastCollision = collisionCooldown.get(key) || 0;
            if (elapsed - lastCollision > 1.4) { collisionCooldown.set(key, elapsed); energyPulses.push({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2, age: 0, power: .65 }); a.vx += (a.x - b.x) * .12; a.vy += (a.y - b.y) * .12; }
          }
        }
      }
      activeConnections.forEach((key) => { if (!currentConnections.has(key)) activeConnections.delete(key); });
      signals = signals.filter((signal) => { signal.progress += delta * signal.speed; return signal.progress < 1; });
      energyPulses = energyPulses.filter((pulse) => { pulse.age += delta; return pulse.age < 1.4; });

      const clusterMap = new Map<string, number[]>();
      nodes.forEach((node) => { const nearby = nodes.filter((other) => other.id !== node.id && Math.hypot(node.x - other.x, node.y - other.y) < 92).map((other) => other.id).sort((a, b) => a - b); if (nearby.length >= 2) clusterMap.set([node.id, ...nearby.slice(0, 2)].join("-"), [node.id, ...nearby.slice(0, 2)]); });
      clusters = Array.from(clusterMap, ([key, ids]) => ({ key, ids, age: (clusters.find((cluster) => cluster.key === key)?.age || 0) + delta })).filter((cluster) => cluster.age < 3.6);
      clusters.forEach((cluster) => { const members = nodes.filter((node) => cluster.ids.includes(node.id)); if (cluster.age < 2.4 && members.length > 1) { const centre = members.reduce((point, node) => ({ x: point.x + node.x / members.length, y: point.y + node.y / members.length }), { x: 0, y: 0 }); members.forEach((node) => { node.vx += (centre.x - node.x) * delta * .12; node.vy += (centre.y - node.y) * delta * .12; }); } });
      nodes = nodes.filter((node) => node.age < node.maxAge && node.x > -120 && node.x < width + 120 && node.y > -120 && node.y < height + 120);
      while (!reducedMotion && nodes.length < (width < 700 ? 10 : 19)) spawnNode();
    };

    const drawSignals = () => {
      signals.forEach((signal) => { const a = nodes.find((node) => node.id === signal.a); const b = nodes.find((node) => node.id === signal.b); if (!a || !b) return; const x = a.x + (b.x - a.x) * signal.progress; const y = a.y + (b.y - a.y) * signal.progress; context.beginPath(); context.arc(x, y, 2.4, 0, Math.PI * 2); context.fillStyle = "#f6b097"; context.fill(); });
    };

    const draw = () => {
      const origin = machinePoint();
      const coreNodes = Array.from({ length: 7 }, (_, index) => ({ x: origin.x + Math.cos(index * .9 + elapsed * .18) * (30 + Math.sin(elapsed + index) * 8), y: origin.y + Math.sin(index * .9 + elapsed * .18) * (30 + Math.cos(elapsed * .8 + index) * 8) }));
      context.strokeStyle = "rgba(246, 176, 151, .4)"; context.lineWidth = 1.3; for (let index = 0; index < coreNodes.length; index += 1) { const next = coreNodes[(index + 2) % coreNodes.length]; context.beginPath(); context.moveTo(coreNodes[index].x, coreNodes[index].y); context.lineTo(next.x, next.y); context.stroke(); }
      coreNodes.forEach((point, index) => { context.beginPath(); context.arc(point.x, point.y, index === 0 ? 7 : 3, 0, Math.PI * 2); context.fillStyle = index === 0 ? "#e75d3f" : "#b2dbd0"; context.fill(); });
      context.font = "600 9px DM Sans, sans-serif"; context.fillStyle = "rgba(246, 176, 151, .74)"; context.fillText("LIVE INFORMATION MACHINE", origin.x - 70, origin.y + 68);

      activeConnections.forEach((key) => { const [aId, bId] = key.split(":").map(Number); const a = nodes.find((node) => node.id === aId); const b = nodes.find((node) => node.id === bId); if (!a || !b) return; const alpha = .08 + Math.min(a.depth, b.depth) * .2; context.strokeStyle = `rgba(178, 219, 208, ${alpha})`; context.lineWidth = .55 + Math.min(a.depth, b.depth) * .7; context.beginPath(); context.moveTo(a.x, a.y); context.lineTo(b.x, b.y); context.stroke(); });
      clusters.forEach((cluster) => { const members = nodes.filter((node) => cluster.ids.includes(node.id)); if (members.length < 3) return; context.strokeStyle = `rgba(231, 93, 63, ${Math.max(0, .28 - cluster.age * .06)})`; context.setLineDash([2, 5]); context.beginPath(); members.forEach((node, index) => { if (index === 0) context.moveTo(node.x, node.y); else context.lineTo(node.x, node.y); }); context.closePath(); context.stroke(); context.setLineDash([]); });
      nodes.forEach((node) => { context.beginPath(); context.arc(node.x, node.y, node.radius * node.depth, 0, Math.PI * 2); context.fillStyle = node.depth > .7 ? "#f6b097" : "rgba(213, 236, 226, .7)"; context.fill(); if (node.depth > .62) { context.font = "600 9px DM Sans, sans-serif"; context.fillStyle = "rgba(248, 244, 236, .78)"; context.fillText(node.label, node.x + 7, node.y - 6); } });
      energyPulses.forEach((pulse) => { const progress = pulse.age / 1.4; context.strokeStyle = `rgba(231, 93, 63, ${Math.max(0, 1 - progress) * pulse.power})`; context.lineWidth = 1.2; context.beginPath(); context.arc(pulse.x, pulse.y, 7 + progress * 34, 0, Math.PI * 2); context.stroke(); });
      drawSignals();
    };

    const render = (now: number) => { const delta = Math.min(.04, last ? (now - last) / 1000 : .016); last = now; if (!reducedMotion) update(delta); context.clearRect(0, 0, width, height); draw(); if (!reducedMotion) frame = window.requestAnimationFrame(render); };
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

  return <div className="information-machine" aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", overflow: "hidden" }}><canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} /></div>;
}
