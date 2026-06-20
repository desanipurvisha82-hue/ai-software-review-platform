const API_BASE_URL = "http://localhost:8080/api";

// =====================
// AUTH
// =====================

export async function login(email: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  return res.json();
}

// =====================
// SOFTWARE
// =====================

export async function getSoftware() {
  const res = await fetch(`${API_BASE_URL}/software`);

  if (!res.ok) {
    throw new Error("Failed to fetch software");
  }

  return res.json();
}

export async function getSoftwareById(id: string) {
  const res = await fetch(`${API_BASE_URL}/software/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch software details");
  }

  return res.json();
}

export async function addSoftware(token: string, software: any) {
  const res = await fetch(`${API_BASE_URL}/software`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(software),
  });

  if (!res.ok) {
    throw new Error("Failed to add software");
  }

  return res.json();
}

// =====================
// REVIEWS
// =====================

export async function getReviewsBySoftwareId(id: string) {
  const res = await fetch(
    `${API_BASE_URL}/reviews/software/${id}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch reviews");
  }

  return res.json();
}

export async function addReview(
  token: string,
  review: any
) {
  const res = await fetch(`${API_BASE_URL}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(review),
  });

  if (!res.ok) {
    throw new Error("Failed to add review");
  }

  return res.json();
}

// =====================
// AI SUMMARY
// =====================

export async function getAiSummary(id: string) {
  const res = await fetch(
    `${API_BASE_URL}/ai/summary/${id}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch AI summary");
  }

  return res.json();
}

// =====================
// DASHBOARD
// =====================

export async function getDashboardStats(
  token: string
) {
  const res = await fetch(
    `${API_BASE_URL}/dashboard/stats`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(
      "Failed to fetch dashboard stats"
    );
  }

  return res.json();
}