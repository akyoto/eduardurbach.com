import Application from "./Application"
import Website from "./Website"

let app = new Application()
let website = new Website(app)

website.init()