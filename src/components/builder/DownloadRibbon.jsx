import { useMemo } from 'react';

function formatRemaining(seconds) {
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (d > 0) return `${d}d ${h}h`;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m ${s}s`;
}

export default function DownloadRibbon({ status, onPay, payBusy, onExport }) {
  const chip = useMemo(() => {
    if (!status?.allowed) return { tone: 'warn', label: 'Export locked — checkout required' };
    return { tone: 'ok', label: `Free re-download window · ${formatRemaining(status.secondsRemaining)} left` };
  }, [status]);

  return (
    <div className={`download-ribbon ribbon-${chip.tone}`}>
      <div className="ribbon-text">
        <strong>{chip.label}</strong>
        {status?.validUntil ? (
          <span className="muted small"> · Until {new Date(status.validUntil).toLocaleString()}</span>
        ) : null}
      </div>
      <div className="ribbon-actions">
        <button type="button" className="btn-secondary small" disabled={payBusy} onClick={onPay}>
          {payBusy ? 'Redirecting…' : status?.allowed ? 'Extend access' : 'Unlock export'}
        </button>
        <button type="button" className="btn-primary small" onClick={onExport}>
          Download PDF
        </button>
      </div>
    </div>
  );
}
