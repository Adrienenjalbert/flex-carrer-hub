const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

/**
 * SEMrush Keyword Overview API
 * Returns search volume, CPC, competition for a keyword in the US database.
 * Used for content discovery and keyword research in the Career Hub pipeline.
 */
Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { phrase, database = 'us' } = await req.json();

    if (!phrase || typeof phrase !== 'string') {
      return new Response(
        JSON.stringify({ success: false, error: 'phrase (string) is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = Deno.env.get('SEMRUSH_API_KEY');
    if (!apiKey) {
      console.error('SEMRUSH_API_KEY not configured');
      return new Response(
        JSON.stringify({ success: false, error: 'SEMrush connector not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const params = new URLSearchParams({
      type: 'phrase_this',
      key: apiKey,
      phrase: phrase.trim(),
      database,
      export_columns: 'Ph,Nq,Cp,Co,Nr',
      export_decode: '1',
    });

    const url = `https://api.semrush.com/?${params.toString()}`;
    console.log('SEMrush keyword lookup:', phrase, 'database:', database);

    const response = await fetch(url);
    const text = await response.text();

    if (!response.ok) {
      console.error('SEMrush API error:', response.status, text);
      return new Response(
        JSON.stringify({
          success: false,
          error: `SEMrush request failed: ${response.status}`,
          details: text.slice(0, 200),
        }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // SEMrush returns "ERROR 50: ..." etc. for API errors
    if (text.startsWith('ERROR')) {
      return new Response(
        JSON.stringify({ success: false, error: text.split('\n')[0] }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse CSV response (semicolon-separated)
    // Columns: Ph (phrase), Nq (search volume), Cp (CPC), Co (competition), Nr (results)
    const lines = text.trim().split('\n');
    const results: Array<{
      phrase: string;
      searchVolume: number;
      cpc: number;
      competition: number;
      results: number;
    }> = [];

    if (lines.length > 0) {
      const headers = lines[0].split(';').map((h) => h.trim());
      const phraseIdx = headers.findIndex((h) => h === 'Keyword' || h === 'Ph');
      const volumeIdx = headers.findIndex((h) => h === 'Search Volume' || h === 'Nq');
      const cpcIdx = headers.findIndex((h) => h === 'CPC' || h === 'Cp');
      const compIdx = headers.findIndex((h) => h === 'Competition' || h === 'Co');
      const resultsIdx = headers.findIndex((h) => h === 'Results' || h === 'Nr');

      for (let i = 1; i < lines.length; i++) {
        const cols = lines[i].split(';').map((c) => c.trim());
        results.push({
          phrase: cols[phraseIdx] ?? phrase,
          searchVolume: parseInt(cols[volumeIdx] ?? '0', 10) || 0,
          cpc: parseFloat(cols[cpcIdx] ?? '0') || 0,
          competition: parseFloat(cols[compIdx] ?? '0') || 0,
          results: parseInt(cols[resultsIdx] ?? '0', 10) || 0,
        });
      }
    }

    const primary = results[0] ?? null;

    return new Response(
      JSON.stringify({
        success: true,
        phrase,
        database,
        primary: primary
          ? {
              searchVolume: primary.searchVolume,
              cpc: primary.cpc,
              competition: primary.competition,
              results: primary.results,
            }
          : null,
        allResults: results,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error fetching SEMrush:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch keyword data';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
