import React, { useState } from "react";

export default function InterviewForm({ onAdd }) {
  const [form, setForm] = useState({
    company: "", role: "", date: "", time: "", mode: "Google Meet", join_link: "", interviewer: "", notes: ""
  });

  function update(k, v) { setForm(prev => ({...prev, [k]: v})); }

  function submit(e) {
    e.preventDefault();
    if (!form.company || !form.role || !form.date || !form.time) {
      alert("Please fill company, role, date and time.");
      return;
    }
    onAdd({
      id: "int-" + Date.now(),
      ...form,
      status: "scheduled",
      attendance: null
    });
    setForm({company:"", role:"", date:"", time:"", mode:"Google Meet", join_link:"", interviewer:"", notes:""});
  }

  return (
    <div className="card">
      <h3 style={{marginTop:0}}>Schedule Interview</h3>
      <form onSubmit={submit}>
        <div className="form-row"><input className="input" placeholder="Company" value={form.company} onChange={e=>update("company", e.target.value)} /></div>
        <div className="form-row"><input className="input" placeholder="Role" value={form.role} onChange={e=>update("role", e.target.value)} /></div>
        <div className="form-row">
          <input type="date" className="input" value={form.date} onChange={e=>update("date", e.target.value)} />
          <input type="time" className="input" value={form.time} onChange={e=>update("time", e.target.value)} />
        </div>
        <div className="form-row">
          <select className="input" value={form.mode} onChange={e=>update("mode", e.target.value)}>
            <option>Google Meet</option>
            <option>Zoom</option>
            <option>In-person</option>
          </select>
        </div>
        <div className="form-row"><input className="input" placeholder="Join link (optional)" value={form.join_link} onChange={e=>update("join_link", e.target.value)} /></div>
        <div className="form-row"><input className="input" placeholder="Interviewer" value={form.interviewer} onChange={e=>update("interviewer", e.target.value)} /></div>
        <div className="form-row"><textarea className="input" placeholder="Notes" rows="3" value={form.notes} onChange={e=>update("notes", e.target.value)} /></div>
        <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
          <button type="submit" className="btn btn-primary">Add Interview</button>
        </div>
      </form>
      <div className="small-note">All data is saved locally (localStorage).</div>
    </div>
  );
}
