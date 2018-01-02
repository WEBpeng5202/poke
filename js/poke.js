$(function () {
    let poke = [],
        colorArr = ['c', 'd', 'h', 's'];
    let flag = {};
    while (poke.length < 52) {
        let obj = {};
         let color = colorArr[Math.floor(Math.random() * 4)],
            num = Math.floor(Math.random() * 13 + 1);
        if (!flag[color + '_' + num]) {
            poke.push({color, num});
            flag[color + '_' + num] = true;
        }
    }
    let index = 0;
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j <= i; j++) {
            let left = 740 - 60 * i + 120 * j,
                top = 100 * i;
            let divs = $('<div>');
            let colors=colorArr[Math.floor(Math.random()*4)],
                nums = Math.floor(Math.random() * 13 + 1);
            if (!flag[colors + '_' + nums]) {
                poke.push({colors, nums});
                flag[colors + '_' + nums] = true;
            }
            console.log(colors);
            divs.css({backgroundImage:`url('img/${colors}_${nums}.jpg')`}).addClass('poke').appendTo('.table').delay(index * 80).animate({
                left, top, opacity: 1
            });
            index++;
        }
    }
    // console.log(color);
    for (; index < poke.length; index++) {
        let divs = $('<div>');
        let colors=colorArr[Math.floor(Math.random()*4)],
            nums = Math.floor(Math.random() * 13 + 1);
        divs.css({backgroundImage:`url('img/${colors}_${nums}.jpg')`}).addClass('poke').appendTo('.table').delay(index * 80).animate({
            left: 10, bottom: 10, opacity: 1
        });
    }
    console.table(poke);

});