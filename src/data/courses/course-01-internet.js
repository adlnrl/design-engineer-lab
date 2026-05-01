export const course01 = {
  id: 'course-01-internet',
  title: 'How the Internet Works',
  subtitle: 'For Design Engineers',
  description: 'Build the foundational mental model of how computers talk to each other — and why it matters for every design decision you make.',
  duration: '45 min',
  tone: 'sky',
  lessons: [
    // ─── Lesson 1 ────────────────────────────────────────────────────────────
    {
      id: 'welcome',
      title: 'Welcome: Why This Matters',
      duration: '5 min',
      summary: 'Why understanding the internet makes you a better designer and a more effective collaborator.',
      sections: [
        {
          id: 's-the-gap',
          heading: 'The Gap',
          body: `There is a moment every designer knows. You are in a meeting and an engineer says something like "we cannot do that because of the network layer" or "that depends on whether we cache the response" — and you nod, unsure what it means.\n\nThis course is about closing that gap.\n\nNot by making you an engineer. But by giving you the mental models that let you understand what engineers mean, ask better questions, and design with technical reality in mind — instead of around it.`
        },
        {
          id: 's-what-you-learn',
          heading: 'What You Will Learn',
          body: `By the end of this course, you will understand:\n\n• What happens when a browser loads a web page\n• What an IP address is and what DNS does\n• What a request and response are\n• What HTTP and HTTPS do differently\n• Why latency is a design constraint, not just an engineering problem\n• Why loading states exist at all\n\nNone of this requires you to write a line of code. It is about building a mental model — a map of how the internet works so you can navigate conversations, design decisions, and technical constraints with clarity.`
        },
        {
          id: 's-how-to-use',
          heading: 'How to Use This Course',
          type: 'metaphor',
          body: `Each lesson is short — 5 to 15 minutes. Read it. Answer the questions. Do the exercise. Then move on.\n\nDo not try to memorise everything. You are not studying for a test. You are building a mental model. The goal is that next time an engineer mentions DNS or HTTP status codes, you have a feeling for what they mean — even if you do not remember every detail.\n\nThis course is skimmable. Come back to it. Use it as a reference. The vocabulary cards will help.`
        },
        {
          id: 's-mental-model',
          heading: 'Mental Model First',
          type: 'why',
          body: `The internet was built to solve a specific problem: how do you get two computers to talk to each other reliably?\n\nEvery piece of internet infrastructure — IP addresses, DNS, HTTP, HTTPS, TCP — exists to answer some part of that question. When you understand what problem each piece solves, the system stops feeling like a mysterious black box and starts feeling like an elegant design.\n\nWhich, in a way, it is.`
        }
      ],
      vocab: ['internet', 'client', 'server', 'network', 'protocol'],
      quiz: [],
      exercise: {
        prompt: 'Write down three moments in the last week where you noticed a loading state in a product you use. For each one, write a sentence about what you think was actually happening behind the scenes — even if you\'re not sure yet. Keep this list. By the end of this course, you\'ll be able to answer it properly.'
      },
      reflection: 'Think about a time when a design decision you made turned out to be technically difficult or impossible. With what you know now — or suspect — what question would you have asked an engineer before starting the design?',
      rightSidebar: [
        {
          type: 'fact',
          heading: 'Fun fact',
          body: 'The World Wide Web was invented in 1989 by Tim Berners-Lee, a physicist at CERN. His boss read the original proposal and wrote "Vague but exciting" on the cover page. It is now used by 5 billion people.'
        },
        {
          type: 'inPractice',
          heading: 'In your design work',
          body: 'When you understand how the internet works, every loading state, error message, and empty state looks different. They are not edge cases — they are design decisions about how to handle the time and uncertainty built into every network request.'
        }
      ]
    },

    // ─── Lesson 2 ────────────────────────────────────────────────────────────
    {
      id: 'what-happens-url',
      title: 'What Happens When You Type a URL?',
      duration: '12 min',
      summary: 'Trace the full journey of a browser request — from keyboard to server and back — in plain English.',
      sections: [
        {
          id: 's-start',
          heading: 'Start Here',
          body: `You open a new tab. You type "figma.com". You press Enter.\n\nWhat happens next is invisible — and it happens in milliseconds. But it is not magic. It is a sequence of very specific steps, each one solving a specific problem.\n\nThat sequence is what this lesson is about.`
        },
        {
          id: 's-journey',
          heading: 'The Journey in Steps',
          body: `Here is what happens between pressing Enter and seeing the Figma homepage:\n\n**1. Your browser checks its memory**\nHas it visited figma.com recently? If so, it might already know the address. This is called a cache hit.\n\n**2. DNS lookup**\nIf not, your browser asks a DNS server: "What is the IP address for figma.com?" DNS is like a phone book for the internet — it translates human-readable names into numeric addresses.\n\n**3. TCP connection**\nYour browser connects to the server at that IP address, like dialling a phone number. This establishes a reliable two-way channel.\n\n**4. HTTP request**\nYour browser sends a message: "Please give me the homepage." This message follows a protocol called HTTP — a shared language that browsers and servers both speak.\n\n**5. HTTP response**\nThe server replies with the HTML for the homepage, plus a status code (200 OK) and metadata called headers.\n\n**6. Render**\nYour browser reads the HTML and starts drawing the page. As it finds references to images, fonts, and scripts, it makes more requests — potentially dozens of them.`
        },
        {
          id: 's-why',
          heading: 'Why This Matters for Design',
          type: 'why',
          body: `Every step in that journey takes time. And the time is not fixed — it varies based on your network, your location, the server\'s location, and how busy the server is.\n\nThis is why:\n• Loading states exist — because steps 2–5 can take anywhere from milliseconds to seconds\n• Skeleton screens work better than spinners — they set an expectation about layout before content arrives\n• CDNs matter — they put servers closer to users, reducing step 3\n• Error states must be designed — because any step can fail\n\nWhen you design a loading state, you are not designing decoration. You are designing the experience of this journey.`
        },
        {
          id: 's-before',
          heading: 'Before the Web',
          type: 'without',
          body: `Before the World Wide Web (1989), sharing documents between computers meant copying files onto a floppy disk and physically carrying them — known, without irony, as "sneakernet".\n\nEarly networked systems like ARPANET (the 1960s US military network that became the internet's ancestor) could send data between computers — but there was no shared protocol for browsing, no URLs, no concept of "a page".\n\nThe web made sharing documents between any two computers on earth as simple as typing an address. That is the problem DNS, HTTP, and browsers were all designed to solve.`
        },
        {
          id: 's-engineer',
          heading: 'Engineer Translation',
          type: 'engineer',
          items: [
            { term: 'hit the endpoint', plain: 'make a request to a specific URL on the server' },
            { term: 'resolve the hostname', plain: 'do the DNS lookup to find the IP address' },
            { term: 'round trip time (RTT)', plain: 'how long it takes for a request to reach the server and the response to return' },
            { term: 'cache hit', plain: 'the browser already had the data, so it did not need to fetch it again' },
            { term: 'waterfall', plain: 'all the sequential network requests a page makes — visible in the Network tab of DevTools' }
          ]
        }
      ],
      vocab: ['URL', 'browser', 'server', 'DNS', 'IP address', 'HTTP', 'request', 'response', 'cache', 'TCP'],
      quiz: [
        {
          q: 'What does DNS do?',
          options: [
            'It encrypts the connection between browser and server',
            'It translates domain names (like figma.com) into IP addresses',
            'It stores copies of web pages to make them load faster',
            'It manages your browser history'
          ],
          answer: 1,
          explanation: 'DNS is like a phone book for the internet. When you type "figma.com", DNS translates that human-readable name into the numeric IP address that computers use to find each other.'
        },
        {
          q: 'Why do loading states exist?',
          options: [
            'Designers add them for visual interest',
            'They are required by browser standards',
            'Because network requests take time and the result is uncertain',
            'To prevent users from clicking twice'
          ],
          answer: 2,
          explanation: 'Every network request takes time and can fail. Loading states communicate that something is happening — and that the wait is normal and expected. They are design decisions about how to handle the uncertainty of the network.'
        }
      ],
      exercise: {
        prompt: 'Open your browser\'s DevTools (right-click anywhere → Inspect → Network tab). Load any website and look at the list of requests. Count how many requests it makes. Click the first one (usually the HTML document) and look at the "Status Code" and "Time" values. What do you notice?'
      },
      reflection: 'Think about a website you use every day. Based on what you now know about the URL journey, which step do you think is slowest for that site? Why?',
      rightSidebar: [
        {
          type: 'fact',
          heading: 'How many requests?',
          body: 'The average web page makes over 70 separate HTTP requests to fully load — one for the HTML, then dozens more for CSS, JavaScript, images, and fonts. Each one is a mini URL journey.'
        },
        {
          type: 'inPractice',
          heading: 'In your design work',
          body: 'Every time you design a loading skeleton, an error state, or a "retry" button, you are designing for this journey. The loading state exists because steps 2–5 take real time. The error state exists because any step can fail.'
        },
        {
          type: 'askEngineer',
          heading: 'Questions to ask engineers',
          items: [
            'How many API calls does this page make on load?',
            'Is this data cached, or does it hit the server fresh each time?',
            'What is the expected response time for this request?',
            'What happens in the UI if this request times out?'
          ]
        }
      ]
    },

    // ─── Lesson 3 ────────────────────────────────────────────────────────────
    {
      id: 'ip-dns',
      title: 'IP Addresses, DNS & Finding the Right Computer',
      duration: '10 min',
      summary: 'Every device on the internet has a numeric address. DNS is the system that makes those addresses human-friendly.',
      sections: [
        {
          id: 's-address',
          heading: 'Every Computer Has an Address',
          body: `Imagine the internet as a city with billions of buildings. Every building has a street address — a unique number that lets anyone find it.\n\nEvery device connected to the internet has an IP address. Your laptop right now has one. So does the server that hosts Figma, Notion, and every website you use. IP addresses are what computers use to find each other.`
        },
        {
          id: 's-what-ip',
          heading: 'What an IP Address Looks Like',
          body: `An IP address looks like this: 142.250.185.46\n\nThat is a real address for Google. Four numbers, separated by dots, each between 0 and 255.\n\nThere is also a newer format called IPv6, which looks like: 2001:4860:4860::8888 — much longer, because we are running out of the old format. There are only about 4 billion possible IPv4 addresses, and there are now more than 4 billion internet-connected devices.\n\nFor our purposes, you just need to know: an IP address is a unique identifier. It is the computer equivalent of a postal address.`
        },
        {
          id: 's-problem',
          heading: 'The Problem With Numbers',
          type: 'without',
          body: `Here is the problem: humans are terrible at remembering numbers.\n\nImagine if, instead of typing "google.com", you had to type "142.250.185.46" every time. Or "104.26.10.78" for Cloudflare. Or "13.226.13.22" for Figma.\n\nThis is what early internet users actually had to do. Before DNS, researchers maintained a literal text file — called HOSTS.TXT — listing every hostname and its IP address. They would download a new copy regularly as the internet grew.\n\nThat worked fine when the internet had a few hundred computers. It broke down completely as it scaled to millions.`
        },
        {
          id: 's-dns',
          heading: 'DNS: The Phone Book of the Internet',
          body: `DNS — Domain Name System — was invented in 1983 to solve this problem.\n\nIt works exactly like a phone book:\n• You look up a name\n• You get back a number\n• You use that number to make the call\n\nWhen you type "figma.com":\n1. Your browser asks a DNS resolver: "What is the IP address for figma.com?"\n2. The resolver checks its cache, then asks authoritative servers higher up the hierarchy\n3. Eventually it finds the answer: an IP address\n4. It returns that to your browser\n5. Your browser uses that IP to connect to the server\n\nAll of this happens in milliseconds.`
        },
        {
          id: 's-chain',
          heading: 'The Lookup Chain',
          body: `DNS is not one server — it is a hierarchy. When your browser asks for figma.com:\n\n**1. Recursive resolver** (run by your ISP or Google/Cloudflare)\nFirst stop. It either has the answer cached or knows where to ask.\n\n**2. Root nameservers**\nThese know which servers are responsible for each top-level domain (.com, .org, .io).\n\n**3. TLD nameservers**\nThese know which servers are responsible for each domain within .com.\n\n**4. Authoritative nameserver**\nThe definitive source. It returns the actual IP address.\n\nOnce found, the answer is cached at each level — so next time, it is much faster.`
        },
        {
          id: 's-why',
          heading: 'Why This Matters for UX',
          type: 'why',
          body: `DNS lookup is one of the first steps every page load takes. If it is slow — because of a slow resolver, an uncached record, or a misconfigured DNS — your page load is slow before a single byte of content has been transferred.\n\nThis is why:\n• Performance engineers optimise DNS — reducing lookup time directly reduces Time to First Byte\n• CDNs often provide their own DNS resolution for speed\n• When an engineer says "we need to update our DNS records", they are changing which IP address a domain resolves to — often for deployments or migrations\n\nAs a designer, you do not manage DNS. But knowing what it is means you understand why something as simple as a domain name change can take time to propagate.`
        },
        {
          id: 's-engineer',
          heading: 'Engineer Translation',
          type: 'engineer',
          items: [
            { term: 'DNS propagation', plain: 'the time it takes for a DNS change to spread across all servers worldwide — can take up to 48 hours' },
            { term: 'TTL (Time To Live)', plain: 'how long a DNS record is cached before it is checked again' },
            { term: 'CNAME record', plain: 'a type of DNS record that points a domain to another domain (not an IP address directly)' },
            { term: 'nameserver', plain: 'the server that holds the DNS records for a domain' },
            { term: 'localhost', plain: 'your own computer — always at 127.0.0.1 — used during local development' }
          ]
        }
      ],
      vocab: ['IP address', 'DNS', 'domain', 'resolver', 'cache', 'IPv4', 'IPv6', 'nameserver'],
      quiz: [
        {
          q: 'What problem does DNS solve?',
          options: [
            'It makes websites load faster by compressing images',
            'It translates human-readable domain names into numeric IP addresses',
            'It encrypts traffic between your browser and the server',
            'It blocks malicious websites from loading'
          ],
          answer: 1,
          explanation: 'DNS translates domain names like figma.com into IP addresses like 104.18.36.22. Without it, you would need to memorise numeric addresses for every website you visit.'
        },
        {
          q: 'Why can a DNS change take up to 48 hours to take effect globally?',
          options: [
            'Because browsers need to be restarted to pick up changes',
            'Because the change needs to spread to DNS servers all around the world, each with their own cache',
            'Because domain registrars are slow to process requests',
            'Because HTTPS certificates need to be reissued'
          ],
          answer: 1,
          explanation: 'DNS records are cached at every level of the lookup chain. Each cached copy has a TTL (Time To Live). Until those caches expire and refresh, different users around the world may see the old DNS record or the new one.'
        }
      ],
      exercise: {
        prompt: 'On a Mac, open Terminal and type: `nslookup figma.com` — then press Enter. You will see the IP address for Figma\'s servers. Try it with three other sites you use daily. Notice how every site has different IP addresses. This is the DNS lookup your browser does automatically every time you visit a site.'
      },
      reflection: 'When an engineer says "we need to update the DNS records for the new deployment" — what do you now understand about what that means and why it takes time to propagate?',
      rightSidebar: [
        {
          type: 'fact',
          heading: 'How many DNS lookups?',
          body: 'Your computer makes tens of thousands of DNS lookups every day — one for every website, API call, and background service your apps use. Most are answered from cache in under a millisecond.'
        },
        {
          type: 'inPractice',
          heading: 'In your design work',
          body: 'When your team migrates to a new domain, or when a staging environment uses a different URL, DNS is what makes those addresses work. Understanding propagation helps you explain to stakeholders why changes "work on my machine" but not everywhere yet.'
        },
        {
          type: 'askEngineer',
          heading: 'Questions to ask engineers',
          items: [
            'How long will DNS propagation take for this change?',
            'Is the staging URL using the same CDN as production?',
            'Why does the app work locally but behave differently on staging?'
          ]
        }
      ]
    },

    // ─── Lesson 4 ────────────────────────────────────────────────────────────
    {
      id: 'http-https',
      title: 'Requests, Responses, HTTP & HTTPS',
      duration: '12 min',
      summary: 'HTTP is the language browsers and servers speak. HTTPS encrypts it. Status codes are how servers say yes, no, or "something broke".',
      sections: [
        {
          id: 's-language',
          heading: 'The Language of the Web',
          body: `Once your browser has the IP address, it needs to talk to the server. But how?\n\nThey need a shared language. That language is HTTP — HyperText Transfer Protocol.\n\nHTTP defines:\n• How a browser asks for something (a request)\n• How a server replies (a response)\n• What information is included in each\n• What format everything is in\n\nEvery time you load a page, click a button that saves data, or log in — an HTTP request is being made.`
        },
        {
          id: 's-request',
          heading: 'Anatomy of a Request',
          body: `An HTTP request has three main parts:\n\n**Method** — what you want to do\n• GET: retrieve something ("give me the homepage")\n• POST: send data ("here are my login credentials")\n• PUT / PATCH: update something ("change my email address")\n• DELETE: remove something ("delete this comment")\n\n**URL** — what you are acting on\nThe specific address of the resource: /api/users/123\n\n**Headers** — metadata about the request\nThings like: what format you accept, your authentication token, what browser you are using.\n\n**Body** — the payload (only for POST, PUT, PATCH)\nThe actual data you are sending, usually in JSON format.`
        },
        {
          id: 's-response',
          heading: 'Anatomy of a Response',
          body: `The server replies with:\n\n**Status code** — a number that summarises what happened\n• 200 OK: it worked\n• 201 Created: it worked and something new was created\n• 301 Moved Permanently: the resource is at a different URL now\n• 400 Bad Request: the browser sent something invalid\n• 401 Unauthorized: you need to log in first\n• 403 Forbidden: you are logged in but not allowed\n• 404 Not Found: this URL does not exist\n• 500 Internal Server Error: something went wrong on the server\n\n**Headers** — metadata about the response\nContent type, caching instructions, security headers.\n\n**Body** — the actual content\nHTML for a page, JSON for an API, an image file, etc.`
        },
        {
          id: 's-https',
          heading: 'HTTP vs HTTPS',
          body: `HTTP sends data in plain text. That means anyone between you and the server — your ISP, a café Wi-Fi router, a network observer — could theoretically read it.\n\nHTTPS adds a layer called TLS (Transport Layer Security). Before any HTTP request is sent, TLS establishes an encrypted channel:\n\n1. Your browser and the server agree on an encryption method\n2. They exchange cryptographic keys\n3. All subsequent communication is encrypted\n\nTo anyone intercepting the traffic, the data looks like random noise.\n\nThis is why:\n• The padlock icon appears in the browser address bar\n• Browsers warn you when a site is "not secure" (HTTP only)\n• Login forms must always be on HTTPS\n• Any site handling personal data must use HTTPS`
        },
        {
          id: 's-why',
          heading: 'Why This Matters for Design',
          type: 'why',
          body: `Status codes directly drive UX decisions. When an engineer says "we return a 401 if the token is expired" — your design needs an error state for that.\n\nUnderstanding HTTP changes how you design:\n• **Empty states vs error states** — a 404 is different from a 500; they deserve different copy and UI\n• **Form validation** — a 400 means the client sent bad data; a 422 means validation failed server-side\n• **Auth flows** — a 401 means "log in first"; a 403 means "you are not allowed even if logged in"\n• **Optimistic UI** — showing success before the 200 arrives, then rolling back on error\n\nEvery status code is a decision point for your design.`
        },
        {
          id: 's-engineer',
          heading: 'Engineer Translation',
          type: 'engineer',
          items: [
            { term: 'REST API', plain: 'a set of URL endpoints that follow HTTP conventions — GET to read, POST to create, PUT to update, DELETE to remove' },
            { term: 'payload', plain: 'the data sent in a request body or returned in a response body' },
            { term: 'headers', plain: 'key-value metadata attached to a request or response — not the content itself, but information about it' },
            { term: 'bearer token', plain: 'a string sent in the request header to prove who you are — like a digital ID card the server checks' },
            { term: 'CORS', plain: 'Cross-Origin Resource Sharing — a browser security rule about which servers your frontend is allowed to make requests to' },
            { term: '5xx error', plain: 'any status code starting with 5 means the server failed — not the user\'s fault' }
          ]
        }
      ],
      vocab: ['HTTP', 'HTTPS', 'TLS', 'request', 'response', 'status code', 'GET', 'POST', 'JSON', 'headers'],
      quiz: [
        {
          q: 'A user is logged in but tries to access a page they do not have permission to see. What HTTP status code would the server return?',
          options: [
            '401 Unauthorized',
            '403 Forbidden',
            '404 Not Found',
            '500 Internal Server Error'
          ],
          answer: 1,
          explanation: '403 Forbidden means the server understood the request, the user is authenticated, but they do not have permission. 401 is for when the user is not authenticated at all (not logged in).'
        },
        {
          q: 'What does HTTPS add that HTTP does not have?',
          options: [
            'Faster loading times',
            'A caching layer for images and fonts',
            'Encryption of data in transit',
            'Automatic HTML compression'
          ],
          answer: 2,
          explanation: 'HTTPS adds TLS encryption. All data between the browser and server is encrypted, so anyone intercepting the traffic cannot read it. HTTP sends everything in plain text.'
        }
      ],
      exercise: {
        prompt: 'Open DevTools → Network tab on any website. Click the first request (usually the HTML document). Look at the "Headers" tab — find the Status Code and the Request Method. Now look at the "Response" tab — that is the raw HTML the server sent back. Click on a different request (an image or font) and compare the headers. What is different?'
      },
      reflection: 'Think about an error state you have designed recently. Did you know whether it was a 400 (bad request), 401 (not logged in), 403 (not allowed), or 500 (server broke)? How might knowing the difference have changed the copy or the recovery flow you designed?',
      rightSidebar: [
        {
          type: 'fact',
          heading: 'HTTP status 418',
          body: 'HTTP status code 418 "I\'m a Teapot" is a real status code, defined in a 1998 April Fools\' RFC. It means the server refuses to brew coffee because it is a teapot. It is still part of the HTTP standard today.'
        },
        {
          type: 'inPractice',
          heading: 'In your design work',
          body: 'Every error message you write corresponds to a status code. "You don\'t have permission" is a 403. "Something went wrong on our end" is a 500. "We couldn\'t find this page" is a 404. Knowing which is which helps you write accurate copy and build the right recovery flow.'
        },
        {
          type: 'askEngineer',
          heading: 'Questions to ask engineers',
          items: [
            'What status code does the API return if the user\'s session expires?',
            'What is the difference between a 400 and a 422 in your API?',
            'Are there error codes we should handle differently in the UI?',
            'What happens if this request times out — does it return a specific code?'
          ]
        }
      ]
    },

    // ─── Lesson 5 ────────────────────────────────────────────────────────────
    {
      id: 'latency-loading',
      title: 'Latency, Loading States & UX Consequences',
      duration: '10 min',
      summary: 'Speed is a design constraint. Understanding latency changes how you think about every loading state, animation, and empty state you design.',
      sections: [
        {
          id: 's-physics',
          heading: 'Speed Is Not Free',
          body: `Here is something worth understanding: the internet has physics.\n\nData travels as light through fibre optic cables. Light moves at about 200,000 km per second through glass — which sounds impossibly fast. And it is.\n\nBut London to Sydney is 16,993 km. That means the minimum possible round trip time — with zero congestion, perfect routing, ideal conditions — is about 170 milliseconds.\n\nIn practice it is 250–300ms. And that is before the DNS lookup, TCP handshake, server processing time, and everything else.\n\nPhysics is a floor, not a ceiling. You cannot go faster than light.`
        },
        {
          id: 's-latency',
          heading: 'What Latency Actually Is',
          body: `Latency is the time it takes for data to travel from one point to another. Measured in milliseconds.\n\nBandwidth is different. Bandwidth is how much data can travel at once — the width of the pipe. Latency is how long it takes to get there — the length of the pipe.\n\n**Why latency matters more than bandwidth for most UX:**\nMost interactive actions — clicking a button, submitting a form, switching tabs — involve small data transfers. The bottleneck is not how much can be sent. It is how long it takes to get there.\n\n• 100ms feels instant\n• 300ms feels normal\n• 1 second feels slow\n• 3 seconds feels broken\n\nThese are not opinions. They are based on decades of research into human perception of response time.`
        },
        {
          id: 's-consequences',
          heading: 'The UX Consequences',
          type: 'why',
          body: `Network latency directly creates design problems:\n\n**Loading states are not optional**\nAny action that makes a network request needs a loading state — because the response is not instant and could fail.\n\n**Optimistic UI exists because of latency**\nRather than waiting for server confirmation, you assume success and update the UI immediately. If the server fails, you roll back. This is how Figma saves your work — you see changes immediately even though syncing happens in the background.\n\n**Skeleton screens beat spinners**\nSpinners say "something is happening, I do not know what". Skeletons say "content is loading, here is roughly what it will look like". Skeletons reduce perceived load time by setting a layout expectation.\n\n**Retry states are mandatory**\nNetworks fail. Any design that makes a network request needs to account for timeout and error — and give users a way to try again.`
        },
        {
          id: 's-before',
          heading: 'Before We Understood Latency',
          type: 'without',
          body: `Early web pages had no loading states at all. You clicked a link and waited — staring at a blank white screen — until the page finished loading. The browser cursor changed to a spinner. That was the entire feedback.\n\nEarly web apps treated the network like it was instant. Forms would submit, the page would go blank, then reload. Slow connections made this experience painful.\n\nThe entire field of perceived performance — skeleton screens, optimistic UI, progress indicators, partial loading — was invented because designers and engineers realised the network would never be instant, and the experience of waiting could be designed.`
        },
        {
          id: 's-design',
          heading: 'Design Decisions Shaped by Latency',
          body: `Once you understand latency, you see it in design decisions everywhere:\n\n**Pagination vs infinite scroll**\nPagination makes one large request per page. Infinite scroll makes smaller, more frequent requests as you approach the bottom. Which is better depends on expected latency and data size.\n\n**Prefetching**\nSome apps start loading the next page before you click on it — because they can predict what you will do. Next.js does this automatically for visible links.\n\n**Offline states**\nDesigning for no network connection is designing for maximum latency (infinite). Apps like Figma and Notion work offline by storing data locally and syncing when connection returns.\n\n**Progressive loading**\nLoad the critical content first, the rest later. Blog posts render text before images — text is small, images are large.`
        },
        {
          id: 's-engineer',
          heading: 'Engineer Translation',
          type: 'engineer',
          items: [
            { term: 'TTFB (Time to First Byte)', plain: 'how long until the first byte of the server\'s response arrives — a measure of both server speed and network latency' },
            { term: 'FCP (First Contentful Paint)', plain: 'when the user first sees any content on screen — one of Google\'s Core Web Vitals' },
            { term: 'optimistic update', plain: 'updating the UI immediately, assuming the server will succeed, then rolling back if it fails' },
            { term: 'debounce', plain: 'waiting until the user stops typing before making a request — avoids making dozens of requests per keystroke on a search input' },
            { term: 'prefetch', plain: 'loading a resource before it is needed, anticipating that the user will want it soon' },
            { term: 'stale-while-revalidate', plain: 'show cached (possibly outdated) data immediately while fetching fresh data in the background — the user sees something instantly' }
          ]
        }
      ],
      vocab: ['latency', 'bandwidth', 'milliseconds', 'loading state', 'optimistic UI', 'skeleton screen', 'TTFB', 'FCP'],
      quiz: [
        {
          q: 'What is the difference between latency and bandwidth?',
          options: [
            'Latency is the server speed; bandwidth is the client speed',
            'Latency is how long data takes to travel; bandwidth is how much can travel at once',
            'Latency is for mobile networks; bandwidth is for desktop',
            'They are the same thing measured differently'
          ],
          answer: 1,
          explanation: 'Latency is the time delay — how long it takes data to get from A to B. Bandwidth is capacity — how much data can flow at once. For most interactive UI, latency matters more than bandwidth.'
        },
        {
          q: 'What is "optimistic UI"?',
          options: [
            'A design pattern that only works on fast connections',
            'Updating the interface immediately (assuming success), then correcting if the server returns an error',
            'A loading animation that looks confident',
            'Designing only for best-case scenarios'
          ],
          answer: 1,
          explanation: 'Optimistic UI means updating the interface before the server confirms, then rolling back on failure. It makes interactions feel instant even on slow networks. Figma uses this for real-time collaboration.'
        }
      ],
      exercise: {
        prompt: 'Open Chrome DevTools → Network tab. Click the "No throttling" dropdown and select "Slow 3G". Reload any web page. Watch carefully: what loads first? What comes last? How long does each request take? Now think: if you were designing this page, what would you show in the loading state — and in what order?'
      },
      reflection: 'Think about a product you have designed or are currently designing. What network requests does it make? What happens in the UI while those requests are in flight? What happens if they fail? Is there a retry flow? Are there any loading states missing?',
      rightSidebar: [
        {
          type: 'fact',
          heading: 'The 100ms rule',
          body: 'Research by Jakob Nielsen in 1994 established that responses under 100ms feel instantaneous, 100ms–1s feels like the computer is working, and 1s+ breaks the user\'s flow. These thresholds still guide performance engineering decisions today.'
        },
        {
          type: 'inPractice',
          heading: 'In your design work',
          body: 'Every interaction that triggers a network request needs at least three states: loading, success, and error. Designing only the success state means you have designed 33% of the experience.'
        },
        {
          type: 'askEngineer',
          heading: 'Questions to ask engineers',
          items: [
            'What is the expected p95 response time for this API call?',
            'Does this feature use optimistic updates?',
            'Is there a timeout for this request? What happens after it expires?',
            'Is this data cached — and for how long?'
          ]
        }
      ]
    }
  ]
}
