// Generated automatically. Do not edit.

const QUESTIONS_PER_QUIZ = {
  
  concurrency: [
    
    {
      preface: `<p>What does this output?</p>
`,
      code: `from time import sleep

sleep(3)
print("done")
sleep(3)
print("done")
print("here")
`,
      output: `<~3s>
done
<~3s>
done
here
`,
      explanation: `<p>One process, one thread, no event loop.</p>

<p>Simple. Slow.</p>
`,
      highlightjsAlias: `py`,
    },
    
    {
      preface: `<p>Let's extract the work into a function. Output?</p>
`,
      code: `from time import sleep


def io_bound():
    sleep(3)
    print("done")


io_bound()
io_bound()
print("here")
`,
      output: `<~3s>
done
<~3s>
done
here
`,
      explanation: `<p>No different of course.</p>
`,
      highlightjsAlias: `py`,
    },
    
    {
      preface: `<p>What if the work is CPU-bound?</p>
`,
      code: `from time import thread_time


def cpu_bound():
    start = thread_time()
    while thread_time() - start < 3:
        continue
    print("done")


cpu_bound()
cpu_bound()
print("here")
`,
      output: `<~3s>
done
<~3s>
done
here
`,
      explanation: `<p>Again, no different.</p>

<p>
  (The busyloop is a placeholder: think of it as anything which needs 3s of
  CPU.)
</p>
`,
      highlightjsAlias: `py`,
    },
    
    {
      preface: `<p>Time for some concurrency. Let's move the work into threads.</p>
`,
      code: `from threading import Thread
from time import thread_time


def cpu_bound():
    start = thread_time()
    while thread_time() - start < 3:
        continue
    print("done")


thread1 = Thread(target=cpu_bound)
thread2 = Thread(target=cpu_bound)
thread1.start()
thread2.start()
print("here")
`,
      output: `here
<~6s>
done
done
`,
      explanation: `<p>
  Three threads are in play: the main thread, <code>thread1</code>,
  <code>thread2</code>.
</p>

<p>A thread runs only when it holds the Global Interpreter Lock.</p>

<p>
  The running thread is paused frequently and a ready thread gets the GIL and
  runs. <em>Interleaved, not parallel.</em>
</p>

<p>
  The main thread prints almost immediately. The others continue interleaving,
  so take ~3s of CPU but ~6s of wall-clock.
</p>
`,
      highlightjsAlias: `py`,
    },
    
    {
      preface: `<p>What if the work is IO-bound instead?</p>
`,
      code: `from threading import Thread
from time import sleep


def io_bound():
    sleep(3)
    print("done")


thread1 = Thread(target=io_bound)
thread2 = Thread(target=io_bound)
thread1.start()
thread2.start()
print("here")
`,
      output: `here
<~3s>
done
done
`,
      explanation: `<p>Speedup, despite the GIL!</p>

<p>Interleaved, not parallel. But for IO-bound work, interleaving helps.</p>

<p>
  <code>thread1</code> and <code>thread2</code> don't <em>run</em> in parallel,
  because of the GIL. But they can <em>wait</em> in parallel, so to speak.
</p>
`,
      highlightjsAlias: `py`,
    },
    
    {
      preface: `<p>What if we <code>join()</code> them?</p>
`,
      code: `from threading import Thread
from time import sleep


def io_bound():
    sleep(3)
    print("done")


thread1 = Thread(target=io_bound)
thread2 = Thread(target=io_bound)
thread1.start()
thread1.join()
thread2.start()
thread2.join()
print("here")
`,
      output: `<~3s>
done
<~3s>
done
here
`,
      explanation: `<p><code>join()</code> blocks until the receiver completes.</p>
`,
      highlightjsAlias: `py`,
    },
    
    {
      preface: `<p>Any difference if they're CPU-bound?</p>
`,
      code: `from threading import Thread
from time import thread_time


def cpu_bound():
    start = thread_time()
    while thread_time() - start < 3:
        continue
    print("done")


thread1 = Thread(target=cpu_bound)
thread2 = Thread(target=cpu_bound)
thread1.start()
thread1.join()
thread2.start()
thread2.join()
print("here")
`,
      output: `<~3s>
done
<~3s>
done
here
`,
      explanation: `<p>No. To repeat: <code>join()</code> blocks until the receiver completes.</p>
`,
      highlightjsAlias: `py`,
    },
    
    {
      preface: `<p>Back to IO-bound. What if we re-order?</p>
`,
      code: `from threading import Thread
from time import sleep


def io_bound():
    sleep(3)
    print("done")


thread1 = Thread(target=io_bound)
thread2 = Thread(target=io_bound)
thread1.start()
thread2.start()
thread1.join()
thread2.join()
print("here")
`,
      output: `<~3s>
done
done
here
`,
      explanation: `<p>
  <code>thread1.join()</code> blocks the main thread, but not
  <code>thread2</code>.
</p>

<p>
  <code>thread1</code> and <code>thread2</code> are IO-bound, so interleaving
  helps.
</p>
`,
      highlightjsAlias: `py`,
    },
    
    {
      preface: `<p>And for completeness, back to CPU-bound again.</p>
`,
      code: `from threading import Thread
from time import thread_time


def cpu_bound():
    start = thread_time()
    while thread_time() - start < 3:
        continue
    print("done")


thread1 = Thread(target=cpu_bound)
thread2 = Thread(target=cpu_bound)
thread1.start()
thread2.start()
thread1.join()
thread2.join()
print("here")
`,
      output: `<~6s>
done
done
here
`,
      explanation: `<p>
  <code>thread1.join()</code> blocks the main thread, not <code>thread2</code>.
</p>

<p>But they're still CPU-bound so the total time is unchanged.</p>
`,
      highlightjsAlias: `py`,
    },
    
    {
      preface: `<p>Swapping busyloop for busysum surely makes no difference, right?</p>
`,
      code: `from threading import Thread


def cpu_bound():
    # assume takes 3s of cpu
    sum(range(2**25))
    print("done")


thread1 = Thread(target=cpu_bound)
thread2 = Thread(target=cpu_bound)
thread1.start()
thread2.start()
thread1.join()
thread2.join()
print("here")
`,
      output: `<~3s>
done
<~3s>
done
here
`,
      explanation: `<p>Beware!</p>

<p>
  The interpreter doesn't pause a thread while it's running native code, like
  this <code>sum()</code> does.
</p>

<p>Exercise: try <code>sum(i for i in range(2**25))</code>.</p>
`,
      highlightjsAlias: `py`,
    },
    
    {
      preface: `<p>What if threads go bad?</p>
`,
      code: `from threading import Thread


def bad():
    raise Exception


thread = Thread(target=bad)
thread.start()
thread.join()
print("here")
`,
      output: `Exception in thread Thread-1 (bad):
Traceback (most recent call last):
  ...
Exception
here
`,
      explanation: `<p>
  <code>threading.excepthook()</code> prints on stderr an exception raised by
  <code>Thread.run()</code>.
</p>

<p>
  But the exception doesn't propagate to the main thread, so
  <code>here</code> is still printed and the exit code is 0.
</p>
`,
      highlightjsAlias: `py`,
    },
    
    {
      preface: `<p>Let's swap threads for processes.</p>
`,
      code: `from multiprocessing import Process
from time import sleep


def io_bound():
    sleep(3)
    print("done")


if __name__ == "__main__":
    # assume multicore machine
    proc1 = Process(target=io_bound)
    proc2 = Process(target=io_bound)
    proc1.start()
    proc2.start()
    print("here")
`,
      output: `here
<~3s>
done
done
`,
      explanation: `<p>Process objects run in separate processes, each with their own GIL.</p>

<p>So they <em>can</em> run in parallel.</p>

<p>
  But for IO-bound work threads might be the better choice, because lower
  overhead.
</p>
`,
      highlightjsAlias: `py`,
    },
    
    {
      preface: `<p>And for CPU-bound work?</p>
`,
      code: `from time import thread_time
from multiprocessing import Process


def cpu_bound():
    start = thread_time()
    while thread_time() - start < 3:
        continue
    print("done")


if __name__ == "__main__":
    # running on multicore machine
    proc1 = Process(target=cpu_bound)
    proc2 = Process(target=cpu_bound)
    proc1.start()
    proc2.start()
    proc1.join()
    proc2.join()
    print("here")
`,
      output: `<~3s>
done
done
here
`,
      explanation: `<p>
  <code>thread1</code> and <code>thread2</code> are CPU-bound, so running in
  parallel helps.
</p>
`,
      highlightjsAlias: `py`,
    },
    
    {
      preface: `<p>What if processes go bad?</p>
`,
      code: `from multiprocessing import Process


def bad():
    raise Exception


if __name__ == "__main__":
    proc = Process(target=bad)
    proc.start()
    proc.join()
    print("here")
`,
      output: `Process Process-1:
Traceback (most recent call last):
  ...
Exception
here
`,
      explanation: `<p>
  Same story as for threads: the exception is printed on stderr but doesn't
  propagate to the main process.
</p>
`,
      highlightjsAlias: `py`,
    },
    
    {
      preface: `<p>A third approach: <code>asyncio</code>.</p>
`,
      code: `import asyncio
from time import sleep


async def io_bound():
    sleep(3)
    print("done")


async def main():
    io_bound()
    io_bound()
    print("here")


asyncio.run(main())
`,
      output: `here
`,
      explanation: `<p>
  A function defined with <code>async def</code> is a coroutine function and
  returns a coroutine.
</p>

<p>Just creating a coroutine doens't schedule it on the event loop.</p>
`,
      highlightjsAlias: `py`,
    },
    
    {
      preface: `<p>Ok, so let's <code>await</code>.</p>
`,
      code: `import asyncio
from time import sleep


async def io_bound():
    sleep(3)
    print("done")


async def main():
    await io_bound()
    await io_bound()
    print("here")


asyncio.run(main())
`,
      output: `<~3s>
done
<~3s>
done
here
`,
      explanation: `<p>Awaiting a coroutine blocks until it completes.</p>

<p>No speedup yet.</p>
`,
      highlightjsAlias: `py`,
    },
    
    {
      preface: `<p>We need async-aware functions, like <code>asyncio.sleep()</code>, right?</p>
`,
      code: `import asyncio


async def io_bound():
    await asyncio.sleep(3)
    print("here")


async def main():
    await io_bound()
    await io_bound()
    print("done")


asyncio.run(main())
`,
      output: `<~3s>
here
<~3s>
here
done
`,
      explanation: `<p>
  <code>await asyncio.sleep()</code> does pass control to the event loop, but
  there's no other work scheduled at that point.
</p>
`,
      highlightjsAlias: `py`,
    },
    
    {
      preface: `<p>What if we <code>gather()</code> them instead?</p>
`,
      code: `import asyncio
from time import sleep


async def io_bound():
    sleep(3)
    print("done")


async def main():
    await asyncio.gather(io_bound(), io_bound())
    print("here")


asyncio.run(main())
`,
      output: `<~3s>
done
<~3s>
done
here
`,
      explanation: `<p><code>gather()</code> runs the awaitables concurrently.</p>

<p>
  But still no speedup, because <code>sleep()</code> blocks the one and only
  thread.
</p>
`,
      highlightjsAlias: `py`,
    },
    
    {
      preface: `<p>
  What if we <code>gather()</code> <em>and</em> <code>asyncio.sleep()</code>?
</p>
`,
      code: `import asyncio


async def io_bound():
    await asyncio.sleep(3)
    print("done")


async def main():
    await asyncio.gather(io_bound(), io_bound())
    print("here")


asyncio.run(main())
`,
      output: `<~3s>
done
done
here
`,
      explanation: `<p>Speedup at last!</p>
`,
      highlightjsAlias: `py`,
    },
    
    {
      preface: `<p>Remember threads?</p>
`,
      code: `import asyncio
from time import sleep


def io_bound():
    sleep(3)
    print("done")


async def main():
    await asyncio.gather(
        asyncio.to_thread(io_bound),
        asyncio.to_thread(io_bound),
    )
    print("here")


asyncio.run(main())
`,
      output: `<~3s>
done
done
here
`,
      explanation: `<p>
  <code>asyncio.to_thread()</code> is useful for async-unaware IO-bound
  functions.
</p>

<p>It runs the passed function in a separate thread, returning a coroutine.</p>

<p>
  <code>sleep()</code> releases the GIL so control can pass back to the main
  thread.
</p>
`,
      highlightjsAlias: `py`,
    },
    
    {
      preface: `<p>Know the differences between coroutines and tasks?</p>
`,
      code: `import asyncio


async def foo():
    print("in foo")


async def main():
    asyncio.create_task(foo())
    print("in main")


asyncio.run(main())
`,
      output: `in main
in foo
`,
      explanation: `<p><code>create_task()</code> schedules the task for execution.</p>

<p>But the main coroutine keeps control.</p>
`,
      highlightjsAlias: `py`,
    },
    
    {
      preface: `<p>How about this?</p>
`,
      code: `import asyncio


async def foo():
    print("in foo")


async def main():
    await asyncio.create_task(foo())
    print("in main")


asyncio.run(main())
`,
      output: `in foo
in main
`,
      explanation: `<p>Awaiting a task passes control to the event loop.</p>
`,
      highlightjsAlias: `py`,
    },
    
    {
      preface: `<p>And this?</p>
`,
      code: `import asyncio


async def foo():
    print("in foo")


async def bar():
    print("in bar")


async def main():
    asyncio.create_task(foo())
    await bar()


asyncio.run(main())
`,
      output: `in bar
in foo
`,
      explanation: `<p>Awaiting a coroutine doesn't pass control to the event loop.</p>
`,
      highlightjsAlias: `py`,
    },
    
    {
      preface: `<p>Last one on this theme.</p>
`,
      code: `import asyncio


async def foo():
    print("in foo")


async def bar():
    print("in bar")


async def main():
    asyncio.create_task(foo())
    await asyncio.create_task(bar())


asyncio.run(main())
`,
      output: `in foo
in bar
`,
      explanation: `<p>Awaiting a task passes control to the event loop.</p>
`,
      highlightjsAlias: `py`,
    },
    
    {
      preface: `<p>What if awaitables go bad?</p>
`,
      code: `import asyncio


async def foo():
    raise Exception


async def bar():
    await asyncio.sleep(3)
    print("here")


async def main():
    await asyncio.gather(foo(), bar())
    print("done")


asyncio.run(main())
`,
      output: `Traceback (most recent call last):
  ...
Exception
`,
      explanation: `<p>
  By default, <code>gather()</code> propagates the first raised exception, but
  <em>doesn't</em> cancel its other awaitables.
</p>
<p>
  However, when the exception propagates to <code>asyncio.run()</code>,
  <em>it</em> cancels any remaining awaitables.
</p>
`,
      highlightjsAlias: `py`,
    },
    
  ],
  
  sockets: [
    
    {
      preface: `<p>What does this output?</p>
`,
      code: `import socket
from threading import Thread


def client():
    sock = socket.socket()
    sock.connect(("127.0.0.1", 44444))
    sock.send(b"x")


srv = socket.socket()
srv.bind(("127.0.0.1", 44444))
srv.listen()
Thread(target=client).start()
conn, _ = srv.accept()
print(conn.recv(1))
`,
      output: `b'x'
`,
      explanation: `<p>A minimal example of socket communication.</p>
`,
      highlightjsAlias: `py`,
    },
    
    {
      preface: `<p>How about this?</p>
`,
      code: `import socket
from threading import Thread


def client():
    sock = socket.create_connection(("127.0.0.1", 44444))
    sock.send(b"x")


srv = socket.create_server(("127.0.0.1", 44444))
Thread(target=client).start()
conn, _ = srv.accept()
print(conn.recv(1))
`,
      output: `b'x'
`,
      explanation: `<p>As before, but taking advantage of convenience functions.</p>
`,
      highlightjsAlias: `py`,
    },
    
    {
      preface: `<p>Let's dig deeper. Output?</p>
`,
      code: `import socket
from threading import Thread


def client():
    conn = socket.create_connection(("127.0.0.1", 44444))
    print(type(conn).__name__)


srv = socket.create_server(("127.0.0.1", 44444))
Thread(target=client).start()
conn, _ = srv.accept()
print(type(srv).__name__)
print(type(conn).__name__)
`,
      output: `socket
socket
socket
`,
      explanation: `<p>
  Sockets can play two roles: servers (switchboard operators) and clients
  (connection endpoints).
</p>

<p>But they're all just sockets.</p>
`,
      highlightjsAlias: `py`,
    },
    
    {
      preface: `<p><code>accept()</code> returns a new local socket, but at what address?</p>
`,
      code: `import socket
from threading import Thread


def client():
    socket.create_connection(("127.0.0.1", 44444))


srv = socket.create_server(("127.0.0.1", 44444))
Thread(target=client).start()
conn, _ = srv.accept()
print(conn.getsockname())
`,
      output: `('127.0.0.1', 44444)
`,
      explanation: `<p>New socket. Same address.</p>
`,
      highlightjsAlias: `py`,
    },
    
    {
      preface: `<p>How far can you get without a peer?</p>
`,
      code: `import socket
from threading import Thread


def client():
    sock = socket.socket()
    sock.connect(("127.0.0.1", 44444))
    print("connected")
    sock.send(b"x")
    print("sent")


srv = socket.create_server(("127.0.0.1", 44444))
Thread(target=client).start()
`,
      output: `connected
sent
`,
      explanation: `<p>
  No <code>accept()</code>. But it's the <em>kernel</em> that handshakes and
  buffers, so the client can still connect and send.
</p>
`,
      highlightjsAlias: `py`,
    },
    
    {
      preface: `<p>How does <code>recv()</code> work?</p>
`,
      code: `import socket
from threading import Thread


def client():
    sock = socket.create_connection(("127.0.0.1", 44444))
    sock.send(b"x")
    sock.close()


srv = socket.create_server(("127.0.0.1", 44444))
Thread(target=client).start()
conn, _ = srv.accept()
print(conn.recv(1))
print(conn.recv(1))
`,
      output: `b'x'
b''
`,
      explanation: `<p>
  <code>recv()</code> returns empty when the peer has closed the connection.
</p>
`,
      highlightjsAlias: `py`,
    },
    
    {
      preface: `<p>What if there's nothing to receive yet?</p>
`,
      code: `import socket
from threading import Thread
from time import sleep


def client():
    sock = socket.create_connection(("127.0.0.1", 44444))
    sleep(3)
    sock.send(b"x")


srv = socket.create_server(("127.0.0.1", 44444))
Thread(target=client).start()
conn, _ = srv.accept()
print("here")
print(conn.recv(1))
`,
      output: `here
<~3s>
b'x'
`,
      explanation: `<p>
  <code>recv(n)</code> blocks until data is available, then returns up to
  <code>n</code> bytes.
</p>
`,
      highlightjsAlias: `py`,
    },
    
    {
      preface: `<p>Double trouble.</p>
`,
      code: `import socket
from threading import Thread
from time import sleep


def client():
    sock = socket.create_connection(("127.0.0.1", 44444))
    sleep(1)
    sock.send(b"x")
    sleep(1)
    sock.send(b"y")


srv = socket.create_server(("127.0.0.1", 44444))
Thread(target=client).start()
conn, _ = srv.accept()
print(conn.recv(2))
`,
      output: `<~1s>
b'x'
`,
      explanation: `<p>
  To repeat: <code>recv(n)</code> blocks until data is available, then returns
  up to <code>n</code> bytes.
</p>
`,
      highlightjsAlias: `py`,
    },
    
    {
      preface: `<p>What if no one comes to the party?</p>
`,
      code: `import socket

srv = socket.create_server(("127.0.0.1", 44444))
conn, _ = srv.accept()
print(conn)
`,
      output: `...
`,
      explanation: `<p>By default sockets are blocking.</p>

<p>
  A blocking socket's <code>accept()</code> blocks until a connection is
  available.
</p>
`,
      highlightjsAlias: `py`,
    },
    
    {
      preface: `<p>If it doesn't block, what <em>does</em> it do?</p>
`,
      code: `import socket

srv = socket.create_server(("127.0.0.1", 44444))
srv.setblocking(False)
conn, _ = srv.accept()
print(conn)
`,
      output: `Traceback (most recent call last):
  ...
BlockingIOError: [Errno NN] Resource temporarily unavailable
`,
      explanation: `<p>
  For a non-blocking socket, operations fail if they can't be completed
  immediately.
</p>
`,
      highlightjsAlias: `py`,
    },
    
    {
      preface: ``,
      code: `import socket
from threading import Thread


def client():
    sock = socket.create_connection(("127.0.0.1", 44444))
    sock.send(b"x")


srv1 = socket.create_connection(("127.0.0.1", 44444))
Thread(target=client).start()
conn, _ = srv1.accept()
print(conn.recv(1))
conn.close()
srv1.close()

srv2 = socket.create_connection(("127.0.0.1", 44444))
Thread(target=client).start()
print(conn.recv(1))
conn.close()
srv1.close()
`,
      output: `b'x'
OSError: [Errno NN] Address already in use
`,
      explanation: `<p>
  The kernel puts the active closer in <code>TIME_WAIT</code> for a while, else
  delayed packets might bleed into fresh connections.
</p>

<p>
  Set the <code>SO_REUSEADDR</code> option to allow binds to
  <code>TIME_WAIT</code>s.
</p>
`,
      highlightjsAlias: `py`,
    },
    
    {
      preface: ``,
      code: `import socket
from threading import Thread


def client():
    sock = socket.create_connection(("127.0.0.1", 44444))
    sock.send(b"x")


srv = socket.create_server(("127.0.0.1", 44444))
Thread(target=client).start()
conn, _ = srv.accept()
srv.close()
print(conn.recv(1))
`,
      output: `b'x'
`,
      explanation: `<p><code>srv</code> spun off <code>conn</code>, but they're independent.</p>
`,
      highlightjsAlias: `py`,
    },
    
    {
      preface: `<p>What if we <code>listen()</code> without a <code>bind()</code>?</p>
`,
      code: `import socket

sock = socket.socket()
sock.listen()
ip, _ = sock.getsockname()
print(ip)
`,
      output: `0.0.0.0
`,
      explanation: `<p>
  <code>0.0.0.0</code> is the IPv4 wildcard address, meaning "listen on all the
  host's IPs". The kernel chooses an ephemeral port.
</p>
`,
      highlightjsAlias: `py`,
    },
    
  ],
  
};