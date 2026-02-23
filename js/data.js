/**
 * ============================================================
 *  z/OS COMPETENCY FRAMEWORK  DATA FILE
 * ============================================================
 *  Each entry in the `topics` array represents one topic.
 *
 *  Fields:
 *    id          unique string, used in URL hash (no spaces)
 *    level       1 or 2
 *    category    grouping label shown on the home page
 *    title       topic title
 *    summary     short description shown on the topic card
 *    content     HTML string for the "Overview" tab
 *    mcq         array of 5 multiple-choice questions
 *    practical   array of 23 practical tasks
 *
 *  MCQ structure:
 *    { question, options: ['A','B','C','D'], answer: <0-based index>, explanation }
 *
 *  Practical structure:
 *    { title, description, hints: [''], solution }
 * ============================================================
 */

const topics = [

  // 
  //  LEVEL 1    8 Competency Areas
  // 

  //  1. Platform Fundamentals 
  {
    id: "l1-fundamentals",
    level: 1,
    category: "Platform Fundamentals",
    title: "z/OS Core Architecture",
    summary: "z/OS architecture, address spaces, virtual storage, virtual memory, the IPL procedure, I/O architecture, JES & spooling, and the sysplex concept.",
    content: `
      <h2>What is z/OS?</h2>
      <p>Replace with content about z/OS origins, purpose, and role in enterprise computing.</p>
      <h2>Address Spaces & Virtual Storage</h2>
      <p>Cover address space structure, virtual storage model, and memory management concepts.</p>
      <h2>IPL Procedure</h2>
      <ul>
        <li><strong>IPL sequence</strong>  placeholder description.</li>
        <li><strong>PARMLIB</strong>  placeholder description.</li>
        <li><strong>NIP/IEASYSxx</strong>  placeholder description.</li>
      </ul>
      <h2>JES & Spooling</h2>
      <p>Explain how JES manages job execution and spool datasets.</p>
      <h2>Sysplex Concept</h2>
      <p>Introduce the sysplex as a cluster of z/OS systems sharing resources.</p>
    `,
    mcq: [
      { question: "Which component is responsible for managing job execution queues on z/OS?", options: ["MVS", "JES2/JES3", "VTAM", "RACF"], answer: 1, explanation: "JES (Job Entry Subsystem) manages job input, execution queues, and output spooling." },
      { question: "What is an address space on z/OS?", options: ["A physical memory slot", "A virtual memory region assigned to a task", "A disk volume", "A network interface"], answer: 1, explanation: "Each task on z/OS runs in its own virtual address space, providing isolation and protection." },
      { question: "What is the primary purpose of the IPL procedure?", options: ["Start network services", "Initialize and load the z/OS operating system", "Allocate disk volumes", "Start RACF"], answer: 1, explanation: "IPL (Initial Program Load) bootstraps z/OS from a designated volume." },
      { question: "What does the term 'sysplex' refer to?", options: ["A single z/OS image", "A cluster of z/OS systems that share workload and resources", "The JES spool area", "A storage subsystem"], answer: 1, explanation: "A sysplex allows multiple z/OS images to cooperate as a single system for availability and scalability." },
      { question: "Which PARMLIB member controls system initialization parameters?", options: ["SMFPRMxx", "IEASYSxx", "SCHEDxx", "BPXPRMxx"], answer: 1, explanation: "IEASYSxx contains the primary system initialization parameters read during IPL." }
    ],
    practical: [
      { title: "Task 1  Identify Active Address Spaces", description: "Use the MVS DISPLAY command or SDSF to list currently active address spaces and identify key system tasks.", hints: ["Hint 1: use 'D A,L' from the system console or SDSF DA panel.", "Hint 2: look for JES2, TCPIP, RACF in the list."], solution: "Expected output and interpretation. Replace with real content." },
      { title: "Task 2  Review IPL Parameters", description: "Locate and review the active IEASYSxx PARMLIB member to understand current IPL settings.", hints: ["Hint 1: use ISPF 3.4 to find SYS1.PARMLIB.", "Hint 2: browse the IEASYSxx member in effect."], solution: "Expected findings. Replace with real content." }
    ]
  },

  //  2. Hardware & Virtualization 
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
        <li><strong>HMC role</strong>  placeholder description.</li>
        <li><strong>SE (Support Element)</strong>  placeholder description.</li>
        <li><strong>Object tree</strong>  placeholder description.</li>
      </ul>
      <h2>Channels & I/O Architecture</h2>
      <p>Describe channel subsystems, CHPID types, and how I/O paths are defined.</p>
    `,
    mcq: [
      { question: "What does LPAR stand for?", options: ["Logical Partition", "Linear Partition", "Loaded Program Area", "Local Processing Area"], answer: 0, explanation: "LPAR stands for Logical Partition  a hardware-enforced division of a CPC." },
      { question: "Which tool is used to manage CPC and LPAR hardware from an operator console?", options: ["ISPF", "SDSF", "HMC", "JES2"], answer: 2, explanation: "The Hardware Management Console (HMC) is the primary interface for managing IBM Z hardware." },
      { question: "What is a CHPID?", options: ["A channel path identifier", "A CPU identifier", "A CICS transaction ID", "A RACF group name"], answer: 0, explanation: "CHPID (Channel Path Identifier) identifies a physical or logical I/O path between the CPC and I/O devices." },
      { question: "Which LPAR resource can be defined as 'dedicated' or 'shared'?", options: ["Memory only", "CPU and memory", "RACF profiles", "IP addresses"], answer: 1, explanation: "CPU engines and memory can both be dedicated to a single LPAR or shared across partitions." },
      { question: "What is the purpose of the Support Element (SE)?", options: ["Manage network routing", "Provide direct hardware management for a single CPC", "Run batch jobs", "Configure RACF"], answer: 1, explanation: "The SE is an embedded service controller for a single CPC; the HMC aggregates multiple SEs." }
    ],
    practical: [
      { title: "Task 1  Explore HMC Object Tree", description: "Log in to the HMC and navigate the object tree to identify available CPCs and their LPARs.", hints: ["Hint 1: start at the Systems Management view.", "Hint 2: expand a CPC node to see its partitions."], solution: "Expected observations. Replace with real content." },
      { title: "Task 2  Review LPAR CPU and Memory Settings", description: "Inspect the CPU weight and memory ceiling assigned to a given LPAR via the HMC.", hints: ["Hint 1: select the partition and view its Properties.", "Hint 2: note the minimum/maximum CPU weights."], solution: "Expected findings. Replace with real content." }
    ]
  },

  //  3. Storage & Data Management 
  {
    id: "l1-storage",
    level: 1,
    category: "Storage & Data Management",
    title: "Datasets, DASD & Catalogs",
    summary: "DASD fundamentals, dataset types (sequential, PDS/PDSE, VSAM, GDG), ICF catalogs, VTOC structure, and tape and RMM basics.",
    content: `
      <h2>DASD Fundamentals</h2>
      <p>Replace with content about Direct Access Storage Devices, volumes, and extents.</p>
      <h2>Dataset Types</h2>
      <ul>
        <li><strong>Sequential (PS)</strong>  placeholder description.</li>
        <li><strong>Partitioned (PDS/PDSE)</strong>  placeholder description.</li>
        <li><strong>VSAM</strong>  KSDS, ESDS, RRDS placeholder.</li>
        <li><strong>GDG</strong>  Generation Data Groups placeholder.</li>
      </ul>
      <h2>ICF Catalog & VTOC</h2>
      <p>Explain the catalog hierarchy and the relationship to the VTOC on each volume.</p>
      <h2>Tapes & RMM</h2>
      <p>Cover tape media management with DFSMS Removable Media Manager (RMM).</p>
    `,
    mcq: [
      { question: "What is the maximum number of extents for a standard sequential dataset?", options: ["3", "16", "255", "unlimited"], answer: 1, explanation: "A standard sequential dataset can have up to 16 extents across volumes." },
      { question: "Which dataset organization supports named members?", options: ["PS", "PDS", "VSAM ESDS", "GDG"], answer: 1, explanation: "Partitioned Datasets (PDS/PDSE) contain individually-named members within a single dataset." },
      { question: "What utility is used to define and manage VSAM datasets?", options: ["IEFBR14", "IDCAMS", "IEBGENER", "IEBCOPY"], answer: 1, explanation: "IDCAMS (Access Method Services) defines, deletes, lists, and alters VSAM datasets." },
      { question: "What does the ICF catalog record?", options: ["Job execution history", "Dataset location and attributes", "RACF user profiles", "TCP/IP routes"], answer: 1, explanation: "The ICF (Integrated Catalog Facility) catalog records the name, volume, and attributes of every catalogued dataset." },
      { question: "What is a GDG base?", options: ["A VSAM cluster", "A catalog entry that groups versioned datasets", "A DASD volume group", "An SMS storage class"], answer: 1, explanation: "A GDG base is a catalog entry that manages a set of sequentially numbered generations of a dataset." }
    ],
    practical: [
      { title: "Task 1  Allocate and Catalog a PDS", description: "Use ISPF 3.2 or JCL to allocate a new PDS, create a member, and verify it is catalogued.", hints: ["Hint 1: use ISPF option 3.2 (Dataset Utility).", "Hint 2: verify with ISPF 3.4 that the dataset appears."], solution: "Expected steps and output. Replace with real content." },
      { title: "Task 2  Define a VSAM KSDS with IDCAMS", description: "Write IDCAMS control statements to define a VSAM key-sequenced dataset and verify the definition.", hints: ["Hint 1: use DEFINE CLUSTER with KEYS parameter.", "Hint 2: verify with LISTCAT."], solution: "Expected control statements and output. Replace with real content." }
    ]
  },

  //  4. System Operations & Tools 
  {
    id: "l1-operations",
    level: 1,
    category: "System Operations & Tools",
    title: "TSO, ISPF, SDSF & Monitoring Tools",
    summary: "TSO basics, ISPF navigation, SDSF job monitoring, USS shell introduction, JES2/JES3 awareness, SMF record types, and RMF reporting.",
    content: `
      <h2>TSO Overview</h2>
      <p>Replace with content on Time-Sharing Option and how to log in and run commands.</p>
      <h2>ISPF Navigation</h2>
      <ul>
        <li><strong>Primary menu options</strong>  placeholder.</li>
        <li><strong>Function keys and stacking</strong>  placeholder.</li>
        <li><strong>ISPF Editor (option 2)</strong>  placeholder.</li>
        <li><strong>Utilities (option 3)</strong>  placeholder.</li>
      </ul>
      <h2>SDSF</h2>
      <p>Explain how SDSF panels (ST, DA, H, O) are used to manage jobs and output.</p>
      <h2>SMF & RMF</h2>
      <p>Introduce SMF record types and RMF Monitor I/II/III for performance data.</p>
      <h2>UNIX System Services (USS)</h2>
      <p>Cover basic USS navigation, shell commands, and mount points.</p>
    `,
    mcq: [
      { question: "Which ISPF option is used for dataset utilities (copy, rename, delete)?", options: ["Option 1", "Option 2", "Option 3", "Option 6"], answer: 2, explanation: "ISPF option 3 is the Utilities menu, which contains dataset management functions under 3.13.4 etc." },
      { question: "Which SDSF panel shows jobs currently in execution?", options: ["H (Held output)", "ST (Status)", "DA (Active users)", "O (Output)"], answer: 2, explanation: "SDSF DA shows active users and tasks; ST shows job status across all queues." },
      { question: "What does SMF stand for?", options: ["System Monitoring Facility", "System Management Facilities", "Subsystem Management File", "Storage Management Function"], answer: 1, explanation: "SMF (System Management Facilities) records system activity data in numbered record types." },
      { question: "How do you invoke a USS shell session from TSO?", options: ["CALL BPXBATCH", "OMVS or ISHELL", "RACF EXEC", "IDCAMS RUN"], answer: 1, explanation: "The OMVS command opens an interactive UNIX System Services shell from TSO." },
      { question: "What key typically triggers ISPF help on a panel?", options: ["F1", "F3", "F7", "F12"], answer: 0, explanation: "F1 is the standard ISPF Help key across all panels." }
    ],
    practical: [
      { title: "Task 1  Navigate ISPF and Allocate a Dataset", description: "Log on to TSO, enter ISPF, and use option 3.2 to allocate a new sequential dataset with RECFM=FB, LRECL=80.", hints: ["Hint 1: from the ISPF primary menu type 3 then 2.", "Hint 2: fill in all required allocation fields."], solution: "Expected navigation steps and dataset allocation. Replace with real content." },
      { title: "Task 2  Monitor a Job in SDSF", description: "Submit a simple JCL job, then locate it in SDSF ST panel, view the job log, and interpret the return code.", hints: ["Hint 1: prefix your SDSF filter with your user ID.", "Hint 2: type S next to a job to drill into its output."], solution: "Expected steps and output interpretation. Replace with real content." }
    ]
  },

  //  5. Batch Processing & JCL 
  {
    id: "l1-batch",
    level: 1,
    category: "Batch Processing & JCL",
    title: "JCL Fundamentals & Batch Utilities",
    summary: "JOB, EXEC, and DD statements; COND and IF/THEN/ELSE logic; PROC concepts; return codes; and key utilities: IEBGENER, IEBCOPY, IEFBR14, SORT, IDCAMS.",
    content: `
      <h2>JCL Overview</h2>
      <p>Replace with content on Job Control Language and its role in batch processing.</p>
      <h2>Core Statements</h2>
      <ul>
        <li><strong>JOB</strong>  identifies the job and sets class/priority.</li>
        <li><strong>EXEC</strong>  names the program or procedure to execute.</li>
        <li><strong>DD</strong>  defines datasets for I/O.</li>
      </ul>
      <h2>Conditional Processing</h2>
      <p>Explain COND parameter and IF/THEN/ELSE/ENDIF constructs for step control.</p>
      <h2>Procedures (PROCs)</h2>
      <p>Describe in-stream vs catalogued procedures and symbolic parameter override.</p>
      <h2>Common Utilities</h2>
      <p>Cover IEBGENER (copy), IEBCOPY (PDS merge), SORT, IEFBR14, and IDCAMS.</p>
    `,
    mcq: [
      { question: "Which JCL statement identifies the start of a job?", options: ["//EXEC", "//DD", "//JOB", "//PROC"], answer: 2, explanation: "The JOB statement is always first and identifies the job to JES with accounting and class information." },
      { question: "What does a return code of 0 signify?", options: ["Job abended", "Successful completion with no errors", "Conditional step was skipped", "COND test was true"], answer: 1, explanation: "RC=0 means the step completed successfully without warnings or errors." },
      { question: "Which utility copies sequential datasets or creates a backup copy?", options: ["IEFBR14", "IEBGENER", "IDCAMS", "SORT"], answer: 1, explanation: "IEBGENER copies or reformats sequential datasets." },
      { question: "What is the purpose of IEFBR14?", options: ["It reformats datasets", "It is a do-nothing program used to allocate/delete datasets via JCL", "It generates VSAM reports", "It sorts datasets"], answer: 1, explanation: "IEFBR14 is a minimal program; it does nothing itself  it is used purely to execute DD statements for allocation or deletion." },
      { question: "In a PROC, what is a symbolic parameter?", options: ["A hardcoded dataset name", "A variable replaced at EXEC time with a value passed by the caller", "An absolute address", "A RACF variable"], answer: 1, explanation: "Symbolic parameters (prefixed with &) in a PROC are substituted with values provided by the calling EXEC statement." }
    ],
    practical: [
      { title: "Task 1  Submit a Multi-Step JCL Job", description: "Write a job with two steps: step 1 uses IEFBR14 to allocate a new dataset; step 2 uses IEBGENER to copy data into it. Use IF/THEN/ELSE to skip step 2 if step 1 fails.", hints: ["Hint 1: use //DD DSN=...,DISP=(NEW,CATLG,DELETE) in step 1.", "Hint 2: use IF (step1.RC = 0) THEN construct."], solution: "Expected JCL and output. Replace with real content." },
      { title: "Task 2  Sort a Dataset Using the SORT Utility", description: "Use DFSORT/SYNCSORT to sort a sequential dataset by a defined key field and write the sorted output to a new dataset.", hints: ["Hint 1: use SORT FIELDS=(pos,len,CH,A) in the SYSIN DD.", "Hint 2: define both SORTIN and SORTOUT DD statements."], solution: "Expected JCL and SORT control statements. Replace with real content." }
    ]
  },

  //  6. Automation & Scripting 
  {
    id: "l1-automation",
    level: 1,
    category: "Automation & Scripting",
    title: "REXX Basics & Scheduling Concepts",
    summary: "REXX language fundamentals, basic automation concepts on z/OS, and an introduction to job scheduling principles.",
    content: `
      <h2>Introduction to REXX</h2>
      <p>Replace with content on REXX's origins, strengths, and use cases on z/OS.</p>
      <h2>REXX Language Basics</h2>
      <ul>
        <li><strong>Variables and expressions</strong>  placeholder.</li>
        <li><strong>Control flow (IF, DO, SELECT)</strong>  placeholder.</li>
        <li><strong>Built-in functions</strong>  placeholder.</li>
        <li><strong>ISPF services (ISPEXEC)</strong>  placeholder.</li>
      </ul>
      <h2>Automation Concepts</h2>
      <p>Introduce system automation concepts: automated operator responses, WTOR handling, and message suppression.</p>
      <h2>Scheduling Concepts</h2>
      <p>Cover basic job scheduling principles: time triggers, dependencies, calendars, and workload automation products.</p>
    `,
    mcq: [
      { question: "Which delimiter marks a REXX comment?", options: ["/* ... */", "// comment", "# comment", "REM ..."], answer: 0, explanation: "REXX uses /* ... */ for comments, similar to C." },
      { question: "Which REXX function extracts a substring?", options: ["SUBSTR()", "MID()", "SLICE()", "CUT()"], answer: 0, explanation: "SUBSTR(string, start, length) extracts a portion of a string in REXX." },
      { question: "What TSO command is used to execute a REXX exec stored in a PDS?", options: ["CALL", "EXEC", "RUN", "EXECUTE"], answer: 1, explanation: "The EXEC command (or just the exec name from a SYSUEXEC/SYSEXEC dataset) executes a REXX program." },
      { question: "What does the REXX PARSE statement do?", options: ["Runs a program", "Splits a string into named variables based on a template", "Calls a subroutine", "Converts a number to hex"], answer: 1, explanation: "PARSE separates a string into parts assigned to named variables using a parsing template." },
      { question: "In job scheduling, what is a 'predecessor dependency'?", options: ["A job that runs first with no conditions", "A requirement that a specified job completes before another can start", "A calendar exception", "A REXX error trap"], answer: 1, explanation: "A predecessor dependency ensures job B does not start until job A has completed (optionally with a specific return code)." }
    ],
    practical: [
      { title: "Task 1  Write a REXX Exec to Display System Info", description: "Create a REXX exec that uses the ADDRESS TSO or OUTTRAP to retrieve and display the current date, time, and TSO user ID.", hints: ["Hint 1: use the DATE() and TIME() built-in functions.", "Hint 2: SYSTSUID gives the current user ID."], solution: "Expected REXX code and output. Replace with real content." },
      { title: "Task 2  Automate a Repetitive ISPF Task with REXX", description: "Write a REXX exec that uses ISPEXEC panel services to automate a multi-step ISPF task (e.g., allocate a dataset and open it in edit).", hints: ["Hint 1: use ISPEXEC EDIT DATASET(...).", "Hint 2: check return codes from each ISPEXEC call."], solution: "Expected REXX exec. Replace with real content." }
    ]
  },

  //  7. Subsystems & Middleware 
  {
    id: "l1-subsystems",
    level: 1,
    category: "Subsystems & Middleware",
    title: "CICS, IMS, Db2 & IMS DB Overview",
    summary: "Introduction to mainframe middleware: CICS for online transactions, IMS for hierarchical database and message processing, and Db2 for relational data.",
    content: `
      <h2>CICS (Customer Information Control System)</h2>
      <p>Replace with content on CICS as a transaction processing system, regions, and basic administration.</p>
      <h2>IMS TM & IMS DB</h2>
      <p>Introduce IMS Transaction Manager and IMS Database, including hierarchical data structures.</p>
      <h2>Db2 for z/OS</h2>
      <ul>
        <li><strong>Db2 subsystem</strong>  placeholder.</li>
        <li><strong>Basic SQL on z/OS</strong>  placeholder.</li>
        <li><strong>SPUFI and DB2I</strong>  placeholder.</li>
      </ul>
      <h2>Subsystem Interdependencies</h2>
      <p>Explain how CICS, IMS, and Db2 interact with the underlying z/OS base and JES.</p>
    `,
    mcq: [
      { question: "What type of system is CICS primarily used for?", options: ["Batch processing", "Online transaction processing", "Database backup", "Network routing"], answer: 1, explanation: "CICS is an online transaction processing (OLTP) system that handles millions of short-lived user transactions." },
      { question: "What database model does IMS DB use?", options: ["Relational", "Hierarchical", "Graph", "Key-value"], answer: 1, explanation: "IMS DB is a hierarchical database management system, one of the earliest DBMS architectures." },
      { question: "Which Db2 facility allows ad-hoc SQL execution from ISPF?", options: ["DSNUTILS", "SPUFI", "DB2I option 6", "REXX DB2"], answer: 1, explanation: "SPUFI (SQL Processor Using File Input) allows users to run SQL statements from an ISPF panel." },
      { question: "What does a CICS 'region' represent?", options: ["A network segment", "An address space running CICS services", "A RACF group", "A physical LPAR"], answer: 1, explanation: "A CICS region is a z/OS address space hosting CICS and the transactions it serves." },
      { question: "What is an IMS DBD?", options: ["A Db2 definition", "A Database Descriptor defining an IMS database structure", "A CICS resource definition", "A JES job descriptor"], answer: 1, explanation: "A DBD (Database Descriptor) is the control block that describes the structure of an IMS hierarchical database." }
    ],
    practical: [
      { title: "Task 1  Locate and Inspect a CICS Region in SDSF", description: "Use SDSF to identify active CICS address spaces, then inspect their job logs for startup messages.", hints: ["Hint 1: CICS regions typically have names like CICSPROD or CICSTEST.", "Hint 2: look for DFH messages in the job log."], solution: "Expected findings. Replace with real content." },
      { title: "Task 2  Run an SQL Query Using SPUFI", description: "Use ISPF SPUFI to connect to a Db2 subsystem and execute a SELECT statement against a sample table.", hints: ["Hint 1: access SPUFI from the DB2I primary menu (ISPF option).", "Hint 2: enter SQL in the designated PDS member before executing."], solution: "Expected steps and output. Replace with real content." }
    ]
  },

  //  8. Networking & Security (L1) 
  {
    id: "l1-networking",
    level: 1,
    category: "Networking & Security",
    title: "FTP, TCP/IP & RACF Basics",
    summary: "FTP basics, TCP/IP stack introduction, VTAM awareness, and RACF fundamentals  protecting resources and managing user identities.",
    content: `
      <h2>TCP/IP on z/OS  Introduction</h2>
      <p>Replace with content on the z/OS TCP/IP started task, basic configuration, and connectivity verification.</p>
      <h2>FTP on z/OS</h2>
      <ul>
        <li><strong>FTP client and server</strong>  placeholder.</li>
        <li><strong>Dataset transfer parameters</strong>  placeholder.</li>
      </ul>
      <h2>VTAM Awareness</h2>
      <p>Introduce VTAM as the SNA network access method and its relationship to CICS and IMS.</p>
      <h2>RACF Fundamentals</h2>
      <p>Cover user profiles, group membership, dataset protection basics, and UACC.</p>
    `,
    mcq: [
      { question: "Which z/OS command verifies basic TCP/IP reachability to a host?", options: ["TRACERTE", "PING", "NETSTAT", "FTP"], answer: 1, explanation: "PING sends ICMP echo requests to verify that a remote host is reachable." },
      { question: "What RACF command defines a new user profile?", options: ["NEWUSER", "ADDUSER", "CREATEID", "DEFUSER"], answer: 1, explanation: "ADDUSER creates a new RACF user profile with specified attributes and optional group connection." },
      { question: "What is UACC in RACF?", options: ["Universal Access Control", "Universal Access Authority  the default access for users not on a resource's access list", "User Account Control Code", "Undefined Access Class"], answer: 1, explanation: "UACC (Universal Access Authority) sets the default access level granted to any authenticated user not explicitly listed in the profile's access list." },
      { question: "Which port does FTP use for its control connection?", options: ["23", "21", "80", "443"], answer: 1, explanation: "FTP control channel uses port 21; the data transfer uses port 20 (or negotiated passive ports)." },
      { question: "What does VTAM stand for?", options: ["Virtual Telecommunications Access Method", "VSAM Tape Archive Manager", "Virtual Terminal Access Module", "Volume Table Access Manager"], answer: 0, explanation: "VTAM (Virtual Telecommunications Access Method) is IBM's SNA networking component for z/OS." }
    ],
    practical: [
      { title: "Task 1  Test TCP/IP Connectivity with PING", description: "From a TSO session, use the PING command to verify connectivity to a known host, then use NETSTAT to display active connections.", hints: ["Hint 1: type 'PING hostname' at the TSO READY prompt or from OMVS.", "Hint 2: NETSTAT CONN shows active TCP connections."], solution: "Expected output and interpretation. Replace with real content." },
      { title: "Task 2  Create a RACF User and Verify Access", description: "Use ADDUSER to define a test user, connect them to a group, and verify their profile with LISTUSER.", hints: ["Hint 1: ADDUSER userid NAME('Test User') PASSWORD(temp01)", "Hint 2: use LISTUSER userid to confirm."], solution: "Expected commands and output. Replace with real content." }
    ]
  },


  // 
  //  LEVEL 2    8 Competency Areas
  // 

  //  1. Platform Fundamentals L2 
  {
    id: "l2-fundamentals",
    level: 2,
    category: "Platform Fundamentals",
    title: "z/OSMF & Advanced Architecture",
    summary: "z/OSMF configuration and workflows, deeper system architecture awareness  address space internals, cross-memory services, and XCF/XES in a sysplex.",
    content: `
      <h2>z/OSMF Overview</h2>
      <p>Replace with content on the z/OS Management Facility, its browser-based UI, and key task plugins.</p>
      <h2>z/OSMF Workflows</h2>
      <p>Explain how workflows automate multi-step administrative tasks with documented steps.</p>
      <h2>Advanced Sysplex Architecture</h2>
      <ul>
        <li><strong>XCF (Cross-System Coupling Facility)</strong>  placeholder.</li>
        <li><strong>XES (Cross-System Extended Services)</strong>  placeholder.</li>
        <li><strong>Coupling Facility (CF)</strong>  placeholder.</li>
      </ul>
      <h2>Cross-Memory Services</h2>
      <p>Describe how address spaces communicate via SRBs, PC routines, and XMEM.</p>
    `,
    mcq: [
      { question: "What is z/OSMF primarily used for?", options: ["Real-time transaction processing", "Browser-based system management and automation workflows", "RACF user definition", "VSAM cluster management"], answer: 1, explanation: "z/OSMF provides a browser UI for tasks like software deployment, configuration, and operational workflows." },
      { question: "What does XCF provide in a sysplex?", options: ["Network routing between LPARs", "Communication and status signalling between systems in a sysplex", "Disk I/O caching", "RACF synchronisation"], answer: 1, explanation: "XCF (Cross-System Coupling Facility) allows address spaces across different z/OS images to communicate and monitor each other." },
      { question: "What is the Coupling Facility (CF) used for?", options: ["Storing archived SMF data", "Providing high-speed shared memory for sysplex lock, list, and cache structures", "Running CICS transactions", "Managing TCP/IP connections"], answer: 1, explanation: "The CF provides shared in-memory structures (locks, lists, caches) that sysplex members use for coordination." },
      { question: "Which z/OSMF plugin is used for software deployment automation?", options: ["Cloud Provisioning", "Software Management", "Network Configuration", "Workflow Designer"], answer: 1, explanation: "The Software Management plugin automates SMP/E operations including RECEIVE, APPLY, and ACCEPT." },
      { question: "What does a z/OSMF workflow step contain?", options: ["JCL only", "Instructions, automated actions, and approval gates", "RACF commands only", "USS scripts only"], answer: 1, explanation: "A workflow step can include descriptive instructions, automated JCL/REST actions, owner assignments, and approval requirements." }
    ],
    practical: [
      { title: "Task 1  Access and Navigate z/OSMF", description: "Log into the z/OSMF dashboard, identify available task plugins, and create a simple workflow from a template.", hints: ["Hint 1: z/OSMF is accessed via browser at https://hostname:port/zosmf.", "Hint 2: locate the Workflows task in the navigation tree."], solution: "Expected navigation steps. Replace with real content." },
      { title: "Task 2  Review Sysplex Status via z/OSMF", description: "Use z/OSMF or MVS commands to review active sysplex members, CF structure status, and XCF group membership.", hints: ["Hint 1: D XCF,ALL shows sysplex member status from the operator console.", "Hint 2: z/OSMF System Status gives a dashboard view."], solution: "Expected commands and interpretation. Replace with real content." }
    ]
  },

  //  2. Hardware & Virtualization L2 
  {
    id: "l2-hardware",
    level: 2,
    category: "Hardware & Virtualization",
    title: "HCD, IODF & Advanced Connectivity",
    summary: "Hardware Configuration Definition (HCD), I/O Definition Files (IODF), and advanced peripheral connectivity including dynamic I/O changes.",
    content: `
      <h2>Hardware Configuration Definition (HCD)</h2>
      <p>Replace with content on the HCD dialog for defining I/O configurations.</p>
      <h2>I/O Definition File (IODF)</h2>
      <ul>
        <li><strong>Work IODF vs Production IODF</strong>  placeholder.</li>
        <li><strong>IODF activation</strong>  placeholder.</li>
        <li><strong>EDTs and subchannel sets</strong>  placeholder.</li>
      </ul>
      <h2>Dynamic I/O Changes</h2>
      <p>Explain how to add or remove channel paths without an IPL using HCD dynamic changes.</p>
      <h2>Advanced Peripheral Connectivity</h2>
      <p>Cover FICON connectivity, PPRC, and director switch zoning concepts.</p>
    `,
    mcq: [
      { question: "What does HCD stand for?", options: ["Hardware Channel Definition", "Hardware Configuration Definition", "High-Capacity Device", "Host Channel Directory"], answer: 1, explanation: "HCD (Hardware Configuration Definition) is the ISPF-based tool for defining z/OS I/O configurations." },
      { question: "What is an IODF?", options: ["An I/O data file for JES spool", "An I/O Definition File used by HCD to describe hardware configurations", "An ISPF option for device management", "A RACF class for I/O devices"], answer: 1, explanation: "The IODF is the repository that stores the complete hardware I/O configuration used by z/OS and the HMC." },
      { question: "What is the difference between a Work IODF and a Production IODF?", options: ["None", "A Work IODF is under edit; a Production IODF is activated and in use", "Work IODFs are larger", "Production IODFs are read-only drafts"], answer: 1, explanation: "You edit a Work IODF, then build a Production IODF from it to activate on the system." },
      { question: "What is FICON?", options: ["A file icon standard", "A Fibre Channel I/O architecture for connecting mainframe to storage", "A CICS component", "A RACF feature"], answer: 1, explanation: "FICON (Fibre Connection) is the high-speed I/O protocol used to connect IBM Z systems to storage subsystems over fibre." },
      { question: "What does 'dynamic I/O change' allow an administrator to do?", options: ["Change LPAR CPU weights live", "Add, delete, or vary channel paths without requiring an IPL", "Resize DASD volumes online", "Change RACF profiles dynamically"], answer: 1, explanation: "Dynamic I/O changes permit reconfiguration of channels and devices while the system remains running." }
    ],
    practical: [
      { title: "Task 1  Browse an IODF with HCD", description: "Open HCD from ISPF, load an existing Work IODF, and browse the defined channel paths and devices.", hints: ["Hint 1: access HCD from ISPF option 6 or direct panel.", "Hint 2: use the CHPID view to see defined channel paths."], solution: "Expected navigation steps. Replace with real content." },
      { title: "Task 2  Perform a Dynamic I/O Change", description: "Under supervision, add a new logical device definition to a Work IODF and activate it via a dynamic I/O change.", hints: ["Hint 1: define the device in HCD, then build a new Production IODF.", "Hint 2: use the Activate function to apply the change dynamically."], solution: "Expected procedure. Replace with real content." }
    ]
  },

  //  3. Storage & Data Management L2 
  {
    id: "l2-storage",
    level: 2,
    category: "Storage & Data Management",
    title: "DFSMS, HSM & SMS Policy",
    summary: "DFSMS constructs (storage/data/management classes), DFSMShsm migration and recall, DFSMSdss, and writing and activating ACS routines.",
    content: `
      <h2>DFSMS Architecture</h2>
      <p>Replace with content on the Data Facility Storage Management Subsystem and its components.</p>
      <h2>SMS Constructs</h2>
      <ul>
        <li><strong>Storage class</strong>  performance and availability attributes.</li>
        <li><strong>Data class</strong>  dataset allocation defaults.</li>
        <li><strong>Management class</strong>  backup, migration, and retention policies.</li>
        <li><strong>Storage group</strong>  pools of DASD volumes.</li>
      </ul>
      <h2>ACS Routines</h2>
      <p>Explain automatic class selection routines that assign SMS constructs at dataset creation.</p>
      <h2>DFSMShsm</h2>
      <p>Cover level-1 and level-2 migration, backup, and recall, plus space management policies.</p>
      <h2>DFSMSdss</h2>
      <p>Explain DUMP, RESTORE, and COPY functions for backup and volume cloning.</p>
    `,
    mcq: [
      { question: "What does ACS stand for in DFSMS?", options: ["Automatic Class Selection", "Access Control System", "Archive and Copy Service", "Allocated Class Structure"], answer: 0, explanation: "ACS (Automatic Class Selection) routines determine which SMS storage, data, and management classes are assigned to a dataset." },
      { question: "Which SMS construct governs a dataset's backup frequency and retention?", options: ["Storage class", "Data class", "Management class", "Storage group"], answer: 2, explanation: "Management class specifies policies for backup frequency, retention periods, and migration thresholds." },
      { question: "What is DFSMShsm primarily responsible for?", options: ["Dataset encryption", "Hierarchical storage management: migrating inactive datasets and managing backup", "VSAM cluster performance", "Network storage routing"], answer: 1, explanation: "DFSMShsm automates migration of inactive data to cheaper media and maintains backup copies for recovery." },
      { question: "What does DFSMSdss DUMP operation produce?", options: ["An SMF record", "A compressed backup copy of a dataset or volume on tape or disk", "A RACF audit trail", "An IODF export"], answer: 1, explanation: "DFSMSdss DUMP creates a compressed image backup of datasets or entire volumes for disaster recovery." },
      { question: "What tool is used to define and manage SMS constructs interactively?", options: ["SDSF", "ISMF (Interactive Storage Management Facility)", "RMF", "z/OSMF workflows"], answer: 1, explanation: "ISMF provides ISPF panels for defining storage groups, storage classes, data classes, management classes, and ACS routines." }
    ],
    practical: [
      { title: "Task 1  Define a Management Class Using ISMF", description: "Use ISMF to define a new management class with specific backup frequency and retention settings.", hints: ["Hint 1: access ISMF from the ISMF primary menu in ISPF.", "Hint 2: set GDS rolloff, backup frequency, and retain days."], solution: "Expected steps and settings. Replace with real content." },
      { title: "Task 2  Write and Test an ACS Routine", description: "Write a storage class ACS routine that assigns a specific storage class to datasets whose HLQ matches a pattern. Test it with the ACS test facility before activating.", hints: ["Hint 1: use WHEN (&DSN = 'PROD.**') THEN SET &STORCLAS = 'PRODSTC'.", "Hint 2: use the ACS test utility to verify without activating."], solution: "Expected ACS code and test results. Replace with real content." }
    ]
  },

  //  4. System Operations & Tools L2 
  {
    id: "l2-operations",
    level: 2,
    category: "System Operations & Tools",
    title: "Advanced USS, Monitoring & WLM",
    summary: "Advanced USS (UNIX System Services) administration, automated operations monitoring, and practical Workload Manager (WLM) configuration and tuning.",
    content: `
      <h2>Advanced USS Administration</h2>
      <p>Replace with content on HFS/zFS filesystems, mount points, USS security (UID/GID), and USS started tasks.</p>
      <h2>Automated Operations Monitoring</h2>
      <ul>
        <li><strong>NetView / SA z/OS</strong>  event-driven automation.</li>
        <li><strong>Message automation rules</strong>  WTOR replies and suppression.</li>
        <li><strong>Health Monitor</strong>  setting up thresholds and alerts.</li>
      </ul>
      <h2>Workload Manager (WLM)</h2>
      <p>Explain service definitions, service classes, performance goals, and importance weights.</p>
      <h2>WLM in Practice</h2>
      <p>Cover installing a service definition, monitoring transaction response times, and adjusting goals.</p>
    `,
    mcq: [
      { question: "What filesystem type is recommended for USS on modern z/OS?", options: ["HFS", "zFS", "NFS", "NTFS"], answer: 1, explanation: "zFS (z/OS File System) is the recommended filesystem for USS, offering better performance and availability than the older HFS." },
      { question: "What is a WLM service class?", options: ["A RACF class for resource protection", "A named classification bucket assigning workloads to performance goals", "A CICS resource definition", "A DFSMS storage class"], answer: 1, explanation: "A WLM service class groups similar workloads together and assigns response time or throughput goals to them." },
      { question: "Which WLM construct translates business rules into z/OS resource management?", options: ["WLM policy", "Service definition", "Workload group", "Performance table"], answer: 1, explanation: "The WLM service definition contains all workload classifications, performance goals, and resource management policies." },
      { question: "What does WTOR stand for?", options: ["Write To Operator Reply", "Workload Task Operator Request", "Workload Tuning Override Rule", "Write To Output Record"], answer: 0, explanation: "WTOR (Write To Operator with Reply) is a system message requiring an operator response before a task can continue." },
      { question: "In USS, what command mounts a zFS filesystem?", options: ["ALLOCATE", "MOUNT PATH", "ATTACH FS", "OMVS FS"], answer: 1, explanation: "The MVS MOUNT command (or corresponding BPXPRMxx configuration) attaches zFS filesystems to the USS directory tree." }
    ],
    practical: [
      { title: "Task 1  Mount a zFS Filesystem and Navigate USS", description: "Define a zFS dataset, mount it to a USS path, navigate into it from OMVS, and create a file.", hints: ["Hint 1: allocate a linear dataset for zFS first.", "Hint 2: use MOUNT FILESYSTEM(...) PATH(...)  TYPE(ZFS)."], solution: "Expected commands and steps. Replace with real content." },
      { title: "Task 2  Review a WLM Service Definition", description: "Use WLM ISPF panels to display the current installed service definition and identify the service classes assigned to batch and online workloads.", hints: ["Hint 1: access WLM from ISPF option 6, then the WLM panels.", "Hint 2: look at service classes and their performance goals."], solution: "Expected observations. Replace with real content." }
    ]
  },

  //  5. Batch Processing & JCL L2 
  {
    id: "l2-batch",
    level: 2,
    category: "Batch Processing & JCL",
    title: "Advanced JCL, Restart & Workload Scheduling",
    summary: "Advanced PROC usage, symbolic parameter overrides, step restart and recovery concepts, checkpoint/restart techniques, and workload scheduling product awareness.",
    content: `
      <h2>Advanced PROC Usage</h2>
      <p>Replace with content on nested PROCs, symbolic override via EXEC statement, and PROC versioning.</p>
      <h2>Restart and Recovery</h2>
      <ul>
        <li><strong>Step restart (//RD parameter)</strong>  placeholder.</li>
        <li><strong>Checkpoint/restart (SYSCHK)</strong>  placeholder.</li>
        <li><strong>JESREQUEUE and operator restart</strong>  placeholder.</li>
      </ul>
      <h2>Workload Scheduling Awareness</h2>
      <p>Introduce enterprise scheduling products (e.g., IWS/TWS, CA7, Zena) and their integration with JES.</p>
      <h2>JCL Best Practices</h2>
      <p>Cover RESTART, IEFBR14 patterns, generation number expressions in GDGs, and conditional step flow.</p>
    `,
    mcq: [
      { question: "What JCL parameter enables step restart from a specific step?", options: ["RESTART=", "RESUME=", "RERUN=", "CONTINUE="], answer: 0, explanation: "The RESTART= parameter on the JOB statement names the step (and optionally proc step) from which execution should resume." },
      { question: "What is checkpoint/restart used for?", options: ["Rerunning a job from the beginning", "Resuming a long-running job from the last recorded checkpoint after a failure", "Resetting JES queues", "Restarting the whole IPL"], answer: 1, explanation: "Checkpoint/restart allows a job to write periodic checkpoints and resume from the last checkpoint rather than rerunning entirely." },
      { question: "In a catalogued PROC, how do you override a symbolic parameter at execution time?", options: ["Modify the PROC member directly", "Pass the new value on the EXEC PROC= statement (e.g., EXEC PROCNAME,PARM=VALUE)", "Use a COND parameter", "Submit the PROC as a separate job"], answer: 1, explanation: "Symbolic parameters are overridden by adding parameter assignments on the EXEC statement that invokes the PROC." },
      { question: "What enterprise scheduling product is part of the IBM z/OS product family?", options: ["CA7", "IWS (IBM Workload Scheduler)", "Zena", "AutoSys"], answer: 1, explanation: "IBM Workload Scheduler (IWS/TWS) is IBM's mainframe-native job scheduling product, often called OPC or TWS on z/OS." },
      { question: "What does GDG relative generation number (+1) do in JCL?", options: ["References the previous generation", "References the next to be created (new) generation", "References generation 1 unconditionally", "Deletes the last generation"], answer: 1, explanation: "+1 in a GDG DSN reference allocates a new generation that increments the base sequence number upon job completion." }
    ],
    practical: [
      { title: "Task 1  Write a Catalogued PROC with Symbolic Parameters", description: "Create a catalogued PROC with at least two symbolic parameters, then call it from a JCL job overriding both parameters.", hints: ["Hint 1: define symbolics with &NAME= in the PROC header.", "Hint 2: override with EXEC MYPROC,SYM1=VALUE1,SYM2=VALUE2."], solution: "Expected PROC and JCL. Replace with real content." },
      { title: "Task 2  Restart a Failed Job from a Specific Step", description: "Intentionally fail a multi-step job at step 2, then resubmit with RESTART=STEP2 and verify the correct step executed.", hints: ["Hint 1: add RESTART=stepname on the JOB statement in the resubmission.", "Hint 2: verify via SDSF that only the restarted steps ran."], solution: "Expected JCL changes and SDSF output. Replace with real content." }
    ]
  },

  //  6. Automation & Scripting L2 
  {
    id: "l2-automation",
    level: 2,
    category: "Automation & Scripting",
    title: "Advanced REXX & System Integration",
    summary: "Advanced REXX techniques, REXXISPFTSO service integration, automated operations scripting, and integration with z/OS system tools (SDSF, SMF, console commands).",
    content: `
      <h2>Advanced REXX Techniques</h2>
      <p>Replace with content on stem variables, external functions, REXX I/O, and error handling.</p>
      <h2>REXXISPF Services</h2>
      <ul>
        <li><strong>ISPEXEC VGET/VPUT</strong>  sharing variables between a REXX exec and ISPF.</li>
        <li><strong>ISPEXEC TBOPEN/TBCLOSE</strong>  table manipulation.</li>
        <li><strong>ISPEXEC SELECT CMD</strong>  launching commands from REXX.</li>
      </ul>
      <h2>Automation Scripting</h2>
      <p>Explain event-driven automation using TSO/E REXX, ISF (SDSF REXX interface), and console automation.</p>
      <h2>Integration with System Tools</h2>
      <p>Cover reading SMF records with REXX, issuing MVS commands from REXX, and parsing system responses with OUTTRAP.</p>
    `,
    mcq: [
      { question: "What is a REXX stem variable?", options: ["A variable with a fixed value", "An associative array indexed by a tail, e.g., list.1, list.2", "A read-only system variable", "A variable declared in a PROC"], answer: 1, explanation: "Stem variables (stem.index) form REXX's array mechanism, with stem.0 conventionally holding the count." },
      { question: "What does OUTTRAP do in REXX?", options: ["Catches runtime errors", "Redirects the output of a TSO command into a stem variable for programmatic processing", "Opens a file for output", "Traps ISPF variable updates"], answer: 1, explanation: "OUTTRAP(stem) captures lines that would go to the terminal into a stem array for subsequent REXX processing." },
      { question: "Which ISF (SDSF) REXX function retrieves a list of jobs?", options: ["ISFBROWSE", "ISFEXEC", "ISFACT", "ISFLIST"], answer: 1, explanation: "The SDSF REXX host command environment uses ISFEXEC to execute SDSF queries and return results into REXX variables." },
      { question: "How do you issue an MVS operator command from REXX?", options: ["CALL MVS(cmd)", "ADDRESS TSO 'CONSOLE SYSCMD(cmd)'  or ADDRESS CONSOLE cmd via CONSPROF", "EXEC sys:cmd", "SYSCALL CMD cmd"], answer: 1, explanation: "Using ADDRESS CONSOLE after acquiring a console with CONSPROF, or using AXREXX facilities, REXX can issue and receive responses to operator commands." },
      { question: "What REXX command reads records from a z/OS dataset sequentially?", options: ["EXECIO * DISKR", "READFILE dsn", "GET FILE(dsn)", "RECEIVE dsn"], answer: 0, explanation: "EXECIO * DISKR 'DSN' (FINIS STEM lines.) reads all records from a sequential dataset into a stem variable." }
    ],
    practical: [
      { title: "Task 1  REXX Exec Using SDSF ISF Interface", description: "Write a REXX exec that uses the ISF host environment to list all jobs in the SDSF ST panel and report any job with a non-zero return code.", hints: ["Hint 1: set ADDRESS ISFCONS and use ISFEXEC ST.", "Hint 2: loop over ISFRESP. stem for job names and return codes."], solution: "Expected REXX code and output. Replace with real content." },
      { title: "Task 2  Read an SMF-format Dataset with REXX and EXECIO", description: "Using EXECIO and REXX string functions, read a pre-extracted flat SMF-format file and parse the record type and date from each record.", hints: ["Hint 1: use EXECIO * DISKR to load records.", "Hint 2: use SUBSTR() to extract fixed-position fields."], solution: "Expected REXX exec and sample output. Replace with real content." }
    ]
  },

  //  7. Subsystems & Middleware L2 
  {
    id: "l2-subsystems",
    level: 2,
    category: "Subsystems & Middleware",
    title: "MQ, SMP/E & Software Lifecycle",
    summary: "IBM MQ on z/OS queue management, SMP/E software installation methodology, software lifecycle management, and IBM Workload Scheduler (IWS) awareness.",
    content: `
      <h2>IBM MQ for z/OS</h2>
      <p>Replace with content on MQ queue managers, channels, queues, and basic administration considerations.</p>
      <h2>SMP/E  Software Installation</h2>
      <ul>
        <li><strong>Zones (global, target, distribution)</strong>  placeholder.</li>
        <li><strong>RECEIVE / APPLY / ACCEPT</strong>  installation flow.</li>
        <li><strong>PTF and HOLDDATA management</strong>  placeholder.</li>
      </ul>
      <h2>Software Lifecycle</h2>
      <p>Describe installing maintenance, managing service streams, and the relationship between CSI datasets.</p>
      <h2>IBM Workload Scheduler (IWS)</h2>
      <p>Overview of IWS/TWS, job dependency definitions, run cycles, and current-plan management.</p>
    `,
    mcq: [
      { question: "What is a queue manager in IBM MQ?", options: ["A JES queue monitor", "The MQ software process that manages message queues and routes messages", "An ISPF panel for job queues", "A WLM service class"], answer: 1, explanation: "A queue manager is the MQ server process responsible for message persistence, routing, and delivery." },
      { question: "In SMP/E, what does APPLY do?", options: ["Downloads software from IBM", "Installs software elements into the target zone (production libraries)", "Archives old PTFs", "Validates zone integrity only"], answer: 1, explanation: "APPLY installs SMP/E elements into the target libraries, making the new or changed code available for use." },
      { question: "What is a SMP/E zone?", options: ["A RACF security zone", "A metadata repository describing the software installed in a set of libraries", "A USS filesystem mount area", "A WLM goal boundary"], answer: 1, explanation: "SMP/E zones (global, target, distribution) are CSI datasets that track what software is installed and where." },
      { question: "What is an MQ channel?", options: ["A z/OS channel path (CHPID)", "A logical communication link between two MQ queue managers", "A WLM service class path", "A CICS task"], answer: 1, explanation: "An MQ channel is the mechanism by which messages flow between queue managers, each channel using a transmit queue and a network connection." },
      { question: "In IWS, what is a 'current plan'?", options: ["The WLM service definition in effect", "The scheduled daily execution plan for all managed workloads", "The active SMF recording configuration", "The LPAR resource allocation plan"], answer: 1, explanation: "The current plan in IWS is the active operational schedule, listing all jobs expected to run during the defined planning period." }
    ],
    practical: [
      { title: "Task 1  Browse an SMP/E CSI and List Installed Products", description: "Use SMP/E ISPF dialogs to open a Global CSI and list the installed product FMIDs and their current maintenance level.", hints: ["Hint 1: access SMP/E from ISPF option 6 or the SMP/E primary menu.", "Hint 2: use REPORT SOURCEID or browse the target zone."], solution: "Expected navigation steps and output. Replace with real content." },
      { title: "Task 2  Display MQ Queue Manager and Queue Status", description: "Use MQ commands (via ISPF MQSC interface or operator console) to display an MQ queue manager status and list defined queues.", hints: ["Hint 1: use DISPLAY QMGR from MQSC to check queue manager status.", "Hint 2: use DISPLAY QUEUE(*) to list all defined queues."], solution: "Expected commands and output. Replace with real content." }
    ]
  },

  //  8. Networking & Security L2 
  {
    id: "l2-networking",
    level: 2,
    category: "Networking & Security",
    title: "TCP/IP Stack, FTP Config & RACF Advanced",
    summary: "In-depth TCP/IP stack awareness, FTP server configuration, RACF advanced resource protection, and resource access control list management.",
    content: `
      <h2>TCP/IP Stack In-Depth</h2>
      <p>Replace with content on PROFILE.TCPIP structure, AUTOLOG, GLOBALCONFIG, and dynamic routing.</p>
      <h2>FTP Configuration</h2>
      <ul>
        <li><strong>FTP server started task</strong>  placeholder.</li>
        <li><strong>FTP.DATA configuration</strong>  placeholder.</li>
        <li><strong>JESINTERFACELEVEL</strong>  placeholder.</li>
        <li><strong>Secure FTP / SFTP considerations</strong>  placeholder.</li>
      </ul>
      <h2>RACF Advanced Resource Protection</h2>
      <p>Cover general resource profiles, PROGRAM class, APPL class, started-task table (RACF), and SETROPTS.</p>
      <h2>Access List Management</h2>
      <p>Explain permit levels (READ/UPDATE/CONTROL/ALTER), conditional access, and RACF reporting.</p>
    `,
    mcq: [
      { question: "Which PROFILE.TCPIP statement enables automatic TCP/IP stack startup?", options: ["AUTOSTART", "AUTOLOG", "AUTORUN", "INITSTACK"], answer: 1, explanation: "AUTOLOG in PROFILE.TCPIP lists procedures and addresses to start automatically when the TCP/IP stack initialises." },
      { question: "Which RACF class protects general z/OS resources (non-dataset)?", options: ["FACILITY", "DATASET", "UNIXPRIV", "JESSPOOL"], answer: 0, explanation: "The FACILITY class (and other general resource classes) protect non-dataset resources like z/OSMF, USS operations, and started tasks." },
      { question: "What does SETROPTS AUDIT(class) do?", options: ["Suppresses all RACF messages", "Activates detailed auditing for every access attempt in the named class", "Revokes user access", "Sets the universal access to NONE"], answer: 1, explanation: "SETROPTS AUDIT activates logging of all successful and failed accesses to resources in the specified class." },
      { question: "What RACF access level is required to delete a protected dataset?", options: ["READ", "UPDATE", "CONTROL", "ALTER"], answer: 3, explanation: "ALTER is the highest RACF access level and is required to delete, rename, or re-catalog a protected dataset." },
      { question: "What is a RACF STARTED class profile used for?", options: ["Defining a user's logon restrictions", "Associating a started task with a RACF user ID and group automatically", "Listing all active TCP connections", "Defining FTP transfer rules"], answer: 1, explanation: "Entries in the STARTED class (or ICHRIN03) map started task procedure names to RACF user IDs, granting them appropriate security authority." }
    ],
    practical: [
      { title: "Task 1  Configure and Verify an FTP Server Started Task", description: "Review an existing FTP server configuration (FTP.DATA and PROFILE.TCPIP AUTOLOG entry), start the FTP server, and verify connectivity from a client.", hints: ["Hint 1: check PROFILE.TCPIP for the AUTOLOG FTPD entry.", "Hint 2: use the NETSTAT PORTLIST command to verify port 21 is listening."], solution: "Expected configuration review and test steps. Replace with real content." },
      { title: "Task 2  Define a RACF FACILITY Class Profile and Grant Access", description: "Define a profile in the FACILITY class to protect a z/OSMF function, then permit a specific user ID READ access, and verify with RLIST.", hints: ["Hint 1: RDEFINE FACILITY (profile.name) UACC(NONE)", "Hint 2: PERMIT profile.name CLASS(FACILITY) ID(userid) ACCESS(READ)", "Hint 3: verify with RLIST FACILITY profile.name ALL."], solution: "Expected commands and output. Replace with real content." }
    ]
  }

];
