const apiFetch = async <T>(url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data: T = await res.json();

  return data;
};

export default apiFetch;
