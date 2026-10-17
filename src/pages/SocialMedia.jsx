import { useEffect, useState } from "react";
import { Upload, ShieldCheck, Send, CheckCircle } from "lucide-react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { createMediaReport, getMyMediaReports } from "../services/mediaService";

const SocialMedia = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [dataUrl, setDataUrl] = useState("");
  const [reports, setReports] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", location: "", displayNamePreference: user?.mediaConsent?.displayNamePreference || "anonymous" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => { if (user) getMyMediaReports().then(d => setReports(d.reports || [])).catch(() => {}); }, [user]);
  const chooseFile = (e) => {
    const selected = e.target.files?.[0]; if (!selected) return;
    if (!["image/jpeg","image/png","image/webp","video/mp4","video/webm"].includes(selected.type)) return setMessage("Use JPG, PNG, WEBP, MP4 or WEBM.");
    if (selected.size > 7_000_000) return setMessage("Maximum file size is 7 MB.");
    setFile(selected); setMessage("");
    const reader = new FileReader(); reader.onload = () => setDataUrl(reader.result); reader.readAsDataURL(selected);
  };
  const submit = async (e) => {
    e.preventDefault(); if (!user) return navigate("/login");
    if (!user.mediaConsent?.featureMyStory || !user.mediaConsent?.pressOutreach) return setMessage("First enable Story + Press & News Outreach consent in Settings.");
    setLoading(true); setMessage("");
    try { await createMediaReport({ ...form, dataUrl, mimeType: file?.type, originalName: file?.name, shareToNews: true }); setMessage("Submitted. It will be sent to the configured news partner only after admin verification."); setForm({ title: "", description: "", location: "", displayNamePreference: form.displayNamePreference }); setFile(null); setDataUrl(""); const d = await getMyMediaReports(); setReports(d.reports || []); }
    catch (e) { setMessage(e?.response?.data?.message || e?.message || "Submission failed"); } finally { setLoading(false); }
  };
  return <div className="min-h-screen bg-gray-50 py-12 px-6"><div className="max-w-4xl mx-auto"><div className="bg-white rounded-3xl shadow p-8"><div className="flex items-center gap-3 mb-2"><Send className="text-green-600"/><h1 className="text-3xl font-bold">Community Media Report</h1></div><p className="text-gray-600 mb-6">Share verified emergency information, photos or videos. News sharing is opt-in and requires your consent plus admin review.</p><div className="rounded-2xl bg-blue-50 border border-blue-200 p-4 text-sm text-blue-900 mb-6"><ShieldCheck className="inline mr-2" size={18}/> Your report is not sent to a news organization immediately. It is stored securely, reviewed by an admin, and only an approved report is delivered to the configured authorized news partner.</div><form onSubmit={submit} className="space-y-5"><input required value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="Incident title" className="w-full border rounded-xl p-3"/><textarea required value={form.description} onChange={e=>setForm({...form,description:e.target.value})} placeholder="What happened?" rows="5" className="w-full border rounded-xl p-3"/><input required value={form.location} onChange={e=>setForm({...form,location:e.target.value})} placeholder="Location" className="w-full border rounded-xl p-3"/><select value={form.displayNamePreference} onChange={e=>setForm({...form,displayNamePreference:e.target.value})} className="w-full border rounded-xl p-3"><option value="anonymous">Show me as Anonymous</option><option value="firstNameOnly">Show first name only</option><option value="fullName">Show full name</option></select><label className="block border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer"><Upload className="mx-auto text-green-600 mb-2"/><span>{file ? file.name : "Choose photo/video"}</span><input type="file" accept="image/jpeg,image/png,image/webp,video/mp4,video/webm" onChange={chooseFile} className="hidden" required/></label>{message && <div className="p-3 rounded-xl bg-gray-100 text-sm">{message}</div>}<button disabled={loading} className="w-full bg-green-600 text-white py-3 rounded-xl font-bold">{loading ? "Submitting..." : "Submit for News Review"}</button></form></div><div className="mt-8 bg-white rounded-3xl shadow p-8"><h2 className="text-xl font-bold mb-4">My Reports</h2>{reports.length===0 ? <p className="text-gray-500">No reports submitted yet.</p> : <div className="space-y-3">{reports.map(r=><div key={r._id} className="border rounded-xl p-4 flex justify-between gap-4"><div><b>{r.title}</b><p className="text-sm text-gray-500">{r.location}</p></div><span className="text-sm font-semibold">{r.status}</span></div>)}</div>}</div></div></div>;
};
export default SocialMedia;
