export default function report(url, data) {
  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, data);
  } else {
    fetch(url, {
      body: JSON.stringify(data), // must match 'Content-Type' header
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "include", // include, same-origin, *omit
      headers: {
        "content-type": "application/json",
        connection: "keep-alive",
      },
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      referrer: "client", // *client, no-referrer
    });
  }
}
