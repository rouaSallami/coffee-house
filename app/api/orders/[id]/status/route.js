export async function PATCH(request) {
  try {
    const body = await request.json();

    const url = new URL(request.url);
    const parts = url.pathname.split("/");
    const id = parts[parts.length - 2]; // /api/orders/2/status

    if (!id || id === "undefined") {
      return new Response(
        JSON.stringify({
          message: "Order id is missing",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const response = await fetch(
      `http://127.0.0.1:8000/api/orders/${id}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const text = await response.text();

    return new Response(text, {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Proxy error",
        error: error.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}