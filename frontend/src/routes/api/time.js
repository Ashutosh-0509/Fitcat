export async function GET() {
  return new Response(JSON.stringify({ time: new Date().toISOString() }), {
    headers: { "content-type": "application/json" },
  });
}
