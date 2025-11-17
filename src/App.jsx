import React, { useEffect, useState } from "react";
import { loadData, saveData } from "./utils/storage";
import InterviewCard from "./components/InterviewCard";
import InterviewForm from "./components/InterviewForm";
import "./index.css";

export default function App(){
  const [data, setData] = useState(() => loadData());
  const [filter, setFilter] = useState("");

  useEffect(()=> {
    saveData(data);
  }, [data]);

  function addInterview(iv){
    const next = { ...data, interviews: [iv, ...data.interviews] };
    setData(next);
  }

  function joinInterview(iv){
    if (iv.join_link) {
      window.open(iv.join_link, "_blank");
    } else {
      alert("No join link provided.");
    }
  }

  function markAttendance(id, status){
    const next = {
      ...data,
      interviews: data.interviews.map(i => i.id === id ? {...i, attendance: status, status: status === "attended" ? "completed" : i.status} : i)
    };
    setData(next);
  }

  const visible = data.interviews.filter(i => {
    if (!filter) return true;
    const q = filter.toLowerCase();
    return i.company.toLowerCase().includes(q) || i.role.toLowerCase().includes(q) || (i.interviewer && i.interviewer.toLowerCase().includes(q));
  });

  return (
    <div className="container">
      <div className="header">
        <h1>Interview Scheduler</h1>
        <div>
          <input className="input" placeholder="Search by company/role/interviewer" value={filter} onChange={e=>setFilter(e.target.value)} />
        </div>
      </div>

      <div className="grid">
        <div>
          <div className="card" style={{marginBottom:12}}>
            <strong>Hello, {data.user?.name || "Candidate"}</strong>
            <div className="small">Upcoming interviews: {data.interviews.filter(i=>i.status==="scheduled").length}</div>
          </div>

          <div className="interview-list">
            {visible.length === 0 && <div className="card small">No interviews yet.</div>}
            {visible.map(iv => (
              <InterviewCard key={iv.id} iv={iv} onJoin={joinInterview} onMark={markAttendance} />
            ))}
          </div>

          <div className="footer small-note">Tip: Use "Mark Attended" after a meeting. All edits saved locally.</div>
        </div>

        <div>
          <InterviewForm onAdd={addInterview} />
          <div style={{height:12}} />
          <div className="card small">
            <h4 style={{marginTop:0}}>Quick actions</h4>
            <button className="btn btn-ghost" onClick={() => { localStorage.removeItem("interview_scheduler_v1"); window.location.reload(); }}>Reset Data</button>
            <div className="small-note">Use Reset to restore bundled sample data.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
