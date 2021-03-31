// Colors to style console env
const colors = require('./console-colors');
module.exports = {
    server: {
        running: `${colors.bg.Green}, ${colors.fg.Black} 🚀 Running on port on ${colors.Reset}`,
        database: `${colors.bg.Blue}, ${colors.fg.Black} 💾 Database Connected! ${colors.Reset}`,
    }
}