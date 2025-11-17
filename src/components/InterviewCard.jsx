import React from "react";

export default function InterviewCard({ iv, onJoin, onMark }) {
  return (
    <div className="interview-card">
      <div className="meta">
        <div style={{fontWeight:600}}>{iv.company} — <span className="small">{iv.role}</span></div>
        <div className="small">{iv.date} • {iv.time} • {iv.mode}</div>
        <div className="small">Interviewer: {iv.interviewer}</div>
        <div className="small">Status: {iv.status}{iv.attendance? ` • ${iv.attendance}` : ""}</div>
      </div>

      <div style={{display:"flex",flexDirection:"column",gap:8,alignItems:"flex-end"}}>
        <button className="btn btn-primary" onClick={() => onJoin(iv)} disabled={!iv.join_link}>Join</button>
        <div style={{display:"flex",gap:8}}>
          <button className="btn btn-ghost" onClick={() => onMark(iv.id, "attended")}>Mark Attended</button>
          <button className="btn" onClick={() => onMark(iv.id, "missed")}>Mark Missed</button>
        </div>
      </div>
    </div>
  );
}
