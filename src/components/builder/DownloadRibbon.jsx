import { useMemo, forwardRef } from 'react';
import { DownloadIcon } from '../ui/Icons.jsx';

function formatRemaining(seconds) {
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (d > 0) return `${d}d ${h}h`;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m ${s}s`;
}

const DownloadRibbon = forwardRef(({ status, onPay, payBusy, onExport, isExporting = false }, ref) => {
  const chip = useMemo(() => {
    if (!status?.allowed) return { tone: 'warn', label: 'Export locked — one-time checkout required' };
    return { tone: 'ok', label: `Export unlocked · ${formatRemaining(status.secondsRemaining)} left in 25-day window` };
  }, [status]);

  return (
    <div ref={ref} className={`download-ribbon ribbon-${chip.tone}`}>
      <div className="ribbon-text">
        <strong>{chip.label}</strong>
        {status?.validUntil ? (
          <span className="ribbon-date-hint">Valid until {new Date(status.validUntil).toLocaleDateString()}</span>
        ) : null}
      </div>
      <div className="ribbon-actions">
        <button type="button" className="btn btn-secondary small" disabled={payBusy} onClick={onPay}>
          {payBusy ? 'Opening checkout…' : status?.allowed ? 'Extend access window' : 'Unlock PDF Export (GHS 25)'}
        </button>
        <button
          type="button"
          className="btn btn-primary small download-pdf-btn"
          disabled={isExporting}
          onClick={onExport}
        >
          {isExporting ? (
            'Generating PDF…'
          ) : (
            <>
              <DownloadIcon size={14} /> Download PDF
            </>
          )}
        </button>
      </div>
    </div>
  );
});

DownloadRibbon.displayName = 'DownloadRibbon';

export default DownloadRibbon;
