export const mockKPIs = {
  activePatients: 186,
  sessionsToday: 24,
  avgPainReduction: 42,
  exerciseCompliance: 71,
};

export const liveKPIs = {
  activePatients: 203,
  sessionsToday: 31,
  avgPainReduction: 47,
  exerciseCompliance: 76,
};

export const mockSessions = [
  { id: 1, patient: "James Carter", time: "9:00 AM", type: "Manual Therapy", avatar: "JC", checkedIn: false },
  { id: 2, patient: "Ava Thompson", time: "9:45 AM", type: "Dry Needling", avatar: "AT", checkedIn: true },
  { id: 3, patient: "Marcus Reed", time: "10:30 AM", type: "Sports Rehab", avatar: "MR", checkedIn: false },
  { id: 4, patient: "Sophia Nguyen", time: "11:15 AM", type: "Post-Op Rehab", avatar: "SN", checkedIn: false },
  { id: 5, patient: "Liam Brooks", time: "1:00 PM", type: "Spinal Adjustment", avatar: "LB", checkedIn: true },
  { id: 6, patient: "Emma Davis", time: "2:00 PM", type: "Manual Therapy", avatar: "ED", checkedIn: false },
];

export const liveSessions = [
  { id: 1, patient: "Olivia Martinez", time: "8:30 AM", type: "Sports Rehab", avatar: "OM", checkedIn: true },
  { id: 2, patient: "Noah Wilson", time: "9:15 AM", type: "Manual Therapy", avatar: "NW", checkedIn: true },
  { id: 3, patient: "Isabella Brown", time: "10:00 AM", type: "Dry Needling", avatar: "IB", checkedIn: false },
  { id: 4, patient: "William Lee", time: "11:00 AM", type: "Spinal Adjustment", avatar: "WL", checkedIn: true },
  { id: 5, patient: "Mia Johnson", time: "1:30 PM", type: "Post-Op Rehab", avatar: "MJ", checkedIn: false },
];

const patientBase = [
  { id: "PT-001", name: "James Carter", age: 34, condition: "Back Pain", therapist: "Dr. Sarah Mitchell", compliance: 88, status: "Active", avatar: "JC" },
  { id: "PT-002", name: "Ava Thompson", age: 28, condition: "Knee Pain", therapist: "Dr. Ryan Patel", compliance: 72, status: "Active", avatar: "AT" },
  { id: "PT-003", name: "Marcus Reed", age: 41, condition: "Sports Injury", therapist: "Dr. Sarah Mitchell", compliance: 95, status: "Active", avatar: "MR" },
  { id: "PT-004", name: "Sophia Nguyen", age: 52, condition: "Shoulder Pain", therapist: "Dr. Emily Chen", compliance: 60, status: "Review", avatar: "SN" },
  { id: "PT-005", name: "Liam Brooks", age: 23, condition: "Post-Surgery", therapist: "Dr. Ryan Patel", compliance: 45, status: "At Risk", avatar: "LB" },
  { id: "PT-006", name: "Emma Davis", age: 38, condition: "Neck Pain", therapist: "Dr. Emily Chen", compliance: 82, status: "Active", avatar: "ED" },
  { id: "PT-007", name: "Oliver Harris", age: 45, condition: "Back Pain", therapist: "Dr. Sarah Mitchell", compliance: 91, status: "Active", avatar: "OH" },
  { id: "PT-008", name: "Charlotte Wilson", age: 31, condition: "Knee Pain", therapist: "Dr. Ryan Patel", compliance: 67, status: "Active", avatar: "CW" },
  { id: "PT-009", name: "Benjamin Lee", age: 56, condition: "Hip Pain", therapist: "Dr. Emily Chen", compliance: 54, status: "Review", avatar: "BL" },
  { id: "PT-010", name: "Amelia Garcia", age: 29, condition: "Sports Injury", therapist: "Dr. Sarah Mitchell", compliance: 78, status: "Active", avatar: "AG" },
];

export const mockPatients = patientBase;
export const livePatients = patientBase.map((p) => ({ ...p, compliance: Math.min(100, p.compliance + Math.floor(Math.random() * 10)) }));

export const noShowRisks = [
  { name: "Liam Brooks", lastVisit: "March 22, 2026", missedCount: 3 },
  { name: "Benjamin Lee", lastVisit: "March 28, 2026", missedCount: 2 },
  { name: "Sophia Nguyen", lastVisit: "April 1, 2026", missedCount: 2 },
];

export const therapistUtilization = [
  { name: "Dr. Sarah Mitchell", caseload: 18, max: 20, specialty: "Manual Therapy" },
  { name: "Dr. Ryan Patel", caseload: 14, max: 20, specialty: "Sports Rehab" },
  { name: "Dr. Emily Chen", caseload: 20, max: 20, specialty: "Dry Needling" },
  { name: "Dr. Kevin Ortiz", caseload: 8, max: 20, specialty: "Post-Op Rehab" },
];

export const complianceData = [
  { week: "Wk 1", assigned: 28, completed: 18 },
  { week: "Wk 2", assigned: 28, completed: 20 },
  { week: "Wk 3", assigned: 28, completed: 22 },
  { week: "Wk 4", assigned: 28, completed: 19 },
  { week: "Wk 5", assigned: 28, completed: 24 },
  { week: "Wk 6", assigned: 28, completed: 23 },
  { week: "Wk 7", assigned: 28, completed: 26 },
  { week: "Wk 8", assigned: 28, completed: 25 },
];

export const outcomeData = [
  { name: "Back Pain", value: 35, fill: "#4338CA" },
  { name: "Knee Pain", value: 25, fill: "#6366F1" },
  { name: "Sports Injury", value: 20, fill: "#818CF8" },
  { name: "Shoulder Pain", value: 12, fill: "#A5B4FC" },
  { name: "Other", value: 8, fill: "#C7D2FE" },
];

export const billingHistory = [
  { id: "RF-2026-0001", patient: "James Carter", package: "12-Session", amount: 1440, status: "Paid", date: "2026-03-15" },
  { id: "RF-2026-0002", patient: "Ava Thompson", package: "6-Session", amount: 780, status: "Pending", date: "2026-03-20" },
  { id: "RF-2026-0003", patient: "Marcus Reed", package: "Monthly", amount: 599, status: "Paid", date: "2026-03-22" },
  { id: "RF-2026-0004", patient: "Sophia Nguyen", package: "12-Session", amount: 1200, status: "Overdue", date: "2026-02-28" },
  { id: "RF-2026-0005", patient: "Liam Brooks", package: "6-Session", amount: 720, status: "Paid", date: "2026-04-01" },
];

export const soapNotes = [
  { id: 1, patient: "James Carter", date: "2026-04-07", subjective: "Reports improvement in lower back pain. Pain level decreased from 7 to 4.", objective: "ROM improved 15 degrees in lumbar flexion. Tenderness reduced in L4-L5.", assessment: "Progressing well with current treatment plan. Muscle guarding reduced.", plan: "Continue manual therapy 2x/week. Add core stabilization exercises." },
  { id: 2, patient: "Ava Thompson", date: "2026-04-07", subjective: "Knee swelling reduced. Able to walk without assistance.", objective: "Knee flexion 120 degrees (up from 95). No effusion noted.", assessment: "Post-ACL repair rehab on track. Quadriceps strength 4/5.", plan: "Progress to closed-chain exercises. Begin light jogging protocol week 12." },
  { id: 3, patient: "Marcus Reed", date: "2026-04-06", subjective: "Shoulder pain during overhead movements. Sleep quality improving.", objective: "Shoulder abduction 160 degrees. Positive impingement test.", assessment: "Rotator cuff tendinopathy responding to eccentric loading.", plan: "Continue eccentric program. Add scapular stabilization. Review in 1 week." },
  { id: 4, patient: "Emma Davis", date: "2026-04-05", subjective: "Neck stiffness in mornings has decreased. No headaches this week.", objective: "Cervical ROM within functional limits. Upper trap tension bilateral.", assessment: "Cervicogenic symptoms improving with manual therapy and postural correction.", plan: "Transition to home exercise focus. Reduce visits to 1x/week." },
  { id: 5, patient: "Oliver Harris", date: "2026-04-05", subjective: "Able to sit for 2 hours without pain. Returned to desk work.", objective: "SLR negative bilateral. Core endurance improved to 45 seconds.", assessment: "Disc herniation symptoms resolving. Functional goals being met.", plan: "Begin return-to-sport protocol. Discharge planning in 2 weeks." },
];

export const conditions = [
  { name: "Back Pain", icon: "spine", brief: "Expert diagnosis and treatment for acute and chronic back conditions.", causes: ["Poor posture", "Disc herniation", "Muscle strain", "Degenerative changes", "Spinal stenosis"], symptoms: ["Lower back stiffness", "Radiating leg pain", "Difficulty standing", "Muscle spasms", "Reduced mobility"], treatment: "Our multi-modal approach combines spinal manipulation, manual therapy, targeted exercise programs, and ergonomic education to address root causes.", successRate: 94, timeline: "4-12 weeks" },
  { name: "Knee Pain", icon: "knee", brief: "Comprehensive knee rehabilitation for sports injuries and degenerative conditions.", causes: ["ACL/MCL tears", "Meniscus injury", "Patellofemoral syndrome", "Osteoarthritis", "Overuse injuries"], symptoms: ["Swelling", "Instability", "Clicking or locking", "Pain with stairs", "Reduced range of motion"], treatment: "Progressive strengthening, manual therapy, and biomechanical correction to restore full knee function and prevent re-injury.", successRate: 91, timeline: "6-16 weeks" },
  { name: "Sports Injury", icon: "activity", brief: "Specialized rehabilitation to get athletes back to peak performance safely.", causes: ["Acute trauma", "Overtraining", "Poor biomechanics", "Inadequate warm-up", "Equipment issues"], symptoms: ["Acute pain", "Swelling", "Bruising", "Loss of function", "Instability"], treatment: "Sport-specific rehabilitation combining manual therapy, progressive loading, and return-to-play protocols tailored to your sport.", successRate: 96, timeline: "4-20 weeks" },
];

export const therapists = [
  { name: "Dr. Sarah Mitchell", specialty: "Manual Therapy", certifications: ["DPT", "OCS", "FAAOMPT"], patients: 247, bio: "15 years specializing in spinal manipulation and orthopedic manual therapy." },
  { name: "Dr. Ryan Patel", specialty: "Sports Rehab", certifications: ["DPT", "SCS", "CSCS"], patients: 312, bio: "Former athletic trainer with expertise in ACL rehabilitation and return-to-sport protocols." },
  { name: "Dr. Emily Chen", specialty: "Dry Needling", certifications: ["DPT", "DN-1", "CMP"], patients: 189, bio: "Certified dry needling practitioner focusing on trigger point therapy and myofascial release." },
  { name: "Dr. Kevin Ortiz", specialty: "Post-Op Rehab", certifications: ["DPT", "CHT", "CLT"], patients: 156, bio: "Specialist in post-surgical rehabilitation for joint replacements and spinal surgeries." },
  { name: "Dr. Lisa Yamamoto", specialty: "Sports Rehab", certifications: ["DPT", "SCS", "ATC"], patients: 278, bio: "Works with professional athletes across multiple sports for injury prevention and performance." },
  { name: "Dr. Michael Torres", specialty: "Manual Therapy", certifications: ["DC", "DACBSP", "ART"], patients: 203, bio: "Chiropractic physician specializing in active release technique and joint mobilization." },
  { name: "Dr. Amanda Foster", specialty: "Dry Needling", certifications: ["DPT", "DN-2", "COMT"], patients: 167, bio: "Advanced dry needling practitioner with focus on chronic pain and neurological conditions." },
  { name: "Dr. David Nakamura", specialty: "Post-Op Rehab", certifications: ["DPT", "OCS", "FAAOMPT"], patients: 194, bio: "Orthopedic specialist with extensive experience in total joint replacement rehabilitation." },
  { name: "Dr. Rachel Kim", specialty: "Manual Therapy", certifications: ["DPT", "MTC", "CMP"], patients: 221, bio: "Focuses on TMJ disorders, cervicogenic headaches, and craniosacral therapy." },
  { name: "Dr. James Okafor", specialty: "Sports Rehab", certifications: ["DPT", "SCS", "PES"], patients: 256, bio: "Performance enhancement specialist working with elite runners and triathletes." },
  { name: "Dr. Sofia Reyes", specialty: "Dry Needling", certifications: ["DPT", "DN-1", "OCS"], patients: 145, bio: "Combines dry needling with movement analysis for comprehensive musculoskeletal care." },
  { name: "Dr. Thomas Park", specialty: "Post-Op Rehab", certifications: ["DPT", "GCS", "CEEAA"], patients: 178, bio: "Geriatric specialist experienced in hip and knee replacement recovery programs." },
];

export const exercises = [
  { name: "Bird Dog", muscle: "Core", sets: 3, reps: "10 each side", difficulty: "Beginner", body: "Core", duration: "5 min" },
  { name: "Clamshell", muscle: "Glutes", sets: 3, reps: "15 each side", difficulty: "Beginner", body: "Hips", duration: "5 min" },
  { name: "Wall Slide", muscle: "Shoulders", sets: 3, reps: "12", difficulty: "Beginner", body: "Upper Body", duration: "4 min" },
  { name: "Prone Press-Up", muscle: "Lumbar Extensors", sets: 3, reps: "10", difficulty: "Beginner", body: "Core", duration: "4 min" },
  { name: "Single Leg Deadlift", muscle: "Hamstrings / Glutes", sets: 3, reps: "8 each", difficulty: "Intermediate", body: "Lower Body", duration: "6 min" },
  { name: "Dead Bug", muscle: "Deep Core", sets: 3, reps: "10 each", difficulty: "Intermediate", body: "Core", duration: "6 min" },
  { name: "Pallof Press", muscle: "Anti-Rotation Core", sets: 3, reps: "12 each", difficulty: "Intermediate", body: "Core", duration: "5 min" },
  { name: "Side Plank", muscle: "Obliques / Glute Med", sets: 3, reps: "30s each", difficulty: "Intermediate", body: "Core", duration: "5 min" },
  { name: "Bulgarian Split Squat", muscle: "Quads / Glutes", sets: 3, reps: "10 each", difficulty: "Advanced", body: "Lower Body", duration: "8 min" },
  { name: "Nordic Hamstring Curl", muscle: "Hamstrings", sets: 3, reps: "6", difficulty: "Advanced", body: "Lower Body", duration: "6 min" },
  { name: "Turkish Get-Up", muscle: "Full Body", sets: 2, reps: "3 each", difficulty: "Advanced", body: "Full Body", duration: "10 min" },
  { name: "Cable Rotation", muscle: "Rotational Core", sets: 3, reps: "12 each", difficulty: "Intermediate", body: "Core", duration: "5 min" },
  { name: "Cervical Retraction", muscle: "Deep Neck Flexors", sets: 3, reps: "15", difficulty: "Beginner", body: "Upper Body", duration: "3 min" },
  { name: "Scapular Squeeze", muscle: "Rhomboids / Mid Trap", sets: 3, reps: "15", difficulty: "Beginner", body: "Upper Body", duration: "4 min" },
  { name: "Hip Flexor Stretch", muscle: "Iliopsoas", sets: 2, reps: "30s each", difficulty: "Beginner", body: "Hips", duration: "4 min" },
  { name: "Single Leg Balance", muscle: "Ankle Stabilizers", sets: 3, reps: "30s each", difficulty: "Beginner", body: "Lower Body", duration: "4 min" },
  { name: "Banded Monster Walk", muscle: "Glute Med / Hip Abductors", sets: 3, reps: "20 steps", difficulty: "Intermediate", body: "Hips", duration: "5 min" },
  { name: "Pistol Squat Progression", muscle: "Quads / Balance", sets: 3, reps: "5 each", difficulty: "Advanced", body: "Lower Body", duration: "8 min" },
];

export const testimonials = [
  { name: "Michael Torres", quote: "After my ACL surgery, I thought my running days were over. The team at RehabFlow had me back on the trail in 4 months.", outcome: "Returned to running in 16 weeks", rating: 5, videoPlaceholder: true },
  { name: "Jennifer Walsh", quote: "Years of chronic back pain, and nothing worked until I started with RehabFlow. The home exercise program was a game-changer.", outcome: "Reduced pain by 70% in 6 weeks", rating: 5, videoPlaceholder: true },
  { name: "David Kim", quote: "The therapists here understand athletes. They didn't just fix my shoulder — they made it stronger than before the injury.", outcome: "Full return to competitive swimming", rating: 5, videoPlaceholder: true },
  { name: "Sarah Anderson", quote: "I appreciate how they tracked everything. I could see my progress week by week, which kept me motivated through the tough days.", outcome: "Complete recovery from herniated disc", rating: 4, videoPlaceholder: true },
];

export const scheduleData = (() => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const times = ["8:00", "9:00", "10:00", "11:00", "12:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00"];
  const types = ["Manual Therapy", "Sports Rehab", "Dry Needling", "Post-Op", "Assessment"];
  const colors = ["bg-indigo-100 text-indigo-800", "bg-orange-100 text-orange-800", "bg-emerald-100 text-emerald-800", "bg-purple-100 text-purple-800", "bg-blue-100 text-blue-800"];
  const entries = [];
  const patients = ["J. Carter", "A. Thompson", "M. Reed", "S. Nguyen", "L. Brooks", "E. Davis", "O. Harris", "C. Wilson"];
  let id = 0;
  days.forEach((day, di) => {
    const count = di < 5 ? 4 + Math.floor(Math.random() * 3) : 1 + Math.floor(Math.random() * 2);
    const usedTimes = new Set();
    for (let i = 0; i < count; i++) {
      let ti;
      do { ti = Math.floor(Math.random() * times.length); } while (usedTimes.has(ti));
      usedTimes.add(ti);
      const typeIdx = Math.floor(Math.random() * types.length);
      entries.push({ id: id++, day, dayIdx: di, time: times[ti], timeIdx: ti, type: types[typeIdx], color: colors[typeIdx], patient: patients[Math.floor(Math.random() * patients.length)] });
    }
  });
  return { days, times, entries };
})();
