// Generated automatically. Do not edit.

const QUESTIONS_PER_QUIZ = {
  "concurrency": [
    {
      "code": "from time import sleep\n\nsleep(3)\nprint(\"done\")\nsleep(3)\nprint(\"done\")\nprint(\"here\")\n",
      "output": "<~3s>\ndone\n<~3s>\ndone\nhere\n",
      "explanation": "<p>One process, one thread, no event loop.</p>\n\n<p>Simple. Slow.</p>\n",
      "preface": "<p>What does this output?</p>\n",
      "highlightjsAlias": "py"
    },
    {
      "code": "from time import sleep\n\n\ndef io_bound():\n    sleep(3)\n    print(\"done\")\n\n\nio_bound()\nio_bound()\nprint(\"here\")\n",
      "output": "<~3s>\ndone\n<~3s>\ndone\nhere\n",
      "explanation": "<p>No different of course.</p>\n",
      "preface": "<p>Let's extract the work into a function. Output?</p>\n",
      "highlightjsAlias": "py"
    },
    {
      "code": "from time import thread_time\n\n\ndef cpu_bound():\n    start = thread_time()\n    while thread_time() - start < 3:\n        continue\n    print(\"done\")\n\n\ncpu_bound()\ncpu_bound()\nprint(\"here\")\n",
      "output": "<~3s>\ndone\n<~3s>\ndone\nhere\n",
      "explanation": "<p>Again, no different.</p>\n\n<p>\n  (The busyloop is a placeholder: think of it as anything which needs 3s of\n  CPU.)\n</p>\n",
      "preface": "<p>What if the work is CPU-bound?</p>\n",
      "highlightjsAlias": "py"
    },
    {
      "code": "from threading import Thread\nfrom time import thread_time\n\n\ndef cpu_bound():\n    start = thread_time()\n    while thread_time() - start < 3:\n        continue\n    print(\"done\")\n\n\nthread1 = Thread(target=cpu_bound)\nthread2 = Thread(target=cpu_bound)\nthread1.start()\nthread2.start()\nprint(\"here\")\n",
      "output": "here\n<~6s>\ndone\ndone\n",
      "explanation": "<p>\n  Three threads are in play: the main thread, <code>thread1</code>,\n  <code>thread2</code>.\n</p>\n\n<p>A thread runs only when it holds the Global Interpreter Lock.</p>\n\n<p>\n  The running thread is paused frequently and a ready thread gets the GIL and\n  runs. <em>Interleaved, not parallel.</em>\n</p>\n\n<p>\n  The main thread prints almost immediately. The others continue interleaving,\n  so take ~3s of CPU but ~6s of wall-clock.\n</p>\n",
      "preface": "<p>Time for some concurrency. Let's move the work into threads.</p>\n",
      "highlightjsAlias": "py"
    },
    {
      "code": "from threading import Thread\nfrom time import sleep\n\n\ndef io_bound():\n    sleep(3)\n    print(\"done\")\n\n\nthread1 = Thread(target=io_bound)\nthread2 = Thread(target=io_bound)\nthread1.start()\nthread2.start()\nprint(\"here\")\n",
      "output": "here\n<~3s>\ndone\ndone\n",
      "explanation": "<p>Speedup, despite the GIL!</p>\n\n<p>Interleaved, not parallel. But for IO-bound work, interleaving helps.</p>\n\n<p>\n  <code>thread1</code> and <code>thread2</code> don't <em>run</em> in parallel,\n  because of the GIL. But they can <em>wait</em> in parallel, so to speak.\n</p>\n",
      "preface": "<p>What if the work is IO-bound instead?</p>\n",
      "highlightjsAlias": "py"
    },
    {
      "code": "from threading import Thread\nfrom time import sleep\n\n\ndef io_bound():\n    sleep(3)\n    print(\"done\")\n\n\nthread1 = Thread(target=io_bound)\nthread2 = Thread(target=io_bound)\nthread1.start()\nthread1.join()\nthread2.start()\nthread2.join()\nprint(\"here\")\n",
      "output": "<~3s>\ndone\n<~3s>\ndone\nhere\n",
      "explanation": "<p><code>join()</code> blocks until the receiver completes.</p>\n",
      "preface": "<p>What if we <code>join()</code> them?</p>\n",
      "highlightjsAlias": "py"
    },
    {
      "code": "from threading import Thread\nfrom time import thread_time\n\n\ndef cpu_bound():\n    start = thread_time()\n    while thread_time() - start < 3:\n        continue\n    print(\"done\")\n\n\nthread1 = Thread(target=cpu_bound)\nthread2 = Thread(target=cpu_bound)\nthread1.start()\nthread1.join()\nthread2.start()\nthread2.join()\nprint(\"here\")\n",
      "output": "<~3s>\ndone\n<~3s>\ndone\nhere\n",
      "explanation": "<p>No. To repeat: <code>join()</code> blocks until the receiver completes.</p>\n",
      "preface": "<p>Any difference if they're CPU-bound?</p>\n",
      "highlightjsAlias": "py"
    },
    {
      "code": "from threading import Thread\nfrom time import sleep\n\n\ndef io_bound():\n    sleep(3)\n    print(\"done\")\n\n\nthread1 = Thread(target=io_bound)\nthread2 = Thread(target=io_bound)\nthread1.start()\nthread2.start()\nthread1.join()\nthread2.join()\nprint(\"here\")\n",
      "output": "<~3s>\ndone\ndone\nhere\n",
      "explanation": "<p>\n  <code>thread1.join()</code> blocks the main thread, but not\n  <code>thread2</code>.\n</p>\n\n<p>\n  <code>thread1</code> and <code>thread2</code> are IO-bound, so interleaving\n  helps.\n</p>\n",
      "preface": "<p>Back to IO-bound. What if we re-order?</p>\n",
      "highlightjsAlias": "py"
    },
    {
      "code": "from threading import Thread\nfrom time import thread_time\n\n\ndef cpu_bound():\n    start = thread_time()\n    while thread_time() - start < 3:\n        continue\n    print(\"done\")\n\n\nthread1 = Thread(target=cpu_bound)\nthread2 = Thread(target=cpu_bound)\nthread1.start()\nthread2.start()\nthread1.join()\nthread2.join()\nprint(\"here\")\n",
      "output": "<~6s>\ndone\ndone\nhere\n",
      "explanation": "<p>\n  <code>thread1.join()</code> blocks the main thread, not <code>thread2</code>.\n</p>\n\n<p>But they're still CPU-bound so the total time is unchanged.</p>\n",
      "preface": "<p>And for completeness, back to CPU-bound again.</p>\n",
      "highlightjsAlias": "py"
    },
    {
      "code": "from threading import Thread\n\n\ndef cpu_bound():\n    # assume takes 3s of cpu\n    sum(range(2**25))\n    print(\"done\")\n\n\nthread1 = Thread(target=cpu_bound)\nthread2 = Thread(target=cpu_bound)\nthread1.start()\nthread2.start()\nthread1.join()\nthread2.join()\nprint(\"here\")\n",
      "output": "<~3s>\ndone\n<~3s>\ndone\nhere\n",
      "explanation": "<p>Beware!</p>\n\n<p>\n  The interpreter doesn't pause a thread while it's running native code, like\n  this <code>sum()</code> does.\n</p>\n\n<p>Exercise: try <code>sum(i for i in range(2**25))</code>.</p>\n",
      "preface": "<p>Swapping busyloop for busysum surely makes no difference, right?</p>\n",
      "highlightjsAlias": "py"
    },
    {
      "code": "from threading import Thread\n\n\ndef bad():\n    raise Exception\n\n\nthread = Thread(target=bad)\nthread.start()\nthread.join()\nprint(\"here\")\n",
      "output": "Exception in thread Thread-1 (bad):\nTraceback (most recent call last):\n  ...\nException\nhere\n",
      "explanation": "<p>\n  <code>threading.excepthook()</code> prints on stderr an exception raised by\n  <code>Thread.run()</code>.\n</p>\n\n<p>\n  But the exception doesn't propagate to the main thread, so\n  <code>here</code> is still printed and the exit code is 0.\n</p>\n",
      "preface": "<p>What if threads go bad?</p>\n",
      "highlightjsAlias": "py"
    },
    {
      "code": "from multiprocessing import Process\nfrom time import sleep\n\n\ndef io_bound():\n    sleep(3)\n    print(\"done\")\n\n\nif __name__ == \"__main__\":\n    # assume multicore machine\n    proc1 = Process(target=io_bound)\n    proc2 = Process(target=io_bound)\n    proc1.start()\n    proc2.start()\n    print(\"here\")\n",
      "output": "here\n<~3s>\ndone\ndone\n",
      "explanation": "<p>Process objects run in separate processes, each with their own GIL.</p>\n\n<p>So they <em>can</em> run in parallel.</p>\n\n<p>\n  But for IO-bound work threads might be the better choice, because lower\n  overhead.\n</p>\n",
      "preface": "<p>Let's swap threads for processes.</p>\n",
      "highlightjsAlias": "py"
    },
    {
      "code": "from time import thread_time\nfrom multiprocessing import Process\n\n\ndef cpu_bound():\n    start = thread_time()\n    while thread_time() - start < 3:\n        continue\n    print(\"done\")\n\n\nif __name__ == \"__main__\":\n    # running on multicore machine\n    proc1 = Process(target=cpu_bound)\n    proc2 = Process(target=cpu_bound)\n    proc1.start()\n    proc2.start()\n    proc1.join()\n    proc2.join()\n    print(\"here\")\n",
      "output": "<~3s>\ndone\ndone\nhere\n",
      "explanation": "<p>\n  <code>thread1</code> and <code>thread2</code> are CPU-bound, so running in\n  parallel helps.\n</p>\n",
      "preface": "<p>And for CPU-bound work?</p>\n",
      "highlightjsAlias": "py"
    },
    {
      "code": "from multiprocessing import Process\n\n\ndef bad():\n    raise Exception\n\n\nif __name__ == \"__main__\":\n    proc = Process(target=bad)\n    proc.start()\n    proc.join()\n    print(\"here\")\n",
      "output": "Process Process-1:\nTraceback (most recent call last):\n  ...\nException\nhere\n",
      "explanation": "<p>\n  Same story as for threads: the exception is printed on stderr but doesn't\n  propagate to the main process.\n</p>\n",
      "preface": "<p>What if processes go bad?</p>\n",
      "highlightjsAlias": "py"
    },
    {
      "code": "import asyncio\nfrom time import sleep\n\n\nasync def io_bound():\n    sleep(3)\n    print(\"done\")\n\n\nasync def main():\n    io_bound()\n    io_bound()\n    print(\"here\")\n\n\nasyncio.run(main())\n",
      "output": "here\n",
      "explanation": "<p>\n  A function defined with <code>async def</code> is a coroutine function and\n  returns a coroutine.\n</p>\n\n<p>Just creating a coroutine doens't schedule it on the event loop.</p>\n",
      "preface": "<p>A third approach: <code>asyncio</code>.</p>\n",
      "highlightjsAlias": "py"
    },
    {
      "code": "import asyncio\nfrom time import sleep\n\n\nasync def io_bound():\n    sleep(3)\n    print(\"done\")\n\n\nasync def main():\n    await io_bound()\n    await io_bound()\n    print(\"here\")\n\n\nasyncio.run(main())\n",
      "output": "<~3s>\ndone\n<~3s>\ndone\nhere\n",
      "explanation": "<p>Awaiting a coroutine blocks until it completes.</p>\n\n<p>No speedup yet.</p>\n",
      "preface": "<p>Ok, so let's <code>await</code>.</p>\n",
      "highlightjsAlias": "py"
    },
    {
      "code": "import asyncio\n\n\nasync def io_bound():\n    await asyncio.sleep(3)\n    print(\"here\")\n\n\nasync def main():\n    await io_bound()\n    await io_bound()\n    print(\"done\")\n\n\nasyncio.run(main())\n",
      "output": "<~3s>\nhere\n<~3s>\nhere\ndone\n",
      "explanation": "<p>\n  <code>await asyncio.sleep()</code> does pass control to the event loop, but\n  there's no other work scheduled at that point.\n</p>\n",
      "preface": "<p>We need async-aware functions, like <code>asyncio.sleep()</code>, right?</p>\n",
      "highlightjsAlias": "py"
    },
    {
      "code": "import asyncio\nfrom time import sleep\n\n\nasync def io_bound():\n    sleep(3)\n    print(\"done\")\n\n\nasync def main():\n    await asyncio.gather(io_bound(), io_bound())\n    print(\"here\")\n\n\nasyncio.run(main())\n",
      "output": "<~3s>\ndone\n<~3s>\ndone\nhere\n",
      "explanation": "<p><code>gather()</code> runs the awaitables concurrently.</p>\n\n<p>\n  But still no speedup, because <code>sleep()</code> blocks the one and only\n  thread.\n</p>\n",
      "preface": "<p>What if we <code>gather()</code> them instead?</p>\n",
      "highlightjsAlias": "py"
    },
    {
      "code": "import asyncio\n\n\nasync def io_bound():\n    await asyncio.sleep(3)\n    print(\"done\")\n\n\nasync def main():\n    await asyncio.gather(io_bound(), io_bound())\n    print(\"here\")\n\n\nasyncio.run(main())\n",
      "output": "<~3s>\ndone\ndone\nhere\n",
      "explanation": "<p>Speedup at last!</p>\n",
      "preface": "<p>\n  What if we <code>gather()</code> <em>and</em> <code>asyncio.sleep()</code>?\n</p>\n",
      "highlightjsAlias": "py"
    },
    {
      "code": "import asyncio\nfrom time import sleep\n\n\ndef io_bound():\n    sleep(3)\n    print(\"done\")\n\n\nasync def main():\n    await asyncio.gather(\n        asyncio.to_thread(io_bound),\n        asyncio.to_thread(io_bound),\n    )\n    print(\"here\")\n\n\nasyncio.run(main())\n",
      "output": "<~3s>\ndone\ndone\nhere\n",
      "explanation": "<p>\n  <code>asyncio.to_thread()</code> is useful for async-unaware IO-bound\n  functions.\n</p>\n\n<p>It runs the passed function in a separate thread, returning a coroutine.</p>\n\n<p>\n  <code>sleep()</code> releases the GIL so control can pass back to the main\n  thread.\n</p>\n",
      "preface": "<p>Remember threads?</p>\n",
      "highlightjsAlias": "py"
    },
    {
      "code": "import asyncio\n\n\nasync def foo():\n    print(\"in foo\")\n\n\nasync def main():\n    asyncio.create_task(foo())\n    print(\"in main\")\n\n\nasyncio.run(main())\n",
      "output": "in main\nin foo\n",
      "explanation": "<p><code>create_task()</code> schedules the task for execution.</p>\n\n<p>But the main coroutine keeps control.</p>\n",
      "preface": "<p>Know the differences between coroutines and tasks?</p>\n",
      "highlightjsAlias": "py"
    },
    {
      "code": "import asyncio\n\n\nasync def foo():\n    print(\"in foo\")\n\n\nasync def main():\n    await asyncio.create_task(foo())\n    print(\"in main\")\n\n\nasyncio.run(main())\n",
      "output": "in foo\nin main\n",
      "explanation": "<p>Awaiting a task passes control to the event loop.</p>\n",
      "preface": "<p>How about this?</p>\n",
      "highlightjsAlias": "py"
    },
    {
      "code": "import asyncio\n\n\nasync def foo():\n    print(\"in foo\")\n\n\nasync def bar():\n    print(\"in bar\")\n\n\nasync def main():\n    asyncio.create_task(foo())\n    await bar()\n\n\nasyncio.run(main())\n",
      "output": "in bar\nin foo\n",
      "explanation": "<p>Awaiting a coroutine doesn't pass control to the event loop.</p>\n",
      "preface": "<p>And this?</p>\n",
      "highlightjsAlias": "py"
    },
    {
      "code": "import asyncio\n\n\nasync def foo():\n    print(\"in foo\")\n\n\nasync def bar():\n    print(\"in bar\")\n\n\nasync def main():\n    asyncio.create_task(foo())\n    await asyncio.create_task(bar())\n\n\nasyncio.run(main())\n",
      "output": "in foo\nin bar\n",
      "explanation": "<p>Awaiting a task passes control to the event loop.</p>\n",
      "preface": "<p>Last one on this theme.</p>\n",
      "highlightjsAlias": "py"
    },
    {
      "code": "import asyncio\n\n\nasync def foo():\n    raise Exception\n\n\nasync def bar():\n    await asyncio.sleep(3)\n    print(\"here\")\n\n\nasync def main():\n    await asyncio.gather(foo(), bar())\n    print(\"done\")\n\n\nasyncio.run(main())\n",
      "output": "Traceback (most recent call last):\n  ...\nException\n",
      "explanation": "<p>\n  By default, <code>gather()</code> propagates the first raised exception, but\n  <em>doesn't</em> cancel its other awaitables.\n</p>\n<p>\n  However, when the exception propagates to <code>asyncio.run()</code>,\n  <em>it</em> cancels any remaining awaitables.\n</p>\n",
      "preface": "<p>What if awaitables go bad?</p>\n",
      "highlightjsAlias": "py"
    }
  ],
  "sockets": [
    {
      "code": "import socket\nfrom threading import Thread\n\n\ndef client():\n    sock = socket.socket()\n    sock.connect((\"127.0.0.1\", 44444))\n    sock.send(b\"x\")\n\n\nsrv = socket.socket()\nsrv.bind((\"127.0.0.1\", 44444))\nsrv.listen()\nThread(target=client).start()\nconn, _ = srv.accept()\nprint(conn.recv(1))\n",
      "output": "b'x'\n",
      "explanation": "<p>A minimal example of socket communication.</p>\n",
      "preface": "<p>What does this output?</p>\n",
      "highlightjsAlias": "py"
    },
    {
      "code": "import socket\nfrom threading import Thread\n\n\ndef client():\n    sock = socket.create_connection((\"127.0.0.1\", 44444))\n    sock.send(b\"x\")\n\n\nsrv = socket.create_server((\"127.0.0.1\", 44444))\nThread(target=client).start()\nconn, _ = srv.accept()\nprint(conn.recv(1))\n",
      "output": "b'x'\n",
      "explanation": "<p>As before, but taking advantage of convenience functions.</p>\n",
      "preface": "<p>How about this?</p>\n",
      "highlightjsAlias": "py"
    },
    {
      "code": "import socket\nfrom threading import Thread\n\n\ndef client():\n    conn = socket.create_connection((\"127.0.0.1\", 44444))\n    print(type(conn).__name__)\n\n\nsrv = socket.create_server((\"127.0.0.1\", 44444))\nThread(target=client).start()\nconn, _ = srv.accept()\nprint(type(srv).__name__)\nprint(type(conn).__name__)\n",
      "output": "socket\nsocket\nsocket\n",
      "explanation": "<p>\n  Sockets can play two roles: servers (switchboard operators) and clients\n  (connection endpoints).\n</p>\n\n<p>But they're all just sockets.</p>\n",
      "preface": "<p>Let's dig deeper. Output?</p>\n",
      "highlightjsAlias": "py"
    },
    {
      "code": "import socket\nfrom threading import Thread\n\n\ndef client():\n    socket.create_connection((\"127.0.0.1\", 44444))\n\n\nsrv = socket.create_server((\"127.0.0.1\", 44444))\nThread(target=client).start()\nconn, _ = srv.accept()\nprint(conn.getsockname())\n",
      "output": "('127.0.0.1', 44444)\n",
      "explanation": "<p>New socket. Same address.</p>\n",
      "preface": "<p><code>accept()</code> returns a new local socket, but at what address?</p>\n",
      "highlightjsAlias": "py"
    },
    {
      "code": "import socket\nfrom threading import Thread\n\n\ndef client():\n    sock = socket.socket()\n    sock.connect((\"127.0.0.1\", 44444))\n    print(\"connected\")\n    sock.send(b\"x\")\n    print(\"sent\")\n\n\nsrv = socket.create_server((\"127.0.0.1\", 44444))\nThread(target=client).start()\n",
      "output": "connected\nsent\n",
      "explanation": "<p>\n  No <code>accept()</code>. But it's the <em>kernel</em> that handshakes and\n  buffers, so the client can still connect and send.\n</p>\n",
      "preface": "<p>How far can you get without a peer?</p>\n",
      "highlightjsAlias": "py"
    },
    {
      "code": "import socket\nfrom threading import Thread\n\n\ndef client():\n    sock = socket.create_connection((\"127.0.0.1\", 44444))\n    sock.send(b\"x\")\n    sock.close()\n\n\nsrv = socket.create_server((\"127.0.0.1\", 44444))\nThread(target=client).start()\nconn, _ = srv.accept()\nprint(conn.recv(1))\nprint(conn.recv(1))\n",
      "output": "b'x'\nb''\n",
      "explanation": "<p>\n  <code>recv()</code> returns empty when the peer has closed the connection.\n</p>\n",
      "preface": "<p>How does <code>recv()</code> work?</p>\n",
      "highlightjsAlias": "py"
    },
    {
      "code": "import socket\nfrom threading import Thread\nfrom time import sleep\n\n\ndef client():\n    sock = socket.create_connection((\"127.0.0.1\", 44444))\n    sleep(3)\n    sock.send(b\"x\")\n\n\nsrv = socket.create_server((\"127.0.0.1\", 44444))\nThread(target=client).start()\nconn, _ = srv.accept()\nprint(\"here\")\nprint(conn.recv(1))\n",
      "output": "here\n<~3s>\nb'x'\n",
      "explanation": "<p>\n  <code>recv(n)</code> blocks until data is available, then returns up to\n  <code>n</code> bytes.\n</p>\n",
      "preface": "<p>What if there's nothing to receive yet?</p>\n",
      "highlightjsAlias": "py"
    },
    {
      "code": "import socket\nfrom threading import Thread\nfrom time import sleep\n\n\ndef client():\n    sock = socket.create_connection((\"127.0.0.1\", 44444))\n    sleep(1)\n    sock.send(b\"x\")\n    sleep(1)\n    sock.send(b\"y\")\n\n\nsrv = socket.create_server((\"127.0.0.1\", 44444))\nThread(target=client).start()\nconn, _ = srv.accept()\nprint(conn.recv(2))\n",
      "output": "<~1s>\nb'x'\n",
      "explanation": "<p>\n  To repeat: <code>recv(n)</code> blocks until data is available, then returns\n  up to <code>n</code> bytes.\n</p>\n",
      "preface": "<p>Double trouble.</p>\n",
      "highlightjsAlias": "py"
    },
    {
      "code": "import socket\n\nsrv = socket.create_server((\"127.0.0.1\", 44444))\nconn, _ = srv.accept()\nprint(conn)\n",
      "output": "...\n",
      "explanation": "<p>By default sockets are blocking.</p>\n\n<p>\n  A blocking socket's <code>accept()</code> blocks until a connection is\n  available.\n</p>\n",
      "preface": "<p>What if no one comes to the party?</p>\n",
      "highlightjsAlias": "py"
    },
    {
      "code": "import socket\n\nsrv = socket.create_server((\"127.0.0.1\", 44444))\nsrv.setblocking(False)\nconn, _ = srv.accept()\nprint(conn)\n",
      "output": "Traceback (most recent call last):\n  ...\nBlockingIOError: [Errno NN] Resource temporarily unavailable\n",
      "explanation": "<p>\n  For a non-blocking socket, operations fail if they can't be completed\n  immediately.\n</p>\n",
      "preface": "<p>If it doesn't block, what <em>does</em> it do?</p>\n",
      "highlightjsAlias": "py"
    },
    {
      "code": "import socket\nfrom threading import Thread\n\n\ndef client():\n    sock = socket.create_connection((\"127.0.0.1\", 44444))\n    sock.send(b\"x\")\n\n\nsrv1 = socket.create_connection((\"127.0.0.1\", 44444))\nThread(target=client).start()\nconn, _ = srv1.accept()\nprint(conn.recv(1))\nconn.close()\nsrv1.close()\n\nsrv2 = socket.create_connection((\"127.0.0.1\", 44444))\nThread(target=client).start()\nprint(conn.recv(1))\nconn.close()\nsrv1.close()\n",
      "output": "b'x'\nOSError: [Errno NN] Address already in use\n",
      "explanation": "<p>\n  The kernel puts the active closer in <code>TIME_WAIT</code> for a while, else\n  delayed packets might bleed into fresh connections.\n</p>\n\n<p>\n  Set the <code>SO_REUSEADDR</code> option to allow binds to\n  <code>TIME_WAIT</code>s.\n</p>\n",
      "preface": "",
      "highlightjsAlias": "py"
    },
    {
      "code": "import socket\nfrom threading import Thread\n\n\ndef client():\n    sock = socket.create_connection((\"127.0.0.1\", 44444))\n    sock.send(b\"x\")\n\n\nsrv = socket.create_server((\"127.0.0.1\", 44444))\nThread(target=client).start()\nconn, _ = srv.accept()\nsrv.close()\nprint(conn.recv(1))\n",
      "output": "b'x'\n",
      "explanation": "<p><code>srv</code> spun off <code>conn</code>, but they're independent.</p>\n",
      "preface": "",
      "highlightjsAlias": "py"
    },
    {
      "code": "import socket\n\nsock = socket.socket()\nsock.listen()\nip, _ = sock.getsockname()\nprint(ip)\n",
      "output": "0.0.0.0\n",
      "explanation": "<p>\n  <code>0.0.0.0</code> is the IPv4 wildcard address, meaning \"listen on all the\n  host's IPs\". The kernel chooses an ephemeral port.\n</p>\n",
      "preface": "<p>What if we <code>listen()</code> without a <code>bind()</code>?</p>\n",
      "highlightjsAlias": "py"
    }
  ],
  "unix_system_calls": [
    {
      "code": "#include <fcntl.h>\n#include <stdio.h>\n#include <unistd.h>\n\nint main(int argc, char *argv[]) {\n  int x;\n  close(0);\n  x = open(argv[0], O_RDONLY);\n  printf(\"%d\\n\", x);\n}\n",
      "output": "",
      "explanation": "<p><code>open()</code> returns the least available file descriptor.</p>\n",
      "preface": "",
      "highlightjsAlias": "c"
    },
    {
      "code": "#include <stdio.h>\n#include <sys/wait.h>\n#include <unistd.h>\n\nint main(int argc, char *argv[]) {\n  int x;\n  char buf[] = \"x\\n\";\n  x = dup(1);\n  printf(\"%d\\n\", x);\n  write(x, &buf, 2);\n}\n",
      "output": "",
      "explanation": "<p>\n  <code>dup(fd)</code> returns a new file descriptor referring to the same file\n  as <code>fd</code>.\n</p>\n",
      "preface": "",
      "highlightjsAlias": "c"
    },
    {
      "code": "#include <fcntl.h>\n#include <unistd.h>\n\nint main(int argc, char *argv[]) {\n  if (argc == 1) {\n    dup(1);\n    execl(argv[0], argv[0], \"extra\", (char *)NULL);\n  } else {\n    write(3, \"x\\n\", 2);\n  }\n}\n",
      "output": "",
      "explanation": "<p><code>exec()</code> preserves the file descriptor table.</p>\n",
      "preface": "",
      "highlightjsAlias": "c"
    },
    {
      "code": "#include <fcntl.h>\n#include <unistd.h>\n\nint main(int argc, char *argv[]) {\n  int fd = dup(1);\n  if (fork() == 0) {\n    write(fd, \"x\\n\", 2);\n  }\n}\n",
      "output": "",
      "explanation": "<p><code>fork()</code> copies the parent's file descriptor table.</p>\n",
      "preface": "",
      "highlightjsAlias": "c"
    },
    {
      "code": "#include <fcntl.h>\n#include <sys/wait.h>\n#include <unistd.h>\n\nint main(int argc, char *argv[]) {\n  if (fork() == 0) {\n    close(1);\n  } else {\n    wait(0);\n    write(1, \"x\\n\", 2);\n  }\n}\n",
      "output": "",
      "explanation": "<p><code>fork()</code> <em>copies</em> the parent's file descriptor table.</p>\n\n<p>So, for example, the parent doesn't see the child's changes.</p>\n",
      "preface": "",
      "highlightjsAlias": "c"
    },
    {
      "code": "#include <fcntl.h>\n#include <stdio.h>\n#include <unistd.h>\n\nint main(int argc, char *argv[]) {\n  int x;\n  x = open(argv[0], O_RDONLY);\n  printf(\"%d\\n\", x);\n}\n",
      "output": "",
      "explanation": "<p><code>open()</code> returns the least available file descriptor.</p>\n",
      "preface": "",
      "highlightjsAlias": "c"
    },
    {
      "code": "#include <stdio.h>\n#include <unistd.h>\n\nint main(int argc, char *argv[]) {\n  int p[2];\n  pipe(p);\n  printf(\"%d %d\\n\", p[0], p[1]);\n}\n",
      "output": "",
      "explanation": "<p>\n  <code>pipe()</code> creates a small kernel buffer, exposing it to the process\n  as two file descriptors.\n</p>\n",
      "preface": "",
      "highlightjsAlias": "c"
    },
    {
      "code": "#include <unistd.h>\n\nint main(int argc, char *argv[]) {\n  int p[2];\n  char buf[1];\n  pipe(p);\n  if (fork() == 0) {\n    sleep(1);\n    write(p[1], \"x\", 1);\n  } else {\n    read(p[0], buf, 1);\n    write(1, buf, 1);\n  }\n}\n",
      "output": "",
      "explanation": "<p>\n  Reads on a <code>pipe()</code> block until data is available or all write-side\n  file descriptors are closed.\n</p>\n\n<p>Data is available here.</p>\n",
      "preface": "",
      "highlightjsAlias": "c"
    },
    {
      "code": "#include <unistd.h>\n\nint main(int argc, char *argv[]) {\n  int p[2];\n  char buf[1];\n  pipe(p);\n  if (fork() == 0) {\n    sleep(1);\n    close(p[1]);\n  } else {\n    read(p[0], buf, 1);\n  }\n}\n",
      "output": "",
      "explanation": "<p>\n  Reads on a <code>pipe()</code> block until data is available or all write-side\n  file descriptors are closed.\n</p>\n\n<p><code>fork()</code> copies the file descriptor table.</p>\n\n<p>The child closes its fd pointing at the pipe's write-end.</p>\n\n<p>But the parent doesn't, so it still hangs.</p>\n",
      "preface": "",
      "highlightjsAlias": "c"
    },
    {
      "code": "#include <unistd.h>\n\nint main(int argc, char *argv[]) {\n  int p[2];\n  char buf[1];\n  pipe(p);\n  if (fork() == 0) {\n    sleep(1);\n    close(p[1]);\n  } else {\n    close(p[1]);\n    read(p[0], buf, 1);\n  }\n}\n",
      "output": "",
      "explanation": "<p>\n  Reads on a <code>pipe()</code> block until data is available or all write-side\n  file descriptors are closed.\n</p>\n\n<p><code>fork()</code> copies the file descriptor table.</p>\n\n<p>Both parent and child close their fds pointing at the pipe's write-end.</p>\n\n<p>So all good.</p>\n",
      "preface": "",
      "highlightjsAlias": "c"
    },
    {
      "code": "#include <unistd.h>\n\nint main(int argc, char *argv[]) {\n  int p[2];\n  char buf[1];\n  pipe(p);\n  read(p[0], buf, 1);\n}\n",
      "output": "",
      "explanation": "<p>\n  Reads on a <code>pipe()</code> block until data is available or all write-side\n  file descriptors are closed.\n</p>\n\n<p>Neither happens here, so it hangs.</p>\n",
      "preface": "",
      "highlightjsAlias": "c"
    },
    {
      "code": "#include <fcntl.h>\n#include <unistd.h>\n\nint main(int argc, char *argv[]) {\n  int fd1 = open(\"testfile\", O_CREAT | O_RDWR, 0644);\n  int fd2 = open(\"testfile\", O_RDWR);\n  write(fd1, \"ab\", 1);\n  char buf[1];\n  read(fd2, buf, 1);\n  write(1, buf, 1);\n}\n",
      "output": "",
      "explanation": "<p>\n  Separate calls to <code>open()</code> on the same file get independent\n  offsets.\n</p>\n",
      "preface": "",
      "highlightjsAlias": "c"
    },
    {
      "code": "#include <stdio.h>\n#include <stdlib.h>\n\nchar **split_line(char *line) {\n  int line_idx, words_idx;\n  char *word_start;\n  char **words = malloc(10 * sizeof(char *));\n\n  words_idx = 0;\n  word_start = line;\n  for (line_idx = 0;; line_idx++) {\n    if (*(line + line_idx) == ' ' || *(line + line_idx) == '\\0') {\n      *(line + line_idx) = '\\0';\n      words[words_idx] = word_start;\n      word_start = line + line_idx + 1;\n      words_idx++;\n    }\n    if (*(line + line_idx) == '\\0') {\n      break;\n    }\n  }\n\n  return words;\n}\n\nint main(int argc, char **argv) {\n  char **words;\n  char line[] = \"foo bar\\n\";\n  words = split_line(line);\n  printf(\"%s\", *words);\n}\n",
      "output": "",
      "explanation": "<p>\n  <code>split_line()</code> splits a line into words on space, returning an\n  array of words.\n</p>\n\n<p>\n  When it hits the end of a word, it writes a null terminator so the word can be\n  used as its own string.\n</p>\n",
      "preface": "",
      "highlightjsAlias": "c"
    },
    {
      "code": "#include <stdio.h>\n#include <sys/wait.h>\n#include <unistd.h>\n\nint main(int argc, char *argv[]) {\n  int x;\n  if (fork() > 0) {\n    wait(&x);\n    printf(\"%d\\n\", x);\n  }\n}\n",
      "output": "",
      "explanation": "<p><code>wait()</code> puts the child's exit status in the given address.</p>\n",
      "preface": "",
      "highlightjsAlias": "c"
    },
    {
      "code": "#include <stdio.h>\n#include <sys/wait.h>\n#include <unistd.h>\n\nint main(int argc, char *argv[]) {\n  if (fork() > 0) {\n    if (fork() > 0) {\n      wait(0);\n      printf(\"here\\n\");\n    } else {\n      sleep(1);\n    }\n  } else {\n    sleep(2);\n  }\n}\n",
      "output": "",
      "explanation": "<p><code>wait()</code> waits until <em>some</em> child exits.</p>\n",
      "preface": "",
      "highlightjsAlias": "c"
    },
    {
      "code": "#include <stdio.h>\n#include <sys/wait.h>\n#include <unistd.h>\n\nint main(int argc, char *argv[]) {\n  int x;\n  x = wait(0);\n  printf(\"%d\\n\", x);\n}\n",
      "output": "",
      "explanation": "<p><code>wait()</code> returns -1 immediately if there are no children.</p>\n",
      "preface": "",
      "highlightjsAlias": "c"
    },
    {
      "code": "#include <stdio.h>\n#include <sys/wait.h>\n#include <unistd.h>\n\nint main(int argc, char *argv[]) {\n  if (fork() == 0) {\n    sleep(1);\n  } else {\n    wait(0);\n    printf(\"here\\n\");\n  }\n}\n",
      "output": "",
      "explanation": "<p><code>wait()</code> waits.</p>\n",
      "preface": "",
      "highlightjsAlias": "c"
    }
  ]
};
