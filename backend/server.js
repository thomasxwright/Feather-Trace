const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const logger = require('morgan')
const connectDB = require('./config/database')
const mainRoutes = require('./routes/main')
const birdRoutes = require('./routes/birds')
const sightingRoutes = require('./routes/sightings')
const cors = require('cors')

require('dotenv').config({ path: './config/.env' })

const PORT = process.env.PORT || 4000

// Passport config
require('./config/passport')(passport)

connectDB()

app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000',
}))
app.use(express.static('build'))
app.use(express.urlencoded({ extended: true, limit: '2mb' }))
app.use(express.json({ limit: '2mb' }))
app.use(logger('dev'))
// Sessions
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use('/', mainRoutes)
app.use('/birds', birdRoutes)
app.use('/sightings', sightingRoutes)

app.listen(PORT, () => {
  let adverbs = ["truthfully", "hopelessly", "seemingly", "nearly", "absentmindedly", "seldom", "neatly", "accidentally", "selfishly", "nervously", "actually", "separately", "never", "adventurously", "seriously", "nicely", "afterward", "shakily", "noisily", "almost", "sharply", "not", "always", "sheepishly", "obediently", "annually", "shrilly", "obnoxiously", "anxiously", "shyly", "oddly", "arrogantly", "silently", "offensively", "awkwardly", "sleepily", "officially", "bashfully", "slowly", "often", "beautifully", "smoothly", "only", "bitterly", "softly", "openly", "bleakly", "solemnly", "optimistically", "blindly", "Solidly", "overconfidently", "blissfully", "sometimes", "painfully", "boastfully", "soon", "partially", "boldly", "speedily", "patiently", "bravely", "stealthily", "perfectly", "briefly", "sternly", "physically", "brightly", "strictly", "playfully", "briskly", "successfully", "politely", "broadly", "suddenly", "poorly", "busily", "supposedly", "positively", "calmly", "surprisingly", "potentially", "carefully", "suspiciously", "powerfully", "carelessly", "sweetly", "promptly", "cautiously", "swiftly", "properly", "certainly", "sympathetically", "punctually", "cheerfully", "tenderly", "quaintly", "clearly", "tensely", "queasily", "cleverly", "terribly", "queerly", "closely", "thankfully", "questionably", "coaxingly", "thoroughly", "quicker", "colorfully", "thoughtfully", "quickly", "commonly", "tightly", "quietly", "continually", "tomorrow", "quirkily", "coolly", "too", "quizzically", "correctly", "tremendously", "randomly", "courageously", "triumphantly", "rapidly", "crossly", "truly", "rarely", "cruelly", "ultimately", "readily", "curiously", "unabashedly", "really", "daily", "unaccountably", "reassuringly", "daintily", "unbearably", "recklessly", "dearly", "unethically", "regularly", "deceivingly", "unexpectedly", "reluctantly", "deeply", "Unfortunately", "repeatedly", "defiantly", "unimpressively", "reproachfully", "deliberately", "unnaturally", "restfully", "delightfully", "unnecessarily", "righteously", "diligently", "upbeat", "rightfully", "dimly", "upright", "rigidly", "doubtfully", "upside-down", "roughly", "dreamily", "upward", "rudely", "easily", "urgently", "safely", "elegantly", "usefully", "scarcely", "energetically", "uselessly", "scarily", "enormously", "usually", "searchingly", "enthusiastically", "utterly", "sedately", "equally", "vacantly", "hungrily", "especially", "vaguely", "immediately", "even", "vainly", "innocently", "evenly", "valiantly", "inquisitively", "eventually", "vastly", "instantly", "exactly", "verbally", "intensely", "excitedly", "very", "intently", "extremely", "viciously", "interestingly", "fairly", "victoriously", "inwardly", "faithfully", "violently", "irritably", "famously", "vivaciously", "jaggedly", "far", "voluntarily", "jealously", "fast", "Warmly", "jovially", "fatally", "weakly", "joyfully", "ferociously", "wearily", "joyously", "fervently", "well", "jubilantly", "fiercely", "wetly", "judgmentally", "fondly", "wholly", "justly", "foolishly", "wildly", "keenly", "fortunately", "willfully", "kiddingly", "frankly", "wisely", "kindheartedly", "frantically", "woefully", "kindly", "freely", "wonderfully", "knavishly", "frenetically", "worriedly", "knowingly", "frightfully", "wrongly", "knowledgeably", "fully", "yawningly", "kookily", "furiously", "yearly", "lazily", "generally", "yearningly", "les", "generously", "yesterday", "lightly", "gently", "yieldingly", "likely", "gladly", "youthfully", "limply", "gleefully", "zealously", "lively", "gracefully", "zestfully", "loftily", "gratefully", "zestily", "longingly", "greatly", "monthly", "loosely", "greedily", "more", "loudly", "happily", "mortally", "lovingly", "hastily", "mostly", "loyally", "healthily", "mysteriously", "madly", "heavily", "naturally", "majestically", "helpfully", "abnormally", "meaningfully", "helplessly", "merrily", "mechanically", "highly", "miserably", "hourly", "honestly", "mockingly"]
  let adjectives = ["adorable", "adventurous", "aggressive", "agreeable", "alert", "alive", "amused", "angry", "annoyed", "annoying", "anxious", "arrogant", "ashamed", "attractive", "average", "awful", "bad", "beautiful", "better", "bewildered", "black", "bloody", "blue", "blue-eyed", "blushing", "bored", "brainy", "brave", "breakable", "bright", "busy", "calm", "careful", "cautious", "charming", "cheerful", "clean", "clear", "clever", "cloudy", "clumsy", "colorful", "combative", "comfortable", "concerned", "condemned", "confused", "cooperative", "courageous", "crazy", "creepy", "crowded", "cruel", "curious", "cute", "dangerous", "dark", "dead", "defeated", "defiant", "delightful", "depressed", "determined", "different", "difficult", "disgusted", "distinct", "disturbed", "dizzy", "doubtful", "drab", "dull", "eager", "easy", "elated", "elegant", "embarrassed", "enchanting", "encouraging", "energetic", "enthusiastic", "envious", "evil", "excited", "expensive", "exuberant", "fair", "faithful", "famous", "fancy", "fantastic", "fierce", "filthy", "fine", "foolish", "fragile", "frail", "frantic", "friendly", "frightened", "funny", "gentle", "gifted", "glamorous", "gleaming", "glorious", "good", "gorgeous", "graceful", "grieving", "grotesque", "grumpy", "handsome", "happy", "healthy", "helpful", "helpless", "hilarious", "homeless", "homely", "horrible", "hungry", "hurt", "ill", "important", "impossible", "inexpensive", "innocent", "inquisitive", "itchy", "jealous", "jittery", "jolly", "joyous", "kind", "lazy", "light", "lively", "lonely", "long", "lovely", "lucky", "magnificent", "misty", "modern", "motionless", "muddy", "mushy", "mysterious", "nasty", "naughty", "nervous", "nice", "nutty", "obedient", "obnoxious", "odd", "old-fashioned", "open", "outrageous", "outstanding", "panicky", "perfect", "plain", "pleasant", "poised", "poor", "powerful", "precious", "prickly", "proud", "putrid", "puzzled", "quaint", "real", "relieved", "repulsive", "rich", "scary", "selfish", "shiny", "shy", "silly", "sleepy", "smiling", "smoggy", "sore", "sparkling", "splendid", "spotless", "stormy", "strange", "stupid", "successful", "super", "talented", "tame", "tasty", "tender", "tense", "terrible", "thankful", "thoughtful", "thoughtless", "tired", "tough", "troubled", "ugly", "uninterested", "unsightly", "unusual", "upset", "uptight", "vast", "victorious", "vivacious", "wandering", "weary", "wicked", "wide-eyed", "wild", "witty", "worried", "worrisome", "wrong", "zany", "zealous"]
  const adverb1 = adverbs[Math.floor(Math.random() * adverbs.length)].toLowerCase()
  // const adverb2 = adverbs[Math.floor(Math.random() * adverbs.length)].toLowerCase()
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)].toLowerCase()
  console.log(`Server is running on port ${process.env.PORT}! It seems ${adverb1} ${adjective}.`)
})