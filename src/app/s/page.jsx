import { redirect } from "next/navigation";

export default function Short() {

  async function create(formData) {
    "use server"
    // validate url
  
    // send request
    const response = await fetch("http://localhost:3000/api/short", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          longUrl: formData.get("longUrl"),
          askBeforeRef: false
        })
      }
    );
    if (response.status == 201) {
      const data = await response.json();
      console.log(`${process.env.DOMAIN}/s/info/${data.data.sid}`)
      redirect(`http://${process.env.DOMAIN}/s/${data.data.sid}/info`)
    }
  }

  return (
    <div>
      <form action={create}>
        <label htmlFor="longUrl">Enter your long URL: </label>
        <input type="text" name="longUrl" id="longUrl" required />
        <button type="submit">Go</button>
      </form>
    </div>
  )
}