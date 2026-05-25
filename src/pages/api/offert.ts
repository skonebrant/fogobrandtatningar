import type { APIRoute } from 'astro';
import { Resend } from 'resend';

// This is the ONLY non-static route. The Vercel adapter compiles it into a
// single Serverless Function; everything else ships as static HTML.
export const prerender = false;

const wantsJson = (req: Request) =>
  (req.headers.get('accept') || '').includes('application/json');

const field = (fd: FormData, k: string) => (fd.get(k) ?? '').toString().trim();

export const POST: APIRoute = async ({ request, redirect }) => {
  const fd = await request.formData();

  // Honeypot: real users never fill this. If present, fake success silently.
  if (field(fd, 'company')) {
    return wantsJson(request)
      ? Response.json({ ok: true })
      : redirect('/tack/', 303);
  }

  const namn = field(fd, 'namn');
  const epost = field(fd, 'epost');
  const telefon = field(fd, 'telefon');
  const meddelande = field(fd, 'meddelande');
  const tjanst = field(fd, 'jobb') || field(fd, 'tjanst');
  const kalla = field(fd, 'kalla');

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(epost);
  if (!namn || !emailOk) {
    return wantsJson(request)
      ? new Response(JSON.stringify({ ok: false, error: 'validation' }), { status: 400, headers: { 'content-type': 'application/json' } })
      : redirect('/?fel=1#kontakt', 303);
  }

  // Env: process.env at runtime on Vercel; import.meta.env as a local fallback.
  const env = (k: string) =>
    (typeof process !== 'undefined' && process.env?.[k]) || (import.meta.env as any)[k];
  const apiKey = env('RESEND_API_KEY');
  const to = env('LEAD_TO_EMAIL') || 'niklas@fogobrandtatningar.se';
  const from = env('LEAD_FROM_EMAIL') || 'Offertförfrågan <offert@fogobrandtatningar.se>';

  try {
    if (!apiKey) throw new Error('RESEND_API_KEY saknas');
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: epost,
      subject: `Offertförfrågan${tjanst ? ` – ${tjanst}` : ''}`,
      text:
        `Ny offertförfrågan från webbplatsen\n\n` +
        `Namn:     ${namn}\n` +
        `E-post:   ${epost}\n` +
        `Telefon:  ${telefon || '-'}\n` +
        `Tjänst:   ${tjanst || '-'}\n` +
        `Källa:    ${kalla || '-'}\n\n` +
        `Meddelande:\n${meddelande || '-'}\n`,
    });
    if (error) throw error;
  } catch (err) {
    console.error('Resend send failed:', err);
    return wantsJson(request)
      ? new Response(JSON.stringify({ ok: false }), { status: 500, headers: { 'content-type': 'application/json' } })
      : redirect('/?fel=1#kontakt', 303);
  }

  return wantsJson(request)
    ? Response.json({ ok: true })
    : redirect('/tack/', 303);
};

export const GET: APIRoute = () =>
  new Response('Method Not Allowed', { status: 405, headers: { Allow: 'POST' } });
