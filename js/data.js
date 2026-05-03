/**
 * ============================================================
 *  z/OS COMPETENCY FRAMEWORK  DATA FILE
 * ============================================================
 */

const topics = [

  // 
  //  LEVEL 1
  // 

  //  Platform Fundamentals (3 cards) 

  {
    id: "l1-zos-overview",
    level: 1,
    category: "Platform Fundamentals",
    title: "z/OS Overview & Address Spaces",
    summary: "What z/OS is, its role in enterprise computing, the address space model, virtual storage layout, and how tasks are isolated from each other and EBCDIC.",
    content: `
      <h2>What is z/OS?</h2>
      <p>z/OS is a 64-bit enterprise operating system designed by IBM for mainframe computers (System z). Introduced in 2000 as the successor to MVS/ESA, z/OS represents the evolution of IBM's mainframe OS lineage dating back to OS/360 (1966). z/OS is purpose-built for mission-critical, high-availability environments requiring extreme reliability, scalability, and security. It is the foundation of banking systems, insurance platforms, government agencies, and Fortune 500 companies that require near-zero downtime and process billions of transactions daily.</p>
      <p><strong>Key characteristics:</strong> z/OS employs a 64-bit virtual addressing model that allows individual address spaces to utilize up to 16 exabytes of addressable memory. The operating system manages workloads through subsystems (like JES2/JES3 for batch processing, CICS for transaction processing, and IMS for hierarchical databases) and provides robust security via RACF and ACF2. z/OS also incorporates modern technologies: UNIX System Services (providing POSIX compliance), TCP/IP support (allowing seamless integration into IP networks), and batch, transaction, and database capabilities all operating concurrently on a single system.</p>

      <h2>Address Space Model</h2>
      <p>An <strong>address space</strong> is the virtual memory environment allocated to a single task or job on z/OS. Each address space is 64-bit and is completely isolated from other address spaces, providing strong process isolation and security boundaries. The z/OS address space consists of three principal regions:</p>
      <ul>
        <li><strong>System Area (Region 0, 0x00000000–0x7FFFFFFF):</strong> Reserved for the z/OS kernel and system control blocks. User code cannot execute in this region. This area contains the nucleus (core OS code), system control blocks like the Prefixed Save Area (PSA), and other kernel data structures.</li>
        <li><strong>Private Area / User Area (Region F, 0x80000000–0xFFFFFFFF in 32-bit; extended to 64-bit in modern z/OS):</strong> Allocated to user programs, user data, and application working storage. Each address space has its own isolated private area; no other task can access another task's private area without explicit cross-memory permissions.</li>
        <li><strong>Common Service Area (CSA) and Extended CSA (ECSA):</strong> Mapped identically into every address space and contains system code, data, and services that must be accessible from multiple address spaces. The CSA is protected by storage keys to prevent unauthorized modification by user-key tasks.</li>
      </ul>
      <p>This separation ensures that one buggy or malicious application cannot corrupt another application's memory or crash the entire system.</p>

      <h2>Virtual Storage</h2>
      <p><strong>Virtual storage</strong> is the addressable memory space presented to programs, which is decoupled from the actual physical memory (real storage) available on the system. This abstraction is one of z/OS's most powerful features.</p>
      <ul>
        <li><strong>Real vs Virtual Storage:</strong> Real storage is the actual physical RAM installed on the mainframe. Virtual storage is the address space each task sees, which can exceed real storage by orders of magnitude. The z/OS Real Storage Manager (RSM) maps the virtual addresses in an address space to real memory frames. Virtual addresses are 64-bit, allowing each address space to address up to 16 exabytes; real storage on a system might be, for example, 1–10 TB.</li>
        <li><strong>Paging and Swapping:</strong> When a program references a virtual address that is not currently in real memory, a page fault occurs. The RSM uses direct access storage devices (DASD) as an extension of real memory: page-in operations load the referenced 4 KB page from DASD into an available real memory frame, and page-out operations write modified pages from real memory back to DASD. When an entire address space is temporarily removed from real memory to make room for higher-priority work, this is called swapping. Efficient paging and swapping are critical to maintaining system throughput and response time.</li>
        <li><strong>Storage Protection Keys:</strong> z/OS uses 4-bit storage protection keys (keys 0–15) associated with 4 KB blocks of real memory. Each task is assigned a key, and the processor's memory management unit (MMU) enforces that a task running under a particular key can only write to pages associated with its key or with key 0 (which is always writable by any key). This hardware-enforced mechanism prevents a user-key task from overwriting system memory or another task's protected data.</li>
      </ul>

      <h2>Task Isolation</h2>
      <p>Each task running on z/OS operates within its own address space, providing strong isolation from other tasks. The processor and memory management unit enforce this isolation at the hardware level:</p>
      <ul>
        <li><strong>Address Space Isolation:</strong> Each task's private area is inaccessible to any other task unless explicitly shared via cross-memory services. A user task cannot read or modify another task's local variables, file handles, or control structures, preventing accidental or malicious interference.</li>
        <li><strong>Storage Key Isolation:</strong> As described above, storage keys prevent a user-level task from modifying pages outside its key domain, even if the task somehow obtains a virtual address pointing to that memory.</li>
        <li><strong>Cross-Memory Communication (CMC):</strong> When legitimate inter-task communication is required, z/OS provides controlled cross-memory services. A task can establish a cross-memory connection to another task's address space and use the LLCALL instruction to execute code in that target address space with full visibility to its private area. This mechanism is used by system services, subsystems, and applications requiring secure inter-process communication. Access rights are managed by the system and can be regulated by RACF.</li>
        <li><strong>I/O Isolation:</strong> Device I/O is mediated by the z/OS I/O subsystem. A user task cannot directly access a device; instead, it issues I/O requests through the kernel, which validates the request and enforces device ownership and data set access controls (via RACF or ACF2).</li>
      </ul>
      <p>This multi-layered isolation model ensures that z/OS can safely host thousands of concurrent tasks, with system services running alongside user batch jobs, transaction servers (like CICS), and long-running applications, all with strong security and reliability boundaries.</p>

      <h2>EBCDIC (Extended Binary Coded Decimal Interchange Code)</h2>
      <p>z/OS systems natively use <strong>EBCDIC</strong> as their default character encoding, not the ASCII encoding common in Unix and Windows systems. EBCDIC was developed by IBM in the 1960s for IBM mainframes and remains the standard for z/OS and System z environments. This is a critical distinction for system administrators and programmers working with z/OS.</p>
      <ul>
        <li><strong>Character Encoding Basics:</strong> EBCDIC is an 8-bit character code where each printable and control character is represented by a unique byte value (0–255). For example, the letter 'A' is 0xC1 in EBCDIC, whereas it is 0x41 in ASCII. This fundamental difference means that data files, text editors, and communication protocols on z/OS differ from their counterparts on distributed systems.</li>
        <li><strong>Data Representation Impact:</strong> z/OS datasets (files) are typically stored in EBCDIC. When moving data between a z/OS system and a Unix or Windows system (a common integration scenario), character conversion must occur. System administrators must configure conversion tables and middleware (like MQ Series or data transfer tools) to translate between EBCDIC and ASCII/UTF-8.</li>
        <li><strong>Practical Implications:</strong> Programmers developing on z/OS must understand EBCDIC collation (sort order differs from ASCII), and when processing text data from external sources, they must apply the appropriate character set conversion. ISPF editors and many z/OS development tools work transparently with EBCDIC, but integration with Linux or cloud services requires deliberate character encoding handling.</li>
        <li><strong>Modern Considerations:</strong> While z/OS increasingly supports UTF-8 and UNICODE in specific contexts (particularly for network communications and modern application servers), EBCDIC remains the native encoding for traditional system components, batch processing, and data storage.</li>
      </ul>

      <h2>Sources & References</h2>
      <div style="margin-top:20px; padding:20px; background-color:#e8f4f8; border-left:5px solid #0066cc; border-radius:4px; font-size:0.9em; line-height:1.8;">
        <ul style="margin: 0; padding-left: 20px; list-style-type:none;">
          <li>• <a href="https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.4.0/com.ibm.zos.v2r4.ieaa100/toc.htm" target="_blank" style="color:#0066cc; text-decoration:none;">IBM z/OS Concepts</a> (Publication SY28-1149)</li>
          <li>• <a href="https://www.ibm.com/support/knowledgecenter/SSB23S_1.1.0/com.ibm.ztpf.ztpfdf/c1sdd101.htm" target="_blank" style="color:#0066cc; text-decoration:none;">IBM z/OS MVS Guiding Concepts</a> (Publication SG24-6473)</li>
          <li>• <a href="https://www.ibm.com/support/knowledgecenter/en/SSLTBW_3.1.0/com.ibm.zos.v3r1.ikj/toc.htm" target="_blank" style="color:#0066cc; text-decoration:none;">IBM z/OS System Messages - Operator Console</a> (Publication SA23-1379)</li>
          <li>• <a href="https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.5.0/com.ibm.zos.v2r5/zosv2r5_book.htm" target="_blank" style="color:#0066cc; text-decoration:none;">IBM System z Processor Architecture Interface Handbook</a> (Publication SA22-7832)</li>
          <li>• <a href="https://www.ibm.com/support/knowledgecenter/SSB23S_1.1.0/com.ibm.ztpf.ztpfdf/syscall.htm" target="_blank" style="color:#0066cc; text-decoration:none;">Cross-Memory Services Reference</a> (Publication SA22-7644)</li>
          <li>• <a href="https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.5.0/com.ibm.zos.v2r5.ieae100/hmapg000.htm" target="_blank" style="color:#0066cc; text-decoration:none;">z/OS Performance Tuning Reference</a></li>
          <li>• <a href="https://www.ibm.com/support/knowledgecenter/SSLTBW/character-encoding-ebcdic" target="_blank" style="color:#0066cc; text-decoration:none;">IBM Character Encoding Reference</a></li>
          <li>• <a href="https://www.redbooks.ibm.com/redbooks/pdfs/sg246981.pdf" target="_blank" style="color:#0066cc; text-decoration:none;">IBM Redbook SG246981</a> — z/OS Systems Programming</li>
          <li>• Hennessy, J. L., & Patterson, D. A. (2018). <em>Computer Architecture: A Quantitative Approach</em> (6th ed.). Morgan Kaufmann.</li>
          <li>• Tanenbaum, A. S. (2014). <em>Modern Operating Systems</em> (4th ed.). Pearson.</li>
        </ul>
      </div>
    `,
    mcq: [
      { question: "What is an address space on z/OS?", options: ["A physical memory location", "A virtual memory region assigned to each task for isolation", "A DASD volume", "A network segment"], answer: 1, explanation: "Each task runs in its own virtual address space, providing isolation and access control." },
      { question: "What does virtual storage allow z/OS to do?", options: ["Run programs larger than real memory by paging in and out of disk", "Encrypt all datasets automatically", "Share TCP/IP connections", "Define LPAR boundaries"], answer: 0, explanation: "Virtual storage lets z/OS present more addressable memory to programs than physical RAM exists, using paging." },
      { question: "Which area of an address space is shared across all tasks?", options: ["Private area", "Extended private area", "Common area (CSA/ECSA)", "Job pack area"], answer: 2, explanation: "The Common Service Area (CSA) and its extended counterpart are mapped identically into every address space." },
      { question: "What are storage protection keys used for?", options: ["Encrypting datasets", "Preventing unauthorized writes to memory regions", "Locking RACF profiles", "Controlling I/O device access"], answer: 1, explanation: "Storage keys (015) protect 4 KB pages from unauthorised writes by tasks running under a different key." },
      { question: "Which z/OS component manages real storage frames and paging?", options: ["JES2", "RSM (Real Storage Manager)", "VTAM", "RACF"], answer: 1, explanation: "RSM handles frame allocation, page-ins, page-outs, and swapping of address spaces." },
      { question: "What is the maximum addressable memory in a single z/OS address space?", options: ["4 GB", "64 GB", "1 TB", "16 exabytes"], answer: 3, explanation: "z/OS 64-bit virtual addressing allows up to 16 exabytes (2^64 bytes) per address space." },
      { question: "Which character encoding does z/OS natively use for data storage and processing?", options: ["ASCII", "UTF-8", "EBCDIC", "Unicode"], answer: 2, explanation: "EBCDIC (Extended Binary Coded Decimal Interchange Code) is the native character encoding for z/OS; ASCII/UTF-8 require explicit conversion." },
      { question: "What is the size of the System Area (Region 0) in z/OS address space?", options: ["512 MB", "2 GB", "Reserved for kernel; uses virtual addresses 0x00000000–0x7FFFFFFF in 32-bit", "Unlimited"], answer: 2, explanation: "Region 0 is reserved for the z/OS nucleus and system control blocks; user code cannot execute here." },
      { question: "When a program references a page not in real memory, what occurs?", options: ["The program terminates", "A page fault; RSM loads the page from DASD into a real memory frame", "The page is discarded", "The entire address space is swapped"], answer: 1, explanation: "A page fault triggers the Real Storage Manager to retrieve the needed page from DASD, maintaining the illusion of unlimited memory." },
      { question: "What is the primary benefit of address space isolation on z/OS?", options: ["Faster execution of all programs", "Prevents one faulty or malicious task from corrupting another task's memory or crashing the system", "Reduces the need for DASD storage", "Simplifies job scheduling"], answer: 1, explanation: "Strong isolation ensures reliability and security; one task's failures or attacks cannot affect other tasks." },
      { question: "EBCDIC differs from ASCII primarily in which aspect?", options: ["EBCDIC uses 16-bit encoding while ASCII uses 8-bit", "The byte values assigned to each character are different (e.g., 'A' = 0xC1 in EBCDIC vs 0x41 in ASCII)", "EBCDIC supports Unicode while ASCII does not", "EBCDIC is only used for numeric data"], answer: 1, explanation: "EBCDIC and ASCII map characters to different numeric byte values, requiring conversion when data moves between systems." },
      { question: "Which z/OS feature allows a task to securely access another task's address space with proper authorization?", options: ["Storage keys", "Virtual paging", "Cross-memory communication (CMC)", "I/O subsystem"], answer: 2, explanation: "Cross-memory services enable controlled inter-task communication; the LLCALL instruction executes code in a target address space with full access to its private area." }
    ],
    practical: [
      { title: "Observational / Theoretical Tasks – No Lab Required", description: "This card covers fundamental concepts (address spaces, virtual storage, EBCDIC) that are purely theoretical at the introductory level. Understanding these concepts is best achieved through: (1) Reading the content above and the referenced IBM Redbooks. (2) Reviewing your own z/OS system (if available) with a system programmer to observe address space isolation via operator commands like 'D A,L' or SDSF PS panel. (3) For advanced learners: studying z/OS internals via free resources like Marist College's zLinux appliance or Hercules/Hyperion emulator documentation. (4) Discussing memory management and task isolation with colleagues during system monitoring shifts.", hints: ["Hint 1: Familiarize yourself with the key concepts: address spaces, virtual storage, paging, EBCDIC.", "Hint 2: If you have access to an ISPF editor, examine a z/OS system's 'D A,L' output to see active address spaces (note OMVS, JES2, RACF, TCPIP as standard system ASIDs).", "Hint 3: Review system documentation to understand your site's memory allocation and address space design."], solution: "No formal solution; this is a theory card. The goal is to consolidate conceptual understanding before moving to operational cards (IPL, JES, DASD) where hands-on tasks become possible." }
    ]
  },

  {
    id: "l1-ipl-init",
    level: 1,
    category: "Platform Fundamentals",
    title: "IPL & System Initialization",
    summary: "The IPL sequence step by step, PARMLIB and its key members, NIP (Nucleus Initialization Program), IEASYSxx options, and how the system reaches a ready state.",
    content: `
      <h2>What is an IPL?</h2>
      <p><strong>IPL (Initial Program Load)</strong> is the process of bootstrapping a z/OS operating system from a designated volume (usually a DASD disk). It marks the transition from when the mainframe is shut down or in a powered-off state to when z/OS is fully initialized, subsystems are active, and the system is ready to accept workloads. An IPL is fundamentally a restart or startup of the z/OS kernel and all its essential components. There are several types of IPLs: a <strong>cold start (initial IPL)</strong> where the system is completely powered down; a <strong>warm start</strong> where the system resets but retains some state; and a <strong>quick start</strong> which restarts z/OS without cycling power or losing storage contents (though subsystems are recycled).</p>

      <h2>IPL Sequence (Step-by-Step)</h2>
      <ul>
        <li><strong>Stage 1 – Booting from Designated Volume:</strong> When an operator or automated tool initiates an IPL, the mainframe's firmware (BIOS equivalent) loads a specially marked volume as the IPL volume. The firmware reads the Initial Program Load Records (IPLR) from the designated DASD volume (typically SYS1.PARMLIB resides here) and executes Bootstrap Code, which begins loading z/OS components into real storage.</li>
        <li><strong>Stage 2 – NIP (Nucleus Initialization Program) Execution:</strong> NIP is the first major z/OS component loaded. It initializes the z/OS nucleus (the core kernel), sets up fundamental control blocks like the PSA (Prefixed Save Area), initializes the Real Storage Manager (RSM), and sets up the interrupt handling architecture. NIP is responsible for creating the initial address space (address space 0, or AS0) which will eventually become the master address space. NIP also performs hardware discovery and initialization, including mapping of DASD volumes and I/O channels.</li>
        <li><strong>Stage 3 – Master Scheduler and INIT Startup:</strong> After NIP completes, the Master Scheduler address space (typically ASID 1, often called INIT or MASTER) is created. The Master Scheduler is the first address space that runs regular z/OS code (after the nucleus). It begins reading the active IEASYSxx PARMLIB member to determine which subsystems to start, in what sequence, and with which parameters. The Master Scheduler manages the startup sequence and acts as the parent of most other subsystems.</li>
        <li><strong>Stage 4 – PARMLIB Processing and Subsystem Initialization:</strong> The IEASYSxx member directs which initialization members to process. Commonly, these include: - <strong>SMFPRMxx:</strong> System Management Facilities (SMF) configuration for system activity monitoring and logging. - <strong>MCDxx:</strong> Master Console configuration. - <strong>COMMNDxx:</strong> Command processing rules. - <strong>IEAPAKxx:</strong> Pageable Nucleus Modules (PAK) specification. - RACF initialization (SYS1.RACFPRM), enabling security. Each member's configuration is read and applied, initializing subsystem control blocks and queues.</li>
        <li><strong>Stage 5 – Subsystem Starts:</strong> Key subsystems are started in a defined sequence: - <strong>RACF (or ACF2):</strong> The security manager, loaded early so access control can be enforced. - <strong>JES2 or JES3:</strong> The job entry subsystem, allowing batch jobs and print output to be managed. - <strong>VTAM:</strong> The network communications subsystem (if configured). - <strong>TCP/IP:</strong> Networking stack for IP communications. - <strong>CICS, IMS, or other transaction servers:</strong> Application subsystems. Each subsystem initialization is logged; if a critical subsystem fails to start, the system may halt with an error message, or it may continue depending on configuration.</li>
        <li><strong>Stage 6 – Reaching Ready State:</strong> Once the Master Scheduler completes processing and key subsystems are active (particularly JES and RACF), z/OS enters a '<strong>ready</strong>' state. The operator console becomes interactive, and the system is capable of receiving and executing jobs. The system is now fully operationally available.</li>
      </ul>

      <h2>PARMLIB – The System Configuration Backbone</h2>
      <p><strong>SYS1.PARMLIB</strong> is a Partitioned Dataset (PDS) that stores all major z/OS initialization parameters and configuration. It resides on the IPL volume (or a shared DASD) and is the single source of truth for system configuration. Key members include:</p>
      <ul>
        <li><strong>IEASYSxx (Master Initialization Member):</strong> The primary control member. The 'xx' suffix (e.g., IEASYS00, IEASYS01) allows multiple configurations; the active one is selected at IPL time or via operator command. IEASYSxx specifies which COMMNDxx, MCDxx, SMFPRMxx, BPXPRMxx, and other members to use. It also controls nucleus resident modules (NRM) and defines console profiles.</li>
        <li><strong>COMMNDxx:</strong> Defines operator command routing rules, determining which console receives messages from which subsystems and whether certain commands require special authorization.</li>
        <li><strong>MCDxx (Master Console Definition):</strong> Specifies the master console (the primary operator interface), alternate consoles, and console attributes.</li>
        <li><strong>SMFPRMxx (System Management Facilities):</strong> Configures SMF data collection (datasets, recording options, intervals), enabling system accounting, performance monitoring, and audit logging.</li>
        <li><strong>IEAPAKxx (Portable Auxiliary Kernel):</strong> Defines which pageable nucleus modules loadable at IPL, improving system flexibility and reducing residency storage usage.</li>
        <li><strong>BPXPRMxx:</strong> Configuration for UNIX System Services (z/OS POSIX support), including filesystem mount points, security options, and shell defaults.</li>
        <li><strong>KEYDFxx:</strong> Keyboard/display configuration for 3270 terminals or integrated terminals.</li>
        <li><strong>IEAOPTxx:</strong> Optional z/OS features and performance tuning parameters.</li>
      </ul>

      <h2>Reaching a Ready State – The Full Timeline</h2>
      <p>From the moment the IPL command is issued to when the system is fully ready and stable typically takes seconds to minutes, depending on hardware speed, volume of configuration, and subsystem complexity:</p>
      <ul>
        <li><strong>Seconds 0–5:</strong> NIP executes, nucleus initializes, real storage and interrupt structures are set up.</li>
        <li><strong>Seconds 5–15:</strong> Master Scheduler starts, reads IEASYSxx, processes key PARMLIB members.</li>
        <li><strong>Seconds 15–30:</strong> RACF (security manager) starts; system now begins enforcing access control.</li>
        <li><strong>Seconds 30–45:</strong> JES2 (or JES3) starts, initializes spool datasets, brings in initiators for job processing.</li>
        <li><strong>Seconds 45–60+:</strong> Network subsystems (VTAM, TCP/IP) start if configured; operator log begins logging events.</li>
        <li><strong>System Ready:</strong> Operator receives a message indicating all subsystems are initialized and the system is accepting commands. Console is now online and interactive.</li>
      </ul>

      <h2>Sources & References</h2>
      <div style="margin-top:20px; padding:20px; background-color:#e8f4f8; border-left:5px solid #0066cc; border-radius:4px; font-size:0.9em; line-height:1.8;">
        <ul style="margin: 0; padding-left: 20px; list-style-type:none;">
          <li>• <a href="https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.4.0/com.ibm.zos.v2r4.ieaa100/toc.htm" target="_blank" style="color:#0066cc; text-decoration:none;">IBM z/OS Concepts</a> (Publication SY28-1149)</li>
          <li>• <a href="https://www.ibm.com/support/knowledgecenter/SSB23S_1.1.0/com.ibm.ztpf.ztpfdf/c1sdd101.htm" target="_blank" style="color:#0066cc; text-decoration:none;">z/OS MVS Initialization and Tuning Reference</a> (Publication SA23-1379)</li>
          <li>• <a href="https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.5.0/com.ibm.zos.v2r5/zosv2r5_book.htm" target="_blank" style="color:#0066cc; text-decoration:none;">z/OS System Architecture Reference</a></li>
          <li>• <a href="https://www.redbooks.ibm.com/redbooks/pdfs/sg246981.pdf" target="_blank" style="color:#0066cc; text-decoration:none;">IBM Redbook SG246981</a> — z/OS Systems Programming</li>
          <li>• <a href="https://www.ibm.com/support/knowledgecenter/SSLTBW/system-initialization-guide" target="_blank" style="color:#0066cc; text-decoration:none;">Operator Messages and Subsystem Startup Documentation</a></li>
        </ul>
      </div>
    `,
    mcq: [
      { question: "What does IPL stand for?", options: ["Internal Program Loader", "Initial Program Load", "I/O Path Loader", "ISPF Primary Library"], answer: 1, explanation: "IPL (Initial Program Load) is the process of bootstrapping z/OS from a designated volume." },
      { question: "Which PARMLIB member specifies the primary system initialization parameters?", options: ["SMFPRMxx", "BPXPRMxx", "IEASYSxx", "SCHEDxx"], answer: 2, explanation: "IEASYSxx is the master initialization member read at IPL to determine which other members and options are used." },
      { question: "What is the role of NIP during IPL?", options: ["Start JES queues", "Initialize the nucleus and prepare the system for further components to load", "Allocate DASD volumes", "Start RACF"], answer: 1, explanation: "NIP (Nucleus Initialization Program) initializes the z/OS kernel and sets up the base system environment." },
      { question: "Where is SYS1.PARMLIB typically located?", options: ["On the network drive", "On the IPL volume or a shared primary DASD volume", "In the JES spool", "In a VSAM cluster"], answer: 1, explanation: "SYS1.PARMLIB is a PDS on DASD, usually on the same volume used to IPL the system." },
      { question: "After a successful IPL, which subsystem is started first to enable job processing?", options: ["RACF", "TCP/IP", "JES2 or JES3", "CICS"], answer: 2, explanation: "JES (Job Entry Subsystem) is started early in initialization so the system can accept and manage workloads." },
      { question: "What is the Master Scheduler address space?", options: ["The first address space created after NIP completes, typically ASID 1", "A utility that manages disk I/O", "The RACF security manager", "A monitor for batch job execution"], answer: 0, explanation: "The Master Scheduler (INIT/MASTER) is the initial operating system address space that manages subsystem startup and initialization." },
      { question: "Which PARMLIB member defines keyboard and display console configuration?", options: ["COMMNDxx", "MCDxx", "KEYDFxx", "IEASYSxx"], answer: 2, explanation: "KEYDFxx specifies keyboard, display, and 3270 terminal configuration and attributes." },
      { question: "What does SMFPRMxx control?", options: ["System message filtering", "System Management Facilities data collection and recording options", "Subsystem activation", "Storage management classes"], answer: 1, explanation: "SMFPRMxx configures SMF datasets, recording intervals, and which system events are logged for accounting and performance analysis." },
      { question: "At what stage of IPL is RACF (security manager) typically started?", options: ["During NIP execution", "Before the Master Scheduler", "Early in the subsystem startup sequence, before JES", "After all other subsystems are initialized"], answer: 2, explanation: "RACF is started early so that access control and authentication can be enforced for subsequent subsystems and user logins." },
      { question: "What does IEAPAKxx determine?", options: ["The job class assignments", "Which pageable nucleus modules are loaded at IPL", "The spool queue configuration", "The RACF profile naming convention"], answer: 1, explanation: "IEAPAKxx specifies which Portable Auxiliary Kernel (PAK) modules are resident vs. pageable, affecting memory usage and performance." },
      { question: "Approximately how long does a typical z/OS IPL take from command issuance to ready state?", options: ["1–2 seconds", "5–10 seconds", "30 seconds to a few minutes (depending on hardware and configuration)", "10–20 minutes"], answer: 2, explanation: "IPL duration varies; simple systems may IPL in under a minute, while complex systems with many subsystems may take several minutes." },
      { question: "What is BPXPRMxx used for?", options: ["Batch process exit configuration", "UNIX System Services (z/OS POSIX) configuration and filesystem setup", "Backup and recovery parameters", "Buffer pool management"], answer: 1, explanation: "BPXPRMxx controls UNIX System Services features, including filesystem mount points, security, and shell environment settings." }
    ],
    practical: [
      { title: "[HERCULES/HYPERION] Bonus Task – IPL Simulation with Mainframe Emulator", description: "If you have access to Hercules (open-source mainframe emulator) or Hyperion (successor project), you can perform a hands-on IPL: (1) Download and configure Hercules with a z/OS image. (2) Create or modify a configuration file (.cnf) specifying your DASD volumes, channel device types, and IPL device address. (3) Issue the 'ipl [device address]' command within the Hercules console to initiate IPL. (4) Observe the console output as the system boots: you will see NIP initialization messages, PSA setup, PARMLIB member processing, and subsystem startup messages. (5) When prompted, log in with the master console credentials and issue commands like 'd a,l' (display active address spaces) to verify the running system.", hints: ["Hint 1: Hercules can be downloaded from http://www.hercules-390.org/ and Hyperion from https://github.com/Fish-Git/hyperion", "Hint 2: Pre-built z/OS or z/VM appliances like Marist College's zLinux or TK4 starter system can reduce setup complexity.", "Hint 3: Observe which messages have the 'IEA' prefix (z/OS system component messages related to IPL).", "Hint 4: After IPL, type 'help' at the console to explore available operator commands."], solution: "Upon successful IPL in Hercules, you will see: (a) NIP initialization (IEA010I messages indicating nucleus load, PSA creation). (b) Master Scheduler starting (ASID 1 messages). (c) RACF initialization (IEF089I, IEF090I messages). (d) JES2 startup (JES2 Version & HASP... messages). (e) VTAM/TCP start if configured. (f) Console ready prompt, waiting for operator input. A successful IPL demonstrates the complete sequence covered in this card." }
    ]
  },

  {
    id: "l1-jes-sysplex",
    level: 1,
    category: "Platform Fundamentals",
    title: "JES, Spooling & Sysplex",
    summary: "JES2/JES3 job entry, spool management, job classes and routing, and the sysplex concept as a cluster of cooperating z/OS systems.",
    content: `
      <h2>JES Overview</h2>
      <p><strong>JES (Job Entry Subsystem)</strong> is the heart of z/OS batch processing. It is responsible for accepting job submissions from various sources (card readers, network, files), queuing them for execution, managing their execution, and directing their output to appropriate destinations (printers, disk, email). Every batch job on z/OS passes through JES. There are two main versions: <strong>JES2</strong> (Job Entry Subsystem 2), the more common choice for single-system and sysplex environments, and <strong>JES3</strong> (Job Entry Subsystem 3), historically favored for network-centric and multi-system environments and now less widely deployed. Both versions provide similar capabilities with different architectural approaches.</p>
      <p><strong>JES2</strong> uses a Master Address Space (MAS) that manages the global JES queue and coordinates with local processors (Initiators and Transmitters). <strong>JES3</strong> employs a more centralized model with a Global Processor (GP) that might run on a different system. For modern installations, JES2 is the standard. The main functions of JES are: (1) <strong>Input Handling:</strong> Accept BatchJCL from card readers, network (RJE, NetJES), SDSF console, or datasets. (2) <strong>Queuing:</strong> Hold jobs in input queues, organized by class. (3) <strong>Scheduling:</strong> Route jobs to initiators for execution based on class assignment and resource availability. (4) <strong>Output Management:</strong> Capture job output (SYSOUT datasets) and route to output queues. (5) <strong>Routing & Disposition:</strong> Direct output to printers, hold for operator review, archive to disk, or network.</p>

      <h2>Spool Management</h2>
      <p><strong>The JES Spool</strong> is a set of dedicated DASD datasets that hold temporary job data. The spool is the staging area for all batch work. Key components include:</p>
      <ul>
        <li><strong>Input Queues:</strong> Hold Job Control Language (JCL) waiting for execution. Each job is classified by its 'CLASS' parameter (typically single letters A–Z), and multiple input queues exist for different priority and throughput characteristics.</li>
        <li><strong>Job Classes:</strong> A job class (e.g., CLASS=A) is a category that controls: - Which initiators are eligible to execute jobs in that class. - The priority and default resource limits (CPU time, memory). - Output disposition rules. Systems typically define classes A–Z; for example, CLASS=A might be for short interactive jobs, CLASS=B for medium batch, CLASS=C for long-running batch. An initiator can be assigned to service one or multiple classes.</li>
        <li><strong>Output Classes:</strong> Separate from job classes, output classes route SYSOUT (system output) after job execution. For example, an output class might specify that all printed output goes to a particular printer, or is held for manual review (HOLD), or is deleted automatically. Output class assignment is done via the OUTPUT statement or SYSOUT= DD parameter in JCL.</li>
        <li><strong>SPOOL Datasets Physically:</strong> The spool is implemented as one or more datasets allocated to DASD. On a z/OS system, you might have SYS1.HASPWORK or similar datasets serving as the physical spool. If the spool becomes full, new jobs cannot be submitted; if the spool is corrupted, JES may require a restart or recovery.</li>
        <li><strong>Spool Cleanup & Purging:</strong> After a job completes, its output is retained in the spool for operator review. Then it is either printed/transmitted, archived, or purged (deleted). System administrators can manually delete old spool datasets to reclaim space.</li>
      </ul>

      <h2>JES2 Initiators & Job Execution</h2>
      <p>A <strong>JES2 Initiator</strong> is an address space that repeatedly: (1) Searches the input queue for a job matching one of its assigned classes. (2) Retrieves the JCL. (3) Invokes the converter (parser) to validate the JCL. (4) Builds the job's address space and starts execution. (5) Captures output and directs it to output queues. (6) Repeats. Multiple initiators can run concurrently, each processing different jobs. The number of initiators and their class assignments directly control how many jobs execute simultaneously and which job types are prioritized.</p>
      <p><strong>Controlling Job Throughput:</strong> By adjusting the number of initiators and assigning them to specific classes, administrators regulate system load: - More initiators for class A means more of those jobs run simultaneously. - Fewer initiators for class B throttles long-running batch. - Initiators can be dynamically modified via the '$S INIT=*(initiator_name)' operator command, adding or removing initiator instances without restarting JES.</p>

      <h2>Output Queues & Print Routing</h2>
      <p>After a job executes, its output is placed into <strong>output queues</strong> based on output class assignment. Common dispositions include:</p>
      <ul>
        <li><strong>Print Classes (A–Z, 0–9):</strong> Output routed to physical or virtual printers. JES print datasets hold formatted print jobs; these are spooled by line mode printers (LSP) or the Output Management Facility (OMF).</li>
        <li><strong>HOLD Classes:</strong> Output retained in spool until an operator explicitly releases it. Useful for reviewing critical reports before printing.</li>
        <li><strong>Network Transmission (NJE / NetJES):</strong> Output can be transmitted to remote JES systems or network nodes via Network Job Entry (NJE). This was historically how mainframes exchanged jobs and output with remote systems.</li>
        <li><strong>Output Modification (OUTDISP):</strong> Modern z/OS allows output modification: convert print to PDF, email to recipients, archive to cloud storage, etc. This is often configured through SDSF output route definitions.</li>
      </ul>

      <h2>Sysplex Concept – Multi-System Cooperation</h2>
      <p>A <strong>Sysplex (System Complex)</strong> is a group of two or more z/OS systems that are tightly coupled and coordinated. In a sysplex, systems share: - A <strong>Coupling Facility (CF),</strong> which is a dedicated processor or logical partition containing shared memory and lock tables. - <strong>System-wide Services:</strong> RACF (Shared RACF DB), Catalog (Integrated Catalog Facility / ICF), JES (in sysplex mode, one JES can span multiple z/OS images), and GRS (Global Resource Serialization) to prevent concurrent access conflicts. - <strong>Workload Distribution:</strong> Batch jobs and transaction servers can be routed to any system in the sysplex; if one system fails, workloads shift to healthy systems. This provides <strong>High Availability (HA)</strong> and <strong>continuous operation.</strong></p>
      <p><strong>Sysplex Benefits:</strong> (1) <strong>Fault Tolerance:</strong> If one z/OS image crashes, others continue processing. (2) <strong>Scalability:</strong> Add more z/OS images to increase throughput. (3) <strong>Load Balancing:</strong> Distribute work across multiple CPUs. (4) <strong>Planned Maintenance:</strong> Take one system offline for updates while others continue serving users.</p>
      <p><strong>Sysplex Requirements:</strong> - High-speed coupling links (channels) between systems and the Coupling Facility. - Shared DASD (disk arrays visible to all systems). - Shared catalog and security databases (RACF). - Specialized JES2 or JES3 sysplex configuration to coordinate job distribution across systems.</p>

      <h2>Sources & References</h2>
      <div style="margin-top:20px; padding:20px; background-color:#e8f4f8; border-left:5px solid #0066cc; border-radius:4px; font-size:0.9em; line-height:1.8;">
        <ul style="margin: 0; padding-left: 20px; list-style-type:none;">
          <li>• <a href="https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.4.0/com.ibm.zos.v2r4.ieaa100/toc.htm" target="_blank" style="color:#0066cc; text-decoration:none;">IBM z/OS Concepts</a> (Publication SY28-1149)</li>
          <li>• <a href="https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.5.0/com.ibm.zos.v2r5.jesa100/toc.htm" target="_blank" style="color:#0066cc; text-decoration:none;">z/OS JES2 Introduction and Planning Guide</a></li>
          <li>• <a href="https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.5.0/com.ibm.zos.v2r5.jade100/toc.htm" target="_blank" style="color:#0066cc; text-decoration:none;">z/OS JES3 Introduction and Planning Guide</a></li>
          <li>• <a href="https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.5.0/com.ibm.zos.v2r5.hlbpg/aix1intro.htm" target="_blank" style="color:#0066cc; text-decoration:none;">z/OS Parallel Sysplex Implementation Guide</a></li>
          <li>• <a href="https://www.ibm.com/support/knowledgecenter/SSLTBW/spool-management-and-jcl" target="_blank" style="color:#0066cc; text-decoration:none;">JES2 and JES3 Spool Management Best Practices</a></li>
          <li>• <a href="https://www.redbooks.ibm.com/redbooks/pdfs/sg246981.pdf" target="_blank" style="color:#0066cc; text-decoration:none;">IBM Redbook SG246981</a> — z/OS Systems Programming</li>
        </ul>
      </div>
    `,
    mcq: [
      { question: "What is the primary role of JES on z/OS?", options: ["Manage disk I/O buffers", "Accept, queue, and manage jobs for execution", "Control TCP/IP routing", "Manage RACF profiles"], answer: 1, explanation: "JES (Job Entry Subsystem) handles job input, scheduling, output disposition, and spool management." },
      { question: "What is a JES initiator?", options: ["A task that reads jobs from the spool and starts their execution", "A network listener", "A RACF security exit", "A PARMLIB member"], answer: 0, explanation: "Initiators are address spaces that pull jobs matching their class assignments from the JES input queue and present them for execution." },
      { question: "What is the JES spool used for?", options: ["Storing RACF audit records", "Holding job input, output, and log data temporarily during and after execution", "Paging virtual memory", "Storing TCP/IP routing tables"], answer: 1, explanation: "The JES spool holds JCL input, SYSOUT data, and job logs – data that persists until purged." },
      { question: "What is a sysplex?", options: ["A single z/OS image with multiple LPARs", "A cluster of z/OS systems sharing work, resources, and a Coupling Facility", "A JES spool partition", "An SMS storage group"], answer: 1, explanation: "A sysplex (system complex) connects multiple z/OS images so they can cooperate for availability and scalability." },
      { question: "In JES2, what does the job class control?", options: ["The RACF user ID under which the job runs", "Which initiators are eligible to process the job", "The SMS management class applied", "The TCP/IP routing of output"], answer: 1, explanation: "Job class determines which initiators can pick up the job. Initiators are assigned one or more classes." },
      { question: "What is the difference between JES2 and JES3?", options: ["None, they are identical", "JES2 uses local initiators; JES3 uses a centralized Global Processor architecture", "JES2 supports only batch; JES3 supports transactions", "JES2 cannot run in a sysplex; JES3 can"], answer: 1, explanation: "JES2 has local processors per system; JES3 has a centralized Global Processor. JES2 is more common in modern deployments." },
      { question: "What directly controls how many jobs execute simultaneously on z/OS?", options: ["The number of tape drives", "The CPU speed", "The number of active JES initiators and their class assignments", "The size of the spool dataset"], answer: 2, explanation: "Each initiator processes one job at a time; more initiators = more concurrent jobs. Class assignments direct which initiators take which jobs." },
      { question: "What is an output class in JES?", options: ["A classification of system messages", "A category that determines where job output is routed (printer, hold, delete, etc.)", "A job resource limit", "A network connection type"], answer: 1, explanation: "Output classes route SYSOUT after job completion to printers, hold areas, or network destinations." },
      { question: "What is Network Job Entry (NJE) used for?", options: ["Logging in to z/OS remotely", "Submitting jobs to remote systems and receiving their output", "Configuring network adapters", "Allocating network bandwidth"], answer: 1, explanation: "NJE enables z/OS systems to submit jobs to each other and transmit output over network links, historically critical for multi-system environments." },
      { question: "What does a Coupling Facility (CF) provide in a sysplex?", options: ["A backup processor for computation", "Shared memory, lock management, and coordination services for all z/OS images in the sysplex", "A secondary storage device", "A firewall"], answer: 1, explanation: "The CF is a dedicated processor or partition providing sysplex-wide shared services and fast inter-system communication." },
      { question: "Which z/OS system function MUST be shared across a sysplex for proper coordination?", options: ["Spool only", "RACF security database and catalog (ICF)", "LPARs only", "Operator consoles only"], answer: 1, explanation: "Shared RACF and catalog ensure consistent security and resource visibility across all systems in the sysplex, preventing conflicts." },
      { question: "What is the primary benefit of a sysplex architecture?", options: ["Lower hardware cost", "Reduced training requirements", "High Availability: if one system fails, workloads shift to others; support for planned maintenance without downtime", "Simplified networking"], answer: 2, explanation: "Sysplexes enable continuous operation by distributing work across multiple systems and providing failover capabilities." }
    ],
    practical: [
      { title: "Task 1 – Inspect JES2 Initiators in SDSF", description: "In SDSF, view the active initiators (I panel) and note which job classes each initiator is assigned to service, how many jobs each has processed, and their current status. Optionally, change an initiator's class assignment and observe its impact on incoming jobs.", hints: ["Hint 1: From SDSF primary menu, type 'I' on the command line or press the Initiator button.", "Hint 2: The I panel displays initiator number, class string (e.g., 'ABCDE'), job count, and status.", "Hint 3: To modify an initiator (e.g., to add a class or stop it), right-click or use the command syntax '$P INIT=nn,CLASS=X'."], solution: "Expected output: A list of active initiators with their assigned class strings. For example: 'INIT0001  CLASS:A         JOBS:  5  STATUS: ACTIVE' means Initiator 1 processes class A jobs and has executed 5 jobs so far. Observe that if you submit a new CLASS=B job and Class B has no running initiators, the job will wait in the input queue." },
      { title: "Task 2 – Submit a Job and Trace It Through JES Queues", description: "Submit a test batch job (simple JCL that echoes a message or lists a file) via SDSF or JCL SUBMIT. Use SDSF to track the job through each stage: input queue, execution (running initiator), output queue. Retrieve and review the job's output, JCL, and log.", hints: ["Hint 1: Prepare simple JCL: //TESTJOB JOB (ACCTNO),'TEST JOB'\\n//S1 EXEC PGM=IEFBR14 (or another program)\\n//DD1 DD SYSOUT=*", "Hint 2: Submit via SDSF by typing SUBMIT 'dataset.name' or use the local interface.", "Hint 3: Use SDSF 'ST' (status/track) panel to follow the job's state transitions: INPUT, EXEC, OUTPUT.", "Hint 4: Once completed, view the job's output in the SDSF 'O' (output) or 'H' (held) panel."], solution: "Expected observations: (1) Job appears in INPUT queue (state: ST=IN). (2) After ~seconds, an available initiator picks it up; job state changes to EXEC. (3) Job completes; output is placed in OUTPUT queue (state: ST=OUT). (4) Use 'O' panel to view SYSOUT listings, job log, and return code. A RC=0 indicates successful execution." },
      { title: "Task 3 – Inspect Spool Status and Cleanup (Optional Advanced)", description: "Use operator commands (e.g., 'D SPOOL' or SDSF INFO command) to view spool dataset usage statistics, including total space, free space, and % utilized. If authorized, practice purging old job output to reclaim spool space.", hints: ["Hint 1: Issue the operator command '$D SPOOL' to display spool status.", "Hint 2: Check the SDSF 'INFO' panel for detailed spool dataset metrics.", "Hint 3: To purge old output, use '$P SPOOL=(dataset)' or from SDSF 'O' panel, select a job and press 'PURGE'."], solution: "Expected output: Spool status display showing: Spool Dataset Name, Total Space, Used Space, Free Space, Utilization %. Example: 'SYS1.HASPWORK  TOTAL=500MB  USED=350MB  FREE=150MB  70% UTILIZED'. Purging output frees space; watch free space increase after purges. Purpose: Ensures spool doesn't fill up and demonstrates operational monitoring of a critical JES resource." }
    ]
  },

  //  Hardware & Virtualization (1 card  stays focused as-is) 

  {
    id: "l1-hardware",
    level: 1,
    category: "Hardware & Virtualization",
    title: "CPC, LPAR & I/O Basics",
    summary: "CPC basics, LPARs, HMC fundamentals, and I/O channels  the physical and logical foundation of a mainframe system.",
    content: `
      <h2>Central Processor Complex (CPC) – Hardware Foundation</h2>
      <p><strong>CPC (Central Processor Complex)</strong> is IBM's term for the entire mainframe computer system. It encompasses all hardware components including processors, memory, I/O subsystems, and control electronics, all housed in large cabinet(s). A modern CPC (e.g., z14, z15, z16) is a multi-terabyte system capable of executing billions of instructions per second, supporting hundreds of concurrent workloads. The physical layout consists of: (1) <strong>Processor Units (PUs):</strong> Multiple physical CPU cores (processors) that execute instructions. Each processor can run at gigahertz speeds. (2) <strong>Main Storage (Real Memory):</strong> High-speed RAM available to all z/OS images and components running in the CPC. Modern systems support multiple TB of real storage. (3) <strong>I/O Subsystem:</strong> Channels and adapters that connect to disk drives (DASD), tape, network cards (OSA, HCA), and other peripherals. (4) <strong>Power Distribution &amp; Cooling:</strong> Critical infrastructure for reliability; CPCs draw considerable power and generate heat requiring sophisticated cooling systems. (5) <strong>Control Processors:</strong> Embedded controllers handling low-level functions like interrupts, I/O scheduling, and thermal management. These are invisible to the z/OS operating system but critical to system operation.</p>
      <p><strong>Key CPC Characteristics:</strong> - <strong>Redundancy &amp; Fault Tolerance:</strong> CPCs incorporate multiple redundant pathways for memory access, I/O, and power. If a component fails, redundant hardware takes over automatically. - <strong>Security Features:</strong> Hardware-enforced storage protection, processor keys, and pervasive encryption for data at rest and in transit. - <strong>Virtualization Capability:</strong> A CPC can be subdivided into independent LPARs, each running a separate z/OS (or z/VM, z/VSE) image with strong isolation. - <strong>System Controller &amp; Firmware:</strong> An embedded System Controller runs z/CPC firmware that manages low-level functions, monitoring, and boot/IPL processes.</p>

      <h2>LPAR (Logical Partition) – Virtual Mainframes</h2>
      <p><strong>LPAR (Logical Partition)</strong> divides a single CPC into multiple independent, isolated subsets of hardware. Each LPAR appears to z/OS as a separate, complete mainframe. One CPC can host dozens of LPARs, each running its own z/OS image, each with its own workloads, security domains, and operator console. LPARs are defined at the hardware level via the HMC; z/OS has no control over LPAR boundaries—they are enforced by the processor itself.</p>
      <p><strong>LPAR Configuration Parameters:</strong> Each LPAR is assigned: - <strong>Processors (Cores):</strong> Can be Dedicated (exclusive to that LPAR) or Shared (the LPAR is given a time-slice based on CPU weight and priority). Dedicated cores guarantee exclusive access; shared cores are oversubscribed when workload permits, providing higher utilization. - <strong>Memory Allocation:</strong> Each LPAR receives a contiguous, dedicated portion of real storage. Memory is not over-provisioned; each LPAR's allocation is disjoint. - <strong>I/O Device Assignment:</strong> Disk controllers, network adapters, and other I/O devices are assigned to specific LPARs. An I/O device belongs to exactly one LPAR for exclusive use. - <strong>Coupling Facility (CF) Access (if in a sysplex):</strong> LPARs running z/OS in a sysplex share access to a dedicated Coupling Facility LPAR. - <strong>Boot/IPL Settings:</strong> Each LPAR has designated boot devices and IPL parameters. - <strong>Operating System:</strong> Each LPAR boots its own OS instance (z/OS, z/VM, z/VSE, etc.). They operate independently; a crash in one LPAR does not affect others.</p>
      <p><strong>LPAR Benefits:</strong> - <strong>Resource Isolation:</strong> Buggy workload in LPAR-A cannot affect LPAR-B. - <strong>Consolidation:</strong> Run multiple independent environments (test, dev, prod) on one CPC. - <strong>Operational Flexibility:</strong> Take one LPAR offline for maintenance without impacting others. - <strong>License Optimization:</strong> Some z/OS licenses are LPAR-specific; splitting workloads can reduce total licensing cost. - <strong>High Availability:</strong> If one LPAR fails, others assume its workload (with sysplex failover).</p>

      <h2>Hardware Management Console (HMC) – The Control Interface</h2>
      <p><strong>HMC (Hardware Management Console)</strong> is a specialized hardware appliance (or virtual machine in newer deployments) that provides the primary interface for managing CPCs and their LPARs. It is typically a dedicated Linux or proprietary-OS system connected to CPCs via a secure network link. The HMC communicates with each CPC's embedded System Controller (SC) and Support Element (SE) to manage hardware.</p>
      <p><strong>HMC Functions:</strong> (1) <strong>CPC Discovery &amp; Registration:</strong> HMC learns about connected CPCs and maintains their configuration. (2) <strong>LPAR Lifecycle Management:</strong> Create, delete, modify, activate, and deactivate LPARs. (3) <strong>Resource Allocation:</strong> Assign CPUs (dedicated or shared), memory, and I/O to LPARs. (4) <strong>Performance Monitoring:</strong> Display real-time CPU utilization, memory usage, and I/O activity by LPAR. (5) <strong>Firmware Updates:</strong> Deploy and activate new CPC firmware. (6) <strong>Recovery Actions:</strong> Reset LPARs, dump LPAR memory for diagnosis. (7) <strong>Security:</strong> Authenticate operators and enforce role-based access control for HMC administrative tasks. (8) <strong>Event Logging &amp; Alerting:</strong> Log hardware events (temp sensors, power supply failures) and alert operators.</p>
      <p><strong>Support Element (SE):</strong> Each CPC has an embedded SE—a dedicated microprocessor and firmware responsible for: - Collecting hardware telemetry (temperatures, power consumption, error counts). - Managing low-level boot and diagnostics. - Communicating with the HMC. - Executing firmware updates. The SE runs continuously, even when the CPC's main processors are powered off; this allows remote diagnostics and recovery.</p>
      <p><strong>HMC Object Tree:</strong> The HMC displays systems in a hierarchical tree: - <strong>Servers (Frames):</strong> Each CPC or z/VM system appears as a server. - <strong>CPCs:</strong> Within a server, CPCs are listed. - <strong>LPARs:</strong> Within each CPC, logical partitions and their status (running, stopped, not started). - <strong>I/O Subsystems (I/O Adapters):</strong> Connected I/O devices grouped by type. Operators can right-click any object to view properties, activate/deactivate, or perform actions.</p>

      <h2>Channels &amp; I/O Architecture – Data Pathways</h2>
      <p><strong>z/OS I/O Model:</strong> Unlike distributed systems where devices connect directly to a computer bus, IBM mainframes use a sophisticated <strong>channel subsystem</strong> model. Channels are specialized processors dedicated to I/O; they manage data transfer between main storage and peripherals (disks, tapes, networks), freeing the CPU for computation.</p>
      <p><strong>Channel Types:</strong> - <strong>ESCON (Enterprise System Connection):</strong> Fiber-optic channels for legacy systems; being phased out. - <strong>FICON (Fibre Connection):</strong> Modern fiber-optic channels supporting high speeds (up to 32 Gbps). Used for disk (DASD) and tape connections. - <strong>Hipersockets:</strong> High-speed, low-latency virtual channels for inter-LPAR communication and network traffic (replacing older ESCON networks). - <strong>OSA-Express:</strong> Open Systems Adapter Cards providing Ethernet and TCP/IP connectivity to external networks. - <strong>HCA (Host Channel Adapter) / InfiniBand:</strong> High-speed fabric for Coupling Facility and future network connectivity.</p>
      <p><strong>CHPID (Channel Path Identifier):</strong> Each channel or I/O adapter is assigned a <strong>CHPID</strong> (a 2-digit hex identifier, e.g., 00–FF). z/OS uses CHPIDs to identify I/O paths. When defining a disk device in IOCP (I/O Configuration Program), you specify which CHPIDs connect to that device, providing redundancy (typically 2–4 paths per device).</p>
      <p><strong>I/O Path Definitions (IOCP):</strong> <strong>IOCP (Input/Output Configuration Program)</strong> is the low-level tool for defining the CPC's I/O subsystem: - Device definitions (disk drives, tape drives, adapters) - Channel (CHPID) groupings - MIF (Multiple Image Facility) settings for multi-LPAR configurations - PCHID (Physical Channel Identifier) and subchannel assignments - Redundancy and failover paths. IOCP definitions are stored in a dataset and loaded at CPC boot. Modern systems often use auto-sensing and firmware-driven configuration, reducing manual IOCP maintenance.</p>
      <p><strong>Device Access &amp; Multiplexing:</strong> Multiple LPARs cannot share a single I/O device; each device assignment is exclusive to one LPAR (or shared at the application layer via middleware). If DASD is to be accessed by multiple LPARs, those disks must reside on a SAN or networked storage with proper redundancy.</p>

      <h2>Sources &amp; References</h2>
      <div style="margin-top:20px; padding:20px; background-color:#e8f4f8; border-left:5px solid #0066cc; border-radius:4px; font-size:0.9em; line-height:1.8;">
        <ul style="margin: 0; padding-left: 20px; list-style-type:none;">
          <li>• <a href="https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.4.0/com.ibm.zos.v2r4.ieaa100/toc.htm" target="_blank" style="color:#0066cc; text-decoration:none;">IBM z/OS Concepts</a> (Publication SY28-1149)</li>
          <li>• <a href="https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.5.0/com.ibm.zos.v2r5.zarch.architecture/zarch_book.htm" target="_blank" style="color:#0066cc; text-decoration:none;">IBM System z Processor Architecture</a> (Publication SA22-7832)</li>
          <li>• <a href="https://www.ibm.com/support/knowledgecenter/en/SSGEUV_5.2.0/com.ibm.hmc.doc/hmc/hmc_intro.htm" target="_blank" style="color:#0066cc; text-decoration:none;">HMC System Administration &amp; User's Guide</a></li>
          <li>• <a href="https://www.ibm.com/support/knowledgecenter/en/SSGEUV_3.0.0/com.ibm.hmc.standalone.config.hmc_get_started.doc/hw_lcdef_config_lpar.htm" target="_blank" style="color:#0066cc; text-decoration:none;">LPAR Configuration &amp; Management Guide</a></li>
          <li>• <a href="https://www.ibm.com/support/knowledgecenter/SSLTBW_2.5.0/com.ibm.zos.v2r5.hlbpg/chpd1intro.htm" target="_blank" style="color:#0066cc; text-decoration:none;">z/OS I/O Configuration &amp; Channel Subsystem Reference</a></li>
          <li>• <a href="https://www.redbooks.ibm.com/redbooks/pdfs/sg246981.pdf" target="_blank" style="color:#0066cc; text-decoration:none;">IBM Redbook SG246981</a> — z/OS Systems Programming</li>
        </ul>
      </div>
    `,
    mcq: [
      { question: "What does LPAR stand for?", options: ["Logical Partition", "Linear Partition", "Loaded Program Area", "Local Processing Area"], answer: 0, explanation: "LPAR (Logical Partition) is a hardware-enforced division of a CPC into independent system images." },
      { question: "Which tool manages CPC and LPAR hardware from an operator console?", options: ["ISPF", "SDSF", "HMC", "JES2"], answer: 2, explanation: "The Hardware Management Console (HMC) is the primary interface for managing IBM Z hardware." },
      { question: "What is a CHPID?", options: ["A channel path identifier", "A CPU identifier", "A CICS transaction ID", "A RACF group name"], answer: 0, explanation: "CHPID (Channel Path Identifier) identifies a physical or logical I/O path between the CPC and I/O devices." },
      { question: "Which LPAR resources can be defined as dedicated or shared?", options: ["Memory only", "CPU and memory", "RACF profiles", "IP addresses"], answer: 1, explanation: "CPU engines and memory can both be dedicated to a single LPAR or shared across partitions." },
      { question: "What is the Support Element (SE)?", options: ["A network router for the mainframe", "An embedded hardware management controller for a single CPC", "A JES component", "A RACF audit facility"], answer: 1, explanation: "The SE is a dedicated service controller embedded with each CPC; the HMC aggregates multiple SEs." },
      { question: "What is the main advantage of dedicating CPUs to an LPAR?", options: ["Lower cost", "Guaranteed exclusive processor access; predictable performance", "Ability to share with other LPARs", "Simpler deactivation"], answer: 1, explanation: "Dedicated CPUs are not time-sliced; they belong exclusively to the LPAR, ensuring consistent performance without contention." },
      { question: "Which mainframe channel type uses fiber-optic connections and is the modern standard for DASD I/O?", options: ["ESCON", "FICON", "Hipersockets", "Token Ring"], answer: 1, explanation: "FICON (Fibre Connection) is the modern standard for CPC-to-storage connections, supporting speeds up to 32 Gbps." },
      { question: "How are I/O devices distributed among LPARs?", options: ["Dynamically shared by all LPARs", "Each device is assigned exclusively to one LPAR", "Controlled by RACF", "Determined by job class"], answer: 1, explanation: "I/O devices are exclusive; one device belongs to exactly one LPAR. Multi-LPAR access requires SAN or network-based storage." },
      { question: "What does IOCP (Input/Output Configuration Program) define?", options: ["Job class hierarchies", "CPC I/O subsystem structure, device definitions, channels, and redundancy paths", "z/OS memory layout", "RACF user groups"], answer: 1, explanation: "IOCP configuration specifies device definitions, channel assignments, and I/O path redundancy; it's loaded at CPC IPL." },
      { question: "What is the embedded Support Element (SE) responsible for?", options: ["Running z/OS applications", "Collecting hardware telemetry, managing CPC boot, and communicating with HMC", "Managing JES spool", "Executing operator commands"], answer: 1, explanation: "The SE continuously monitors hardware health and enables remote management even when CPC processors are powered off." },
      { question: "What is Hipersockets used for?", options: ["Connecting to external networks", "High-speed, low-latency communication between LPARs or to Coupling Facility", "Tape backup connections", "Legacy ESCON bridge"], answer: 1, explanation: "Hipersockets provide virtual high-speed channels for inter-LPAR communication and modern networking, replacing older dedicated networks." },
      { question: "Can memory be over-provisioned to LPARs in a CPC?", options: ["Yes, via dynamic memory adjustment", "No, each LPAR receives dedicated, non-over-provisioned memory", "Only in z/VM", "Memory can be shared via DASD paging"], answer: 1, explanation: "Unlike CPU cores, memory allocation to LPARs is exclusive and fixed; no over-provisioning. Each LPAR's allocation is disjoint from others." }
    ],
    practical: [
      { title: "Task 1 – Explore the HMC Object Tree and LPAR Properties", description: "Log in to the HMC web interface or desktop client. Navigate the Systems Management view and expand a CPC node to view its LPARs. Select an LPAR and inspect its Properties panel to review CPU allocation (dedicated vs. shared), memory size, and I/O device assignments.", hints: ["Hint 1: Access the HMC at its network address (ask your instructor for the IP or hostname).", "Hint 2: Log in with your HMC user ID and password.", "Hint 3: Click 'Systems Management' or 'Server' icon on the left navigation.", "Hint 4: In the tree pane, expand a CPC (typically named by serial number or location, e.g., 'Z14-001').", "Hint 5: Expand the CPC to see LPARs (e.g., 'PROD', 'DEV', 'TEST'). Right-click an LPAR and select 'Properties'."], solution: "Expected observations: (1) HMC object tree displays all accessible CPCs and their logical partitions. (2) LPAR Properties panel shows: - Name and LPAR number. - Processor configuration (# of shared or dedicated cores). - Memory allocation (in MB or GB). - I/O device list (DASD, tape, network adapters). - Boot device and IPL address. - LPAR status (Standby, Active, Not Activated). (3) Compare two LPARs: one may be production (multiple dedicated CPUs, large memory) and another dev (fewer, shared CPUs, smaller memory)." },
      { title: "Task 2 – Display LPAR and Channel Status via HMC Performance Dashboard", description: "Navigate to HMC Performance or Monitoring view. Select a running LPAR and observe real-time metrics: CPU utilization (%), memory usage, I/O rate (operations/sec), and channel data rate (MB/sec). Compare two LPARs to observe different workload patterns.", hints: ["Hint 1: In HMC, look for 'Performance', 'Monitoring', or 'Dashboard' section.", "Hint 2: Select or drill-down into a specific LPAR to see per-LPAR metrics.", "Hint 3: Graphs typically show historical data (last hour/day); toggle time ranges.", "Hint 4: Observe CPU % on dedicated vs. shared cores (shared may show utilization spikes if multiple LPARs contend).", "Hint 5: I/O rate and channel data rate indicate workload disk/network activity."], solution: "Expected observations: (1) CPU Utilization graph shows: - Dedicated core LPARs with steady utilization. - Shared core LPARs with variable utilization (other LPARs may be using shared cores). (2) Memory usage graph shows static line (memory is dedicated, not dynamic). (3) I/O rate graph shows transaction throughput (e.g., 100–1000 ops/sec). (4) Channel data rate graph shows network and disk traffic (in MB/sec). (5) Low-utilization LPAR (dev) vs. high-utilization (production) demonstrates workload diversity and the value of consolidation." },
      { title: "Task 3 – Review IOCP Configuration or I/O Device Assignments (Optional Advanced)", description: "Work with a system programmer to locate and review the active IOCP (Input/Output Configuration Program) member (typically in SYS1.PARMLIB or a UCF dataset). Alternatively, use HMC to navigate to I/O adapters and list their assigned CHPIDs and connected devices, or use operator command 'd chnl' to display channel status.", hints: ["Hint 1: If reviewing IOCP source, search for DEFINE IODEVICE, DEFINE CHNL, and DEFINE CHPID statements.", "Hint 2: Identify redundant paths: e.g., DASD 0100 connected to CHPIDs 00 and 01 for dual path (failover capability).", "Hint 3: In HMC, navigate to 'Hardware' or 'I/O Subsystems' to view physical I/O adapters, their types (FICON, OSA), and device counts.", "Hint 4: From operator console (SDSF LOG), issue 'D CHNL,PATH' to display current channel path status (up/down, pending)."], solution: "Expected observations: (1) IOCP review shows device definitions with assigned channels and redundancy. Example: 'DEVICE ADDRESS(0100–0101) IODEVTYPE(3390) connects to CHPIDs 00,01'. (2) Multiple paths per device provide fault tolerance: if CHPID 00 fails, I/O automatically switches to CHPID 01. (3) HMC I/O view displays hardware topology: adapter cards, their types, and connected device counts. (4) 'D CHNL' output shows each channel number and its status (up/down, work pending/idle). This demonstrates the I/O architecture's redundancy and manageability at the hardware level." }
    ]
  },

  //  Storage & Data Management (2 cards) 

  {
    id: "l1-dasd-datasets",
    level: 1,
    category: "Storage & Data Management",
    title: "DASD, Sequential & Partitioned Datasets",
    summary: "DASD structure (volumes, cylinders, tracks), sequential (PS) datasets, partitioned datasets (PDS/PDSE), generation data groups (GDG), and dataset allocation basics.",
    content: `
      <h2>DASD Fundamentals</h2>
      <p><strong>DASD (Direct Access Storage Device)</strong> is the umbrella term z/OS uses for any disk-like, randomly addressable storage. Historically DASD meant a physical spinning disk drive (e.g., the IBM 3380 and 3390 series), but on modern hardware DASD is presented by an enterprise storage subsystem (DS8000, EMC, Hitachi) that emulates the classic <strong>3390 geometry</strong> on top of high-performance flash or RAID disk arrays. Regardless of the back-end technology, z/OS continues to address DASD through the original count-key-data (<strong>CKD</strong>, more precisely <strong>ECKD</strong> — Extended Count Key Data) architecture, which gives applications a stable, addressable, randomly-seekable storage abstraction.</p>
      <p><strong>Physical and Logical Geometry:</strong> A DASD <strong>volume</strong> is the basic unit of allocation that z/OS sees. Each volume is identified by a six-character <strong>VOLSER</strong> (Volume Serial Number, e.g., <code>SYSRES</code>, <code>WORK01</code>, <code>USER02</code>). Inside the volume, storage is organised as a stack of <strong>cylinders</strong>; each cylinder contains a fixed number of <strong>tracks</strong> (15 tracks per cylinder on 3390 geometry); each track holds <strong>blocks</strong> (records) up to a track-capacity limit. A 3390 Mod-3 volume holds roughly 2.83 GB; modern Extended Address Volumes (EAV) can exceed 1 TB while still presenting cylinder/track addressing.</p>
      <p><strong>Volume Label and VTOC:</strong> The first record of cylinder 0, track 0 is the <strong>VOL1 label</strong> — it carries the VOLSER and a pointer to the <strong>VTOC (Volume Table of Contents)</strong>, an on-volume catalog of every dataset extent allocated on that volume. The VTOC is what allows DADSM (Direct Access Device Space Manager) to find free space and locate existing datasets. A dataset can occupy multiple non-contiguous <strong>extents</strong> on a volume (or even span multiple volumes), and each extent is recorded in the VTOC as a Format-1 DSCB.</p>
      <p><strong>How DASD is Reached:</strong> Each volume sits behind a <strong>FICON</strong> (or older ESCON) channel path, identified by a 4-digit hex <strong>device number</strong> (e.g., <code>0A80</code>). The path from program → access method (BSAM, QSAM, BPAM, VSAM) → I/O Supervisor (IOS) → channel subsystem → control unit → physical media is what makes a dataset open, read, or write actually happen. From the application's point of view, the device number and VOLSER are abstracted away behind a <strong>dataset name</strong>.</p>

      <h2>Dataset Naming Conventions</h2>
      <p>z/OS dataset names are dot-qualified, up to 44 characters, and follow a strict format:</p>
      <ul>
        <li>Up to 22 qualifiers, each 1–8 characters.</li>
        <li>Each qualifier starts with a letter or national character (<code>@ # $</code>), followed by letters, digits, hyphens, or national characters.</li>
        <li>The first qualifier is the <strong>HLQ (High-Level Qualifier)</strong> — typically a user ID or project code (e.g., <code>Z12345.JCL.CNTL</code>, <code>SYS1.PARMLIB</code>).</li>
        <li>The HLQ controls which user catalog the dataset is registered in (via catalog aliases) and is the anchor for RACF dataset profiles.</li>
      </ul>

      <h2>Sequential Datasets (PS)</h2>
      <p>A <strong>Sequential dataset</strong> (DSORG=<strong>PS</strong>, "Physical Sequential") is the simplest organisation: records are stored end-to-end in the order they were written and are read back in the same order. PS datasets are used for flat files, batch input/output, log files, sort work, FTP transfers, and as the default for <code>SYSOUT</code> data.</p>
      <p><strong>Record Formats (RECFM):</strong></p>
      <ul>
        <li><strong>F</strong> — Fixed-length, unblocked (one logical record per block).</li>
        <li><strong>FB</strong> — Fixed-length, Blocked (multiple logical records per physical block; the most common format, e.g., 80-byte source code).</li>
        <li><strong>V</strong> — Variable-length, unblocked (each record carries its own length in a 4-byte RDW).</li>
        <li><strong>VB</strong> — Variable-length, Blocked (block carries a BDW; each record a RDW).</li>
        <li><strong>U</strong> — Undefined-length (used mostly for load modules in classic PDS load libraries).</li>
        <li>Modifiers: <strong>A</strong> (ASA carriage control, used for printable SYSOUT), <strong>M</strong> (machine control), <strong>S</strong> (spanned records).</li>
      </ul>
      <p><strong>LRECL and BLKSIZE:</strong> <code>LRECL</code> is the logical record length in bytes; <code>BLKSIZE</code> is the physical block size written to DASD. For FB, BLKSIZE must be a multiple of LRECL. Setting <code>BLKSIZE=0</code> tells z/OS to choose a <strong>System-Determined Block Size (SDB)</strong> that maximises track utilisation — this is the modern best practice. Classic FB80 source code therefore typically allocates with <code>LRECL=80,BLKSIZE=0</code> and z/OS picks an efficient half-track block.</p>
      <p><strong>Allocation and Extents:</strong> The <code>SPACE=</code> parameter requests storage in tracks (TRK), cylinders (CYL), or blocks (AVGREC). It specifies a <strong>primary</strong> and optional <strong>secondary</strong> quantity — e.g., <code>SPACE=(CYL,(5,2))</code> requests 5 cylinders primary and up to 15 secondary extents of 2 cylinders each. Without SMS, a non-VSAM dataset is limited to 16 extents on one volume; SMS-managed datasets can grow to 123 extents per volume across up to 59 volumes. When the secondary quantity is exhausted, the program receives an <strong>x37 abend</strong> (B37, D37, E37 depending on cause).</p>

      <h2>Partitioned Datasets (PDS / PDSE)</h2>
      <p>A <strong>Partitioned Dataset</strong> (DSORG=<strong>PO</strong>) is a single dataset that contains many independently named <strong>members</strong>. It is the z/OS equivalent of a directory in Unix — except both the directory and all members live inside one allocation. PDS datasets are how z/OS organises source code (<code>USER.SOURCE(MEMBER1)</code>), JCL (<code>USER.JCL.CNTL(JOBA)</code>), procedures (<code>SYS1.PROCLIB</code>), parmlib members (<code>SYS1.PARMLIB</code>), load modules, and REXX execs.</p>
      <ul>
        <li><strong>PDS Directory</strong> — A fixed-size, pre-allocated set of 256-byte directory blocks at the front of the dataset. Each directory entry records a member name (1–8 chars), the relative TTR (track/record) where its data starts, and optional user data (e.g., ISPF stats, alias info). The directory is searched sequentially, so very large PDSs become slow.</li>
        <li><strong>Members</strong> — The actual data, stored as sequential records in the body of the dataset. Each member is, in effect, a mini-PS file accessed via the directory pointer (BPAM — Basic Partitioned Access Method).</li>
        <li><strong>Compress Required</strong> — When a PDS member is deleted or replaced, the old data is <em>not</em> reclaimed; only the directory pointer is updated. Free space accumulates as "gas" inside the dataset until you run <strong>IEBCOPY</strong> with no SELECT to compress it (rewriting members contiguously). Forgetting to compress eventually triggers <code>SE37</code> abends.</li>
        <li><strong>PDSE (Library)</strong> — DSORG=PO with the SMS-managed extended format. Directories are dynamic (no fixed size), space is reclaimed automatically (no compress needed), members can be much larger, and concurrent member updates are supported. PDSE is required for HFS-style program objects and is now the recommended default for new libraries (especially PROCLIBs and load libraries).</li>
        <li><strong>Common PDS uses</strong> — PROCLIB (catalogued procedures), PARMLIB (system parameters), CLIST/REXX execs (SYSPROC, SYSEXEC), LOADLIB (executable modules), PANELS / MSGS / SKELS (ISPF dialog libraries), CNTL (user JCL).</li>
      </ul>

      <h2>Generation Data Groups (GDG)</h2>
      <p>A <strong>Generation Data Group</strong> is a catalog mechanism for managing a rolling history of related sequential datasets under a single base name. Each instance is a separate physical dataset (a "generation data set" — GDS) but the catalog tracks them as numbered versions: <code>+1</code> creates the next generation, <code>0</code> refers to the most recent, <code>-1</code> to the previous one, etc.</p>
      <p><strong>Why use GDGs:</strong> Daily backups, end-of-day batch outputs, ETL pipelines where today's run consumes yesterday's output, audit trail files, and any process that wants "newest N copies, automatically retire the oldest" semantics without bespoke naming logic.</p>
      <p><strong>Lifecycle:</strong></p>
      <ul>
        <li><strong>Define the GDG base</strong> with IDCAMS: <code>DEFINE GDG (NAME(Z12345.PAYROLL.GDG) LIMIT(5) SCRATCH NOEMPTY)</code>. <code>LIMIT</code> is the maximum number of generations kept; <code>SCRATCH</code> deletes the dataset when rolled off (vs. <code>NOSCRATCH</code> which only uncatalogs); <code>NOEMPTY</code> rolls off only the oldest when limit is exceeded (vs. <code>EMPTY</code> which uncatalogs all when limit is hit).</li>
        <li><strong>Create generations</strong> by JCL: <code>//OUT DD DSN=Z12345.PAYROLL.GDG(+1),DISP=(NEW,CATLG,DELETE),SPACE=(CYL,(1,1)),DCB=(RECFM=FB,LRECL=80)</code>. The first <code>(+1)</code> in the job creates generation <code>G0001V00</code>; on subsequent jobs it advances to <code>G0002V00</code>, and so on.</li>
        <li><strong>Reference generations</strong> with <code>(0)</code>, <code>(-1)</code>, <code>(-2)</code> for read access (today's, yesterday's, the day before).</li>
        <li><strong>Rolloff</strong> — once the LIMIT is exceeded, the oldest generation is automatically uncatalogued (and physically deleted if SCRATCH was specified).</li>
      </ul>

      <h2>Dataset Allocation — DD Parameters</h2>
      <p>Whether you allocate from ISPF 3.2 (which fills in a panel) or directly in JCL, the same physical attributes are at play:</p>
      <ul>
        <li><strong>DSN=</strong> — dataset name (or <code>DSN=&amp;TEMP</code> for a job-scoped temporary).</li>
        <li><strong>DISP=</strong> — three sub-parameters: (status, normal-end, abnormal-end). Common patterns: <code>(NEW,CATLG,DELETE)</code>, <code>(SHR,KEEP,KEEP)</code>, <code>(MOD,CATLG,DELETE)</code>, <code>(OLD,DELETE,DELETE)</code>.</li>
        <li><strong>UNIT=</strong> — device class (<code>SYSDA</code>, <code>SYSALLDA</code>) or specific unit address. Often omitted under SMS.</li>
        <li><strong>VOL=SER=</strong> — request a specific VOLSER. Usually omitted; SMS picks a volume from the appropriate storage group.</li>
        <li><strong>SPACE=</strong> — (units,(primary,secondary,directory)) — directory is only for PDS (number of 256-byte directory blocks).</li>
        <li><strong>DCB=</strong> — RECFM, LRECL, BLKSIZE, DSORG. Modern allocations often only need RECFM and LRECL (BLKSIZE=0 lets z/OS choose).</li>
        <li><strong>DSNTYPE=</strong> — <code>LIBRARY</code> for a PDSE, <code>PDS</code> for a classic PDS, <code>BASIC</code> or <code>EXTREQ</code> for sequential variants.</li>
        <li><strong>STORCLAS / DATACLAS / MGMTCLAS</strong> — SMS construct names that drive volume selection, default DCB attributes, and lifecycle policy. When SMS is in use these usually replace explicit UNIT/VOL/SPACE.</li>
      </ul>

      <h2>Sources &amp; References</h2>
      <div style="margin-top:20px; padding:20px; background-color:#e8f4f8; border-left:5px solid #0066cc; border-radius:4px; font-size:0.9em; line-height:1.8;">
        <ul style="margin: 0; padding-left: 20px; list-style-type:none;">
          <li>• <a href="https://www.ibm.com/docs/en/zos/2.5.0?topic=zos-dfsms-using-data-sets" target="_blank" style="color:#0066cc; text-decoration:none;">IBM z/OS DFSMS — Using Data Sets</a> (Publication SC23-6855)</li>
          <li>• <a href="https://www.ibm.com/docs/en/zos/2.5.0?topic=zos-dfsmsdfp-utilities" target="_blank" style="color:#0066cc; text-decoration:none;">DFSMSdfp Utilities — IEBGENER, IEBCOPY, IEFBR14</a> (Publication SC23-6864)</li>
          <li>• <a href="https://www.ibm.com/docs/en/zos/2.5.0?topic=commands-idcams" target="_blank" style="color:#0066cc; text-decoration:none;">DFSMS Access Method Services (IDCAMS) Reference</a> (Publication SC23-6846)</li>
          <li>• <a href="https://www.ibm.com/docs/en/zos/2.5.0?topic=zos-mvs-jcl-reference" target="_blank" style="color:#0066cc; text-decoration:none;">MVS JCL Reference</a> (Publication SA23-1385) — DD, SPACE, DCB, DISP parameters</li>
          <li>• <a href="https://www.ibm.com/docs/en/zos/2.5.0?topic=zos-ispf-users-guide-volume-i" target="_blank" style="color:#0066cc; text-decoration:none;">ISPF User's Guide Vol. I</a> — Option 3.2 Allocate New Data Set</li>
          <li>• <a href="https://www.redbooks.ibm.com/abstracts/sg246105.html" target="_blank" style="color:#0066cc; text-decoration:none;">IBM Redbook SG24-6105</a> — z/OS DFSMS PDSE Usage Guide</li>
          <li>• <a href="https://www.ibm.com/docs/en/zos/2.5.0?topic=sets-generation-data-groups" target="_blank" style="color:#0066cc; text-decoration:none;">DFSMS — Generation Data Groups</a></li>
        </ul>
      </div>
    `,
    mcq: [
      { question: "What is a DASD volume label used for?", options: ["Storing RACF profiles", "Identifying and describing the volume to the operating system", "Defining network routes", "Controlling which LPARs can access the volume"], answer: 1, explanation: "The VOL1 label at the start of a DASD volume provides the volume serial (VOLSER) and a pointer to the VTOC, identifying the volume to z/OS." },
      { question: "What dataset organisation supports named members within a single file?", options: ["PS (Sequential)", "PDS/PDSE", "VSAM ESDS", "GDG base"], answer: 1, explanation: "Partitioned Datasets (PDS/PDSE, DSORG=PO) contain individually named, separately accessible members under a single dataset name." },
      { question: "What is a GDG (Generation Data Group)?", options: ["A VSAM cluster type", "A set of sequentially versioned datasets managed under a single base name", "A type of DASD volume", "A JES spool dataset"], answer: 1, explanation: "A GDG groups related dataset generations under one base name; each generation gets an ascending version number such as G0001V00." },
      { question: "What does the DISP=(NEW,CATLG,DELETE) parameter mean?", options: ["Create dataset; if job step succeeds catalog it; if step fails delete it", "Open existing; catalog always; never delete", "Rename dataset; keep if success; keep if failure", "Create dataset; always delete after job"], answer: 0, explanation: "The three sub-parameters of DISP are: initial status (NEW = allocate), normal end (CATLG = catalog), and abnormal end (DELETE = remove)." },
      { question: "What is the main advantage of PDSE over classic PDS?", options: ["Supports larger block sizes", "Reclaims space automatically — no manual IEBCOPY compress needed after deletes", "Is not affected by RACF", "Stores only load modules"], answer: 1, explanation: "PDSE directories are dynamic and space is reclaimed automatically when members are deleted or replaced; classic PDS must be compressed manually with IEBCOPY." },
      { question: "On a 3390 DASD volume, how many tracks are in one cylinder?", options: ["8", "12", "15", "30"], answer: 2, explanation: "The classic 3390 geometry (still emulated by modern storage) has 15 tracks per cylinder." },
      { question: "What does setting BLKSIZE=0 in a DD statement do?", options: ["Allocates an empty dataset", "Asks z/OS to choose a System-Determined Block Size that maximises track utilisation", "Disables blocking entirely", "Forces a 4 KB block"], answer: 1, explanation: "BLKSIZE=0 invokes System-Determined Block Size (SDB), where z/OS picks an efficient block size based on the device geometry and LRECL." },
      { question: "Which abend code typically indicates that a dataset has run out of secondary extents on DASD?", options: ["S0C7", "S806", "Sx37 (B37/D37/E37)", "S322"], answer: 2, explanation: "x37 abends (B37 = no more space on volume, D37 = no secondary specified, E37 = max extents reached) all signal exhausted DASD allocation." },
      { question: "What is the SCRATCH option in a GDG base definition?", options: ["Erases the catalog every night", "Physically deletes a generation dataset (not just uncatalog) when it rolls off", "Leaves space for scratch tape", "Disables the LIMIT parameter"], answer: 1, explanation: "SCRATCH causes rolled-off generations to be physically deleted from DASD; NOSCRATCH only uncatalogs them, leaving the data on the volume." },
      { question: "Which RECFM is most commonly used for 80-column source code and JCL?", options: ["U", "FB", "VB", "VBS"], answer: 1, explanation: "Fixed-length Blocked (FB) with LRECL=80 is the standard format for source, JCL, and most parmlib members." }
    ],
    practical: [
      {
        title: "Task 1 — Allocate a Sequential Dataset (FB,80) via ISPF 3.2",
        description: "Log on to TSO, navigate to ISPF option 3.2 (Data Set Utility), and allocate a new sequential (PS) dataset called <yourID>.TEST.SEQ with RECFM=FB, LRECL=80, BLKSIZE=0. Then use ISPF Edit (option 2) to write a couple of lines into it and save.",
        hints: [
          "Hint 1: From the ISPF Primary Menu type =3.2 (or 3 then 2) to jump straight to Data Set Utility.",
          "Hint 2: On the 3.2 panel, leave the Project blank and enter the dataset name in the 'Other Partitioned or Sequential Data Set Name' field as 'yourID.TEST.SEQ' (in quotes if you don't want your TSO prefix prepended).",
          "Hint 3: Type 'A' (Allocate) on the option line and press Enter.",
          "Hint 4: On the Allocate panel set: Space units = TRKS, Primary quantity = 5, Secondary quantity = 2, Directory blocks = 0 (PS has no directory), Record format = FB, Record length = 80, Block size = 0, Data set name type = leave blank.",
          "Hint 5: Press Enter; you should see 'Data set allocated' at the top right.",
          "Hint 6: Now press F3 to go back, type =2 to go to Edit, enter the same DSN, press Enter. Type a few lines, press F3 to save."
        ],
        solution: "Expected outcome: ISPF reports 'Data set allocated' after the 3.2 Allocate request. A subsequent ISPF 3.4 with mask 'yourID.TEST.*' lists the new entry. Selecting it shows: Org=PS, RecFm=FB, LRecl=80, BlkSz=27920 (or similar SDB-chosen value). After Edit + F3, browsing the dataset shows the lines you typed. Common pitfalls: (a) forgetting the quotes around the DSN — ISPF will then prefix your TSO ID, so 'TEST.SEQ' becomes 'yourID.TEST.SEQ' anyway, but the quotes habit avoids surprises with longer HLQs; (b) leaving Directory blocks > 0 — on a PS that's harmless but on a PDS request, 0 produces an allocation error; (c) hitting an x37 abend if your TSO ID's storage class has very tight quota — reduce primary size and retry."
      },
      {
        title: "Task 2 — Allocate a PDS Library and Add Members via ISPF",
        description: "Use ISPF 3.2 to allocate a PDS called <yourID>.TEST.CNTL with directory space, then use Edit (option 2) to create two members (e.g., MEMBER1 and MEMBER2) and finally use 3.4 to confirm both members are present.",
        hints: [
          "Hint 1: In ISPF 3.2 Allocate panel, this time set Directory blocks = 10 — that's what makes the dataset a PDS instead of PS.",
          "Hint 2: Set Data set name type = 'LIBRARY' if you want a PDSE (recommended for new libraries) or leave blank for classic PDS.",
          "Hint 3: To create a member, in ISPF 2 (Edit) enter the dataset name with the member in parentheses, e.g., 'yourID.TEST.CNTL(MEMBER1)'. ISPF will say 'Member does not exist — creating' on save.",
          "Hint 4: Repeat for MEMBER2.",
          "Hint 5: Use ISPF 3.4 with mask 'yourID.TEST.*'. Place an 'M' (Member list) line command next to the PDS to see both members listed."
        ],
        solution: "Expected outcome: 3.4 shows yourID.TEST.CNTL with Org=PO (or PO-E for PDSE) and a non-zero member count. The member list (M command) shows MEMBER1 and MEMBER2 with their ISPF stats (size, init, mod, version, user). If you allocated a PDSE (DSNTYPE=LIBRARY), deleting and re-creating members will not require a compress — confirm this by deleting MEMBER1 (D line command in member list) and immediately allocating space-equivalent member; on a classic PDS the freed space stays as 'gas' until you run IEBCOPY. Common pitfalls: (a) forgetting Directory blocks > 0 — produces a PS, and ISPF Edit with member-name syntax then errors; (b) too few directory blocks (e.g., 1) — fills up after just a handful of members and gives 'Directory full' on save."
      },
      {
        title: "Task 3 — Allocate a Sequential Dataset via JCL using IEFBR14",
        description: "Write and submit a JCL job that uses the IEFBR14 utility (a no-op program) to allocate a new FB,80 sequential dataset purely through DD statement directives. This is the JCL-driven equivalent of Task 1 and is the standard pattern when you need to script allocations or include them in a deployment job.",
        hints: [
          "Hint 1: IEFBR14 simply branches to register 14 and exits with RC=0 — it does no work, but JCL still processes its DD statements, which is what allocates (or deletes) the dataset.",
          "Hint 2: Edit a member of yourID.TEST.CNTL (created in Task 2) called ALLOC and paste the JCL below. Submit with the SUB command on the ISPF Edit command line.",
          "Hint 3: Check the result in SDSF (=SD.ST), then run an ISPF 3.4 listing with mask 'yourID.TEST.*' to confirm the new dataset is catalogued.",
          "Hint 4: Once you've confirmed it exists, you can delete it from JCL by running the same job again with DISP=(OLD,DELETE,DELETE) — IEFBR14 is just as happy deleting as creating."
        ],
        solution: "<strong>Working JCL:</strong><pre style=\"background:#0d0d0d;color:#ffb000;padding:1rem;border-radius:4px;overflow-x:auto;font-family:'Share Tech Mono',monospace;font-size:.88rem;line-height:1.45;margin:.6rem 0;\">//ALLOCDS  JOB (ACCT),'ALLOC FB80',CLASS=A,MSGCLASS=H,NOTIFY=&amp;SYSUID\n//STEP1    EXEC PGM=IEFBR14\n//NEWDS    DD  DSN=&amp;SYSUID..TEST.JCL.SEQ,\n//             DISP=(NEW,CATLG,DELETE),\n//             SPACE=(TRK,(5,2)),\n//             DCB=(RECFM=FB,LRECL=80,BLKSIZE=0),\n//             UNIT=SYSDA</pre><strong>Expected results in SDSF:</strong> STEP1 returns RC=0000 (IEFBR14 always does, provided JCL is syntactically valid and the allocation succeeds). The JESYSMSG output contains an IEF285I line confirming yourID.TEST.JCL.SEQ was kept and catalogued, plus an IGD101I from SMS if SMS-managed. ISPF 3.4 then shows the dataset with the requested attributes.<br><br><strong>Variations:</strong> (a) to allocate a PDS instead, add SPACE=(TRK,(5,2,10)) — the third sub-parameter is directory blocks — and DSNTYPE=LIBRARY for PDSE; (b) to delete the dataset, change DISP to (OLD,DELETE,DELETE) and resubmit; (c) to fail on purpose for learning, set SPACE to (TRK,(99999,1)) — you'll get an x37 / IGD17103I 'insufficient space' error instead of a clean allocation.<br><br>Note how this JCL is functionally identical to the ISPF 3.2 panel in Task 1 but is repeatable, version-controllable, and embeddable in larger pipelines — which is why JCL-based allocation is the standard for production."
      },
      {
        title: "Task 4 — Define a GDG Base and Roll Through Generations",
        description: "Use IDCAMS to define a Generation Data Group base with a limit of 5 generations, then submit a job that creates two generations (+1 and +2) of a sequential dataset under that base. Finally, list the GDG with IDCAMS LISTCAT to verify the catalog state and rolloff behaviour.",
        hints: [
          "Hint 1: IDCAMS is invoked via PGM=IDCAMS with the control statements supplied on SYSIN.",
          "Hint 2: For the DEFINE GDG step the control statement is: DEFINE GDG (NAME(yourID.PAYROLL.GDG) LIMIT(5) NOEMPTY SCRATCH).",
          "Hint 3: To create a generation, reference it as DSN=yourID.PAYROLL.GDG(+1) on a DD with DISP=(NEW,CATLG,DELETE). Within a single job, every (+1) reference resolves to the same new generation; on the next job submission, (+1) advances to the next number.",
          "Hint 4: Use LISTCAT ENTRIES(yourID.PAYROLL.GDG) ALL to see the base entry, the generation list, and current LIMIT/SCRATCH settings."
        ],
        solution: "<strong>Working JCL (two steps — define + populate):</strong><pre style=\"background:#0d0d0d;color:#ffb000;padding:1rem;border-radius:4px;overflow-x:auto;font-family:'Share Tech Mono',monospace;font-size:.88rem;line-height:1.45;margin:.6rem 0;\">//DEFGDG   JOB (ACCT),'DEFINE GDG',CLASS=A,MSGCLASS=H,NOTIFY=&amp;SYSUID\n//STEP1    EXEC PGM=IDCAMS\n//SYSPRINT DD  SYSOUT=*\n//SYSIN    DD  *\n  DEFINE GDG (NAME(&amp;SYSUID..PAYROLL.GDG) -\n              LIMIT(5)                    -\n              NOEMPTY                     -\n              SCRATCH)\n/*\n//STEP2    EXEC PGM=IEFBR14\n//GEN1     DD  DSN=&amp;SYSUID..PAYROLL.GDG(+1),\n//             DISP=(NEW,CATLG,DELETE),\n//             SPACE=(TRK,(1,1)),\n//             DCB=(RECFM=FB,LRECL=80,BLKSIZE=0),\n//             UNIT=SYSDA\n//GEN2     DD  DSN=&amp;SYSUID..PAYROLL.GDG(+2),\n//             DISP=(NEW,CATLG,DELETE),\n//             SPACE=(TRK,(1,1)),\n//             DCB=(RECFM=FB,LRECL=80,BLKSIZE=0),\n//             UNIT=SYSDA\n//STEP3    EXEC PGM=IDCAMS\n//SYSPRINT DD  SYSOUT=*\n//SYSIN    DD  *\n  LISTCAT ENTRIES(&amp;SYSUID..PAYROLL.GDG) ALL\n/*</pre><strong>Expected results:</strong> STEP1 returns RC=0 with IDCAMS message 'IDC0181I — DEFINE successful'. STEP2 returns RC=0 and creates two physical datasets: yourID.PAYROLL.GDG.G0001V00 and yourID.PAYROLL.GDG.G0002V00. STEP3's LISTCAT output shows: a GDG BASE entry with LIMIT=5, NOEMPTY, SCRATCH; below it two NONVSAM GDS entries listed in generation order. If you re-submit the same job a few more times you'll exceed the limit on the 6th run, and you'll see the oldest generation roll off (G0001V00 will disappear from the catalog and — because SCRATCH was specified — be physically deleted from DASD).<br><br><strong>Common pitfalls:</strong> (a) using (+1) and (+1) again in the same job for two different DDs creates the SAME generation, not two — to get two generations in one job either use (+1) and (+2), or split into separate jobs; (b) NOEMPTY vs EMPTY confusion — NOEMPTY (the default mental model) rolls off only the oldest when limit is hit; EMPTY uncatalogs ALL generations when limit is hit, which is rarely what you want."
      }
    ]
  },

  {
    id: "l1-vsam-catalogs",
    level: 1,
    category: "Storage & Data Management",
    title: "VSAM, ICF Catalog & VTOC",
    summary: "VSAM dataset types (KSDS, ESDS, RRDS, LDS), the ICF catalog hierarchy, VTOC structure on DASD volumes, and tape management with RMM.",
    content: `
      <h2>VSAM</h2>
      <p><strong>VSAM (Virtual Storage Access Method)</strong> is z/OS's high-performance, structured-record access method. Where sequential and partitioned datasets store flat byte streams, VSAM organises data into <strong>logical records</strong> stored inside <strong>Control Intervals (CIs)</strong>, which are themselves grouped into <strong>Control Areas (CAs)</strong>. This two-level structure lets VSAM perform random key-based lookups, range reads, mass insertions, and concurrent updates — the workload patterns required by mission-critical OLTP systems such as CICS files, Db2 catalog tables (under the covers), IMS data, and the ICF catalog itself.</p>
      <p><strong>Building Blocks:</strong> A VSAM <strong>cluster</strong> is the catalog-level object you allocate; it is composed of one or two <strong>components</strong> on disk: a <strong>data component</strong> (the records themselves) and, for KSDS only, an <strong>index component</strong> (a B-tree that maps key ranges to CI locations). Each component is physically stored as a Linear-style dataset on DASD, but the records inside follow VSAM's CI/CA layout. <strong>Free space</strong> can be reserved at allocation time (FREESPACE(ci% ca%)) to absorb future inserts without immediate CI/CA splits — splits are expensive operations where a full CI is split in two and the index updated.</p>

      <h2>VSAM Dataset Types</h2>
      <ul>
        <li><strong>KSDS (Key-Sequenced Dataset)</strong> — Records are stored in key order and reachable directly by key via the index component. Supports random read by key, sequential read by key range, insert, update, delete, and rename of records. The most common VSAM type and the foundation for almost every CICS file and the ICF catalog itself.</li>
        <li><strong>ESDS (Entry-Sequenced Dataset)</strong> — Records are stored in arrival order; addressed by RBA (Relative Byte Address). New records can only be appended; existing records can be updated in place but not deleted. Used for journals, audit logs, and as the underlying organisation for some legacy CICS files. ESDS has no index component.</li>
        <li><strong>RRDS (Relative Record Dataset)</strong> — Fixed-length slots accessed by RRN (Relative Record Number, 1..N). Supports random and sequential access by RRN. Empty slots are allowed (sparse). Useful where the record number itself is meaningful (e.g., terminal IDs).</li>
        <li><strong>LDS (Linear Dataset)</strong> — A byte-addressable stream (4 KB control intervals, no embedded record metadata). VSAM provides only the container; the application defines the structure on top. LDS is what z/OS uses for <strong>zFS filesystems</strong>, <strong>Db2 tablespaces and indexes</strong>, and <strong>HFS</strong> backing storage.</li>
      </ul>

      <h2>IDCAMS — Access Method Services</h2>
      <p><strong>IDCAMS</strong> (invoked as PGM=IDCAMS) is the universal utility for VSAM and catalog operations. It reads control statements from SYSIN and writes results to SYSPRINT. The most common verbs:</p>
      <ul>
        <li><strong>DEFINE CLUSTER</strong> — allocate a new VSAM cluster. Specifies organisation (INDEXED for KSDS, NONINDEXED for ESDS, NUMBERED for RRDS, LINEAR for LDS), record sizes, key location and length (KSDS only), space allocation, free-space percentages, share options, and the catalog to register it in.</li>
        <li><strong>DEFINE GDG / DEFINE ALIAS / DEFINE USERCATALOG</strong> — define non-cluster catalog objects.</li>
        <li><strong>LISTCAT</strong> — display catalog entries. <code>LISTCAT ENTRIES(name) ALL</code> shows full attributes; <code>LISTCAT LEVEL(hlq)</code> lists everything under a high-level qualifier.</li>
        <li><strong>DELETE</strong> — remove a cluster, GDG, alias, or non-VSAM dataset. Options include CLUSTER, GDG FORCE, NOSCRATCH, and PURGE (override expiration date).</li>
        <li><strong>ALTER</strong> — change attributes of an existing object: rename, change SHAREOPTIONS, adjust FREESPACE, modify expiration.</li>
        <li><strong>REPRO</strong> — copy records between datasets. Works VSAM↔VSAM, sequential↔VSAM, sequential↔sequential. Used for VSAM backup/restore, migration, and reload after REORG.</li>
        <li><strong>PRINT</strong> — dump dataset contents in HEX, CHAR, or DUMP format for inspection.</li>
        <li><strong>VERIFY</strong> — fix the high-used RBA after an abnormal close (when a CICS region or batch job ends abnormally and the dataset's catalog "high-used" pointer is stale).</li>
      </ul>

      <h2>ICF Catalog Hierarchy</h2>
      <p><strong>ICF (Integrated Catalog Facility)</strong> is the catalog architecture used on every modern z/OS system. It replaces the older OS/CVOL and VSAM catalog schemes and is itself implemented as a pair of VSAM datasets: a <strong>BCS (Basic Catalog Structure)</strong> KSDS that holds the catalog entries, and a <strong>VVDS (VSAM Volume Data Set)</strong> on each volume that records VSAM-specific physical attributes for clusters living on that volume.</p>
      <p><strong>Two-Tier Hierarchy:</strong></p>
      <ul>
        <li><strong>Master Catalog</strong> — One per system (or sysplex). It does <em>not</em> hold most user datasets; instead it holds <strong>aliases</strong> that point to the right user catalog for each high-level qualifier, plus a small set of system datasets (SYS1.*, system PROCLIBs, the catalog of catalogs). The master catalog is identified to z/OS via <code>SYSCATxx</code> in <code>LOADxx</code> at IPL time.</li>
        <li><strong>User Catalogs</strong> — One per business area or HLQ family. Each user catalog stores the actual dataset entries for the HLQs aliased to it. Splitting work across user catalogs improves availability (one corrupt user catalog does not take down the whole system) and isolates RACF responsibilities.</li>
      </ul>
      <p><strong>Resolution Path</strong> for a dataset open: (1) z/OS extracts the HLQ from the dataset name. (2) It searches the master catalog for an <strong>ALIAS</strong> matching the HLQ. (3) The alias points to the user catalog that owns that HLQ. (4) The user catalog returns the dataset's volume(s) and, for VSAM, the VVDS pointer. (5) The VTOC on the volume is read to find the actual extent locations. (6) The data set is opened. Aliases are created with <code>DEFINE ALIAS (NAME(HLQ) RELATE(usercatalog))</code>.</p>

      <h2>VTOC — Volume Table of Contents</h2>
      <p>Each DASD volume has a <strong>VTOC</strong>, a reserved area (typically near cylinder 0) that catalogs every dataset extent physically present on that volume. The VTOC is a flat list of <strong>DSCBs (Data Set Control Blocks)</strong>:</p>
      <ul>
        <li><strong>Format-1 DSCB</strong> — One per non-VSAM dataset. Contains DSN, DCB attributes, creation date, expiration date, and up to 3 extent pointers.</li>
        <li><strong>Format-3 DSCB</strong> — Extension for datasets with more than 3 extents (chained from the Format-1).</li>
        <li><strong>Format-4 DSCB</strong> — VTOC self-description: VTOC location, size, and the volume's free-space map.</li>
        <li><strong>Format-5 / Format-7 DSCB</strong> — Free-space inventory (Format-7 is the modern replacement on Indexed VTOCs).</li>
        <li><strong>Format-8/9 DSCB</strong> — VSAM dataset references; the actual VSAM attributes live in the VVDS.</li>
      </ul>
      <p><strong>Indexed VTOC (VTOCIX)</strong> — Modern volumes use an <em>indexed</em> VTOC: a separate index dataset (also on the volume) provides fast B-tree lookups of DSN-to-DSCB, eliminating the linear scan of older VTOCs. ISPF 3.4 with <code>VTOC</code> command, the IEHLIST utility, or DFSMS commands display VTOC contents.</p>
      <p><strong>VTOC vs Catalog — The Crucial Difference:</strong> The VTOC knows what is <em>physically present on this volume</em>; the catalog knows where datasets are <em>logically located by name</em>. A dataset can be uncatalogued (gone from the catalog) but still present on the volume (orphan in the VTOC), or catalogued but with the underlying data missing (dangling pointer). DFSMS commands like <code>DCOLLECT</code> and <code>VERIFY</code> reconcile the two views.</p>

      <h2>Tape &amp; RMM (Removable Media Manager)</h2>
      <p><strong>Tape</strong> remains a major medium on z/OS for backups, archives, regulatory retention, and bulk data exchange. Modern shops use <strong>Virtual Tape Servers (VTS)</strong> — large disk caches that emulate tape drives and write to physical tape in the background — but to z/OS it still looks like classic tape (3490, 3590, 3592 device types). A tape volume is identified by a <strong>VOLSER</strong> (typically 6 characters); a tape can hold one dataset (single-file) or many (multi-file).</p>
      <p><strong>DFSMSrmm</strong> is the IBM-supplied tape management system. It maintains a control dataset (CDS) that tracks every tape volume in the library:</p>
      <ul>
        <li><strong>Volume status</strong> — SCRATCH (available for new use), MASTER (in use, holding active data), USER (assigned but not yet written), ENTRY/RELEASE (in transit between library and offsite vault).</li>
        <li><strong>Owner / dataset</strong> — which user or job owns the volume and what dataset(s) it contains.</li>
        <li><strong>Retention policies</strong> — expiry date, retention period, retention by cycles or days; expired volumes are automatically returned to scratch.</li>
        <li><strong>Location</strong> — current home (in-library, vault location code, in-transit).</li>
        <li><strong>Vital Record specifications</strong> — VRSEL rules drive automated movement to/from offsite vaults for disaster recovery.</li>
      </ul>
      <p>RMM commands include <code>RMM LISTVOLUME volser</code>, <code>RMM CHANGEVOLUME volser STATUS(SCRATCH)</code>, and the daily housekeeping job <code>EDGHSKP</code> which runs expiration processing and produces movement reports.</p>

      <h2>Sources &amp; References</h2>
      <div style="margin-top:20px; padding:20px; background-color:#e8f4f8; border-left:5px solid #0066cc; border-radius:4px; font-size:0.9em; line-height:1.8;">
        <ul style="margin: 0; padding-left: 20px; list-style-type:none;">
          <li>• <a href="https://www.ibm.com/docs/en/zos/2.5.0?topic=zos-dfsms-using-data-sets" target="_blank" style="color:#0066cc; text-decoration:none;">IBM z/OS DFSMS — Using Data Sets</a> (Publication SC23-6855) — VSAM cluster organisation</li>
          <li>• <a href="https://www.ibm.com/docs/en/zos/2.5.0?topic=commands-idcams" target="_blank" style="color:#0066cc; text-decoration:none;">DFSMS Access Method Services for Catalogs</a> (Publication SC23-6846)</li>
          <li>• <a href="https://www.ibm.com/docs/en/zos/2.5.0?topic=zos-dfsms-managing-catalogs" target="_blank" style="color:#0066cc; text-decoration:none;">DFSMS Managing Catalogs</a> (Publication SC23-6853) — master vs user catalogs, aliases</li>
          <li>• <a href="https://www.ibm.com/docs/en/zos/2.5.0?topic=zos-dfsmsdfp-advanced-services" target="_blank" style="color:#0066cc; text-decoration:none;">DFSMSdfp Advanced Services</a> — VTOC, VVDS, DSCB formats</li>
          <li>• <a href="https://www.ibm.com/docs/en/zos/2.5.0?topic=zos-dfsmsrmm-implementation-customization" target="_blank" style="color:#0066cc; text-decoration:none;">DFSMSrmm Implementation &amp; Customization Guide</a> (Publication SC23-6874)</li>
          <li>• <a href="https://www.redbooks.ibm.com/abstracts/sg248044.html" target="_blank" style="color:#0066cc; text-decoration:none;">IBM Redbook SG24-8044</a> — VSAM Demystified</li>
          <li>• <a href="https://www.redbooks.ibm.com/abstracts/sg247484.html" target="_blank" style="color:#0066cc; text-decoration:none;">IBM Redbook SG24-7484</a> — DFSMS Catalog Performance</li>
        </ul>
      </div>
    `,
    mcq: [
      { question: "Which VSAM type organises records by a key field and maintains them in key order?", options: ["ESDS", "RRDS", "KSDS", "LDS"], answer: 2, explanation: "KSDS (Key-Sequenced Dataset) stores records in key order and provides direct access by key via its index component." },
      { question: "What IDCAMS command lists the attributes of a catalogued dataset?", options: ["DEFINE CLUSTER", "LISTCAT", "ALTER", "REPRO"], answer: 1, explanation: "LISTCAT displays catalog entries including attributes, volumes, and space statistics for VSAM and non-VSAM datasets." },
      { question: "What does the VTOC contain?", options: ["RACF user profiles", "An inventory of all dataset extents on a DASD volume", "JES job logs", "TCP/IP routing tables"], answer: 1, explanation: "The VTOC (Volume Table of Contents) is a reserved area on each DASD volume that records all dataset extents allocated there in DSCBs." },
      { question: "What is a catalog alias used for?", options: ["Defining a VSAM alternate index", "Pointing a high-level qualifier to a specific user catalog", "Renaming a dataset", "Assigning RACF protection to a catalog"], answer: 1, explanation: "An alias maps an HLQ to a user catalog so that z/OS knows which catalog to search when a dataset with that HLQ needs to be located." },
      { question: "What does RMM track in tape management?", options: ["Open TCP connections", "Tape volume location, status, owner, and retention date", "RACF certificate expiry", "SMF record offsets"], answer: 1, explanation: "DFSMSrmm maintains a database of tape volumes: their location, scratch status, ownership, and data-set retention information." },
      { question: "Which two physical components make up a VSAM KSDS cluster?", options: ["Data component and index component", "Header and trailer", "Master and slave", "Primary and secondary extents only"], answer: 0, explanation: "A KSDS has a data component (the records) and an index component (a B-tree mapping keys to CI locations). Other VSAM types have only a data component." },
      { question: "What VSAM organisation underlies a zFS filesystem and Db2 tablespaces?", options: ["KSDS", "ESDS", "RRDS", "LDS (Linear)"], answer: 3, explanation: "Linear Datasets (LDS) provide a flat byte-addressable container; zFS, Db2 tablespaces, and HFS all build their internal structures on top of LDS." },
      { question: "Where do VSAM-specific physical attributes live for a cluster on a given volume?", options: ["The VTOC Format-1 DSCB", "The VVDS (VSAM Volume Data Set) on that volume", "The master catalog only", "RACF database"], answer: 1, explanation: "ICF splits VSAM metadata: the BCS holds the logical catalog entry; the VVDS on each volume holds physical attributes (extents, high-used RBA) for VSAM clusters living there." },
      { question: "What IDCAMS verb copies records from one dataset to another (VSAM or sequential)?", options: ["DEFINE", "LISTCAT", "REPRO", "ALTER"], answer: 2, explanation: "REPRO copies records between datasets; it is the standard tool for VSAM backup, restore after REORG, and VSAM-to-sequential extract." },
      { question: "What does FREESPACE(20 10) on a KSDS DEFINE specify?", options: ["20 free CIs and 10 free CAs", "20% of each Control Interval and 10% of each Control Area kept empty for inserts", "20 KB primary and 10 KB secondary free space", "Free 20 tracks now and 10 later"], answer: 1, explanation: "FREESPACE percentages reserve room inside each CI and each CA so future inserts don't immediately trigger CI/CA splits, which are expensive operations." },
      { question: "What is the purpose of IDCAMS VERIFY against a VSAM cluster?", options: ["Check RACF permissions", "Reconcile the catalog's high-used RBA after an abnormal close", "Validate the cluster against an alternate index", "Verify backup tapes"], answer: 1, explanation: "VERIFY corrects the high-used RBA in the catalog after a CICS region or batch job ends abnormally, restoring consistency between the catalog pointer and the actual data." },
      { question: "What is the relationship between the VTOC and the catalog?", options: ["They store identical information", "VTOC tracks what is physically on a volume; catalog tracks where datasets are logically by name", "Catalog replaces the VTOC on modern z/OS", "VTOC is only used for tape"], answer: 1, explanation: "The VTOC is per-volume and inventories the physical extents present; the catalog is system-wide and maps dataset names to volumes. Both must agree, and DFSMS reconciliation utilities exist to detect mismatches." }
    ],
    practical: [
      {
        title: "Task 1 — Define a VSAM KSDS with IDCAMS",
        description: "Write an IDCAMS DEFINE CLUSTER job that creates a KSDS suitable for a small employee file: 80-byte records with a 6-byte key starting at offset 0. Allocate it for 100 records primary and 50 records secondary. After creation, run LISTCAT ALL on the new cluster and inspect the output.",
        hints: [
          "Hint 1: The DEFINE CLUSTER syntax has three sub-blocks: cluster-level attributes, DATA component attributes, and INDEX component attributes — DATA(...) and INDEX(...) are optional but recommended for fine control.",
          "Hint 2: For a KSDS, specify INDEXED, KEYS(length offset), and RECORDSIZE(avg max).",
          "Hint 3: Use RECORDS(primary secondary) for record-based allocation, or CYLINDERS / TRACKS for space-based.",
          "Hint 4: SHAREOPTIONS(2 3) is a common starting choice — single writer plus multiple readers within a region, full sharing across systems.",
          "Hint 5: After the DEFINE step, add a second IDCAMS step with LISTCAT ENTRIES(your.cluster) ALL to dump the catalog entry."
        ],
        solution: "<strong>Working JCL:</strong><pre style=\"background:#0d0d0d;color:#ffb000;padding:1rem;border-radius:4px;overflow-x:auto;font-family:'Share Tech Mono',monospace;font-size:.88rem;line-height:1.45;margin:.6rem 0;\">//DEFKSDS  JOB (ACCT),'DEFINE KSDS',CLASS=A,MSGCLASS=H,NOTIFY=&amp;SYSUID\n//STEP1    EXEC PGM=IDCAMS\n//SYSPRINT DD  SYSOUT=*\n//SYSIN    DD  *\n  DEFINE CLUSTER ( NAME(&amp;SYSUID..EMP.KSDS)         -\n                   INDEXED                          -\n                   KEYS(6 0)                        -\n                   RECORDSIZE(80 80)                -\n                   RECORDS(100 50)                  -\n                   FREESPACE(20 10)                 -\n                   SHAREOPTIONS(2 3)                -\n                   VOLUMES(*)              )        -\n         DATA    ( NAME(&amp;SYSUID..EMP.KSDS.DATA)  )  -\n         INDEX   ( NAME(&amp;SYSUID..EMP.KSDS.INDEX) )\n/*\n//STEP2    EXEC PGM=IDCAMS\n//SYSPRINT DD  SYSOUT=*\n//SYSIN    DD  *\n  LISTCAT ENTRIES(&amp;SYSUID..EMP.KSDS) ALL\n/*</pre><strong>Expected results:</strong> STEP1 returns RC=0 with IDCAMS message 'IDC0508I DATA ALLOCATION STATUS FOR VOLUME ...' followed by 'IDC0181I'. STEP2's LISTCAT output shows three entries: a CLUSTER record (your.EMP.KSDS), a DATA record (your.EMP.KSDS.DATA), and an INDEX record (your.EMP.KSDS.INDEX). For each you can see attributes like KEYLEN=6, RKP=0 (relative key position), AVGLRECL=80, MAXLRECL=80, CISIZE (z/OS picks ~4 KB by default), HI-A-RBA / HI-U-RBA (allocated vs used byte counts), and FREESPC-%CI=20, FREESPC-%CA=10.<br><br><strong>Common pitfalls:</strong> (a) forgetting INDEXED — defaults to NONINDEXED (ESDS) and your KEYS clause then errors; (b) KEYS(length offset) — note the offset is from the START of the record (0-based), not from a key header; (c) RECORDSIZE(avg max) where avg &gt; max produces an IDC3009I error; (d) leaving VOLUMES off — under SMS this is fine, but in non-SMS environments you must specify a VOLSER explicitly."
      },
      {
        title: "Task 2 — Load the KSDS and Read It Back with IDCAMS REPRO and PRINT",
        description: "Build on Task 1: prepare a small flat input file with three sample employee records (sorted by key — KSDS load requires keys in ascending order), use IDCAMS REPRO to load them into the KSDS you defined, then use IDCAMS PRINT to dump the cluster contents in CHAR format to verify.",
        hints: [
          "Hint 1: For the input, you can either pre-create a sequential dataset and load it, or use an in-stream DD with the records inline. Records must already be sorted ascending by the KSDS key.",
          "Hint 2: REPRO syntax is REPRO INFILE(ddname) OUTFILE(ddname). The INFILE points to your sequential input; OUTFILE points to the KSDS.",
          "Hint 3: PRINT INDATASET(name) CHAR produces a character-format dump; use HEX or DUMP for hex output. Add COUNT(N) to limit output.",
          "Hint 4: If REPRO complains about duplicate keys or out-of-sequence records, sort the input first with DFSORT (SORT FIELDS=(1,6,CH,A))."
        ],
        solution: "<strong>Working JCL (load + verify):</strong><pre style=\"background:#0d0d0d;color:#ffb000;padding:1rem;border-radius:4px;overflow-x:auto;font-family:'Share Tech Mono',monospace;font-size:.88rem;line-height:1.45;margin:.6rem 0;\">//LOADKSDS JOB (ACCT),'LOAD KSDS',CLASS=A,MSGCLASS=H,NOTIFY=&amp;SYSUID\n//STEP1    EXEC PGM=IDCAMS\n//SYSPRINT DD  SYSOUT=*\n//INDD     DD  *\nE00001 SMITH   JOHN     MGR  20240115\nE00002 PEREZ   ANA      DEV  20240301\nE00003 TANAKA  HARUKI   DEV  20240520\n/*\n//OUTDD    DD  DSN=&amp;SYSUID..EMP.KSDS,DISP=SHR\n//SYSIN    DD  *\n  REPRO INFILE(INDD) OUTFILE(OUTDD)\n/*\n//STEP2    EXEC PGM=IDCAMS\n//SYSPRINT DD  SYSOUT=*\n//SYSIN    DD  *\n  PRINT INDATASET(&amp;SYSUID..EMP.KSDS) CHAR\n/*</pre><strong>Expected results:</strong> STEP1 returns RC=0 and IDCAMS reports 'IDC0005I — NUMBER OF RECORDS PROCESSED WAS 3'. STEP2 prints each record with its key prefix, e.g.:<pre style=\"background:#0d0d0d;color:#ffb000;padding:.6rem;border-radius:4px;overflow-x:auto;font-family:'Share Tech Mono',monospace;font-size:.85rem;margin:.4rem 0;\">KEY OF RECORD - E00001\nE00001 SMITH   JOHN     MGR  20240115\nKEY OF RECORD - E00002\nE00002 PEREZ   ANA      DEV  20240301\n...</pre><br><strong>Common pitfalls:</strong> (a) records out of key sequence — REPRO into an empty KSDS (initial load) requires ascending keys; insert into an already-loaded KSDS works in any order. (b) trailing data column past LRECL=80 — silently truncated; mind your column counts in the inline data. (c) trying to REPRO with DISP=OLD on the KSDS — fine for initial load, but for later updates use DISP=SHR so other readers (CICS regions etc.) keep access."
      },
      {
        title: "Task 3 — Browse the Master Catalog and a User Catalog",
        description: "Use IDCAMS LISTCAT to inspect the master catalog (alias entries, system datasets) and a user catalog (your own datasets). Identify which user catalog owns your TSO ID's HLQ.",
        hints: [
          "Hint 1: To find the master catalog name, issue the operator command 'D SYMBOLS' from SDSF LOG and look for &SYSCATLG, or check LOADxx in SYS1.PARMLIB for the SYSCATxx entry.",
          "Hint 2: Use 'LISTCAT CATALOG(catalog.name) ENTRIES(yourID) ALL' to see only your alias entry in the master.",
          "Hint 3: To list everything under your HLQ across whichever user catalog owns it: LISTCAT LEVEL(yourID).",
          "Hint 4: To find which user catalog owns your HLQ: LISTCAT ALIAS ENTRIES(yourID) — the RELATED-CATALOG field is the answer."
        ],
        solution: "<strong>Working JCL:</strong><pre style=\"background:#0d0d0d;color:#ffb000;padding:1rem;border-radius:4px;overflow-x:auto;font-family:'Share Tech Mono',monospace;font-size:.88rem;line-height:1.45;margin:.6rem 0;\">//LISTCAT  JOB (ACCT),'LISTCAT',CLASS=A,MSGCLASS=H,NOTIFY=&amp;SYSUID\n//STEP1    EXEC PGM=IDCAMS\n//SYSPRINT DD  SYSOUT=*\n//SYSIN    DD  *\n  /* 1. Find which user catalog owns my HLQ      */\n  LISTCAT ALIAS ENTRIES(&amp;SYSUID)\n\n  /* 2. List everything I own (across catalogs)  */\n  LISTCAT LEVEL(&amp;SYSUID)\n\n  /* 3. Inspect the master catalog (alias only)  */\n  LISTCAT CATALOG(CATALOG.MASTER) ALIAS\n/*</pre><strong>Expected results:</strong> The first LISTCAT shows an ALIAS entry with your HLQ; in the entry body the field <code>ASSOCIATIONS</code> → <code>USERCAT-name</code> tells you which user catalog owns it (e.g., USERCAT.PROD or UCAT.USERS). The second produces a flat list of every dataset under your HLQ — clusters, GDGs, non-VSAM, alternate indexes — categorised by entry type. The third dumps every alias defined in the master catalog, which is essentially the routing table z/OS uses to dispatch lookups to the right user catalog.<br><br><strong>What to look for:</strong> notice that the master catalog itself contains very few user datasets — almost everything is an ALIAS forwarding to a user catalog. This is a deliberate design: keeping the master small protects availability (a corrupted user catalog only affects its HLQs, not the whole system), and keeps backup/recovery times short. Common pitfalls: (a) the master catalog name varies by site (CATALOG.MASTER, MCAT.SYSPLEX, etc.) — confirm via D SYMBOLS or your sysprog; (b) LISTCAT LEVEL(hlq) without quotes works because IDCAMS treats the parameter as a generic match; (c) very large LISTCAT outputs can exceed SYSOUT class limits — route to a dataset with SYSPRINT DD DSN=... if needed."
      },
      {
        title: "Task 4 — Inspect a DASD Volume's VTOC via ISPF 3.4",
        description: "Use ISPF 3.4 to display the VTOC for a specific DASD volume, identify the largest datasets on it, and observe the relationship between catalog entries and physical extents.",
        hints: [
          "Hint 1: From ISPF 3.4, leave the Dataset Name pattern blank and enter a VOLSER in the 'Volume serial' field — or list catalogued datasets first and use the V (VTOC) line command on any entry to jump to the owning volume's VTOC.",
          "Hint 2: Once in the VTOC list, sort by SIZE (column header click or SORT SIZE command) to find space hogs.",
          "Hint 3: The 'Dsorg' column shows PS / PO / PO-E / VS — VS means a VSAM component (part of a cluster, look it up via the catalog with the I line command).",
          "Hint 4: For a programmatic equivalent, use the IEHLIST utility with PGM=IEHLIST and SYSIN of LISTVTOC FORMAT,VOL=3390=VOLSER ; this dumps the entire VTOC to SYSOUT as a printable report."
        ],
        solution: "<strong>ISPF flow:</strong> from the Primary Menu: =3.4 → leave Dataset Name pattern blank → fill 'Volume serial' with e.g. <code>WORK01</code> → press Enter → ISPF lists every dataset extent on that volume with columns: Dsname, Tracks, %Used, XT (extent count), Dev, Volume, Dsorg, Recfm, Lrecl, Blksize, Created, Expires, Referred. Use the SORT command (SORT SIZE D) to rank by size; place the line command <code>I</code> (Information) on any entry to drill into its catalog details, or <code>V</code> to view its DCB attributes.<br><br><strong>Programmatic equivalent — IEHLIST JCL:</strong><pre style=\"background:#0d0d0d;color:#ffb000;padding:1rem;border-radius:4px;overflow-x:auto;font-family:'Share Tech Mono',monospace;font-size:.88rem;line-height:1.45;margin:.6rem 0;\">//VTOCLIST JOB (ACCT),'VTOC LIST',CLASS=A,MSGCLASS=H,NOTIFY=&amp;SYSUID\n//STEP1    EXEC PGM=IEHLIST\n//SYSPRINT DD  SYSOUT=*\n//DD1      DD  UNIT=SYSDA,VOL=SER=WORK01,DISP=SHR\n//SYSIN    DD  *\n  LISTVTOC FORMAT,VOL=3390=WORK01\n/*</pre><strong>Expected results:</strong> the SYSPRINT contains a structured dump of the VTOC: Format-4 DSCB at the top (volume self-description, free-space stats), then one Format-1 DSCB per non-VSAM dataset with full DCB attributes and extent maps, plus Format-3 DSCBs chained from datasets with more than 3 extents, and Format-8/9 references for VSAM clusters whose physical attributes live in the VVDS.<br><br><strong>Reconciliation insight:</strong> compare a dataset name from the VTOC list against IDCAMS LISTCAT — they should match exactly. If a name appears on the VTOC but not the catalog, it is an <strong>uncatalogued</strong> dataset (orphan) — this can happen if a job did DISP=(OLD,UNCATLG,UNCATLG) without DELETE. Conversely, a catalog entry with no VTOC presence is a <strong>dangling</strong> reference — the dataset has been physically removed (perhaps by DFSMShsm migration to ML2 tape) and a recall is needed to bring it back. Both conditions are visible to any z/OS administrator and are routine to clean up with DELETE NOSCRATCH or HRECALL."
      }
    ]
  },

  //  System Operations & Tools (2 cards) 

  {
    id: "l1-tso-ispf",
    level: 1,
    category: "System Operations & Tools",
    title: "TSO & ISPF Navigation",
    summary: "Logging on to TSO, issuing TSO commands, navigating the ISPF menu system, using the ISPF Editor, running utilities, and productivity tips.",
    content: `
      <h2>TSO Overview</h2>
      <p><strong>TSO (Time-Sharing Option)</strong> is z/OS's interactive command interpreter — the equivalent of a Unix shell, but designed in the 1960s when multiple users had to share a single mainframe via line-by-line dialogue. Each TSO session is its own address space, started when a user logs on with their RACF user ID and password through a 3270 terminal emulator (a real green-screen, or any TN3270 client like x3270, c3270, or a Java applet such as IBM Personal Communications). After successful logon, TSO drops the user at a <strong>READY</strong> prompt. From there, the user can issue TSO commands directly: <code>LISTC</code>, <code>SUBMIT</code>, <code>HRECALL</code>, <code>OMVS</code>, <code>SEND</code>, <code>STATUS</code>, etc. TSO by itself is line-mode, character-at-a-time, and not particularly productive — which is why almost nobody actually <em>uses</em> bare TSO for long. The standard practice is to immediately enter <strong>ISPF</strong>, the full-screen menu/editor system that runs on top of TSO.</p>
      <p><strong>The TSO/ISPF Relationship:</strong> ISPF (Interactive System Productivity Facility) is the program you spend 95% of your time in. ISPF runs <em>under</em> TSO — your TSO READY session loads ISPF as a program, and ISPF takes over the screen with menus, panels, and the editor. When you exit ISPF (typically with the X command) you drop back to TSO READY, and from READY you can <code>LOGOFF</code> to end the session. On most sites the TSO logon procedure (LOGON PROC) is configured to start ISPF automatically, so users go straight from logon to the ISPF Primary Option Menu without ever seeing READY.</p>
      <p><strong>Common TSO Commands at READY (work outside ISPF too):</strong></p>
      <ul>
        <li><code>LISTC LEVEL(yourid)</code> — list every catalogued dataset under your HLQ.</li>
        <li><code>LISTD 'dsname'</code> — show a dataset's allocation attributes (DCB, volume, extents).</li>
        <li><code>SUBMIT 'dsname(member)'</code> — submit a JCL member to the JES batch reader.</li>
        <li><code>STATUS</code> — list your queued / executing batch jobs and their current status.</li>
        <li><code>SEND 'message' USER(otherid)</code> — send a one-line message to another logged-on user.</li>
        <li><code>OMVS</code> — start a UNIX System Services shell session.</li>
        <li><code>ISPF</code> (or <code>PDF</code>) — start the ISPF dialog manager.</li>
        <li><code>LOGOFF</code> — end the TSO session.</li>
      </ul>

      <h2>ISPF Primary Option Menu</h2>
      <p>The Primary Option Menu is the top-level screen you see after entering ISPF. Every ISPF function is reachable by typing an option number on the <strong>command line</strong> (more on the command line below). The classical menu options are:</p>
      <ul>
        <li><strong>0 — Settings</strong> — personal ISPF preferences (function key labels, command-line position, panel display options, terminal characteristics, list/log options).</li>
        <li><strong>1 — View</strong> — open a dataset or member <em>read-only</em>. Looks like Edit but you cannot save changes. Useful for checking content without risk.</li>
        <li><strong>2 — Edit</strong> — open a dataset or member for modification. The ISPF Editor is the primary text-editing tool on z/OS.</li>
        <li><strong>3 — Utilities</strong> — dataset and library management tasks. Subdivides into 3.1 through 3.17 (covered below).</li>
        <li><strong>4 — Foreground</strong> — interactive compiles and assemblies (run a compiler against a source file and view the listing).</li>
        <li><strong>5 — Batch</strong> — generate and submit batch JCL for compiles or other long-running tasks.</li>
        <li><strong>6 — Command</strong> — TSO Command Shell: a screen for typing TSO commands without leaving ISPF (handy for one-off LISTC, HRECALL, etc.).</li>
        <li><strong>7 — Dialog Test</strong> — test custom ISPF dialogs (panels, REXX execs).</li>
        <li><strong>8 — LM Facility</strong> — Library Management Facility (older, mostly obsolete).</li>
        <li><strong>9 — IBM Products</strong> — gateway to other ISPF-based IBM products like SDSF, SMP/E, RACF panels, DB2 Admin.</li>
        <li><strong>10 — SCLM</strong> — Software Configuration and Library Manager (source code control, mostly legacy).</li>
        <li><strong>11 — Workplace</strong> — newer object-oriented panel layout (rarely the default).</li>
        <li><strong>M — More</strong> — site-customised additional menus (z/OSMF, RDz, vendor tools).</li>
      </ul>
      <p><strong>Jump-To Syntax:</strong> typing just <code>3</code> on the command line goes to the Utilities menu, then <code>2</code> takes you to Allocate. To skip the intermediate menu, type <code>=3.2</code> directly from anywhere in ISPF — the leading <code>=</code> is the "primary jump" prefix that resets the dialog stack and goes straight to the named option from the top. <code>=3.4</code> jumps to Dataset List, <code>=6</code> jumps to TSO Command Shell, <code>=X</code> exits all the way out.</p>

      <h2>Command Line Position</h2>
      <p>Every ISPF panel has a <strong>command line</strong> (sometimes called the <em>option line</em> on the Primary Menu). It is the single line marked <code>===&gt;</code> where you type panel options, primary commands, jump-to syntax, or scroll directives. Historically the command line lived at the <strong>top</strong> of every panel (the first row), which is the IBM default. Many users prefer it at the <strong>bottom</strong> because that's where the cursor naturally rests after viewing a long list — having to chase the cursor back up to the top to type a command gets old fast.</p>
      <p><strong>Moving the command line:</strong> from anywhere in ISPF, type <code>=0</code> to jump to Settings (option 0). On the Settings panel there is a checkbox or option labelled <strong>"Command line at bottom"</strong> (older releases call it <em>"Primary command line"</em>). Toggle it to YES and press Enter — every ISPF panel now displays the command line at the bottom of the screen. The change is saved in your personal ISPF profile dataset (<code>userid.ISPF.ISPPROF</code> or similar) so it persists across logons.</p>
      <p>While in Settings, three other toggles are worth knowing: <strong>"Tab to action bar choices"</strong> (controls whether the Tab key cycles through menu items), <strong>"Display SESSION Manager screen"</strong> (multi-screen support), and <strong>"Always show split line"</strong> (whether the divider between split screens is always visible). The bulk of the Settings panel covers function-key assignments — the bottom of the screen normally displays a row of <code>F1=Help F2=Split F3=Exit ...</code> labels; you can change which command each function key sends. The most common customisation is binding F4 to RETURN, but the IBM defaults are sensible for newcomers.</p>

      <h2>ISPF Utilities — Option 3</h2>
      <p>Option 3 (Utilities) is where most day-to-day dataset management happens. The sub-options that matter most:</p>
      <ul>
        <li><strong>3.1 — Library Utility</strong> — operates on the members of a single PDS or PDSE: list, browse, edit, rename, delete, print, compress (PDS only). Quicker than 3.4 → enter when you want to work inside one library.</li>
        <li><strong>3.2 — Data Set Utility</strong> — operates on entire datasets: <em>A</em>llocate new, <em>R</em>ename, <em>D</em>elete, display data set <em>I</em>nformation, <em>C</em>atalog, <em>U</em>ncatalog. The Allocate panel is the most common entry point for creating PS or PDS/PDSE datasets without writing JCL.</li>
        <li><strong>3.3 — Move/Copy</strong> — copy or move a dataset (or selected members of a PDS) to another dataset. Supports copying members between two PDSs, copying a sequential dataset to another sequential, and replacing existing members with REPLACE. The "Move" variant deletes the source after a successful copy.</li>
        <li><strong>3.4 — Data Set List</strong> — the workhorse for inquiry. Type a dataset-name pattern (e.g., <code>Z12345.*</code>) and ISPF lists every matching catalogued dataset, on which you can run line commands E (edit), V (view), B (browse), I (info), D (delete), R (rename), M (member list for PDS), S (browse a sequential or member-list a PDS — context-sensitive).</li>
        <li><strong>3.6 — Hardcopy</strong> — print a dataset to a JES SYSOUT class.</li>
        <li><strong>3.8 — Outlist</strong> — browse held output (predecessor to SDSF, still useful on systems without SDSF).</li>
        <li><strong>3.14 — Search-For</strong> — find a string across all members of a PDS (the equivalent of grep across a library).</li>
        <li><strong>3.17 — Compare/Search</strong> — compare two datasets line-by-line (built-in diff).</li>
      </ul>

      <h2>ISPF Editor Commands</h2>
      <p>The ISPF Editor (option 2 from the Primary Menu, or E next to a dataset in 3.4) is the workhorse for any text editing on z/OS — JCL, source code, parmlib members, REXX execs. It splits commands into two kinds:</p>
      <ul>
        <li><strong>Primary commands</strong> are typed on the command line and act on the whole file. Common ones: <code>FIND 'string'</code> (search forward; F repeats), <code>CHANGE 'old' 'new' ALL</code> (search-and-replace), <code>SAVE</code> (save without exiting), <code>CANCEL</code> (exit without saving), <code>SUBMIT</code> (submit current member as JCL), <code>HEX ON/OFF</code> (toggle hex display), <code>NUM ON</code> (turn on sequence numbers), <code>RES</code> (reset all line-command pending status), <code>SORT</code>, <code>X ALL</code> (exclude every line — usually combined with FIND to show only matching lines).</li>
        <li><strong>Line commands</strong> are typed in the 6-character line-number area (left side) and act on individual lines or ranges:
          <ul>
            <li><code>D</code> — delete this line. <code>Dn</code> deletes n lines. <code>DD..DD</code> deletes a range bracketed by the two DDs.</li>
            <li><code>I</code> — insert a blank line below. <code>In</code> inserts n blank lines.</li>
            <li><code>R</code> — repeat (duplicate) this line. <code>Rn</code> repeats n times.</li>
            <li><code>C</code> + <code>A</code> / <code>B</code> — copy this line, then <code>A</code>fter or <code>B</code>efore the destination line. <code>CC..CC</code> copies a range.</li>
            <li><code>M</code> + <code>A</code> / <code>B</code> — move (cut and paste). <code>MM..MM</code> moves a range.</li>
            <li><code>X</code> — exclude (hide) this line from display (data is preserved). <code>XX..XX</code> excludes a range. <code>RES</code> on the command line shows everything again.</li>
            <li><code>)</code> / <code>(</code> — shift columns right / left. <code>))</code> / <code>((</code> shifts data with columns. <code>&gt;</code> / <code>&lt;</code> shifts data only.</li>
          </ul>
        </li>
      </ul>

      <h2>Productivity Tips</h2>
      <ul>
        <li><strong>Command stacking with semicolons</strong> — type <code>3.4;Z12345.*</code> on the Primary Menu command line to jump to Dataset List <em>and</em> pre-fill the search pattern in one keystroke. Almost every two-step action can be collapsed this way.</li>
        <li><strong>RETRIEVE (F12)</strong> — recalls the previous command you typed on the command line, cycling backwards through history. Like up-arrow in bash. Pressing F12 repeatedly walks back further.</li>
        <li><strong>Function keys</strong> — F1=Help, F3=Exit/Save (back one panel), F4=Return (exit all the way), F7=Page Up, F8=Page Down, F10/F11=Page Left/Right, F12=Retrieve. Type <code>KEYS</code> on any panel to view and remap.</li>
        <li><strong>Split screen</strong> — F2 splits the screen into two ISPF sessions (top and bottom by default). F9 swaps which one has focus. Useful for editing in one half while watching SDSF in the other. Type <code>SWAP LIST</code> for a multi-session list.</li>
        <li><strong>The =X command</strong> — exits ISPF entirely and returns to TSO READY. <code>=X.X</code> exits TSO too (logoff), useful for clean session ends.</li>
        <li><strong>The PFSHOW command</strong> — toggles the F-key label row at the bottom of the screen. PFSHOW OFF gives you back two extra display lines if you don't need the prompts.</li>
      </ul>

      <h2>Sources &amp; References</h2>
      <div style="margin-top:20px; padding:20px; background-color:#e8f4f8; border-left:5px solid #0066cc; border-radius:4px; font-size:0.9em; line-height:1.8;">
        <ul style="margin: 0; padding-left: 20px; list-style-type:none;">
          <li>• <a href="https://www.ibm.com/docs/en/zos/2.5.0?topic=zos-tso-e-users-guide" target="_blank" style="color:#0066cc; text-decoration:none;">TSO/E User's Guide</a> (Publication SA32-0971) — TSO commands, LOGON, READY environment</li>
          <li>• <a href="https://www.ibm.com/docs/en/zos/2.5.0?topic=zos-ispf-users-guide-volume-i" target="_blank" style="color:#0066cc; text-decoration:none;">ISPF User's Guide Vol. I</a> (Publication SC19-3627) — Primary Menu, Settings, command line</li>
          <li>• <a href="https://www.ibm.com/docs/en/zos/2.5.0?topic=zos-ispf-users-guide-volume-ii" target="_blank" style="color:#0066cc; text-decoration:none;">ISPF User's Guide Vol. II</a> (Publication SC19-3628) — Editor primary &amp; line commands in depth</li>
          <li>• <a href="https://www.ibm.com/docs/en/zos/2.5.0?topic=zos-ispf-edit-edit-macros" target="_blank" style="color:#0066cc; text-decoration:none;">ISPF Edit and Edit Macros</a> (Publication SC19-3621) — full primary command reference</li>
          <li>• <a href="https://www.redbooks.ibm.com/abstracts/sg247414.html" target="_blank" style="color:#0066cc; text-decoration:none;">IBM Redbook SG24-7414</a> — z/OS Basic Skills (TSO/ISPF chapters)</li>
          <li>• IBM Master the Mainframe / zXplore TSO &amp; ISPF labs — the canonical hands-on starting point for newcomers.</li>
        </ul>
      </div>
    `,
    mcq: [
      { question: "What ISPF option opens a dataset or member for editing?", options: ["Option 1", "Option 2", "Option 3", "Option 5"], answer: 1, explanation: "ISPF option 2 is the Edit function. It opens sequential datasets or PDS members for modification." },
      { question: "Which ISPF utility option lists datasets matching a pattern?", options: ["3.1", "3.2", "3.3", "3.4"], answer: 3, explanation: "ISPF 3.4 (Dataset List) accepts a partial DSN pattern and lists all matching catalogued datasets." },
      { question: "What does the ISPF editor line command 'D' do?", options: ["Duplicate a line", "Delete the line", "Move down in the file", "Decrease indent"], answer: 1, explanation: "The D line command deletes the line. DD...DD deletes a range bracketed by two DDs." },
      { question: "What is the ISPF RETRIEVE function (typically F12) used for?", options: ["Save the current file", "Recall the last command entered on the command line, cycling backwards through history", "Return to the ISPF primary menu", "Run a REXX exec"], answer: 1, explanation: "RETRIEVE walks backward through previously entered command-line strings, eliminating retyping. Equivalent to up-arrow in bash." },
      { question: "How do you stack ISPF commands to execute multiple steps without returning to a menu?", options: ["Press Enter twice", "Separate commands with a semicolon (;)", "Use the JUMP command", "Submit as a batch job"], answer: 1, explanation: "ISPF command stacking uses the semicolon (;) separator: e.g., '3.4;Z12345.*' jumps to Dataset List and pre-fills the search pattern in one keystroke." },
      { question: "Which ISPF option lets you change personal preferences such as moving the command line to the bottom of the screen?", options: ["Option 0 (Settings)", "Option 1 (View)", "Option 6 (Command)", "Option 9 (IBM Products)"], answer: 0, explanation: "Settings (option 0) holds personal ISPF preferences including command-line position, function-key labels, and split-screen behaviour." },
      { question: "What is the relationship between TSO and ISPF?", options: ["They are unrelated subsystems", "ISPF runs as a program under TSO — TSO is the command shell, ISPF is the full-screen menu/editor environment loaded on top", "TSO runs under ISPF", "ISPF replaces TSO entirely"], answer: 1, explanation: "A TSO logon gives you the READY prompt; from READY (or via the LOGON PROC) you launch ISPF, which runs as a program inside your TSO address space." },
      { question: "What does the '=' prefix do when typed before an option on an ISPF command line?", options: ["Saves the option as a default", "Performs a primary jump — resets the dialog stack and goes straight to the named option from the top", "Comments out the option", "Repeats the previous option"], answer: 1, explanation: "Typing =3.4 from anywhere in ISPF jumps directly to Dataset List, regardless of where you are in the panel hierarchy." },
      { question: "Which ISPF utility option allocates a new dataset?", options: ["3.1", "3.2", "3.3", "3.4"], answer: 1, explanation: "3.2 (Data Set Utility) provides Allocate, Rename, Delete, Information, Catalog, and Uncatalog actions on entire datasets." },
      { question: "Which ISPF utility option copies datasets or members between libraries?", options: ["3.2", "3.3", "3.4", "3.14"], answer: 1, explanation: "3.3 (Move/Copy) copies datasets or selected members; the Move variant deletes the source after a successful copy." },
      { question: "What command on the ISPF Editor command line searches for a string across the file?", options: ["GREP 'string'", "FIND 'string'", "LOCATE 'string'", "SEARCH 'string'"], answer: 1, explanation: "FIND 'string' searches forward from the current cursor position; pressing PF5 (RFIND) repeats the search." },
      { question: "What does the ISPF editor line command 'X' do?", options: ["Delete the line permanently", "Exclude (hide) the line from display while preserving its content", "Mark the line as the cursor target", "Execute the line as a TSO command"], answer: 1, explanation: "X excludes lines from view (data is preserved on disk). XX..XX excludes a range. The RES primary command resets all exclusions." }
    ],
    practical: [
      {
        title: "Task 1 — Allocate a New Sequential Dataset and a PDS via ISPF 3.2",
        description: "Use the Data Set Utility (option 3.2) to create two datasets: a sequential FB,80 dataset called Z12345.TEST.SEQ and a partitioned (PDS) dataset called Z12345.TEST.CNTL with directory blocks for 10 members. This is the most common entry point for creating datasets without writing JCL.",
        hints: [
          "Hint 1: From the ISPF Primary Menu type =3.2 on the command line and press Enter — the leading = jumps directly to Data Set Utility from anywhere.",
          "Hint 2: To allocate, leave the Project field blank and type the full dataset name (in single quotes if you don't want your TSO ID auto-prepended) in the 'Other Partitioned or Sequential Data Set Name' field. Then type 'A' (Allocate) on the option line and press Enter.",
          "Hint 3: On the Allocate New Data Set panel set Space units = TRKS, Primary quantity = 5, Secondary quantity = 2, Directory blocks = 0 (for PS) or 10 (for PDS), Record format = FB, Record length = 80, Block size = 0 (lets z/OS pick optimum), Data set name type = blank for PS / blank or PDS for partitioned / LIBRARY for PDSE.",
          "Hint 4: After pressing Enter you'll see 'Data set allocated' top-right. Press F3 to return, change the dataset name and Directory blocks value, and repeat for the second dataset.",
          "Hint 5: To verify, jump to =3.4 with mask 'Z12345.TEST.*' and confirm both datasets appear with the right Org (PS for sequential, PO or PO-E for partitioned)."
        ],
        solution: "<strong>Step-by-step expected flow:</strong><br><br>1. From Primary Menu type <code>=3.2</code> + Enter → Data Set Utility panel appears.<br>2. Type DSN <code>'Z12345.TEST.SEQ'</code> in the dataset name field, type <code>A</code> on the option line, press Enter.<br>3. Allocate New Data Set panel: Space units=TRKS, Primary=5, Secondary=2, Directory blocks=0, RecFm=FB, LRecl=80, BlkSize=0. Press Enter → message 'Data set allocated' appears.<br>4. Press F3 to return. Change DSN to <code>'Z12345.TEST.CNTL'</code>, type <code>A</code> again, press Enter.<br>5. Allocate panel: same as before but Directory blocks=10 (this is what makes it a PDS). Optionally set Data set name type=LIBRARY for PDSE. Press Enter → 'Data set allocated' again.<br>6. Verify: <code>=3.4</code> with Dsname Level <code>Z12345.TEST</code> → list shows both with Org=PS and Org=PO (or PO-E).<br><br><strong>Common pitfalls:</strong> (a) forgetting the single quotes around the dataset name causes ISPF to prepend your TSO ID — usually harmless if your ID matches the HLQ, but a surprise otherwise; (b) leaving Directory blocks > 0 on a PS allocation is silently accepted (the directory blocks are ignored); (c) setting Directory blocks=0 when you intended a PDS gives you a PS, and a later Edit attempt with member-name syntax fails with 'Data set not partitioned'."
      },
      {
        title: "Task 2 — Copy and Move Members with ISPF 3.3",
        description: "Use the Move/Copy utility (option 3.3) to copy a member from Z12345.TEST.CNTL to a member in another PDS, then move (cut and paste) a different member out of CNTL into the new library. Practice the From-To panel pattern that 3.3 uses.",
        hints: [
          "Hint 1: First make sure you have something to copy — use ISPF 2 (Edit) to add a couple of members (e.g., MEMBER1 and MEMBER2) to Z12345.TEST.CNTL with a few lines of text each.",
          "Hint 2: Allocate a second PDS, e.g., Z12345.TEST.CNTL2, via 3.2 (same way as Task 1).",
          "Hint 3: Type =3.3 to jump to Move/Copy. The first panel has two action choices at the top — type C to copy (keeps the source) or M to move (deletes the source after a successful copy) on the option line.",
          "Hint 4: After picking C or M, ISPF prompts for the source dataset (and optional member). Type Z12345.TEST.CNTL with member name MEMBER1, then press Enter.",
          "Hint 5: The next panel asks for the target dataset. Type Z12345.TEST.CNTL2 (no member name = copy with same name) or with a member name (= rename during copy). Add R if the target member already exists and you want to replace it.",
          "Hint 6: After the copy/move completes you see 'Operation complete'. Verify by listing members of CNTL2 with ISPF 3.1 or 3.4 → M line command."
        ],
        solution: "<strong>Step-by-step:</strong> the 3.3 utility is a two-panel flow: (1) action and source, (2) target. The most common confusion for newcomers is that the source member is specified on a separate field, not appended to the dataset name.<br><br><strong>Copy MEMBER1 from CNTL to CNTL2:</strong><br>1. <code>=3.3</code> → Move/Copy panel.<br>2. Option line: <code>C</code>. Source DSN: <code>Z12345.TEST.CNTL</code>, member: <code>MEMBER1</code>. Press Enter.<br>3. Target panel: DSN <code>Z12345.TEST.CNTL2</code>, member: blank (keeps name) or <code>MEMBER1A</code> (renames during copy). Replace if existing? = <code>NO</code> for first attempt. Press Enter → 'Operation complete'.<br>4. Verify: <code>=3.4</code> → mask <code>Z12345.TEST.*</code> → M next to CNTL2 → MEMBER1 (or MEMBER1A) appears.<br><br><strong>Move MEMBER2 from CNTL to CNTL2:</strong><br>1. <code>=3.3</code>, option <code>M</code>, source <code>Z12345.TEST.CNTL(MEMBER2)</code>, target <code>Z12345.TEST.CNTL2</code>, Enter.<br>2. After completion: M next to CNTL → MEMBER2 is gone; M next to CNTL2 → MEMBER2 is present. The Move variant deleted the source.<br><br><strong>Pro tip:</strong> 3.3 also has option <code>CP</code> (Copy with PROMPT — confirms each member individually when copying multiple members with a wildcard) and option <code>L</code> (Load — for copying load modules with their alias entries intact). You can also copy/move <em>multiple</em> members in one operation by leaving the source member name blank: ISPF then prompts you to select members from a list. Common pitfall: forgetting REPLACE=YES when the target member exists — you get 'Data set member exists' and have to retry."
      },
      {
        title: "Task 3 — Inquire on, Browse, Rename, and Delete Datasets via ISPF 3.4",
        description: "Use Data Set List (option 3.4) — the universal inquiry tool — to find your test datasets, browse one, rename one, and delete another. 3.4 is where you'll spend more time than any other ISPF panel; the line commands are worth memorising.",
        hints: [
          "Hint 1: Type =3.4 to jump straight to Data Set List Utility.",
          "Hint 2: In the 'Dsname Level' field type your HLQ pattern, e.g., Z12345.TEST.* (the trailing .* matches any continuation; you can also use 'Z12345.**' to match any number of qualifiers).",
          "Hint 3: Press Enter — ISPF lists every catalogued dataset matching the pattern, with columns Tracks, %Used, XT (extents), Dev, Volume, Org, RecFm, LRecl, BlkSize, Created, Expires, Referred.",
          "Hint 4: Type a single-letter line command in the leftmost column next to a dataset and press Enter: B=Browse, V=View, E=Edit, I=Information, M=Member list (PDS only), D=Delete, R=Rename. Multiple commands can be queued on different rows before pressing Enter — they execute top to bottom.",
          "Hint 5: For DELETE confirmation: ISPF asks 'Confirm Delete' panel — type Y or press Enter to proceed, F3/CANCEL to abort. RENAME prompts on a similar confirmation panel for the new name.",
          "Hint 6: Useful commands on the 3.4 command line: SORT changes the column ordering (e.g., SORT TRACKS DESCENDING), LOCATE jumps to a dataset name in the list, REFRESH re-runs the catalog query."
        ],
        solution: "<strong>Walkthrough:</strong><br><br>1. <code>=3.4</code> + Enter → Data Set List Utility panel.<br>2. Dsname Level: <code>Z12345.TEST.*</code>. Press Enter. List appears with all your test datasets.<br>3. Type <code>B</code> next to <code>Z12345.TEST.SEQ</code> + Enter → ISPF opens the dataset in Browse mode (read-only). F3 to return.<br>4. Type <code>R</code> next to one entry, e.g., <code>Z12345.TEST.CNTL2</code>, + Enter → Rename Data Set panel. New name: <code>Z12345.TEST.CNTL3</code>, Enter → 'Data set renamed'. The list refreshes showing CNTL3 instead of CNTL2.<br>5. Type <code>D</code> next to <code>Z12345.TEST.SEQ</code> + Enter → Confirm Delete panel. Press Enter → dataset gone, list refreshes.<br>6. Type <code>I</code> next to a remaining dataset + Enter → Data Set Information panel showing all attributes (org, RecFm, LRecl, BlkSz, allocation, references, SMS classes if managed).<br>7. Type <code>M</code> next to <code>Z12345.TEST.CNTL</code> + Enter → Member List panel showing every member with its ISPF stats (size, init, mod, version, user). From here you can E/V/B/D/R individual members.<br><br><strong>Power-user tricks:</strong> (a) on the command line, <code>SORT VOLUME</code> groups datasets by the DASD volume they sit on — handy for spotting capacity hot-spots; (b) <code>FIND 'string'</code> on the command line searches the dataset names visible in the list; (c) you can queue multiple line commands at once — type D next to three different datasets and press Enter once; ISPF processes them in order and stops at any errors."
      },
      {
        title: "Task 4 — Move the ISPF Command Line to the Bottom and Customise Function Keys",
        description: "Use ISPF Settings (option 0) to relocate the command line from the top of the panel to the bottom (a near-universal customisation among experienced users), then explore the function-key assignment panel and re-bind one F-key to a command of your choice. Both changes persist in your ISPF profile across logons.",
        hints: [
          "Hint 1: From anywhere in ISPF type =0 to jump straight to the Settings panel.",
          "Hint 2: Look for the field or checkbox labelled 'Command line at bottom' (older releases call it 'Primary command line — Bottom'). Type a / next to it (or change N to Y) and press Enter. Every ISPF panel now shows the command line at the bottom.",
          "Hint 3: While in Settings, type KEYS on the command line — this opens the PF Key Definitions panel showing every F-key and the command it sends. F1=HELP, F3=END, F7=UP, F8=DOWN, etc.",
          "Hint 4: To rebind, e.g., F4 to RETURN (exit all the way out instead of one panel), type RETURN in the F4 row and press Enter. Press F3 to save and return.",
          "Hint 5: To revert any setting, return to =0 / KEYS and change back. To restore IBM defaults, the RESET command on the KEYS panel re-applies the shipped defaults.",
          "Hint 6: To toggle whether the F-key labels show at the bottom of every panel, type PFSHOW OFF (or PFSHOW ON) on any command line — this is independent of the bind values themselves."
        ],
        solution: "<strong>Moving the command line to the bottom:</strong><br>1. <code>=0</code> + Enter → ISPF Settings panel.<br>2. Locate 'Command line at bottom' (some releases display it as a Y/N field; others as a checkbox). Set it to YES / mark with /. Press Enter.<br>3. Press F3 to exit Settings. Notice that every ISPF panel — Primary Menu, 3.4, Edit, etc. — now displays the <code>Command ===&gt;</code> line at the bottom of the screen instead of the top. The cursor naturally returns to that position after page-down operations, eliminating the chase-the-cursor-back-up problem.<br><br><strong>Customising function keys:</strong><br>1. From any ISPF panel type <code>KEYS</code> on the command line. The PF Key Definitions panel appears showing F1–F12 (and shifted F13–F24 on 24-key terminals).<br>2. Each row has a key number, the current command bound to it, and a label. Defaults: F1=HELP, F2=SPLIT, F3=END, F4=RETURN (some sites), F5=RFIND, F6=RCHANGE, F7=UP, F8=DOWN, F9=SWAP, F10=LEFT, F11=RIGHT, F12=RETRIEVE.<br>3. To change F4 from its default to RETURN: type <code>RETURN</code> in the Definition column for F4. Press Enter to validate, F3 to save and exit.<br>4. Test: from anywhere in ISPF press F4 — you should bounce all the way out to the Primary Menu (or to TSO READY if you were already at the Primary Menu).<br><br><strong>Where the changes live:</strong> ISPF persists Settings and KEYS choices in your personal profile dataset, typically <code>userid.ISPF.ISPPROF</code> (a small VSAM cluster or PDS). The settings carry across logoff/logon. To reset everything to IBM defaults, on the KEYS panel issue the RESET primary command, or simply delete the profile dataset and let ISPF rebuild it on next logon (mild data loss: any saved edits-recovery state is lost too).<br><br><strong>Other Settings worth a tour</strong> (no action required, just look at them): 'Tab to action bar choices' (whether Tab cycles through menu options), 'Always show split line' (the divider in split-screen mode), 'Display SESSION Manager screen' (multi-screen support), 'List/Log Display Defaults' (controls SDSF-style list panels). Most defaults are sensible — the command-line position is the one tweak almost every long-term user makes."
      }
    ]
  },

  {
    id: "l1-sdsf-smf",
    level: 1,
    category: "System Operations & Tools",
    title: "SDSF, SMF, RMF & USS Basics",
    summary: "Using SDSF to monitor and manage jobs/output, SMF record types and recording, RMF Monitor overview, and introduction to UNIX System Services (USS).",
    content: `
      <h2>SDSF</h2>
      <p><strong>SDSF</strong> is the day-to-day operations console for every z/OS user. It is the ISPF-based front end to <strong>JES2</strong> (or JES3), the job entry subsystem that owns every batch job, every line of SYSOUT, and every started task on the system. Anything you submit, want to inspect, want to cancel, or want to find the return code of — SDSF is where you go. It is to a z/OS programmer what <code>ps</code>, <code>top</code>, <code>journalctl</code>, and the systemd console combined are to a Linux user, and then some. Reach SDSF by typing <code>=SD</code> from anywhere in ISPF, or <code>SDSF</code> as a TSO command, or via Primary Menu option 9 (IBM Products) → SDSF on most sites.</p>
      <p><strong>The SDSF Primary Menu shows two-letter panel codes</strong>; type one on the command line and press Enter to go there. Panels you will use constantly:</p>
      <ul>
        <li><strong>ST — Status</strong> — every job in the system: queued for input, running, waiting on output, complete and held. The default starting point.</li>
        <li><strong>DA — Display Active</strong> — currently executing address spaces, including started tasks and TSO users. The closest analogue to Linux <code>top</code> — shows CPU%, EXCP I/O counts, real and virtual storage in use.</li>
        <li><strong>I — Input queue</strong> — jobs that have been submitted but have not yet started executing.</li>
        <li><strong>O — Output queue</strong> — completed jobs whose SYSOUT is waiting to print or be processed by some output handler.</li>
        <li><strong>H — Held output</strong> — completed jobs whose SYSOUT class is HELD (typical for MSGCLASS=H), meaning the output is sitting on the spool waiting for someone to browse, print, or purge it. This is where you usually find your own jobs after they run.</li>
        <li><strong>LOG — System log</strong> — the running stream of operator messages, console replies, system events, and WTOs (Write-To-Operator messages). Indispensable when troubleshooting.</li>
        <li><strong>PR — Printers</strong> — installed printer definitions and their status.</li>
        <li><strong>INIT — Initiators</strong> — JES2 initiator address spaces and which class of jobs each will run.</li>
        <li><strong>SR — System Requests</strong> — outstanding WTOR (Write-To-Operator-with-Reply) messages awaiting an operator response.</li>
        <li><strong>NODE — JES nodes</strong> — multi-system / network-attached JES nodes (NJE).</li>
        <li><strong>ULOG — User log</strong> — your own command history within SDSF.</li>
      </ul>
      <p><strong>Filtering — Prefix and Owner:</strong> by default ST shows every job on the system, which on a busy site is unusable. Use <code>PREFIX</code> and <code>OWNER</code> on the command line to filter:</p>
      <ul>
        <li><code>PREFIX Z12345*</code> — limit the list to jobs whose names start with Z12345 (matches your TSO ID's typical job-name pattern).</li>
        <li><code>OWNER Z12345</code> — limit the list to jobs submitted by user Z12345.</li>
        <li><code>PREFIX *</code> + <code>OWNER *</code> — clear filters to see everything (privileged users only).</li>
        <li>The current filter values are shown in the panel header so you always know what you are looking at.</li>
      </ul>
      <p><strong>Line commands — what you type next to a job to act on it:</strong></p>
      <ul>
        <li><code>S</code> (Select) or simply pressing Enter — drill into the job's DDs (its SYSOUT components: JESMSGLG, JESJCL, JESYSMSG, plus any program SYSPRINT/SYSOUT).</li>
        <li><code>?</code> — same as S but always shows the DD list even if there is only one.</li>
        <li><code>SJ</code> — open the JCL of the job in the ISPF editor (read-only).</li>
        <li><code>SE</code> — submit the job again (Edit) — opens the JCL editable.</li>
        <li><code>P</code> (Purge) — delete a held output or queued job from the spool. Common for clearing old MSGCLASS=H output you no longer need.</li>
        <li><code>C</code> (Cancel) — cancel a running or queued job; <code>CD</code> = cancel + dump (forces an SVC dump for diagnosis).</li>
        <li><code>O</code> (Release) — release a held output to its print class.</li>
        <li><code>H</code> (Hold) — hold a queued or running output.</li>
        <li><code>X</code> (Print) — print to a defined SDSF print destination.</li>
        <li><code>XDC</code> — extract output to a dataset (handy for capturing JES output programmatically).</li>
      </ul>
      <p><strong>Inside a job's DD list,</strong> use <code>S</code> or <code>B</code> next to a DD name to browse its content. The most useful DDs for diagnosis are <strong>JESMSGLG</strong> (job log: messages from JES about job lifecycle), <strong>JESJCL</strong> (the actual JCL after symbolic substitution), and <strong>JESYSMSG</strong> (allocation, deallocation, and step-termination messages — this is where you find IEF142I 'STEP STEPxx — RC=nnnn' lines that tell you the return codes).</p>
      <p><strong>SDSF action commands</strong> (typed on the command line, prefixed with /): a forward-slash followed by an MVS console command issues that command directly. Examples: <code>/D A,L</code> displays active address spaces; <code>/D U,DASD,ONLINE</code> displays online DASD volumes; <code>/$DA</code> displays JES2 active jobs. This requires SDSF authority for the underlying command — most users can issue display (D) commands but not destructive ones.</p>

      <h2>SMF</h2>
      <p><strong>SMF</strong> is z/OS's system-wide event recording mechanism — every interesting thing that happens (a job starts, a dataset is opened, a TSO user logs on, RACF denies an access attempt, a CICS region completes a transaction) is captured as an <strong>SMF record</strong> with a numeric type and written to a system-managed buffer. The records are eventually streamed to <strong>SMF datasets</strong> (older sites use VSAM <code>SYS1.MAN*</code> datasets in a rotation; modern sites use a <strong>logstream</strong> backed by the System Logger and the Coupling Facility). Once a day (typically) a sysprog runs <strong>IFASMFDP</strong> (or <strong>IFASMFDL</strong> for logstream-based recording) to dump the records to flat sequential files, where they feed into reporting tools.</p>
      <p><strong>SMF is the foundation of nearly all z/OS reporting and analytics</strong>: capacity planning, security auditing, chargeback / billing, performance analysis, anomaly detection, compliance reporting. If a question begins with "how many" or "how much" or "who did what when," the answer almost always lives in SMF.</p>
      <p><strong>Record types you'll see most often:</strong></p>
      <ul>
        <li><strong>Type 14 / 15</strong> — non-VSAM dataset OPEN (14) and CLOSE (15) — every dataset access, who opened it, when, in what mode.</li>
        <li><strong>Type 17 / 18</strong> — dataset SCRATCH (delete) and RENAME.</li>
        <li><strong>Type 30</strong> — Job, Step, and Address Space activity. The single richest record on z/OS: CPU time, elapsed time, EXCP counts per DD, region size, service-class assignment. Subtypes 1–6 cover step start, step end, job start, job end, etc. <strong>This is the chargeback record.</strong></li>
        <li><strong>Type 42</strong> — DFSMS storage statistics (subtypes for VSAM, dataset deletion, volume usage).</li>
        <li><strong>Type 60–65</strong> — VSAM catalog activity and VVDS updates.</li>
        <li><strong>Type 70 / 71 / 72 / 73 / 74 / 75 / 78 / 79</strong> — RMF performance records (CPU activity, paging, workload activity, channel/device activity, etc.). RMF is a writer of SMF records.</li>
        <li><strong>Type 80 / 81 / 83</strong> — RACF security events: every access decision (allowed or denied), every RACF command, every audit event. Type 80 is the security auditor's primary input.</li>
        <li><strong>Type 110</strong> — CICS transaction statistics; one record per transaction (or compressed group) recording response time, CPU, storage.</li>
        <li><strong>Type 119</strong> — TCP/IP statistics: connections, FTP transfers, sockets.</li>
      </ul>
      <p><strong>What controls SMF recording</strong> — the <code>SMFPRMxx</code> member of SYS1.PARMLIB lists which record types are recorded, the recording interval, the active dump dataset(s), and exit routines. Sysprogs tune this carefully because writing too many record types steals CPU from real work; not writing enough leaves blind spots in audits.</p>

      <h2>RMF</h2>
      <p><strong>RMF</strong> is the IBM-supplied performance monitor for z/OS. It samples and aggregates resource-utilisation data continuously and presents it in three different "monitors," each with a different time horizon and level of detail. RMF is what you run when someone asks "is the system healthy?" or "why is this batch window slipping?" or "how many MIPS are we actually using?"</p>
      <ul>
        <li><strong>Monitor I — Long-term interval recording</strong>. Continuously running background data collector; aggregates over a fixed interval (typically 15 or 30 minutes) and writes the result to SMF as type 70/71/72/74/75/78/79 records. After a day or a week of Monitor I data, the post-processor (RMFPP) crunches the SMF dump and produces capacity-planning reports: CPU activity per LPAR, paging rates, channel utilisation, workload-by-service-class throughput. This is the <strong>historical</strong> monitor.</li>
        <li><strong>Monitor II — On-demand snapshot</strong>. ISPF panels that show a point-in-time snapshot when you press Enter: address space CPU usage, real-storage frame counts, ASID detail. Reaches via <code>=R.2</code> or RMF main menu option 2. Best for "what is happening right now" inquiries — much lower-level detail than Monitor III but instant.</li>
        <li><strong>Monitor III — Real-time service-level analysis</strong>. The most sophisticated and most commonly used monitor. Continuously samples (every few seconds) and presents the data through ISPF panels that update live. Reaches via <code>=R.3</code>. Key panels: <strong>SYSINFO</strong> (sysplex overview), <strong>CPC</strong> (CEC/LPAR view), <strong>SYSSUM</strong> (workload summary), <strong>WFEX</strong> (workflow exception — what is running below WLM goal right now), <strong>JOB</strong> (per-address-space details). Monitor III is what you open when something is wrong <em>right now</em> and you need to see why.</li>
      </ul>

      <h2>UNIX System Services (USS)</h2>
      <p><strong>UNIX System Services</strong> (also called z/OS UNIX, or by its older name <strong>OpenEdition MVS</strong>) is the POSIX-compliant Unix environment built into z/OS. It is not an emulation layer or a separate operating system — it is a fully integrated set of services that live alongside the classic MVS workload. Modern z/OS is two operating systems sharing one kernel: the traditional MVS world of jobs, datasets, JCL, and TSO, and the Unix world of processes, files, fork/exec, and a Bourne-derived shell. Many critical z/OS components (TCP/IP, the WebSphere stack, IBM HTTP Server, SSH, Java, Db2 utilities, z/OSMF) run inside USS rather than as classic MVS started tasks.</p>
      <p><strong>Two filesystems coexist:</strong></p>
      <ul>
        <li><strong>The MVS catalog and datasets</strong> — what TSO and JCL operate on. Names look like <code>Z12345.PAYROLL.DATA</code>; they live on DASD volumes and are tracked in the ICF catalog and per-volume VTOCs.</li>
        <li><strong>The USS hierarchical filesystem</strong> — what looks like a normal Unix tree under <code>/</code>. Files have lowercase names, paths use forward slashes, permissions are the familiar <code>rwxrwxrwx</code> mode bits, owners are POSIX UIDs/GIDs (mapped to RACF user IDs through the OMVS segment).</li>
      </ul>
      <p>The USS root <code>/</code> is mounted from a special VSAM Linear Dataset (an LDS holding a <strong>zFS</strong> filesystem on modern systems, or older HFS on legacy ones). Subdirectories like <code>/usr</code>, <code>/etc</code>, <code>/tmp</code>, <code>/u</code>, <code>/var</code> are each separate zFS filesystems mounted onto the root tree at IPL time, exactly like Linux <code>/etc/fstab</code>.</p>
      <p><strong>The OMVS shell:</strong> from TSO READY (or ISPF Command Shell, option 6) type <code>OMVS</code>. This drops you into a Bourne-style shell session running in your USS environment. You start in your home directory (typically <code>/u/yourid</code>). From here, normal Unix commands work: <code>ls</code>, <code>cd</code>, <code>cat</code>, <code>cp</code>, <code>mv</code>, <code>rm</code>, <code>chmod</code>, <code>chown</code>, <code>grep</code>, <code>find</code>, <code>vi</code>. To exit OMVS and return to TSO, type <code>exit</code> (or press F2 in some terminals).</p>
      <p><strong>OEDIT and OBROWSE</strong> let you edit/view USS files inside ISPF instead of vi: type <code>OEDIT /path/to/file</code> at TSO READY to open the file in the familiar ISPF Editor. Useful when vi feels alien; it gives you the same line commands and primary commands as classic ISPF Edit but operates on USS files.</p>
      <p><strong>BPXBATCH</strong> is the JCL bridge: the program that lets you run a USS shell command or shell script from a batch job. <code>EXEC PGM=BPXBATCH,PARM='SH /u/Z12345/myscript.sh'</code> runs the script as if from the shell, capturing stdout/stderr to STDOUT/STDERR DDs. This is how Unix-style automation gets integrated into the JES batch stream.</p>

      <h2>Sources &amp; References</h2>
      <div style="margin-top:20px; padding:20px; background-color:#e8f4f8; border-left:5px solid #0066cc; border-radius:4px; font-size:0.9em; line-height:1.8;">
        <ul style="margin: 0; padding-left: 20px; list-style-type:none;">
          <li>• <a href="https://www.ibm.com/docs/en/zos/2.5.0?topic=zos-sdsf-users-guide" target="_blank" style="color:#0066cc; text-decoration:none;">SDSF User's Guide</a> (Publication SA23-2274) — every panel, every line command, every action character</li>
          <li>• <a href="https://www.ibm.com/docs/en/zos/2.5.0?topic=zos-mvs-system-management-facilities-smf" target="_blank" style="color:#0066cc; text-decoration:none;">MVS System Management Facilities (SMF)</a> (Publication SA38-0667) — record-type reference, SMFPRMxx tuning</li>
          <li>• <a href="https://www.ibm.com/docs/en/zos/2.5.0?topic=zos-rmf-users-guide" target="_blank" style="color:#0066cc; text-decoration:none;">RMF User's Guide</a> (Publication SC34-2664) — Monitor I/II/III with full panel index</li>
          <li>• <a href="https://www.ibm.com/docs/en/zos/2.5.0?topic=zos-unix-system-services-users-guide" target="_blank" style="color:#0066cc; text-decoration:none;">z/OS UNIX System Services User's Guide</a> (Publication SA23-2279) — OMVS, OEDIT, BPXBATCH, file system structure</li>
          <li>• <a href="https://www.ibm.com/docs/en/zos/2.5.0?topic=zos-unix-system-services-command-reference" target="_blank" style="color:#0066cc; text-decoration:none;">z/OS UNIX Command Reference</a> (Publication SA23-2280) — every USS shell command</li>
          <li>• <a href="https://www.redbooks.ibm.com/abstracts/sg247663.html" target="_blank" style="color:#0066cc; text-decoration:none;">IBM Redbook SG24-7663</a> — ABCs of z/OS System Programming Vol. 9 (SDSF, SMF, RMF deep dive)</li>
          <li>• <a href="https://www.redbooks.ibm.com/abstracts/sg247035.html" target="_blank" style="color:#0066cc; text-decoration:none;">IBM Redbook SG24-7035</a> — z/OS UNIX System Services Recovery and Availability</li>
        </ul>
      </div>
    `,
    mcq: [
      { question: "Which SDSF panel shows the system operator log?", options: ["ST", "DA", "H", "LOG"], answer: 3, explanation: "The SDSF LOG panel displays the running stream of operator messages, console replies, and system events." },
      { question: "What SMF record type records job step termination information including CPU and EXCP counts?", options: ["Type 14", "Type 30", "Type 70", "Type 80"], answer: 1, explanation: "SMF type 30 (Job/Step/Address Space activity) is the chargeback record — it carries CPU time, elapsed time, EXCP counts per DD, and service-class assignment." },
      { question: "Which RMF monitor provides real-time service-level analysis with continuously updating ISPF panels?", options: ["Monitor I", "Monitor II", "Monitor III", "Monitor IV"], answer: 2, explanation: "Monitor III samples every few seconds and presents live-updating panels (SYSINFO, WFEX, JOB) — the go-to monitor when something is wrong right now." },
      { question: "What command opens a USS shell session from TSO READY?", options: ["CALL USS", "OMVS", "BPXBATCH SHELL", "USSSTART"], answer: 1, explanation: "OMVS starts an interactive UNIX System Services shell session from a TSO terminal." },
      { question: "In SDSF, how do you browse a job's SYSOUT?", options: ["Type B next to the job in ST/H, then S next to the SYSOUT DD", "Type X next to the job", "Use ISPF 2 with the job name", "Issue TSO BROWSE job.name"], answer: 0, explanation: "On ST or H, type S (or just press Enter) on the job to expand its DD list, then S/B on a DD (e.g., JESYSMSG) to browse it." },
      { question: "What does the SDSF PREFIX command do?", options: ["Sets a TSO command prefix", "Filters the panel to show only jobs whose names start with the specified pattern", "Defines the spool dataset prefix", "Sets the print class prefix"], answer: 1, explanation: "PREFIX limits the displayed jobs to those matching a name pattern — essential to find your own work on a busy system. OWNER is the matching filter for who submitted the job." },
      { question: "In SDSF, which line command cancels a running job and forces a dump for diagnosis?", options: ["P", "C", "CD", "K"], answer: 2, explanation: "C cancels a job; CD cancels and forces an SVC dump (useful when you need to capture state for a hung-job diagnosis)." },
      { question: "Which SMF record type captures RACF security events such as access decisions and audit events?", options: ["Type 30", "Type 70", "Type 80", "Type 110"], answer: 2, explanation: "Type 80 is the security event record — every RACF allow/deny decision, every RACF command, every audit event. The auditor's primary input." },
      { question: "What is the key difference between RMF Monitor I and Monitor II?", options: ["Monitor I is graphical; Monitor II is text-only", "Monitor I writes long-term interval data to SMF for capacity planning; Monitor II is on-demand point-in-time snapshots in ISPF panels", "Monitor I requires a license; Monitor II is free", "There is no difference"], answer: 1, explanation: "Monitor I is the historical recorder (writes type 70+ to SMF every interval); Monitor II is interactive — press Enter for a snapshot of current address-space activity." },
      { question: "What is BPXBATCH used for?", options: ["Creating a new TSO user", "Running USS shell commands or scripts from a batch job, capturing stdout/stderr to JCL DDs", "Backing up the spool", "Defining RACF profiles for USS"], answer: 1, explanation: "BPXBATCH is the JCL bridge to USS: EXEC PGM=BPXBATCH,PARM='SH /path/to/script' executes a USS shell script from a batch job." },
      { question: "Where do USS user home directories typically live?", options: ["/home/userid", "/u/userid", "/users/userid", "/usr/userid"], answer: 1, explanation: "The convention on z/OS is /u/userid for each user's home — defined in their RACF OMVS segment HOME() value. Linux-style /home is not used." },
      { question: "Which TSO command lets you edit a USS file inside ISPF instead of using vi?", options: ["TEDIT", "OEDIT", "ISPEDIT", "USSEDIT"], answer: 1, explanation: "OEDIT /path/to/file opens the USS file in the ISPF Editor with the familiar primary and line commands. OBROWSE does the same in read-only mode." }
    ],
    practical: [
      {
        title: "Task 1 — Tour the SDSF Panels and Set Up Filters for Your Own Jobs",
        description: "Open SDSF, set PREFIX/OWNER filters so you only see your own work, then visit the ST, DA, H, and LOG panels in turn to understand what each one shows. This is the single most important hands-on exercise for becoming productive on z/OS — every operational question starts in SDSF.",
        hints: [
          "Hint 1: From any ISPF panel type =SD on the command line and press Enter — that jumps you straight to the SDSF Primary Menu. (Some sites use =SDSF; if =SD doesn't work, try the long form.)",
          "Hint 2: On the SDSF Primary Menu type ST + Enter to reach the Status panel. By default it shows every job on the system, which on a busy site is hundreds of rows.",
          "Hint 3: On the ST command line type PREFIX Z12345* + Enter (substitute your TSO ID) — the list shrinks to just jobs whose names start with your ID. Then OWNER Z12345 + Enter restricts further to jobs you submitted.",
          "Hint 4: While on ST, scroll with F7/F8. Use the SET DISPLAY command to add columns (job class, queue, return code) — type SET DISPLAY ON to see all available column groups.",
          "Hint 5: Switch to other panels by typing their two-letter code on the command line: DA (currently active), H (held output), I (input queue), O (output queue), LOG (system log). On LOG, the / command lets you scroll forward in time; F7 backward.",
          "Hint 6: To get back to the SDSF Primary Menu from any sub-panel, type =M (or just M alone). To leave SDSF entirely, F3 back to ISPF."
        ],
        solution: "<strong>Expected flow and what each panel teaches you:</strong><br><br>1. <code>=SD</code> → SDSF Primary Menu. You'll see the list of available panels (ST, DA, I, O, H, LOG, PR, INIT, SR, etc.). Type ST + Enter.<br>2. <code>PREFIX Z12345*</code> + Enter, then <code>OWNER Z12345</code> + Enter. The panel header now reads something like <code>SDSF STATUS DISPLAY ALL CLASSES   PREFIX=Z12345*  DEST=(ALL)  OWNER=Z12345</code>. Only your jobs appear.<br>3. ST columns explained: JOBNAME, JOBID (e.g., JOB12345), OWNER, PRTY (priority), C (queue: A=active, I=input, O=output), CLASS, ODISP (output disposition: HELD, WTR, etc.), DEST, TOT-REC, TOT-PAGE, MAX-LN. The <code>C</code> column tells you at a glance where each job is in its lifecycle.<br>4. Type <code>DA</code> + Enter → Display Active. Shows currently-running address spaces with CPU%, EXCP I/O, REAL/PAGED storage. If it scrolls fast you can see CPU% creeping up on busy address spaces — the closest thing on z/OS to <code>top</code>.<br>5. Type <code>H</code> + Enter → Held Output. With the same PREFIX/OWNER filters, this shows all your completed jobs whose MSGCLASS=H output is sitting on the spool waiting for someone to look at it.<br>6. Type <code>LOG</code> + Enter → System Log. You see live system messages — IEF403I (job started), IEA989I (paging events), IEF285I (dataset disposition), IRR012I (RACF decisions on AUDITed resources). Press F8 to page forward (newer messages), F7 to page back. The / command jumps to the most recent line.<br><br><strong>What to take away:</strong> almost every operational question on z/OS — 'did my job run?', 'why did it fail?', 'is the system busy?', 'what's my return code?' — answers itself within these four panels. The PREFIX/OWNER filters persist for your session, so once you've set them they stay until you clear them with <code>PREFIX *</code> / <code>OWNER *</code>. Common pitfall: forgetting that PREFIX matches against the JES <em>job name</em>, not the dataset HLQ — they happen to be the same on most sites because TSO submissions create jobs named after the user, but if you submit a job with explicit JOB-statement name 'PAYROLL' it won't appear under PREFIX Z12345*."
      },
      {
        title: "Task 2 — Submit a Job and Trace Its Lifecycle Through SDSF",
        description: "Submit a tiny no-op job, then follow it through the SDSF panels: catch it in I (input) if you're quick, see it in DA (active) while it runs, then find it in H (held output) once complete. Drill into the output to read the JESMSGLG, the JESJCL, and the JESYSMSG step termination messages — including the all-important RC line.",
        hints: [
          "Hint 1: Edit a member of one of your CNTL libraries (e.g., Z12345.TEST.CNTL(NOOPJOB)) and paste a one-step IEFBR14 job: //NOOPJOB JOB (ACCT),'NO-OP TEST',CLASS=A,MSGCLASS=H,NOTIFY=&SYSUID  followed by  //STEP1 EXEC PGM=IEFBR14",
          "Hint 2: Submit with the SUB command on the ISPF Edit command line. ISPF immediately responds with a job ID (e.g., 'JOB12345 submitted'). Note the job ID.",
          "Hint 3: Switch to SDSF =SD and try ST or H — IEFBR14 finishes in milliseconds so it'll be in H almost instantly. PREFIX/OWNER from Task 1 should already be filtering correctly.",
          "Hint 4: On H, type S (or just Enter) next to your job → expands to the DD list (JESMSGLG, JESJCL, JESYSMSG, plus any program output DDs). Type S on each in turn and read what's there.",
          "Hint 5: The return code is in JESYSMSG — look for the line 'IEF142I NOOPJOB STEP1 - STEP WAS EXECUTED - COND CODE 0000'. RC=0000 means everything ran cleanly. On a failed job RC is 0008, 0012, etc., and additional IEF or IGD error messages explain why.",
          "Hint 6: When done, return to the H panel and type P next to the job to purge it from the spool — keeps your held output clean."
        ],
        solution: "<strong>Step-by-step expected output:</strong><br><br>1. Allocate (or reuse) Z12345.TEST.CNTL via 3.2 if needed. Edit member NOOPJOB and paste:<pre style=\"background:#0d0d0d;color:#ffb000;padding:1rem;border-radius:4px;overflow-x:auto;font-family:'Share Tech Mono',monospace;font-size:.88rem;line-height:1.45;margin:.6rem 0;\">//NOOPJOB  JOB (ACCT),'NO-OP TEST',CLASS=A,MSGCLASS=H,NOTIFY=&amp;SYSUID\n//STEP1    EXEC PGM=IEFBR14</pre>2. On the Edit command line type <code>SUB</code> + Enter → ISPF replies <code>JOB Z12345A(JOB12345) SUBMITTED</code>.<br>3. <code>=SD;H</code> (jump to SDSF, then to Held Output). The job appears with JOBID=JOB12345, OWNER=Z12345, MAX-RC=0, ODISP=HELD.<br>4. Type S next to the job line + Enter → DD list:<pre style=\"background:#0d0d0d;color:#ffb000;padding:.6rem;border-radius:4px;overflow-x:auto;font-family:'Share Tech Mono',monospace;font-size:.85rem;margin:.4rem 0;\">DDNAME      STEPNAME    DSID    CLASS    BYTE-COUNT\nJESMSGLG    JES2          2     H            1234\nJESJCL      JES2          3     H             456\nJESYSMSG    JES2          4     H             789</pre>5. S on JESMSGLG → the job log: lines like \\$HASP373 NOOPJOB STARTED, IEF403I NOOPJOB - STARTED, IEF404I NOOPJOB - ENDED, \\$HASP395 NOOPJOB ENDED.<br>6. S on JESJCL → the JCL exactly as JES processed it (with symbolic substitution applied — &amp;SYSUID expanded to your TSO ID).<br>7. S on JESYSMSG → allocation/deallocation and step messages. The key line:<pre style=\"background:#0d0d0d;color:#ffb000;padding:.6rem;border-radius:4px;overflow-x:auto;font-family:'Share Tech Mono',monospace;font-size:.85rem;margin:.4rem 0;\">IEF142I NOOPJOB STEP1 - STEP WAS EXECUTED - COND CODE 0000\nIEF373I STEP/STEP1   /START 2026123.1422\nIEF374I STEP/STEP1   /STOP  2026123.1422 CPU    0MIN 00.00SEC SRB ...</pre>8. F3 back to the H panel, type P next to the job + Enter → 'Purge requested' and the entry disappears.<br><br><strong>Key lesson:</strong> SDSF's drill-down (job → DD list → DD content) is the universal diagnostic flow. Every batch problem ends with you in JESYSMSG looking at IEF142I or IEF453I (JCL ERROR) lines. Master this flow and you've mastered 80% of operational z/OS troubleshooting. Variations: try purposely breaking the job (e.g., add a typo to JOB statement) and resubmit — observe how the DD list changes (JCL errors mean the job never executes; you only see JESMSGLG and JESJCL, no JESYSMSG step entries)."
      },
      {
        title: "Task 3 — Open a USS Shell with OMVS and Explore the Filesystem",
        description: "Start an OMVS session from TSO, navigate the USS filesystem with ls/cd/pwd, create a small text file with a Unix command, set its permissions with chmod, and finally open the same file from ISPF using OEDIT to confirm the two worlds (USS and TSO/ISPF) really do share one filesystem.",
        hints: [
          "Hint 1: From TSO READY (or ISPF Command Shell, option 6) type OMVS + Enter. The screen clears and you get a Bourne-style $ prompt. Your starting directory is /u/yourID (your home).",
          "Hint 2: Verify with pwd. Then ls -la to see what's in your home (often empty or .profile / .sh_history depending on whether you've used USS before).",
          "Hint 3: Create a small text file with: echo 'hello from USS' > greeting.txt. Then cat greeting.txt to confirm. Then ls -l greeting.txt to see size and permissions.",
          "Hint 4: Change permissions with chmod 640 greeting.txt (rw-r----- = owner read+write, group read, others nothing). ls -l again confirms the new mode bits.",
          "Hint 5: Type exit + Enter to leave OMVS and return to TSO READY.",
          "Hint 6: From TSO READY (or option 6) type OEDIT '/u/yourID/greeting.txt' + Enter. The file opens in the ISPF Editor — exactly like a normal MVS dataset edit, but the data lives in the USS hierarchical filesystem. Add a line, save with F3, then return to OMVS and cat the file again to see your edit. This proves the two worlds share one filesystem.",
          "Hint 7: To see the USS root: cd / + Enter, then ls. You'll see /usr, /etc, /tmp, /u, /var, /bin, /lib — same as a Linux box."
        ],
        solution: "<strong>Expected interaction:</strong><pre style=\"background:#0d0d0d;color:#ffb000;padding:1rem;border-radius:4px;overflow-x:auto;font-family:'Share Tech Mono',monospace;font-size:.88rem;line-height:1.45;margin:.6rem 0;\">READY\nOMVS\n\n[your screen clears, OMVS shell opens]\n\n$ pwd\n/u/Z12345\n$ ls -la\ntotal 16\ndrwxr-xr-x   2 Z12345   USER          8192 May  3 14:30 .\ndrwxr-xr-x  42 ROOT     SYS1          8192 Apr 30 09:12 ..\n-rw-------   1 Z12345   USER           412 May  3 14:25 .sh_history\n$ echo 'hello from USS' > greeting.txt\n$ cat greeting.txt\nhello from USS\n$ ls -l greeting.txt\n-rw-r--r--   1 Z12345   USER            16 May  3 14:31 greeting.txt\n$ chmod 640 greeting.txt\n$ ls -l greeting.txt\n-rw-r-----   1 Z12345   USER            16 May  3 14:31 greeting.txt\n$ cd /\n$ ls\nbin   dev   etc   lib   opt   sbin  tmp   usr   u     var\n$ exit\n\n[returns to TSO READY]</pre><strong>From TSO READY then ISPF:</strong><pre style=\"background:#0d0d0d;color:#ffb000;padding:1rem;border-radius:4px;overflow-x:auto;font-family:'Share Tech Mono',monospace;font-size:.88rem;line-height:1.45;margin:.6rem 0;\">READY\nOEDIT '/u/Z12345/greeting.txt'\n\n[ISPF Editor opens on the USS file:]\n\nFile  Edit  Edit_Settings  Menu  Utilities ...\n EDIT       /u/Z12345/greeting.txt\n Command ===&gt;\n ****** ***************************** Top of Data ************\n 000001 hello from USS\n 000002 added from ISPF\n ****** *************************** Bottom of Data ***********</pre><strong>What to take away:</strong> (1) USS files and MVS datasets coexist on the same z/OS — your RACF user ID is your identity in both worlds, with the OMVS segment of your RACF profile providing the UID/GID mapping. (2) Permissions follow the standard POSIX mode-bit model (chmod, chown, chgrp). (3) The home directory layout (<code>/u/userid</code>) is the z/OS convention; <code>/home</code> is not used. (4) OEDIT bridges the two cultures — Unix-style file in ISPF Editor — and is invaluable when you prefer ISPF muscle memory to vi. (5) BPXBATCH (mentioned in the content) is the matching bridge from JCL into the shell — useful when a Unix-world tool needs to run as part of a batch pipeline.<br><br><strong>If commands fail:</strong> 'Cannot find HOME directory' usually means your RACF user ID has no OMVS segment defined (rare on systems where USS is in active use); ask the sysprog. 'Permission denied' on /tmp or other system directories is normal and expected — explore your own home and /tmp where everyone can write. On a stripped-down Hercules ADCD some USS components may not be active; if OMVS gives an immediate error, the system may not have USS started — this task is then for-reading-only."
      }
    ]
  },

  //  Batch Processing & JCL (2 cards) 

  {
    id: "l1-jcl-core",
    level: 1,
    category: "Batch Processing & JCL",
    title: "JCL Core Statements & Conditional Logic",
    summary: "JOB, EXEC, and DD statement syntax and key parameters; return code interpretation; COND parameter; and IF/THEN/ELSE/ENDIF conditional step control.",
    content: `
      <h2>JCL Overview</h2>
      <p><strong>JCL (Job Control Language)</strong> is the batch job description language for z/OS. Every batch job submitted to JES — whether it runs IDCAMS, COBOL programs, DFSORT, or a Java application under USS — begins as a JCL deck: a small text file (always FB,80) describing what programs to run, what datasets to allocate, what to do if something fails, and how to dispose of the work when finished. JCL is not a programming language in the conventional sense — there are no variables, no loops, no expressions to evaluate at runtime. It is a <em>declarative resource specification</em>: you tell JES what you want, JES sets it up before each step starts, and the program then runs against the pre-allocated environment.</p>
      <p>Three statement types form 95% of JCL:</p>
      <ul>
        <li><code>//jobname JOB ...</code> — exactly one per deck, always first; identifies the job to JES.</li>
        <li><code>//stepname EXEC ...</code> — one per program-execution step; multiple steps run in sequence.</li>
        <li><code>//ddname DD ...</code> — one per file the step needs; allocated by JES before the step starts and deallocated after.</li>
      </ul>
      <p><strong>Syntax rules:</strong> every JCL statement starts with <code>//</code> in columns 1–2; the name field begins in column 3 (max 8 characters); the operation (JOB / EXEC / DD) follows after a space; parameters follow after another space. Continuation: end a line with a comma after a complete sub-parameter and continue on the next line starting with <code>//</code> in columns 1–2 and the next parameter starting in columns 4–16. Comments: <code>//*</code> in columns 1–3 makes the rest of the line a comment. The instream-data delimiter <code>/*</code> in columns 1–2 ends a SYSIN data block.</p>

      <h2>JOB Statement</h2>
      <p>The JOB statement identifies the job to JES, sets job-wide defaults, and provides the accounting information that drives chargeback and audit. Skeleton:</p>
      <pre style="background:#0d0d0d;color:#ffb000;padding:1rem;border-radius:4px;overflow-x:auto;font-family:'Share Tech Mono',monospace;font-size:.88rem;line-height:1.45;margin:.6rem 0;">//Z12345A  JOB (ACCT,DEPT),'Z12345',CLASS=A,MSGCLASS=H,
//             MSGLEVEL=(1,1),NOTIFY=&amp;SYSUID,REGION=0M,TIME=NOLIMIT</pre>
      <p>Key parameters:</p>
      <ul>
        <li><strong>Positional</strong> — the first thing after JOB. <code>(ACCT,DEPT)</code> is the accounting field (site-defined; some shops require billing codes here). The second positional is the programmer-name string in single quotes (used in headers).</li>
        <li><strong>CLASS=</strong> — JES2 input-queue class (single letter A–Z, 0–9). Each class has its own queue, priority, and pool of initiators; sites assign meanings like A=short test, B=longer batch, X=overnight production.</li>
        <li><strong>MSGCLASS=</strong> — JES2 output class for the job's JES messages and held output (the JESMSGLG/JESJCL/JESYSMSG DDs). H=held (browse from SDSF), A=printable, X=delete after print.</li>
        <li><strong>MSGLEVEL=(s,m)</strong> — controls which JCL statements (s) and JES allocation messages (m) are written to JESJCL/JESYSMSG. (1,1) is the standard verbose setting.</li>
        <li><strong>NOTIFY=&amp;SYSUID</strong> — when the job ends, send the named user a TSO SEND notification. <code>&amp;SYSUID</code> is a system-supplied symbol that resolves to the submitting user ID.</li>
        <li><strong>REGION=</strong> — virtual-storage limit for every step. <code>REGION=0M</code> means "give me as much as the system allows" and is the standard for jobs that need lots of memory; sites may cap it.</li>
        <li><strong>TIME=</strong> — CPU-time limit. <code>TIME=NOLIMIT</code> removes the cap; default is site-set.</li>
        <li><strong>TYPRUN=SCAN</strong> — submit but don't run; just check JCL syntax. <code>TYPRUN=HOLD</code> submits and holds in input queue until released.</li>
        <li><strong>RESTART=stepname</strong> — re-submit a failed job and resume from the named step instead of step 1.</li>
        <li><strong>COND=(rc,op)</strong> — job-level condition: skip every remaining step if the test is true.</li>
      </ul>

      <h2>EXEC Statement</h2>
      <p>Each EXEC defines one job step. A step either runs a program directly with <code>PGM=</code> or invokes a catalogued procedure with <code>PROC=</code>. Skeleton:</p>
      <pre style="background:#0d0d0d;color:#ffb000;padding:1rem;border-radius:4px;overflow-x:auto;font-family:'Share Tech Mono',monospace;font-size:.88rem;line-height:1.45;margin:.6rem 0;">//STEP1    EXEC PGM=IDCAMS,REGION=0M,COND=(4,LT)
//STEP2    EXEC PROC=MYPROC,SYM1=VAL1,SYM2=VAL2</pre>
      <ul>
        <li><strong>PGM=</strong> — name of an executable load module to run. JES searches the JOBLIB / STEPLIB / LNKLST / LPALST in order to locate the module. Common standalone programs: IDCAMS, IEBGENER, IEBCOPY, IEFBR14, ICEMAN/SORT, IKJEFT01 (TSO in batch).</li>
        <li><strong>PROC=</strong> (or just bare procname) — invoke a catalogued procedure stored in a PROCLIB PDS, optionally overriding its symbolic parameters.</li>
        <li><strong>PARM=</strong> — passes a string (max 100 chars usually) to the program through register 1. Many programs read PARM as their top-level options. For COBOL/PL/I main programs this becomes the "command-line" parameter.</li>
        <li><strong>REGION=</strong> — step-level virtual-storage limit (overrides JOB-level REGION for this step only).</li>
        <li><strong>TIME=</strong> — step-level CPU-time limit.</li>
        <li><strong>COND=(rc,op[,stepname])</strong> — skip this step if the condition is true based on a prior step's RC (see below).</li>
        <li><strong>ACCT=</strong> — per-step accounting override.</li>
      </ul>

      <h2>DD Statement</h2>
      <p>Every external resource a step touches — input file, output file, in-stream data, SYSOUT, dump dataset, USS path — is described by a DD statement. The DD name (between <code>//</code> and the operation) is what the program uses to refer to the resource; the rest tells JES how to allocate it.</p>
      <p><strong>Common parameter set:</strong></p>
      <ul>
        <li><strong>DSN=</strong> — dataset name. Quote with single quotes if the name contains characters JES wouldn't accept unquoted, or to bypass the TSO-prefix substitution. Use <code>DSN=&amp;TEMP</code> for a job-scoped temporary dataset (deleted at job end).</li>
        <li><strong>DISP=(status,normal-end,abnormal-end)</strong> — three sub-parameters: <em>initial status</em> (NEW = create; OLD = use exclusively; SHR = use sharing; MOD = append), <em>normal disposition</em> (KEEP, CATLG, DELETE, PASS, UNCATLG), <em>abnormal disposition</em> (same options). Common patterns: <code>(NEW,CATLG,DELETE)</code>, <code>(SHR,KEEP,KEEP)</code>, <code>(MOD,CATLG,DELETE)</code>, <code>(OLD,DELETE,DELETE)</code>.</li>
        <li><strong>UNIT=</strong> — device class (SYSDA = any DASD, SYSALLDA, TAPE) or specific unit number. Often omitted under SMS.</li>
        <li><strong>VOL=SER=</strong> — request a specific volume. Usually omitted; SMS picks.</li>
        <li><strong>SPACE=(unit,(primary,secondary[,directory]))</strong> — allocation in TRK / CYL / blocks; directory blocks only for PDS.</li>
        <li><strong>DCB=(RECFM=,LRECL=,BLKSIZE=,DSORG=)</strong> — physical record format; BLKSIZE=0 lets z/OS pick optimum (System-Determined Block Size).</li>
        <li><strong>DSNTYPE=</strong> — LIBRARY for PDSE, PDS for classic, BASIC/EXTREQ/EXTPREF for sequential variants.</li>
        <li><strong>SYSOUT=class</strong> — for printer/output streams: <code>SYSOUT=*</code> uses the job's MSGCLASS, <code>SYSOUT=H</code> sends to held class, <code>SYSOUT=A</code> goes to standard print.</li>
        <li><strong>* (instream)</strong> — <code>//SYSIN DD *</code> followed by lines of data and ending with <code>/*</code> embeds data directly in the JCL. Useful for IDCAMS control statements, SORT cards, COBOL parm files.</li>
        <li><strong>DUMMY</strong> — allocates a no-op file. Reads return EOF immediately; writes are discarded. Useful for selectively disabling DDs without changing the program.</li>
        <li><strong>PATH=</strong> — references a USS file as if it were a sequential dataset.</li>
      </ul>
      <p><strong>Special DD names</strong> the system recognises:</p>
      <ul>
        <li><code>SYSIN</code> — conventional name for program input data (in-stream or dataset).</li>
        <li><code>SYSPRINT</code> — conventional name for program output messages and reports.</li>
        <li><code>SYSOUT</code> — utility-specific report output.</li>
        <li><code>SYSUDUMP</code> — formatted user storage dump on abend.</li>
        <li><code>SYSABEND</code> — full abend dump (system + user storage). Larger than SYSUDUMP.</li>
        <li><code>SYSMDUMP</code> — machine-readable dump for use with IPCS analysis.</li>
        <li><code>JOBLIB</code> / <code>STEPLIB</code> — concatenated load-module libraries searched ahead of LNKLST when locating PGM= modules. JOBLIB applies to every step; STEPLIB to only the step it's coded under.</li>
      </ul>

      <h2>Return Codes</h2>
      <p>Every step ends with a numeric <strong>return code (RC)</strong> in the range 0–4095, set by the program. Most IBM utilities follow a convention:</p>
      <ul>
        <li><strong>RC=0</strong> — clean success. Everything worked as expected.</li>
        <li><strong>RC=4</strong> — warning. Step completed but something noteworthy happened (e.g., IDCAMS reports "no records to copy"; SORT reports "no records selected by INCLUDE"). Often acceptable.</li>
        <li><strong>RC=8</strong> — error but recoverable. Usually means input data was bad or a recoverable error occurred. The step ran to completion but didn't do what was asked.</li>
        <li><strong>RC=12</strong> — severe error. The step failed in a way that almost certainly invalidates downstream work.</li>
        <li><strong>RC=16</strong> — terminating error. Cannot continue meaningful work.</li>
        <li><strong>System abend (Sxxx)</strong> — the program didn't even return; the system terminated it (S0C7 = data exception, S806 = module not found, S322 = time exceeded, S013 = open error, Sx37 = out-of-space). Abends usually set RC=4095 internally but are reported separately as the abend code.</li>
      </ul>
      <p>The IEF142I message in JESYSMSG carries the RC for each step, e.g., <code>IEF142I JOBNAME STEP1 - STEP WAS EXECUTED - COND CODE 0004</code>. The job-level MAXCC (visible in SDSF) is the highest RC any step set.</p>

      <h2>The COND Parameter (Older Syntax)</h2>
      <p>Before IF/THEN/ELSE existed, conditional step execution was controlled by <strong>COND=</strong>. The logic reads <em>backwards</em> compared to most programming languages: <code>COND=(rc,op[,stepname])</code> means "<em>skip</em> this step if the condition <code>(prior_step.RC op rc)</code> evaluates to TRUE." So <code>COND=(0,LT)</code> means "skip if 0 LT prior_step.RC" — which is true whenever the prior step had RC > 0.</p>
      <p>The six operators: <strong>EQ</strong> (equal), <strong>NE</strong> (not equal), <strong>LT</strong> (less than), <strong>LE</strong> (less or equal), <strong>GT</strong> (greater than), <strong>GE</strong> (greater or equal). Without a stepname, COND tests against every prior step's RC. With a stepname (<code>COND=(8,LT,STEP1)</code>) it tests only that one step.</p>
      <p>Multiple conditions: <code>COND=((4,LT,STEP1),(8,EQ,STEP2))</code> — skip if any of the listed tests is true.</p>
      <p>COND syntax is notoriously confusing because of the inverted logic. It is still found in legacy JCL but new code should prefer IF/THEN/ELSE/ENDIF.</p>

      <h2>IF / THEN / ELSE / ENDIF</h2>
      <p>The modern construct expresses conditional logic the natural way: <em>run</em> if the condition is true, instead of <em>skip</em> if true. Example:</p>
      <pre style="background:#0d0d0d;color:#ffb000;padding:1rem;border-radius:4px;overflow-x:auto;font-family:'Share Tech Mono',monospace;font-size:.88rem;line-height:1.45;margin:.6rem 0;">//STEP1    EXEC PGM=IDCAMS
//SYSPRINT DD  SYSOUT=*
//SYSIN    DD  *
  LISTCAT ENTRIES(SOMETHING)
/*
//
// IF (STEP1.RC = 0) THEN
//STEP2    EXEC PGM=IEFBR14
//OUTDD    DD  DSN=&amp;SYSUID..NEW.DATASET,
//             DISP=(NEW,CATLG,DELETE),
//             SPACE=(TRK,(2,1)),
//             DCB=(RECFM=FB,LRECL=80,BLKSIZE=0)
// ELSE
//STEPALT  EXEC PGM=IEFBR14
// ENDIF</pre>
      <p>Operators inside IF: <strong>=</strong> or EQ, <strong>¬=</strong> or NE, <strong>&lt;</strong> or LT, <strong>&lt;=</strong> or LE, <strong>&gt;</strong> or GT, <strong>&gt;=</strong> or GE. References: <code>STEPNAME.RC</code> (return code), <code>STEPNAME.RUN</code> (true if step executed), <code>STEPNAME.ABEND</code> (true if step abended), <code>RC</code> alone (the highest RC of all prior steps), <code>ABEND</code> (true if any prior step abended).</p>
      <p>IF/THEN/ELSE/ENDIF blocks can nest, can wrap multiple steps, and can use compound conditions with AND/OR/NOT. Always close with ENDIF — JES considers a missing ENDIF a JCL error.</p>

      <h2>Symbolic Parameters and System Symbols</h2>
      <p>JCL supports two kinds of substitution:</p>
      <ul>
        <li><strong>System symbols</strong> begin with <code>&amp;</code> and are pre-defined by the system or by IEASYMxx. The most common: <code>&amp;SYSUID</code> (submitting user ID), <code>&amp;SYSPLEX</code>, <code>&amp;SYSNAME</code>, <code>&amp;SYSCLONE</code>. Used directly in JCL: <code>NOTIFY=&amp;SYSUID</code>, <code>DSN=&amp;SYSUID..MYDATA</code> (the double dot keeps the period as a name separator).</li>
        <li><strong>Symbolic parameters</strong> in catalogued procedures begin with <code>&amp;</code> and are defined on the PROC statement with a default. Overridden at the EXEC PROC= invocation. Covered in detail in the L1 PROCs card.</li>
      </ul>

      <h2>Comments and Continuation</h2>
      <p><strong>Comments:</strong> <code>//* this is a comment</code> — the <code>//*</code> in columns 1–3 marks the line as informational only. Comments are echoed in JESJCL output, useful for documenting intent. JES2 also accepts <code>/*JOBPARM</code>, <code>/*OUTPUT</code>, <code>/*ROUTE</code> JES2 control statements (start in column 1 with single slash).</p>
      <p><strong>Continuation:</strong> end a parameter with a comma, then on the next line restart with <code>//</code> in columns 1–2 and the continuation in columns 4–16 (column 3 must be blank). Most JCL editors auto-format this. Continuation can occur inside any parameter list, but never inside an unbroken keyword or value.</p>

      <h2>Sources &amp; References</h2>
      <div style="margin-top:20px; padding:20px; background-color:#e8f4f8; border-left:5px solid #0066cc; border-radius:4px; font-size:0.9em; line-height:1.8;">
        <ul style="margin: 0; padding-left: 20px; list-style-type:none;">
          <li>• <a href="https://www.ibm.com/docs/en/zos/2.5.0?topic=zos-mvs-jcl-reference" target="_blank" style="color:#0066cc; text-decoration:none;">MVS JCL Reference</a> (Publication SA23-1385) — definitive parameter-by-parameter reference</li>
          <li>• <a href="https://www.ibm.com/docs/en/zos/2.5.0?topic=zos-mvs-jcl-users-guide" target="_blank" style="color:#0066cc; text-decoration:none;">MVS JCL User's Guide</a> (Publication SA23-1386) — task-oriented JCL guide with examples</li>
          <li>• <a href="https://www.ibm.com/docs/en/zos/2.5.0?topic=zos-mvs-jes2-application-programming" target="_blank" style="color:#0066cc; text-decoration:none;">MVS JES2 Application Programming</a> — /*JOBPARM, /*OUTPUT, /*ROUTE control statements</li>
          <li>• <a href="https://www.ibm.com/docs/en/zos/2.5.0?topic=zos-mvs-system-messages-volume-8-ief-igd" target="_blank" style="color:#0066cc; text-decoration:none;">MVS System Messages — IEF and IGD</a> — every job/JCL/SMS message decoded</li>
          <li>• <a href="https://www.redbooks.ibm.com/abstracts/sg246987.html" target="_blank" style="color:#0066cc; text-decoration:none;">IBM Redbook SG24-6987</a> — ABCs of z/OS System Programming Vol. 8 (JCL chapters)</li>
          <li>• IBM Master the Mainframe / zXplore JCL labs — the canonical hands-on starting point.</li>
        </ul>
      </div>
    `,
    mcq: [
      { question: "Which JCL statement must always appear first in a job stream?", options: ["//EXEC", "//DD", "//JOB", "//PROC"], answer: 2, explanation: "The JOB statement is the mandatory first statement in any JCL job — it identifies the job to JES and sets job-wide defaults." },
      { question: "What does DISP=(NEW,CATLG,DELETE) specify?", options: ["New dataset; catalog on success; delete on failure", "Existing dataset; catalog always; delete on failure", "New dataset; always keep; always delete on failure", "Existing dataset; delete on success; keep on failure"], answer: 0, explanation: "The three DISP sub-parameters define: initial status (NEW = allocate), normal-end disposition (CATLG = catalog), and abnormal-end disposition (DELETE = remove)." },
      { question: "What return code typically indicates a warning but not an error on most IBM utilities?", options: ["RC=0", "RC=4", "RC=8", "RC=12"], answer: 1, explanation: "RC=4 is the conventional 'completed with warnings' code — the step ran but something noteworthy happened. RC=0 is clean completion, RC=8+ is error territory." },
      { question: "Which construct replaces the COND parameter with more readable conditional logic?", options: ["PARM=COND", "IF/THEN/ELSE/ENDIF", "WHEN/THEN", "SWITCH/CASE"], answer: 1, explanation: "IF/THEN/ELSE/ENDIF expresses conditions naturally (run if true) instead of COND's inverted 'skip if true' logic." },
      { question: "What is the purpose of the SYSUDUMP DD statement?", options: ["Provide program input data", "Route the formatted user-storage dump if the program abends", "Define VSAM file access", "Specify the output print class"], answer: 1, explanation: "SYSUDUMP captures a formatted dump of user storage on abend. SYSABEND adds system storage; SYSMDUMP is machine-readable for IPCS." },
      { question: "What does &SYSUID resolve to in JCL?", options: ["The system catalog name", "The user ID that submitted the job", "The current sysplex name", "The active SMF system ID"], answer: 1, explanation: "&SYSUID is a system symbol containing the submitting user's TSO ID. Common in NOTIFY=&SYSUID and DSN=&SYSUID..MYFILE patterns." },
      { question: "What does COND=(0,LT) on an EXEC mean?", options: ["Run the step only if RC=0", "Skip the step if any prior step's RC was greater than 0", "Always run the step", "Skip every step including this one"], answer: 1, explanation: "COND tests are 'skip if true.' (0,LT) reads as 'skip if 0 LT priorRC' — true when any prior RC > 0. The inverted logic is COND's biggest pitfall, which is why IF/THEN/ELSE replaced it." },
      { question: "What must be in columns 1–2 of every JCL statement (except instream-data delimiters)?", options: ["The job name", "//", "/*", "Spaces"], answer: 1, explanation: "Two slashes in columns 1–2 mark a JCL statement. //* is a comment, /* in columns 1–2 is the instream-data delimiter, // alone (cols 1–2, blank rest) is the null-statement / end-of-job marker." },
      { question: "What does REGION=0M on the JOB statement request?", options: ["Zero memory (will fail immediately)", "As much virtual storage as the system permits per step", "0 MB cap on real memory", "Default region size"], answer: 1, explanation: "REGION=0M is the conventional way to ask for 'all the storage you can give me, up to the site limit.' Sites typically cap effective REGION via IEFUSI exits regardless." },
      { question: "Which special DD allocates a no-op file (reads return EOF, writes are discarded)?", options: ["DUMMY", "SYSOUT=*", "DSN=NULLFILE", "DISP=DELETE"], answer: 0, explanation: "DD DUMMY allocates a no-op resource. Useful for selectively disabling a DD without changing the calling program." },
      { question: "Inside IF, what does the reference STEP1.ABEND test?", options: ["Whether STEP1's RC is exactly 0", "Whether STEP1 terminated abnormally (system abend)", "Whether STEP1 has not yet run", "Whether STEP1 is still queued"], answer: 1, explanation: "STEP1.ABEND is true when STEP1 ended with a system abend (S0Cx, Sx37, S322, etc.). Combine with STEP1.RC for full conditional control." },
      { question: "What is the maximum length of a step name on an EXEC statement?", options: ["4 characters", "8 characters", "16 characters", "44 characters"], answer: 1, explanation: "Step names (and DD names, and member names) are limited to 8 characters and must start with a letter or national character. The 44-character limit applies to dataset names." }
    ],
    practical: [
      {
        title: "Task 1 — Write and Submit a Two-Step Job, Read the Return Codes",
        description: "Create a simple two-step JCL job: STEP1 runs IDCAMS to LISTCAT a dataset that exists, STEP2 runs IEFBR14 to allocate a new sequential dataset. Submit it, then drill into SDSF to find each step's return code and the messages that explain them. This is the canonical 'first JCL job' exercise that teaches the entire JES → step → output flow.",
        hints: [
          "Hint 1: In Z12345.TEST.CNTL allocate a member named TWOSTEP via ISPF Edit. Paste the JCL skeleton below and substitute Z12345 with your actual user ID.",
          "Hint 2: For STEP1 you want IDCAMS LISTCAT against any dataset you know exists — your own Z12345.TEST.CNTL works (it's the library you're editing in). LISTCAT against an existing dataset returns RC=0; against a nonexistent dataset RC=4.",
          "Hint 3: Submit with the SUB command on the ISPF Edit command line. Note the JOBID returned (e.g., JOB12345).",
          "Hint 4: Switch to SDSF =SD;H, find the job, type S to expand its DDs, then S on JESYSMSG to find the IEF142I lines.",
          "Hint 5: The MAX-RC column on the SDSF H/ST panel shows the highest RC any step set — equals the worst step's RC. Helpful at-a-glance health check."
        ],
        solution: "<strong>JCL:</strong><pre style=\"background:#0d0d0d;color:#ffb000;padding:1rem;border-radius:4px;overflow-x:auto;font-family:'Share Tech Mono',monospace;font-size:.88rem;line-height:1.45;margin:.6rem 0;\">//TWOSTEP  JOB (ACCT),'JCL DEMO',CLASS=A,MSGCLASS=H,\n//             NOTIFY=&amp;SYSUID,REGION=0M\n//*\n//* STEP1: list catalog entry for an existing dataset\n//*\n//STEP1    EXEC PGM=IDCAMS\n//SYSPRINT DD  SYSOUT=*\n//SYSIN    DD  *\n  LISTCAT ENTRIES(Z12345.TEST.CNTL) ALL\n/*\n//*\n//* STEP2: allocate a small new sequential dataset\n//*\n//STEP2    EXEC PGM=IEFBR14\n//NEWDS    DD  DSN=&amp;SYSUID..JCL.DEMO,\n//             DISP=(NEW,CATLG,DELETE),\n//             SPACE=(TRK,(2,1)),\n//             DCB=(RECFM=FB,LRECL=80,BLKSIZE=0)</pre><strong>Expected SDSF output (in the H panel after submission):</strong><br>JOBNAME=TWOSTEP, OWNER=Z12345, MAX-RC=0, ODISP=HELD.<br><br><strong>Drill into JESYSMSG and look for:</strong><pre style=\"background:#0d0d0d;color:#ffb000;padding:1rem;border-radius:4px;overflow-x:auto;font-family:'Share Tech Mono',monospace;font-size:.88rem;line-height:1.45;margin:.6rem 0;\">IEF142I TWOSTEP STEP1 - STEP WAS EXECUTED - COND CODE 0000\nIEF373I STEP/STEP1   /START 2026123.1530\nIEF374I STEP/STEP1   /STOP  2026123.1530 CPU 0MIN 00.00SEC ...\nIEF142I TWOSTEP STEP2 - STEP WAS EXECUTED - COND CODE 0000\nIEF373I STEP/STEP2   /START 2026123.1530\nIEF374I STEP/STEP2   /STOP  2026123.1530 CPU 0MIN 00.00SEC ...\nIEF285I   Z12345.JCL.DEMO                              CATALOGED</pre>STEP1 returned RC=0 because LISTCAT found the dataset; STEP2 returned RC=0 because IEFBR14 just exited cleanly after JES allocated NEWDS. The IEF285I CATALOGED line confirms your new dataset was successfully created and registered.<br><br><strong>Variations to try:</strong> (a) change LISTCAT to query a nonexistent dataset (e.g., Z12345.NOSUCH.THING) — STEP1 then returns RC=4 and IDCAMS message IDC3012I 'ENTRY NOT FOUND' appears in SYSPRINT; (b) leave STEP2's DSN as the same name on a second submission — IEFBR14 succeeds (RC=0) but JESYSMSG shows IEF344I 'data set not allocated, exists' because (NEW,CATLG,DELETE) refused to overwrite. Change DISP to (MOD,CATLG,DELETE) for repeatable runs."
      },
      {
        title: "Task 2 — Make Step 2 Conditional with IF/THEN/ELSE/ENDIF",
        description: "Take the two-step job from Task 1 and add an IF/THEN/ELSE wrapper so STEP2 only runs when STEP1 succeeds (RC = 0), with an alternative ELSE branch that prints a message instead. Then deliberately make STEP1 fail to see the ELSE branch fire. This teaches the modern conditional control flow without the COND parameter's inverted logic.",
        hints: [
          "Hint 1: IF/THEN/ELSE/ENDIF statements live between EXEC steps. Place IF after STEP1's last DD, then put STEP2 on the THEN side, an alternate step on the ELSE side, and ENDIF at the end. Each IF block needs exactly one ENDIF.",
          "Hint 2: Use STEP1.RC to test STEP1's return code specifically. Operators: =, ¬=, <, <=, >, >=. (¬ is the negation symbol; a normal not-equal is NE.)",
          "Hint 3: For the ELSE branch use IEFBR14 with no DDs — it will simply mark a step as having executed, which you can confirm in SDSF JESYSMSG.",
          "Hint 4: To force the ELSE branch, change STEP1's LISTCAT to query a definitely-nonexistent dataset like Z12345.NOSUCH.THING — IDCAMS will return RC=4 (or 8 depending on the ENTRIES form), making STEP1.RC ¬= 0 true.",
          "Hint 5: After submission, in JESYSMSG you'll see one of two patterns: 'STEP STEP2 - STEP WAS EXECUTED' (THEN branch ran) OR 'STEP STEPALT - STEP WAS EXECUTED' (ELSE branch ran). The skipped branch's step doesn't appear at all — it was never started by JES."
        ],
        solution: "<strong>JCL with IF/THEN/ELSE wrapper:</strong><pre style=\"background:#0d0d0d;color:#ffb000;padding:1rem;border-radius:4px;overflow-x:auto;font-family:'Share Tech Mono',monospace;font-size:.88rem;line-height:1.45;margin:.6rem 0;\">//IFTHEN   JOB (ACCT),'IF/THEN DEMO',CLASS=A,MSGCLASS=H,\n//             NOTIFY=&amp;SYSUID,REGION=0M\n//*\n//STEP1    EXEC PGM=IDCAMS\n//SYSPRINT DD  SYSOUT=*\n//SYSIN    DD  *\n  LISTCAT ENTRIES(Z12345.TEST.CNTL) ALL\n/*\n//*\n// IF (STEP1.RC = 0) THEN\n//*\n//STEP2    EXEC PGM=IEFBR14\n//NEWDS    DD  DSN=&amp;SYSUID..JCL.IFOK,\n//             DISP=(NEW,CATLG,DELETE),\n//             SPACE=(TRK,(2,1)),\n//             DCB=(RECFM=FB,LRECL=80,BLKSIZE=0)\n//*\n// ELSE\n//*\n//STEPALT  EXEC PGM=IEFBR14\n//*\n// ENDIF</pre><strong>First submission (LISTCAT against an EXISTING dataset, RC=0):</strong><pre style=\"background:#0d0d0d;color:#ffb000;padding:.6rem;border-radius:4px;overflow-x:auto;font-family:'Share Tech Mono',monospace;font-size:.85rem;margin:.4rem 0;\">IEF142I IFTHEN STEP1   - STEP WAS EXECUTED - COND CODE 0000\nIEF142I IFTHEN STEP2   - STEP WAS EXECUTED - COND CODE 0000\nIEF202I IFTHEN STEPALT - STEP WAS NOT EXECUTED  /* ELSE branch was skipped */\nIEF285I   Z12345.JCL.IFOK                              CATALOGED</pre><strong>Now flip the test:</strong> change LISTCAT line to <code>LISTCAT ENTRIES(Z12345.NOSUCH.THING) ALL</code>. Resubmit. Expected JESYSMSG:<pre style=\"background:#0d0d0d;color:#ffb000;padding:.6rem;border-radius:4px;overflow-x:auto;font-family:'Share Tech Mono',monospace;font-size:.85rem;margin:.4rem 0;\">IEF142I IFTHEN STEP1   - STEP WAS EXECUTED - COND CODE 0008\nIEF202I IFTHEN STEP2   - STEP WAS NOT EXECUTED  /* THEN branch skipped */\nIEF142I IFTHEN STEPALT - STEP WAS EXECUTED - COND CODE 0000</pre>and IDCAMS SYSPRINT will show <code>IDC3012I ENTRY Z12345.NOSUCH.THING NOT FOUND</code>.<br><br><strong>What this teaches:</strong> (a) IF reads naturally — '<em>run</em> STEP2 if STEP1.RC = 0' — instead of COND's confusing 'skip if true' inversion; (b) the not-executed steps appear in JESYSMSG with IEF202I 'STEP WAS NOT EXECUTED' so you can always tell from the job log which branch fired; (c) you can extend the pattern: nest IF blocks inside the THEN/ELSE; chain conditions with AND/OR (e.g., <code>IF (STEP1.RC = 0 AND STEP2.RC &lt; 8) THEN ...</code>); test for abend instead of just RC (<code>IF (STEP1.ABEND) THEN ...</code> runs the inside if STEP1 took an S0Cx, Sx37, S322, etc.). The MAX-RC on the SDSF H panel reflects the highest RC of all <em>executed</em> steps — skipped steps don't contribute, so the MAX-RC may be 0 even if a skipped step would have failed."
      },
      {
        title: "Task 3 — Diagnose JCL Errors from JES Messages",
        description: "Deliberately introduce four common JCL mistakes — missing DD, bad DISP value, undefined symbolic, missing ENDIF — submit each as a small job, and practice reading the IEF/IGD/IEC error messages JES produces. JCL errors prevent the job from running at all (no step is executed), so the diagnostic flow is different from runtime failures: you read JESJCL and JESMSGLG, not JESYSMSG.",
        hints: [
          "Hint 1: For each error, edit a small one-step JCL containing the bug. Submit; SDSF =SD;H; drill into the job. The JES messages live in JESMSGLG and JESJCL — JESYSMSG won't even exist for a JCL error because no step ran.",
          "Hint 2: Every JCL error message starts with IEFnnnI (general JCL/JES messages), IEAnnnI (system messages), IEBnnnI (utilities), IGDnnnI (SMS allocation), IECnnnI (I/O allocation). The four-digit number after the prefix is the message ID; documented in 'MVS System Messages.'",
          "Hint 3: Bug 1 — missing required DD. Run IDCAMS without SYSPRINT: it will abend with S013 or report 'unable to open SYSPRINT' depending on how the program handles it.",
          "Hint 4: Bug 2 — invalid DISP value. Code DISP=(NEW,KEEPDISP) — JES will reject the deck before any step runs.",
          "Hint 5: Bug 3 — reference an undefined symbolic. Code DSN=&NOSUCH..DATA — JES looks for &NOSUCH in the job's symbol table and rejects the deck.",
          "Hint 6: Bug 4 — IF without ENDIF. Code an IF/THEN block but omit the ENDIF — JES rejects with a JCL error.",
          "Hint 7: Use TYPRUN=SCAN on the JOB statement to validate JCL without actually running anything — handy for catching JCL errors during development."
        ],
        solution: "<strong>Bug 1 — Missing required DD (IDCAMS without SYSPRINT):</strong><pre style=\"background:#0d0d0d;color:#ffb000;padding:1rem;border-radius:4px;overflow-x:auto;font-family:'Share Tech Mono',monospace;font-size:.88rem;line-height:1.45;margin:.6rem 0;\">//BUG1     JOB (ACCT),'NO SYSPRINT',CLASS=A,MSGCLASS=H,NOTIFY=&amp;SYSUID\n//STEP1    EXEC PGM=IDCAMS\n//SYSIN    DD  *\n  LISTCAT\n/*</pre>IDCAMS actually allocates a default SYSPRINT in some setups, so this may not fail — modify by writing PGM=IEBGENER instead (which definitely needs SYSPRINT, SYSUT1, SYSUT2). Job ends with <code>IEF453I JOB FAILED - JCL ERROR</code> or runs and abends with <code>S013-14</code> (open failed for a required DD). Look in JESMSGLG for the abend code.<br><br><strong>Bug 2 — Invalid DISP value:</strong><pre style=\"background:#0d0d0d;color:#ffb000;padding:1rem;border-radius:4px;overflow-x:auto;font-family:'Share Tech Mono',monospace;font-size:.88rem;line-height:1.45;margin:.6rem 0;\">//BUG2     JOB (ACCT),'BAD DISP',CLASS=A,MSGCLASS=H,NOTIFY=&amp;SYSUID\n//STEP1    EXEC PGM=IEFBR14\n//OUT      DD  DSN=&amp;SYSUID..BAD.DISP,\n//             DISP=(NEW,KEEPDISP),\n//             SPACE=(TRK,(1,1))</pre>Expected in JESMSGLG: <code>IEFC630I  UNIDENTIFIED KEYWORD KEEPDISP</code> followed by <code>IEF453I  BUG2 - JOB FAILED - JCL ERROR</code>. The job is rejected at JCL conversion time — STEP1 never starts. SDSF MAX-RC is JCL ERROR, no JESYSMSG.<br><br><strong>Bug 3 — Undefined symbolic:</strong><pre style=\"background:#0d0d0d;color:#ffb000;padding:1rem;border-radius:4px;overflow-x:auto;font-family:'Share Tech Mono',monospace;font-size:.88rem;line-height:1.45;margin:.6rem 0;\">//BUG3     JOB (ACCT),'BAD SYM',CLASS=A,MSGCLASS=H,NOTIFY=&amp;SYSUID\n//STEP1    EXEC PGM=IEFBR14\n//OUT      DD  DSN=&amp;NOSUCH..DATA,\n//             DISP=(NEW,CATLG,DELETE),\n//             SPACE=(TRK,(1,1))</pre>Expected: <code>IEFC658I  SYMBOL NOSUCH NOT DEFINED</code>. JCL error, no execution.<br><br><strong>Bug 4 — IF without ENDIF:</strong><pre style=\"background:#0d0d0d;color:#ffb000;padding:1rem;border-radius:4px;overflow-x:auto;font-family:'Share Tech Mono',monospace;font-size:.88rem;line-height:1.45;margin:.6rem 0;\">//BUG4     JOB (ACCT),'NO ENDIF',CLASS=A,MSGCLASS=H,NOTIFY=&amp;SYSUID\n//STEP1    EXEC PGM=IEFBR14\n// IF (STEP1.RC = 0) THEN\n//STEP2    EXEC PGM=IEFBR14\n//* missing ENDIF on purpose</pre>Expected: <code>IEFC621I  IF STATEMENT WITHOUT MATCHING ENDIF</code>. JCL error.<br><br><strong>Diagnostic flow takeaways:</strong> (1) MAX-RC = <code>JCLERR</code> (or status JCL ERROR in SDSF) means JES rejected the deck before any step started — read JESMSGLG and JESJCL, JESYSMSG won't exist. (2) MAX-RC = a numeric code means at least one step ran — read JESYSMSG for IEF142I lines and any program-specific SYSPRINT for the diagnostic detail. (3) Use TYPRUN=SCAN on the JOB statement to validate JCL syntax without executing anything — JES processes the deck through conversion only, reports any errors, and never starts step 1. This is the equivalent of a 'dry run' or 'syntax check' for JCL. (4) Every IEFnnnnI message has a corresponding entry in 'MVS System Messages' — if you don't recognise a message ID, look it up; the explanation usually points at the exact parameter that's wrong."
      }
    ]
  },

  {
    id: "l1-jcl-utils",
    level: 1,
    category: "Batch Processing & JCL",
    title: "JCL Procedures & Batch Utilities",
    summary: "Catalogued and in-stream PROC definition, symbolic parameter override, and the key batch utilities: IEBGENER, IEBCOPY, IEFBR14, DFSORT, and IDCAMS.",
    content: `
      <h2>JCL Procedures (PROCs)</h2>
      <p>Explain in-stream PROC / PEND vs catalogued PROC in a PROCLIB, and when to use each.</p>
      <h2>Symbolic Parameters</h2>
      <ul>
        <li><strong>Defining symbolics (&SYM=default)</strong>  placeholder.</li>
        <li><strong>Overriding on the EXEC PROC= statement</strong>  placeholder.</li>
        <li><strong>Nested PROC considerations</strong>  placeholder.</li>
      </ul>
      <h2>IEBGENER</h2>
      <p>Copying sequential datasets; reformatting; selecting records with GENERATE/RECORD/FIELD.</p>
      <h2>IEBCOPY</h2>
      <p>Copying, merging, and compressing PDS/PDSE libraries.</p>
      <h2>IEFBR14 & SORT</h2>
      <p>IEFBR14 as a no-op for allocation/deletion via DD statements; DFSORT SORT/MERGE/INCLUDE/OMIT control statements.</p>
      <h2>IDCAMS (AMS)</h2>
      <p>DEFINE, LISTCAT, DELETE, REPRO, and ALTER for VSAM and catalog management.</p>
    `,
    mcq: [
      { question: "What is the purpose of IEFBR14?", options: ["Copy datasets", "A no-op program used to execute DD statements for allocation/deletion", "Sort records", "Merge PDS members"], answer: 1, explanation: "IEFBR14 performs no processing  it is invoked purely to trigger JCL DD allocation or deletion." },
      { question: "Which utility merges two PDS libraries into one?", options: ["IEBGENER", "IDCAMS REPRO", "IEBCOPY", "SORT"], answer: 2, explanation: "IEBCOPY copies, merges, and compresses PDS/PDSE libraries, selecting or excluding individual members." },
      { question: "In DFSORT, what does the INCLUDE statement do?", options: ["Adds new records to the output", "Selects only records matching a condition for inclusion in output", "Inserts header records", "Defines the sort key"], answer: 1, explanation: "INCLUDE COND=(...) causes SORT to pass only records satisfying the condition to the output." },
      { question: "How are symbolic parameters defined in a catalogued PROC?", options: ["//SYM DD parameter", "In the PROC header statement as &name=default", "In a separate SYMLIST member", "Via RACF variables"], answer: 1, explanation: "Symbolics are declared on the PROC statement itself: //MYJOB PROC HLQUAL=SYS1,RECFM=FB" },
      { question: "What IDCAMS command copies a VSAM dataset to another VSAM or sequential dataset?", options: ["DEFINE CLUSTER", "LISTCAT", "REPRO", "ALTER"], answer: 2, explanation: "REPRO copies records from one dataset (VSAM or sequential) to another, making it useful for VSAM backup and migration." }
    ],
    practical: [
      { title: "Task 1  Write a Catalogued PROC with Symbolic Parameters", description: "Create a PROC that copies a dataset using IEBGENER, with the input and output DSNs as symbolic parameters. Call it from a job overriding both symbols.", hints: ["Hint 1: define symbolics as &INDSN= and &OUTDSN= on the PROC statement.", "Hint 2: invoke with EXEC MYPROC,INDSN=your.input,OUTDSN=your.output"], solution: "Expected PROC and JCL. Replace with real content." },
      { title: "Task 2  Sort a Dataset and Select Records with DFSORT", description: "Use DFSORT to sort a sequential dataset by a key field, include only records where a flag field equals '1', and write to a new output dataset.", hints: ["Hint 1: SORT FIELDS=(start,len,CH,A) defines the sort key.", "Hint 2: INCLUDE COND=(flag_pos,1,CH,EQ,C'1') filters records."], solution: "Expected JCL and SORT control statements. Replace with real content." }
    ]
  },

  //  Automation & Scripting (1 card) 

  {
    id: "l1-automation",
    level: 1,
    category: "Automation & Scripting",
    title: "REXX Basics & Scheduling Concepts",
    summary: "REXX language fundamentals, built-in functions, ISPF service calls, basic automation concepts on z/OS, and an introduction to job scheduling principles.",
    content: `
      <h2>Introduction to REXX</h2>
      <p>Replace with content on REXX origins, strengths, and use cases on z/OS.</p>
      <h2>REXX Language Basics</h2>
      <ul>
        <li><strong>Variables and expressions</strong>  placeholder.</li>
        <li><strong>Control flow (IF, DO, SELECT)</strong>  placeholder.</li>
        <li><strong>Built-in functions (SUBSTR, WORDS, LENGTH, DATE, TIME)</strong>  placeholder.</li>
      </ul>
      <h2>ISPF Services from REXX</h2>
      <p>Using ISPEXEC to call ISPF panel services, display panels, and manipulate variables.</p>
      <h2>Automation & Scheduling Concepts</h2>
      <p>Introduction to automated operator responses, WTOR handling, message automation, and job scheduling triggers (time, dependency, calendar).</p>
    `,
    mcq: [
      { question: "Which delimiter marks a REXX comment?", options: ["/* ... */", "// comment", "# comment", "REM ..."], answer: 0, explanation: "REXX uses /* ... */ for block comments." },
      { question: "Which REXX built-in function extracts a substring?", options: ["SUBSTR()", "MID()", "SLICE()", "CUT()"], answer: 0, explanation: "SUBSTR(string, start, length) extracts a portion of a string." },
      { question: "What TSO command executes a REXX exec stored in a PDS member?", options: ["CALL", "EXEC", "RUN", "EXECRX"], answer: 1, explanation: "The EXEC command (or implicit exec from SYSEXEC/SYSUEXEC) runs a REXX program." },
      { question: "What does the REXX PARSE instruction do?", options: ["Runs an external program", "Splits a string into named variables using a parsing template", "Calls a subroutine", "Converts hex to decimal"], answer: 1, explanation: "PARSE breaks a string into components assigned to named variables based on whitespace or explicit delimiters." },
      { question: "In job scheduling, what is a predecessor dependency?", options: ["A job that always runs first unconditionally", "A requirement that a prior job completes successfully before the dependent job can start", "A calendar holiday exception", "A REXX error handler"], answer: 1, explanation: "Predecessor dependencies ensure jobs execute in the correct order, waiting for upstream completion (and optionally checking the return code)." }
    ],
    practical: [
      { title: "Task 1  Write a REXX Exec to Display System Information", description: "Create a REXX exec that prints the current date, time, and TSO ID, using DATE(), TIME(), and SYSVAR('SYSUID').", hints: ["Hint 1: SYSVAR('SYSUID') returns the current user ID.", "Hint 2: use SAY to print output to the terminal."], solution: "Expected REXX code and output. Replace with real content." },
      { title: "Task 2  Automate an ISPF Task Using REXX", description: "Write a REXX exec that uses ISPEXEC to allocate a dataset and confirm it with LISTCAT, without requiring manual menu navigation.", hints: ["Hint 1: ADDRESS ISPEXEC 'LMINIT DATAID(id) DATASET(dsn)'", "Hint 2: check return codes from each ISPEXEC call and display results."], solution: "Expected REXX exec. Replace with real content." }
    ]
  },

  //  Subsystems & Middleware (2 cards) 

  {
    id: "l1-cics-ims",
    level: 1,
    category: "Subsystems & Middleware",
    title: "CICS & IMS Overview",
    summary: "CICS as an online transaction processing platform (regions, transactions, resources), IMS TM for message processing, and IMS DB for hierarchical data management.",
    content: `
      <h2>CICS  Customer Information Control System</h2>
      <p>Replace with content on CICS as an OLTP platform: regions, transactions, CICS resources (files, programs, maps).</p>
      <h2>CICS Administration Basics</h2>
      <ul>
        <li><strong>CICS regions and their JCL</strong>  placeholder.</li>
        <li><strong>CEDA (online resource definition)</strong>  placeholder.</li>
        <li><strong>Transaction abend codes</strong>  placeholder.</li>
      </ul>
      <h2>IMS Transaction Manager (IMS TM)</h2>
      <p>Explain IMS TM message processing regions, IMSIDs, and message queues.</p>
      <h2>IMS DB Basics</h2>
      <p>Cover hierarchical data structures, DBDs, PSBs, and how IMS DB differs from relational models.</p>
    `,
    mcq: [
      { question: "What is CICS primarily designed for?", options: ["Long-running batch jobs", "Online transaction processing with thousands of concurrent short transactions", "Database backup", "Network routing"], answer: 1, explanation: "CICS is an OLTP middleware that handles vast numbers of short-lived, concurrent online transactions." },
      { question: "What is a CICS region?", options: ["A network routing zone", "A z/OS address space that runs the CICS nucleus and serves transactions", "A RACF group", "A JES input class"], answer: 1, explanation: "Each CICS region is its own address space. An enterprise may run dozens of regions for different applications." },
      { question: "What is CEDA used for in CICS?", options: ["Submitting batch jobs", "Interactively defining, installing, and managing CICS resources online", "Managing SMF records", "Configuring TCP/IP"], answer: 1, explanation: "CEDA (CICS Explorer/DFHCSDUP) is used to define resources such as transactions, programs, and files in the CSD." },
      { question: "What is an IMS DBD?", options: ["A Db2 database descriptor", "An IMS Database Descriptor that defines the structure of a hierarchical database", "A CICS resource definition", "A JES job definition"], answer: 1, explanation: "The DBD (Database Descriptor) describes an IMS database: its segments, their hierarchy, and their physical organisation." },
      { question: "What data model does IMS DB use?", options: ["Relational", "Hierarchical (tree-structured segments)", "Graph", "Key-value"], answer: 1, explanation: "IMS DB uses a hierarchical model where data is organised as parent-child segment relationships." }
    ],
    practical: [
      { title: "Task 1  Locate Active CICS Regions in SDSF", description: "Use the SDSF DA panel to identify active CICS address spaces. Browse their job logs for DFH startup messages.", hints: ["Hint 1: CICS JCL often has EXEC PGM=DFHSIP.", "Hint 2: look for DFH message prefixes confirming start completion."], solution: "Expected findings. Replace with real content." },
      { title: "Task 2  Used CEDA to Display a Transaction Definition", description: "In a CICS region terminal, use CEDA DISPLAY TRANSACTION(name) to view the attributes of a defined transaction.", hints: ["Hint 1: logon to a CICS terminal and type CEDA.", "Hint 2: CEDA DISPLAY TRANSACTION(CESN) shows the sign-on transaction."], solution: "Expected CEDA output. Replace with real content." }
    ]
  },

  {
    id: "l1-db2",
    level: 1,
    category: "Subsystems & Middleware",
    title: "Db2 for z/OS Basics",
    summary: "Introduction to the Db2 relational database subsystem on z/OS: the Db2 address spaces, basic SQL, accessing Db2 via SPUFI and DB2I, and bind concepts.",
    content: `
      <h2>Db2 Subsystem Architecture</h2>
      <p>Replace with content on Db2 address spaces (DBM1, MSTR, DIST) and their roles.</p>
      <h2>Basic SQL on z/OS</h2>
      <ul>
        <li><strong>SELECT / INSERT / UPDATE / DELETE</strong>  placeholder.</li>
        <li><strong>Tablespaces and table creation</strong>  placeholder.</li>
        <li><strong>Indexes and keys</strong>  placeholder.</li>
      </ul>
      <h2>SPUFI</h2>
      <p>Explain how to execute SQL interactively using SPUFI from the DB2I ISPF panels.</p>
      <h2>Bind and Packages</h2>
      <p>Introduce the concept of binding an application plan or package, and why it is needed before a program can access Db2.</p>
      <h2>Db2 Utilities</h2>
      <p>Brief overview of REORG, RUNSTATS, CHECK DATA, and COPY utilities for basic DBA tasks.</p>
    `,
    mcq: [
      { question: "What is the name of the main Db2 engine address space?", options: ["DB2MAIN", "DSNMSTR", "DBM1", "DB2SVC"], answer: 2, explanation: "DBM1 (Database Manager 1) is the primary Db2 address space that handles SQL processing and data access." },
      { question: "Which ISPF-based tool allows interactive SQL execution against a Db2 subsystem?", options: ["DB2I RUNSTATS", "SPUFI", "IDCAMS", "SDSF LOG"], answer: 1, explanation: "SPUFI (SQL Processor Using File Input) lets users run SQL statements from ISPF without writing a program." },
      { question: "What does the BIND command do in Db2?", options: ["Creates a new table", "Compiles SQL statements into an access path (plan/package) for execution", "Grants access to a table", "Copies a Db2 table"], answer: 1, explanation: "BIND takes static SQL from a DBRM (produced by pre-compile) and creates a plan or package defining the optimised access path." },
      { question: "What Db2 utility updates the statistics used by the query optimiser?", options: ["REORG", "RUNSTATS", "CHECK DATA", "COPY"], answer: 1, explanation: "RUNSTATS collects statistics about table and index cardinality and size, allowing the Db2 optimiser to choose efficient access paths." },
      { question: "What is a Db2 tablespace?", options: ["A VSAM cluster", "A physical storage structure that holds one or more Db2 tables", "A RACF resource profile", "A TCP/IP connection pool"], answer: 1, explanation: "A tablespace is the Db2 storage object (built on VSAM ESDS/LDS datasets) that physically stores table rows." }
    ],
    practical: [
      { title: "Task 1  Run a SELECT Query via SPUFI", description: "Access DB2I from ISPF, navigate to SPUFI, enter a SELECT statement, and execute it against a sample table. Review the output.", hints: ["Hint 1: access DB2I from your ISPF primary menu or =M.DB2.", "Hint 2: enter SELECT * FROM SYSIBM.SYSTABLES WHERE TYPE='T' FETCH FIRST 20 ROWS ONLY."], solution: "Expected navigation steps and output. Replace with real content." },
      { title: "Task 2  Explore the Db2 Catalog Tables", description: "Use SPUFI to query SYSIBM.SYSTABLES and SYSIBM.SYSCOLUMNS to list tables you have access to and their column definitions.", hints: ["Hint 1: SELECT * FROM SYSIBM.SYSTABLES WHERE CREATOR='yourID'.", "Hint 2: SELECT * FROM SYSIBM.SYSCOLUMNS WHERE TBCREATOR='yourID'."], solution: "Expected SQL and results. Replace with real content." }
    ]
  },

  //  Networking & Security (1 card) 

  {
    id: "l1-networking",
    level: 1,
    category: "Networking & Security",
    title: "FTP, TCP/IP & RACF Basics",
    summary: "FTP basics, TCP/IP stack introduction, VTAM SNA awareness, and RACF fundamentals: user profiles, groups, dataset protection, and UACC.",
    content: `
      <h2>TCP/IP on z/OS  Introduction</h2>
      <p>Replace with content on the z/OS TCP/IP started task, PROFILE.TCPIP basics, and connectivity verification.</p>
      <h2>FTP on z/OS</h2>
      <ul>
        <li><strong>FTP client and server</strong>  placeholder.</li>
        <li><strong>Dataset transfer parameters (BINARY, ASCII)</strong>  placeholder.</li>
      </ul>
      <h2>VTAM Awareness</h2>
      <p>Introduce VTAM as the SNA network access method and its relationship to CICS and IMS terminals.</p>
      <h2>RACF Fundamentals</h2>
      <p>Cover user profiles, group membership, dataset protection basics (ADDSD, PERMIT), and UACC defaults.</p>
    `,
    mcq: [
      { question: "Which z/OS command verifies basic TCP/IP reachability to a remote host?", options: ["TRACERTE", "PING", "NETSTAT", "FTP"], answer: 1, explanation: "PING sends ICMP echo requests to confirm reachability of a remote host." },
      { question: "What RACF command creates a new user profile?", options: ["NEWUSER", "ADDUSER", "CREATEID", "DEFUSER"], answer: 1, explanation: "ADDUSER creates a new RACF user profile with specified attributes and optional group connection." },
      { question: "What is UACC in RACF?", options: ["A universal audit code", "Universal Access Authority  the default access granted to users not on a resource's explicit access list", "User Account Control Code", "Undefined Access Class"], answer: 1, explanation: "UACC sets the baseline access level for any authenticated user not listed in the resource profile's access list." },
      { question: "Which port does FTP use for its control connection by default?", options: ["23", "21", "80", "443"], answer: 1, explanation: "FTP uses port 21 for the control channel; data transfers use port 20 or negotiated passive ports." },
      { question: "What is VTAM's primary role on z/OS?", options: ["Manage DASD volumes", "Provide SNA network access for terminal-based applications like CICS and IMS", "Manage JES queues", "Run batch jobs"], answer: 1, explanation: "VTAM (Virtual Telecommunications Access Method) provides the SNA networking layer for mainframe online applications." }
    ],
    practical: [
      { title: "Task 1  Test Connectivity with PING and NETSTAT", description: "From TSO, use PING to verify connectivity to a known host, then use NETSTAT CONN to list active TCP connections.", hints: ["Hint 1: PING hostname from the TSO READY prompt or OMVS shell.", "Hint 2: NETSTAT CONN shows all established TCP connections."], solution: "Expected output. Replace with real content." },
      { title: "Task 2  Create a RACF User and Verify the Profile", description: "Use ADDUSER to define a test user, connect them to a group with CONNECT, and verify the result with LISTUSER.", hints: ["Hint 1: ADDUSER TESTID NAME('Test User') PASSWORD(init01)", "Hint 2: LISTUSER TESTID confirms the profile attributes."], solution: "Expected commands and output. Replace with real content." }
    ]
  },


  // 
  //  LEVEL 2
  // 

  //  Platform Fundamentals (1 card) 

  {
    id: "l2-fundamentals",
    level: 2,
    category: "Platform Fundamentals",
    title: "z/OSMF & Advanced Architecture",
    summary: "z/OSMF browser-based management and workflows, advanced sysplex internals (XCF, XES, Coupling Facility), and cross-memory services.",
    content: `
      <h2>z/OSMF Overview – Modern z/OS Management</h2>
      <p><strong>z/OSMF (z/OS Management Facility)</strong> is a modern, browser-based systems management platform for z/OS that centralizes administration, monitoring, and automation tasks. Introduced in z/OS 9.1 and continuously enhanced, z/OSMF replaces legacy green-screen tools (ISPF panels) with a graphical web interface accessible from any browser. It provides role-based access control, REST APIs for integration with modern DevOps toolchains, and a unified dashboard for managing multiple z/OS and z/VM systems. z/OSMF runs as an HTTP server on z/OS (typically on a special UNIX System Services (USS) port) and communicates with z/OS components through REXX execs, Java applications, and agent processes.</p>
      <p><strong>Key Components of z/OSMF:</strong> (1) <strong>Base z/OSMF:</strong> The core infrastructure (web server, security, user interface). (2) <strong>Task Plugins:</strong> Specialized management functions (listed below). (3) <strong>REST APIs:</strong> Programmatic access for integration. (4) <strong>z/OSMF Workflows Engine:</strong> Automation and orchestration (separate section below). (5) <strong>Reporting &amp; Analytics:</strong> System metrics, health monitoring. (6) <strong>Configuration Management Database (CMDB):</strong> Tracks z/OS resources and their relationships.</p>
      <p><strong>Key Plugins &amp; Task Areas:</strong> - <strong>Software Management:</strong> Automates SMP/E package install (RECEIVE, APPLY, ACCEPT) from z/OSMF UI, replacing manual ISPF navigation. - <strong>Configuration Manager:</strong> Manage z/OS configuration options and PARMLIB members. - <strong>Workload Management (WLM):</strong> Define service levels, classification rules, and performance policies. - <strong>Cloud Provisioning:</strong> Template-based provisioning of z/OS or z/VM guests. - <strong>Networks:</strong> Manage TCP/IP profiles, firewall rules, and routing. - <strong>System Status:</strong> Real-time dashboard showing LPAR status, sysplexes, subsystems, and metrics. - <strong>File Management:</strong> Browse z/OS datasets and USS files, edit them. - <strong>REST API Explorer:</strong> Interactive tool to test and call z/OSMF and third-party REST APIs. - <strong>Capacity Provisioning &amp; Reporting:</strong> Analyze CPU, memory, DASD utilization.</p>

      <h2>z/OSMF Workflows – Orchestration &amp; Automation</h2>
      <p><strong>Workflows</strong> are the automation backbone of z/OSMF. A workflow is an XML-based definition of a multi-step administrative procedure that can combine automated actions (JCL execution, REST calls, REXX scripts) with human instructions, approvals, and decision gates. Each workflow can be instantiated, executed, monitored, and retained for audit. Workflows eliminate manual, error-prone procedures by enforcing standardized, repeatable processes.</p>
      <p><strong>Workflow Structure:</strong> A workflow is authored in XML and consists of:</p>
      <ul>
        <li><strong>Workflow Metadata:</strong> Name, description, owner, version, prerequisites (which z/OS components must be running).</li>
        <li><strong>Variables:</strong> Input parameters (user dataset names, configuration values) that personalize the workflow.</li>
        <li><strong>Steps:</strong> Each step defines an action: instruction text (human readable), automated action (invoke program, call REST API), or approval gate. - <strong>Instruction Steps:</strong> Display text and require user acknowledgment. - <strong>Automated Steps:</strong> Execute JCL (embedded in the step), call a REST endpoint, or run a REXX or shell script. - <strong>Approval/Gate Steps:</strong> Pause execution and require a named approver (e.g., manager) to APPROVE or REJECT.</li>
        <li><strong>Notifications:</strong> Email or console messages to notify stakeholders of step completion or approval requirements.</li>
        <li><strong>Conditional Logic:</strong> Routes based on step outcomes (success/failure) or variable conditions, enabling branching workflows.</li>
      </ul>
      <p><strong>Workflow Example Scenario:</strong> A disk maintenance workflow might: (1) Instruction: "This workflow will migrate data from DISK01 to DISK02. Verify backup complete." (Operator reviews and clicks OK.) (2) Automated: Run DFSORT JCL to copy datasets. (3) Approval: "Cutover ready. Manager approves production migration." (Manager reviews test results, approves.) (4) Automated: Run migration JCL on production. (5) Instruction: Verify application functionality and report status.</p>
      <p><strong>Benefits:</strong> - Standardization: Every execution follows the same procedure. - Compliance: Audit trail of who did what and when. - Speed: Parallel automated steps reduce manual intervention. - Error Reduction: Guided, templated procedures minimize mistakes. - Knowledge Transfer: Workflows document procedures; new staff can execute without expert knowledge.</p>

      <h2>Advanced Sysplex Architecture – Multi-System Internals</h2>
      <p><strong>XCF (Cross-System Coupling Facility Services)</strong> is the z/OS subsystem that manages inter-z/OS-image communication in a sysplex. Each z/OS image has an XCF address space that handles: - <strong>Sysplex Messaging:</strong> Address spaces on different z/OS images use XCF to send status messages and data to each other (e.g., for coordinated workload balancing). - <strong>Shared Resource Management:</strong> XCF serializes access to shared resources through the Coupling Facility (CF). - <strong>Sysplex Topology:</strong> XCF maintains visibility of all z/OS images in the sysplex, detects failures, and triggers failover actions.</p>
      <p><strong>Coupling Facility (CF) Structures</strong> are in-memory data structures allocated in a dedicated processor (or LPAR) that serves as the sysplex "shared repository:" - <strong>List Structures:</strong> Ordered lists of work items (e.g., batch jobs waiting for processing) that any z/OS image can access. - <strong>Cache Structures:</strong> High-speed copies of frequently accessed data (e.g., RACF profiles, catalog entries) that multiple images share, reducing DASD I/O. - <strong>Lock Structures:</strong> Distributed locking tables that serialize access to shared datasets and resources across sysplex members. - <strong>Rebuild Capability:</strong> If the CF fails, z/OS images can rebuild CF structures from local copies, minimizing downtime. CF structures are critical for sysplex availability; misconfiguration can degrade performance or cause system hangs.</p>
      <p><strong>XES (Cross-System Extended Services)</strong> - sometimes called eXtended Services - refers to high-level sysplex services built on top of XCF, such as: - <strong>Sysplex Shared RACF:</strong> All z/OS images share a single RACF database via CF cache structures for consistent security policy. - <strong>Sysplex Catalog:</strong> All systems use a shared ICF catalog (typically on shared DASD) to locate datasets, reducing duplication and ensuring consistency. - <strong>Sysplex-wide GRS (Global Resource Serialization):</strong> Prevents concurrent access to the same dataset or resource across sysplex boundaries. - <strong>Workload Balancing:</strong> Batch job entry subsystems (JES) or transaction servers distribute work to any available z/OS image in the sysplex, optimizing utilization.</p>

      <h2>Cross-Memory Services – Inter-Address-Space Communication</h2>
      <p><strong>Cross-Memory Services</strong> enable one address space to execute code in another address space's virtual region with full access to its memory and resources. This is essential for system subsystems and high-performance applications requiring inter-process communication:</p>
      <ul>
        <li><strong>Service Routines &amp; PC Routines (Program Call):</strong> An address space can define a <strong>PC routine</strong> (a special entry point protected by RACF). Other address spaces issue CALL(entry) to invoke that routine. The routine executes in the target address space with access to its data and registers. Upon return, control and results move back to the calling address space. PC routines are used for system services (e.g., subsystem call-outs) and high-performance inter-task communication.</li>
        <li><strong>XMEM (Cross-Memory Environment):</strong> A specialized shared addressing environment where multiple address spaces co-reside in a group, accessing a joint segment of virtual memory. XMEM is used for very tight integration between closely cooperating address spaces (less common in user code).</li>
        <li><strong>SRBs (Service Request Blocks):</strong> A task in one address space can queue an <strong>SRB</strong> to run in another. The SRB is a request to execute code (a specified entry point) in a target address space. When the target address space gets CPU, it executes the SRB routine, then posts completion status back to the originator. SRBs are used for delegated work; e.g., a subsystem receives a request and queues an SRB in a worker address space to process it.</li>
        <li><strong>ACBs (Anchor Control Blocks) and Token-Based Addressing:</strong> Modern cross-memory facilities use opaque tokens to reference remote address spaces and routines, hiding implementation details and enabling isolation. RACF controls which address spaces are allowed to call which PC routines, enforcing security.</li>
      </ul>
      <p><strong>Access Control:</strong> Cross-memory operations are not freely allowed. Calling an address space's cross-memory routine requires either: (1) An explicit <strong>PERMIT</strong> in RACF (specifying which users can call which PC routines). (2) Same <strong>RACF user ID</strong> or <strong>job-to-task relationship</strong> (child tasks automatically inherit parent's permissions). This prevents rogue code from arbitrarily invoking system or other users' services.</p>

      <h2>Sources &amp; References</h2>
      <div style="margin-top:20px; padding:20px; background-color:#e8f4f8; border-left:5px solid #0066cc; border-radius:4px; font-size:0.9em; line-height:1.8;">
        <ul style="margin: 0; padding-left: 20px; list-style-type:none;">
          <li>• <a href="https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.4.0/com.ibm.zos.v2r4.ieaa100/toc.htm" target="_blank" style="color:#0066cc; text-decoration:none;">IBM z/OS Concepts</a> (Publication SY28-1149)</li>
          <li>• <a href="https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.5.0/com.ibm.zos.v2r5.ieavg000/ieavg000.htm" target="_blank" style="color:#0066cc; text-decoration:none;">z/OSMF User's Guide</a> (Publication SA23-1368)</li>
          <li>• <a href="https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.5.0/com.ibm.zos.v2r5.ieaa500/ieaa500.htm" target="_blank" style="color:#0066cc; text-decoration:none;">z/OS Parallel Sysplex Implementation Guide</a> (Publication SA23-1368)</li>
          <li>• <a href="https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.5.0/com.ibm.zos.v2r5.hlbpg/pgh1intro.htm" target="_blank" style="color:#0066cc; text-decoration:none;">z/OS Cross-Memory Services &amp; XCF Reference</a></li>
          <li>• <a href="https://www.ibm.com/support/knowledgecenter/SSLTBW_2.5.0/com.ibm.zos.v2r5.ieae100/ieae100.htm" target="_blank" style="color:#0066cc; text-decoration:none;">z/OS Coupling Facility System Programming Guide</a></li>
          <li>• <a href="https://www.redbooks.ibm.com/redbooks/pdfs/sg246981.pdf" target="_blank" style="color:#0066cc; text-decoration:none;">IBM Redbook SG246981</a> — z/OS Systems Programming</li>
          <li>• <a href="https://www.ibm.com/support/knowledgecenter/SSLTBW/workflows-reference" target="_blank" style="color:#0066cc; text-decoration:none;">z/OSMF Workflows Administration &amp; Definition Guide</a></li>
        </ul>
      </div>
    `,
    mcq: [
      { question: "What is z/OSMF primarily used for?", options: ["Real-time transaction processing", "Browser-based system management and workflow automation", "RACF user definition only", "VSAM cluster management"], answer: 1, explanation: "z/OSMF provides a browser UI for software deployment, configuration management, and operational workflows." },
      { question: "What does XCF provide in a sysplex?", options: ["Network routing", "Communication and status signalling between z/OS images in the sysplex", "Disk caching", "RACF synchronisation"], answer: 1, explanation: "XCF (Cross-System Coupling Facility services) lets address spaces on different z/OS images communicate and monitor each other." },
      { question: "What is the Coupling Facility used for?", options: ["Storing archived SMF records", "High-speed shared memory for sysplex lock, list, and cache structures", "Running CICS transactions", "TCP/IP connection sharing"], answer: 1, explanation: "The CF provides shared in-memory structures that sysplex members use for locking, caching, and coordination." },
      { question: "Which z/OSMF plugin automates SMP/E operations?", options: ["Cloud Provisioning", "Software Management", "Network Configuration", "Workflow Designer"], answer: 1, explanation: "The Software Management plugin automates SMP/E RECEIVE, APPLY, and ACCEPT operations from a browser UI." },
      { question: "What can a z/OSMF workflow step contain?", options: ["JCL only", "Instructions, automated JCL/REST actions, and approval gates", "RACF commands only", "USS shell scripts only"], answer: 1, explanation: "A workflow step can combine human instructions, automated tasks, owner assignments, and approval requirements." },
      { question: "What are the three main types of Coupling Facility structures?", options: ["Cache, Disk, Network", "List, Cache, and Lock structures", "Memory, CPU, and I/O", "RACF, SMF, and Catalog"], answer: 1, explanation: "CF list structures hold work items, cache structures hold frequently-accessed data, and lock structures serialize access across sysplexes." },
      { question: "Which z/OSMF plugin provides a real-time dashboard of system health and LPAR status?", options: ["File Management", "System Status", "Configuration Manager", "REST API Explorer"], answer: 1, explanation: "The System Status plugin displays LPAR availability, subsystem status, performance metrics, and sysplex topology in a unified dashboard." },
      { question: "What is a z/OSMF workflow variable used for?", options: ["Storing passwords", "Parameterizing workflow input so each instantiation can use different datasets, usernames, or configurations", "Defining RACF user rights", "Scheduling job execution times"], answer: 1, explanation: "Variables allow a single workflow template to be reused for different datasets or configurations without modifying the workflow itself." },
      { question: "What is a PC (Program Call) routine in cross-memory services?", options: ["A C language program on z/OS", "A protected entry point in an address space that another address space can invoke with controlled access", "A printer control command", "A performance counter record"], answer: 1, explanation: "PC routines provide a secure mechanism for inter-address-space communication; RACF controls who can call which routines." },
      { question: "What does an SRB (Service Request Block) accomplish?", options: ["Schedules a JCL job", "Queues work to be executed in a different address space asynchronously", "Backs up a dataset", "Starts a subsystem"], answer: 1, explanation: "An SRB is a request queued in one address space to execute code in another; useful for delegating work off the calling task." },
      { question: "What is sysplex-wide GRS used for?", options: ["Global routing of SYSOUT", "Distributing batch jobs across systems", "Preventing concurrent dataset access across all sysplex members", "Managing SMS allocation"], answer: 2, explanation: "Global Resource Serialization extends dataset/resource locking across sysplex boundaries, ensuring exclusive access even from multiple z/OS images." },
      { question: "In a sysplex, what does a shared Coupling Facility cache structure reduce?", options: ["Spool consumption", "DASD I/O by caching frequently-accessed data (e.g., RACF profiles) in fast CF memory", "Network latency", "CPU overhead only"], answer: 1, explanation: "CF cache structures hold copies of frequently-accessed data; all sysplex members access these from fast shared memory instead of DASD." }
    ],
    practical: [
      { title: "Task 1 – Access and Navigate z/OSMF, Create a Workflow", description: "Log in to z/OSMF using a web browser, explore the available task plugins in the left navigation, and create or instantiate a simple workflow template (e.g., system inquiry or library management). Review workflow steps and execute it if permitted.", hints: ["Hint 1: Access z/OSMF at https://hostname:port/zosmf (ask your instructor for the correct hostname and port).", "Hint 2: Log in with your z/OS user ID and password.", "Hint 3: Click 'Workflows' in the left navigation; browse available workflow definitions.", "Hint 4: Select a pre-defined workflow template, provide required variables (dataset names, etc.), and click 'Start Workflow'.", "Hint 5: Monitor the workflow progress; observe approval gates, automated steps, and completion status."], solution: "Upon successful z/OSMF access and workflow instantiation, you will see: (a) z/OSMF main dashboard with System Status widget. (b) Workflows task pane showing available workflow templates. (c) After instantiation, workflow execution dashboard showing step-by-step progress, current step owner (if approval required), and estimated completion. (d) Workflow completion report with a summary of executed steps and any errors or warnings. This demonstrates the modern browser-based management capabilities of z/OSMF." },
      { title: "Task 2 – Review Sysplex Status via XCF and z/OSMF", description: "Use operator commands (D XCF,ALL from SDSF LOG) to display sysplex members and CF structure status. Compare this with the z/OSMF System Status dashboard view. Identify active z/OS members, CF allocation, and any structures in 'rebuild' or 'failed' state.", hints: ["Hint 1: From SDSF LOG, issue the command 'D XCF,ALL' to list all sysplex members and CF membership status.", "Hint 2: Look for messages indicating: - Active members' names and ASID — - CF structure names and their current status (ACTIVE, REBUILD, FAILED). - Sysplex name and operational status.", "Hint 3: Log into z/OSMF and navigate to System Status. Compare the sysplex member list with XCF output.", "Hint 4: If a structure shows status REBUILD, note which member(s) are rebuilding and the reason (e.g., CF failure recovery)."], solution: "Expected observations: (1) D XCF,ALL output displays sysplex members (e.g., SYS1, SYS2), each with their participation status (JOINED, LEAVING, etc.). (2) CF Structures listed with names and status: e.g., 'CFLOCKS        ACTIVE    ALL_MEMBERS_ACTIVE'. (3) z/OSMF System Status dashboard shows the same members in a hierarchical tree with visual status indicators (green for active, red for failed). (4) If any structure is in REBUILD state: e.g., 'CFDATA        REBUILD    MEMBER2_REBUILDING', this indicates system recovery is in progress. Coordination and failover are working as designed. This exercise demonstrates XCF's role in sysplex coordination and the value of z/OSMF's consolidated view." },
      { title: "Task 3 – Explore Cross-Memory Services (Optional Advanced)", description: "Use RACF commands to list defined PC (Program Call) routines and their associated entry points. Query which address spaces have permission to call a specific PC routine. This demonstrates the security controls around cross-memory services.", hints: ["Hint 1: Issue RACF command 'PERMIT pcname CLASS(PROGRAM) ID(userid) LIST' to see who has PERMIT to call a PC routine.", "Hint 2: Use 'LISTDSD CLASS(PROGRAM)' to list all defined PC routines and their entry point addresses.", "Hint 3: Cross-memory services are usually defined and controlled by system programmers; review documentation to understand which subsystems define PC routines (e.g., CICS, JES2, RACF)."], solution: "Expected observations: (a) RACF PERMIT output shows user IDs or job names allowed to invoke specific PC routines. (b) LISTDSD output lists PC routines, entry point addresses, and associated address spaces. (c) Understanding this output demonstrates how z/OS enforces security boundaries for inter-address-space communication. In production, do not modify these PROGRA M class definitions without architect review, as they are critical for system functionality." }
    ]
  },

  //  Hardware & Virtualization (1 card) 

  {
    id: "l2-hardware",
    level: 2,
    category: "Hardware & Virtualization",
    title: "HCD, IODF & Advanced Connectivity",
    summary: "Hardware Configuration Definition (HCD), Work/Production IODF lifecycle, dynamic I/O changes, FICON connectivity, and PPRC for storage replication.",
    content: `
      <h2>Hardware Configuration Definition (HCD) – The I/O Configuration Tool</h2>
      <p><strong>HCD (Hardware Configuration Definition)</strong> is an ISPF-based graphical tool that system programmers use to define the z/OS I/O subsystem configuration. It replaces the legacy IOCP (Input/Output Configuration Program) line-based language with an interactive, menu-driven interface. HCD assists in: defining channel paths (CHPIDs), physical and logical devices (DASD, tape), adapters (FICON, OSA, Hipersockets), MTIFs (Multi-Tasking Image Facility) for multi-image systems, and subchannel sets for logical resource grouping.</p>
      <p><strong>HCD Workflow:</strong> (1) <strong>Load Existing Configuration:</strong> HCD reads a work IODF to start editing. (2) <strong>Define/Modify Hardware Objects:</strong> Create or alter CHPID definitions, device types, logical devices, and their connectivity. (3) <strong>Build Production IODF:</strong> HCD compiles the work IODF into a binary Production IODF used by z/OS and HMC. (4) <strong>Activate:</strong> The production IODF is activated either at CPC IPL or dynamically without an IPL (for incremental changes). HCD validates the configuration for consistency (e.g., no duplicate device addresses, proper channel-device connectivity).</p>
      <p><strong>HCD Panels Overview:</strong> - <strong>CHPID Panel:</strong> Define physical channels (e.g., 'CHPID 00 TYPE FICON'). - <strong>Device Definitions:</strong> Define logical devices with address, device type (3390 for DASD, 3480 for tape), and assigned channels. - <strong>Connectivity:</strong> Assign devices to channels and specify redundancy (e.g., device 0100 accessible via CHPIDs 00 and 01). - <strong>CTC / Hipersockets:</strong> Define inter-LPAR virtual channels. - <strong>Link Configuration:</strong> Special configurations for specific hardware (e.g., coupling facility, CAPI adapters).</p>

      <h2>IODF (I/O Definition File) – The Configuration Blueprint</h2>
      <p><strong>IODF (I/O Definition File)</strong> is a partitioned dataset (PDS) that stores I/O configuration data in a standardized format. It is the single source of truth for I/O configuration used by both z/OS and the HMC. An IODF contains multiple members (partitions), one per 'configuration' or 'image profile,' allowing different configurations to be defined and activated as needed.</p>
      <p><strong>Work IODF vs. Production IODF:</strong> - <strong>Work IODF (e.g., IOCDS.WORK):</strong> The editable configuration. System programmers use HCD to modify this member. It is not loaded by z/OS directly; it's an editor state. - <strong>Production IODF (e.g., IOCDS.PROD):</strong> The compiled, binary configuration generated by 'Building' the work IODF in HCD. This is what z/OS loads at IPL and what the HMC uses to manage LPARs. - <strong>Backup/Previous IODFs:</strong> Historical versions (e.g., IOCDS.PREV) saved for rollback if an activation causes issues.</p>
      <p><strong>EDT (Element Definition Table) &amp; Subchannel Sets:</strong> - <strong>EDT:</strong> An internal HCD structure that indexes device definitions for efficient lookup by address or name. - <strong>Subchannel Sets:</strong> Logical groupings of devices assigned to specific LPARs or functional areas. Subchannels allow z/OS to manage I/O operations; each device gets a subchannel number for I/O queuing and scheduling. Multiple devices can share a subchannel path if they're on the same CHPID, but z/OS serializes access to prevent conflicts.</p>

      <h2>Dynamic I/O Changes – Reconfiguration Without IPL</h2>
      <p><strong>Dynamic I/O (variable-definition I/O)</strong> is a z/OS capability to add, delete, or modify channel paths and logical devices while the system is running, without requiring an IPL. This is critical for high-availability environments where downtime is unacceptable. Dynamic I/O changes are performed by:</p>
      <ul>
        <li><strong>Modifying the Work IODF:</strong> Alter device or channel definition via HCD.</li>
        <li><strong>Building a Production IODF:</strong> Compile the changes.</li>
        <li><strong>Using 'Activate' or 'Vary' Commands:</strong> Issue operator commands to load the new definition and activate the change. - 'VARY PATH(00),ONLINE' brings a channel online. - 'VARY PATH(00),OFFLINE' takes a channel offline. - 'VARY DEVICE(0100),ONLINE' brings a device online.</li>
        <li><strong>z/OS Validation:</strong> z/OS verifies the change doesn't conflict with existing definitions and applies it to the running system's I/O control tables (IOCBs).</li>
      </ul>
      <p><strong>Benefits of Dynamic I/O:</strong> - <strong>Planned Maintenance:</strong> Replace a failing FICON card without system downtime. - <strong>Capacity Expansion:</strong> Add new DASD volumes and bring them online for immediate use. - <strong>Failover:</strong> Dynamically redirect I/O to redundant paths if a channel fails. - <strong>Testing:</strong> Validate new I/O configurations on a production system before full deployment.</p>

      <h2>FICON & Advanced Connectivity – Storage Integration</h2>
      <p><strong>FICON (Fibre Connection)</strong> is the modern high-speed I/O protocol connecting IBM Z servers to external storage subsystems (SANs). FICON links can operate at speeds up to 32 Gbps (32 Gigabits per second), far exceeding older ESCON speeds (200 Mbps). FICON channels are defined in HCD and assigned CHPID addresses.</p>
      <p><strong>Storage Area Network (SAN) Architecture:</strong> In a SAN environment, multiple z/OS systems and other servers connect to shared storage via FICON switches and fabric. - <strong>FICON Switch (Director):</strong> A Brocade or IBM SAN switch that routes FICON traffic between hosts (z/OS) and storage devices. - <strong>Zoning:</strong> The switch administrator defines 'zones' (logical groups) to control which hosts can access which storage devices. Example: ZONE 'PROD' contains production z/OS systems and their assigned DASD; ZONE 'DEV' contains dev systems and test DASD. Improper zoning can cause production outages. - <strong>LUN (Logical Unit Number):</strong> Within a storage subsystem (e.g., DS8000 array), logical volumes are identified by LUN. A single z/OS logical device (e.g., 0100) can map to a LUN in the SAN-attached array.</p>
      <p><strong>PPRC (Peer-to-Peer Remote Copy):</strong> A storage replication technology (primarily IBM DASD) that copies data from one storage system to another, typically at a remote data center, for disaster recovery. - <strong>Synchronous PPRC:</strong> Every write to primary storage is immediately replicated to the remote site before returning success to the application. Guarantees zero data loss but adds I/O latency. - <strong>Asynchronous PPRC:</strong> Writes are returned to the application immediately; copies are sent to the remote site in the background on a periodic basis. Faster but risks data loss if an outage occurs before all updates are transmitted. - <strong>PPRC Management:</strong> Configured via storage subsystem administrator interfaces; z/OS applications are unaware of PPRC, providing transparent failover.</p>
      <p><strong>SAN Connectivity Best Practices:</strong> - <strong>Redundancy:</strong> Multiple FICON paths between z/OS and storage for failover. - <strong>Zoning Security:</strong> Strict zoning to prevent accidental cross-contamination (prod accessing dev storage). - <strong>Monitoring:</strong> Track FICON link health, switch performance, and replication lag (for PPRC). - <strong>Firmware Updates:</strong> Keep storage firmware and switch firmware synchronized to avoid compatibility issues.</p>

      <h2>Sources &amp; References</h2>
      <div style="margin-top:20px; padding:20px; background-color:#e8f4f8; border-left:5px solid #0066cc; border-radius:4px; font-size:0.9em; line-height:1.8;">
        <ul style="margin: 0; padding-left: 20px; list-style-type:none;">
          <li>• <a href="https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.4.0/com.ibm.zos.v2r4.ieaa100/toc.htm" target="_blank" style="color:#0066cc; text-decoration:none;">IBM z/OS Concepts</a> (Publication SY28-1149)</li>
          <li>• <a href="https://www.ibm.com/support/knowledgecenter/SSLTBW_2.5.0/com.ibm.zos.v2r5.hlbpg/chpd1intro.htm" target="_blank" style="color:#0066cc; text-decoration:none;">z/OS I/O Configuration Reference</a> (Publication SA22-7938)</li>
          <li>• <a href="https://www.ibm.com/support/knowledgecenter/SSLTBW/hcd-reference-guide" target="_blank" style="color:#0066cc; text-decoration:none;">HCD (Hardware Configuration Definition) Reference Guide</a></li>
          <li>• <a href="https://www.ibm.com/support/knowledgecenter/SSLTBW/dynamic-io-operations" target="_blank" style="color:#0066cc; text-decoration:none;">Dynamic I/O Reconfiguration Guide</a></li>
          <li>• <a href="https://www.ibm.com/support/knowledgecenter/SSLTBW/ficon-connectivity-guide" target="_blank" style="color:#0066cc; text-decoration:none;">FICON and SAN Connectivity Best Practices</a></li>
          <li>• <a href="https://www.redbooks.ibm.com/redbooks/pdfs/sg246981.pdf" target="_blank" style="color:#0066cc; text-decoration:none;">IBM Redbook SG246981</a> — z/OS Systems Programming</li>
        </ul>
      </div>
    `,
    mcq: [
      { question: "What does HCD stand for?", options: ["Hardware Channel Definition", "Hardware Configuration Definition", "High-Capacity Device", "Host Channel Directory"], answer: 1, explanation: "HCD (Hardware Configuration Definition) is the ISPF-based tool for defining z/OS I/O configurations." },
      { question: "What is an IODF?", options: ["A JES spool I/O file", "The I/O Definition File describing the hardware configuration", "An ISPF device list", "A RACF I/O class"], answer: 1, explanation: "The IODF stores the complete hardware I/O configuration used by both z/OS and the HMC." },
      { question: "What is the difference between a Work IODF and a Production IODF?", options: ["Name only", "Work IODF is edited in HCD; Production IODF is built and activated", "Work IODFs are larger", "Production IODFs cannot be read"], answer: 1, explanation: "You make changes in a Work IODF, then build it into a Production IODF for activation." },
      { question: "What is FICON?", options: ["A file format", "Fibre Channel I/O connecting IBM Z servers to storage subsystems", "A CICS component", "A RACF feature"], answer: 1, explanation: "FICON (Fibre Connection) is the high-speed I/O protocol used to connect IBM Z to SAN storage." },
      { question: "What does a dynamic I/O change allow without an IPL?", options: ["Change LPAR CPU weights", "Add, delete, or vary channel paths and logical devices while the system runs", "Resize DASD volumes", "Change RACF profiles"], answer: 1, explanation: "Dynamic I/O changes reconfigure channels and devices online, avoiding the need to take the system down." },
      { question: "What is an EDT in the context of HCD?", options: ["Enterprise Data Table", "Element Definition Table indexing device definitions for efficient lookup", "Error Diagnostics Table", "Extended Device Type"], answer: 1, explanation: "EDT (Element Definition Table) is an internal HCD structure used to organize and quickly access device definitions." },
      { question: "What is the primary advantage of synchronous PPRC over asynchronous PPRC?", options: ["Faster performance at the remote site", "Zero data loss guarantee; every write is replicated before returning to the application", "Lower bandwidth usage", "Simpler configuration"], answer: 1, explanation: "Synchronous PPRC guarantees consistency but adds I/O latency; asynchronous PPRC is faster but risks data loss if outage occurs." },
      { question: "In a SAN environment, what does a FICON switch 'zone' control?", options: ["Network IP subnets", "Which hosts can access which storage devices", "The speed of FICON links", "RACF user permissions"], answer: 1, explanation: "Zoning restricts FICON fabric access; improper zoning can cause production outages or data exposure." },
      { question: "What does the VARY DEVICE(0100),ONLINE command do?", options: ["Power-on the physical device", "Bring a logical device online dynamically without an IPL", "Reload the production IODF", "Start a DASD initialization"], answer: 1, explanation: "VARY is an operator command that dynamically changes the online/offline status of devices and channel paths." },
      { question: "What is a subchannel in the context of HCD/IODF?", options: ["A backup channel path", "A logical queue number used by z/OS for I/O operations on a specific device", "A reduced-speed channel type", "A virtual FICON connection"], answer: 1, explanation: "Subchannels allow z/OS to manage multiple I/O operations; each device is assigned a subchannel for queuing and scheduling." },
      { question: "Which tool do system programmers use to edit I/O configurations in modern z/OS?", options: ["IOCP (line-based)", "HCD (ISPF-based interactive)", "Operator console commands only", "ISPF 3.2 allocation"], answer: 1, explanation: "HCD is the modern, menu-driven replacement for IOCP, providing an interactive ISPF interface for I/O configuration." },
      { question: "What happens if improper SAN zoning is configured?", options: ["Slower FICON performance only", "Development systems could accidentally access production DASD, risking data exposure or corruption", "Automatic failover activates", "Nothing; zoning is advisory only"], answer: 1, explanation: "Zoning is a critical security control; misconfiguration can breach isolation between production and non-production environments." }
    ],
    practical: [
      { title: "Task 1 – View Existing IODF Configuration (zXplore Observation)", description: "If you have access to z/OS with HCD, load and review an existing production IODF to understand the channel and device definitions. Observe (without modifying) the device addresses, assigned CHPIDs, and connectivity mappings. If using zXplore, check system logs or consult with your instructor for sample IODF structures.", hints: ["Hint 1: From ISPF, enter 'HCD' to access Hardware Configuration Definition.", "Hint 2: Select 'Work with IODF' and load an existing configuration.", "Hint 3: Navigate to the CHPID panel to view configured channels (e.g., 'CHPID 00 TYPE FICON, FICON 01 TYPE FICON').", "Hint 4: View the Device panel to see logical devices (e.g., 'DEVICE 0100 TYPE 3390-12 on CHPID 00,01').", "Hint 5: For zXplore users: consult documentation or ask instructors for sample configuration descriptions.", "Hint 6: Do NOT modify the configuration without explicit authorization."], solution: "Upon reviewing the IODF, you will observe: (a) CHPID definitions showing physical channels (e.g., 20 FICON channels defined). (b) Device definitions with addresses, types (3390 DASD, 3480 tape), and assigned CHPIDs. (c) Redundancy patterns (e.g., DASD device 0100 connected to CHPIDs 00 and 01 for dual-path failover). (d) Multi-image (LPAR) assignments showing which devices belong to which image profile. This demonstrates the hierarchical I/O architecture and confirms that proper redundancy is in place." },
      { title: "Task 2 – Hercules/Hyperion Users: Create and Activate a Dynamic I/O Change", description: "For users with Hercules or Hyperion emulator: Create a copy of the work IODF, add a new logical device definition (e.g., a new DASD LUN), build a production IODF, and activate the change using VARY commands. Then verify the device is accessible via z/OS.", hints: ["Hint 1: In HCD, load your work IODF for Hercules configuration.", "Hint 2: Navigate to Device Definitions and add a new device: 'DEVICE 0101 TYPE 3390-12 on CHPID 00'.", "Hint 3: Build the production IODF (File → Build).", "Hint 4: From the z/OS operator console (Hercules monitor), issue: 'VARY DEVICE(0101),ONLINE'.", "Hint 5: In z/OS ISPF, use 3.2 (allocation) to reference the new device and allocate a dataset.", "Hint 6: Verify the dataset is allocated to the new device with 'LISTDSI' or ISPF 3.4 browse."], solution: "Expected Hercules/Hyperion outcome: (1) New device successfully added to IODF. (2) Production IODF compiled without errors. (3) VARY command returns 'IEE094I DEVICE(0101) VARIED ONLINE'. (4) z/OS successfully allocates a dataset to the new device, confirming end-to-end I/O path functionality. (5) This demonstrates that dynamic I/O changes can be deployed on an emulated system for learning and validation before applying to production." },
      { title: "Task 3 – SAN Connectivity &amp; FICON Zone Review (Observational)", description: "Learn about your organization's SAN configuration (if available) or consult documentation. Identify: the FICON fabric (switch model and firmware), configured zones, and which z/OS systems/LPARs belong to which zones. Document the architecture by describing the prod, dev, and test zones and their respective storage device assignments.", hints: ["Hint 1: Contact your storage team or SAN administrator for SAN topology documentation.", "Hint 2: Ask for or create a SAN diagram showing: Switch hardware, FICON links from z/OS to switch, storage subsystems (disk arrays) connected to switch, and logical zones.", "Hint 3: Identify which z/OS LPARs are in the PROD zone and which DASD LUNs they can access.", "Hint 4: Note any inter-zone restrictions and the business justification (e.g., 'DEV cannot access PROD for security').", "Hint 5: Review your organization's RTO/RPO (Recovery Time Objective / Recovery Point Objective) to understand PPRC replication strategy (synchronous vs. asynchronous)."], solution: "Expected outcome: (1) Documentation of SAN zones showing production, development, and test environments. (2) Identification of FICON paths and redundancy (typically dual-path for resilience). (3) Confirmation that zones are properly segregated to prevent cross-environment data access. (4) Understanding of PPRC replication status, if deployed (e.g., 'Primary DC syncs to Backup DC with <1 sec lag'). This observational task reinforces SAN architecture principles and demonstrates real-world high-availability design." }
    ]
  },

  //  Storage & Data Management L2 (2 cards) 

  {
    id: "l2-dfsms-acs",
    level: 2,
    category: "Storage & Data Management",
    title: "DFSMS Constructs & ACS Routines",
    summary: "The four DFSMS constructs (storage class, data class, management class, storage group), writing and testing ACS routines, and managing SMS policy with ISMF.",
    content: `
      <h2>DFSMS Overview</h2>
      <p><strong>DFSMS (Data Facility Storage Management Subsystem)</strong> is the policy engine that takes the manual, ad-hoc storage decisions a programmer used to make in JCL and turns them into <em>centrally managed, site-wide rules</em>. Before SMS, every JCL author had to hand-pick UNIT, VOLSER, SPACE, DCB, and so on for every new dataset — predictably leading to misallocated production data on test volumes, inconsistent backup coverage, and storage administrators losing sleep. SMS fixes this by intercepting every dataset allocation, classifying the request, and automatically supplying the right physical attributes and lifecycle policy based on rules a storage administrator wrote once.</p>
      <p><strong>The "I don't care, just do the right thing" model:</strong> When SMS is fully deployed, application JCL stops specifying UNIT, VOLSER, and most DCB parameters. The job simply asks for a dataset by name, and SMS — driven by the classification rules in the ACS routines — chooses the volume, allocation profile, performance tier, and backup/retention policy automatically. The programmer doesn't need to know which DASD subsystem the data lands on; the storage administrator doesn't need to review every JCL deck.</p>

      <h2>The Four SMS Constructs</h2>
      <p>SMS expresses storage policy through four named "constructs," each governing a different dimension. Together they cover the full lifecycle of a dataset.</p>
      <ul>
        <li><strong>Data Class (DC)</strong> — <em>"What does the dataset look like?"</em> Defines allocation defaults: RECFM, LRECL, BLKSIZE, DSORG (PS / PO / PO-E / VSAM type), SPACE primary/secondary units, retention period (RETPD), volume count (max 59), VSAM-specific KEYLEN/RKP/CISIZE/FREESPACE, and extended-format flags (EATTR, EXTENDED, COMPRESS). Data class lets the programmer write <code>DATACLAS=DSN_FB80</code> instead of repeating six DCB parameters in every job.</li>
        <li><strong>Storage Class (SC)</strong> — <em>"What performance/availability does it need?"</em> Specifies the QoS the dataset requires: response-time goals (Direct/Sequential MSR — millisecond response), availability level (STANDARD vs CONTINUOUS — for PPRC-mirrored volumes), accessibility (whether the dataset can tolerate brief outages), guaranteed space (volume reserved at allocation), guaranteed synchronous write, and CF cache structure name (for sysplex caching). Storage class is the <em>only</em> construct that, when assigned, makes a dataset "SMS-managed" — without an SC, SMS leaves the dataset alone.</li>
        <li><strong>Management Class (MC)</strong> — <em>"How is its lifecycle managed?"</em> Drives DFSMShsm and DFSMSdss behaviour: how many backup versions to keep, primary/secondary backup frequency, expiration date, time-to-migration to ML1, time-to-migration to ML2, partial-release behaviour (return unused space), GDS retention, and aggregate backup membership. Management class is the bridge between SMS allocation and the long-term storage hierarchy.</li>
        <li><strong>Storage Group (SG)</strong> — <em>"Which physical volumes are eligible?"</em> A named pool of DASD volumes (or VIO, or dummy, or tape, or object storage) from which SMS picks one when a new dataset needs space. Each volume is assigned to exactly one storage group. SGs typically map to performance tiers (e.g., <code>SG_PROD_TIER1</code> on flash, <code>SG_DEV</code> on older arrays) or business units. Storage groups are the only construct that learners and applications never name explicitly — they are picked by the SG ACS routine based on the storage class.</li>
      </ul>
      <p><strong>Mental model:</strong> DC says <em>what shape</em>, SC says <em>what quality</em>, MC says <em>what lifecycle</em>, SG says <em>what hardware</em>. The first three are visible to applications (and overridable in JCL); SG is purely a back-end pool.</p>

      <h2>ACS Routines</h2>
      <p><strong>ACS (Automatic Class Selection)</strong> routines are short programs, written in a small SMS-specific language, that fire on every new dataset allocation and decide which DC / SC / MC / SG the new dataset gets. There are exactly <strong>four ACS routines</strong>, one per construct, executed in a fixed order:</p>
      <ol>
        <li><strong>DC ACS routine</strong> — runs first; assigns a data class (or NULL).</li>
        <li><strong>SC ACS routine</strong> — assigns a storage class; <em>this is the gatekeeper</em>. If SC is left NULL, the dataset is non-SMS-managed and the remaining two routines do not run.</li>
        <li><strong>MC ACS routine</strong> — assigns a management class.</li>
        <li><strong>SG ACS routine</strong> — picks the storage group (and therefore the volume).</li>
      </ol>
      <p><strong>ACS Language Essentials:</strong> The language is declarative and intentionally simple — no loops, no I/O, no calls. It exposes <strong>read-only variables</strong> describing the request and <strong>one write-only variable</strong> per routine for the chosen class.</p>
      <ul>
        <li><strong>Read-only variables (a selection):</strong> <code>&amp;DSN</code> (full dataset name), <code>&amp;DSTYPE</code> (PERM/TEMP/GDS), <code>&amp;HLQ</code> (high-level qualifier), <code>&amp;LLQ</code> (low-level qualifier), <code>&amp;DSORG</code> (PS/PO/VS/...), <code>&amp;RECFM</code>, <code>&amp;LRECL</code>, <code>&amp;NQUAL</code> (number of qualifiers), <code>&amp;USER</code> (TSO ID submitting), <code>&amp;GROUP</code> (RACF group), <code>&amp;JOB</code>, <code>&amp;PGM</code> (calling program), <code>&amp;UNIT</code>, <code>&amp;EXPDT</code>, <code>&amp;ANYVOL</code>, and many more.</li>
        <li><strong>Write-only variable</strong> (one per routine): <code>&amp;DATACLAS</code>, <code>&amp;STORCLAS</code>, <code>&amp;MGMTCLAS</code>, <code>&amp;STORGRP</code> (the last one accepts up to 15 names — SMS picks the first eligible).</li>
        <li><strong>FILTLIST</strong> — defines a named pattern list reused across WHEN clauses: <code>FILTLIST PROD_HLQS INCLUDE('PROD.**','PRD2.**') EXCLUDE('PROD.TEMP.**')</code>. Patterns use <code>*</code> (any one qualifier or part), <code>**</code> (zero or more qualifiers), and exact strings.</li>
        <li><strong>WHEN / SELECT / SET / EXIT</strong> — the control-flow verbs:
          <pre style="background:#0d0d0d;color:#ffb000;padding:.8rem;border-radius:4px;overflow-x:auto;font-family:'Share Tech Mono',monospace;font-size:.85rem;line-height:1.45;margin:.5rem 0;">FILTLIST PROD INCLUDE('PROD.**')
FILTLIST DEV  INCLUDE('DEV.**','TEST.**')

SELECT
  WHEN (&amp;DSN = &amp;PROD)
    SET &amp;STORCLAS = 'SC_PROD_T1'
  WHEN (&amp;DSN = &amp;DEV  AND &amp;DSORG = 'VS')
    SET &amp;STORCLAS = 'SC_DEV_VSAM'
  WHEN (&amp;DSN = &amp;DEV)
    SET &amp;STORCLAS = 'SC_DEV_T2'
  OTHERWISE
    SET &amp;STORCLAS = ''   /* leave non-SMS-managed */
END</pre>
        </li>
      </ul>
      <p><strong>Override Hierarchy:</strong> A JCL author can <em>request</em> a specific class with <code>DATACLAS=...</code>, <code>STORCLAS=...</code>, <code>MGMTCLAS=...</code> on the DD statement. The ACS routine sees this as <code>&amp;DATACLAS</code> on entry and is free to honour it, change it, or NULL it out. Sites typically write the ACS routine to honour user requests for DC and MC but enforce SC and SG centrally so that volume selection cannot be subverted.</p>

      <h2>SMS Configuration Lifecycle</h2>
      <p>SMS configurations are stored in three VSAM datasets that play distinct roles:</p>
      <ul>
        <li><strong>SCDS (Source Control Data Set)</strong> — The editable "source code" of a configuration. Storage administrators define and change constructs and ACS routines against an SCDS through ISMF.</li>
        <li><strong>ACDS (Active Control Data Set)</strong> — The compiled, read-only configuration currently in effect. An SCDS is "translated" (ACS routines compiled) and "activated," which produces the ACDS and binds it to all systems in the sysplex.</li>
        <li><strong>COMMDS (Communications Data Set)</strong> — A small VSAM dataset used by all systems sharing the configuration to communicate volume-status updates and serialise activations.</li>
      </ul>
      <p><strong>Lifecycle:</strong> Edit SCDS in ISMF → Translate ACS routines (compile-and-validate) → Validate (cross-check construct references) → Test (run sample allocations through the ACS routines without activating) → Activate (replace the running ACDS, distributed sysplex-wide via COMMDS). At any moment the system has exactly one active ACDS but can store many SCDS versions, enabling rollback.</p>

      <h2>ISMF</h2>
      <p><strong>ISMF</strong> is the ISPF-based panel interface to all of DFSMS. Reached from ISPF (often option 6 or via TSO ISMF). The primary menu offers:</p>
      <ul>
        <li><strong>0 — ISMF Profile:</strong> session preferences.</li>
        <li><strong>1 — Data Class</strong> · <strong>2 — Storage Class</strong> · <strong>3 — Management Class</strong> · <strong>4 — Storage Group</strong>: define / display / alter constructs.</li>
        <li><strong>5 — Automatic Class Selection:</strong> edit, translate, validate, and test ACS routines.</li>
        <li><strong>6 — Control Data Set:</strong> manage SCDS / ACDS / COMMDS, activate configurations.</li>
        <li><strong>7 — Aggregate Group</strong> · <strong>8 — Library Management:</strong> backup grouping and tape library admin.</li>
        <li><strong>9 — Copy Pool</strong> · <strong>10 — Enhanced ACS Management:</strong> snapshot grouping and ACS lifecycle helpers.</li>
        <li><strong>11 — Data Set</strong> · <strong>P — Profile:</strong> dataset-level inquiry, including which SMS classes a given dataset has.</li>
      </ul>
      <p><strong>Authority note:</strong> Defining and altering constructs requires the <code>STGADMIN.*</code> RACF FACILITY-class profiles (typically only storage administrators have these). <em>Display</em> mode (LIST and DISPLAY operations) is usually granted more widely so application teams can see what classes apply to their datasets — this is the mode learners on shared systems can normally use.</p>

      <h2>ACS Test Mode</h2>
      <p>ISMF option 5 includes a <strong>test facility</strong> that runs candidate allocations through an SCDS's ACS routines without activating them. Each test case specifies a dataset name and optional override fields (DSORG, RECFM, requesting user, JCL-supplied DATACLAS, etc.); the test tool reports which class each routine assigned and which WHEN clause matched. This is essential when changing ACS rules: a sloppy edit could send production data to a dev volume, or leave new datasets non-SMS-managed entirely.</p>

      <h2>Sources &amp; References</h2>
      <div style="margin-top:20px; padding:20px; background-color:#e8f4f8; border-left:5px solid #0066cc; border-radius:4px; font-size:0.9em; line-height:1.8;">
        <ul style="margin: 0; padding-left: 20px; list-style-type:none;">
          <li>• <a href="https://www.ibm.com/docs/en/zos/2.5.0?topic=zos-dfsmsdfp-storage-administration" target="_blank" style="color:#0066cc; text-decoration:none;">DFSMSdfp Storage Administration</a> (Publication SC23-6860) — primary reference for constructs and ACS</li>
          <li>• <a href="https://www.ibm.com/docs/en/zos/2.5.0?topic=zos-dfsms-using-isms-interactive-storage-management-facility" target="_blank" style="color:#0066cc; text-decoration:none;">DFSMS Using ISMF</a> (Publication SC23-6868)</li>
          <li>• <a href="https://www.ibm.com/docs/en/zos/2.5.0?topic=zos-dfsms-implementing-system-managed-storage" target="_blank" style="color:#0066cc; text-decoration:none;">DFSMS Implementing System-Managed Storage</a> (Publication SC23-6849)</li>
          <li>• <a href="https://www.redbooks.ibm.com/abstracts/sg246979.html" target="_blank" style="color:#0066cc; text-decoration:none;">IBM Redbook SG24-6979</a> — ABCs of z/OS System Programming Vol. 3 (DFSMS)</li>
          <li>• <a href="https://www.ibm.com/docs/en/zos/2.5.0?topic=routines-acs-language-reference" target="_blank" style="color:#0066cc; text-decoration:none;">ACS Language Reference</a> — read-only variables, FILTLIST, SELECT/WHEN syntax</li>
          <li>• <a href="https://www.ibm.com/docs/en/zos/2.5.0?topic=zos-mvs-jcl-reference" target="_blank" style="color:#0066cc; text-decoration:none;">MVS JCL Reference</a> — DATACLAS, STORCLAS, MGMTCLAS keyword overrides</li>
        </ul>
      </div>
    `,
    mcq: [
      { question: "What does ACS stand for in DFSMS?", options: ["Automatic Class Selection", "Access Control System", "Archive and Copy Service", "Allocated Class Structure"], answer: 0, explanation: "ACS routines automatically assign SMS classes to datasets at allocation time based on dataset name, requesting user, and other request attributes." },
      { question: "Which SMS construct defines backup frequency, retention, and migration thresholds?", options: ["Storage class", "Data class", "Management class", "Storage group"], answer: 2, explanation: "Management class governs DFSMShsm/DFSMSdss policy: backup versions, expiration, ML1/ML2 migration timing, and partial-release behaviour." },
      { question: "What is an SMS storage group?", options: ["A RACF group for storage administrators", "A named pool of DASD volumes used to satisfy storage class requests", "A Db2 tablespace group", "A JES class assignment"], answer: 1, explanation: "A storage group is a labelled pool of DASD volumes from which SMS allocates space; each volume belongs to exactly one storage group." },
      { question: "Which ISMF primary-menu option is used to define a new storage class?", options: ["Option 1 (Data Class)", "Option 2 (Storage Class)", "Option 3 (Management Class)", "Option 4 (Storage Group)"], answer: 1, explanation: "ISMF option 2 provides panels to display, define, alter, and delete storage classes." },
      { question: "In an ACS routine, what does FILTLIST do?", options: ["Applies a filter to SMF records", "Defines a named list of patterns reused in WHEN conditions", "Lists active storage groups", "Filters RACF audit events"], answer: 1, explanation: "FILTLIST creates a named pattern list (with INCLUDE/EXCLUDE) that can be tested in WHEN statements for clean, efficient multi-value matching." },
      { question: "Which SMS construct, when left NULL by ACS, makes the dataset non-SMS-managed?", options: ["Data class", "Storage class", "Management class", "Storage group"], answer: 1, explanation: "Storage class is the gatekeeper: only datasets with an SC become SMS-managed. If the SC ACS routine returns NULL, the remaining MC and SG routines do not even run." },
      { question: "In what order do the four ACS routines execute?", options: ["SG → SC → MC → DC", "DC → SC → MC → SG", "SC → DC → SG → MC", "MC → SC → DC → SG"], answer: 1, explanation: "Order is fixed: Data Class first, then Storage Class (gatekeeper), then Management Class, then Storage Group. Each routine can see the classes set by the previous ones." },
      { question: "What is the role of the SCDS (Source Control Data Set)?", options: ["Holds the active, in-effect SMS configuration", "Holds the editable SMS configuration source — constructs and ACS source — for staging changes", "Logs SMS volume-status updates across the sysplex", "Stores SMF records related to SMS"], answer: 1, explanation: "The SCDS is the editable source. It is translated and activated to produce the ACDS; multiple SCDS versions can coexist, enabling rollback." },
      { question: "What is the COMMDS used for?", options: ["Storing the active ACS routine binaries", "Communicating SMS volume-status updates and serialising activations across systems sharing a configuration", "Backing up the SCDS", "Holding RACF profiles for storage administrators"], answer: 1, explanation: "The COMMDS (Communications Data Set) is the small VSAM file all systems use to coordinate SMS state — current ACDS pointer, volume status, and activation events." },
      { question: "If a JCL author specifies STORCLAS=SC_FAST on a DD statement, what happens?", options: ["The ACS routine is bypassed and SC_FAST is used directly", "The ACS routine sees the request via &STORCLAS on entry and may honour, change, or NULL it", "z/OS rejects the job with a JCL error", "STORCLAS is silently ignored on DD statements"], answer: 1, explanation: "User-supplied class names are passed in as input variables to the ACS routine. Sites typically honour DC/MC requests but enforce SC and SG centrally to protect volume selection." },
      { question: "What does the ISMF ACS test facility do?", options: ["Replays SMF allocation records", "Runs sample dataset allocations through an SCDS's ACS routines without activating, and reports which classes were assigned and which WHEN clauses matched", "Audits RACF authorities of storage administrators", "Benchmarks DFSMShsm migration speed"], answer: 1, explanation: "ACS test mode lets administrators validate ACS rule changes against representative test cases before activating, preventing production allocations from landing in the wrong place." },
      { question: "Which read-only ACS variable contains the high-level qualifier of the dataset being allocated?", options: ["&DSN", "&HLQ", "&LLQ", "&NQUAL"], answer: 1, explanation: "&HLQ exposes the first qualifier; &DSN is the full name, &LLQ the last qualifier, and &NQUAL the qualifier count." },
      { question: "Which RACF FACILITY-class profile prefix typically gates DFSMS administration tasks?", options: ["IRR.*", "STGADMIN.*", "BPX.*", "OPERCMDS.*"], answer: 1, explanation: "Profiles such as STGADMIN.IGD.ACTIVATE and STGADMIN.IGG.* control who may activate configurations, alter constructs, and bypass SMS — usually limited to storage administrators." }
    ],
    practical: [
      {
        title: "Task 1 — Inspect the SMS Classes Assigned to Your Datasets",
        description: "On any z/OS system you have a TSO logon to (zXplore, classroom, Hercules ADCD), allocate a small sequential dataset and then use IDCAMS LISTCAT and ISMF Option 11 (Data Set) in display mode to see exactly which DATACLAS, STORCLAS, and MGMTCLAS the ACS routines assigned to it. This is the single most important hands-on exercise for understanding SMS in practice — it makes the otherwise invisible ACS routines visible by showing their output.",
        hints: [
          "Hint 1: First create something to inspect — from ISPF 3.2 allocate yourID.SMS.TEST as a small FB,80 sequential dataset (5 tracks primary, 2 secondary). Don't specify DATACLAS or STORCLAS on the panel — let the ACS routines decide.",
          "Hint 2: Submit a 1-step IDCAMS LISTCAT job with control statement 'LISTCAT ENTRIES(yourID.SMS.TEST) ALL'. In SYSPRINT look for the SMS-related fields: STORAGECLASS-----name, MANAGEMENTCLASS--name, DATACLASS-------name, and the volume the dataset landed on.",
          "Hint 3: From ISPF type =M.5 to reach ISMF (or just 'ISMF' as a TSO command). Choose option 11 (Data Set), enter your dataset name, and view the panel — same fields will appear, plus a 'View All Class Definitions' option that lets you see the construct attributes themselves.",
          "Hint 4: If LISTCAT shows STORAGECLASS=(NULL) the dataset is non-SMS-managed — meaning the site's SC ACS routine deliberately left it out (often the case for very small test datasets or non-production HLQs). That is itself a finding — it tells you the rules in effect on this system."
        ],
        solution: "<strong>What you should see in LISTCAT output:</strong><pre style=\"background:#0d0d0d;color:#ffb000;padding:1rem;border-radius:4px;overflow-x:auto;font-family:'Share Tech Mono',monospace;font-size:.88rem;line-height:1.45;margin:.6rem 0;\">NONVSAM ------- yourID.SMS.TEST\n     IN-CAT --- USERCAT.PROD\n     HISTORY\n       DATASET-OWNER-----(NULL)     CREATION--------2026.122\n       RELEASE----------------2     EXPIRATION------0000.000\n     SMSDATA\n       STORAGECLASS-----SC_STD       MANAGEMENTCLASS--MC_DEFAULT\n       DATACLASS-------DC_FB80       LBACKUP ---0000.000.0000\n     VOLUMES\n       VOLSER------------SMSV01      DEVTYPE------X'3010200F'\n       FILESEQ-----------------0\n     ASSOCIATIONS--------(NULL)     ATTRIBUTES</pre><strong>What this tells you:</strong> the request 'allocate yourID.SMS.TEST as FB80, 5 tracks' was intercepted by the four ACS routines, which together decided: data class DC_FB80 supplied the DCB defaults, storage class SC_STD made the dataset SMS-managed at standard performance, management class MC_DEFAULT will drive the backup/migration policy, and the SG ACS routine selected a volume (SMSV01) from whatever storage group is wired to SC_STD. None of this was specified in your allocation request — it was all inferred from the dataset name and your user ID by the ACS routines.<br><br><strong>Try variations to expose the rules in effect on your system:</strong> (a) allocate the same dataset under a different HLQ if you have alternates available — does the storage class change? (b) add JCL keyword DATACLAS=SOMENAME to a JCL allocation — does LISTCAT show your requested class or did the ACS routine override it? (c) look at an existing SYS1.* or production-style dataset (one you have READ access to) — almost certainly its SMSDATA fields show production-tier classes very different from yours. The contrast is exactly what the ACS routines exist to produce."
      },
      {
        title: "Task 2 — Override DATACLAS and Observe Whether the ACS Routine Honours It",
        description: "A DD statement may request a specific class with DATACLAS=, STORCLAS=, and MGMTCLAS= keywords. Whether SMS honours your request depends entirely on what the ACS routine is written to do — sites usually accept user-supplied data class and management class but enforce storage class and storage group centrally. This task lets you discover what your particular environment's policy is, with no admin authority required.",
        hints: [
          "Hint 1: First find out what DATACLAS names exist on your system. From ISMF option 1 (Data Class), choose List, leave the SCDS name blank to use the active configuration, and press Enter. You'll get a list of every defined data class. Pick any one — you don't need permission to USE one, only to define one.",
          "Hint 2: Allocate a dataset via JCL with an explicit DATACLAS keyword — e.g., //OUT DD DSN=&SYSUID..SMS.OVERRIDE,DISP=(NEW,CATLG,DELETE),DATACLAS=DC_FB80,SPACE=(TRK,(2,1)).",
          "Hint 3: Submit and then run LISTCAT ENTRIES on the new dataset to see which DATACLAS actually got assigned. Compare against the one you requested.",
          "Hint 4: Repeat with STORCLAS= specifying a storage class name. Sites often have ACS rules that ignore or overwrite user-supplied STORCLAS — if your requested SC didn't stick, that is the policy speaking."
        ],
        solution: "<strong>Working JCL:</strong><pre style=\"background:#0d0d0d;color:#ffb000;padding:1rem;border-radius:4px;overflow-x:auto;font-family:'Share Tech Mono',monospace;font-size:.88rem;line-height:1.45;margin:.6rem 0;\">//SMSOVRD  JOB (ACCT),'SMS OVERRIDE',CLASS=A,MSGCLASS=H,NOTIFY=&amp;SYSUID\n//STEP1    EXEC PGM=IEFBR14\n//OUT      DD  DSN=&amp;SYSUID..SMS.OVERRIDE,\n//             DISP=(NEW,CATLG,DELETE),\n//             DATACLAS=DC_FB80,\n//             STORCLAS=SC_STD,\n//             SPACE=(TRK,(2,1))\n//STEP2    EXEC PGM=IDCAMS\n//SYSPRINT DD  SYSOUT=*\n//SYSIN    DD  *\n  LISTCAT ENTRIES(&amp;SYSUID..SMS.OVERRIDE) ALL\n/*</pre><strong>Three possible outcomes — each is a finding:</strong><br><br>(1) <strong>LISTCAT shows DATACLASS=DC_FB80 and STORAGECLASS=SC_STD</strong> — both your requests were honoured. The ACS routines on this system pass user-supplied classes through unchanged. This is permissive (and rare in production sites).<br><br>(2) <strong>LISTCAT shows DATACLASS=DC_FB80 but STORAGECLASS=(something else)</strong> — your data class was honoured, your storage class was overridden. This is the typical site policy: trust users to know their record format, but keep volume selection under central control.<br><br>(3) <strong>The job fails with IGD17103I or IGD17216I</strong> — you asked for a class that does not exist or that you are not authorised to use. Pick a real class name from ISMF option 1/2 and retry.<br><br><strong>Why this matters:</strong> the ACS routine source code is normally not visible to non-administrators, but its behaviour is entirely observable through experiments like this one. Two or three allocations under different conditions tell you a lot about what the rules look like — which qualifiers are special, whether user requests are honoured, and which classes are actually assignable. This is the standard way developers and analysts reverse-engineer the storage policy of a system they don't administer."
      }
    ]
  },

  {
    id: "l2-hsm-dss",
    level: 2,
    category: "Storage & Data Management",
    title: "DFSMShsm & DFSMSdss",
    summary: "DFSMShsm space management, migration levels, backup and recall operations; DFSMSdss DUMP, RESTORE, and COPY for volume-level backup and dataset copying.",
    content: `
      <h2>DFSMShsm and DFSMSdss Overview</h2>
      <p>If <strong>DFSMS</strong> is the policy engine that decides where new data lands and what shape it takes, <strong>DFSMShsm</strong> and <strong>DFSMSdss</strong> are the two engines that look after data <em>after</em> it exists. They are how a z/OS shop achieves the impossible-sounding promise of "infinite storage": a small pool of expensive primary DASD that <em>appears</em> to hold every dataset the business has ever created, with cheap tape or low-tier disk silently holding the long tail. DFSMShsm provides the automation (move it, age it, back it up, recall it on demand); DFSMSdss provides the raw machinery (read a track, write a track, package a backup image).</p>
      <p><strong>Mental model:</strong> <em>DFSMSdss is a dump truck</em> — give it datasets or volumes and it produces a portable backup image, or copies a dataset somewhere else. <em>DFSMShsm is a logistics manager</em> that drives a fleet of dump trucks (and tape robots) according to policy, deciding what to move, when to move it, how many copies to keep, and how to bring data back transparently when a user opens a file that's no longer on primary disk. The two products integrate so tightly that DFSMShsm internally calls DFSMSdss to do most of the actual data movement.</p>

      <h2>DFSMShsm</h2>
      <p><strong>DFSMShsm (Hierarchical Storage Manager, often abbreviated "HSM")</strong> is a started task that runs continuously on z/OS and applies a small number of policies to every SMS-managed dataset on the system: when to migrate it (move it off primary DASD to cheaper storage), when to back it up (copy it for disaster recovery), and when to expire it (delete it permanently). It also intercepts every dataset open: if the requested dataset has been migrated, HSM transparently recalls it back to primary DASD before the application sees the file. To the programmer, a migrated dataset is indistinguishable from an active one — it just takes a few seconds longer to open the first time after migration.</p>
      <p><strong>The Storage Hierarchy:</strong></p>
      <ul>
        <li><strong>Level 0 (L0) — Primary DASD</strong>: The fast, expensive disk volumes where active datasets live. This is what applications read and write directly. SMS storage groups marked as "primary" are L0.</li>
        <li><strong>Migration Level 1 (ML1) — Secondary DASD</strong>: Slower, cheaper DASD volumes used as a staging tier. Datasets are migrated here first; the data is compressed during migration to save space (compaction is built in). Recall from ML1 takes seconds.</li>
        <li><strong>Migration Level 2 (ML2) — Tape (or low-tier disk)</strong>: Tape cartridges (typically in an automated tape library or virtual tape system) hold long-tail datasets that have not been touched in months or years. Recall from ML2 takes minutes (mount the tape, position, read).</li>
      </ul>
      <p>Datasets flow downward (L0 → ML1 → ML2) automatically as they age, and back upward on demand when a user accesses them.</p>
      <p><strong>Migration Triggers — When Data Moves Down the Hierarchy:</strong></p>
      <ul>
        <li><strong>Threshold migration</strong> — runs when an L0 volume crosses a high-watermark fill percentage (e.g., 85%). HSM picks the oldest, largest datasets on that volume and migrates them until the volume drops below the low watermark (e.g., 75%). This is "I need space NOW" migration.</li>
        <li><strong>Daily space management</strong> — a scheduled overnight cycle that walks every primary volume and migrates any dataset whose <em>last-reference date</em> exceeds the migration age defined in its <strong>management class</strong> (e.g., "migrate if not touched in 30 days"). This is the bulk of routine migration.</li>
        <li><strong>Inter-level migration</strong> — also runs nightly. Moves datasets that have been on ML1 for too long (typically 60–90 days) down to ML2 tape, freeing ML1 for newly migrated data.</li>
        <li><strong>Manual migration</strong> — the <code>HMIGRATE 'dsname'</code> command lets a user (or admin) migrate a specific dataset on demand, useful when you know you won't touch a large file for a while and want to free space immediately.</li>
      </ul>
      <p><strong>Recall — When Data Moves Back Up:</strong> The most important thing to understand is that recall is <em>transparent</em>. When a program issues OPEN against a migrated dataset, the open request is intercepted by HSM, the data is recalled from ML1 (fast) or ML2 (slow), placed back on an L0 primary volume, and only then does OPEN complete. The application sees nothing unusual except a longer-than-normal open time. The user can also force a recall ahead of time with <code>HRECALL 'dsname'</code> — useful before a batch job to avoid waiting during execution.</p>

      <h2>DFSMShsm Backup &amp; Recovery</h2>
      <p>Migration moves data <em>off</em> primary DASD to save space; <strong>backup</strong> copies data <em>in addition to</em> the original to protect against loss. HSM's backup machinery is separate from migration but uses the same hierarchy concepts.</p>
      <ul>
        <li><strong>Daily incremental backup</strong> — every night HSM walks primary volumes, finds datasets that have been changed since their last backup, and copies them to backup tapes (or backup DASD pool). Each dataset can have multiple <strong>versions</strong> retained — typically the management class says "keep 5 daily versions" so a user can recover yesterday's, the day before's, etc.</li>
        <li><strong>Spill backup</strong> — when the backup DASD pool fills, older backup versions are spilled to tape automatically.</li>
        <li><strong>Aggregate backup (ABARS)</strong> — bundles a related set of datasets (an "application aggregate") into a single portable image, useful for disaster recovery test restores or for moving an entire application to another site.</li>
        <li><strong>Recovery commands</strong> — <code>HRECOVER 'dsname'</code> restores the most recent backup version, or <code>HRECOVER 'dsname' GENERATION(n)</code> picks an older version. The dataset is restored to primary DASD, replacing whatever is there (or to a new name with <code>NEWNAME</code>).</li>
      </ul>
      <p><strong>The H-Commands Cheat Sheet</strong> — these are the user-facing TSO interface to DFSMShsm:</p>
      <ul>
        <li><code>HMIGRATE 'dsname'</code> — manually migrate a dataset off L0.</li>
        <li><code>HRECALL 'dsname'</code> — pre-emptively recall a migrated dataset back to L0.</li>
        <li><code>HBACKDS 'dsname'</code> — request an immediate backup of a dataset (don't wait for nightly cycle).</li>
        <li><code>HRECOVER 'dsname'</code> — restore the most recent backup version.</li>
        <li><code>HLIST DSNAME('dsname') BOTH</code> — show the migration and backup status of a dataset (where it lives, what backups exist).</li>
        <li><code>HDELETE 'dsname'</code> — delete a migrated dataset without first recalling it (rare, but useful for big migrated datasets you know you don't want).</li>
      </ul>
      <p><strong>Administrator commands</strong> use the <code>HSEND</code> wrapper (e.g., <code>HSEND DEFINE PRIMARYSPMGMT...</code>) and require special RACF authority — these are not available to ordinary users.</p>

      <h2>DFSMSdss</h2>
      <p><strong>DFSMSdss</strong> is the underlying utility that actually moves data around: it can read a dataset (or a whole volume) and write it somewhere else, optionally compressed, optionally validated. It is invoked as <code>PGM=ADRDSSU</code> in JCL with control statements on SYSIN. DFSMSdss is what HSM calls under the covers to do migration and backup, but it is also used directly by storage administrators for one-off operations: copy a dataset to a different volume, take a snapshot of a volume before a risky change, restore yesterday's image.</p>
      <p><strong>The Five Core DFSMSdss Verbs:</strong></p>
      <ul>
        <li><strong>DUMP</strong> — read one or more datasets (or an entire volume) and write a packaged backup image to an output dataset (or tape). The image can be COMPRESSed and includes catalog information so it can be restored later. Examples: <code>DUMP DATASET(INCLUDE(USER.**)) OUTDDNAME(DUMPDD) COMPRESS</code>; <code>DUMP FULL INDDNAME(SOURCE) OUTDDNAME(BACKUP) COMPRESS</code>.</li>
        <li><strong>RESTORE</strong> — read a previously taken DUMP image and write its contents back to disk. Datasets can be restored under their original names, renamed during restore, or filtered with INCLUDE/EXCLUDE so you only restore some of what was dumped. Add <code>REPLACE</code> if the target name already exists.</li>
        <li><strong>COPY</strong> — like DUMP+RESTORE in one step but without producing a portable image. Copies datasets directly from source to target volumes. Useful for cloning datasets or migrating data between volumes during a hardware refresh.</li>
        <li><strong>RELEASE</strong> — return unused space at the end of a dataset to the volume's free pool. Useful after big SORT or LOAD jobs that allocated more space than they ended up using.</li>
        <li><strong>COMPRESS</strong> — invoke an in-place compress of a classic PDS to reclaim "gas" left behind by member deletions. (PDSE doesn't need this; the storage is reclaimed automatically.)</li>
      </ul>
      <p><strong>Selection Filters — INCLUDE / EXCLUDE / BY:</strong> all DFSMSdss verbs accept rich filter expressions for picking which datasets to act on:</p>
      <pre style="background:#0d0d0d;color:#ffb000;padding:.8rem;border-radius:4px;overflow-x:auto;font-family:'Share Tech Mono',monospace;font-size:.85rem;line-height:1.45;margin:.5rem 0;">DUMP DATASET( INCLUDE(Z12345.**)             -
              EXCLUDE(Z12345.TEMP.**)        -
              BY(DSORG,EQ,(PS,PO))     )    -
     OUTDDNAME(BKDD) COMPRESS</pre>
      <p>The example dumps every dataset matching <code>Z12345.**</code> except those under <code>Z12345.TEMP.**</code>, but only if the organisation is sequential (PS) or partitioned (PO). BY filters can also test on creation date, expiration date, last-reference date, RACF owner, and many other dataset attributes.</p>

      <h2>HSM and DSS Integration</h2>
      <p>The two products are deeply integrated. When HSM decides "migrate this dataset to ML1," it actually invokes DFSMSdss internally to read the dataset, compress it, and write it to the ML1 staging area. Likewise, when HSM does a daily backup it calls DFSMSdss to dump the changed datasets to backup tape. From an administrator's perspective: DFSMSdss is the "raw" tool you reach for when you need to do something one-off that HSM's policies don't cover. HSM is the policy framework you set up once so the day-to-day work happens without any human involvement.</p>
      <p><strong>RACF authority and what learners typically can do:</strong> Most of the heavy lifting in HSM (defining policies, viewing the global control file, running ABARS) requires storage-administrator RACF authority via the <code>STGADMIN.ARC.*</code> facility-class profiles. However, ordinary users on most z/OS sites are permitted to run the <code>HMIGRATE</code>, <code>HRECALL</code>, <code>HBACKDS</code>, and <code>HRECOVER</code> commands against <em>their own</em> datasets — partly because users sometimes need to free their own space, and partly because recall is so common it has to be unprivileged. Likewise, DFSMSdss does not require special privilege to DUMP, RESTORE, or COPY datasets the user already has RACF access to. So both products offer some hands-on territory for a learner with a normal TSO ID — provided HSM is actually started on the system, which it usually is on zXplore and on richer ADCD distributions but may not be on a stripped-down Hercules build.</p>

      <h2>Sources &amp; References</h2>
      <div style="margin-top:20px; padding:20px; background-color:#e8f4f8; border-left:5px solid #0066cc; border-radius:4px; font-size:0.9em; line-height:1.8;">
        <ul style="margin: 0; padding-left: 20px; list-style-type:none;">
          <li>• <a href="https://www.ibm.com/docs/en/zos/2.5.0?topic=zos-dfsmshsm-storage-administration" target="_blank" style="color:#0066cc; text-decoration:none;">DFSMShsm Storage Administration</a> (Publication SC23-6871) — definitive reference for HSM policy and admin</li>
          <li>• <a href="https://www.ibm.com/docs/en/zos/2.5.0?topic=zos-dfsmshsm-managing-your-own-data" target="_blank" style="color:#0066cc; text-decoration:none;">DFSMShsm Managing Your Own Data</a> (Publication SC23-6870) — user-level HMIGRATE / HRECALL / HBACKDS / HRECOVER</li>
          <li>• <a href="https://www.ibm.com/docs/en/zos/2.5.0?topic=zos-dfsmsdss-storage-administration" target="_blank" style="color:#0066cc; text-decoration:none;">DFSMSdss Storage Administration</a> (Publication SC23-6868) — full DUMP / RESTORE / COPY syntax</li>
          <li>• <a href="https://www.redbooks.ibm.com/abstracts/sg246877.html" target="_blank" style="color:#0066cc; text-decoration:none;">IBM Redbook SG24-6877</a> — DFSMShsm Primer</li>
          <li>• <a href="https://www.redbooks.ibm.com/abstracts/sg247414.html" target="_blank" style="color:#0066cc; text-decoration:none;">IBM Redbook SG24-7414</a> — DFSMSdss Primer</li>
          <li>• <a href="https://www.ibm.com/docs/en/zos/2.5.0?topic=commands-dfsmshsm-commands" target="_blank" style="color:#0066cc; text-decoration:none;">DFSMShsm Commands Reference</a> (HSEND administrator command set)</li>
        </ul>
      </div>
    `,
    mcq: [
      { question: "What initiates DFSMShsm automatic migration of a dataset?", options: ["The user explicitly running HMIGRATE", "The dataset reaching its migration threshold (days since last referenced) defined in the management class", "An operator command", "A RACF audit event"], answer: 1, explanation: "DFSMShsm compares each dataset's last-reference date against its management class migration threshold and migrates inactive datasets automatically during the daily space-management cycle." },
      { question: "What happens when a user accesses a DFSMShsm-migrated dataset?", options: ["I/O fails with an error", "DFSMShsm transparently recalls the dataset to a primary volume before the OPEN completes", "The user must run HRECALL first always", "The dataset is permanently lost"], answer: 1, explanation: "Recall is transparent: the OPEN is intercepted, the data is recalled from ML1 or ML2 to primary DASD, and only then does OPEN complete. The application sees only a longer-than-usual open time." },
      { question: "What does DFSMSdss DUMP produce?", options: ["An SMF record", "A packaged (often compressed) backup image of one or more datasets or an entire volume", "A RACF audit trail", "An IODF export"], answer: 1, explanation: "DUMP creates a portable, optionally compressed backup image suitable for later RESTORE. The image carries enough catalog metadata to recreate the datasets." },
      { question: "What is the difference between DFSMShsm backup and DFSMSdss dump?", options: ["None  they are the same", "DFSMShsm manages versioned daily backups per dataset under policy; DFSMSdss takes ad-hoc point-in-time images of datasets or volumes", "DFSMSdss can only back up VSAM datasets", "DFSMShsm can only back up to tape"], answer: 1, explanation: "HSM is policy-driven and continuous (versioned daily backups, expiration, spill); DSS is the raw tool for one-off or scheduled image dumps. Internally HSM calls DSS to do the actual data movement." },
      { question: "What command manually recalls a specific migrated dataset?", options: ["HBACKDS", "HRECOVER", "HRECALL", "HMIGRATE"], answer: 2, explanation: "HRECALL pre-emptively brings a migrated dataset back to primary DASD; HRECOVER restores from a backup; HBACKDS requests an immediate backup; HMIGRATE moves a dataset off primary." },
      { question: "What does ML1 mean in the DFSMShsm hierarchy?", options: ["Migration Level 1  fast secondary DASD used as the first migration tier (compressed)", "Master Library 1", "Multi-Level cache 1", "Maximum Limit 1 retention setting"], answer: 0, explanation: "ML1 is the first tier of migrated storage  cheaper DASD where compressed copies live before being aged out to ML2 tape." },
      { question: "What kind of storage typically backs ML2?", options: ["Real memory", "Tape (often in an automated tape library or virtual tape server) or low-tier DASD", "The Coupling Facility", "USS filesystem"], answer: 1, explanation: "ML2 is the cheapest tier  usually tape or virtual tape  used for long-tail data that hasn't been touched in months or years. Recalls take minutes because tape must be mounted and positioned." },
      { question: "What triggers HSM 'threshold migration' on a primary volume?", options: ["A daily clock-driven schedule", "The volume crossing a high-watermark fill percentage  HSM migrates the oldest, largest datasets until it drops below the low watermark", "An explicit user HMIGRATE command", "A RACF audit event"], answer: 1, explanation: "Threshold migration is reactive: when a primary volume gets too full, HSM frees space by migrating cold data on that volume. This is independent of the nightly age-based cycle." },
      { question: "Which DFSMSdss verb copies datasets from source to target volumes without producing a portable backup image?", options: ["DUMP", "RESTORE", "COPY", "RELEASE"], answer: 2, explanation: "COPY does a direct dataset-to-dataset move (or clone). DUMP packages the data into a portable image; RESTORE unpacks one. COPY is the right tool for cloning or moving between volumes." },
      { question: "What is the purpose of the DFSMSdss RELEASE function?", options: ["Free a tape volume from RMM", "Return unused space at the end of a dataset back to the volume's free pool", "Release a RACF dataset profile", "Drop CICS file enqueues"], answer: 1, explanation: "RELEASE is partial-release: a dataset that allocated 100 cylinders but only used 30 can RELEASE the trailing 70, returning them to free space. Useful after over-estimated SPACE allocations." },
      { question: "How are HSM administrator commands typically issued?", options: ["By any TSO user as a normal command", "Through the HSEND command, which requires RACF authority via STGADMIN.ARC.* facility profiles", "Only from the HMC", "Via z/OSMF only"], answer: 1, explanation: "Ordinary user commands (HMIGRATE / HRECALL / HBACKDS / HRECOVER) work for any TSO ID against datasets they own. Administrator commands go through HSEND and are gated by STGADMIN.ARC.* RACF profiles." },
      { question: "What does the HLIST DSNAME('dsname') BOTH command show?", options: ["The dataset's RACF profile", "The migration status (where it lives in the hierarchy) and the backup status (which versions exist) for the dataset", "All HSM administrator settings", "The volume's VTOC"], answer: 1, explanation: "HLIST is the user-facing inquiry command. BOTH asks for both the migration record (M) and the backup record (B); MCDS for migration only, BCDS for backup only." },
      { question: "What is ABARS in DFSMShsm?", options: ["A RACF profile prefix", "Aggregate Backup and Recovery Support  bundles a related set of datasets into a single portable image for application-level recovery or site relocation", "A z/OSMF plugin name", "A type of CF structure"], answer: 1, explanation: "ABARS treats a logical 'application' (a list of related datasets) as one backup unit  useful for DR test restores and site moves. It is a layer above the per-dataset backup." }
    ],
    practical: [
      {
        title: "Task 1 — Manually Migrate and Recall One of Your Own Datasets",
        description: "Allocate a small test dataset, force HSM to migrate it off primary DASD with HMIGRATE, observe its migrated state with HLIST, then recall it with HRECALL and confirm it is back on a primary volume. This is the quickest way to see the migration/recall cycle from the user side without needing any administrator authority.",
        hints: [
          "Hint 1: First make sure HSM is active on your system. From SDSF DA look for an address space named DFHSM (or similar). On zXplore this is normally running; on a slim Hercules ADCD it may not be — if HSM isn't started, this task can't be executed and the rest is theoretical.",
          "Hint 2: From ISPF 3.2, allocate a small FB,80 sequential dataset, e.g., yourID.HSM.TEST. Edit it via ISPF 2 to add a few lines so it isn't empty.",
          "Hint 3: At the TSO READY prompt (or with TSO prefix in ISPF Command Shell option 6), issue: HMIGRATE 'yourID.HSM.TEST'. You should see message ARC1001I (request accepted) followed by ARC1023I when migration completes.",
          "Hint 4: Verify status with: HLIST DSNAME('yourID.HSM.TEST') BOTH. The output's MIGRATED VOLUME field will show the ML1 (or ML2) volume holding your data; the LEVEL field shows ML1 or ML2.",
          "Hint 5: Now recall it explicitly with: HRECALL 'yourID.HSM.TEST'. After ARC1024I (recall complete), re-run HLIST and you'll see it back on a primary VOLUME with no MIGRATED VOLUME entry.",
          "Hint 6: For a transparency test: instead of HRECALL, just open the dataset for Edit (ISPF 2). The OPEN will pause for a few seconds while HSM auto-recalls, then the editor will display your data normally. From the application's point of view nothing happened; HSM did the work invisibly."
        ],
        solution: "<strong>Expected sequence and output:</strong><pre style=\"background:#0d0d0d;color:#ffb000;padding:1rem;border-radius:4px;overflow-x:auto;font-family:'Share Tech Mono',monospace;font-size:.88rem;line-height:1.45;margin:.6rem 0;\">READY\nHMIGRATE 'Z12345.HSM.TEST'\nARC1001I Z12345.HSM.TEST RECALL/MIGRATE REQUEST ACCEPTED\nARC1023I MIGRATION OF Z12345.HSM.TEST COMPLETED\n\nREADY\nHLIST DSNAME('Z12345.HSM.TEST') BOTH\nARC0640I MIGRATION CONTROL DATASET LISTING\n  DATA SET NAME --- Z12345.HSM.TEST\n  MIGRATED VOLUME - MIGRT1  LEVEL - ML1  COMPACTED - YES\n  MIGRATION DATE -- 2026/05/03  TIME 14:22:11\n  ORIGINAL SIZE -- 5 TRACKS    COMPACTED SIZE - 1 TRACK\n  ...\n\nREADY\nHRECALL 'Z12345.HSM.TEST'\nARC1001I Z12345.HSM.TEST RECALL/MIGRATE REQUEST ACCEPTED\nARC1024I RECALL OF Z12345.HSM.TEST COMPLETED</pre><strong>What the output tells you:</strong> the dataset went from primary DASD (no migration record) → ML1 with COMPACTED=YES (HSM compressed it during migration; the original 5 tracks became 1 track on ML1) → back to primary DASD. Notice the COMPACTED savings: even small datasets benefit from ML1 compression. The transparent-recall variant (just opening the dataset in ISPF 2 instead of HRECALL) demonstrates the seamless integration that makes the storage hierarchy invisible to applications.<br><br><strong>If commands fail:</strong> (a) ARC1100I 'request rejected, DFSMShsm is not active' means HSM isn't started on your system — this task is then for-reading-only; (b) ARC1140I 'authority denied' means your RACF ID doesn't have permission to migrate that dataset (rare for datasets you own); (c) ARC1004I 'not eligible' often means the dataset is too small (HSM may have minimum-size policies) or not on an SMS-managed primary volume. Try a larger dataset or an HLQ on a known SMS-managed storage group."
      },
      {
        title: "Task 2 — Back Up and Restore a Dataset with DFSMSdss",
        description: "Use DFSMSdss DUMP via JCL to back up a few of your own datasets to a portable backup dataset, then use RESTORE on one of them under a new name to confirm the backup is good. This exercise gives you a real backup workflow you can run with no special privileges, and is a useful pattern for ad-hoc 'snapshot before I change something' protection.",
        hints: [
          "Hint 1: First create at least one or two test datasets to back up. Reuse yourID.HSM.TEST from Task 1 if you have it, or allocate yourID.DSS.TEST1 and yourID.DSS.TEST2 (both small FB,80 PS datasets with a few lines of text).",
          "Hint 2: The DFSMSdss program is invoked as PGM=ADRDSSU. The output backup dataset (the OUTDD) needs to be a sequential dataset large enough to hold your data; allocate it inline via DD with NEW disposition.",
          "Hint 3: For the RESTORE step, the trick is to add RENAME(yourID.DSS.TEST1, yourID.DSS.RESTORED) so the original dataset isn't overwritten — you can then compare the restored copy to the original to confirm the backup is valid.",
          "Hint 4: Both DUMP and RESTORE return RC=0 when successful and produce IDR-prefixed messages in SYSPRINT (the most useful one being IDR0001I '... DATASETS PROCESSED'). Anything non-zero usually means a permission or allocation issue."
        ],
        solution: "<strong>Working JCL:</strong><pre style=\"background:#0d0d0d;color:#ffb000;padding:1rem;border-radius:4px;overflow-x:auto;font-family:'Share Tech Mono',monospace;font-size:.88rem;line-height:1.45;margin:.6rem 0;\">//DSSBKUP  JOB (ACCT),'DSS DUMP+RESTORE',CLASS=A,MSGCLASS=H,NOTIFY=&SYSUID\n//STEP1    EXEC PGM=ADRDSSU,REGION=0M\n//SYSPRINT DD  SYSOUT=*\n//BKDD     DD  DSN=&SYSUID..DSS.BACKUP,\n//             DISP=(NEW,CATLG,DELETE),\n//             SPACE=(CYL,(5,2)),\n//             DCB=(RECFM=U,BLKSIZE=27998)\n//SYSIN    DD  *\n  DUMP DATASET( INCLUDE(&SYSUID..DSS.TEST1, -\n                        &SYSUID..DSS.TEST2)  ) -\n       OUTDDNAME(BKDD)                         -\n       COMPRESS                                -\n       OPTIMIZE(4)\n/*\n//STEP2    EXEC PGM=ADRDSSU,REGION=0M\n//SYSPRINT DD  SYSOUT=*\n//BKDD     DD  DSN=&SYSUID..DSS.BACKUP,DISP=SHR\n//SYSIN    DD  *\n  RESTORE DATASET( INCLUDE(&SYSUID..DSS.TEST1) ) -\n          INDDNAME(BKDD)                         -\n          RENAMEU( (&SYSUID..DSS.TEST1,          -\n                    &SYSUID..DSS.RESTORED) )     -\n          REPLACE\n/*</pre><strong>Expected results:</strong> Both steps return RC=0000. The STEP1 SYSPRINT contains messages like:<pre style=\"background:#0d0d0d;color:#ffb000;padding:.6rem;border-radius:4px;overflow-x:auto;font-family:'Share Tech Mono',monospace;font-size:.85rem;margin:.4rem 0;\">ADR454I (001)-DDDS (01), THE FOLLOWING DATA SETS WERE SUCCESSFULLY PROCESSED\n   Z12345.DSS.TEST1\n   Z12345.DSS.TEST2\nADR006I (001)-STEND(02), 2026.123 14:35:02 EXECUTION ENDS\nADR013I (001)-CLTSK(01), 2026.123 14:35:02 TASK COMPLETED WITH RETURN CODE 0000</pre>STEP2 produces ADR489I 'data set Z12345.DSS.TEST1 was restored to Z12345.DSS.RESTORED' messages. After the job, an ISPF 3.4 with mask 'yourID.DSS.*' shows three datasets: the original TEST1, the original TEST2, the new RESTORED, plus the BACKUP image dataset itself. Browse RESTORED — it has identical content to TEST1, confirming the round-trip worked.<br><br><strong>Variations worth trying:</strong> (a) add OUTPUT TO TAPE by changing BKDD to UNIT=TAPE,VOL=SER=xxx (you'll need a scratch tape — usually not available to learners); (b) use FULL instead of DATASET(INCLUDE(...)) to dump an entire volume — requires storage-admin authority, will fail with ADR413E for a normal user; (c) drop COMPRESS to see the size difference — the backup dataset will roughly double in size; (d) try restoring without REPLACE while the target name already exists — DSS refuses with ADR378E and the data is preserved, demonstrating the safety check.<br><br><strong>Cleanup:</strong> when finished, delete the test datasets via ISPF 3.4 (D line command) — TEST1, TEST2, RESTORED, and the BACKUP image."
      }
    ]
  },

  //  System Operations & Tools L2 (2 cards) 

  {
    id: "l2-uss-adv",
    level: 2,
    category: "System Operations & Tools",
    title: "Advanced USS & zFS Administration",
    summary: "zFS filesystem creation and mounting, USS security (UID/GID, file permissions), USS started tasks, and HFS-to-zFS migration considerations.",
    content: `
      <h2>USS Overview</h2>
      <p>The L1 USS material covered the user-facing surface: <code>OMVS</code>, <code>ls</code>, <code>cat</code>, <code>OEDIT</code>. From the system-administrator perspective USS is much more than a Unix shell on top of MVS — it is a parallel operating system with its own kernel functions (<strong>BPX*</strong> services), its own security model (POSIX UIDs/GIDs mapped through RACF), its own IPC primitives (signals, semaphores, message queues), its own filesystem hierarchy (<strong>zFS</strong> mounted into a single rooted tree), and its own process model (fork/exec, ptrace, zombie reaping). Modern z/OS depends on USS so heavily that you cannot IPL a system without it: TCP/IP, the HTTP server, SSHD, NFS, JES email gateways, z/OSMF, SMP/E receive, Java, IBM HTTP Server, Db2 utilities, every Liberty-based subsystem — they all live in USS. The OMVS kernel is started during NIP processing as one of the first address spaces; USS is part of the OS, not an add-on.</p>
      <p><strong>The key parmlib member is BPXPRMxx</strong> in SYS1.PARMLIB. It defines the USS configuration: which filesystems are mounted at IPL and where, the global limits (max processes per user, max threads per process, max file descriptors), the FILESYSTYPE statements that load each filesystem driver (ZFS, NFS, AUTOMNT, TFS), the ROOT FILESYSTEM line that names the top of the tree, and various tuning knobs. The active BPXPRMxx is selected at IPL via the OMVS= parameter in IEASYSxx; it can be augmented at runtime with <code>SETOMVS</code> operator commands.</p>

      <h2>zFS</h2>
      <p><strong>zFS (z/OS File System)</strong> is the modern, recommended filesystem for USS, replacing the older <strong>HFS (Hierarchical File System)</strong>. Both serve the same function — provide a Unix-style hierarchical filesystem on z/OS — but the underlying architecture is different in ways that matter at scale:</p>
      <ul>
        <li><strong>HFS</strong> uses a custom dataset format with its own catalog entry type. Single-system performance is fine but it serializes I/O at the filesystem level, scales poorly, and is now in deprecated mode (no new features, only critical fixes).</li>
        <li><strong>zFS</strong> sits on top of a <strong>VSAM Linear Dataset (LDS)</strong>, exploiting the proven VSAM I/O machinery for buffering, integrity, and caching. It uses 8-KB pages internally, supports much larger files (up to 4 TB per file), has finer-grained locking, scales linearly across CPU cores, integrates with sysplex sharing through the <strong>RWSHARE</strong> mount option (multiple z/OS images can mount the same zFS read-write simultaneously, with the Coupling Facility coordinating cache invalidation), and supports compression and ACLs as first-class features.</li>
      </ul>
      <p><strong>zFS aggregate vs filesystem:</strong> historically zFS supported multiple filesystems inside one VSAM container (an "aggregate"); modern practice is one filesystem per aggregate (called <strong>compatibility-mode aggregates</strong>), which simplifies management. The terms are now usually interchangeable.</p>

      <h2>zFS Lifecycle</h2>
      <p>Creating a new zFS filesystem is a three-step sequence performed by a storage administrator:</p>
      <ol>
        <li><strong>Define the LDS</strong> with IDCAMS: <code>DEFINE CLUSTER (NAME(OMVS.ZFS.PROJECT.A) LINEAR CYL(100 50) SHAREOPTIONS(3 3))</code>. SHAREOPTIONS(3 3) is required for sysplex sharing.</li>
        <li><strong>Format the aggregate</strong> with <code>zfsadm format -aggregate OMVS.ZFS.PROJECT.A -compat</code> (the -compat flag creates a single-filesystem-per-aggregate). Alternatively run <code>IOEAGFMT</code> as a batch utility.</li>
        <li><strong>Mount it</strong> at a directory in the USS tree. Two paths: a runtime <code>MOUNT FILESYSTEM('OMVS.ZFS.PROJECT.A') MOUNTPOINT('/projects/a') TYPE(ZFS) MODE(RDWR)</code> operator command (lasts until next IPL or unmount), or a permanent entry in BPXPRMxx so it auto-mounts at every IPL.</li>
      </ol>
      <p><strong>Day-to-day administration commands</strong> (most require storage admin authority):</p>
      <ul>
        <li><code>df</code> (USS shell) — show all mounted filesystems, sizes, used/free, mount points. The standard "what's mounted?" question.</li>
        <li><code>mount</code> (USS shell, no args) — list mounted filesystems with their type and options.</li>
        <li><code>zfsadm aggrinfo OMVS.ZFS.PROJECT.A</code> — detailed aggregate-level info: size, free, fragmentation, log-file size.</li>
        <li><code>zfsadm grow -aggregate OMVS.ZFS.PROJECT.A -size cyl</code> — expand a zFS aggregate online (the LDS must have secondary extents available or have been re-allocated).</li>
        <li><code>zfsadm shrink</code> — reclaim unused space.</li>
        <li><code>zfsadm fileinfo /path/to/file</code> — per-file zFS metadata.</li>
        <li>Operator <code>MOUNT</code> / <code>UNMOUNT</code> commands for runtime changes; <code>F OMVS,SHUTDOWN=...</code> for orderly stop.</li>
      </ul>
      <p><strong>Automount</strong> (FILESYSTYPE TYPE(AUTOMNT) in BPXPRMxx) lets you say "any time someone references <code>/u/Z12345</code>, mount the zFS named <code>OMVS.U.Z12345</code> at that point on demand and unmount it again after a quiet period." This is how user home directories scale on big systems with thousands of users — you don't pre-mount thousands of filesystems at IPL.</p>
      <p><strong>HFS-to-zFS migration</strong> is now mostly historical (most shops migrated years ago) but still appears in legacy estates. The standard tool is <code>BPXWH2Z</code> (a REXX exec) which: (1) creates a new zFS LDS the right size, (2) formats it, (3) <code>cp -R</code>'s the HFS contents into the new zFS, (4) verifies, (5) optionally swaps the mount in BPXPRMxx. The old HFS is then deleted after a confidence period.</p>

      <h2>USS Security</h2>
      <p>USS is POSIX-compliant, which means every USS process and every USS file has a numeric UID and GID. But every z/OS user is also a RACF user with an alphanumeric ID. The bridge is the <strong>OMVS segment</strong> attached to the RACF user profile and the <strong>OMVS segment</strong> attached to a RACF group profile.</p>
      <ul>
        <li><strong>User OMVS segment fields:</strong> <code>UID(nnnn)</code> — the numeric POSIX UID; <code>HOME('/u/yourid')</code> — the directory the shell starts in; <code>PROGRAM('/bin/sh')</code> — the default shell; <code>CPUTIMEMAX</code>, <code>FILEPROCMAX</code>, <code>PROCUSERMAX</code> — POSIX rlimits; <code>MMAPAREAMAX</code>, <code>THREADSMAX</code> — virtual-storage and threading limits.</li>
        <li><strong>Group OMVS segment fields:</strong> <code>GID(nnnn)</code> — the numeric POSIX GID corresponding to the RACF group.</li>
        <li><strong>UID 0 (root)</strong> is special — it bypasses POSIX permission checks. On classic z/OS sites a small number of administrators have UID 0; on hardened sites no one is permanently UID 0 and admins use <strong>BPX.SUPERUSER</strong> instead.</li>
        <li><strong>BPX.SUPERUSER</strong> — a RACF FACILITY-class profile. Anyone with READ to BPX.SUPERUSER can issue the USS <code>su</code> command to temporarily acquire UID 0 (effective UID change), without that authority being permanent. This is the modern best practice for root operations.</li>
        <li><strong>BPX.DAEMON / BPX.SERVER / BPX.JOBNAME / BPX.STOR.SWAP / BPX.SAFFASTPATH</strong> — additional FACILITY profiles that gate specific privileged USS operations: spawning daemons (DAEMON), running servers that change identity (SERVER), naming spawned address spaces, controlling page swap behaviour, and bypassing some security checks.</li>
        <li><strong>Default UID assignment</strong> — sites that don't want to assign a UID per user use <strong>UNIXPRIV</strong> shared-IDs or the <strong>AUTOUID</strong> RACF function which auto-allocates UIDs from a defined pool.</li>
      </ul>

      <h2>File Permissions</h2>
      <p>The familiar nine-bit POSIX permission model (<code>rwxrwxrwx</code> for owner/group/other) is the baseline. On z/OS USS adds three more layers:</p>
      <ul>
        <li><strong>Three special bits</strong> on top of the nine: <strong>setuid</strong> (when an executable runs, the process inherits the owner's UID instead of the caller's), <strong>setgid</strong> (same for GID; on directories, files created inside inherit the directory's group), <strong>sticky bit</strong> (on a directory like <code>/tmp</code>, only the owner of a file can delete it, regardless of write permission on the directory).</li>
        <li><strong>Extended attributes</strong> (ls -E to display, extattr to set) — z/OS-specific flags on USS executables: <strong>p</strong> (program-controlled), <strong>a</strong> (APF-authorized when loaded from this file), <strong>l</strong> (shared library — loadable into LPA), <strong>s</strong> (shared address space — runs in the caller's address space). Setting the 'a' bit requires BPX.FILEATTR.APF authority — these attributes mirror the MVS APF/program-controlled concepts in the USS world.</li>
        <li><strong>Access Control Lists (ACLs)</strong> — finer-grained per-user/per-group permissions than the basic nine-bit model. Set with <code>setfacl</code>, viewed with <code>getfacl</code>. ACLs are stored in the file metadata (zFS supports them natively) and are checked <em>after</em> the basic mode bits, so they grant additional access on top of, not instead of, the standard permissions. Three flavours: <strong>access ACL</strong> (applies to the file/directory itself), <strong>file default ACL</strong> (template inherited by new files in a directory), <strong>directory default ACL</strong> (template inherited by new subdirectories).</li>
        <li><strong>RACF-side authority</strong> — even with USS permissions saying yes, certain operations require RACF authority. Example: <code>chown</code>ing a file you own to another user requires <code>UNIXPRIV CHOWN.UNRESTRICTED</code> — without it, only UID 0 can chown.</li>
      </ul>

      <h2>USS Process Model</h2>
      <p>USS processes look like Unix processes (PIDs, parent/child relationships, signals, fork/exec) but they live <em>inside</em> z/OS address spaces. The mapping is one-to-many: a single z/OS address space can host many USS processes (each is a "task" within the address space). A <code>fork</code> creates a new address space with the parent's process state copied; <code>exec</code> replaces the process image without creating a new address space. The kernel optimisation <strong>spawn</strong> combines fork+exec into one call, avoiding the parent-copy step entirely for the common case.</p>
      <ul>
        <li><strong>ps</strong> — list USS processes (your own by default; -e for all, -ef for full detail).</li>
        <li><strong>kill</strong> — send a POSIX signal (TERM, KILL, HUP, USR1, etc.) to a process by PID. Different signals trigger different daemon behaviours: HUP usually means "re-read your config," TERM means "shut down cleanly," KILL is the unconditional terminator.</li>
        <li><strong>F BPXOINIT</strong> operator commands manage the OMVS kernel itself: <code>F BPXOINIT,SHUTDOWN=FORKS</code> stops accepting new forks ahead of an orderly OMVS shutdown.</li>
        <li><strong>Started tasks under USS</strong> — many z/OS started tasks (TCP/IP, FTPD, SSHD, IBM HTTP Server, IZUSVR1 for z/OSMF) run via JCL that contains <code>EXEC PGM=BPXBATCH,PARM='SH /usr/lpp/.../runme.sh'</code> as their main step. The task is a normal MVS started task from JES's perspective, but its actual workload runs in USS.</li>
        <li><strong>BPXBATCH and BPXBATSL</strong> — the JCL → USS bridges. BPXBATCH spawns a child address space (slower); BPXBATSL ("spawn local") runs the program in the same address space (faster). Use BPXBATSL when the JCL just needs to invoke a USS program and capture its output without process isolation.</li>
      </ul>

      <h2>Cross-World Bridges (USS ↔ MVS)</h2>
      <p>USS files and MVS datasets are two parallel filesystems on the same z/OS, but they can read each other's data through several conventions:</p>
      <ul>
        <li><strong>USS shell to MVS dataset</strong> — prefix the dataset name with <code>//</code> and quote with single quotes to bypass shell parsing: <code>cat "//'Z12345.TEST.SEQ'"</code> reads an MVS sequential dataset; <code>cp "//'Z12345.JCL.CNTL(MEMBER)'" /u/Z12345/member.txt</code> copies a PDS member to USS.</li>
        <li><strong>MVS JCL to USS file</strong> — a DD statement can point at a USS path: <code>//IN DD PATH='/u/Z12345/data.txt',PATHOPTS=(ORDONLY),PATHDISP=KEEP</code>. The program reads it as if it were a sequential dataset.</li>
        <li><strong>BPXBATCH</strong> from JCL — already covered. Runs a USS shell command or script as a JCL step, capturing stdout/stderr.</li>
        <li><strong>OEDIT/OBROWSE</strong> from TSO — opens a USS file in the ISPF Editor.</li>
        <li><strong>OPUT/OGET</strong> from TSO — copy individual files between USS and MVS datasets at the TSO command line.</li>
      </ul>

      <h2>Sources &amp; References</h2>
      <div style="margin-top:20px; padding:20px; background-color:#e8f4f8; border-left:5px solid #0066cc; border-radius:4px; font-size:0.9em; line-height:1.8;">
        <ul style="margin: 0; padding-left: 20px; list-style-type:none;">
          <li>• <a href="https://www.ibm.com/docs/en/zos/2.5.0?topic=zos-unix-system-services-planning" target="_blank" style="color:#0066cc; text-decoration:none;">z/OS UNIX System Services Planning</a> (Publication GA32-0884) — BPXPRMxx, security, capacity</li>
          <li>• <a href="https://www.ibm.com/docs/en/zos/2.5.0?topic=zos-distributed-file-service-zfs-administration" target="_blank" style="color:#0066cc; text-decoration:none;">Distributed File Service zFS Administration</a> (Publication SC23-6887) — definitive zFS reference</li>
          <li>• <a href="https://www.ibm.com/docs/en/zos/2.5.0?topic=zos-security-server-racf-security-administrators-guide" target="_blank" style="color:#0066cc; text-decoration:none;">RACF Security Administrator's Guide</a> — OMVS segment, BPX.* facility profiles, UNIXPRIV class</li>
          <li>• <a href="https://www.ibm.com/docs/en/zos/2.5.0?topic=zos-unix-system-services-command-reference" target="_blank" style="color:#0066cc; text-decoration:none;">z/OS UNIX System Services Command Reference</a> — every USS shell utility and admin command</li>
          <li>• <a href="https://www.redbooks.ibm.com/abstracts/sg247035.html" target="_blank" style="color:#0066cc; text-decoration:none;">IBM Redbook SG24-7035</a> — z/OS UNIX System Services Recovery and Availability</li>
          <li>• <a href="https://www.redbooks.ibm.com/abstracts/sg246580.html" target="_blank" style="color:#0066cc; text-decoration:none;">IBM Redbook SG24-6580</a> — z/OS UNIX Security Fundamentals</li>
          <li>• <a href="https://www.redbooks.ibm.com/abstracts/sg247709.html" target="_blank" style="color:#0066cc; text-decoration:none;">IBM Redbook SG24-7709</a> — zFS Filesystem Sharing in a Sysplex</li>
        </ul>
      </div>
    `,
    mcq: [
      { question: "What filesystem type is recommended for USS on modern z/OS?", options: ["HFS", "zFS", "NFS", "NTFS"], answer: 1, explanation: "zFS replaces HFS as the modern filesystem  better performance, finer locking, sysplex sharing, ACL support, and active development. HFS is deprecated and frozen except for critical fixes." },
      { question: "What dataset organisation underlies a zFS filesystem?", options: ["Sequential PS dataset", "Linear VSAM dataset (LDS)", "PDS/PDSE member", "ESDS VSAM cluster"], answer: 1, explanation: "zFS sits on a VSAM Linear Dataset, exploiting VSAMs proven I/O, buffering, and integrity machinery." },
      { question: "In USS, what do the nine rwxrwxrwx permission bits represent?", options: ["Read/write/execute for owner, group, and others respectively", "Random/write/exec modes", "Read permissions only for three security levels", "RACF READ/UPDATE/CONTROL access levels"], answer: 0, explanation: "Three triplets of read (r), write (w), and execute (x) for owner, owning group, and all other users  the standard POSIX model." },
      { question: "Which BPXPRMxx statement permanently mounts a zFS filesystem at IPL?", options: ["FILESYSTYPE TYPE(ZFS)", "MOUNT FILESYSTEM(...) MOUNTPOINT(...) TYPE(ZFS)", "ATTACH ZFS ...", "OMVS MOUNT ..."], answer: 1, explanation: "MOUNT in BPXPRMxx auto-mounts a filesystem at IPL. FILESYSTYPE loads the filesystem driver but does not mount anything by itself." },
      { question: "What RACF database field maps a z/OS user ID to a USS UID?", options: ["PASSWORD field", "UID field in the OMVS segment of the user profile", "SPECIAL attribute", "GRPUID in the group profile"], answer: 1, explanation: "The OMVS segment of the user profile carries the UID, HOME directory, default PROGRAM (shell), and POSIX rlimits." },
      { question: "What does the BPX.SUPERUSER FACILITY-class profile permit?", options: ["Permanently elevates a user to UID 0", "Allows a user with READ access to issue the su command and temporarily acquire UID 0  the modern best practice for root operations", "Bypasses RACF entirely", "Disables BPXPRMxx limits"], answer: 1, explanation: "BPX.SUPERUSER lets sysadmins acquire root authority on demand instead of being permanently UID 0  much safer for audit trails." },
      { question: "What is the purpose of the setuid permission bit on a USS executable?", options: ["Marks the file as a setup script", "When executed, the process runs with the file ownerss UID instead of the callerss UID", "Prevents the file from being deleted", "Disables shell execution"], answer: 1, explanation: "setuid (and setgid) let an executable elevate to the file owners identity at exec time  the classic Unix mechanism behind sudo, ping, etc." },
      { question: "What is the role of the sticky bit on a directory like /tmp?", options: ["Marks the directory read-only", "Only the owner of a file can delete or rename it, regardless of write permission on the directory", "Prevents new files from being created", "Forces synchronous I/O"], answer: 1, explanation: "Sticky on a writable shared directory keeps users from removing each others files  why /tmp is rwxrwxrwt." },
      { question: "What does the USS extended attribute a (set with extattr +a) mean?", options: ["File is archived", "File is APF-authorized when loaded as a program  equivalent to APF authorization in the MVS world", "File has an audit trail", "File is anonymous"], answer: 1, explanation: "The a extended attribute makes a USS executable APF-authorized when loaded. Setting it requires BPX.FILEATTR.APF authority. Mirrors the MVS APF concept in the USS file world." },
      { question: "What is automount (FILESYSTYPE TYPE(AUTOMNT)) used for?", options: ["Auto-formatting new zFS aggregates", "On-demand mounting of filesystems when their mount point is referenced, then unmounting after a quiet period  used for thousands of user home directories", "Automatic IPL recovery", "Auto-converting HFS to zFS"], answer: 1, explanation: "Automount avoids pre-mounting thousands of /u/userid filesystems at IPL  each is mounted only when the user logs in and unmounted after idle." },
      { question: "What is the BPXBATCH program used for in JCL?", options: ["Batching SDSF requests", "Running USS shell commands or scripts from a batch job, with stdout/stderr captured to JCL DDs", "Compressing PDS members", "Backing up the OMVS file system"], answer: 1, explanation: "EXEC PGM=BPXBATCH,PARM='SH /path/to/script' runs a shell script from JCL. BPXBATSL is a faster variant that runs the program in the same address space." },
      { question: "How can a USS shell read an MVS sequential dataset directly?", options: ["MVS datasets cannot be read from USS", "Reference it as //'dataset.name' in single quotes  e.g., cat \\\"//'Z12345.TEST.SEQ'\\\"", "Use the mvs2uss command first", "Mount the dataset as a filesystem"], answer: 1, explanation: "The //'name' syntax makes any USS utility (cat, cp, awk, etc.) treat an MVS dataset as a regular file. Single quotes prevent shell expansion of the dataset name." },
      { question: "What command lists all currently mounted USS filesystems?", options: ["lsmount", "df or mount (with no args)", "showfs", "filesys list"], answer: 1, explanation: "df shows mount point, total/used/free for each filesystem; mount with no args shows mount point, source LDS, type, and options." },
      { question: "Which USS shell utility manages access control lists on a file?", options: ["chmod", "setfacl / getfacl", "racfacl", "umask"], answer: 1, explanation: "setfacl assigns ACLs (access, file-default, directory-default flavours); getfacl displays them. ACLs grant additional access on top of the basic nine-bit mode." }
    ],
    practical: [
      {
        title: "Task 1 — Inspect Your Own OMVS Segment and the Mounted Filesystems",
        description: "Find out exactly what your USS identity is on the system and what filesystems are mounted, using only read-only inquiry commands that any TSO user can run. This is the diagnostic baseline whenever USS isn't behaving as expected — wrong UID, missing home directory, mounted-read-only, etc.",
        hints: [
          "Hint 1: From TSO READY (or ISPF option 6) issue: LISTUSER yourID OMVS NORACF — this dumps your RACF user profile's OMVS segment, showing UID, HOME directory, default PROGRAM (shell), and POSIX rlimits.",
          "Hint 2: To see your group memberships and the groups' GIDs, issue: LISTGRP groupname OMVS for each group LISTUSER showed.",
          "Hint 3: From OMVS, issue: id — shows your effective UID, GID, and supplementary groups as the kernel sees them. Should match what RACF reports.",
          "Hint 4: From OMVS, issue: df -k — shows every mounted filesystem with mount point, capacity, used, free (in KB). Compare against mount (no args) which adds the source LDS name and type.",
          "Hint 5: To see mount options for a specific filesystem: mount -t ZFS shows only zFS mounts; the line includes RDWR/RDONLY, RWSHARE/NORWSHARE, and any other mount flags in effect.",
          "Hint 6: For aggregate-level info on a specific zFS: zfsadm aggrinfo OMVS.ZFS.something  this works in read mode for any user; you'll see the LDS dataset name, size, free space, log status."
        ],
        solution: "<strong>Sample expected interaction:</strong><pre style=\"background:#0d0d0d;color:#ffb000;padding:1rem;border-radius:4px;overflow-x:auto;font-family:'Share Tech Mono',monospace;font-size:.88rem;line-height:1.45;margin:.6rem 0;\">READY\nLISTUSER Z12345 OMVS NORACF\nUSER=Z12345  NAME=STUDENT  OWNER=ADMIN   CREATED=24.215\n  ...\nOMVS INFORMATION\n----------------\nUID= 0000123456\nHOME= /u/Z12345\nPROGRAM= /bin/sh\nCPUTIMEMAX= NONE\nASSIZEMAX=  NONE\nFILEPROCMAX= NONE\nPROCUSERMAX= NONE\nTHREADSMAX=  NONE\nMMAPAREAMAX= NONE</pre><pre style=\"background:#0d0d0d;color:#ffb000;padding:1rem;border-radius:4px;overflow-x:auto;font-family:'Share Tech Mono',monospace;font-size:.88rem;line-height:1.45;margin:.6rem 0;\">$ id\nuid=123456(Z12345) gid=100(STUDENTS) groups=100(STUDENTS),4711(LEARNERS)\n\n$ df -k\nMounted on     Filesystem            Avail/Total    Files      Status\n/              OMVS.ROOT.ZFS         128344/524288  3217/40960 Available\n/etc           OMVS.ETC.ZFS           48720/65536    412/8192   Available\n/tmp           OMVS.TMP.ZFS          204800/262144  1234/16384 Available\n/u             OMVS.USERS.ZFS        892100/1048576 5891/65536 Available\n/var           OMVS.VAR.ZFS           65500/131072   789/8192   Available\n\n$ mount -t ZFS\nOMVS.ROOT.ZFS   on /     type ZFS  (rdwr,setuid,nosecurity,nosuid)\nOMVS.ETC.ZFS    on /etc  type ZFS  (rdwr,nosetuid,nosecurity,...)\n...</pre><strong>What the output tells you:</strong><br>(1) Your numeric POSIX UID (123456 in this example) is the identity USS sees, even though TSO sees you as Z12345. RACF maps the two via the OMVS segment.<br>(2) Your default shell (/bin/sh) and home directory (/u/Z12345) are set in your OMVS segment — if HOME points somewhere wrong, OMVS will start in the root or fail.<br>(3) df -k inventories every mounted zFS; if /u shows as a single shared filesystem, all user homes are subdirectories under one zFS — common for small sites. Larger sites use automount per user.<br>(4) The id command from inside OMVS confirms supplementary groups (LISTUSER alone does not always show them clearly).<br><br><strong>Common findings worth investigating:</strong> (a) UID=0 in your OMVS segment means you have permanent root authority — usually wrong outside production sysprog accounts; (b) HOME pointing to a directory that doesn't exist causes 'cannot find HOME directory' on OMVS startup; (c) FILEPROCMAX=NONE means inherited from the system default in BPXPRMxx — issue D OMVS,O from console (or check with sysprog) to see actual effective limits."
      },
      {
        title: "Task 2 — Manage File Permissions, ACLs, and Extended Attributes on Your Own Files",
        description: "Create test files in your home directory and exercise the full USS permission model: basic mode bits, the three special bits (setuid, setgid, sticky), an ACL granting access to a specific other user, and inspecting extended attributes with ls -E. This walks through every layer of the USS access-control model in one short session, and everything works without any special privilege.",
        hints: [
          "Hint 1: From OMVS, in your home directory create three test files: touch normal.txt; touch shared.txt; touch script.sh.",
          "Hint 2: ls -l shows the standard nine-bit permissions. Default umask is usually 022 so new files are 644 (rw-r--r--).",
          "Hint 3: Try chmod 750 normal.txt (rwxr-x---), chmod 660 shared.txt (rw-rw----), chmod +x script.sh to add execute, then ls -l to confirm. The first character of ls -l is the file type (- for regular, d for directory, l for symlink); the next nine are the mode bits.",
          "Hint 4: Try the special bits: chmod u+s script.sh sets setuid (the s appears in the owner-execute position). chmod g+s normal.txt sets setgid. chmod +t somedir sets the sticky bit on a directory. Then ls -l to see the visual indicators.",
          "Hint 5: To grant a specific other user (e.g., Z12346) read access without changing the group: setfacl -m user:Z12346:r-- shared.txt. Then getfacl shared.txt shows the full ACL including the basic permissions and your added user entry.",
          "Hint 6: ls -E displays z/OS extended attributes alongside the mode: a fourth permission group like '----' or 'a-l-' shows the extattr bits (a=APF, p=program-controlled, l=shared library, s=shared address space). Setting attribute 'a' requires BPX.FILEATTR.APF — you can read but not write unless authorized.",
          "Hint 7: Cleanup: rm normal.txt shared.txt script.sh when finished."
        ],
        solution: "<strong>Expected sequence:</strong><pre style=\"background:#0d0d0d;color:#ffb000;padding:1rem;border-radius:4px;overflow-x:auto;font-family:'Share Tech Mono',monospace;font-size:.88rem;line-height:1.45;margin:.6rem 0;\">$ cd ~ ; touch normal.txt shared.txt script.sh\n$ ls -l\n-rw-r--r--   1 Z12345 STUDENTS  0 May 3 14:50 normal.txt\n-rw-r--r--   1 Z12345 STUDENTS  0 May 3 14:50 script.sh\n-rw-r--r--   1 Z12345 STUDENTS  0 May 3 14:50 shared.txt\n\n$ chmod 750 normal.txt ; chmod 660 shared.txt ; chmod +x script.sh\n$ ls -l\n-rwxr-x---   1 Z12345 STUDENTS  0 May 3 14:50 normal.txt\n-rwxr-xr-x   1 Z12345 STUDENTS  0 May 3 14:50 script.sh\n-rw-rw----   1 Z12345 STUDENTS  0 May 3 14:50 shared.txt\n\n$ chmod u+s script.sh\n$ ls -l script.sh\n-rwsr-xr-x   1 Z12345 STUDENTS  0 May 3 14:50 script.sh\n  /* note the 's' in the owner-execute position */\n\n$ setfacl -m user:Z12346:r-- shared.txt\n$ getfacl shared.txt\n#file: shared.txt\n#owner: Z12345\n#group: STUDENTS\nuser::rw-\nuser:Z12346:r--\ngroup::rw-\nother::---\n\n$ ls -E shared.txt\n-rw-rw---- ----   1 Z12345 STUDENTS  0 May 3 14:50 shared.txt\n  /* the four chars after the mode are the extended attributes:\n     a=APF, p=program-controlled, l=shared library, s=shared addr space\n     '----' means none of them are set                            */\n\n$ extattr +a script.sh\nFSUM7035 ... permission denied: BPX.FILEATTR.APF facility-class profile not granted</pre><strong>What this teaches:</strong><br>(1) The basic mode-bit model is identical to Linux/AIX/Solaris — chmod with octal or symbolic, four-octet codes for the three special bits prepended (e.g., 4755 = setuid + 755).<br>(2) The 's' character in the owner/group execute position visually marks setuid/setgid; uppercase 'S' means setuid is set but execute is not (a configuration error).<br>(3) ACLs let you grant access to specific named users without giving them group membership — useful for ad-hoc collaboration. They appear in getfacl output as additional 'user:name:perm' lines.<br>(4) Extended attributes are z/OS-specific. ls -E reveals them; extattr +a/+p/+l/+s sets them but most require RACF facility-class permission you won't normally have.<br>(5) The umask command (e.g., umask 077) sets default permissions for newly created files in your session — by default the system umask is 022 producing 644 for files; a stricter umask 077 produces 600 (private to owner).<br><br><strong>Caveat for shared systems:</strong> setfacl needs the target user (Z12346 in the example) to actually exist on the system. On zXplore each learner is isolated, so you may need to use a real user ID from your environment or skip this step. The other operations work regardless."
      },
      {
        title: "Task 3 — Bridge USS and Classic MVS in Both Directions",
        description: "Demonstrate the cross-world bridges by reading an MVS dataset from a USS shell, copying a USS file out to an MVS dataset, then submitting a JCL job that runs a USS shell script via BPXBATCH and captures its output to JES SYSOUT. This exercise shows the seamless data-flow paths that make USS and classic z/OS feel like one system instead of two.",
        hints: [
          "Hint 1: Make sure you have a small MVS sequential dataset with some text in it — reuse Z12345.TEST.SEQ from the L1 ISPF tasks if you have it, or allocate a new one via 3.2 (FB,80) and edit a few lines into it.",
          "Hint 2: From OMVS, read the MVS dataset directly: cat \"//'Z12345.TEST.SEQ'\" — the //'name' syntax with single quotes is the magic. Without quotes the shell would mangle the dataset name.",
          "Hint 3: Copy a USS file out to a new MVS sequential dataset: cp /u/Z12345/greeting.txt \"//'Z12345.USS.GREETING'\". The MVS dataset is created as PS with default attributes if it doesn't exist.",
          "Hint 4: For the BPXBATCH part: write a tiny USS shell script (e.g., /u/Z12345/show.sh) that prints something useful — id, date, ls -l of /tmp, etc. Make it executable with chmod +x show.sh.",
          "Hint 5: Edit a JCL member (e.g., Z12345.TEST.CNTL(BPXJOB)) with the BPXBATCH skeleton: //BPXJOB JOB ... ; //STEP1 EXEC PGM=BPXBATCH,PARM='SH /u/Z12345/show.sh' ; //STDOUT DD SYSOUT=* ; //STDERR DD SYSOUT=*. Submit with SUB.",
          "Hint 6: In SDSF =SD ; H, drill into the job. STDOUT and STDERR show as separate DDs in the DD list, containing whatever your shell script wrote to those streams."
        ],
        solution: "<strong>Part 1  USS reads MVS:</strong><pre style=\"background:#0d0d0d;color:#ffb000;padding:1rem;border-radius:4px;overflow-x:auto;font-family:'Share Tech Mono',monospace;font-size:.88rem;line-height:1.45;margin:.6rem 0;\">$ cat \"//'Z12345.TEST.SEQ'\"\nThis is line 1 of my test dataset\nThis is line 2\nThis is line 3</pre>The same pattern works with cp, awk, grep, sort, head, tail, wc — any USS utility that reads a file. Reading PDS members: <code>cat \"//'Z12345.JCL.CNTL(NOOPJOB)'\"</code> just adds the (member) syntax inside the quotes.<br><br><strong>Part 2  USS writes to MVS:</strong><pre style=\"background:#0d0d0d;color:#ffb000;padding:1rem;border-radius:4px;overflow-x:auto;font-family:'Share Tech Mono',monospace;font-size:.88rem;line-height:1.45;margin:.6rem 0;\">$ echo 'made in USS, lives in MVS' > /tmp/note.txt\n$ cp /tmp/note.txt \"//'Z12345.USS.GREETING'\"\n$ \n  /* now jump to TSO and verify */\nREADY\nLISTC LEVEL(Z12345.USS)\n  Z12345.USS.GREETING\nREADY</pre>Browse <code>Z12345.USS.GREETING</code> in ISPF 3.4 — it contains your text as a one-line FB,80 sequential dataset (USS cp picks reasonable defaults).<br><br><strong>Part 3  JCL invokes USS via BPXBATCH:</strong><pre style=\"background:#0d0d0d;color:#ffb000;padding:1rem;border-radius:4px;overflow-x:auto;font-family:'Share Tech Mono',monospace;font-size:.88rem;line-height:1.45;margin:.6rem 0;\">$ cat > /u/Z12345/show.sh << EOF\n#!/bin/sh\necho \"-- Hello from BPXBATCH --\"\nid\ndate\necho \"-- Top of /tmp --\"\nls -l /tmp | head -5\nEOF\n$ chmod +x /u/Z12345/show.sh</pre>JCL (Z12345.TEST.CNTL(BPXJOB)):<pre style=\"background:#0d0d0d;color:#ffb000;padding:1rem;border-radius:4px;overflow-x:auto;font-family:'Share Tech Mono',monospace;font-size:.88rem;line-height:1.45;margin:.6rem 0;\">//BPXJOB   JOB (ACCT),'BPXBATCH DEMO',CLASS=A,MSGCLASS=H,NOTIFY=&amp;SYSUID\n//STEP1    EXEC PGM=BPXBATCH,PARM='SH /u/Z12345/show.sh'\n//STDOUT   DD  SYSOUT=*\n//STDERR   DD  SYSOUT=*</pre>SUB the job, then in SDSF =SD;H drill into it. Expected STDOUT content:<pre style=\"background:#0d0d0d;color:#ffb000;padding:.6rem;border-radius:4px;overflow-x:auto;font-family:'Share Tech Mono',monospace;font-size:.85rem;margin:.4rem 0;\">-- Hello from BPXBATCH --\nuid=123456(Z12345) gid=100(STUDENTS) groups=100(STUDENTS)\nSat May  3 15:02:14 EDT 2026\n-- Top of /tmp --\ndrwxrwxrwt   8 ROOT   SYS1     8192 May  3 14:55 .\ndrwxr-xr-x  42 ROOT   SYS1     8192 Apr 30 09:12 ..\n-rw-r--r--   1 Z12345 STUDENTS   45 May  3 14:51 note.txt\n...</pre><strong>What this teaches:</strong> the three bridges (USS reads MVS via //'name', USS writes MVS via cp to //'name', JCL invokes USS via BPXBATCH) cover almost every cross-world data exchange you'll ever need to do on z/OS. They are the reason a 'pure Unix script' on z/OS can casually consume a 50-year-old VSAM cluster, and the reason a JCL pipeline can invoke a Python or shell tool without giving up the JES batch scheduler. The third bridge (BPXBATCH from JCL) is how every modern z/OS daemon — TCP/IP, SSHD, IBM HTTP Server, the z/OSMF Liberty server — actually starts: a one-step JCL containing PGM=BPXBATCH that launches the USS process. Variations: try BPXBATSL instead of BPXBATCH for in-address-space execution (faster, smaller footprint); add STDIN DD * with input data to feed your script via standard input; capture program output back to an MVS dataset by replacing SYSOUT=* with DSN=Z12345.USS.OUTPUT,DISP=(NEW,CATLG,DELETE),SPACE=(TRK,(5,2)),DCB=(RECFM=VB,LRECL=255)."
      }
    ]
  },

  {
    id: "l2-wlm-mon",
    level: 2,
    category: "System Operations & Tools",
    title: "WLM & Automated Operations Monitoring",
    summary: "Workload Manager (WLM) service definitions, service classes, performance goals, and importance weights; plus automated operations monitoring with NetView/SA z/OS and health thresholds.",
    content: `
      <h2>WLM Overview</h2>
      <p><strong>Workload Manager (WLM)</strong> is the z/OS subsystem that decides how CPU, I/O, storage, and other system resources are distributed across all the work running on the system. Where most operating systems use a fixed-priority scheduler (process A is priority 5, process B is priority 8, run B first), z/OS WLM is <strong>goal-oriented</strong>: the administrator declares <em>business outcomes</em> ("CICS production transactions must complete in under 0.3 seconds 90% of the time"; "month-end batch must achieve a velocity of 60") and WLM continuously rearranges priorities, dispatching priority, I/O priority, storage allocation, and even the number of CICS regions started, in order to meet those goals. When the system is constrained and not every goal can be met simultaneously, WLM uses a second declaration — <strong>importance</strong> — to decide which goals to honour first.</p>
      <p>WLM is also the integration point that other subsystems use to ask "what should I do?" — CICS, IMS, Db2, JES, USS, TCP/IP all call WLM to classify incoming work, request priority changes, and report transaction completions. WLM is a sysplex-wide service: a single service definition is installed across every system in the sysplex so workload running anywhere is governed by the same policy.</p>

      <h2>Service Definition Structure</h2>
      <p>The whole WLM policy is bundled into a single object called the <strong>service definition</strong> (sometimes "service policy" — a service definition contains one or more named policies, but in practice almost every site has just one). It is built and edited in the WLM ISPF dialog (TSO command <code>WLM</code>, or via z/OSMF Workload Management plugin) and installed into a VSAM dataset called the <strong>WLM couple dataset</strong>, from which it is activated sysplex-wide.</p>
      <p>The structural pieces:</p>
      <ul>
        <li><strong>Workload</strong> — a top-level grouping for reporting purposes only (e.g., PROD, BATCH, TSO, STC). Workloads do not affect dispatching; they're reporting buckets that group several service classes together so reports roll up cleanly.</li>
        <li><strong>Service class</strong> — the unit of management. Each service class has a name (e.g., <code>CICSPROD</code>, <code>BATHIGH</code>, <code>BATLOW</code>, <code>TSOSHORT</code>), one or more <strong>periods</strong>, and is mapped to <strong>classification rules</strong> that determine which work lands in it.</li>
        <li><strong>Period</strong> — within a service class, work moves through periods based on accumulated service consumed (a unit roughly equivalent to CPU seconds, scaled by storage and I/O). Period 1 has the most aggressive goal; once a long-running unit has consumed (say) 50,000 service units it falls into period 2 with a more relaxed goal; period 3 might be discretionary. This protects fast online work from being starved by a runaway batch job in the same service class.</li>
        <li><strong>Goal</strong> — the performance target for a period (one of four types, see below).</li>
        <li><strong>Importance</strong> — 1 (highest) through 5 (lowest), or DISCRETIONARY (lower than 5). When the system is over-committed and not every goal can be met, WLM throws resources at the highest-importance unmet goals first.</li>
        <li><strong>Classification rules</strong> — the lookup table that maps incoming work attributes (subsystem type, transaction name, user ID, accounting code, JES job class, CICS LU name, etc.) to the right service class. Each subsystem type (JES, CICS, IMS, OMVS, STC, TSO, DB2, IWEB, ...) has its own rules table.</li>
        <li><strong>Resource group</strong> (optional) — a named cap or floor on CPU consumption for a group of service classes (e.g., "the test workloads collectively cannot exceed 200 service units per second"). Used to enforce capacity planning at the workload level.</li>
        <li><strong>Application environment</strong> (optional) — for managing pools of CICS regions, Db2 stored-procedure address spaces, and similar long-running server pools that WLM can grow or shrink dynamically.</li>
      </ul>

      <h2>Goal Types</h2>
      <p>Every period in every service class has exactly one goal, of one of four types:</p>
      <ul>
        <li><strong>Response time — percentile</strong> (e.g., "95% of transactions complete in 0.3 seconds or less"). The most common goal for online workloads (CICS, IMS, Db2 stored procedures, web requests). Requires that the subsystem report transaction completions back to WLM so it can measure.</li>
        <li><strong>Response time — average</strong> (e.g., "average transaction time of 0.5 seconds"). Less common than percentile because averages can hide bad outliers.</li>
        <li><strong>Velocity</strong> (e.g., "60% velocity") — the fraction of time work is actually running on a CPU vs. waiting for one. Used for batch and started tasks where there is no notion of "transaction," so response time can't be measured. A velocity of 100 means the work is always running when it could; 50 means it is running half the time and waiting half the time. Typical batch goals: 60–80 for important production batch, 30–50 for development.</li>
        <li><strong>Discretionary</strong> — "run only when no other work needs the CPU." The classic example is end-user TSO option-6 commands or background test jobs — important enough to run eventually, but never at the expense of production.</li>
      </ul>

      <h2>Importance and the Performance Index (PI)</h2>
      <p>Goals tell WLM <em>what to aim for</em>; importance tells WLM <em>which goals matter most when sacrifices have to be made</em>. The arithmetic that drives this is the <strong>Performance Index (PI)</strong>:</p>
      <ul>
        <li><strong>PI &lt; 1.0</strong> — the service class is exceeding its goal (running faster than required).</li>
        <li><strong>PI = 1.0</strong> — exactly meeting the goal.</li>
        <li><strong>PI &gt; 1.0</strong> — missing the goal; the larger the PI, the worse the miss. PI=2.0 means twice as slow as the goal.</li>
      </ul>
      <p>WLM continuously samples PIs across all service classes (every 10 seconds by default) and rebalances dispatch priorities. The decision rule is: take resources from low-importance service classes that are meeting their goals, give them to higher-importance classes that are missing. Importance 1 with PI=1.5 will be helped before importance 3 with PI=3.0 — the higher importance wins even if the lower-importance miss is numerically worse. This is why setting importance correctly is more consequential than setting goals tightly.</p>

      <h2>Classification Rules</h2>
      <p>Classification is how incoming work is mapped to a service class. Each subsystem type has its own classification ruleset, queried by WLM the moment that subsystem creates a unit of work:</p>
      <ul>
        <li><strong>JES</strong> — at job-start time, classifies on JOB statement attributes: job class (CLASS=), user ID, accounting code, performance group, job name pattern.</li>
        <li><strong>STC (Started Task)</strong> — at task-start: started-task name, user ID it runs as.</li>
        <li><strong>TSO</strong> — at logon: user ID, logon procedure name.</li>
        <li><strong>CICS</strong> — per transaction: CICS region name (LU name), transaction ID, user ID.</li>
        <li><strong>IMS</strong> — per message: IMS region, transaction code, LTERM.</li>
        <li><strong>OMVS</strong> — per process: parent address space, user ID.</li>
        <li><strong>DDF</strong> — for distributed Db2 connections: the workload qualifier from the connection's accounting string.</li>
      </ul>
      <p>Rules are evaluated top to bottom; the first match wins. A typical batch ruleset has ten or twenty entries: catch-all production jobs by user ID prefix, send dev jobs to a low-priority class by accounting code, send month-end overnight jobs to a special heavy class by job name pattern, with a default at the bottom for everything unmatched.</p>

      <h2>Activating a Service Definition</h2>
      <p>The lifecycle is similar to DFSMS configurations: edit the source, install it into the couple dataset, then activate one of its named policies sysplex-wide.</p>
      <ol>
        <li><strong>Edit</strong> in the WLM ISPF dialog (TSO <code>WLM</code> or z/OSMF). The source lives in a regular sequential dataset (frequently called the WLM definition or "WLM source"); ISPF reads it, lets you change classes/goals/rules/importance, and writes it back.</li>
        <li><strong>Install</strong> writes the validated definition into the WLM <strong>couple dataset</strong> — a small VSAM dataset shared by every system in the sysplex (defined to XCF as a couple dataset). Installing does not change the running policy; it just stages a new definition.</li>
        <li><strong>Activate</strong> tells WLM to switch the running configuration to the named policy in the just-installed definition. This is sysplex-wide and immediate. The previous policy stays installed in the couple dataset and can be re-activated for rollback.</li>
        <li>The operator command <code>D WLM</code> shows which definition and policy are active. <code>V WLM,POLICY=POLNAME</code> activates a different policy. <code>F WLM,REFRESH</code> nudges WLM to re-read its statistics.</li>
      </ol>

      <h2>RMF Monitor III for WLM Health</h2>
      <p><strong>Monitor III</strong> (covered in the L1 SDSF/SMF/RMF card) is the live window into WLM behaviour. The key panels:</p>
      <ul>
        <li><strong>SYSSUM</strong> — Service Class Summary: every service class with its goal, current PI, average response time / velocity, transactions completed in the last interval. The first place to look when someone says "the system feels slow."</li>
        <li><strong>WFEX</strong> — Workflow Exception: lists only service classes whose PI is above a threshold (default 1.0) — i.e., currently missing their goal. If WFEX is empty, the system is meeting every commitment and complaints are likely about something other than capacity.</li>
        <li><strong>SYSWKM</strong> / <strong>WLMGL</strong> — workload-level rollups across the sysplex.</li>
        <li><strong>JOB</strong> — drill into a specific address space's per-period CPU, storage, and PI history.</li>
      </ul>

      <h2>Automation with NetView and SA z/OS</h2>
      <p>WLM keeps the system meeting performance goals; <strong>automated operations monitoring</strong> keeps the system <em>running at all</em> by watching for events (failed components, broken WTORs, threshold breaches) and acting on them without human intervention. Two products dominate this space on z/OS:</p>
      <ul>
        <li><strong>NetView for z/OS</strong> — the foundation: a programmable operator that reads the system message stream in real time, matches messages against rules in an <strong>automation table</strong> (DSITBL01 historically), and triggers REXX exec or canned responses. Original use case: SNA network management, but its automation engine became a general-purpose tool for any message-driven response.</li>
        <li><strong>SA z/OS (System Automation for z/OS)</strong> — built on NetView. Adds a <strong>policy database</strong> that knows the inventory of every started task, subsystem, and resource on the system, plus their dependencies (e.g., "TCP/IP must be up before SSHD can start; SSHD must be down before TCP/IP can stop"). SA's <strong>automation manager</strong> drives orderly start-up at IPL, orderly shut-down at planned outage, and recovery actions when something fails (restart the task; if it fails N times in M minutes, alert and stop trying).</li>
      </ul>
      <p><strong>Common automation patterns:</strong></p>
      <ul>
        <li><strong>WTOR auto-reply</strong> — when a started task issues a Write-To-Operator-with-Reply that has a known correct answer (e.g., JES2 startup question), automation replies on its own so an operator doesn't have to.</li>
        <li><strong>Subsystem health probes</strong> — periodically issue a status command (e.g., <code>D OMVS</code> or <code>D DB2</code>) and parse the response; if the subsystem reports unhealthy, trigger restart or alerting.</li>
        <li><strong>Resource thresholds</strong> — watch SMF or RMF data for "spool >85% full" or "CPU >95% for 10 minutes" and react (page operations, throttle low-priority work, run a cleanup).</li>
        <li><strong>Cross-system coordination</strong> — in a sysplex, automate the "fail-over" sequence: detect that one system's health monitor reports degraded, gracefully drain its workload to other systems before it goes down hard.</li>
      </ul>

      <h2>z/OS Health Checker</h2>
      <p>A small but important sibling: <strong>IBM Health Checker for z/OS</strong> is a built-in framework that continuously runs hundreds of pre-shipped checks against the running system (and accepts user-written checks). Each check evaluates a configuration against best practice — for example, checks that no started task is running with the wrong RACF user ID, that critical SMF record types are being recorded, that PARMLIB members are syntactically clean, that SMS storage groups have enough free volumes. Results appear in SDSF on the CK panel; failed checks generate WTOs that automation can react to. Health Checker is the lowest-effort, highest-value monitoring layer because IBM ships hundreds of checks for free and they exercise areas an admin would never think to look at manually.</p>

      <h2>Sources &amp; References</h2>
      <div style="margin-top:20px; padding:20px; background-color:#e8f4f8; border-left:5px solid #0066cc; border-radius:4px; font-size:0.9em; line-height:1.8;">
        <ul style="margin: 0; padding-left: 20px; list-style-type:none;">
          <li>• <a href="https://www.ibm.com/docs/en/zos/2.5.0?topic=zos-mvs-planning-workload-management" target="_blank" style="color:#0066cc; text-decoration:none;">MVS Planning: Workload Management</a> (Publication SC34-2662) — definitive WLM reference</li>
          <li>• <a href="https://www.ibm.com/docs/en/zos/2.5.0?topic=zos-mvs-system-commands" target="_blank" style="color:#0066cc; text-decoration:none;">MVS System Commands</a> — D WLM, V WLM, F WLM operator commands</li>
          <li>• <a href="https://www.ibm.com/docs/en/zos/2.5.0?topic=zos-rmf-users-guide" target="_blank" style="color:#0066cc; text-decoration:none;">RMF User's Guide</a> — Monitor III SYSSUM, WFEX, JOB panels for WLM health</li>
          <li>• <a href="https://www.ibm.com/docs/en/system-automation-zos/4.3.0" target="_blank" style="color:#0066cc; text-decoration:none;">IBM System Automation for z/OS Documentation</a> — policy database, automation manager, dependencies</li>
          <li>• <a href="https://www.ibm.com/docs/en/netview-zos/6.4.0" target="_blank" style="color:#0066cc; text-decoration:none;">IBM NetView for z/OS Documentation</a> — automation table, DSITBL01, REXX automation</li>
          <li>• <a href="https://www.ibm.com/docs/en/zos/2.5.0?topic=zos-ibm-health-checker" target="_blank" style="color:#0066cc; text-decoration:none;">IBM Health Checker for z/OS</a> — installed checks, SDSF CK panel</li>
          <li>• <a href="https://www.redbooks.ibm.com/abstracts/sg246472.html" target="_blank" style="color:#0066cc; text-decoration:none;">IBM Redbook SG24-6472</a> — System Programmer's Guide to Workload Manager</li>
        </ul>
      </div>
    `,
    mcq: [
      { question: "What is a WLM service class?", options: ["A RACF class for resource protection", "A named workload classification bucket with assigned performance goals and importance", "A CICS resource definition", "A DFSMS storage class"], answer: 1, explanation: "Service classes are the unit of WLM management — each carries one or more periods, each period a goal and an importance level. Incoming work is classified into a service class via classification rules." },
      { question: "In WLM, what does 'importance' control?", options: ["The priority of a RACF group", "Which service classes WLM favours when resources are insufficient to meet every goal at once", "The DASD allocation priority", "The TCP/IP packet priority"], answer: 1, explanation: "Importance 1 (highest) through 5 (lowest) — when goals conflict, WLM helps higher-importance unmet goals first, even if a lower-importance class is numerically further from its target." },
      { question: "Which WLM goal type is best suited for online transaction workloads?", options: ["Velocity", "Discretionary", "Response time (average or percentile)", "FIFO"], answer: 2, explanation: "Response time goals (typically percentile, e.g. '90% of transactions in under 0.5 sec') are the natural fit for online workloads where each transaction has a measurable start and end. Velocity is used where there is no transaction notion (batch, started tasks)." },
      { question: "What does WTOR stand for?", options: ["Write To Operator Reply", "Workload Task Override Request", "WLM Tuning Override Rule", "Write To Output Record"], answer: 0, explanation: "Write-To-Operator-with-Reply: a system message that pauses a task until an operator (or automation) provides the requested reply." },
      { question: "What is SA z/OS?", options: ["A RACF security add-on", "An IBM policy-based automation product (built on NetView) that monitors system events and triggers automated responses based on a dependency policy", "A WLM plugin", "A z/OSMF workflow"], answer: 1, explanation: "SA z/OS layers a policy database (start/stop dependencies, recovery rules) on top of NetView's message-automation engine. It drives orderly IPL start-up, planned shutdown, and unattended recovery." },
      { question: "What is the WLM Performance Index (PI)?", options: ["A processor performance benchmark", "A ratio that compares observed performance to the goal — PI=1.0 means meeting the goal exactly; PI>1.0 means missing it; PI<1.0 means exceeding it", "An ISPF panel index", "A TCP/IP routing weight"], answer: 1, explanation: "PI is WLM's continuous health metric per service-class period. WLM samples PIs every ~10 seconds and reallocates dispatch priorities to drag missing classes back toward PI=1.0, prioritised by importance." },
      { question: "What is a WLM 'period' within a service class?", options: ["A scheduling time window", "A graduation tier — work moves from period 1 (aggressive goal) to period 2 (more relaxed) after consuming a defined amount of service, protecting fast work from being starved by long-running outliers in the same class", "A reporting interval for SMF", "A backup retention setting"], answer: 1, explanation: "Periods let one service class behave differently as work ages — short transactions stay in period 1 with tight goals; long-running queries fall to period 2 or 3 with looser goals so they don't starve the rest." },
      { question: "Which WLM construct maps incoming work attributes (subsystem type, user ID, transaction name) to a service class?", options: ["Resource group", "Classification rules", "Application environment", "Workload"], answer: 1, explanation: "Classification rules are the lookup table evaluated when work arrives at WLM. Each subsystem type (JES, CICS, TSO, OMVS, etc.) has its own ruleset; first match wins." },
      { question: "Which RMF Monitor III panel lists only service classes currently missing their goal?", options: ["SYSSUM", "WFEX (Workflow Exception)", "JOB", "SYSWKM"], answer: 1, explanation: "WFEX filters SYSSUM to show only classes with PI above the exception threshold (default 1.0). If WFEX is empty, every workload is meeting commitments." },
      { question: "What is the WLM couple dataset used for?", options: ["Storing SMF records", "Holding the installed WLM service definition shared sysplex-wide so every system runs the same policy", "Caching CICS transaction state", "RACF database backup"], answer: 1, explanation: "WLM's couple dataset is the sysplex-shared VSAM dataset that holds installed service definitions. Activate switches the running policy on every member of the sysplex at once." },
      { question: "What does NetView's automation table do?", options: ["Logs network errors", "Matches incoming system messages against rules and triggers responses (REXX execs, replies, commands) automatically", "Defines TCP/IP routes", "Schedules batch jobs"], answer: 1, explanation: "NetView reads the message stream in real time; the automation table is its programmable rules engine. Originally for SNA network management, now used as the foundation for general operational automation." },
      { question: "What is IBM Health Checker for z/OS?", options: ["A backup product", "A built-in framework that runs hundreds of pre-shipped configuration checks against the running system, exposing failed checks via the SDSF CK panel and as automatable WTOs", "A RACF audit tool only", "A network monitor"], answer: 1, explanation: "Health Checker is the lowest-effort, highest-value monitoring layer on z/OS — IBM ships hundreds of checks that exercise corners of the configuration an admin would never think to inspect manually. Failed checks generate WTOs that automation can react to." }
    ],
    practical: [
      {
        title: "Task 1 — Browse the Active WLM Service Definition",
        description: "Open the WLM ISPF dialog in display mode and explore the active service definition: list the workloads, drill into a service class, see its periods/goals/importance, and read a few classification rules. This is the standard read-only inquiry an analyst performs when answering 'why did my batch job land in this priority?' or 'what response-time goal does CICSPROD have?'.",
        hints: [
          "Hint 1: From TSO READY (or ISPF option 6) issue: WLM. The WLM Primary Menu opens. (Some sites use the abbreviation IWMARIN0 if WLM isn't aliased.) On systems where you have z/OSMF, the Workload Management plugin gives the same view through a browser.",
          "Hint 2: On the WLM Primary Menu choose option 1 (Definitions). Press Enter without entering a definition name → ISPF lists all definitions installed in the WLM couple dataset; the active one is marked with an asterisk or 'A' flag.",
          "Hint 3: Type V (View) next to the active definition to open it read-only — you will not be able to save changes, which is what you want for safe inspection. The definition's policies, workloads, service classes, and classification rules become navigable from a sub-menu.",
          "Hint 4: Choose option 4 (Service Classes) → list of all service classes with their workload, base goal, importance. Pick one named CICSPROD, BATPROD, TSOSHORT, or similar (names vary by site) and drill in with S to see its periods (Period 1 / Period 2 / Period 3) and the goal+importance for each.",
          "Hint 5: Back at the sub-menu, option 6 (Classification Rules) → pick subsystem type JES → see the ordered list of WHEN clauses that map jobs to service classes. Notice how each rule keys on attributes like ACCTINFO, PRDID, SUBSYS, JOBNAME, USERID and lands on a SRVCLASS name. The first match wins.",
          "Hint 6: F3 all the way out without saving. The view-only flag means even if you accidentally type something, ISPF refuses the change."
        ],
        solution: "<strong>Expected navigation flow:</strong><br><br>1. <code>WLM</code> + Enter → WLM Primary Menu. Common entries: 1=Definitions, 2=Workloads, 3=Resources, 4=Service Coefficients, etc.<br>2. <code>1</code> + Enter → Definition list. The active definition shows with status <strong>ACTIVE</strong> in the Status column. Note its name (typical: SYSPLEX1, PROD, or similar).<br>3. <code>V</code> next to the active definition → opens the Policy Definition Menu in read-only mode. The header shows <code>Definition Name: ...  Status: VIEWING (read only)</code>.<br>4. Choose <code>4</code> (Service Classes) → list panel. Sample entries you'd typically see:<pre style=\"background:#0d0d0d;color:#ffb000;padding:1rem;border-radius:4px;overflow-x:auto;font-family:'Share Tech Mono',monospace;font-size:.85rem;line-height:1.45;margin:.6rem 0;\">Service Class    Workload    Base Importance Goal\nCICSPROD         CICS        1               90% in 0.300 sec\nBATPROD          BATCH       2               Velocity 60\nBATLOW           BATCH       4               Velocity 30\nTSOSHORT         TSO         3               80% in 1.000 sec\nTSOLONG          TSO         4               Discretionary\nSTCHIGH          STC         1               Velocity 70\nSYSSTC           SYSTEM      1               (System default)</pre>5. <code>S</code> on CICSPROD → Service Class Definition panel. Shows the multi-period structure:<pre style=\"background:#0d0d0d;color:#ffb000;padding:1rem;border-radius:4px;overflow-x:auto;font-family:'Share Tech Mono',monospace;font-size:.85rem;line-height:1.45;margin:.6rem 0;\">Period  Duration       Importance  Goal\n1       100,000 SU     1           Resp Time PCT 90% &lt; 0.300s\n2       1,000,000 SU   2           Resp Time AVG 1.000s\n3       --             3           Velocity 30</pre>6. F3 back, choose <code>6</code> (Classification Rules) → subsystem list (JES, CICS, TSO, STC, OMVS, IMS, DDF, ...). Pick JES → sample ruleset:<pre style=\"background:#0d0d0d;color:#ffb000;padding:1rem;border-radius:4px;overflow-x:auto;font-family:'Share Tech Mono',monospace;font-size:.85rem;line-height:1.45;margin:.6rem 0;\">Action  Type    From         To             Service Class\nWHEN    UI      EQ   PRODID                  BATPROD\nWHEN    AI      EQ   ACCT9000                BATPROD\nWHEN    AI      EQ   ACCT8000                BATLOW\nWHEN    UI      EQ   Z12345                  BATLOW\nOTHERWISE                                     BATLOW</pre><strong>What you've learned by walking through:</strong> (a) every workload running on this system has a service class assignment determined by the rules in option 6; (b) service classes are graduated through periods so long-running work doesn't keep its tight goal forever; (c) importance 1 is reserved for the work the business cannot afford to slip; (d) the OTHERWISE catch-all at the bottom of every classification ruleset prevents unmatched work from being accidentally unmanaged.<br><br><strong>What you should NOT do</strong> in a learning environment: do not pick option I (Install) or A (Activate) on any definition — those would push your changes into the couple dataset and replace the running policy across the entire sysplex, which requires storage/sysprog authority you don't have. Stay in V (View) mode."
      },
      {
        title: "Task 2 — Find Your Own Job's WLM Classification and Performance",
        description: "Submit a small batch job, then use SDSF and operator commands to discover which service class the job was classified into and how WLM treated it. This connects the abstract classification rules from Task 1 to a concrete piece of your own work.",
        hints: [
          "Hint 1: Reuse (or recreate) the NOOPJOB from the SDSF L1 task — a one-step IEFBR14 job in Z12345.TEST.CNTL(NOOPJOB). Add a small wait so it lasts long enough to see in DA: replace IEFBR14 with PGM=IEFBR14 (still no-op) plus an additional step EXEC PGM=BPXBATCH,PARM='SH sleep 30'.",
          "Hint 2: Submit from ISPF Edit with SUB. Switch to SDSF =SD;DA quickly and find your job while it is running. SDSF's DA panel shows columns including SRVCLASS and WORKLOAD — those are the WLM assignments.",
          "Hint 3: Once the job has finished, switch to =SD;ST or =SD;H, drill into the job (S), then S on JESYSMSG. Search (FIND) for IEF142I — the step termination line carries the SRVCLASS name in some installations. Also check IEF032I and IEF374I for service-unit consumption.",
          "Hint 4: From any SDSF panel issue / followed by D WLM,SYSTEMS to see WLM status; / D WLM,SYSNAME=youSysname,SCM=ALL shows service-class-period detail (admin auth may be required for some forms — D WLM by itself is usually allowed).",
          "Hint 5: For deeper detail try =RMF (or RMF as a TSO command) → Monitor III → option 1 (Sysplex) → SYSSUM. If your job ran in BATPROD or whatever your site's batch class is called, you'll see that class's PI, response time / velocity actuals, and how many transactions completed in the last interval."
        ],
        solution: "<strong>Expected flow:</strong><br><br>1. JCL — let the job run long enough to be visible:<pre style=\"background:#0d0d0d;color:#ffb000;padding:1rem;border-radius:4px;overflow-x:auto;font-family:'Share Tech Mono',monospace;font-size:.88rem;line-height:1.45;margin:.6rem 0;\">//WLMTEST  JOB (ACCT),'WLM CLASSIFY',CLASS=A,MSGCLASS=H,NOTIFY=&amp;SYSUID\n//STEP1    EXEC PGM=BPXBATCH,PARM='SH sleep 30'\n//STDOUT   DD  SYSOUT=*</pre>SUB. Job ID returned (e.g., JOB12345).<br>2. <code>=SD;DA</code> — find your job in the active list while it sleeps. Sample row (some columns trimmed):<pre style=\"background:#0d0d0d;color:#ffb000;padding:.6rem;border-radius:4px;overflow-x:auto;font-family:'Share Tech Mono',monospace;font-size:.85rem;margin:.4rem 0;\">JOBNAME    JOBID    OWNER  STATUS  CPU%  WORKLOAD  SRVCLASS  PER\nWLMTEST    JOB12345 Z12345 EXEC    0.0   BATCH     BATLOW    1</pre>So this job was classified into service class BATLOW, period 1, in workload BATCH. From Task 1's view of the classification rules you can now see <em>why</em> — your USERID (Z12345) matched the WHEN UI EQ Z12345 → BATLOW rule (or the OTHERWISE fell-through).<br>3. After completion, in the H panel S on the job, then S on JESYSMSG. Find lines like:<pre style=\"background:#0d0d0d;color:#ffb000;padding:.6rem;border-radius:4px;overflow-x:auto;font-family:'Share Tech Mono',monospace;font-size:.85rem;margin:.4rem 0;\">IEF032I STEP/STEP1   /SVC.UNTS    348\nIEF142I WLMTEST STEP1 - STEP WAS EXECUTED - COND CODE 0000\nIEF373I STEP/STEP1   /START 2026123.1505\nIEF374I STEP/STEP1   /STOP  2026123.1505 CPU 0MIN 00.04SEC SRB ...</pre>The 348 service units (the 'service' WLM uses to track period progression) is well below the 100,000 SU period-1 threshold for BATLOW, so this job lived its entire life in period 1.<br>4. From SDSF command line: <code>/D WLM</code> — example:<pre style=\"background:#0d0d0d;color:#ffb000;padding:.6rem;border-radius:4px;overflow-x:auto;font-family:'Share Tech Mono',monospace;font-size:.85rem;margin:.4rem 0;\">IWM025I  15.05.32 WLM DISPLAY\n  ACTIVE WORKLOAD MANAGEMENT SERVICE POLICY NAME: STANDARD\n  ACTIVATED: 2026/04/12 14:30:55 BY USER ADMIN1\n  SYSPLEX: PLEX1\n  ACTIVATE TIMESTAMP: ...</pre>5. <code>=RMF</code> → Monitor III → SYSSUM (or directly: <code>RMF;3;1</code>):<pre style=\"background:#0d0d0d;color:#ffb000;padding:.6rem;border-radius:4px;overflow-x:auto;font-family:'Share Tech Mono',monospace;font-size:.85rem;margin:.4rem 0;\">Service Class  Per   T   Goal      Actual    PI   #End   Trans/sec\nCICSPROD       1     R   0.300P90  0.214     0.71 4127   13.8\nBATPROD        1     V   60        72        0.83 18     0.06\nBATLOW         1     V   30        45        0.67 142    0.47   &lt;-- you\nTSOSHORT       1     R   1.000P80  0.612     0.61 89     0.30\n...</pre>You can see BATLOW is meeting its velocity-30 goal with 45% actual (PI=0.67, exceeding goal). Your one job is part of the 142 transactions completed in the interval.<br><br><strong>What this teaches:</strong> the abstract WLM machinery from Task 1 manifests itself as a single column on every panel that shows your work — SDSF DA, SDSF ST, JESYSMSG, RMF SYSSUM. By following one of your own jobs from submission through classification, execution, and into the service-class statistics, you can see exactly how 'WLM made the system fair' translates into a decision affecting <em>your</em> work specifically. If you need your batch jobs in a higher-priority service class (a common request for class projects on shared learning systems), the conversation with the sysprog now has concrete evidence — 'my classification matched OTHERWISE → BATLOW; can you add a USERID-based rule sending Z12345 to BATPROD?'."
      }
    ]
  },

  //  Batch Processing & JCL L2 (1 card) 

  {
    id: "l2-batch",
    level: 2,
    category: "Batch Processing & JCL",
    title: "Advanced JCL, Restart & Workload Scheduling",
    summary: "Advanced PROC usage, symbolic parameter overrides, step restart and checkpoint/restart recovery techniques, and enterprise workload scheduling product awareness.",
    content: `
      <h2>Advanced PROC Usage</h2>
      <p>Replace with content on nested PROCs, symbolic override on the EXEC statement, and PROC library concatenation.</p>
      <h2>Restart and Recovery</h2>
      <ul>
        <li><strong>Step restart (RESTART= on JOB)</strong>  placeholder.</li>
        <li><strong>Checkpoint/restart (CHKPT macro + SYSCHK DD)</strong>  placeholder.</li>
        <li><strong>JESREQUEUE and operator restart</strong>  placeholder.</li>
      </ul>
      <h2>Workload Scheduling Awareness</h2>
      <p>Introduce IBM Workload Scheduler (IWS/TWS), CA7, and their integration with JES for dependency-based scheduling.</p>
      <h2>GDG Advanced Usage</h2>
      <p>Generation expressions (+1, 0, -1), rolloff options (EMPTY vs NOEMPTY), and GDG in multi-step jobs.</p>
    `,
    mcq: [
      { question: "What JCL parameter enables restart from a specific step?", options: ["RESTART=", "RESUME=", "RERUN=", "CONTINUE="], answer: 0, explanation: "RESTART=stepname on the JOB statement resumes execution from the named step, skipping earlier steps." },
      { question: "What is checkpoint/restart used for?", options: ["Re-running from start", "Resuming a long-running job from the last checkpoint after a failure", "Resetting JES queues", "Full IPL restart"], answer: 1, explanation: "Checkpoint/restart saves periodic snapshots so a failing long job can resume from the last checkpoint rather than starting over." },
      { question: "How do you override a symbolic parameter in a catalogued PROC at execution time?", options: ["Modify the PROC member", "Pass the value on the EXEC PROC= statement", "Use a COND parameter", "Submit PROC as a separate job"], answer: 1, explanation: "Symbolics are overridden by adding assignments on the invoking EXEC: // EXEC MYPRC,SYM1=VAL1" },
      { question: "What does GDG relative number (+1) do in JCL at allocation time?", options: ["References current generation", "Creates the next new generation in the GDG sequence", "Deletes the oldest generation", "Refers to generation zero"], answer: 1, explanation: "+1 allocates a new GDG generation, incrementing the generation sequence number upon successful job completion." },
      { question: "What IBM mainframe scheduler product manages job dependency networks and current plans?", options: ["CA7 only", "IWS (IBM Workload Scheduler / TWS)", "AutoSys", "Control-M"], answer: 1, explanation: "IBM Workload Scheduler (IWS/TWS/OPC) is IBM's native mainframe scheduling product providing dependency, calendar, and current-plan management." }
    ],
    practical: [
      { title: "Task 1  Write a Catalogued PROC with Symbolic Parameters", description: "Create a PROC with two symbolic parameters, then invoke it from a JCL job overriding both.", hints: ["Hint 1: declare symbolics on the PROC header: //MYPRC PROC P1=DEFAULT1,P2=DEFAULT2", "Hint 2: override with EXEC MYPRC,P1=NEWVAL1,P2=NEWVAL2"], solution: "Expected PROC and JCL. Replace with real content." },
      { title: "Task 2  Restart a Failed Job at a Specific Step", description: "Cause a job to fail at step 2, then resubmit with RESTART=STEP2 and verify only step 2 onwards ran.", hints: ["Hint 1: add //JOBRESTART JOB ...,RESTART=STEP2 in the resubmission.", "Hint 2: check SDSF to confirm step 1 shows no execution record."], solution: "Expected JCL and SDSF observations. Replace with real content." }
    ]
  },

  //  Automation & Scripting L2 (1 card) 

  {
    id: "l2-automation",
    level: 2,
    category: "Automation & Scripting",
    title: "Advanced REXX & System Integration",
    summary: "Advanced REXX (stem variables, EXECIO, error handling), REXXISPF service integration, SDSF ISF interface, issuing MVS console commands, and reading SMF data from REXX.",
    content: `
      <h2>Advanced REXX Techniques</h2>
      <p>Replace with content on stem variables, compound variables, external functions, and REXX error handling (SIGNAL ON).</p>
      <h2>REXX I/O with EXECIO</h2>
      <ul>
        <li><strong>EXECIO * DISKR</strong>  read all records from a dataset into a stem.</li>
        <li><strong>EXECIO * DISKW</strong>  write a stem to a dataset.</li>
        <li><strong>FINIS option</strong>  close the file after I/O.</li>
      </ul>
      <h2>REXXISPF Services</h2>
      <p>ISPEXEC VGET/VPUT, TBOPEN/TBCLOSE, and SELECT CMD for advanced ISPF automation.</p>
      <h2>SDSF ISF Interface</h2>
      <p>Using ADDRESS ISFCONS and ISFEXEC to query job status programmatically from REXX.</p>
      <h2>MVS Console Commands from REXX</h2>
      <p>Issuing operator commands and capturing responses using OUTTRAP and ADDRESS CONSOLE.</p>
    `,
    mcq: [
      { question: "What is a REXX stem variable?", options: ["A fixed constant", "An associative array indexed by a tail (e.g. list.1, list.2, list.0=count)", "A read-only system variable", "A PROC-level declaration"], answer: 1, explanation: "Stem variables form REXX's array mechanism. list.0 holds the element count by convention." },
      { question: "What does OUTTRAP do in REXX?", options: ["Traps runtime errors", "Redirects TSO command output into a stem variable array for programmatic processing", "Opens a file for writing", "Intercepts ISPF variable changes"], answer: 1, explanation: "OUTTRAP(stem) captures lines that would otherwise appear on screen, storing them in stem.1, stem.2 ... stem.0." },
      { question: "Which SDSF REXX command executes a SDSF query and returns results?", options: ["ISFBROWSE", "ISFEXEC", "ISFACT", "ISFLIST"], answer: 1, explanation: "ISFEXEC runs a SDSF query (e.g. ST, DA) and populates REXX variables with the returned data." },
      { question: "What REXX instruction reads all records from a sequential dataset into a stem?", options: ["EXECIO * DISKR 'dsn' (FINIS STEM data.)", "READFILE dsn INTO stem.", "GET FILE(dsn) STEM(data.)", "RECEIVE dsn STEM(data.)"], answer: 0, explanation: "EXECIO * DISKR 'dsn' (FINIS STEM data.) reads every record into data.1 ... data.n and sets data.0 to the count." },
      { question: "What must you do before issuing MVS console commands from REXX via ADDRESS CONSOLE?", options: ["Define a RACF OPERCMDS profile", "Issue CONSPROF to acquire a console token and activate the environment", "Run as UID 0 in USS", "Have ALTER to SYS1.PARMLIB"], answer: 1, explanation: "Before using ADDRESS CONSOLE, REXX must activate a console environment with the CONSPROF command and appropriate RACF authority." }
    ],
    practical: [
      { title: "Task 1  REXX Job Monitor Using SDSF ISF Interface", description: "Write a REXX exec that queries SDSF ST for all jobs matching your user ID and prints any with a non-zero return code.", hints: ["Hint 1: ADDRESS ISFCONS then ISFEXEC ST", "Hint 2: loop over ISFRESP. stem checking JOBIRETC field."], solution: "Expected REXX code and output. Replace with real content." },
      { title: "Task 2  Read and Parse an SMF Extract File with REXX", description: "Using EXECIO and SUBSTR(), read a flat SMF extract file and display the SMF record type and creation date for each line.", hints: ["Hint 1: EXECIO * DISKR 'your.smf.extract' (FINIS STEM rec.)", "Hint 2: SMF record type is typically at a fixed offset  use SUBSTR(rec.i, offset, length)."], solution: "Expected REXX exec and sample output. Replace with real content." }
    ]
  },

  //  Subsystems & Middleware L2 (2 cards) 

  {
    id: "l2-mq",
    level: 2,
    category: "Subsystems & Middleware",
    title: "IBM MQ for z/OS",
    summary: "IBM MQ queue manager architecture on z/OS, message queues, MQ channels, basic administration commands (MQSC), and trigger-based message processing.",
    content: `
      <h2>IBM MQ Architecture on z/OS</h2>
      <p>Replace with content on queue manager address spaces, the MQ channel initiator, and MQ-to-JES interactions.</p>
      <h2>MQ Queues</h2>
      <ul>
        <li><strong>Local queues</strong>  placeholder.</li>
        <li><strong>Remote queues (alias)</strong>  placeholder.</li>
        <li><strong>Transmission queues</strong>  placeholder.</li>
        <li><strong>Dead-letter queues</strong>  placeholder.</li>
      </ul>
      <h2>MQ Channels</h2>
      <p>Sender, receiver, server, requester, and client-connection channel types.</p>
      <h2>MQSC Commands</h2>
      <p>DISPLAY QMGR, DISPLAY QUEUE, DEFINE, ALTER, DELETE, and START/STOP CHANNEL.</p>
      <h2>Trigger-Based Processing</h2>
      <p>Explain the MQ trigger mechanism for starting application programs when messages arrive.</p>
    `,
    mcq: [
      { question: "What is an IBM MQ queue manager?", options: ["A JES queue display panel", "The MQ server process managing message queues and routing", "An ISPF panels for queues", "A WLM service class"], answer: 1, explanation: "The queue manager is the MQ server: it persists messages, enforces delivery, and manages channels." },
      { question: "What is an MQ transmission queue used for?", options: ["Storing messages for local application pickup", "Staging messages destined for a remote queue manager pending channel delivery", "Dead-letter storage", "Trigger monitoring"], answer: 1, explanation: "A transmission queue (XMITQ) holds messages awaiting forwarding through a sender channel to a remote queue manager." },
      { question: "What does a dead-letter queue (DLQ) contain?", options: ["Completed transaction records", "Messages that could not be delivered to their destination queue", "Channel state logs", "Trigger monitor audit records"], answer: 1, explanation: "When MQ cannot route or deliver a message, it places it on the dead-letter queue for administrator investigation." },
      { question: "Which MQSC command shows the status of all defined queues?", options: ["STATUS QUEUE(*)", "DISPLAY QUEUE(*) TYPE(ALL)", "LIST QUEUE ALL", "SHOW QUEUE *"], answer: 1, explanation: "DISPLAY QUEUE(*) TYPE(ALL) lists all queue definitions; adding STATUS shows current depth and open handles." },
      { question: "What is an MQ trigger?", options: ["A CICS transaction start", "A mechanism that automatically starts an application when a message arrives on a monitored queue", "A channel reconnect timer", "A RACF event type"], answer: 1, explanation: "MQ triggers fire when a message arrives (or depth crosses a threshold), starting a defined application to process it." }
    ],
    practical: [
      { title: "Task 1  Display Queue Manager and Queue Status", description: "Connect to an MQ queue manager via MQSC and run DISPLAY QMGR and DISPLAY QUEUE(*) to inventory all queues and their current depths.", hints: ["Hint 1: issue CSQUTIL or RUNMQSC from a TSO session or USS.", "Hint 2: DISPLAY QUEUE(*) STATUS ALL shows depth and connection counts."], solution: "Expected commands and output. Replace with real content." },
      { title: "Task 2  Define a Local Queue and Test Message PUT/GET", description: "Define a local queue using MQSC, put a test message using a provided sample program or utility, then get and display the message.", hints: ["Hint 1: DEFINE QLOCAL(TEST.QUEUE) DESCR('Test queue') MAXDEPTH(100)", "Hint 2: use AMQSPUT /AMQSGET sample programs or a z/OSMF MQ plugin."], solution: "Expected MQSC and test commands. Replace with real content." }
    ]
  },

  {
    id: "l2-smpe",
    level: 2,
    category: "Subsystems & Middleware",
    title: "SMP/E, Software Lifecycle & IWS",
    summary: "SMP/E zone structure (global, target, distribution), the RECEIVE/APPLY/ACCEPT installation flow, PTF and HOLDDATA management, and IBM Workload Scheduler (IWS) current-plan management.",
    content: `
      <h2>SMP/E  System Modification Program/Extended</h2>
      <p>Replace with content on SMP/E as the z/OS software installation and maintenance tool.</p>
      <h2>SMP/E Zones</h2>
      <ul>
        <li><strong>Global zone (GLOBALZONE)</strong>  tracks all known software and service.</li>
        <li><strong>Target zone</strong>  defines production runtime libraries.</li>
        <li><strong>Distribution zone (DZONE)</strong>  holds archived base elements for recreation.</li>
      </ul>
      <h2>Installation Flow</h2>
      <p>RECEIVE (download to global), APPLY (install to target), ACCEPT (promote to distribution).</p>
      <h2>PTF & HOLDDATA Management</h2>
      <p>HOLD types (PE, SYSMOD, ERROR), BYPASS options, and SMP/E REPORT ERRSYSMODS.</p>
      <h2>IBM Workload Scheduler (IWS/TWS)</h2>
      <p>Job dependency networks, run cycles, current-plan creation, and daily-plan management using IWS Controller.</p>
    `,
    mcq: [
      { question: "What does SMP/E APPLY do?", options: ["Downloads software from IBM to the global zone", "Installs software elements into target-zone production libraries", "Promotes software from target to distribution zone", "Validates HOLDDATA only"], answer: 1, explanation: "APPLY copies elements from the global zone into the target zone libraries, making the new code available for use." },
      { question: "What is the SMP/E global zone?", options: ["A RACF security zone", "A metadata CSI dataset recording all received software (FMIDs, PTFs, USERMODs) regardless of installation status", "A USS filesystem area", "A WLM zone boundary"], answer: 1, explanation: "The global zone is a CSI dataset that tracks every SYSMOD ever received, even if not yet applied." },
      { question: "What is a PE HOLD in SMP/E?", options: ["A permanent hold applied by the administrator", "A hold placed by IBM on a PTF with a reported defect (Program Error), preventing APPLY", "A hold that pauses all SMF recording", "A planned end-of-service hold"], answer: 1, explanation: "PE (Program Error) HOLD means IBM has found or been notified of a defect in this PTF. SMP/E will prevent APPLY until superceded." },
      { question: "What does IWS 'current plan' represent?", options: ["The WLM service definition in effect", "The daily operational schedule listing all expected jobs and their dependencies for the planning period", "The active SMF recording configuration", "The LPAR resource allocation for today"], answer: 1, explanation: "The current plan is IWS's live operational day-plan: it contains all scheduled jobs, their start windows, dependencies, and completion status." },
      { question: "What is an IWS run cycle?", options: ["A JES job class", "A definition specifying on which days and at what frequency an application should be scheduled", "A REXX scheduling loop", "A WLM performance cycle"], answer: 1, explanation: "Run cycles (daily, weekly, specific dates, calendar-based) determine when IWS includes an application's jobs in the daily plan." }
    ],
    practical: [
      { title: "Task 1  Browse SMP/E CSI and List Installed Products", description: "Use SMP/E ISPF dialogs to open a global CSI and list installed product FMIDs and their current maintenance level.", hints: ["Hint 1: access SMP/E from ISPF option 6 or the SMP/E primary menu.", "Hint 2: use REPORT SOURCEID or browse the target zone SYSMOD entries."], solution: "Expected navigation steps and output. Replace with real content." },
      { title: "Task 2  Check HOLDDATA for a PTF", description: "Use SMP/E REPORT ERRSYSMODS to identify any applied PTFs with outstanding PE holds, and note the recommended replacement.", hints: ["Hint 1: REPORT ERRSYSMODS in an SMP/E EXEC.", "Hint 2: look for PTFs listed as PE and note the SUPERSEDE chain."], solution: "Expected commands and output. Replace with real content." }
    ]
  },

  //  Networking & Security L2 (1 card) 

  {
    id: "l2-networking",
    level: 2,
    category: "Networking & Security",
    title: "TCP/IP Stack, FTP Config & RACF Advanced",
    summary: "In-depth TCP/IP stack configuration (PROFILE.TCPIP, AUTOLOG, routing), FTP server setup, RACF advanced resource protection (FACILITY, STARTED, SETROPTS), and access list management.",
    content: `
      <h2>TCP/IP Stack In-Depth</h2>
      <p>Replace with content on PROFILE.TCPIP structure, AUTOLOG statements, GLOBALCONFIG, and dynamic routing tables.</p>
      <h2>FTP Server Configuration</h2>
      <ul>
        <li><strong>FTP.DATA configuration file</strong>  placeholder.</li>
        <li><strong>JESINTERFACELEVEL</strong>  placeholder.</li>
        <li><strong>Secure FTP / SFTP considerations</strong>  placeholder.</li>
      </ul>
      <h2>RACF Advanced Resource Protection</h2>
      <p>Cover the FACILITY class, PROGRAM class, APPL class, STARTED class (started-task security), and key SETROPTS options.</p>
      <h2>Access List Management</h2>
      <p>Permit levels (READ/UPDATE/CONTROL/ALTER), conditional access, RACF SEARCH, and RACF reporting tools.</p>
    `,
    mcq: [
      { question: "Which PROFILE.TCPIP statement starts processes automatically when the TCP/IP stack initialises?", options: ["AUTOSTART", "AUTOLOG", "AUTORUN", "INITSTACK"], answer: 1, explanation: "AUTOLOG entries in PROFILE.TCPIP start specified procedures (like FTPD, SSHD) when the TCP/IP stack comes up." },
      { question: "Which RACF class protects non-dataset z/OS resources such as z/OSMF and USS operations?", options: ["FACILITY", "DATASET", "UNIXPRIV", "JESSPOOL"], answer: 0, explanation: "The FACILITY class (and other general resource classes) protect non-dataset resources including z/OSMF services, console access, and started tasks." },
      { question: "What does SETROPTS AUDIT(classname) activate?", options: ["Suppress RACF messages for that class", "Log all access attempts (success and failure) to resources in the named class", "Revoke all users from the class", "Set universal access to NONE"], answer: 1, explanation: "SETROPTS AUDIT records SMF type 80 records for every access attempt (permitted and rejected) in the specified class." },
      { question: "What RACF access level is required to delete a protected dataset?", options: ["READ", "UPDATE", "CONTROL", "ALTER"], answer: 3, explanation: "ALTER is the highest RACF access level; it permits delete, rename, and VSAM re-catalog operations." },
      { question: "What does a RACF STARTED class profile do?", options: ["Define a user's logon time restrictions", "Map a started task procedure name to a RACF user ID automatically at task start", "Limit active TCP connections", "Define FTP dataset rules"], answer: 1, explanation: "STARTED class entries (or ICHRIN03 table) mapoperator-started procedure names to RACF user IDs, granting those tasks appropriate security identity." }
    ],
    practical: [
      { title: "Task 1  Review and Verify FTP Server Configuration", description: "Inspect FTP.DATA and the PROFILE.TCPIP AUTOLOG entry for the FTP server, then verify the server is listening on port 21 with NETSTAT PORTLIST.", hints: ["Hint 1: browse FTP.DATA for JESINTERFACELEVEL and AUTH settings.", "Hint 2: NETSTAT PORTLIST | find 21 confirms the FTP listener is active."], solution: "Expected configuration findings and test output. Replace with real content." },
      { title: "Task 2  Define a FACILITY Class Profile and Grant Access", description: "Use RDEFINE to protect a z/OSMF facility resource, PERMIT a user ID READ access, and verify with RLIST.", hints: ["Hint 1: RDEFINE FACILITY (profile.name) UACC(NONE)", "Hint 2: PERMIT profile.name CLASS(FACILITY) ID(userid) ACCESS(READ)", "Hint 3: RLIST FACILITY profile.name ALL confirms the entry."], solution: "Expected RACF commands and output. Replace with real content." }
    ]
  }

];
