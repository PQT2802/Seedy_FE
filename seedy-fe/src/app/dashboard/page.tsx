// app/dashboard/page.tsx
export default function DashboardPage() {
  return (
    <div>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50 bg-slate-500" />
        <div className="aspect-video rounded-xl bg-muted/50 bg-slate-500" />
        <div className="aspect-video rounded-xl bg-muted/50 bg-slate-500" />
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </div>
  );
}
