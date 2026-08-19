import { useMemo, useState } from 'react';
import {
  Search, ArrowLeft, AlertTriangle, ClipboardList, Camera, Users, Filter,
  BookOpen, Crosshair, ShieldCheck, FileText, Copy, Printer, RotateCcw,
  ChevronRight, Wrench, Recycle, FlaskConical, BadgeCheck,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import {
  INDUSTRIES, CONTAMINANTS, CONDITIONS,
  getMergedEntry, searchEntries,
  type AppEntry, type Contaminant, type Condition,
} from '@/data/applications';

const CONTAMINANT_COLORS: Record<Contaminant, string> = {
  Dust: 'bg-amber-100 text-amber-800 border-amber-200',
  Fume: 'bg-slate-200 text-slate-800 border-slate-300',
  Mist: 'bg-sky-100 text-sky-800 border-sky-200',
  Vapor: 'bg-violet-100 text-violet-800 border-violet-200',
  Abrasive: 'bg-stone-200 text-stone-800 border-stone-300',
  Sticky: 'bg-lime-100 text-lime-800 border-lime-200',
  Combustible: 'bg-red-100 text-red-800 border-red-200',
  'High-toxicity': 'bg-purple-100 text-purple-900 border-purple-300',
};

function Section({ icon, title, children, tone = 'default' }: {
  icon: React.ReactNode; title: string; children: React.ReactNode; tone?: 'default' | 'danger' | 'action';
}) {
  const tones = {
    default: 'border-slate-200 bg-white',
    danger: 'border-red-200 bg-red-50/60',
    action: 'border-emerald-200 bg-emerald-50/60',
  };
  const iconTones = {
    default: 'bg-blue-100 text-blue-700',
    danger: 'bg-red-100 text-red-700',
    action: 'bg-emerald-100 text-emerald-700',
  };
  return (
    <div className={`rounded-xl border p-4 ${tones[tone]}`}>
      <div className="flex items-center gap-2 mb-3">
        <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg ${iconTones[tone]}`}>{icon}</span>
        <h3 className="font-semibold text-slate-900 text-sm tracking-wide uppercase">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((t, i) => (
        <li key={i} className="flex gap-2 text-sm text-slate-700 leading-snug">
          <ChevronRight className="w-4 h-4 mt-0.5 shrink-0 text-slate-400" />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

function buildBrief(e: AppEntry): string {
  const line = (label: string, items: string[]) =>
    items.length ? `${label}\n${items.map((i) => `  - ${i}`).join('\n')}\n` : '';
  return [
    `OPPORTUNITY BRIEF — ${e.name}`,
    `Generated: ${new Date().toLocaleDateString()}`,
    ``,
    `Application family: ${e.family}`,
    `Reference: ${e.acgih}`,
    `Industries: ${e.industries.join(', ')}`,
    `Contaminants: ${e.contaminants.join(', ')}`,
    ``,
    `OVERVIEW`,
    e.overview,
    ``,
    line('DISCOVERY QUESTIONS', e.discovery),
    line('TECHNICAL & SAFETY RED FLAGS', e.redFlags),
    `CAMFIL SOLUTION NARRATIVE\n${e.camfil}\n`,
    line('LIKELY STAKEHOLDERS', e.stakeholders),
    line('SITE-SURVEY REQUIREMENTS', e.siteSurvey),
    `AFTERMARKET / FILTER IMPLICATIONS\n${e.aftermarket}\n`,
    `ENGINEERING REVIEW TRIGGER\n${e.engineeringTrigger}\n`,
    line('CASE-STUDY ANGLES (pull from library)', e.caseStudyAngles),
    `DISCLAIMER: Sales discovery guide only — not an engineering design. Verify VS plates against the current ACGIH edition. Route engineering triggers to applications engineering before quoting.`,
  ].join('\n');
}

function DetailView({ entry, onBack }: { entry: AppEntry; onBack: () => void }) {
  const e = getMergedEntry(entry);
  const [briefOpen, setBriefOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const brief = buildBrief(e);

  const copyBrief = async () => {
    try { await navigator.clipboard.writeText(brief); } catch {
      const ta = document.createElement('textarea');
      ta.value = brief; document.body.appendChild(ta); ta.select();
      document.execCommand('copy'); document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <Button variant="ghost" onClick={onBack} className="gap-2 -ml-2">
          <ArrowLeft className="w-4 h-4" /> Back to results
        </Button>
        <Button onClick={() => setBriefOpen(true)} className="gap-2 bg-blue-700 hover:bg-blue-800">
          <FileText className="w-4 h-4" /> One-Click Opportunity Brief
        </Button>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
          <BookOpen className="w-4 h-4" />
          <span>{e.family}</span>
          {e.kind === 'equipment' && <Badge variant="secondary" className="text-xs">Equipment entry</Badge>}
        </div>
        <h1 className="text-3xl font-bold text-slate-900">{e.name}</h1>
        <p className="text-sm font-medium text-blue-700 mt-1">{e.acgih}</p>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {e.contaminants.map((c) => (
            <span key={c} className={`text-xs px-2 py-0.5 rounded-full border font-medium ${CONTAMINANT_COLORS[c]}`}>{c}</span>
          ))}
          {e.industries.map((i) => (
            <Badge key={i} variant="outline" className="text-xs">{i}</Badge>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <Section icon={<BookOpen className="w-4 h-4" />} title="Application Overview">
            <p className="text-sm text-slate-700 leading-relaxed">{e.overview}</p>
          </Section>
        </div>

        <Section icon={<Crosshair className="w-4 h-4" />} title="Source-Capture Considerations">
          <BulletList items={e.sourceCapture} />
        </Section>

        <Section icon={<ClipboardList className="w-4 h-4" />} title="Discovery Questions — Ask About">
          <BulletList items={e.discovery} />
        </Section>

        <div className="md:col-span-2">
          <Section icon={<AlertTriangle className="w-4 h-4" />} title="Technical & Safety Red Flags" tone="danger">
            <BulletList items={e.redFlags} />
          </Section>
        </div>

        <div className="md:col-span-2">
          <Section icon={<ShieldCheck className="w-4 h-4" />} title="Camfil Solution Narrative" tone="action">
            <p className="text-sm text-slate-700 leading-relaxed">{e.camfil}</p>
          </Section>
        </div>

        <Section icon={<Users className="w-4 h-4" />} title="Likely Stakeholders">
          <BulletList items={e.stakeholders} />
        </Section>

        <Section icon={<Camera className="w-4 h-4" />} title="Site-Survey Requirements">
          <BulletList items={e.siteSurvey} />
        </Section>

        <Section icon={<Recycle className="w-4 h-4" />} title="Aftermarket / Filter Implications">
          <p className="text-sm text-slate-700 leading-relaxed">{e.aftermarket}</p>
        </Section>

        <Section icon={<FlaskConical className="w-4 h-4" />} title="Engineering Review Trigger" tone="danger">
          <p className="text-sm text-slate-700 leading-relaxed">{e.engineeringTrigger}</p>
        </Section>

        <div className="md:col-span-2">
          <Section icon={<BadgeCheck className="w-4 h-4" />} title="Related Case-Study Angles">
            <BulletList items={e.caseStudyAngles} />
            <p className="text-xs text-slate-500 mt-3 italic">Pull matching published case studies from the marketing library before customer use.</p>
          </Section>
        </div>
      </div>

      <Dialog open={briefOpen} onOpenChange={setBriefOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Opportunity Brief — {e.name}</DialogTitle>
          </DialogHeader>
          <pre className="flex-1 overflow-auto whitespace-pre-wrap text-xs font-mono bg-slate-50 border rounded-lg p-4 text-slate-800">{brief}</pre>
          <div className="flex gap-2 justify-end pt-2">
            <Button variant="outline" onClick={copyBrief} className="gap-2">
              <Copy className="w-4 h-4" /> {copied ? 'Copied!' : 'Copy to clipboard'}
            </Button>
            <Button variant="outline" onClick={() => window.print()} className="gap-2">
              <Printer className="w-4 h-4" /> Print
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ResultCard({ entry, onOpen }: { entry: AppEntry; onOpen: () => void }) {
  return (
    <Card className="cursor-pointer hover:shadow-md hover:border-blue-300 transition-all group" onClick={onOpen}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs text-slate-500 mb-0.5">{entry.family}</p>
            <h3 className="font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">{entry.name}</h3>
          </div>
          {entry.kind === 'equipment'
            ? <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200 text-xs shrink-0"><Wrench className="w-3 h-3 mr-1" />Equipment</Badge>
            : <Badge variant="secondary" className="text-xs shrink-0">Family</Badge>}
        </div>
        <p className="text-xs text-blue-700 font-medium mt-1.5">{entry.acgih}</p>
        <p className="text-sm text-slate-600 mt-2 line-clamp-2">{entry.overview}</p>
        <div className="flex flex-wrap gap-1 mt-3">
          {entry.contaminants.slice(0, 4).map((c) => (
            <span key={c} className={`text-[11px] px-1.5 py-0.5 rounded-full border ${CONTAMINANT_COLORS[c]}`}>{c}</span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function App() {
  const [query, setQuery] = useState('');
  const [industry, setIndustry] = useState<string | null>(null);
  const [contaminants, setContaminants] = useState<Set<Contaminant>>(new Set());
  const [conditions, setConditions] = useState<Set<Condition>>(new Set());
  const [equipmentOnly, setEquipmentOnly] = useState(false);
  const [selected, setSelected] = useState<AppEntry | null>(null);

  const results = useMemo(
    () => searchEntries(query, industry, contaminants, conditions, equipmentOnly),
    [query, industry, contaminants, conditions, equipmentOnly],
  );

  const toggle = <T,>(set: Set<T>, val: T, setter: (s: Set<T>) => void) => {
    const next = new Set(set);
    if (next.has(val)) next.delete(val); else next.add(val);
    setter(next);
  };

  const resetFilters = () => {
    setQuery(''); setIndustry(null); setContaminants(new Set()); setConditions(new Set()); setEquipmentOnly(false);
  };

  const hasFilters = query || industry || contaminants.size || conditions.size || equipmentOnly;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-blue-900 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <h1 className="text-xl md:text-2xl font-bold tracking-tight">APC Application &amp; VS Plate Navigator</h1>
          <p className="text-blue-200 text-sm mt-1">
            Sales discovery knowledge base · ACGIH Industrial Ventilation, Chapter 13 taxonomy
          </p>
        </div>
        <div className="bg-amber-400 text-amber-950">
          <div className="max-w-7xl mx-auto px-4 py-1.5 text-xs font-medium flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
            Sales discovery guide — not an engineering design tool. Verify VS plates against the current ACGIH edition and route engineering triggers to applications engineering.
          </div>
        </div>
      </header>

      {selected ? (
        <main className="px-4 py-6">
          <DetailView entry={selected} onBack={() => setSelected(null)} />
        </main>
      ) : (
        <main className="max-w-7xl mx-auto px-4 py-6 grid gap-6 lg:grid-cols-[280px_1fr]">
          {/* Filters */}
          <aside className="space-y-5 lg:sticky lg:top-6 self-start">
            <div className="bg-white rounded-xl border p-4 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-sm text-slate-900 flex items-center gap-2">
                  <Filter className="w-4 h-4" /> Search &amp; Filters
                </h2>
                {hasFilters && (
                  <Button variant="ghost" size="sm" onClick={resetFilters} className="h-7 text-xs gap-1 text-slate-500">
                    <RotateCcw className="w-3 h-3" /> Reset
                  </Button>
                )}
              </div>

              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input
                  value={query}
                  onChange={(ev) => setQuery(ev.target.value)}
                  placeholder='Try "CNC router", "welding", "bin vent"…'
                  className="pl-9"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Industry</label>
                <Select value={industry ?? 'all'} onValueChange={(v) => setIndustry(v === 'all' ? null : v)}>
                  <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All industries</SelectItem>
                    {INDUSTRIES.map((i) => <SelectItem key={i} value={i}>{i}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Contaminant</label>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {CONTAMINANTS.map((c) => (
                    <button
                      key={c}
                      onClick={() => toggle(contaminants, c, setContaminants)}
                      className={`text-xs px-2 py-1 rounded-full border font-medium transition-all ${
                        contaminants.has(c) ? CONTAMINANT_COLORS[c] + ' ring-2 ring-offset-1 ring-blue-400' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                      }`}
                    >{c}</button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Existing Condition</label>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {CONDITIONS.map((c) => (
                    <button
                      key={c}
                      onClick={() => toggle(conditions, c, setConditions)}
                      className={`text-xs px-2 py-1 rounded-full border font-medium transition-all ${
                        conditions.has(c) ? 'bg-blue-700 text-white border-blue-700' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                      }`}
                    >{c}</button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Equipment entries only</label>
                <Switch checked={equipmentOnly} onCheckedChange={setEquipmentOnly} />
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-xs text-blue-900 leading-relaxed">
              <p className="font-semibold mb-1">How to use</p>
              Search by application, industry, contaminant, equipment, or existing condition. Open a result for discovery questions, red flags, and the recommended next step — then generate the opportunity brief for your call prep.
            </div>
          </aside>

          {/* Results */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-slate-600">
                <span className="font-semibold text-slate-900">{results.length}</span> result{results.length === 1 ? '' : 's'}
              </p>
            </div>
            {results.length === 0 ? (
              <div className="bg-white border rounded-xl p-10 text-center text-slate-500">
                <Search className="w-8 h-8 mx-auto mb-3 text-slate-300" />
                <p className="font-medium">No matches</p>
                <p className="text-sm mt-1">Try broadening the search or clearing a filter.</p>
                <Button variant="outline" size="sm" className="mt-4" onClick={resetFilters}>Clear all filters</Button>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {results.map((e) => <ResultCard key={e.id} entry={e} onOpen={() => setSelected(e)} />)}
              </div>
            )}

            <Separator className="my-6" />
            <p className="text-xs text-slate-400 leading-relaxed">
              Taxonomy per ACGIH <em>Industrial Ventilation: A Manual of Recommended Practice for Design</em>, Chapter 13 (Specific Operations): welding &amp; cutting · woodworking · grinding/buffing/polishing/abrasive blasting · machining · foundry &amp; metal melting · material transport &amp; loadout · mixing · open surface tanks · paint operations · LVHV source capture · vehicle exhaust · push-pull systems · specialty operations. Plate numbers shown at series level — confirm exact plates in the current edition.
            </p>
          </section>
        </main>
      )}
    </div>
  );
}
