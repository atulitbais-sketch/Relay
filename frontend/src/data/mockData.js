export const dashboardStats = [
  {
    id: 1,
    title: "Documents",
    value: "148",
    change: "+12 today",
    color: "#2563EB",
    icon: "documents",
  },
  {
    id: 2,
    title: "Tasks",
    value: "34",
    change: "5 pending",
    color: "#059669",
    icon: "tasks",
  },
  {
    id: 3,
    title: "Conflicts",
    value: "4",
    change: "Needs review",
    color: "#DC2626",
    icon: "conflicts",
  },
  {
    id: 4,
    title: "AI Memories",
    value: "2451",
    change: "Growing",
    color: "#7C3AED",
    icon: "memory",
  },
];

export const recentDocuments = [
  {
    id: 1,
    name: "VendorReview.pdf",
    uploadedBy: "Sandesh",
    status: "Processed",
    memories: 24,
    date: "Today",
  },
  {
    id: 2,
    name: "ArchitectureDecision.pdf",
    uploadedBy: "Team Lead",
    status: "Pending Review",
    memories: 17,
    date: "Yesterday",
  },
  {
    id: 3,
    name: "SecurityPolicy.docx",
    uploadedBy: "Admin",
    status: "Processed",
    memories: 31,
    date: "Yesterday",
  },
];

export const tasks = [
  {
    id: 1,
    title: "Security Review",
    priority: "High",
    owner: "Security Team",
    status: "Pending",
  },
  {
    id: 2,
    title: "Vendor Approval",
    priority: "Medium",
    owner: "Procurement",
    status: "Completed",
  },
];

export const conflicts = [
  {
    id: 1,
    oldDecision: "Deployment Pattern Alpha",
    newDecision: "Deployment Pattern Beta",
    severity: "High",
  },
];