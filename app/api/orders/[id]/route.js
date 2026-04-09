export async function GET(request) {
  try {
    const url = new URL(request.url);
    const parts = url.pathname.split("/");
    const id = parts[parts.length - 1];

    if (!id || id === "undefined") {
      return new Response(
        JSON.stringify({ message: "Order id is missing" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const response = await fetch(`http://127.0.0.1:8000/api/orders/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

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

export async function DELETE(request) {
  try {
    const url = new URL(request.url);
    const parts = url.pathname.split("/");
    const id = parts[parts.length - 1];

    if (!id || id === "undefined") {
      return new Response(
        JSON.stringify({ message: "Order id is missing" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const authorization = request.headers.get("authorization");

const response = await fetch(`http://127.0.0.1:8000/api/admin/orders/${id}`, {
  method: "GET",
  headers: {
    Accept: "application/json",
    ...(authorization ? { Authorization: authorization } : {}),
  },
  cache: "no-store",
});

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