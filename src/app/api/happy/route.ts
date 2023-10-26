export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const mysearchparam = searchParams.get('mysearchparam')
    console.log(mysearchparam)
    return new Response('hi')
}

export async function POST(request: Request){
    const body = await request.json()

    console.log(body)
    return new Response(JSON.stringify({hello: 'world'}))
}