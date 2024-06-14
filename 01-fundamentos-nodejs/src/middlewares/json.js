export async function json(req, res) {
  const buffers = []

  for await (const chunck of req) {
    console.log(chunck)
    buffers.push(chunck)
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString())
  } catch {
    req.body = null
  }
  res.setHeader("Content-type", "application/json")
  //console.log(res.getHeader().toString())
}
