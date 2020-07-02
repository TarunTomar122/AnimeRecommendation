const split = (animes) => {

    var firstColumn = [];
    var secondColumn = [];
    var thirdColumn = [];
    var fourthColumn = [];

    var rows = animes.length / 4;

    var index = 0;

    for (index = 0; index < 4 * rows; index++) {
        if (index % 4 === 0) {
            firstColumn.push(animes[index]);
        } else if (index % 4 === 1) {
            secondColumn.push(animes[index]);
        } else if (index % 4 === 2) {
            thirdColumn.push(animes[index]);
        } else {
            fourthColumn.push(animes[index]);
        }
    }

    index = 4 * rows;

    for (index; index < animes.length ; index++) {
        if (index % 4 === 0) {
            firstColumn.push(animes[index]);
        } else if (index % 4 === 1) {
            secondColumn.push(animes[index]);
        } else if (index % 4 === 2) {
            thirdColumn.push(animes[index]);
        } else {
            fourthColumn.push(animes[index]);
        }
    }

    return { firstColumn, secondColumn, thirdColumn, fourthColumn };

}

export default split;