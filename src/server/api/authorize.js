import "https://deno.land/x/dotenv/load.ts";

export default async function ({ response }) {
  const { CLIENT_ID, REDIRECT_URI } = Deno.env.toObject();

  const client_id = CLIENT_ID;
  const response_type = "code";
  const redirect_uri = REDIRECT_URI;
  const scope = "user-read-recently-played%20user-top-read";

  const authorizeLink = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=${response_type}&redirect_uri=${redirect_uri}&scope=${scope}`;

  response.status = 200
  response.body = authorizeLink
}
