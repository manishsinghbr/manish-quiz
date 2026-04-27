# manish Quiz App - Interactive Quiz Web App

A sleek, modern quiz application that fetches real questions from an API and tracks your progress. Built with pure HTML, CSS, and JavaScript - no fancy frameworks needed!

## ✨ What's Cool About This?

- **Real Questions**: Pulls fresh questions from Open Trivia Database API
- **Multiple Topics**: Choose from 6 different categories (Science, History, Sports, etc.)
- **3 Difficulty Levels**: Easy, Medium, or Hard - you pick!
- **Beautiful Animations**: Smooth transitions, hover effects, and visual feedback
- **Tracks Your Progress**: Saves your scores and stats using LocalStorage
- **60-Second Timer**: Race against the clock with a cool circular timer
- **Mobile Friendly**: Works perfectly on phones, tablets, and desktops

## 🚀 How to Use

1. **Download or Clone** the project
2. **Open `index.html`** in any modern browser
3. **Pick your topic** (or go with General Knowledge)
4. **Choose difficulty** (Easy, Medium, or Hard)
5. **Hit "Start Quiz"** and show what you know!

That's it. No installation, no setup, no headaches.

## 📁 File Structure

```
quiz-app/
│
└── index.html          # Everything's in here - HTML, CSS, and JS!
```

Yeah, it's really just one file. Simple, right?

## 🎮 Features Breakdown

### Categories Available
- 📚 General Knowledge
- 📜 History
- ⚽ Sports
- 🌍 Geography
- 💻 Computers
- 🔬 Science

### What Gets Tracked
- Total quizzes taken
- Your average score
- Your best score ever
- Recent quiz history (last 10 attempts)
- Total correct answers

### Visual Goodies
- ✅ Green animation when you get it right
- ❌ Red shake when you miss
- 🎨 Glassmorphism design (fancy blur effects)
- 🎪 Floating background shapes
- ⏱️ Animated countdown timer
- 📊 Progress bar that fills up

## 🔧 How It Works

1. **Question Fetching**: Uses Open Trivia Database API to get 10 random questions based on your choices
2. **Answer Shuffling**: Mixes up the answer order so you can't memorize positions
3. **Instant Feedback**: Shows correct/wrong answers right after you click Next
4. **Data Storage**: Browser's LocalStorage keeps your stats even after you close the tab
5. **Score Calculation**: Automatic grading with percentage and performance message

## 🌐 API Used

**Open Trivia Database**: https://opentdb.com/api.php

- Free to use (no API key needed)
- Thousands of questions
- Multiple categories and difficulties
- Regularly updated

## 💾 LocalStorage Data

The app saves:
- Your quiz results (score, percentage, date)
- Category and difficulty for each attempt
- Running statistics (avg score, best score, total correct)

**Note**: Data stays in your browser. If you clear browser data, your stats go bye-bye!

## 🎨 Design Highlights

- **Font**: Poppins (loaded from Google Fonts)
- **Colors**: Purple gradient theme (#667eea to #764ba2)
- **Layout**: Responsive CSS Grid and Flexbox
- **Animations**: Pure CSS keyframes (no libraries)
- **Icons**: Unicode emojis (works everywhere)

## 🔥 Cool Features You'll Love

1. **No Server Needed**: Run it straight from your computer
2. **Works Offline**: Once loaded, you can take quizzes without internet (but needs net for new questions)
3. **Clear History**: Don't like your scores? Wipe them clean with one button
4. **Smart Timer**: Changes color to red when time's running out
5. **Performance Messages**: Get different messages based on how well you do

## 🐛 Known Quirks

- Questions come from a public database, so occasionally you might get a weird one
- If the API is down (rare), you'll get an error - just try again
- LocalStorage has a size limit (~5MB), but you'd need to take thousands of quizzes to hit it

## 🎯 Perfect For

- Learning new topics
- Testing your knowledge
- Killing time productively
- Challenging friends (just share the file!)
- Portfolio projects
- Coding practice

## 🛠️ Want to Customize?

It's all in one file, so it's super easy to tweak:

- **Change timer**: Find `totalTime = 60` and change the number
- **More questions**: Change `amount=10` in the API URL
- **Different colors**: Edit the gradient colors in CSS
- **Add categories**: Add more category cards with different IDs from the API docs

## 📱 Browser Support

Works on all modern browsers:
- Chrome ✅
- Firefox ✅
- Safari ✅
- Edge ✅
- Opera ✅

(Basically, if your browser was updated after 2018, you're good)

## 🤝 Contributing

Found a bug? Have a cool idea? Feel free to:
- Fork it
- Fix it
- Make it better
- Share it

No formal process - just make it awesome!

## 📄 License

Do whatever you want with it. Seriously. Copy it, modify it, sell it, claim you made it yourself (okay maybe don't do that last one). It's yours!

## 🙏 Credits

- **Questions**: Open Trivia Database API
- **Font**: Google Fonts (Poppins)
- **You**: For actually reading this README!

## 💡 Tips for Best Experience

1. Use a desktop/laptop for first try (bigger screen = better visuals)
2. Try different difficulty levels - Hard mode is actually hard!
3. Challenge yourself with topics you're not familiar with
4. Check your stats after a few quizzes to see improvement

---

**Built with ❤️ and too much coffee**

Now stop reading and go take a quiz! 🚀