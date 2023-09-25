import { redirect } from "next/navigation";
import styles from "./page.module.css"

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
    <form action={create} className={styles.form}>
      <label htmlFor="longUrl">Your long URL: </label>
      <input type="text" name="longUrl" id="longUrl" required className={styles.input}/>
      <button type="submit" className={styles.button}>Short plz</button>
    </form>
  )
}