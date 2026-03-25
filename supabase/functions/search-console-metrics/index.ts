/**
 * Search Console Metrics Edge Function
 *
 * Fetches Google Search Console performance data for Career Hub pages.
 * Returns per-page clicks, impressions, CTR, and average position.
 *
 * Required secret: GOOGLE_SEARCH_CONSOLE_CREDENTIALS (JSON service account key)
 * Required secret: GOOGLE_SEARCH_CONSOLE_SITE_URL (e.g., "https://indeedflex.com")
 *
 * Setup:
 *   1. Create a service account in Google Cloud Console
 *   2. Enable the Search Console API
 *   3. Add the service account as a user in Search Console
 *   4. supabase secrets set GOOGLE_SEARCH_CONSOLE_CREDENTIALS='{"type":"service_account",...}'
 *   5. supabase secrets set GOOGLE_SEARCH_CONSOLE_SITE_URL='https://indeedflex.com'
 */

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SearchConsoleRequest {
  startDate?: string;
  endDate?: string;
  urlFilter?: string;
  dimensions?: string[];
  rowLimit?: number;
}

interface SearchConsoleRow {
  keys: string[];
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

interface PerformanceResponse {
  success: boolean;
  rows: SearchConsoleRow[];
  responseAggregationType?: string;
  error?: string;
}

async function getAccessToken(credentials: Record<string, string>): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = btoa(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claimSet = btoa(JSON.stringify({
    iss: credentials.client_email,
    scope: 'https://www.googleapis.com/auth/webmasters.readonly',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  }));

  const signatureInput = `${header}.${claimSet}`;

  const keyData = credentials.private_key
    .replace(/-----BEGIN PRIVATE KEY-----/, '')
    .replace(/-----END PRIVATE KEY-----/, '')
    .replace(/\n/g, '');

  const binaryKey = Uint8Array.from(atob(keyData), c => c.charCodeAt(0));

  const cryptoKey = await crypto.subtle.importKey(
    'pkcs8',
    binaryKey,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign'],
  );

  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    cryptoKey,
    new TextEncoder().encode(signatureInput),
  );

  const signatureB64 = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const jwt = `${header}.${claimSet}.${signatureB64}`;

  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });

  const tokenData = await tokenResponse.json();
  if (!tokenData.access_token) {
    throw new Error(`Failed to get access token: ${JSON.stringify(tokenData)}`);
  }

  return tokenData.access_token;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const credentialsJson = Deno.env.get('GOOGLE_SEARCH_CONSOLE_CREDENTIALS');
    const siteUrl = Deno.env.get('GOOGLE_SEARCH_CONSOLE_SITE_URL');

    if (!credentialsJson || !siteUrl) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Search Console credentials not configured. Set GOOGLE_SEARCH_CONSOLE_CREDENTIALS and GOOGLE_SEARCH_CONSOLE_SITE_URL secrets.',
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const credentials = JSON.parse(credentialsJson);
    const body: SearchConsoleRequest = await req.json();

    const today = new Date();
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const startDate = body.startDate || thirtyDaysAgo.toISOString().split('T')[0];
    const endDate = body.endDate || today.toISOString().split('T')[0];
    const dimensions = body.dimensions || ['page'];
    const rowLimit = body.rowLimit || 500;

    console.log(`Fetching Search Console data: ${startDate} to ${endDate}`);

    const accessToken = await getAccessToken(credentials);

    const apiUrl = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`;

    const requestBody: Record<string, unknown> = {
      startDate,
      endDate,
      dimensions,
      rowLimit,
    };

    if (body.urlFilter) {
      requestBody.dimensionFilterGroups = [{
        filters: [{
          dimension: 'page',
          operator: 'contains',
          expression: body.urlFilter,
        }],
      }];
    }

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Search Console API error:', data);
      return new Response(
        JSON.stringify({ success: false, error: data.error?.message || `API request failed: ${response.status}` }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const rows: SearchConsoleRow[] = (data.rows || []).map((row: Record<string, unknown>) => ({
      keys: row.keys as string[],
      clicks: row.clicks as number,
      impressions: row.impressions as number,
      ctr: Math.round((row.ctr as number) * 10000) / 100,
      position: Math.round((row.position as number) * 10) / 10,
    }));

    console.log(`Search Console returned ${rows.length} rows`);

    return new Response(
      JSON.stringify({
        success: true,
        startDate,
        endDate,
        rows,
        responseAggregationType: data.responseAggregationType,
      } as PerformanceResponse),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  } catch (error) {
    console.error('Error fetching Search Console data:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch Search Console data';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }
});
