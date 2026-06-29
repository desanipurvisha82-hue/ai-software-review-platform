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

export async function register(name: string, email: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  if (!res.ok) {
    throw new Error("Registration failed");
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
  const res = await fetch(`${API_BASE_URL}/reviews/software/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch reviews");
  }

  return res.json();
}

export async function addReview(token: string, review: any) {
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
  const res = await fetch(`${API_BASE_URL}/ai/summary/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch AI summary");
  }

  return res.json();
}

export async function updateSoftware(
  token: string,
  id: number,
  software: any
) {
  const res = await fetch(`${API_BASE_URL}/software/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(software),
  });

  if (!res.ok) {
    throw new Error("Failed to update software");
  }

  return res.json();
}
export async function getReviewsByUserId(userId: number) {
  const res = await fetch(`${API_BASE_URL}/reviews/user/${userId}`);

  if (!res.ok) {
    throw new Error("Failed to fetch user reviews");
  }

  return res.json();
}
export async function deleteSoftware(token: string, id: number) {
  const res = await fetch(`${API_BASE_URL}/software/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to delete software");
  }

  return res.text();
}
// =====================
// DASHBOARD
// =====================

export async function getDashboardStats(token: string) {
  const res = await fetch(`${API_BASE_URL}/dashboard/stats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch dashboard stats");
  }

  return res.json();
}
export async function updateReview(token: string, id: number, review: any) {
  const res = await fetch(`${API_BASE_URL}/reviews/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(review),
  });

  if (!res.ok) throw new Error("Failed to update review");
  return res.json();
}

export async function deleteReview(token: string, id: number) {
  const res = await fetch(`${API_BASE_URL}/reviews/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to delete review");
  return res.text();
}
export async function uploadFile(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_BASE_URL}/files/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to upload file");
  }

  return res.json();
}