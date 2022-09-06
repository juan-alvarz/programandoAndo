const durationCourse = (videos) => {
    let temporaly = videos.map((e) => e.duration);
    const toSeconds = (time) => {
      if (time.length > 5) {
        let parse = time.split(":");
        let newParse = [
          parseInt(parse[0]) * 3600,
          parseInt(parse[1], 10) * 60,
          parseInt(parse[2], 10),
        ];
        let sumParse = newParse[0] + newParse[1] + newParse[2];
        return sumParse;
      }
      if (time.length <= 5) {
        let parse = time.split(":");
        let newParse = [parseInt(parse[0], 10) * 60, parseInt(parse[1], 10)];
        let sumParse = newParse[0] + newParse[1];
        return sumParse;
      }
    };
    let secondsDuration = temporaly.map((e) => toSeconds(e));
    console.log(secondsDuration);
    let oneDuration = secondsDuration.reduce((sum, a) => sum + a, 0);
    console.log(oneDuration);
    return oneDuration;
  };
  module.exports = {
    durationCourse,
  };