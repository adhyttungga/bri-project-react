const api = "http://localhost:5000"

const list = async (signal, url) => {
  try {
    let response = await fetch(api + url, {
      method: "GET",
      signal: signal,
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

const read = async (signal, url) => {
  try {
    let response = await fetch(api + url, {
      method: "GET",
      signal: signal,
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

export {
  list,
  read
}