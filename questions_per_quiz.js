// Generated automatically. Do not edit.

const QUESTIONS_PER_QUIZ = {
  "concurrency": {
    "extension": "py",
    "title": "Concurrency",
    "preamble": "Threading, multiprocessing, asyncio. With the GIL.",
    "questions": [
      {
        "code": "from time import sleep\n\n\ndef io_bound():\n    sleep(3)\n    print(\"done\")\n\n\nio_bound()\nio_bound()\nprint(\"here\")\n",
        "output": "<~3s>\ndone\n<~3s>\ndone\nhere\n",
        "explanation": "<p>One process, one thread, no event loop.</p>\n\n<p>Simple. Slow.</p>\n",
        "preface": "<p>What does this output?</p>\n",
        "highlightjsAlias": "py"
      },
      {
        "code": "from time import thread_time\n\n\ndef cpu_bound():\n    start = thread_time()\n    while thread_time() - start < 3:\n        continue\n    print(\"done\")\n\n\ncpu_bound()\ncpu_bound()\nprint(\"here\")\n",
        "output": "<~3s>\ndone\n<~3s>\ndone\nhere\n",
        "explanation": "<p>No different of course.</p>\n\n<p>\n  (The busyloop is a placeholder: think of it as anything which needs 3s of\n  CPU.)\n</p>\n",
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
        "explanation": "<p>\n  A function defined with <code>async def</code> is a coroutine function and\n  returns a coroutine.\n</p>\n\n<p>Just creating a coroutine doesn't schedule it on the event loop.</p>\n",
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
    ]
  },
  "sockets": {
    "extension": "py",
    "title": "Sockets",
    "preamble": "The Unix socket interface, Python-style.",
    "questions": [
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
        "code": "import socket\nfrom threading import Thread\n\n\ndef client():\n    sock = socket.create_connection((\"127.0.0.1\", 44444))\n    sock.send(b\"x\")\n\n\nsrv1 = socket.socket()\nsrv1.bind((\"127.0.0.1\", 44444))\nsrv1.listen()\nThread(target=client).start()\nconn, _ = srv1.accept()\nprint(conn.recv(1))\nconn.close()\nsrv1.close()\n\nsrv2 = socket.socket()\nsrv2.bind((\"127.0.0.1\", 44444))\nsrv2.listen()\nThread(target=client).start()\nprint(conn.recv(1))\nconn.close()\nsrv1.close()\n",
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
    ]
  },
  "unix system calls": {
    "extension": "c",
    "title": "Unix system calls",
    "preamble": "Fork, exec, and friends.",
    "questions": [
      {
        "code": "#include <stdio.h>\n#include <unistd.h>\n\nint main(int argc, char *argv[]) {\n  printf(\"hi\\n\");\n  fork();\n  printf(\"bye\\n\");\n}\n",
        "output": "hi\nbye\nbye",
        "explanation": "<p><code>fork()</code> duplicates the calling process.</p>\n\n<p>The child starts as if returning from <code>fork()</code>.</p>\n",
        "preface": "<p>What does this ouput?</p>\n",
        "highlightjsAlias": "c"
      },
      {
        "code": "#include <stdio.h>\n#include <unistd.h>\n\nint main(int argc, char *argv[]) {\n  fork();\n  fork();\n  printf(\"hello\\n\");\n}\n",
        "output": "hello\nhello\nhello\nhello\n",
        "explanation": "<p>Multiple <code>fork()</code>s generate a tree.</p>\n",
        "preface": "<p>What if we <code>fork()</code> twice?</p>\n",
        "highlightjsAlias": "c"
      },
      {
        "code": "#include <stdio.h>\n#include <unistd.h>\n\nint main(int argc, char *argv[]) {\n  printf(\"hi\");\n  fork();\n  printf(\"bye\");\n}\n",
        "output": "hibyehibye",
        "explanation": "<p>No newline, so <code>\"hi\"</code> is buffered.</p>\n\n<p><code>fork()</code> duplicates the parent, including the buffer.</p>\n",
        "preface": "<p>Spot the difference?</p>\n",
        "highlightjsAlias": "c"
      },
      {
        "code": "#include <stdio.h>\n#include <sys/wait.h>\n#include <unistd.h>\n\nint main(int argc, char *argv[]) {\n  if (fork() == 0) {\n    printf(\"foo\\n\");\n  } else {\n    wait(NULL);\n    printf(\"bar\\n\");\n  }\n}\n",
        "output": "foo\nbar\n",
        "explanation": "<p><code>wait()</code> blocks until a child exits.</p>\n\n<p>(We'll come back to the <code>NULL</code>.)</p>\n",
        "preface": "<p>Time to <code>wait</code>.</p>\n",
        "highlightjsAlias": "c"
      },
      {
        "code": "#include <stdio.h>\n#include <sys/wait.h>\n#include <unistd.h>\n\nint main(int argc, char *argv[]) {\n  int x;\n  x = wait(NULL);\n  printf(\"%d\\n\", x);\n}\n",
        "output": "-1\n",
        "explanation": "<p><code>wait()</code> returns -1 immediately.</p>\n",
        "preface": "<p>What if no children to wait for?</p>\n",
        "highlightjsAlias": "c"
      },
      {
        "code": "#include <stdio.h>\n#include <sys/wait.h>\n#include <unistd.h>\n\nint main(int argc, char *argv[]) {\n  if (fork() == 0) {\n    sleep(1);\n  } else {\n    wait(0);\n    printf(\"here\\n\");\n  }\n}\n",
        "output": "<~1s>\nhere\n",
        "explanation": "<p>Yes.</p>\n",
        "preface": "<p>Is <code>wait()</code> well-named?</p>\n",
        "highlightjsAlias": "c"
      },
      {
        "code": "#include <stdio.h>\n#include <sys/wait.h>\n#include <unistd.h>\n\nint main(int argc, char *argv[]) {\n  if (fork() > 0) {\n    if (fork() > 0) {\n      wait(0);\n      printf(\"here\\n\");\n    } else {\n      sleep(1);\n    }\n  } else {\n    sleep(2);\n  }\n}\n",
        "output": "<~1s>\nhere\n",
        "explanation": "<p><code>wait()</code> blocks until <em>a</em> child exits.</p>\n",
        "preface": "<p>What happens if multiple children?</p>\n",
        "highlightjsAlias": "c"
      },
      {
        "code": "#include <stdio.h>\n#include <stdlib.h>\n#include <sys/wait.h>\n#include <unistd.h>\n\nint main(int argc, char *argv[]) {\n  int x;\n  if (fork() == 0) {\n    exit(1);\n  } else {\n    wait(&x);\n    printf(\"%d\\n\", x);\n  }\n}\n",
        "output": "256\n",
        "explanation": "<p>\n  <code>wait()</code> writes the child's exit code to the given address &mdash;\n  but <em>encoded</em>.\n</p>\n",
        "preface": "<p>Let's turn to the exit codes.</p>\n",
        "highlightjsAlias": "c"
      },
      {
        "code": "#include <stdio.h>\n#include <stdlib.h>\n#include <sys/wait.h>\n#include <unistd.h>\n\nint main(int argc, char *argv[]) {\n  int x;\n  if (fork() == 0) {\n    exit(1);\n  } else {\n    wait(&x);\n    printf(\"%d\\n\", WEXITSTATUS(x));\n  }\n}\n",
        "output": "1\n",
        "explanation": "<p>The <code>WEXITSTATUS</code> macro knows how to extract the code.</p>\n",
        "preface": "<p>Is there a nicer way to read that status?</p>\n",
        "highlightjsAlias": "c"
      },
      {
        "code": "#include <fcntl.h>\n#include <stdio.h>\n#include <unistd.h>\n\nint main(int argc, char *argv[]) {\n  int x;\n  x = open(argv[0], O_RDONLY);\n  printf(\"%d\\n\", x);\n}\n",
        "output": "3\n",
        "explanation": "<p><code>open()</code> returns the least available file descriptor.</p>\n\n<p>0, 1, 2 are already taken: stdin, stdout, stderr.</p>\n",
        "preface": "<p>New topic: file descriptors.</p>\n",
        "highlightjsAlias": "c"
      },
      {
        "code": "#include <fcntl.h>\n#include <stdio.h>\n#include <unistd.h>\n\nint main(int argc, char *argv[]) {\n  int x;\n  close(0);\n  x = open(argv[0], O_RDONLY);\n  printf(\"%d\\n\", x);\n}\n",
        "output": "0\n",
        "explanation": "<p>0 is free this time, so <code>open()</code> returns it.</p>\n",
        "preface": "<p>How about this?</p>\n",
        "highlightjsAlias": "c"
      },
      {
        "code": "#include <stdio.h>\n#include <sys/wait.h>\n#include <unistd.h>\n\nint main(int argc, char *argv[]) {\n  int x;\n  char buf[] = \"x\\n\";\n  x = dup(1);\n  printf(\"%d\\n\", x);\n  write(x, &buf, 2);\n}\n",
        "output": "3\nx\n",
        "explanation": "<p>\n  <code>dup(fd)</code> returns a new file descriptor referring to the same file\n  as <code>fd</code>.\n</p>\n",
        "preface": "<p>What does <code>dup()</code> do?</p>\n",
        "highlightjsAlias": "c"
      },
      {
        "code": "#include <fcntl.h>\n#include <sys/wait.h>\n#include <unistd.h>\n\nint main(int argc, char *argv[]) {\n  int fd = dup(1);\n  if (fork() == 0) {\n    write(fd, \"x\\n\", 2);\n  } else {\n    wait(0);\n  }\n}\n",
        "output": "x\n",
        "explanation": "<p><code>fork()</code> copies the parent's file descriptor table.</p>\n",
        "preface": "<p>\n  What happens to a <code>dup()</code>'d descriptor across <code>fork()</code>?\n</p>\n",
        "highlightjsAlias": "c"
      },
      {
        "code": "#include <fcntl.h>\n#include <sys/wait.h>\n#include <unistd.h>\n\nint main(int argc, char *argv[]) {\n  if (fork() == 0) {\n    close(1);\n  } else {\n    wait(0);\n    write(1, \"x\\n\", 2);\n  }\n}\n",
        "output": "x\n",
        "explanation": "<p>To repeat: <code>fork()</code> copies the parent's file descriptor table.</p>\n\n<p>The parent doesn't see the child's changes.</p>\n",
        "preface": "<p>So what about this?</p>\n",
        "highlightjsAlias": "c"
      },
      {
        "code": "#include <fcntl.h>\n#include <unistd.h>\n\nint main(int argc, char *argv[]) {\n  int fd1 = open(\"testfile\", O_CREAT | O_RDWR, 0644);\n  int fd2 = open(\"testfile\", O_RDWR);\n  write(fd1, \"ab\", 1);\n  char buf[1];\n  read(fd2, buf, 1);\n  write(1, buf, 1);\n}\n",
        "output": "a",
        "explanation": "<p><code>open()</code>s get independent offsets.</p>\n",
        "preface": "<p>What if we <code>open()</code> the same file twice?</p>\n",
        "highlightjsAlias": "c"
      },
      {
        "code": "#include <fcntl.h>\n#include <sys/wait.h>\n#include <unistd.h>\n\nint main(int argc, char *argv[]) {\n  int fd = open(\"./my_file\", O_CREAT | O_WRONLY | O_TRUNC, S_IRWXU);\n  int rc = fork();\n  if (rc == 0) {\n    write(fd, \"hello\\n\", 6);\n  } else {\n    wait(NULL);\n    write(fd, \"goodbye\\n\", 8);\n\n    char buf[64];\n    int rfd = open(\"./my_file\", O_RDONLY);\n    int n = read(rfd, buf, sizeof(buf));\n    write(1, buf, n);\n  }\n}\n",
        "output": "hello\ngoodbye\n",
        "explanation": "<p><code>fork()</code> copies the parent's file descriptor table.</p>\n\n<p>\n  But parent and child's descriptors point at the same file description, which\n  holds the offset.\n</p>\n\n<p>So no clobbering.</p>\n",
        "preface": "<p>Contrast that with <code>fork()</code>.</p>\n",
        "highlightjsAlias": "c"
      },
      {
        "code": "#include <stdio.h>\n#include <string.h>\n#include <unistd.h>\n\nint main(int argc, char *argv[]) {\n  int rc = fork();\n  if (rc == 0) {\n    char *myargs[3];\n    myargs[0] = strdup(\"echo\");\n    myargs[1] = strdup(\"this\");\n    myargs[2] = NULL;\n    execvp(myargs[0], myargs);\n    printf(\"here\\n\");\n  }\n}\n",
        "output": "this",
        "explanation": "<p>\n  <code>exec()</code> overwrites the calling process's code and data with the\n  given executable's.\n</p>\n\n<p>A successful call to <code>exec()</code> never returns.</p>\n",
        "preface": "<p>Now <code>exec()</code>. What does it do?</p>\n",
        "highlightjsAlias": "c"
      },
      {
        "code": "#include <stdio.h>\n#include <unistd.h>\n\nint x = 111;\n\nint main(int argc, char *argv[]) {\n  if (argc == 1) {\n    x = 222;\n    execl(argv[0], argv[0], \"again\", (char *)NULL);\n  }\n  printf(\"%d\\n\", x);\n}\n",
        "output": "111\n",
        "explanation": "<p>\n  <code>exec()</code> overwrites text and data, and re-initializes the address\n  space.\n</p>\n\n<p>So <code>x</code> goes back to its initial value.</p>\n",
        "preface": "<p>What happens to static data?</p>\n",
        "highlightjsAlias": "c"
      },
      {
        "code": "#include <fcntl.h>\n#include <unistd.h>\n\nint main(int argc, char *argv[]) {\n  if (argc == 1) {\n    dup(1);\n    execl(argv[0], argv[0], \"extra\", (char *)NULL);\n  } else {\n    write(3, \"x\\n\", 2);\n  }\n}\n",
        "output": "x\n",
        "explanation": "<p><code>exec()</code> preserves the file descriptor table.</p>\n",
        "preface": "<p>And to open file descriptors?</p>\n",
        "highlightjsAlias": "c"
      },
      {
        "code": "#include <stdio.h>\n#include <unistd.h>\n\nint main(int argc, char *argv[]) {\n  int p[2];\n  pipe(p);\n  printf(\"%d %d\\n\", p[0], p[1]);\n}\n",
        "output": "3 4\n",
        "explanation": "<p>\n  <code>pipe()</code> creates a small kernel buffer, exposing it to the process\n  as two file descriptors.\n</p>\n",
        "preface": "<p>Last topic: pipes. What does <code>pipe()</code> give us?</p>\n",
        "highlightjsAlias": "c"
      },
      {
        "code": "#include <unistd.h>\n\nint main(int argc, char *argv[]) {\n  int p[2];\n  char buf[1];\n  pipe(p);\n  read(p[0], buf, 1);\n}\n",
        "output": "...\n",
        "explanation": "<p>\n  Reads on a <code>pipe()</code> block until data is available or all write-side\n  file descriptors are closed.\n</p>\n\n<p>Neither happens here, so it hangs.</p>\n",
        "preface": "<p>A <code>read()</code> with no <code>write()</code>s. What happens?</p>\n",
        "highlightjsAlias": "c"
      },
      {
        "code": "#include <unistd.h>\n\nint main(int argc, char *argv[]) {\n  int p[2];\n  char buf[1];\n  pipe(p);\n  if (fork() == 0) {\n    sleep(1);\n    write(p[1], \"x\", 1);\n  } else {\n    read(p[0], buf, 1);\n    write(1, buf, 1);\n  }\n}\n",
        "output": "<~1s>\nx",
        "explanation": "<p>\n  Reads on a <code>pipe()</code> block until data is available or all write-side\n  file descriptors are closed.\n</p>\n\n<p>Data is available here.</p>\n",
        "preface": "<p>What if some data does get written?</p>\n",
        "highlightjsAlias": "c"
      },
      {
        "code": "#include <unistd.h>\n\nint main(int argc, char *argv[]) {\n  int p[2];\n  char buf[1];\n  pipe(p);\n  if (fork() == 0) {\n    sleep(1);\n    close(p[1]);\n  } else {\n    read(p[0], buf, 1);\n  }\n}\n",
        "output": "...\n",
        "explanation": "<p>\n  Reads on a <code>pipe()</code> block until data is available or all write-side\n  file descriptors are closed.\n</p>\n\n<p><code>fork()</code> copies the file descriptor table.</p>\n\n<p>The child closes its fd pointing at the pipe's write-end.</p>\n\n<p>But the parent doesn't, so it still hangs.</p>\n",
        "preface": "<p>What if the child closes its write end, but the parent doesn't?</p>\n",
        "highlightjsAlias": "c"
      },
      {
        "code": "#include <unistd.h>\n\nint main(int argc, char *argv[]) {\n  int p[2];\n  char buf[1];\n  pipe(p);\n  if (fork() == 0) {\n    sleep(1);\n    close(p[1]);\n  } else {\n    close(p[1]);\n    read(p[0], buf, 1);\n  }\n}\n",
        "output": "",
        "explanation": "<p>All good this time.</p>\n",
        "preface": "<p>And if both close it?</p>\n",
        "highlightjsAlias": "c"
      }
    ]
  },
  "slices": {
    "extension": "go",
    "title": "Slices",
    "preamble": "The basics: making, modifying, slicing, passing.",
    "questions": [
      {
        "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\ts := []int{1, 2, 3}\n\tfmt.Println(s)\n}\n",
        "output": "[1 2 3]\n",
        "explanation": "<p>A slice literal.</p>\n",
        "preface": "<p>What does this output?</p>\n",
        "highlightjsAlias": "go"
      },
      {
        "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tx := make([]int, 3)\n\tfmt.Println(x)\n}\n",
        "output": "[0 0 0]\n",
        "explanation": "<p>Another way to make a slice.</p>\n\n<p>\n  <code>make()</code> creates a slice of the given length, with elements set to\n  the type's zero value.\n</p>\n",
        "preface": "<p>What does this output?</p>\n",
        "highlightjsAlias": "go"
      },
      {
        "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tx := make([]int, 3)\n\tx = append(x, 100)\n\tfmt.Println(x)\n}\n",
        "output": "[0 0 0 100]\n",
        "explanation": "<p>The zero values are normal entries, not just placeholders.</p>\n\n<p><code>append()</code> always increases a slice's length.</p>\n",
        "preface": "<p>And this?</p>\n",
        "highlightjsAlias": "go"
      },
      {
        "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\ts := []int{1, 2, 3}\n\tclear(s)\n\tfmt.Println(s)\n}\n",
        "output": "[0 0 0]\n",
        "explanation": "<p>Clearing a slice zeros its elements. The length is not changed.</p>\n",
        "preface": "<p>What about <code>clear()</code>?</p>\n",
        "highlightjsAlias": "go"
      },
      {
        "code": "package main\n\nimport (\n\t\"fmt\"\n\t\"slices\"\n)\n\nfunc main() {\n\tvar s1 []int\n\tvar s2 = []int{}\n\tfmt.Println(slices.Equal(s1, s2))\n\tfmt.Println(s1 == nil)\n\tfmt.Println(s2 == nil)\n}\n",
        "output": "true\ntrue\nfalse\n",
        "explanation": "<p>Confusing!</p>\n\n<p><code>s1</code> is a <code>nil</code> slice.</p>\n\n<p><code>s2</code> is a slice with length and capacity 0.</p>\n\n<p>Favour nil slices.</p>\n",
        "preface": "<p>A subtlety.</p>\n",
        "highlightjsAlias": "go"
      },
      {
        "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\ts := []int{}\n\tfor i := range 5 {\n\t\ts = append(s, i)\n\t\tfmt.Println(cap(s))\n\t}\n}\n",
        "output": "4\n4\n4\n4\n8\n",
        "explanation": "<p>\n  Capacity starts at 4, doubles on overflow for a while, then grows more slowly.\n</p>\n\n<p>A tradeoff: speed v. space.</p>\n",
        "preface": "<p>How does a slice's capacity grow as we keep appending?</p>\n",
        "highlightjsAlias": "go"
      },
      {
        "code": "package main\n\nimport (\n\t\"fmt\"\n\t\"reflect\"\n)\n\nfunc main() {\n\ts := []string{\"a\", \"b\", \"c\", \"d\"}\n\tx := s[1:3]\n\tfmt.Println(reflect.TypeOf(x))\n}\n",
        "output": "[]string\n",
        "explanation": "<p>\n  <code>s[1:3]</code> is a slice expression. A slice expression creates a slice\n  from a slice.\n</p>\n",
        "preface": "<p>Output?</p>\n",
        "highlightjsAlias": "go"
      },
      {
        "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\ts := []string{\"a\", \"b\", \"c\", \"d\"}\n\tx := s[1:3]\n\ty := s[:3]\n\tz := s[2:]\n\tw := s[:]\n\tfmt.Println(\"x:\", x)\n\tfmt.Println(\"y:\", y)\n\tfmt.Println(\"z:\", z)\n\tfmt.Println(\"w:\", w)\n}\n",
        "output": "x: [b c]\ny: [a b c]\nz: [c d]\nw: [a b c d]\n",
        "explanation": "<p>No surprises. Yet.</p>\n",
        "preface": "<p>Slicing slices.</p>\n",
        "highlightjsAlias": "go"
      },
      {
        "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\ts := []string{\"a\", \"b\", \"c\"}\n\tx := s[:2]\n\tx[0] = \"x\"\n\tfmt.Println(\"s:\", s)\n\tfmt.Println(\"x:\", x)\n}\n",
        "output": "s: [x b c]\nx: [x b]\n",
        "explanation": "<p>Slices and subslices share data.</p>\n",
        "preface": "<p>Does the original see changes via the subslice?</p>\n",
        "highlightjsAlias": "go"
      },
      {
        "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\ts := []string{\"a\", \"b\", \"c\"}\n\tx := s[:2]\n\ts[0] = \"s\"\n\tfmt.Println(\"s:\", s)\n\tfmt.Println(\"x:\", x)\n}\n",
        "output": "s: [s b c]\nx: [s b]\n",
        "explanation": "<p>Slices and subslices share data.</p>\n",
        "preface": "<p>Does the subslice see changes via the original?</p>\n",
        "highlightjsAlias": "go"
      },
      {
        "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\ts := []string{\"a\", \"b\", \"c\", \"d\"}\n\tx := s[1:3]\n\tfmt.Println(cap(s), cap(x))\n}\n",
        "output": "4 3\n",
        "explanation": "<p>A subslice shares the slice's capacity, from the starting offset.</p>\n",
        "preface": "<p>\n  Slices and subslices share <em>data</em>, but what about <em>capacity</em>?\n</p>\n",
        "highlightjsAlias": "go"
      },
      {
        "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\ts := []string{\"a\", \"b\", \"c\"}\n\tx := s[:2]\n\tx = append(x, \"d\")\n\tfmt.Println(\"x:\", x)\n\tfmt.Println(\"s:\", s)\n}\n",
        "output": "x: [a b d]\ns: [a b d]\n",
        "explanation": "<p>A subslice shares the slice's capacity, from the starting offset.</p>\n",
        "preface": "<p>So what happens if we append to a subslice within that capacity?</p>\n",
        "highlightjsAlias": "go"
      },
      {
        "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\ts := []string{\"a\", \"b\", \"c\"}\n\tx := s[:2:2]\n\tx = append(x, \"d\")\n\tfmt.Println(\"s:\", s)\n\tfmt.Println(\"x:\", x)\n}\n",
        "output": "s: [a b c]\nx: [a b d]\n",
        "explanation": "<p><code>s[:2:2]</code> is a full slice expression.</p>\n\n<p>\n  The last component is the index from which the parent slice's capacity is\n  unavailable to the subslice.\n</p>\n",
        "preface": "<p>Output?</p>\n",
        "highlightjsAlias": "go"
      },
      {
        "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\ts := []string{\"a\", \"b\", \"c\", \"d\", \"e\"}\n\tx := s[2:4:4]\n\tx = append(x, \"f\")\n\tfmt.Println(\"s:\", s)\n\tfmt.Println(\"x:\", x)\n}\n",
        "output": "s: [a b c d e]\nx: [c d f]\n",
        "explanation": "<p>The parent's.</p>\n",
        "preface": "<p>The index from whose perspective?</p>\n",
        "highlightjsAlias": "go"
      },
      {
        "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tx := [3]int{1, 2, 3}\n\ty := x[:]\n\ty[0] = 666\n\tfmt.Println(x)\n\tfmt.Println(y)\n}\n",
        "output": "[666 2 3]\n[666 2 3]\n",
        "explanation": "<p>\n  A slice created from an array shares its data, just as slices and subslices\n  do.\n</p>\n",
        "preface": "<p>Now let's compare slices and arrays.</p>\n",
        "highlightjsAlias": "go"
      },
      {
        "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\ts := []int{1, 2, 3}\n\ta := [3]int(s)\n\ts[0] = 10\n\ta[2] = 30\n\tfmt.Println(\"s:\", s)\n\tfmt.Println(\"a:\", a)\n}\n",
        "output": "s: [10 2 3]\na: [1 2 30]\n",
        "explanation": "<p>Converting slices to arrays. The slice's data is copied to new memory.</p>\n",
        "preface": "<p>Output?</p>\n",
        "highlightjsAlias": "go"
      },
      {
        "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\ts := []int{1, 2, 3, 4}\n\ta := [3]int(s)\n\tfmt.Println(a)\n}\n",
        "output": "[1 2 3]\n",
        "explanation": "<p>The array can be shorter.</p>\n",
        "preface": "<p>Can the array be shorter than the slice?</p>\n",
        "highlightjsAlias": "go"
      },
      {
        "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\ts := []int{1, 2, 3, 4}\n\ta := [5]int(s)\n\tfmt.Println(a)\n}\n",
        "output": "panic: runtime error: cannot convert slice with length 4 to array or pointer to array with length 5\n",
        "explanation": "<p>The array cannot be longer.</p>\n",
        "preface": "<p>And can it be longer?</p>\n",
        "highlightjsAlias": "go"
      },
      {
        "code": "package main\n\nimport \"fmt\"\n\nfunc modify(s2 []int) {\n\ts2[0] = 999\n\tfmt.Println(s2)\n}\n\nfunc main() {\n\ts1 := []int{0, 1, 2, 3}\n\tfmt.Println(s1)\n\tmodify(s1)\n\tfmt.Println(s1)\n}\n",
        "output": "[0 1 2 3]\n[999 1 2 3]\n[999 1 2 3]\n",
        "explanation": "<p>Go is call by value.</p>\n\n<p>\n  But slices are implemented as pointers to structs with 3 fields: length,\n  capacity, pointer to memory block.\n</p>\n\n<p>So the caller sees writes to existing elements.</p>\n",
        "preface": "<p>Last idea. What happens when we pass a slice around?</p>\n",
        "highlightjsAlias": "go"
      },
      {
        "code": "package main\n\nimport \"fmt\"\n\nfunc modify(s2 []int) {\n\ts2 = append(s2, 999)\n\tfmt.Println(s2)\n}\n\nfunc main() {\n\ts1 := []int{0, 1, 2, 3}\n\tfmt.Println(s1)\n\tmodify(s1)\n\tfmt.Println(s1)\n}\n",
        "output": "[0 1 2 3]\n[0 1 2 3 999]\n[0 1 2 3]\n",
        "explanation": "<p>\n  The <code>append()</code> exceeds <code>s1</code>'s capacity, so\n  <code>s2</code> gets new memory.\n</p>\n",
        "preface": "<p>A variant.</p>\n",
        "highlightjsAlias": "go"
      },
      {
        "code": "package main\n\nimport \"fmt\"\n\nfunc modify(s2 []int) {\n\ts2 = append(s2, 999)\n\tfmt.Println(s2)\n}\n\nfunc main() {\n\ts1 := make([]int, 0, 4)\n\ts1 = append(s1, []int{0, 1, 2}...)\n\tfmt.Println(s1)\n\tmodify(s1)\n\tfmt.Println(s1)\n}\n",
        "output": "[0 1 2]\n[0 1 2 999]\n[0 1 2]\n",
        "explanation": "<p>\n  <code>s1</code>'s length field is unchanged, so it can't see the extra item,\n  despite its capacity.\n</p>\n",
        "preface": "<p>Last one. How do slices behave when passed to and modified by a function?</p>\n",
        "highlightjsAlias": "go"
      }
    ]
  }
};
