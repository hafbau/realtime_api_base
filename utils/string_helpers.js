module.exports = {
  fromSnakeToCamel: (snake_cased) => {
    try {
      const snakeWords = snake_cased.toLowerCase().split("_");
      return snakeWords.reduce((camel, snake) => `${camel}${snake[0].toUpperCase()}${snake.substring(1).toLowerCase()}`)
    }
    catch (err) {
      console.log("fromSnakeToCamel error =>", err)
      throw err;
    }
  }
}
