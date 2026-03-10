export async function getHealth() {
  const response = await fetch("http://localhost:3001/api/health");
  
  if (!response.ok) {
    throw new Error("API Request failed");
  }
  
  return response.json();
}