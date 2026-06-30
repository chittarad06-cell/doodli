import { FaHeart as Heart, FaLightningBolt as Zap } from 'react-icons/fa';

export default function BiometricWidget({ bpm, stress, spike, onSpike }) {
  return (
    <div className={`biometric ${spike ? "spike" : ""}`} data-testid="biometric">
      <Heart className="heart" size={20} />
      <div style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9aa3b8", marginBottom: 6, fontWeight: 600 }}>
        Wearable Sync
      </div>
      <div className="bpm" data-testid="bpm-value">
        {bpm}<small>BPM</small>
      </div>
      <div style={{ fontSize: 12, color: "#c5cad8", marginTop: 8, display: "flex", justifyContent: "space-between" }}>
        <span>Stress</span>
        <span data-testid="stress-value">{stress}%</span>
      </div>
      <div className="stress-bar"><div className="stress-fill" style={{ width: `${stress}%` }} /></div>
      <button
        className="btn"
        style={{ marginTop: 14, width: "100%", justifyContent: "center", background: spike ? "#d94e4e" : "#3a4a66" }}
        onClick={onSpike}
        data-testid="stress-spike-btn"
      >
        <Zap size={14} /> {spike ? "Spike Active!" : "Simulate Stress Spike"}
      </button>
    </div>
  );
}
