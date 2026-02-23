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
    summary: "What z/OS is, its role in enterprise computing, the address space model, virtual storage layout, and how tasks are isolated from each other.",
    content: `
      <h2>What is z/OS?</h2>
      <p>Replace with content about z/OS origins, purpose, and its role as a high-availability enterprise operating system.</p>
      <h2>Address Space Model</h2>
      <p>Explain the virtual address space structure: system area, private area, and common area.</p>
      <h2>Virtual Storage</h2>
      <ul>
        <li><strong>Real vs virtual storage</strong>  placeholder description.</li>
        <li><strong>Paging and swapping</strong>  placeholder description.</li>
        <li><strong>Storage protection keys</strong>  placeholder description.</li>
      </ul>
      <h2>Task Isolation</h2>
      <p>Describe how each address space is isolated and how cross-memory communication works at a high level.</p>
    `,
    mcq: [
      { question: "What is an address space on z/OS?", options: ["A physical memory location", "A virtual memory region assigned to each task for isolation", "A DASD volume", "A network segment"], answer: 1, explanation: "Each task runs in its own virtual address space, providing isolation and access control." },
      { question: "What does virtual storage allow z/OS to do?", options: ["Run programs larger than real memory by paging in and out of disk", "Encrypt all datasets automatically", "Share TCP/IP connections", "Define LPAR boundaries"], answer: 0, explanation: "Virtual storage lets z/OS present more addressable memory to programs than physical RAM exists, using paging." },
      { question: "Which area of an address space is shared across all tasks?", options: ["Private area", "Extended private area", "Common area (CSA/ECSA)", "Job pack area"], answer: 2, explanation: "The Common Service Area (CSA) and its extended counterpart are mapped identically into every address space." },
      { question: "What are storage protection keys used for?", options: ["Encrypting datasets", "Preventing unauthorized writes to memory regions", "Locking RACF profiles", "Controlling I/O device access"], answer: 1, explanation: "Storage keys (015) protect 4 KB pages from unauthorised writes by tasks running under a different key." },
      { question: "Which z/OS component manages real storage frames and paging?", options: ["JES2", "RSM (Real Storage Manager)", "VTAM", "RACF"], answer: 1, explanation: "RSM handles frame allocation, page-ins, page-outs, and swapping of address spaces." }
    ],
    practical: [
      { title: "Task 1  Display Active Address Spaces", description: "Use the MVS D A,L operator command or the SDSF DA panel to list currently active address spaces and identify system vs user tasks.", hints: ["Hint 1: from SDSF type DA on the command line.", "Hint 2: look for OMVS, JES2, RACF, TCPIP in the list."], solution: "Expected output and interpretation. Replace with real content." },
      { title: "Task 2  Query Storage Usage", description: "Use the D CSA,LIMIT operator command to display current CSA/ECSA usage and identify any subsystems consuming large amounts.", hints: ["Hint 1: issue D CSA from SDSF LOG or operator console.", "Hint 2: compare usage against the limit defined in IEASYSxx."], solution: "Expected output and interpretation. Replace with real content." }
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
      <p>Replace with content on Initial Program Load: what it is and when it occurs.</p>
      <h2>IPL Sequence</h2>
      <ul>
        <li><strong>Booting from volume</strong>  placeholder.</li>
        <li><strong>NIP (Nucleus Initialization Program)</strong>  placeholder.</li>
        <li><strong>IEASYSxx processing</strong>  placeholder.</li>
        <li><strong>Master Scheduler initialization</strong>  placeholder.</li>
      </ul>
      <h2>PARMLIB</h2>
      <p>Explain SYS1.PARMLIB, its role, and key members (IEASYSxx, IEAPAKxx, SMFPRMxx, etc.).</p>
      <h2>Reaching a Ready State</h2>
      <p>Describe the sequence from IPL completion to JES starting and the system being available for workloads.</p>
    `,
    mcq: [
      { question: "What does IPL stand for?", options: ["Internal Program Loader", "Initial Program Load", "I/O Path Loader", "ISPF Primary Library"], answer: 1, explanation: "IPL (Initial Program Load) is the process of bootstrapping z/OS from a designated volume." },
      { question: "Which PARMLIB member specifies the primary system initialization parameters?", options: ["SMFPRMxx", "BPXPRMxx", "IEASYSxx", "SCHEDxx"], answer: 2, explanation: "IEASYSxx is the master initialization member read at IPL to determine which other members and options are used." },
      { question: "What is the role of NIP during IPL?", options: ["Start JES queues", "Initialize the nucleus and prepare the system for further components to load", "Allocate DASD volumes", "Start RACF"], answer: 1, explanation: "NIP (Nucleus Initialization Program) initializes the z/OS kernel and sets up the base system environment." },
      { question: "Where is SYS1.PARMLIB typically located?", options: ["On the network drive", "On the IPL volume or a shared primary DASD volume", "In the JES spool", "In a VSAM cluster"], answer: 1, explanation: "SYS1.PARMLIB is a PDS on DASD, usually on the same volume used to IPL the system." },
      { question: "After a successful IPL, which subsystem is started first to enable job processing?", options: ["RACF", "TCP/IP", "JES2 or JES3", "CICS"], answer: 2, explanation: "JES (Job Entry Subsystem) is started early in initialization so the system can accept and manage workloads." }
    ],
    practical: [
      { title: "Task 1  Browse IEASYSxx in SYS1.PARMLIB", description: "Use ISPF 3.4 to locate SYS1.PARMLIB, identify the active IEASYSxx member suffix, and review its contents.", hints: ["Hint 1: ask your instructor which suffix is in use, e.g. IEASYS00.", "Hint 2: use ISPF Browse (option 1) to read the member."], solution: "Expected findings. Replace with real content." },
      { title: "Task 2  Identify System Initialization Messages in the Log", description: "Browse the operator log or SDSF LOG to find IPL-related messages (IEA, IOS prefixes) and trace the sequence of subsystem starts.", hints: ["Hint 1: in SDSF type LOG and filter for IEA*.", "Hint 2: note the timestamps and order of JES, RACF, TCPIP starts."], solution: "Expected observations. Replace with real content." }
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
      <p>Replace with content on the Job Entry Subsystem: JES2 vs JES3, its role in batch processing.</p>
      <h2>Spool Management</h2>
      <ul>
        <li><strong>SPOOL datasets</strong>  placeholder.</li>
        <li><strong>Job classes</strong>  placeholder.</li>
        <li><strong>Output classes and routing</strong>  placeholder.</li>
      </ul>
      <h2>JES2 Initiators</h2>
      <p>Explain job initiators, how they pick up work, and how class-to-initiator assignment controls throughput.</p>
      <h2>Sysplex Concept</h2>
      <p>Introduce the sysplex: a group of z/OS systems connected via a Coupling Facility that share resources and workloads.</p>
    `,
    mcq: [
      { question: "What is the primary role of JES on z/OS?", options: ["Manage disk I/O buffers", "Accept, queue, and manage jobs for execution", "Control TCP/IP routing", "Manage RACF profiles"], answer: 1, explanation: "JES (Job Entry Subsystem) handles job input, scheduling, output disposition, and spool management." },
      { question: "What is a JES initiator?", options: ["A task that reads jobs from the spool and starts their execution", "A network listener", "A RACF security exit", "A PARMLIB member"], answer: 0, explanation: "Initiators are address spaces that pull jobs matching their class assignments from the JES input queue and present them for execution." },
      { question: "What is the JES spool used for?", options: ["Storing RACF audit records", "Holding job input, output, and log data temporarily during and after execution", "Paging virtual memory", "Storing TCP/IP routing tables"], answer: 1, explanation: "The JES spool holds JCL input, SYSOUT data, and job logs  data that persists until purged." },
      { question: "What is a sysplex?", options: ["A single z/OS image with multiple LPARs", "A cluster of z/OS systems sharing work, resources, and a Coupling Facility", "A JES spool partition", "An SMS storage group"], answer: 1, explanation: "A sysplex (system complex) connects multiple z/OS images so they can cooperate for availability and scalability." },
      { question: "In JES2, what does the job class control?", options: ["The RACF user ID under which the job runs", "Which initiators are eligible to process the job", "The SMS management class applied", "The TCP/IP routing of output"], answer: 1, explanation: "Job class determines which initiators can pick up the job. Initiators are assigned one or more classes." }
    ],
    practical: [
      { title: "Task 1  Inspect JES2 Initiators in SDSF", description: "In SDSF, view the active initiators (I panel) and note which job classes each initiator is processing.", hints: ["Hint 1: type I on the SDSF command line to open the Initiator panel.", "Hint 2: observe the class string assigned to each numbered initiator."], solution: "Expected observations. Replace with real content." },
      { title: "Task 2  Trace a Job Through JES Queues", description: "Submit a test job and track it through the JES input  execution  output queue stages using SDSF.", hints: ["Hint 1: use SDSF ST panel to observe job status changes.", "Hint 2: after completion, browse the output in the H (held) or O (output) panel."], solution: "Expected navigation steps. Replace with real content." }
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
      <h2>Central Processor Complex (CPC)</h2>
      <p>Replace with content about CPC hardware components and their roles.</p>
      <h2>LPAR (Logical Partition)</h2>
      <p>Explain how LPARs divide a CPC into isolated system images.</p>
      <h2>Hardware Management Console (HMC)</h2>
      <ul>
        <li><strong>HMC role</strong>  placeholder.</li>
        <li><strong>SE (Support Element)</strong>  placeholder.</li>
        <li><strong>Object tree and tasks</strong>  placeholder.</li>
      </ul>
      <h2>Channels & I/O Architecture</h2>
      <p>Describe channel subsystems, CHPID types, and how I/O paths are defined.</p>
    `,
    mcq: [
      { question: "What does LPAR stand for?", options: ["Logical Partition", "Linear Partition", "Loaded Program Area", "Local Processing Area"], answer: 0, explanation: "LPAR (Logical Partition) is a hardware-enforced division of a CPC into independent system images." },
      { question: "Which tool manages CPC and LPAR hardware from an operator console?", options: ["ISPF", "SDSF", "HMC", "JES2"], answer: 2, explanation: "The Hardware Management Console (HMC) is the primary interface for managing IBM Z hardware." },
      { question: "What is a CHPID?", options: ["A channel path identifier", "A CPU identifier", "A CICS transaction ID", "A RACF group name"], answer: 0, explanation: "CHPID (Channel Path Identifier) identifies a physical or logical I/O path between the CPC and I/O devices." },
      { question: "Which LPAR resources can be defined as dedicated or shared?", options: ["Memory only", "CPU and memory", "RACF profiles", "IP addresses"], answer: 1, explanation: "CPU engines and memory can both be dedicated to a single LPAR or shared across partitions." },
      { question: "What is the Support Element (SE)?", options: ["A network router for the mainframe", "An embedded hardware management controller for a single CPC", "A JES component", "A RACF audit facility"], answer: 1, explanation: "The SE is a dedicated service controller embedded with each CPC; the HMC aggregates multiple SEs." }
    ],
    practical: [
      { title: "Task 1  Explore the HMC Object Tree", description: "Log in to the HMC and navigate the object tree to identify available CPCs and their LPARs.", hints: ["Hint 1: start at the Systems Management view.", "Hint 2: expand a CPC node to see its LPARs."], solution: "Expected observations. Replace with real content." },
      { title: "Task 2  Review LPAR CPU and Memory Settings", description: "Inspect the CPU weight and memory ceiling assigned to a given LPAR via the HMC.", hints: ["Hint 1: select the LPAR and view its Properties panel.", "Hint 2: note minimum, maximum, and initial CPU weights."], solution: "Expected findings. Replace with real content." }
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
      <p>Replace with content about Direct Access Storage Devices, volumes, cylinders, and tracks.</p>
      <h2>Sequential Datasets (PS)</h2>
      <p>Explain fixed-block and variable-length record formats, extents, and primary/secondary allocation.</p>
      <h2>Partitioned Datasets (PDS / PDSE)</h2>
      <ul>
        <li><strong>PDS directory</strong>  placeholder description.</li>
        <li><strong>Members</strong>  placeholder description.</li>
        <li><strong>PDSE advantages over PDS</strong>  placeholder description.</li>
      </ul>
      <h2>Generation Data Groups (GDG)</h2>
      <p>Explain GDG bases, generation numbers, rolloff, and use cases for versioned data.</p>
      <h2>Dataset Allocation</h2>
      <p>Cover SPACE parameter, UNIT, DISP, and RECFM/LRECL/BLKSIZE attributes.</p>
    `,
    mcq: [
      { question: "What is a DASD volume label used for?", options: ["Storing RACF profiles", "Identifying and describing the volume to the operating system", "Defining network routes", "Controlling which LPARs can access the volume"], answer: 1, explanation: "The VOL1 label at the start of a DASD volume provides the volume serial (VOLSER) and other identification information." },
      { question: "What dataset organisation supports named members within a single file?", options: ["PS (Sequential)", "PDS/PDSE", "VSAM ESDS", "GDG base"], answer: 1, explanation: "Partitioned Datasets (PDS/PDSE) contain individually named, separately accessible members." },
      { question: "What is a GDG (Generation Data Group)?", options: ["A VSAM cluster type", "A set of sequentially versioned datasets managed under a single base name", "A type of DASD volume", "A JES spool dataset"], answer: 1, explanation: "A GDG groups related dataset generations under one base name; each generation gets an ascending version number." },
      { question: "What does the DISP=(NEW,CATLG,DELETE) parameter mean?", options: ["Create dataset; if job succeeds catalog it; if job fails delete it", "Open existing; catalog always; never delete", "Rename dataset; keep if success; keep if failure", "Create dataset; always delete after job"], answer: 0, explanation: "The three sub-parameters of DISP are: initial status (NEW= allocate), normal end (CATLG= catalog), and abnormal end (DELETE= remove)." },
      { question: "What is the main advantage of PDSE over PDS?", options: ["Supports larger block sizes", "Does not require compression to reclaim space after member deletion", "Is not affected by RACF", "Stores only load modules"], answer: 1, explanation: "PDSE directories are managed dynamically and reclaim space automatically; PDS must be compressed manually." }
    ],
    practical: [
      { title: "Task 1  Allocate a PDS and Create a Member", description: "Use ISPF 3.2 to allocate a new PDS, then use ISPF Edit (option 2) to create a member and save it.", hints: ["Hint 1: use ISPF 3.2, choose Allocate New.", "Hint 2: set RECFM=FB, LRECL=80, BLKSIZE=0."], solution: "Expected steps. Replace with real content." },
      { title: "Task 2  Define a GDG Base and Create Generations", description: "Use IDCAMS to define a GDG base with a limit of 5 generations, then create two datasets using (+1) generation notation.", hints: ["Hint 1: DEFINE GDG (NAME(your.gdg) LIMIT(5) NOEMPTY SCRATCH).", "Hint 2: in JCL use DSN=your.gdg(+1),DISP=(NEW,CATLG)."], solution: "Expected IDCAMS control statements and JCL. Replace with real content." }
    ]
  },

  {
    id: "l1-vsam-catalogs",
    level: 1,
    category: "Storage & Data Management",
    title: "VSAM, ICF Catalog & VTOC",
    summary: "VSAM dataset types (KSDS, ESDS, RRDS, LDS), the ICF catalog hierarchy, VTOC structure on DASD volumes, and tape management with RMM.",
    content: `
      <h2>VSAM Dataset Types</h2>
      <ul>
        <li><strong>KSDS (Key-Sequenced)</strong>  accessed by key; most common type.</li>
        <li><strong>ESDS (Entry-Sequenced)</strong>  accessed by byte offset; no keys.</li>
        <li><strong>RRDS (Relative Record)</strong>  fixed-length slots accessed by number.</li>
        <li><strong>LDS (Linear)</strong>  byte-stream; used by zFS and Db2.</li>
      </ul>
      <h2>IDCAMS Utility</h2>
      <p>Cover DEFINE CLUSTER, LISTCAT, DELETE, and ALTER for VSAM management.</p>
      <h2>ICF Catalog</h2>
      <p>Explain the master catalog and user catalogs, catalog aliases, and how datasets are located.</p>
      <h2>VTOC</h2>
      <p>Describe the Volume Table of Contents: its role on each DASD volume and its relationship to the catalog.</p>
      <h2>Tape & RMM Basics</h2>
      <p>Introduce tape media, RMM (Removable Media Manager), scratch pools, and basic tape retention concepts.</p>
    `,
    mcq: [
      { question: "Which VSAM type organises records by a key field and maintains them in key order?", options: ["ESDS", "RRDS", "KSDS", "LDS"], answer: 2, explanation: "KSDS (Key-Sequenced Dataset) stores records in key order and provides direct access by key." },
      { question: "What IDCAMS command lists the attributes of a catalogued dataset?", options: ["DEFINE CLUSTER", "LISTCAT", "ALTER", "REPRO"], answer: 1, explanation: "LISTCAT displays catalog entries including attributes, volumes, and space statistics for VSAM and non-VSAM datasets." },
      { question: "What does the VTOC contain?", options: ["RACF user profiles", "An inventory of all dataset extents on a DASD volume", "JES job logs", "TCP/IP routing tables"], answer: 1, explanation: "The VTOC (Volume Table of Contents) is a reserved area on each DASD volume that records all dataset extents allocated there." },
      { question: "What is a catalog alias used for?", options: ["Defining a VSAM alternate index", "Pointing a high-level qualifier to a specific user catalog", "Renaming a dataset", "Assigning RACF protection to a catalog"], answer: 1, explanation: "An alias maps an HLQ to a user catalog so that z/OS knows which catalog to search when a dataset with that HLQ needs to be located." },
      { question: "What does RMM track in tape management?", options: ["Open TCP connections", "Tape volume location, status, owner, and retention date", "RACF certificate expiry", "SMF record offsets"], answer: 1, explanation: "DFSMS RMM (Removable Media Manager) maintains a database of tape volumes: their location, scratch status, and data-set retention information." }
    ],
    practical: [
      { title: "Task 1  Define a VSAM KSDS with IDCAMS", description: "Write IDCAMS DEFINE CLUSTER control statements to create a KSDS, then verify the definition with LISTCAT ALL.", hints: ["Hint 1: specify INDEXED, KEYS(len offset), and RECORDS allocation.", "Hint 2: run LISTCAT CLUSTER ENTRIES(your.vsam.ds) ALL."], solution: "Expected IDCAMS statements and output. Replace with real content." },
      { title: "Task 2  Browse the Master Catalog and a User Catalog", description: "Use IDCAMS LISTCAT to display the master catalog's alias entries, then list the contents of a user catalog.", hints: ["Hint 1: LISTCAT CATALOG(CATALOG.MASTER) ALL.", "Hint 2: LISTCAT CATALOG(user.catalog.name) ALL."], solution: "Expected output. Replace with real content." }
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
      <p>Replace with content on Time-Sharing Option: logon, the READY prompt, and common TSO commands.</p>
      <h2>ISPF Primary Menu</h2>
      <ul>
        <li><strong>Option 1  View</strong>  browse datasets read-only.</li>
        <li><strong>Option 2  Edit</strong>  create and modify datasets and members.</li>
        <li><strong>Option 3  Utilities</strong>  dataset management tasks.</li>
        <li><strong>Option 3.4  Dataset List</strong>  list and filter datasets.</li>
      </ul>
      <h2>ISPF Editor Commands</h2>
      <p>Cover FIND, CHANGE, COPY/MOVE, line commands (D, I, R, A, B), and label/range operations.</p>
      <h2>ISPF Utilities</h2>
      <p>Options 3.2 (Allocate), 3.3 (Copy), 3.4 (Dataset List), 3.17 (Compare) and their common use cases.</p>
      <h2>Productivity Tips</h2>
      <p>Function key customisation, ISPF command stacking (;), RETRIEVE (F12), and personal profile options.</p>
    `,
    mcq: [
      { question: "What ISPF option opens a dataset or member for editing?", options: ["Option 1", "Option 2", "Option 3", "Option 5"], answer: 1, explanation: "ISPF option 2 is the Edit function. It opens sequential datasets or PDS members for modification." },
      { question: "Which ISPF utility option lists datasets matching a pattern?", options: ["3.1", "3.2", "3.3", "3.4"], answer: 3, explanation: "ISPF 3.4 (Dataset List) accepts a partial DSN pattern and lists all matching catalogued datasets." },
      { question: "What does the ISPF editor line command 'D' do?", options: ["Duplicate a line", "Delete the line", "Move down in the file", "Decrease indent"], answer: 1, explanation: "The D line command deletes the line. DD...DD deletes a range." },
      { question: "What is the ISPF RETRIEVE function (typically F12) used for?", options: ["Save the current file", "Recall the last command entered on the command line", "Return to the ISPF primary menu", "Run a REXX exec"], answer: 1, explanation: "RETRIEVE cycles through previously entered option/command strings, saving re-typing." },
      { question: "How do you stack ISPF commands to execute multiple steps without returning to a menu?", options: ["Press Enter twice", "Separate commands with a semicolon (;)", "Use the JUMP command", "Submit as a batch job"], answer: 1, explanation: "ISPF command stacking uses the semicolon (;) separator: for example '3;2' goes directly to Edit from the primary menu." }
    ],
    practical: [
      { title: "Task 1  Allocate and Edit a Dataset", description: "Use ISPF 3.2 to allocate a new sequential dataset with RECFM=FB LRECL=80, then use option 2 to create a member and add some text.", hints: ["Hint 1: choose DSORG=PO (partitioned) to create a PDS.", "Hint 2: save with F3; verify with ISPF 3.4."], solution: "Expected steps. Replace with real content." },
      { title: "Task 2  Use ISPF 3.4 to Manage Datasets", description: "Open ISPF 3.4 with a pattern to list your test datasets. Rename one, delete another, and check the results.", hints: ["Hint 1: enter your HLQ followed by '.*' in the Dataset Name field.", "Hint 2: use line commands R (rename) and D (delete) against the listed entries."], solution: "Expected navigation and outcomes. Replace with real content." }
    ]
  },

  {
    id: "l1-sdsf-smf",
    level: 1,
    category: "System Operations & Tools",
    title: "SDSF, SMF, RMF & USS Basics",
    summary: "Using SDSF to monitor and manage jobs/output, SMF record types and recording, RMF Monitor overview, and introduction to UNIX System Services (USS).",
    content: `
      <h2>SDSF Panels</h2>
      <ul>
        <li><strong>ST  Status</strong>  all jobs and their queue status.</li>
        <li><strong>DA  Active</strong>  currently executing address spaces.</li>
        <li><strong>H  Held output</strong>  SYSOUT waiting for print or browse.</li>
        <li><strong>O  Output</strong>  output ready for printing.</li>
        <li><strong>LOG  System log</strong>  operator and system messages.</li>
      </ul>
      <h2>SMF (System Management Facilities)</h2>
      <p>Explain SMF record types, recording intervals, and key record numbers (14/15 dataset open/close, 30 job step, 70/72 RMF CPU/workload).</p>
      <h2>RMF Overview</h2>
      <p>Introduce RMF Monitor I (interval), Monitor II (demand), and Monitor III (real-time) and their purposes.</p>
      <h2>UNIX System Services (USS) Basics</h2>
      <p>Cover the OMVS shell, basic Unix commands (ls, cd, cat, cp, chmod), USS filesystem structure, and how to start an OMVS session.</p>
    `,
    mcq: [
      { question: "Which SDSF panel shows the system operator log?", options: ["ST", "DA", "H", "LOG"], answer: 3, explanation: "The SDSF LOG panel displays the current system log containing operator commands and system messages." },
      { question: "What SMF record type records job step termination information?", options: ["Type 14", "Type 30", "Type 70", "Type 80"], answer: 1, explanation: "SMF type 30 (Job/Step Termination) records CPU time, elapsed time, and I/O counts at step completion." },
      { question: "Which RMF monitor provides real-time performance data for online transaction response times?", options: ["Monitor I", "Monitor II", "Monitor III", "Monitor IV"], answer: 2, explanation: "RMF Monitor III provides real-time data with sub-second granularity, used for online workload analysis." },
      { question: "What command opens a USS shell session from TSO?", options: ["CALL USS", "OMVS", "BPXBATCH SHELL", "USSSTART"], answer: 1, explanation: "The OMVS command starts an interactive UNIX System Services shell session from a TSO terminal." },
      { question: "In SDSF, how do you browse a job's SYSOUT?", options: ["Type B next to the job in ST, then S next to the SYSOUT DD", "Type X next to the job", "Use ISPF 2 with the job name", "Issue TSO BROWSE job.name"], answer: 0, explanation: "In SDSF ST, type S (or simply press Enter) on a job to see its DDs, then type B to browse a specific output DD." }
    ],
    practical: [
      { title: "Task 1  Monitor Active Jobs and Browse Output in SDSF", description: "Open SDSF, switch to the ST panel, locate a recently run job, drill into its output, and identify the return code.", hints: ["Hint 1: use prefix mask (e.g., prefix=youruserid) to filter.", "Hint 2: type S on the job then B on JESMSGLG to read the job log."], solution: "Expected steps. Replace with real content." },
      { title: "Task 2  Navigate USS from OMVS", description: "Start an OMVS session, navigate to /u/youruserid, create a file, display its contents, and list its attributes.", hints: ["Hint 1: type OMVS at the TSO READY prompt.", "Hint 2: use ls -la to list files with attributes; use cat to display content."], solution: "Expected commands and output. Replace with real content." }
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
      <p>Replace with content on what JCL is, why it exists, and its structure.</p>
      <h2>JOB Statement</h2>
      <p>Cover accounting, MSGCLASS, MSGLEVEL, CLASS, NOTIFY, and REGION parameters.</p>
      <h2>EXEC Statement</h2>
      <ul>
        <li><strong>PGM= (program name)</strong>  placeholder.</li>
        <li><strong>PROC= (catalogued procedure)</strong>  placeholder.</li>
        <li><strong>PARM= (program parameter)</strong>  placeholder.</li>
      </ul>
      <h2>DD Statement</h2>
      <p>Explain DSN, DISP, UNIT, SPACE, DCB, SYSOUT, and the special DD names (SYSIN, SYSPRINT, SYSUDUMP).</p>
      <h2>Return Codes & Conditional Logic</h2>
      <p>Cover RC values (0, 4, 8, 12, 16), the COND parameter, and IF/THEN/ELSE/ENDIF step conditioning.</p>
    `,
    mcq: [
      { question: "Which JCL statement must always appear first in a job stream?", options: ["//EXEC", "//DD", "//JOB", "//PROC"], answer: 2, explanation: "The JOB statement is the mandatory first statement in any JCL job  it identifies the job to JES." },
      { question: "What does DISP=(NEW,CATLG,DELETE) specify?", options: ["New dataset; catalog on success; delete on failure", "Existing dataset; catalog always; delete on failure", "New dataset; always keep; always delete on failure", "Existing dataset; delete on success; keep on failure"], answer: 0, explanation: "The three DISP subparameters define: initial status, normal-end disposition, and abnormal-end disposition." },
      { question: "What return code indicates a warning but not an error on most IBM utilities?", options: ["RC=0", "RC=4", "RC=8", "RC=12"], answer: 1, explanation: "RC=4 is typically a warning condition  the step completed but something was unusual. RC=0 is clean completion." },
      { question: "Which construct replaces the COND parameter with a more readable style?", options: ["PARM=COND", "IF/THEN/ELSE/ENDIF", "WHEN/THEN", "SWITCH/CASE"], answer: 1, explanation: "IF/THEN/ELSE/ENDIF was introduced to make conditional step execution more intuitive than the COND parameter." },
      { question: "What is the purpose of the SYSUDUMP DD statement?", options: ["Provide program input data", "Route the formatted storage dump if the program abends", "Define VSAM file access", "Specify the output print class"], answer: 1, explanation: "SYSUDUMP (or SYSABEND/SYSMDUMP) captures a formatted dump of user storage when a program terminates abnormally." }
    ],
    practical: [
      { title: "Task 1  Write and Submit a Three-Step JCL Job", description: "Create a job with three steps. Use IF/THEN/ELSE to skip step 3 if step 1 returns RC > 0. Submit and verify the correct steps ran.", hints: ["Hint 1: IF (STEP1.RC > 0) THEN ... ELSE ... ENDIF", "Hint 2: check SDSF to see which steps executed and their RCs."], solution: "Expected JCL and SDSF output. Replace with real content." },
      { title: "Task 2  Interpret JCL Error Messages", description: "Introduce deliberate JCL errors (missing DD, bad DISP value) and practise reading the JES error messages to diagnose the problem.", hints: ["Hint 1: look for IEF and IGD messages in the job log.", "Hint 2: a JCL error typically prevents the job from executing at all."], solution: "Expected error messages and diagnosis. Replace with real content." }
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
      <h2>z/OSMF Overview</h2>
      <p>Replace with content on the z/OS Management Facility, browser UI, and key plugins.</p>
      <h2>z/OSMF Workflows</h2>
      <p>Explain how workflows define and automate multi-step administrative tasks.</p>
      <h2>Advanced Sysplex Architecture</h2>
      <ul>
        <li><strong>XCF (Cross-System Coupling Facility)</strong>  placeholder.</li>
        <li><strong>Coupling Facility (CF) structures</strong>  placeholder.</li>
        <li><strong>XES (Cross-System Extended Services)</strong>  placeholder.</li>
      </ul>
      <h2>Cross-Memory Services</h2>
      <p>Describe address space communication via SRBs, PC routines, and XMEM.</p>
    `,
    mcq: [
      { question: "What is z/OSMF primarily used for?", options: ["Real-time transaction processing", "Browser-based system management and workflow automation", "RACF user definition only", "VSAM cluster management"], answer: 1, explanation: "z/OSMF provides a browser UI for software deployment, configuration management, and operational workflows." },
      { question: "What does XCF provide in a sysplex?", options: ["Network routing", "Communication and status signalling between z/OS images in the sysplex", "Disk caching", "RACF synchronisation"], answer: 1, explanation: "XCF (Cross-System Coupling Facility services) lets address spaces on different z/OS images communicate and monitor each other." },
      { question: "What is the Coupling Facility used for?", options: ["Storing archived SMF records", "High-speed shared memory for sysplex lock, list, and cache structures", "Running CICS transactions", "TCP/IP connection sharing"], answer: 1, explanation: "The CF provides shared in-memory structures that sysplex members use for locking, caching, and coordination." },
      { question: "Which z/OSMF plugin automates SMP/E operations?", options: ["Cloud Provisioning", "Software Management", "Network Configuration", "Workflow Designer"], answer: 1, explanation: "The Software Management plugin automates SMP/E RECEIVE, APPLY, and ACCEPT operations from a browser UI." },
      { question: "What can a z/OSMF workflow step contain?", options: ["JCL only", "Instructions, automated JCL/REST actions, and approval gates", "RACF commands only", "USS shell scripts only"], answer: 1, explanation: "A workflow step can combine human instructions, automated tasks, owner assignments, and approval requirements." }
    ],
    practical: [
      { title: "Task 1  Access and Navigate z/OSMF", description: "Log in to z/OSMF, identify available task plugins, and create a simple workflow from a z/OSMF template.", hints: ["Hint 1: access z/OSMF at https://hostname:port/zosmf.", "Hint 2: locate the Workflows task in the left navigation."], solution: "Expected navigation steps. Replace with real content." },
      { title: "Task 2  Review Sysplex Status", description: "Use MVS D XCF,ALL commands and z/OSMF System Status to review active sysplex members and CF structure status.", hints: ["Hint 1: D XCF,ALL from the operator console via SDSF LOG.", "Hint 2: z/OSMF System Status dashboard provides a visual view."], solution: "Expected commands and interpretation. Replace with real content." }
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
      <h2>Hardware Configuration Definition (HCD)</h2>
      <p>Replace with content on the HCD ISPF dialog for defining I/O configurations.</p>
      <h2>IODF Lifecycle</h2>
      <ul>
        <li><strong>Work IODF</strong>  edited in HCD; not yet active.</li>
        <li><strong>Production IODF</strong>  built from Work IODF; activated on the system.</li>
        <li><strong>EDTs and subchannel sets</strong>  placeholder.</li>
      </ul>
      <h2>Dynamic I/O Changes</h2>
      <p>How to add, delete, or vary channel paths and devices without an IPL.</p>
      <h2>FICON & Advanced Connectivity</h2>
      <p>Cover FICON channel connectivity, PPRC (Peer-to-Peer Remote Copy), and director switch zoning.</p>
    `,
    mcq: [
      { question: "What does HCD stand for?", options: ["Hardware Channel Definition", "Hardware Configuration Definition", "High-Capacity Device", "Host Channel Directory"], answer: 1, explanation: "HCD (Hardware Configuration Definition) is the ISPF-based tool for defining z/OS I/O configurations." },
      { question: "What is an IODF?", options: ["A JES spool I/O file", "The I/O Definition File describing the hardware configuration", "An ISPF device list", "A RACF I/O class"], answer: 1, explanation: "The IODF stores the complete hardware I/O configuration used by both z/OS and the HMC." },
      { question: "What is the difference between a Work IODF and a Production IODF?", options: ["Name only", "Work IODF is edited in HCD; Production IODF is built and activated", "Work IODFs are larger", "Production IODFs cannot be read"], answer: 1, explanation: "You make changes in a Work IODF, then build it into a Production IODF for activation." },
      { question: "What is FICON?", options: ["A file format", "Fibre Channel I/O connecting IBM Z servers to storage subsystems", "A CICS component", "A RACF feature"], answer: 1, explanation: "FICON (Fibre Connection) is the high-speed I/O protocol used to connect IBM Z to SAN storage." },
      { question: "What does a dynamic I/O change allow without an IPL?", options: ["Change LPAR CPU weights", "Add, delete, or vary channel paths and logical devices while the system runs", "Resize DASD volumes", "Change RACF profiles"], answer: 1, explanation: "Dynamic I/O changes reconfigure channels and devices online, avoiding the need to take the system down." }
    ],
    practical: [
      { title: "Task 1  Browse an IODF with HCD", description: "Open HCD from ISPF, load an existing Work IODF, and browse defined channel paths and devices.", hints: ["Hint 1: access HCD from ISPF option 6 or the direct HCD panel.", "Hint 2: use the CHPID view to inspect channel paths."], solution: "Expected navigation steps. Replace with real content." },
      { title: "Task 2  Perform a Dynamic I/O Change", description: "Under supervision, add a logical device definition to a Work IODF and activate it via a dynamic I/O change.", hints: ["Hint 1: define the device in HCD and build a new Production IODF.", "Hint 2: use the Activate function to apply the change dynamically."], solution: "Expected procedure. Replace with real content." }
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
      <h2>DFSMS Architecture</h2>
      <p>Replace with content on the Data Facility Storage Management Subsystem and its goal of automating storage decisions.</p>
      <h2>SMS Constructs</h2>
      <ul>
        <li><strong>Storage class</strong>  performance and availability attributes (response time, availability).</li>
        <li><strong>Data class</strong>  dataset allocation defaults (RECFM, LRECL, SPACE).</li>
        <li><strong>Management class</strong>  backup, migration, and retention policies.</li>
        <li><strong>Storage group</strong>  pools of DASD volumes meeting a performance tier.</li>
      </ul>
      <h2>ACS Routines</h2>
      <p>Explain the Automatic Class Selection routine language: FILTLIST, WHEN, SET, and testing with the ACS test utility.</p>
      <h2>Managing SMS with ISMF</h2>
      <p>Cover the Interactive Storage Management Facility panels for defining and activating SMS constructs.</p>
    `,
    mcq: [
      { question: "What does ACS stand for in DFSMS?", options: ["Automatic Class Selection", "Access Control System", "Archive and Copy Service", "Allocated Class Structure"], answer: 0, explanation: "ACS routines automatically assign SMS classes to datasets at allocation time based on dataset name or requesting user." },
      { question: "Which SMS construct defines backup frequency and retention policy?", options: ["Storage class", "Data class", "Management class", "Storage group"], answer: 2, explanation: "Management class governs backup frequency, retention periods, and migration thresholds for each dataset." },
      { question: "What is an SMS storage group?", options: ["A RACF group for storage administrators", "A named pool of DASD volumes used to satisfy storage class requests", "A Db2 tablespace group", "A JES class assignment"], answer: 1, explanation: "A storage group is a labelled collection of DASD volumes from which SMS allocates space to satisfy a storage class requirement." },
      { question: "Which ISMF option is used to define a new storage class?", options: ["ISMF option 1 (Data Class)", "ISMF option 2 (Storage Class)", "ISMF option 3 (Management Class)", "ISMF option 5 (Storage Group)"], answer: 1, explanation: "ISMF option 2 provides panels to create, edit, and delete storage classes." },
      { question: "In an ACS routine, what does FILTLIST do?", options: ["Applies a filter to SMF records", "Defines a named list of string patterns used in WHEN conditions", "Lists active storage groups", "Filters RACF audit events"], answer: 1, explanation: "FILTLIST creates a named pattern list that can be tested in WHEN statements for efficient multi-value matching." }
    ],
    practical: [
      { title: "Task 1  Define a Storage Class Using ISMF", description: "Use ISMF option 2 to define a new storage class with specific availability and response-time requirements.", hints: ["Hint 1: reach ISMF from ISPF option 6 or the ISMF primary menu.", "Hint 2: set Guaranteed Space=YES and Availability=CONTINUOUS if required."], solution: "Expected steps and settings. Replace with real content." },
      { title: "Task 2  Write and Test an ACS Routine", description: "Write a storage class ACS routine that assigns a specific storage class to datasets whose HLQ matches a defined pattern. Test it before activating.", hints: ["Hint 1: use WHEN (&DSN = 'PROD.**') THEN SET &STORCLAS = 'PRODSTC'.", "Hint 2: use the ACS test utility to validate without activating."], solution: "Expected ACS code and test output. Replace with real content." }
    ]
  },

  {
    id: "l2-hsm-dss",
    level: 2,
    category: "Storage & Data Management",
    title: "DFSMShsm & DFSMSdss",
    summary: "DFSMShsm space management, migration levels, backup and recall operations; DFSMSdss DUMP, RESTORE, and COPY for volume-level backup and dataset copying.",
    content: `
      <h2>DFSMShsm Overview</h2>
      <p>Replace with content on Hierarchical Storage Manager: space management, migration, backup, and recall.</p>
      <h2>Migration Levels</h2>
      <ul>
        <li><strong>ML1 (Migration Level 1)</strong>  fast DASD; recently migrated datasets.</li>
        <li><strong>ML2 (Migration Level 2)</strong>  tape or cheaper DASD; older migrated datasets.</li>
        <li><strong>Recall</strong>  automatic on access, or manual HRECALL command.</li>
      </ul>
      <h2>DFSMShsm Backup</h2>
      <p>Daily and spill backup, version limits, dump class assignment, and recovery with HRECOVER.</p>
      <h2>DFSMSdss</h2>
      <p>DUMP (dataset or volume backup), RESTORE (recovery), COPY (cloning), and compression for efficient backup storage.</p>
    `,
    mcq: [
      { question: "What initiates DFSMShsm automatic migration of a dataset?", options: ["The user explicitly running HMIGRATE", "The dataset reaching its migration threshold (days since last referenced) defined in the management class", "An operator command", "A RACF audit event"], answer: 1, explanation: "DFSMShsm compares each dataset's last-reference date against its management class migration threshold and migrates inactive datasets automatically." },
      { question: "What happens when a user accesses a DFSMShsm-migrated dataset?", options: ["I/O fails with an error", "DFSMShsm automatically recalls the dataset to a primary volume before the access completes", "The user must run HRECALL first always", "The dataset is permanently lost"], answer: 1, explanation: "DFSMShsm intercepts the open request, recalls the dataset from ML1 or ML2 to a primary DASD volume, and then allows normal access." },
      { question: "What does DFSMSdss DUMP produce?", options: ["An SMF record", "A compressed image backup of datasets or an entire volume", "A RACF audit trail", "An IODF export"], answer: 1, explanation: "DFSMSdss DUMP creates compressed backup copies of one or more datasets, or an entire storage volume." },
      { question: "What is the difference between DFSMShsm backup and DFSMSdss dump?", options: ["None  they are the same", "DFSMShsm manages versioned daily backups per dataset; DFSMSdss takes point-in-time volume or dataset images", "DFSMSdss can only backup VSAM datasets", "DFSMShsm can only backup to tape"], answer: 1, explanation: "DFSMShsm manages automated versioned backup per dataset lifecycle policy; DFSMSdss is used for image-level or ad-hoc bulk backup/copy." },
      { question: "What command manually recalls a specific migrated dataset?", options: ["HBACKDS", "HRECOVER", "HRECALL", "HMIGRATE"], answer: 2, explanation: "HRECALL explicitly recalls a migrated dataset from ML1 or ML2 back to a primary DASD volume." }
    ],
    practical: [
      { title: "Task 1  Manually Migrate and Recall a Dataset", description: "Use DFSMShsm HMIGRATE to migrate a test dataset, verify its migrated status, then use HRECALL to bring it back.", hints: ["Hint 1: HMIGRATE 'your.test.dataset'", "Hint 2: LISTCAT shows MIGRATED volumes; HRECALL 'your.test.dataset' recalls it."], solution: "Expected commands and status verification. Replace with real content." },
      { title: "Task 2  Run a DFSMSdss DUMP and Restore", description: "Write JCL to execute a DFSMSdss DUMP of several datasets to a dump dataset, then RESTORE one of them to verify the backup.", hints: ["Hint 1: use DUMP DATASET(INCLUDE(...)) OUTDD(DUMPOUT) COMPRESS.", "Hint 2: RESTORE DATASET(INCLUDE(...)) INDD(DUMPOUT) REPLACE."], solution: "Expected JCL and output. Replace with real content." }
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
      <h2>zFS vs HFS</h2>
      <p>Replace with content comparing zFS (recommended) and HFS, including performance and availability differences.</p>
      <h2>Creating and Mounting zFS</h2>
      <ul>
        <li><strong>Defining a linear VSAM dataset for zFS</strong>  placeholder.</li>
        <li><strong>ZFS FORMAT command</strong>  placeholder.</li>
        <li><strong>MOUNT in BPXPRMxx or operator MOUNT command</strong>  placeholder.</li>
      </ul>
      <h2>USS Security</h2>
      <p>Cover UID/GID assignments in RACF, file permission bits (rwx), setuid, and USS RACF profile protection.</p>
      <h2>USS Started Tasks</h2>
      <p>Describe how z/OS started tasks can operate in USS: spawned processes, USS environments in JCL, and USS signals.</p>
    `,
    mcq: [
      { question: "What filesystem type is recommended for USS on modern z/OS?", options: ["HFS", "zFS", "NFS", "NTFS"], answer: 1, explanation: "zFS (z/OS File System) is the modern recommended filesystem, offering better performance than the older HFS." },
      { question: "What dataset organisation underlies a zFS filesystem?", options: ["Sequential PS dataset", "Linear VSAM dataset (LDS)", "PDS/PDSE member", "ESDS VSAM cluster"], answer: 1, explanation: "zFS is built on a VSAM LDS (Linear Dataset), which provides a flat byte-addressable container for the filesystem." },
      { question: "In USS, what do the nine rwxrwxrwx permission bits represent?", options: ["Read/write/execute for owner, group, and others respectively", "Random/write/exec modes", "Read permissions only for three security levels", "RACF READ/UPDATE/CONTROL access levels"], answer: 0, explanation: "The nine bits are three triplets of read (r), write (w), and execute (x) for the file owner, the owning group, and all other users." },
      { question: "Which BPXPRMxx statement permanently mounts a zFS filesystem at IPL?", options: ["FILESYSTYPE TYPE(ZFS)", "MOUNT FILESYSTEM(...) MOUNTPOINT(...) TYPE(ZFS)", "ATTACH ZFS ...", "OMVS MOUNT ..."], answer: 1, explanation: "The MOUNT statement in BPXPRMxx causes z/OS to mount the specified zFS filesystem automatically when USS initialises." },
      { question: "What RACF database field maps a z/OS user ID to a USS UID?", options: ["PASSWORD field", "UID field in the OMVS segment of the user profile", "SPECIAL attribute", "GRPUID in the group profile"], answer: 1, explanation: "The OMVS segment of a RACF user profile contains the UID (numeric Unix UID) required for USS access." }
    ],
    practical: [
      { title: "Task 1  Create and Mount a zFS Filesystem", description: "Define a linear VSAM dataset, format it as zFS, mount it at a USS path, and navigate into it from OMVS.", hints: ["Hint 1: DEFINE CLUSTER (NAME(your.zfs.ds) LINEAR TRACKS(100 50)) DATA (NAME(your.zfs.ds.data))", "Hint 2: ZFS -format -aggregate your.zfs.ds then MOUNT FILESYSTEM(your.zfs.ds) PATH('/yourpath') TYPE(ZFS)"], solution: "Expected commands and steps. Replace with real content." },
      { title: "Task 2  Set and Verify USS File Permissions", description: "Create a file in USS, display its current permissions with ls -la, change them with chmod, and verify the RACF OMVS segment for your user ID.", hints: ["Hint 1: chmod 750 filename sets rwxr-x--- permissions.", "Hint 2: LISTUSER yourid OMVS shows the UID and GID assigned."], solution: "Expected commands and output. Replace with real content." }
    ]
  },

  {
    id: "l2-wlm-mon",
    level: 2,
    category: "System Operations & Tools",
    title: "WLM & Automated Operations Monitoring",
    summary: "Workload Manager (WLM) service definitions, service classes, performance goals, and importance weights; plus automated operations monitoring with NetView/SA z/OS and health thresholds.",
    content: `
      <h2>Workload Manager (WLM)</h2>
      <p>Replace with content on WLM's role in resource management and meeting business service goals.</p>
      <h2>WLM Service Definition</h2>
      <ul>
        <li><strong>Workload and service class hierarchy</strong>  placeholder.</li>
        <li><strong>Performance goals (response time, velocity)</strong>  placeholder.</li>
        <li><strong>Importance weights (15)</strong>  placeholder.</li>
        <li><strong>Classification rules</strong>  placeholder.</li>
      </ul>
      <h2>Installing and Activating a Service Definition</h2>
      <p>Explain exporting, modifying, and activating a WLM service definition via ISPF or z/OSMF.</p>
      <h2>Automated Operations Monitoring</h2>
      <p>Introduce NetView and SA z/OS for event-driven automation: message automation rules, WTOR auto-reply, and system health thresholds.</p>
    `,
    mcq: [
      { question: "What is a WLM service class?", options: ["A RACF class for resource protection", "A named workload classification bucket with assigned performance goals", "A CICS resource definition", "A DFSMS storage class"], answer: 1, explanation: "A WLM service class groups workloads with similar performance requirements and assigns goals such as response time or throughput targets." },
      { question: "In WLM, what does 'importance' control?", options: ["The priority of a RACF group", "How aggressively WLM fights for resources on behalf of a service class when the system is constrained", "The DASD allocation priority", "The TCP/IP packet priority"], answer: 1, explanation: "Importance (1=highest, 5=lowest) tells WLM which service classes to favour when resources are insufficient to meet all goals simultaneously." },
      { question: "Which WLM goal type is best suited for online transaction workloads?", options: ["Velocity", "Discretionary", "Response time (average or percentile)", "FIFO"], answer: 2, explanation: "Response time goals (e.g., 90% of transactions complete within 0.5 seconds) are typical for online workloads with user-facing latency requirements." },
      { question: "What does WTOR stand for?", options: ["Write To Operator Reply", "Workload Task Override Request", "WLM Tuning Override Rule", "Write To Output Record"], answer: 0, explanation: "WTOR (Write To Operator with Reply) is a system message that pauses a task until an operator provides a reply." },
      { question: "What is SA z/OS (System Automation)?", options: ["A RACF security add-on", "An IBM policy-based automation product that monitors and automatically responds to system events", "A WLM plugin", "A z/OSMF workflow"], answer: 1, explanation: "SA z/OS automates operator tasks by monitoring system messages and thresholds, triggering predefined responses (start, stop, reply) automatically." }
    ],
    practical: [
      { title: "Task 1  Review the Active WLM Service Definition", description: "Use WLM ISPF panels to display the currently installed service definition, identify service classes, and note the performance goals for a batch and an online workload.", hints: ["Hint 1: access WLM from ISPF option 6 or =WLM in some environments.", "Hint 2: look for CICS or IMS workloads and their response time goals."], solution: "Expected observations. Replace with real content." },
      { title: "Task 2  Create a Message Automation Rule Concept", description: "Design (on paper or in NetView test mode) an automation rule that auto-replies to a specific WTOR message, preventing manual operator intervention.", hints: ["Hint 1: identify the WTOR message ID from the system log (e.g., IEF234I).", "Hint 2: the NetView AUTOMATE TABLE command associates a message with an auto-reply action."], solution: "Expected rule description and logic. Replace with real content." }
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
