$(function () {
    let poke = [],
        colorArr = ['c', 'd', 'h', 's'];
    let flag = {};
    let table = $('.table');
    let first = null;
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
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j <= i; j++) {
            let left = 740 - 60 * i + 120 * j,
                top = 60 * i;
            let divs = $('<div>');
            divs
                .addClass('poke')
                .data('num', poke[index].num)
                .attr('id', `${i}_${j}`)
                .css({backgroundImage: `url('img/${poke[index]['color']}_${poke[index]['num']}.jpg')`})
                .appendTo('.table')
                .delay(index * 80)
                .animate({
                    left, top, opacity: 1
                });
            index++;
        }
    }
    // console.log(color);
    let history = [];
    for (; index < poke.length; index++) {
        let divs = $('<div>');
        divs
            .attr('id', -2 + '_' + -2)
            .data('num', poke[index].num)
            .css({backgroundImage: `url('img/${poke[index]['color']}_${poke[index]['num']}.jpg')`, zIndex: index})
            .addClass('poke')
            .addClass('left')
            .appendTo('.table')
            .delay(index * 80)
            .animate({
                left: 40, bottom: 50, opacity: 1
            });
        // history.push(divs);
        // $('.pokeBoxLeft').append(history[history.length - 1]);
    }
    let pokeBox = $('.pokeBoxLeft');
    $('button.rightBtn').click(function () {
        if (!$('.left').length) {
            return;
        }

        // $('.leftPoke').last().removeClass('leftPoke').addClass('rightPoke').animate({left:'+=1200'},function () {
        //     pokeBox.append($('.rightPoke').first());
        // });
        $('.left').last().css({
            zIndex: function () {
                return $('.right').eq(0).css('zIndex') * 1 + 1;//显示时是右边的最后一个，在布局中是第一个
            }
        }).removeClass('left').addClass('right').animate({left: '+=1200'})

        //$('.pokeBox>.poke:first-child')
        // $('.pokeBox').children().first()
        // $('.pokeBox>.poke').eq(0)
        // $('.pokeBox>.poke:eq(0)')
    });
    $('button.leftBtn').click(function () {
        !!$('.right') && $('.right').each(function (index, obj) {
            let zIndex = $('.right').eq(-1).css('zIndex') * 1 + 1;
            //&(obj) $(this) &('.right')[index]
            $(this).last()
                .removeClass('right').addClass('left')
                .delay(index * 50).animate({left: '-=1200', zIndex})
        });

    });

    // 游戏
    table.on('click', '.poke', function () {
        let coords = $(this).attr('id').split('_');
        if ($(`#${coords[0] * 1 + 1}_${coords[1] * 1 + 1}`).length || $(`#${coords[0] * 1 + 1}_${coords[1] * 1}`).length) {
            return;
        }

        if ($(this).hasClass('active')) {
            $(this).animate({top: '+=30'});
        } else {
            $(this).animate({top: '-=30'});
        }
        $(this).toggleClass('active');

        if (!first) {
            first = $(this);
        } else {
            let one = first.data('num'),
                curThis = $(this).data('num');
            // console.log(one,curThis);
            if (one + curThis == 14) {
                let his = $(history[history.length - 1]).data('num');
                if (one == his || curThis == his) {
                    $('.pokeBoxLeft').children().last().remove();
                    history.pop();
                }
                $('.active').animate({
                    top: 0, left: 1600 - 200
                }, function () {
                    $(this).remove();
                });
            } else {
                $('.active').animate({top: '+=30'}, function () {
                    $(this).removeClass('active');
                });
            }
            first = null;
        }
    });

});