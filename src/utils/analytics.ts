// Client-side analytics tracker

function getSessionId(): string {
  let sid = sessionStorage.getItem('classic_session_id');
  if (!sid) {
    sid = `sess_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    sessionStorage.setItem('classic_session_id', sid);
  }
  return sid;
}

export function trackPageView(page: string, title?: string) {
  try {
    const sessionId = getSessionId();
    const referrer = document.referrer || (window.location.search.includes('fbclid') ? 'https://www.facebook.com/' : 'direct');
    
    fetch('/api/track/visit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        path: window.location.pathname + window.location.hash || `/${page}`,
        pageTitle: title || page,
        referrer,
        sessionId,
      }),
    }).catch((e) => console.debug('Track visit ping:', e));
  } catch (err) {
    // Non-blocking
  }
}

export function trackEvent(eventType: string, label: string, path?: string) {
  try {
    const sessionId = getSessionId();
    fetch('/api/track/event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventType,
        label,
        path: path || window.location.pathname,
        sessionId,
      }),
    }).catch(() => {});
  } catch (err) {
    // Non-blocking
  }
}

export async function submitLead(data: {
  name: string;
  phone: string;
  email?: string;
  placeType?: string;
  location?: string;
  problemType?: string;
  serviceRequested?: string;
  preferredTime?: string;
  notes?: string;
  source: string;
}) {
  try {
    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err) {
    console.error('Failed to submit lead to server:', err);
    return null;
  }
}
