export default async function ({ request, response }) {
  const accessToken = request.headers.get('access_token')

  if (!accessToken) {
    response.status = 404
    response.body = { message: `access_token is not provided` }
    return
  }

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${accessToken}`);

  const requestOptions = {
    method: "GET",
    headers,
    redirect: "follow",
  };

  const limit = 5

  const responseData = await fetch(
    /** {@link https://developer.spotify.com/documentation/web-api/reference/personalization/get-users-top-artists-and-tracks/} */
    `https://api.spotify.com/v1/me/top/tracks?limit=${limit}`,
    requestOptions
  )
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });

  if (responseData.error) {
    response.status = 404
    response.body = { message: error }
    return
  }

  response.status = 200
  response.body = responseData
}
