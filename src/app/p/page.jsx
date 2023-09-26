import { redirect } from "next/navigation";
import MonacoEditor from "../components/MonacoEditor";
import styles from "./page.module.css"

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
        language: "text"
      })
    });

    // check response and redirect to paste
    if (response.status == 201) {
      const data = await response.json();
      redirect(`${process.env.DOMAIN}/p/${data.data.pid}`)
    }
  }

  const code = "console.log(`hello ${name}`)";

  return (
    <div className={styles.paste}>
      <h3>CREATE A NEW PASTE</h3>
      <MonacoEditor code={code}/>
      <form action={create} className={styles.form}>
        <label htmlFor="title">Title: </label>
        <input type="text" name="title" id="title" />
        <button name="submit" id="submit">PASTE PLS</button>
      </form>
    </div>
  )
}