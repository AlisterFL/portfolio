// app/jacquemarsimmobilier/components/AgentCard.tsx
import { Agent } from "../types";

interface AgentCardProps {
  agent: Agent;
}

export default function AgentCard({ agent }: AgentCardProps) {
  return (
    <div className="bg-white border border-[var(--jqm-cream)] rounded-sm p-6">
      {/* Avatar placeholder */}
      <div className="w-16 h-16 rounded-full bg-[var(--jqm-burgundy)] flex items-center justify-center text-white text-xl font-semibold mb-4">
        {agent.name[0]}
      </div>
      <p className="font-semibold text-[var(--jqm-noir)]">{agent.fullName}</p>
      <p className="text-xs text-[var(--jqm-gris)] mb-4">Conseiller immobilier</p>
      <div className="space-y-2">
        <a
          href={`tel:${agent.phone.replace(/\./g, "")}`}
          className="flex items-center gap-2 text-sm text-[var(--jqm-burgundy)] hover:text-[var(--jqm-burgundy-light)] transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          {agent.phone}
        </a>
        <a
          href={`mailto:${agent.email}`}
          className="flex items-center gap-2 text-sm text-[var(--jqm-burgundy)] hover:text-[var(--jqm-burgundy-light)] transition-colors break-all"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          {agent.email}
        </a>
      </div>
    </div>
  );
}
