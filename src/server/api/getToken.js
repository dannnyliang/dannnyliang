import "https://deno.land/x/dotenv/load.ts";

export default async function ({ request, response }) {
  const reqBody = request.body({ type: 'json' })
  const { code } = await reqBody.value

  const { BASIC_AUTHORIZATION_CODE } = Deno.env.toObject();

  const headers = new Headers();
  headers.append("Authorization", `Basic ${BASIC_AUTHORIZATION_CODE}`);
  headers.append("Content-Type", "application/x-www-form-urlencoded");

  const body = new URLSearchParams();
  body.append("grant_type", "authorization_code");
  body.append("code", code);
  body.append("redirect_uri", "https://github.com/dannnyliang/dannnyliang");

  const requestOptions = {
    method: "POST",
    headers,
    body,
    redirect: "follow",
  };

  await fetch(
    "https://accounts.spotify.com/api/token",
    requestOptions
  )
    .then((response) => response.json())
    .then((token) => {
      response.status = 200
      response.body = token
    })
    .catch((error) => {
      console.error("error", error)
      response.status = 404
      response.body = { message: error }
    });
}
