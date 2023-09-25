import { redirect } from "next/navigation";

export default function Paste() {

  async function create(formData) {
    "use server"

    // send request to api
    const response = await fetch(`http://${process.env.DOMAIN}/api/paste`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: formData.get("title"),
        text: formData.get("text"),
        language: formData.get("language")
      })
    });

    // check response and redirect to paste
    if (response.status == 201) {
      const data = await response.json();
      redirect(`${process.env.DOMAIN}/p/${data.data.pid}`)
    }
  }

  return (
    <div>
      <form action={create}>
        <label htmlFor="title">Title: </label>
        <input type="text" name="title" id="title" />
        <br />
        <label htmlFor="text">Text: </label>
        <textarea name="text" id="text" cols="40" rows="5"></textarea>
        <br />
        <label htmlFor="language">Language: </label>
        <select name="language" id="language">
          <option value="text">Text</option>
          <option value="javascript">Javascript</option>
          <option value="python">Python</option>
          <option value="cpp">C++</option>
        </select>
        <br />
        <input type="submit" name="submit" id="submit" value='Go' />
      </form>
    </div>
  )
}