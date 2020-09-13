import "https://deno.land/x/dotenv/load.ts";

export default async function ({ response }) {
  const { GITHUB_ACCESS_TOKEN } = Deno.env.toObject();

  const headers = new Headers();
  headers.append("Authorization", `token ${GITHUB_ACCESS_TOKEN}`);

  const requestOptions = {
    method: "GET",
    headers,
    redirect: "follow",
  };

  await fetch(
    "https://api.github.com/repos/dannnyliang/dannnyliang/contents/README.md",
    requestOptions
  )
    .then((response) => response.json())
    .then((data) => {
      response.status = 200
      response.body = data
    })
    .catch((error) => {
      console.error("error", error)
      response.status = 404
      response.body = { message: error }
    });
}
