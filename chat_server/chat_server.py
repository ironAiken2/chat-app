import aiohttp
import aiohttp.web
import aiohttp_session
from aiohttp_session import get_session
import uuid
import redis.asyncio as redis
import redis

async def session_handler(request):
    session = await get_session(request)
    session['session_id'] = str(uuid.uuid4())

    # Problem: CORS error (fixed) due to different domain (server : localhost:8080, client : localhost:3000)
    response = aiohttp.web.Response(headers={'Access-Control-Allow-Origin': 'http://localhost:3000',
                                             'Access-Control-Allow-Credentials': 'true'})
    response.set_cookie('session_id', session['session_id'])

    # return response
    print(response.headers)
    print(response.cookies)
    
    return response

async def websocket_handler(request):
    ws = aiohttp.web.WebSocketResponse()
    await ws.prepare(request)
    
    app = request.app
    app['websockets'].add(ws)

    async for msg in ws:
        if msg.data == 'false':
            app['websockets'].remove(ws)
            break
        if msg.type == aiohttp.WSMsgType.TEXT:
            print(msg.data, type(msg.data))
            for ws in app['websockets']:
                await ws.send_str(msg.data) 
        elif msg.type == aiohttp.WSMsgType.ERROR:
            break

    return ws

async def on_shutdown(app):
    for ws in app['websockets']:
        await ws.close()

async def init_app():
    app = aiohttp.web.Application()
    #redis connection
    redis_pool = redis.ConnectionPool(host='localhost', port=6379, db=0)
    
    routes = [
        aiohttp.web.get('/', session_handler),
        aiohttp.web.get('/chat', websocket_handler)]
    app.add_routes(routes)
    app['websockets'] = set()
    app['redis'] = redis.Redis(connection_pool=redis_pool)
    app['pubsub'] = app['redis'].pubsub()
    app['pubsub'].subscribe('chat')

    app.on_shutdown.append(on_shutdown)

    # Problem2: session error (fixed) due to no session middleware
    aiohttp_session.setup(app, aiohttp_session.SimpleCookieStorage())

    return app

if __name__ == '__main__':
    aiohttp.web.run_app(init_app())
