const VERCEL_API = "https://api.vercel.com";

function getHeaders() {
  return {
    Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
    "Content-Type": "application/json",
  };
}

function teamParam() {
  return process.env.VERCEL_TEAM_ID
    ? `?teamId=${process.env.VERCEL_TEAM_ID}`
    : "";
}

export async function updateEnvVar(key: string, value: string) {
  const projectId = process.env.VERCEL_PROJECT_ID;
  if (!projectId || !process.env.VERCEL_TOKEN) {
    console.warn("Vercel API credentials missing — skipping env var update");
    return;
  }

  const headers = getHeaders();
  const team = teamParam();

  // Check if the env var already exists
  const listRes = await fetch(
    `${VERCEL_API}/v9/projects/${projectId}/env${team}`,
    { headers }
  );
  const listData = await listRes.json();
  const existing = listData.envs?.find(
    (e: { key: string }) => e.key === key
  );

  if (existing) {
    // Update existing env var
    await fetch(
      `${VERCEL_API}/v9/projects/${projectId}/env/${existing.id}${team}`,
      {
        method: "PATCH",
        headers,
        body: JSON.stringify({ value }),
      }
    );
    console.log(`Updated Vercel env var: ${key}`);
  } else {
    // Create new env var
    await fetch(
      `${VERCEL_API}/v10/projects/${projectId}/env${team}`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          key,
          value,
          type: "encrypted",
          target: ["production", "preview"],
        }),
      }
    );
    console.log(`Created Vercel env var: ${key}`);
  }
}

export async function triggerRedeploy() {
  const hookUrl = process.env.VERCEL_DEPLOY_HOOK;
  if (!hookUrl) {
    console.warn("No VERCEL_DEPLOY_HOOK set — skipping redeploy");
    return;
  }

  await fetch(hookUrl, { method: "POST" });
  console.log("Triggered Vercel redeploy via deploy hook");
}
