import Loading from './Loading'

export default function LoadingOverlay({ visible, label = 'Loading…' }) {
  if (!visible) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl px-10 py-8 shadow-xl">
        <Loading size="lg" label={label} />
      </div>
    </div>
  )
}
