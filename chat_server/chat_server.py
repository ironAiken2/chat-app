import aiohttp
import aiohttp.web
import redis.asyncio as redis

async def websocket_handler(request):
    ws = aiohttp.web.WebSocketResponse()
    await ws.prepare(request)
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

# async def init_redis(app):
#     app['redis'] = redis.Redis()
#     print(await app['redis'].ping())

async def on_shutdown(app):
    for ws in app['websockets']:
        await ws.close()

app = aiohttp.web.Application()
app.router.add_get('/chat', websocket_handler)
app['websockets'] = set()

app.on_shutdown.append(on_shutdown)
# app.on_startup.append(init_redis)

if __name__ == '__main__':
    aiohttp.web.run_app(app)
