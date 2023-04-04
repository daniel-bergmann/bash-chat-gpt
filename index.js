import { config } from "dotenv"
import { Configuration, OpenAIApi } from "openai"
import readline from "readline"
config()

const openai = new OpenAIApi(
  new Configuration({ apiKey: process.env.OPENAI_API_KEY })
)

const ui = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})
const bot = `
               _
              [ ]
             (   )
              |>|
           __/===\__
          //| o=o |\\
        <]  | o=o |  [>
          

  ---Well, hello there. I'm a bot. How can I help?---
`

ui.prompt()
console.log(bot)
ui.on("line", async (input) => {
  const res = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: input }],
  })

  const message = `
  
    <]  | o=o |  [>
      
    
  ---${res.data.choices[0].message.content}
    
    
    <]  | o=o |  [>
`

  console.log(message)

  ui.prompt()
})
